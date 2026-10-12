#!/usr/bin/env bash
# One-time setup for the health-video skill.
# - Python deps for the renderer (Pillow, numpy)
# - Offline Whisper (small, q8 ONNX) for word timestamps, installed from npm because
#   HuggingFace downloads are often blocked in sandboxed environments.
set -euo pipefail
ASR_DIR="${HV_ASR_DIR:-$HOME/.cache/health-video/asr}"

command -v ffmpeg >/dev/null || { echo "ffmpeg is required" >&2; exit 1; }
command -v node >/dev/null || { echo "node (>=18) is required" >&2; exit 1; }

python3 -c "import PIL, numpy" 2>/dev/null || pip install -q pillow numpy

if [ ! -d "$ASR_DIR/node_modules/sts-whisper-small" ]; then
  mkdir -p "$ASR_DIR"
  (cd "$ASR_DIR" && npm init -y >/dev/null && npm install --ignore-scripts --no-audit --no-fund sts-whisper-small @huggingface/transformers >/dev/null)
fi
echo "health-video ready (ASR at $ASR_DIR)"
