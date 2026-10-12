# Phase 1 output: the asset order

The order tells the user exactly what to generate and how to name it. It must be copy-paste
ready: each prompt is complete on its own and repeats the house style, because image models have no
memory between prompts.

## What to order vs. what you draw

| Order from the user (AI or recorded) | Draw yourself in the engine (never order) |
|--------------------------------------|-------------------------------------------|
| Character clips (image-to-video) | Title words, tags, captions |
| Character stills (poses, views, close-ups) | Number tiles, bar charts, meters |
| Highlight variants (same still, muscle red) | Arrows, dashed lines, X / check icons |
| Props and scenes (mirror, CRT computer, calendar, scientists) | Zoom callout circles |
| Anatomy inserts (bones, joints) | Week trackers, tick boxes |
| Voice-over, music bed, optional SFX | Push-ins, wipes, pops, all timing |

If a prop is simple and appears on its own (a dumbbell), order a still and animate it with
pop/push. If the prop must move physically (a dumbbell dropping, a calendar flipping), order a clip.

## Naming

`S{shot:02d}_{kind}_{slug}` plus an extension, for example `S04_char_side-deltoid.png`,
`S04_char_side-deltoid_red.png` or `S07_clip_squat-swing.mp4`. Shared assets take the first shot that
uses them. Kinds: `clip` (video), `char` (character still), `prop`, `anat`, `scene`.

## Specs for every visual asset

- 16:9, 1920×1080 or larger. Clips 5 s (10 s only when the beat needs it), 24–30 fps, MP4/H.264.
- A **flat solid cream background, `#F5ECD7`**, with no vignette, texture, floor or text. Mention this in
  every prompt and check it on delivery (check_assets.py samples the corners).
- No text, letters, numbers, logos or watermarks in any asset; all text is drawn by the engine.
- For clips: a static, locked-off camera; one simple action; the subject stays in frame; the
  background stays flat. Generate a clip from its still (image-to-video) so the style holds.
- For highlight variants: generate as an *edit* of the base still ("recolour only the left deltoid
  glossy red #E23B2E, change nothing else") so the images line up pixel-for-pixel.

## Prompt templates

House style block. Paste it into every image prompt:

> 2D cartoon illustration, bold clean black outlines, cel-shaded flat colours with one soft shadow
> tone, faceless athletic male mannequin character with smooth sky-blue skin (#58A9E4), bald head,
> two glowing white almond-shaped eyes, no nose, no mouth, no ears, clearly defined realistic muscle
> anatomy, dark grey athletic shorts with drawstring, barefoot, black hexagonal dumbbells, flat solid
> cream background (#F5ECD7), no floor, no shadow on background, no text, 16:9

Character still:
> [HOUSE STYLE]. {view: front / side profile facing right / back}, {framing: full body centred with
> headroom / waist-up close-up / shoulder close-up}, {pose: standing holding dumbbells at sides …}.
> {position: centred / in right third of frame}.

Highlight variant (image edit of the still above):
> Same image, change nothing except recolour the {muscle(s)} to a glossy saturated red (#E23B2E) with
> subtle highlights, keep the outlines.

Image-to-video motion prompt:
> Static locked-off camera. The character {single action, e.g. "slowly raises both dumbbells out to
> the sides to shoulder height and lowers them once"}. Smooth, controlled, realistic tempo.
> Background stays flat cream, no camera movement, no new objects, no text, keep cartoon style and
> outlines consistent.

Secondary characters: swap the skin colour (purple #8E6AC8 for "other people"; green #7BC86C and
purple for the two scientists in white lab coats with round glasses holding notepads).

Anatomy insert:
> Clean educational illustration of the {joint/structure}, ivory bones with black outlines,
> translucent light-blue skin silhouette, {structure} in red, flat cream background (#F5ECD7), no
> labels, no text, 16:9.

## order.md layout

```markdown
# <Video title>: asset order

**Runtime estimate:** 8:40 · **Shots:** 190 · **Assets to make:** 46 (31 clips, 12 stills, 3 variants)

## Fact-check flags
1. "…proven to double growth…" (line 23): source S4 is one 8-week study (n=21) → suggest "one study found…".

## Voice-over
- File: `audio/voice.wav` (48 kHz, mono/stereo, no music, no processing beyond light de-noise)
- Read the script exactly; ~190 wpm, energetic but clear; 0.3 s pause between sentences, 0.8 s before each "Mistake N".
- Text to read: script.md (sections 1–7).

## Music (optional)
- Soft warm lo-fi/ambient bed, no vocals, constant energy, ≥ runtime or loopable → `audio/music.mp3`.

## Assets
| ID | Type | Covers shots | Prompt (image) | Motion prompt (clip) | Notes |
|----|------|--------------|----------------|----------------------|-------|
| S01_clip_lateral-raise | clip 5s | S01, S06 | … | … | front, full body |

## Delivery checklist
- [ ] All files named exactly by ID (extension free), in one folder or zip
- [ ] Cream background, no text, 16:9 on every visual
- [ ] voice.wav
```

## manifest.json

```json
{
  "title": "5 lateral raise mistakes",
  "assets": [
    {"id": "S01_clip_lateral-raise", "kind": "video", "min_duration": 4.0, "desc": "front lateral raise loop"},
    {"id": "S04_char_side-deltoid", "kind": "image", "desc": "side close-up"},
    {"id": "S04_char_side-deltoid_red", "kind": "image", "desc": "same, deltoid red"}
  ]
}
```
List visual assets only. `check_assets.py` scans `assets/`; the voice and music go in `audio/`.
