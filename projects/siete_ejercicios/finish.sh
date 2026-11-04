#!/usr/bin/env bash
# Finish a rendered series part: add the music bed, compress for upload, split into <30 MB parts.
#   bash finish.sh 2        (reads out/parte2.mp4, writes out/parte2_final.mp4 and out/parts/video2_parte*.mp4)
set -euo pipefail
cd "$(dirname "$0")"
n=$1; S=../../.claude/skills/health-video/scripts
d=$(ffprobe -v error -show_entries format=duration -of csv=p=0 out/parte$n.mp4)
python3 $S/make_music.py audio/music$n.wav --seconds "$d" --seed "$n"
bash $S/mix_music.sh out/parte$n.mp4 audio/music$n.wav out/parte${n}_music.mp4 -18
ffmpeg -v error -y -i out/parte${n}_music.mp4 -c:v libx264 -preset medium -crf 24 -tune animation -pix_fmt yuv420p -c:a copy -movflags +faststart out/parte${n}_final.mp4
mkdir -p out/parts && rm -f out/parts/video${n}_*
ffmpeg -v error -i out/parte${n}_final.mp4 -c copy -map 0 -f segment -segment_time 290 -reset_timestamps 1 out/parts/video${n}_parte%d.mp4
ls -la out/parte${n}_final.mp4 out/parts/video${n}_*
