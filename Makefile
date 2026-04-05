VOICE_MODEL = am_adam

install:
	@echo "Installing audio-blogs dependencies with uv..."
	@uv sync
	@echo "Done. Activate the venv with: source .venv/bin/activate"

audio:
	@uv run python generate_audio_blogs.py --blogs-dir web/public/blogs --output-dir web/public/audio-blogs --voice am_adam

audio-fast:
	@uv run python generate_audio_blogs.py --no-ollama

audio-overwrite:
	@uv run python generate_audio_blogs.py --overwrite

# Download the Kokoro model + default voice to disk without running the full pipeline.
# Re-running this is safe — files already present are skipped.
audio-model-download:
	@uv run python download_kokoro_models.py

audio-clean:
	@echo "Removing generated audio-blogs directory..."
	@rm -rf audio-blogs
	@echo "Removed audio-blogs/"

.PHONY: install audio audio-fast audio-overwrite audio-model-download audio-clean

audio-model-pull:
	@echo "Pulling latest Ollama model for audio generation..."
	@ollama pull llama3.2
	@echo "Pulled latest model."

audio-model-remove:
	@echo "Removing Ollama model for audio generation..."
	@ollama remove llama3.2
	@echo "Removed model."