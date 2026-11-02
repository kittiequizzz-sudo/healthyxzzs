#!/usr/bin/env bash
# Mix a background music bed under the voice of a rendered MP4 (video stream copied, not re-encoded).
#   mix_music.sh in.mp4 music.wav out.mp4 [music_db=-16]
# The music is low-passed, set about 15 dB under the voice and ducked further while the voice speaks.
set -euo pipefail
in=$1; music=$2; out=$3; db=${4:--16}
ffmpeg -v error -y -i "$in" -stream_loop -1 -i "$music" -filter_complex \
  "[1:a]lowpass=f=3200,volume=${db}dB,aformat=channel_layouts=stereo[m];\
   [0:a]aformat=channel_layouts=stereo,asplit=2[v][sc];\
   [m][sc]sidechaincompress=threshold=0.03:ratio=4:attack=80:release=900[md];\
   [v][md]amix=inputs=2:duration=first:normalize=0,alimiter=limit=0.95[a]" \
  -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -movflags +faststart "$out"
echo "wrote $out"
