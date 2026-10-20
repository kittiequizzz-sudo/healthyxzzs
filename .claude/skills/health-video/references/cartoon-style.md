# Cartoon-panel style (owner's choice, Oct 2026, from the video after `cerebro_noche`)

Reference: `cartoon_style_ref.png` (two panels: "PIERNAS INQUIETAS" on lavender, "¡NO LO IGNORES!" on
slate blue). The owner asked for this look for new videos and said **no locked character**: people may
differ from panel to panel; the drawing style is what stays the same.

## What the look is
- **Full-screen doodle panels.** Each beat is a whole composed picture (person + simple props) on ONE
  flat pastel background colour. The panel fills the frame inside a thin dark border with round corners.
- Thin, slightly uneven black ink outlines, flat colours, very light shading, ordinary people with natural
  skin tones and casual clothes, small expressive faces.
- Doodle effects: red squiggles for pain or tingling, small motion ticks, thought bubbles with
  crossed-out icons, little white sparkles in a corner.
- **Hand-lettered text**: a bold handwritten title top-left (uppercase), an optional small white boxed
  sub-label under it, and small handwritten labels joined to the picture by thin straight lines.
- Background colours: lavender `#8B6FD6`, dusty slate blue `#7E9FB5`, mint `#8CCFB4`, peach `#F2A98B`,
  butter `#F4D27A`. Pick the colour per section so viewers feel the change between points.

## Text: added in code, not baked into the image
The reference has the text drawn by the image app. **Don't let the app write text**, and add every word in code:
- AI apps misspell Spanish (accents, ñ, ¡¿), and a typo baked into a drawing can't be fixed without a
  new generation.
- Text added in code appears on its spoken word, can be corrected with every new voice take, and stays
  within the youtube-style limits (≤ 6 words, ≤ 2 text elements).
Code side: `flat/cartoon.js` → `HandTitle` (bold title + boxed sub-label), `HandLabel` (label + leader line
that draws itself), `Panel` (full-screen panel with push-in), `Sparkle`. Font: Patrick Hand (OFL, in
`flat/fonts/`). The house rules from `youtube-style.md` still apply (picture first, cue timing, hook pace).

## How many drawings
Panels carry this style, so it needs more drawings than the infographic style: about **1 panel per
10–12 s of voice** (a 5-minute video ≈ 25–30 panels ≈ 7 sheets of 2×2). Between panels, keep the motion
in code: push-in, labels drawing on, squiggles, sparkles, punches on key words. Diagrams and charts are still
code-drawn, restyled to match: flat pastel background, Patrick Hand labels, ink outlines 3–4 px.

## Prompt template: 2×2 panel sheet (copy, fill the four panels)
> Flat doodle cartoon illustration sheet, 2x2 grid of four separate panels with thin dark gaps. Simple
> hand-drawn editorial cartoon style: thin slightly uneven black ink outlines, flat colours, very light
> shading, ordinary people with natural skin tones and simple casual clothes (the people can be different
> in each panel), small expressive faces, little red squiggle lines for pain or tingling, tiny white sparkles
> in a corner. Each panel has ONE solid flat pastel background colour and only the few props the scene needs.
> Leave the top-left area of every panel empty for a title. No text, no letters, no numbers, no labels, no
> logos anywhere. Panel 1 (lavender purple background): … Panel 2 (dusty slate blue background): … Panel 3
> (mint green background): … Panel 4 (soft peach background): … 16:9, high resolution.

Cut with `scripts/cut_items.py sheet.webp cut --grid 2x2 --names a,b,c,d`. Check each panel: no text
(apps sometimes add some anyway; ask to regenerate that panel), empty top-left space, anatomy (hands,
legs), and medical details (where the pain is, what the person holds) matching the script.

## Item sheet in the same style (props for overlays)
> Flat doodle cartoon icon sheet, same style: thin uneven black ink outlines, flat colours. [N] objects
> drawn separately and evenly spaced on a flat plain white background, not touching: 1) … 2) … . No text,
> no labels, no logos, 16:9, high resolution.
