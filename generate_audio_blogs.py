#!/usr/bin/env python3
"""
Blog-to-Audio Generator
-----------------------
Recursively scans all .md blog files, uses Ollama to convert markdown
into natural speech-friendly prose, then synthesizes audio via Kokoro TTS.

Usage:
    python generate_audio_blogs.py
    python generate_audio_blogs.py --blogs-dir blogs --output-dir audio-blogs
    python generate_audio_blogs.py --model llama3.2 --voice af_heart
    python generate_audio_blogs.py --no-ollama          # use regex cleaner instead
    python generate_audio_blogs.py --overwrite          # re-generate existing files

Requirements:
    pip install ollama kokoro soundfile numpy PyYAML tqdm
    # Ollama must be running: ollama serve
    # Pull a model first: ollama pull llama3.2
"""

import argparse
import re
import sys
from pathlib import Path

import numpy as np
import ollama
import soundfile as sf
import yaml
from huggingface_hub import hf_hub_download
from tqdm import tqdm

# ---------------------------------------------------------------------------
# Kokoro model / voice caching
# ---------------------------------------------------------------------------

_KOKORO_REPO_ID = "hexgrad/Kokoro-82M"
_KOKORO_MODEL_FILE = "kokoro-v1_0.pth"
_KOKORO_CONFIG_FILE = "config.json"


def _ensure_file(filename: str, model_dir: Path) -> Path:
    """Return the local path for *filename*, downloading from HF only if absent."""
    local = model_dir / filename
    if local.exists():
        return local
    print(f"  [HF] Downloading {filename} → {local}")
    local.parent.mkdir(parents=True, exist_ok=True)
    downloaded = hf_hub_download(
        repo_id=_KOKORO_REPO_ID,
        filename=filename,
        local_dir=str(model_dir),
    )
    return Path(downloaded)


def _build_kokoro_pipeline(voice: str, model_dir: Path) -> "KPipeline":
    """
    Build a Kokoro KPipeline backed entirely by local files.

    On first run the three required files are downloaded from HF and saved
    under *model_dir*.  Subsequent runs load straight from disk.
    """
    from kokoro import KModel, KPipeline  # deferred so the rest of the script works without kokoro installed

    config_path = _ensure_file(_KOKORO_CONFIG_FILE, model_dir)
    weights_path = _ensure_file(_KOKORO_MODEL_FILE, model_dir)
    voice_path = _ensure_file(f"voices/{voice}.pt", model_dir)

    kmodel = KModel(
        repo_id=_KOKORO_REPO_ID,
        config=str(config_path),
        model=str(weights_path),
    ).eval()

    pipeline = KPipeline(lang_code="a", model=kmodel)
    # Pre-load the voice tensor so it is cached in pipeline.voices; pass the
    # local .pt path directly — KPipeline.load_single_voice() skips HF when
    # the string ends with '.pt'.
    pipeline.load_voice(str(voice_path))

    return pipeline

# ---------------------------------------------------------------------------
# Markdown cleaning
# ---------------------------------------------------------------------------

def _parse_frontmatter(md_text: str) -> tuple[dict, str]:
    """Split YAML front matter from the rest of the document."""
    frontmatter: dict = {}
    content = md_text

    if md_text.startswith("---"):
        parts = md_text.split("---", 2)
        if len(parts) >= 3:
            try:
                frontmatter = yaml.safe_load(parts[1]) or {}
            except yaml.YAMLError:
                pass
            content = parts[2].strip()

    return frontmatter, content


