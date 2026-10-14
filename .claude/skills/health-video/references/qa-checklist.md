# Build and QA checklist (lessons from real videos)

## Before rendering
- Build with real cues as soon as the transcript exists. Placeholder cues (evenly spaced) are fine for
  layout checks only. Never let a QA helper overwrite `cues.js` with placeholders after the real one
  exists.
- `cues.mjs` prints MISSING cues. Whisper writes numbers as digits ("100.000" for "cien mil") and can
  split or merge words. Rephrase the cue with nearby words instead of guessing a time.
- Check cue gaps: a cue that jumps far ahead means it matched the wrong sentence.
- Section boundaries: each section's `START` is the next heading's pause (`at('pN') - 0.6`); the
  previous section's `END` is the same value.

## Frame QA (render 10–15 frames per section, look at a contact sheet)
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
