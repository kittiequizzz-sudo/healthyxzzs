# Asset orders for the news style

The user generates photos in free apps (Gemini, ChatGPT) and records the voice. Graphics are all code.
Write `order.md` in Vietnamese: one block per image or sheet with the file name, a one-line Vietnamese
explanation and a copy-paste English prompt in a quote block. Every prompt is complete on its own.

## How many
About **1 photo per 8–12 s of voice**: a 10-minute video needs ~50–70 shots. Mix:
- **Hero photos** (one image per prompt, 16:9, full resolution): the hook, every chapter opener, the
  ending and any shot with a callout. About 10–14 per 10 minutes.
- **2×2 photo grids** (one prompt = 4 shots, cut with `cut_items.py --grid 2x2`): supporting shots.
  Each cell is only ~900 px wide, so show them **framed** (`Photo` with w ≤ 1100, or in `Split`), or
  full-bleed for at most 3 s with zoom ≤ 1.08 and the grain on.
- **Item sheets** on white (foods, pills, objects): cut-outs for dark panels with `float`.
A shot can be reused once with a different crop and camera move (e.g. wide, then the hands).

## Prompt templates
Style line for every photo prompt (keeps the series consistent):
> Photorealistic documentary photograph, natural soft light, shallow depth of field, warm muted colors,
> 35mm lens look, candid and respectful, no text, no logos, no brand names, no watermarks.

**Hero photo**
> [Style line] A [age]-year-old Latin American [woman/man], [description of the recurring character],
> [action from the script] in [place: a modest kitchen / living room / clinic waiting room /
> neighbourhood market], [time of day and light]. Subject on the [left/right] third, space for text on
> the other side, face not in the bottom quarter. 16:9, high resolution.

**2×2 grid**
> Four separate photographs in a 2x2 grid with thin white gaps, same person and same photographic
> style in all four: [character description]. [Style line] Photo 1: … Photo 2: … Photo 3: … Photo 4: …
> 16:9 overall, high resolution.

**Item sheet**
> Product-style photographs of [N] items on a plain pure white background, evenly spaced in two rows,
> each item separate and not touching, soft studio light, realistic: 1) … 2) … . Generic, no brand, no
> readable text, no labels. 16:9, high resolution.

**Close-up / body part** (instead of anatomy drawings): realistic hands, knees, feet, a blood-pressure
cuff on an arm, a glucometer in a hand ("generic device, no brand, blank screen"). Organs: ask for a
"clean 3D medical illustration of a human [organ] on a plain dark navy background, realistic, soft
studio light, no text" and use it as a cut-out or framed.

## Recurring character
Pick one or two per video (e.g. "Doña Rosa, 68, short grey hair, small gold earrings, cardigan in
dusty pink"; "Don Ernesto, 72, white moustache, checked shirt, glasses"). Put the same description in
every prompt. After the first hero photo is approved, ask the user to attach it to every later prompt
with "same woman as in the attached photo". Dramatised scenes with them get "Recreación" in small print.

## Never
- Logos, brand names, real channel graphics, readable text in the photo, real public figures.
- A white coat with a name badge, or any photo meant to be shown as a named expert.
- Gore, needles entering skin, nudity, distressing emergencies (show the calm moment after, or a hand
  on a phone).
- Stereotypes: show the audience with dignity: active, well dressed, real homes.

## Voice spec (put in every order)
- Neutral Latin American Spanish, warm and serious documentary narrator (male or female, the user
  chooses one and keeps it for the channel), about 140–150 words per minute, no music.
- Read the script exactly. Pause ~1 s before each section; don't read headings ("Capítulo 2").
- Free options: the user's own voice, or a free TTS voice they are allowed to use on YouTube.
- Any format; optional `music.mp3`: wordless documentary bed (YouTube Audio Library).

## Checking a delivery
- Copy into `projects/<slug>/assets/` with the ordered names; voice into `audio/`.
- Look at every photo at full size: hands (5 fingers), eyes, the character's face matches, clocks show
  the scripted time, no text/logos, devices look generic, nothing uncanny.
- Grids: cut, then check every cell on a contact sheet (no white gap left on an edge).
- Ask for a regeneration with exact fixes ("photo 3: left hand has 6 fingers; same scene, fix the hand").
