# Asset orders (what the user generates)

The user generates images in free apps (Gemini, ChatGPT) and records the voice. Everything else is
drawn in code. Order **sheets**, not single images: several items in one generation stay in the same
style, scale and character, and the cutters split them for you. Worked example:
`projects/7dias_sin_cenar/order.md` (4 sheets for a 22-minute video).

Write the order in Vietnamese, one block per sheet: the file name, a one-line Vietnamese explanation,
then a copy-paste English prompt in a quote block. Every prompt is complete on its own (image models have
no memory) and ends with "no text, 16:9, high resolution". For sheets with the character, tell the
user to attach the character sheet (`characters/…`).

## Order from the user vs. draw in code

| Order (real drawings) | Draw in code (never order) |
|---|---|
| Exercise pose sheets (3–4 poses in a row) | Titles, labels, captions, section cards |
| Organ/body-part sheets (separate items on cream) | Charts, curves, pie, bars, count-ups |
| Scene panels: 2×2 grid of moments with the character | Icons: check/X/?, pill, heart, moon, drop, gear, plate, clock, battery, bell, thumb |
| Food/object sheets (separate items on cream) | Arrows, stamps, callout circles, timelines |
| Voice-over (+ optional music) | Cell diagrams, "door" animations, all motion and timing |

## Sheet types and prompt templates

**1. Exercise pose sheet** → `scripts/cut_poses.py`. Template: `characters/senior_m/situp_pose_sheet.md`.
One row, 3–4 key poses, same character and floor line, side view, cream `#F5ECD7`, no text.

**2. Item sheet (organs, foods, objects)** → `scripts/cut_items.py --names …` (reading order).
> Flat medical illustration sheet, clean modern health-app style, soft two-tone shading, thin dark
> outline, consistent style and scale. [N items] drawn SEPARATELY and evenly spaced in two rows on a flat
> cream #F5ECD7 background: 1) … 2) … . Anatomically correct shapes, friendly colors. No text, no
> labels, no numbers, 16:9, high resolution.

Ask for items to be clearly separated; if two still touch, cut with `--close 3`. A "body silhouette"
item gives an organ map base. Expect the app to draw a realistic face on it; that is fine at small size.

**3. Scene panels (2×2)** → `scripts/cut_items.py --grid 2x2 --names a,b,c,d`.
> Character illustration sheet, 2x2 grid of four separate panels with thin gaps, same senior
> character as the attached reference (blue skin, grey hair and beard, glowing white eyes), same 2D
> cartoon style with bold outlines and flat shading, simple [warm/night] backgrounds, no text.
> Panel 1: … Panel 2: … Panel 3: … Panel 4: … 16:9, high resolution.

Panels are shown as stills with a slow push-in (never animated). Pick moments the script describes
(the case study, the night-time symptom, the healthy alternative). Clocks drawn in a panel must show
the time the script says. Each panel is ~830×460 after the split.

## Voice spec (put in every order)
- Read the script exactly, slow and clear (~150 wpm), no music.
- Pause ~1 s before each section ("PUNTO n"). Do not read the section headings: they appear on screen.
- Any format (mp3/wav). Optional `music.mp3`: calm, wordless, loopable.

## Checking a delivery
- Copy into `projects/<slug>/assets/` with the ordered names; voice into `audio/`.
- Look at every sheet: anatomy, consistent character, clocks/times right, no text baked in.
- Cut, then check the cut-outs on a dark contact sheet (edges, missing parts, two items merged).
- Ask for a regeneration only with exact fixes ("panel 3: clock must show 8:00").
