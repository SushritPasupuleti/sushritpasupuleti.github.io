#!/usr/bin/env python3
"""
Blog OG-Summary Generator
--------------------------
Recursively scans all .md blog files, uses Ollama to generate a concise
OpenGraph-ready description (≤ 160 characters) and writes it as a plain-text
.txt file alongside the same slug name.

Usage:
    python generate_blog_summaries.py
    python generate_blog_summaries.py --blogs-dir web/public/blogs --output-dir web/public/blog-summaries
    python generate_blog_summaries.py --model llama3.2
    python generate_blog_summaries.py --no-ollama          # use naive excerpt instead
    python generate_blog_summaries.py --overwrite          # re-generate existing files

Requirements:
    pip install ollama PyYAML tqdm
    # Ollama must be running: ollama serve
    # Pull a model first: ollama pull llama3.2
"""

import argparse
import re
import sys
from pathlib import Path

import ollama
import yaml
from tqdm import tqdm

# Target character budget for an OpenGraph description.
OG_MAX_CHARS = 300 # per-Facebook guidelines.

# ---------------------------------------------------------------------------
# Markdown helpers
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


def _regex_excerpt(text: str, max_chars: int = OG_MAX_CHARS) -> str:
    """
    Naive fallback: strip markdown syntax and return the first *max_chars*
    characters of running prose (truncated cleanly at a word boundary).
    """
    # Fenced code blocks
    text = re.sub(r"```[\s\S]*?```", " ", text)
    # Inline code
    text = re.sub(r"`[^`\n]+`", " ", text)
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
    # HTML tags
    text = re.sub(r"<[^>]+>", "", text)
    # Collapse whitespace
    text = re.sub(r"\s+", " ", text).strip()

    if len(text) <= max_chars:
        return text

    # Truncate at a word boundary, keeping room for the ellipsis
    truncated = text[: max_chars - 1].rsplit(" ", 1)[0]
    return truncated.rstrip(".,;:") + "…"


def _ollama_summarise(content: str, title: str, model: str) -> str:
    """
    Ask an Ollama model to write a single-sentence OpenGraph description.
    Falls back to _regex_excerpt if the API call fails.
    """
    prompt = (
        "You are an SEO copywriter. Write a single, engaging sentence that summarises "
        "the following blog post for use as an OpenGraph meta description. "
        "Rules:\n"
        f"- Output ONLY the description, no quotes, no commentary.\n"
        f"- Maximum {OG_MAX_CHARS} characters (hard limit — count carefully).\n"
        "- Write in present tense, active voice.\n"
        "- Do NOT start with 'This article', 'This post', or 'In this'.\n"
        "- Do NOT use markdown formatting.\n\n"
        f"Title: {title}\n\n"
        f"Content:\n{content[:4000]}"  # cap to avoid overflowing small-context models
    )
    try:
        response = ollama.chat(
            model=model,
            messages=[{"role": "user", "content": prompt}],
        )
        raw: str = response["message"]["content"].strip()
        # Strip surrounding quotes the model occasionally adds
        raw = raw.strip('"\'')
        # Hard-truncate if the model exceeded the limit
        if len(raw) > OG_MAX_CHARS:
            raw = raw[: OG_MAX_CHARS - 1].rsplit(" ", 1)[0].rstrip(".,;:") + "…"
        return raw
    except Exception as exc:
        print(f"\n  [WARN] Ollama call failed ({exc}), falling back to regex excerpt.")
        return _regex_excerpt(content)


# ---------------------------------------------------------------------------
# Main processing logic
# ---------------------------------------------------------------------------

def process_blogs(
    blogs_dir: Path,
    output_dir: Path,
    model: str,
    use_ollama: bool,
    overwrite: bool,
) -> None:
    md_files = [
        f for f in blogs_dir.rglob("*.md")
        if f.name not in {"authors.yml", "README.md"}
    ]

    if not md_files:
        print(f"No .md files found under '{blogs_dir}'.")
        sys.exit(0)

    print(f"Found {len(md_files)} blog file(s) in '{blogs_dir}'.")
    output_dir.mkdir(parents=True, exist_ok=True)

    skipped = 0
    errors: list[str] = []

    for md_file in tqdm(md_files, unit="blog", desc="Summarising"):
        relative = md_file.relative_to(blogs_dir)
        output_file = output_dir / relative.with_suffix(".txt")
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
            tqdm.write(f"     title : {title}")

            # Prefer an explicit description already in frontmatter
            existing_desc: str = frontmatter.get("description", "")
            if existing_desc and not overwrite:
                summary = existing_desc[:OG_MAX_CHARS]
                tqdm.write(f"     source: frontmatter description")
            elif use_ollama:
                tqdm.write(f"     source: Ollama ({model})")
                summary = _ollama_summarise(content, title, model)
            else:
                tqdm.write("     source: regex excerpt (--no-ollama)")
                summary = _regex_excerpt(content)

            tqdm.write(f"     chars : {len(summary)}")
            tqdm.write(f"     text  : {summary}")

            output_file.write_text(summary, encoding="utf-8")
            tqdm.write(f"     saved : {output_file}")

        except Exception as exc:
            tqdm.write(f"  ERROR processing {md_file.name}: {exc}")
            errors.append(md_file.name)

    # Summary
    print("\n" + "─" * 60)
    processed = len(md_files) - skipped - len(errors)
    print(f"Done.  processed={processed}  skipped={skipped}  errors={len(errors)}")
    print(f"Summary files → {output_dir.resolve()}")
    if errors:
        print("\nFailed files:")
        for name in errors:
            print(f"  • {name}")


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def _build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        description="Generate OpenGraph-ready summaries for blog markdown files using Ollama.",
        formatter_class=argparse.ArgumentDefaultsHelpFormatter,
    )
    p.add_argument(
        "--blogs-dir",
        default="web/public/blogs",
        help="Directory containing .md blog files (scanned recursively).",
    )
    p.add_argument(
        "--output-dir",
        default="web/public/blog-summaries",
        help="Output directory for generated .txt summary files.",
    )
    p.add_argument(
        "--model",
        default="llama3.2",
        help="Ollama model to use for summarisation.",
    )
    p.add_argument(
        "--no-ollama",
        action="store_true",
        help="Skip Ollama; extract a plain-text excerpt via regex instead.",
    )
    p.add_argument(
        "--overwrite",
        action="store_true",
        help="Re-generate summaries even if the output file already exists.",
    )
    return p


def main() -> None:
    args = _build_parser().parse_args()

    blogs_dir = Path(args.blogs_dir)
    output_dir = Path(args.output_dir)

    if not blogs_dir.exists():
        print(f"Error: blogs directory not found: '{blogs_dir.resolve()}'")
        sys.exit(1)

    if not args.no_ollama:
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
        overwrite=args.overwrite,
    )


if __name__ == "__main__":
    main()
