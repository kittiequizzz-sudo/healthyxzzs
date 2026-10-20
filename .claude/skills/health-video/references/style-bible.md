# Style bible

All numbers below were measured from the three reference cuts (`reference/demo_1..3.mp4`, 1920×1080,
30 fps). Design space is 1920×1080; the renderer scales everything for drafts.

## Character style update (Oct 2026, from `levantarse_silla`)
The owner sent a new character style: `characters/antonio/style_ref.jpg`. Hand-drawn 2D cartoon, warm
editorial comic look, thick dark outlines, **natural skin tones** (not blue), soft cel shading, muted
desaturated colours, soft slate-blue backgrounds. Use it for new videos unless the owner says otherwise.
Prompts must repeat "no text" (the reference has baked-in captions) and keep cut-out sheets on flat
cream. Cut poses with `cut_poses.py --skin none` so blue clothes aren't recoloured. Example prompts:
`projects/levantarse_silla/order.md`.

## Palette

| Token  | Hex       | Use |
|--------|-----------|-----|
| cream  | `#F5ECD7` | Background of every shot. Assets must have this exact flat background so they sit seamlessly. |
| blue   | `#58A9E4` | Main character skin (shadow tone ≈ `#3F86C4`). |
| purple | `#8E6AC8` | "Other people", study participants, the crowd doing it wrong. Second scientist. |
| green  | `#7BC86C` (char) / `#2FA84F` (check) | First scientist's skin; correct-answer check marks. |
| red    | `#E23B2E` | Target/working muscle highlight, wrong-way X. Glossy, slightly darker edge. |
| orange | `#F95C00` | Emphasis text, arrows, dashed guides, highlighted tile/bar, callout rings. |
| amber  | `#F7AD36` | Number tiles and tag pills (with white text). |
| ink    | `#14100E` | Outlines (5–6 px), hard tile shadows, chart baselines, labels. |
| gray   | `#A7AAAD` | Comparison bars, shorts (`#6E6E73`), neutral props. |
| navy / cyan | `#1B2238` / `#BFF3FF` | Retro CRT screen and glowing wireframe skeleton ("researchers modeled…"). |

## Typography

- Inter ExtraBold (bundled in `assets/fonts`), ALL CAPS.
- **Title words** (BIGGEST, MISTAKE 1, THE TOP): 110–130 px, orange, soft drop shadow (offset 4/6 px,
  blur 6, 35 %). Placed beside the character, never over it. They appear with a 0.3 s fade + scale
  0.92→1.
- **Tags** (WIDE, HEAVY, 1 STUDY, a number like 10): 50–56 px white text on an amber pill, ink
  outline 5 px, hard ink shadow offset 7 px. They appear with a pop: scale overshoots to ~1.1, then
  settles in 0.28 s.
- **Chart labels**: 30 px ink, under the baseline.
- **Number tiles**: 170 px amber squares with a slightly random size and offset (hand-placed feel),
  white numerals at 62 % of the tile, ink outline and a 12 px hard shadow.

## Characters and art direction (for AI prompts)

- **Main character:** a faceless athletic male mannequin. Smooth bald sky-blue head, two glowing white
  almond eyes, no nose, mouth or ears. Defined, readable anatomy (not bodybuilder-extreme). Dark gray
  athletic shorts with a drawstring, barefoot. Black hex dumbbells.
- **Rendering:** 2D cartoon, bold clean black outlines, cel shading with one soft shadow tone, a
  subtle highlight, a flat cream background, no ground shadow (or a very soft grey ellipse under props).
- **Framing:** full body, centred, with ~10 % headroom for exercise demos. Waist-up or shoulder
  close-ups for anatomy beats. Side/back views for mirror or posture beats. Character offset to the
  right third when a title word goes on the left.
- **Highlight variants:** the same image with only the target muscle recoloured to glossy red
  (`#E23B2E`). It must be pixel-aligned with the base image (generate it as an edit of the base),
  so the engine can wipe it in bottom-to-top.
- **Secondary art:** scientists (green and purple mannequins in white lab coats, round glasses,
  notepads); anatomical inserts (ivory bones, translucent light-blue skin outline, red tendon/muscle);
  props (dumbbells, a mirror, a calendar, a retro beige CRT computer). All on cream.

## Motion and timing

Measured pacing:

| Metric | Value |
|--------|-------|
| Shot length | 0.7–5.4 s, average ≈ 2.5 s (33 shots in 82 s) |
| New overlay beat inside a shot | every ~1.0–1.5 s |
| Transitions | hard cuts only |
| VO pace | ≈ 190–195 wpm |
| Graphic lead vs. keyword | 0.1–0.3 s early (BIGGEST lands 0.2 s before "biggest", WIDE 0.3 s before "wide") |
| Cut lead vs. first word of beat | 0.1–0.4 s early |

Overlay animation specs (all implemented in `render.py`):

| Element | Entrance | Duration | Notes |
|---------|----------|----------|-------|
| Title word | fade + scale 0.92→1 | 0.3 s | stays until the cut |
| Tag pill / icon X or ✓ | pop (ease-out-back, overshoot) | 0.28 s | |
| Number tiles | pop, staggered | 0.25 s each, 0.12–0.13 s apart | slight idle wobble; highlight = turns orange, scale 1.3, others shrink away |
| Bar chart | each bar grows with ease-out-cubic on its keyword | 0.45 s | ghost target = dashed orange box |
| Arrows | grow from tail | 0.3 s | orange with ink outline; double-headed for lengths |
| Dashed guide line | draws left→right | 0.5 s | e.g. shoulder height |
| Zoom callout | pop | 0.28 s | orange 9 px ring, live zoom of the base frame |
| Muscle highlight | wipe up (aligned red variant image) | 0.45 s | or baked into the AI clip |
| Week tracker | fade in, ticks pop on keywords | 0.2 s per tick | |
| Character motion | AI image-to-video | — | one simple action per clip, static camera |
| Push-in on stills | `push: [1.0, 1.04–1.08]` over the shot | shot length | only on stills; keeps them alive |

## Audio

- Voice: male, confident, fast but clear, US English, close-mic and dry. In the references the
  integrated loudness is about −14 LUFS with peaks around −9 dBFS.
- Music bed: soft, low and warm (bass-heavy ambient/lo-fi), ~16 dB under the voice (measured pauses
  sit around −31 dBFS). It is constant, with no drops; it only fades in and out at the ends. The
  renderer default `gain_db: -17` on a mastered track gets close.
- SFX: very subtle or none. If used: a soft pop on tile/tag entrances, a light whoosh on big reveals,
  each at −12 dB or lower.
- Master: −14 LUFS integrated, −1.5 dBTP (the renderer's loudnorm does this).
