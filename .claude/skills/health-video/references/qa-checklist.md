# Build and QA checklist (lessons from real videos)

## Before rendering
- Build with real cues as soon as the transcript exists. Placeholder cues (evenly spaced) are fine for
  layout checks only. Never let a QA helper overwrite `cues.js` with placeholders after the real one
  exists.
- `cues.mjs` prints MISSING cues. It matches letters, not words, and folds number words (uno→1), so
  Whisper's merges ("Clav1"), digits ("100.000" for "cien mil") and mishearings mostly still match.
  It takes the EARLIEST good match within ~100 s of the previous cue. If a cue is missing or lands early
  on a similar phrase ("Culpable 1" vs "culpables escondidos"), lengthen the phrase with the next words
  ("Culpable 1, otras medicinas"); never type a time by hand.
- If the user sends the voice in several files (one per beat group), join them once into
  `audio/voice.mp3` with ~0.8 s of silence between parts (ffmpeg concat with `anullsrc`), then transcribe
  and cue the joined file. Don't build per-part timelines.
- Check cue gaps: a cue that jumps far ahead means it matched the wrong sentence.
- Section boundaries: each section's `START` is the next heading's pause (`at('pN') - 0.6`); the
  previous section's `END` is the same value.

## Frame QA (render 10–15 frames per section, look at a contact sheet)
- **YouTube check first (`youtube-style.md` §5):** every frame has a picture; ≤ 2 captions besides the
  source line; no caption repeats the voice word for word; in the hook every 1.5 s step looks different.
- **Text overflow:** long Spanish labels overflow cards. Shrink by length (`s.length > N ? smaller`),
  use two-line labels (`'A\nB'` in Tile), or measure with `getComputedTextLength()` (strike-throughs).
- **Overlaps:** stamps over the cards they judge (put stamps below), chips over chart lines, icons over
  button text, labels under drawings.
- **Z-order:** SVG draws in creation order. Anything that moves *into* another shape (glucose into a
  cell) must be appended after that shape.
- **Contrast:** a white check on a green card disappears (use an ink check); a red icon on a red
  background needs its ink outline.
- **Dots/callouts** on a body silhouette: verify each point on a gridded crop of the drawing.
- **Timing:** each element appears 0.1–0.3 s before its word; nothing important appears while the
  scene is fading out.

## Rendering
- Short pieces: `flat/render.mjs --audio`. Long videos: `scripts/render_sections.mjs` (3 jobs on 4 cores
  ≈ 22 min of video in ~30 min).
- After the join: `ffprobe` that video ≈ audio length, then pull ~20 frames across the whole video for a
  final contact sheet.

## Delivery
- The app's file upload limit is **30 MB**. A 20-minute 1080p video is ~100 MB. Don't crush it into one
  small file; split without re-encoding:
  `ffmpeg -i final.mp4 -c copy -map 0 -f segment -segment_time 280 -reset_timestamps 1 parts/name_parte%d.mp4`
  and send the parts in order (the user joins them in CapCut). Tell the user the full file's path too.
- GitHub rejects files over 100 MB: don't commit full renders (`out/*.mp4`, `out/parts/` are ignored).
  Commit the scenes, cues, transcript and cut assets instead, so the video can be re-rendered.
- The container is temporary: remind the user to download the parts.

## Sound effects and background music (owner request, Oct 2026)
- Never download music or SFX (licences, Content ID). Everything is synthesised by `scripts/mix_audio.py`:
  a soft pastel pad + plucked arpeggio + bass (F–Dm–Bb–C, ~72 bpm) and short SFX (pop, swish, cut, ding, stamp,
  click, tick, squeeze, alert, alert_soft).
- Scenes register SFX with `sfx(kind, time, vol)` (see `projects/sarcopenia_5senales/common.js`; each `scene()`
  adds a soft swish). `scripts/collect_sfx.mjs <project> sound/sfx.json pages…` gathers them, then
  `python3 scripts/mix_audio.py audio/voice.mp3 sound/sfx.json sound` writes `sound/mix.m4a`: music ducked under the
  voice (sidechain), music ≈ 13 LU under the voice before ducking, SFX thinned to ≥ 0.3 s apart, −14 LUFS.
- Mux: `ffmpeg -i out/video_voz.mp4 -i sound/mix.m4a -map 0:v -map 1:a -c copy -shortest out/final.mp4`.
