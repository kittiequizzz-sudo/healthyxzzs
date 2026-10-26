#!/usr/bin/env bash
# Render the whole video (ONE continuous film, video.html on audio/voice_full.mp3) in parallel chunks,
# join, add the voice, then cut the 3 check parts (0–P3, P3–P5, P5–end) from the joined file.
set -euo pipefail
cd "$(dirname "$0")"
R=../../.claude/skills/health-video/flat/render.mjs
mkdir -p out/chunks
B=(0 100 200 300 400 505 605 705 805 899.6 1000 1100 1227.6)
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
ffmpeg -v error -y -i audio/voice_full.mp3 -af "apad=pad_dur=2" -t 1227.6 out/chunks/voice.wav
ffmpeg -v error -y -f concat -safe 0 -i out/chunks/list.txt -i out/chunks/voice.wav -map 0:v -map 1:a \
  -c:v copy -c:a aac -b:a 192k -af loudnorm=I=-14:TP=-1.5 -shortest -movflags +faststart out/video_completo.mp4
# check parts: cut on chunk (keyframe) boundaries so stream copy is exact
ffmpeg -v error -y -i out/video_completo.mp4 -t 505 -c copy out/sueno_parte1.mp4
ffmpeg -v error -y -ss 505 -i out/video_completo.mp4 -t 394.6 -c copy out/sueno_parte2.mp4
ffmpeg -v error -y -ss 899.6 -i out/video_completo.mp4 -c copy out/sueno_parte3.mp4
echo done
