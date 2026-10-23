#!/usr/bin/env bash
# Render the whole video as ONE continuous film (the owner checks it in 3 parts but publishes one video).
# Each section HTML runs on its part's voice timeline (cues_v1/v2/v3); the ranges below cut those
# timelines exactly where the full voice continues (pieces from voice_v*.json, after edit_voice snapping),
# so the joined picture lines up with audio/voice_full.mp3 (0.01 s → end) + 1.5 s of silence.
set -euo pipefail
cd "$(dirname "$0")"
R=../../.claude/skills/health-video/flat/render.mjs
mkdir -p out/full
SEGS=(
  "v1_intro.html 0 100.43"
  "v1_punto1.html 100.43 288.23"
  "v1_punto2.html 288.23 473.25"
  "v2_punto3.html 0 151.40"
  "v2_punto4.html 151.40 311.13"
  "v2_punto5.html 311.13 448.41"
  "v3_punto6.html 12.98 138.43"
  "v3_punto7.html 138.43 269.60"
  "v3_conclusion.html 269.60 348.07"
)
i=0; : > out/full/list.txt
for s in "${SEGS[@]}"; do
  set -- $s
  f=$(printf 'out/full/%02d_%s.mp4' $i "${1%.html}")
  echo "file '$PWD/$f'" >> out/full/list.txt
  if [ ! -s "$f" ]; then
    node $R "$1" "$f.tmp.mp4" --fps 30 --from "$2" --to "$3" > /dev/null 2>&1 && mv "$f.tmp.mp4" "$f" &
    while [ "$(jobs -r | wc -l)" -ge 3 ]; do sleep 5; done
  fi
  i=$((i+1))
done
wait
ffmpeg -v error -y -ss 0.01 -i audio/voice_full.mp3 -af "apad=pad_dur=1.5" out/full/voice.wav
ffmpeg -v error -y -f concat -safe 0 -i out/full/list.txt -i out/full/voice.wav -map 0:v -map 1:a \
  -c:v copy -c:a aac -b:a 192k -af loudnorm=I=-14:TP=-1.5 -shortest -movflags +faststart out/video_completo.mp4
echo done
