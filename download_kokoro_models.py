#!/usr/bin/env python3
"""
Pre-fetch Kokoro model weights and voice files to models/kokoro/.
Safe to re-run — files already on disk are skipped.
"""
from pathlib import Path
from huggingface_hub import hf_hub_download

REPO = "hexgrad/Kokoro-82M"
DIR = Path("models/kokoro")
FILES = [
    "config.json",
    "kokoro-v1_0.pth",
    "voices/af_heart.pt",
    "voices/am_adam.pt",
]

for f in FILES:
    dest = DIR / f
    if dest.exists():
        print(f"  already cached: {dest}")
    else:
        print(f"  downloading:    {f}")
        hf_hub_download(repo_id=REPO, filename=f, local_dir=str(DIR))

print(f"\nDone. Model files are in {DIR.resolve()}")
