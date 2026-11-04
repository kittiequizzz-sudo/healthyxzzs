#!/usr/bin/env bash
# Render the three series parts one after another, then add music / compress / split each.
cd "$(dirname "$0")"
R=../../.claude/skills/health-video/scripts/render_sections.mjs
for n in "$@"; do
  case $n in
    1) pages="intro.html punto1.html punto2.html" ;;
    2) pages="punto3.html punto4.html" ;;
    3) pages="punto5.html punto6.html punto7.html conclusion.html" ;;
  esac
  rm -rf out/sections
  node $R . audio/part$n.wav out/parte$n.mp4 $pages --jobs 3 > out/render$n.log 2>&1 && bash finish.sh $n > out/finish$n.log 2>&1
  echo "part $n done: $(tail -1 out/finish$n.log)"
done