def _regex_clean(text: str) -> str:
    """Minimal regex-based markdown stripper (fallback when --no-ollama)."""
    # Fenced code blocks
    text = re.sub(r"```[\s\S]*?```", " ", text)
    # Inline code
    text = re.sub(r"`[^`\n]+`", "", text)
    # Images
    text = re.sub(r"!\[[^\]]*\]\([^\)]*\)", "", text)
    # Links → keep display text
    text = re.sub(r"\[([^\]]+)\]\([^\)]*\)", r"\1", text)
    # ATX headers → keep text, drop #
    text = re.sub(r"^#{1,6}\s+", "", text, flags=re.MULTILINE)
    # Bold / italic
    text = re.sub(r"\*{1,3}([^*\n]+)\*{1,3}", r"\1", text)
    text = re.sub(r"_{1,3}([^_\n]+)_{1,3}", r"\1", text)
    # Blockquotes
    text = re.sub(r"^>\s*", "", text, flags=re.MULTILINE)
    # Horizontal rules
    text = re.sub(r"^[-*_]{3,}\s*$", "", text, flags=re.MULTILINE)
    # HTML tags
    text = re.sub(r"<[^>]+>", "", text)
    # Collapse excessive blank lines
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def _ollama_clean(content: str, title: str, model: str) -> str:
    """
    Ask an Ollama model to rewrite the blog as clean, narration-ready prose.
    Falls back to regex cleaning if the API call fails.
    """
    prompt = (
        "You are a text-to-speech pre-processor. "
        "Rewrite the following blog post as fluent, narration-ready plain text. "
        "Rules:\n"
        "- Remove ALL markdown formatting (headers, bold, italic, code blocks, links, lists, blockquotes, HTML).\n"
        "- Replace bullet lists with flowing sentences.\n"
        "- Spell out code symbols and identifiers naturally where possible (e.g. `@cache` → 'the cache decorator').\n"
        "- Do NOT summarise or omit content — reproduce the full text.\n"
        "- Output only the cleaned prose, no commentary or preamble.\n\n"
        f"Title: {title}\n\n"
        f"Content:\n{content}"
    )
    try:
        response = ollama.chat(
            model=model,
            messages=[{"role": "user", "content": prompt}],
        )
        return response["message"]["content"].strip()
    except Exception as exc:
        print(f"\n  [WARN] Ollama call failed ({exc}), falling back to regex cleaner.")
        return _regex_clean(content)


# ---------------------------------------------------------------------------
# TTS
# ---------------------------------------------------------------------------

def _synthesise(
    text: str,
    output_path: Path,
    pipeline: "KPipeline",
    voice_path: str,
    speed: float,
) -> None:
    """
    Convert *text* to a WAV file using a pre-built Kokoro KPipeline.

    Kokoro returns a generator of (graphemes, phonemes, audio_array) tuples,
    one per segment.  We concatenate all segments and write a single WAV.
    """
    chunks: list[np.ndarray] = []
    for _gs, _ps, audio in pipeline(text, voice=voice_path, speed=speed):
        chunks.append(audio)

    if not chunks:
        raise RuntimeError("Kokoro returned no audio chunks.")

    full_audio = np.concatenate(chunks)
    sf.write(str(output_path), full_audio, samplerate=24000)


# ---------------------------------------------------------------------------
# Main processing logic
# ---------------------------------------------------------------------------

