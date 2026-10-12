#!/usr/bin/env bash
# One-time setup for the health-video skill.
#  - renderer: Pillow, numpy, pycairo (puppet drawing), OpenCV
#  - motion QA / capture: MediaPipe pose landmarker (+ libEGL it links against) and its model
#  - offline Whisper (small, q8 ONNX) for word timestamps, installed from npm because
#    Hugging Face downloads are often blocked in sandboxed environments
set -euo pipefail
CACHE="${HV_CACHE:-$HOME/.cache/health-video}"
ASR_DIR="${HV_ASR_DIR:-$CACHE/asr}"
mkdir -p "$CACHE"

command -v ffmpeg >/dev/null || { echo "ffmpeg is required" >&2; exit 1; }
command -v node >/dev/null || { echo "node (>=18) is required" >&2; exit 1; }

python3 -c "import PIL, numpy, cairo, cv2" 2>/dev/null || pip install -q pillow numpy pycairo opencv-python-headless

if ! python3 -c "import mediapipe" 2>/dev/null; then pip install -q mediapipe; fi
if ! ldconfig -p | grep -q libEGL.so.1; then
  (apt-get install -y -q libegl1 libgles2 >/dev/null 2>&1 || (apt-get update -q >/dev/null && apt-get install -y -q libegl1 libgles2 >/dev/null)) \
    || echo "warning: could not install libEGL; qa_motion.py will not run" >&2
fi
if [ ! -s "$CACHE/pose_landmarker_full.task" ]; then
  curl -sSfL -o "$CACHE/pose_landmarker_full.task" \
    https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_full/float16/latest/pose_landmarker_full.task \
    || echo "warning: pose model download failed; qa_motion.py will not run" >&2
fi

if [ ! -d "$ASR_DIR/node_modules/sts-whisper-small" ]; then
  mkdir -p "$ASR_DIR"
  (cd "$ASR_DIR" && npm init -y >/dev/null && npm install --ignore-scripts --no-audit --no-fund sts-whisper-small @huggingface/transformers >/dev/null)
fi
echo "health-video ready (cache: $CACHE)"
