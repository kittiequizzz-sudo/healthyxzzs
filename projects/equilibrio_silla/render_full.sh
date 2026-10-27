#!/usr/bin/env bash
# Render the whole video (video.html on the edited voice) in parallel chunks, mix voice + original
# music + SFX (soundtrack.py), join, then cut the 3 check parts (0–P3, P3–P5, P5–end).
set -euo pipefail
cd "$(dirname "$0")"
R=../../.claude/skills/health-video/flat/render.mjs
mkdir -p out/chunks
B=(0 100 200 300 400 540 655 770 885 1003.5 1120 1233.5)
: > out/chunks/list.txt
for ((i = 0; i < ${#B[@]} - 1; i++)); do
  f=$(printf 'out/chunks/%02d.mp4' $i)
  echo "file '$PWD/$f'" >> out/chunks/list.txt
  if [ ! -s "$f" ]; then
    ( node $R video.html "$f.tmp.mp4" --fps 30 --from "${B[i]}" --to "${B[i+1]}" > /dev/null 2> "$f.log" && mv "$f.tmp.mp4" "$f" ) &
    while [ "$(jobs -r | wc -l)" -ge 4 ]; do sleep 3; done
  fi
done
wait
for ((i = 0; i < ${#B[@]} - 1; i++)); do [ -s "$(printf 'out/chunks/%02d.mp4' $i)" ] || { echo "chunk $i failed"; exit 1; }; done
node dump_sfx.mjs
python3 ../../.claude/skills/health-video/scripts/soundtrack.py audio/voice_full.mp3 out/sfx.json out/chunks/mix.wav \
  --sections "$(cat out/sections.txt)" --mood calm
ffmpeg -v error -y -f concat -safe 0 -i out/chunks/list.txt -i out/chunks/mix.wav -map 0:v -map 1:a \
  -c:v copy -c:a aac -b:a 192k -af loudnorm=I=-14:TP=-1.5 -shortest -movflags +faststart out/video_completo.mp4
ffmpeg -v error -y -i out/video_completo.mp4 -t 540 -c copy out/silla_parte1.mp4
ffmpeg -v error -y -ss 540 -i out/video_completo.mp4 -t 463.5 -c copy out/silla_parte2.mp4
ffmpeg -v error -y -ss 1003.5 -i out/video_completo.mp4 -c copy out/silla_parte3.mp4
echo done