def process_blogs(
    blogs_dir: Path,
    output_dir: Path,
    model: str,
    use_ollama: bool,
    voice: str,
    speed: float,
    overwrite: bool,
    model_dir: Path,
) -> None:
    md_files = [
        f for f in blogs_dir.rglob("*.md")
        # exclude metadata / config files that aren't blog posts
        if f.name not in {"authors.yml", "README.md"}
    ]

    if not md_files:
        print(f"No .md files found under '{blogs_dir}'.")
        sys.exit(0)

    print(f"Found {len(md_files)} blog file(s) in '{blogs_dir}'.")
    output_dir.mkdir(parents=True, exist_ok=True)

    # Build the Kokoro pipeline once (downloads model/voice files if not cached)
    print(f"Loading Kokoro model from '{model_dir}' (downloads on first run)...")
    kokoro_pipeline = _build_kokoro_pipeline(voice, model_dir)
    # Resolve the local voice path so _synthesise uses it directly
    voice_pt_path = str(model_dir / f"voices/{voice}.pt")
    print("Kokoro ready.\n")

    skipped = 0
    errors: list[str] = []

    for md_file in tqdm(md_files, unit="blog", desc="Converting"):
        # Mirror the relative path structure from blogs_dir
        relative = md_file.relative_to(blogs_dir)
        output_file = output_dir / relative.with_suffix(".wav")
        output_file.parent.mkdir(parents=True, exist_ok=True)

        if output_file.exists() and not overwrite:
            tqdm.write(f"  skip  {output_file.name} (already exists, use --overwrite)")
            skipped += 1
            continue

        tqdm.write(f"\n  → {md_file.name}")
        try:
            md_text = md_file.read_text(encoding="utf-8")
            frontmatter, content = _parse_frontmatter(md_text)

            title: str = frontmatter.get("title", md_file.stem)
            tqdm.write(f"     title   : {title}")

            if use_ollama:
                tqdm.write(f"     cleaning: Ollama ({model})")
                clean_text = _ollama_clean(content, title, model)
            else:
                tqdm.write("     cleaning: regex (--no-ollama)")
                clean_text = _regex_clean(content)

            # Prepend the title as the opening narration
            narration = f"{title}.\n\n{clean_text}"
            tqdm.write(f"     chars   : {len(narration):,}")

            tqdm.write(f"     tts     : Kokoro  voice={voice}  speed={speed}")
            _synthesise(narration, output_file, pipeline=kokoro_pipeline, voice_path=voice_pt_path, speed=speed)

            tqdm.write(f"     saved   : {output_file}")

        except Exception as exc:
            tqdm.write(f"  ERROR processing {md_file.name}: {exc}")
            errors.append(md_file.name)

    # Summary
    print("\n" + "─" * 60)
    processed = len(md_files) - skipped - len(errors)
    print(f"Done.  processed={processed}  skipped={skipped}  errors={len(errors)}")
    print(f"Audio files → {output_dir.resolve()}")
    if errors:
        print("\nFailed files:")
        for name in errors:
            print(f"  • {name}")


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def _build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        description="Convert blog markdown files to spoken audio using Ollama + Kokoro TTS.",
        formatter_class=argparse.ArgumentDefaultsHelpFormatter,
    )
    p.add_argument(
        "--blogs-dir",
        default="blogs",
        help="Directory containing .md blog files (scanned recursively).",
    )
    p.add_argument(
        "--output-dir",
        default="audio-blogs",
        help="Output directory for generated .wav files.",
    )
    p.add_argument(
        "--model",
        default="llama3.2",
        help="Ollama model to use for markdown-to-speech cleaning.",
    )
    p.add_argument(
        "--voice",
        default="af_heart",
        help=(
            "Kokoro voice ID.  "
            "American-English examples: af_heart, af_bella, am_adam, am_michael.  "
            "Run `python -c 'from kokoro import KPipeline; print(KPipeline.list_voices())'` to see all."
        ),
    )
    p.add_argument(
        "--speed",
        type=float,
        default=1.0,
        help="Narration speed multiplier (0.5 = slower, 1.5 = faster).",
    )
    p.add_argument(
        "--no-ollama",
        action="store_true",
        help="Skip Ollama; use a simple regex-based markdown cleaner instead.",
    )
    p.add_argument(
        "--overwrite",
        action="store_true",
        help="Re-generate audio even if the output file already exists.",
    )
    p.add_argument(
        "--model-dir",
        default="models/kokoro",
        help="Local directory for cached Kokoro model and voice files (downloaded from HF on first run).",
    )
    return p


def main() -> None:
    args = _build_parser().parse_args()

    blogs_dir = Path(args.blogs_dir)
    if blogs_dir is None:
        blogs_dir = Path("web/public/blogs")  # hardcoded to match website structure
    output_dir = Path(args.output_dir)
    if output_dir is None:
        output_dir = Path("web/public/audio-blogs")  # hardcoded to match website structure
    
    voice = args.voice
    if voice is None:
        voice = "am_adam"  # default voice if not specified
    
    # if output_dir doesn't exist, create it. If it does exist, we can proceed (we'll skip existing files unless --overwrite is set)
    if not output_dir.exists():
        try:
            output_dir.mkdir(parents=True, exist_ok=True)
            print(f"Created output directory: '{output_dir.resolve()}'")
        except Exception as exc:
            print(f"Error: cannot create output directory '{output_dir.resolve()}': {exc}")
            sys.exit(1)

    if not blogs_dir.exists():
        print(f"Error: blogs directory not found: '{blogs_dir.resolve()}'")
        sys.exit(1)

    if not args.no_ollama:
        # Quick connectivity check before we burn time processing files
        try:
            ollama.list()
        except Exception as exc:
            print(
                f"Error: cannot reach Ollama ({exc}).\n"
                "Make sure Ollama is running (`ollama serve`) or pass --no-ollama."
            )
            sys.exit(1)

    process_blogs(
        blogs_dir=blogs_dir,
        output_dir=output_dir,
        model=args.model,
        use_ollama=not args.no_ollama,
        voice=args.voice,
        speed=args.speed,
        overwrite=args.overwrite,
        model_dir=Path(args.model_dir),
    )


if __name__ == "__main__":
    main()
