# news_demo2: style demo with real photos

Photos: `credits.json` (all CC0, via `find_media.py --src stock`). Sound: `window.SFX` in `scene.html`.

Parallax clips (git-ignored, regenerate before rendering):
```
P=../../.claude/skills/health-news/scripts/parallax.py
python3 $P assets/plate.jpg clips/plate --move push --secs 3.3 --focus 0.5 0.6
python3 $P assets/bedroom.jpg clips/bedroom --move left --secs 3.3
python3 $P assets/brain.jpg clips/brain --move orbit --secs 4.3
python3 $P assets/bp_care.jpg clips/bp_care --move right --secs 4.1 --focus 0.6 0.45
python3 $P assets/couple.jpg clips/couple --move push --secs 3.6 --amount 1.2 --focus 0.5 0.4
```
Render: `node ../../.claude/skills/health-video/flat/render.mjs scene.html out/video.mp4`, then
`python3 ../../.claude/skills/health-news/scripts/mix.py scene.html out/video.mp4 out/mixed.mp4`.
