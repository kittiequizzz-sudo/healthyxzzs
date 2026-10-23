# YouTube style: picture first, text as captions, a paced hook

Owner's feedback on the first two videos (Oct 2026): "too much text, it feels like a presentation
deck. Keep the key phrases, but add images to make it interesting. Raise the pace at the start to hook
viewers, without rushing them. This is a YouTube video, not a slide deck." These rules apply to every
video from now on. Read them before planning scenes.

## 1. Picture first
- **Every beat has a picture on screen**: a scene panel, a cut-out (organ, food, object), or an animated
  diagram. No beat is just text on cream.
- Pictures take most of the frame: about **≥ 70 % of the screen is image or motion**, text ≤ 20 %.
- A list becomes a row of pictures (cut-outs or icons) with 1–3 word labels, not a stack of sentence
  cards. Example: "porciones más grandes / refresco diario" → big plate cut-out + soda glass, each with
  a 2-word chip.
- A claim becomes a visual metaphor or a diagram (key/lock, shop with doors, factory, battery, curve),
  with the key number large.
- Order enough drawings for this. Budget **about 1 drawing per 15–20 s of voice**, counted as
  *different* scene panels: each panel appears at most twice in a video (owner, Oct 2026: "too much
  repetition"). Per ~7-minute video that is ~5 scene sheets (2×2) + 1 pose sheet + 1 item sheet. For a 10-minute video
  that means about 4 scene sheets (2×2) + 1–2 item sheets. List each planned panel against its beat in
  `plan.md` before writing the order.

## 2. Text budget: keep the key phrases, drop the sentences
- **Key phrases stay**: section titles, the hook question, the big numbers, the verdicts ("NO ES (SOLO)
  LA COMIDA", "SU META ES SUYA", "LA MITAD"), safety warnings, the 3 questions card and source lines.
- Everything else the voice already says is **not** written on screen.
- **Max ~6 words per caption** and **max 2 text elements on screen at once** (+ source line). Numbers
  can be big; their labels stay small.
- Put captions **on the picture**: a lower-third pill (`Caption()` in `kit.js`), with the one word that
  matters highlighted (`hi:`), not white cards floating on cream.
- Keep for safety even if wordy: emergency card, hypoglycaemia warning, "información, no una
  consulta", dramatisation label. Shorten their wording, never remove them.

## 3. Pace
| Part | Visual change every | How |
|---|---|---|
| Hook (first 30–45 s) | **1.5–2.5 s** | hard cuts between panels, zoom punch on key words, number slams, quick slide-ins |
| Body | 3–5 s | push-in on stills, cut-outs sliding in on their word, diagram steps |
| Warnings / 3 questions | hold (≥ 8 s) | calm, readable, no motion besides a gentle float |

- "Change" = new picture, cut, punch-in, or something entering. No frame stays static for more than
  ~2.5 s in the hook or ~5 s in the body. Cut-outs always have idle life (`float()`).
- Not frantic: one new thing at a time, every change lands on a spoken word (cue), and no cut is
  faster than ~1.2 s. Avoid flashes and shakes, because the audience is 60+.
- **Hook recipe**: cold image of the character (no title card) → number or comparison slam → 2–3 quick
  cuts through the problem (doctor, worry) → the question as one big caption → a fast preview of the
  3 answers (3 pictures, ~1 s each) → "stay to the end" promise with a picture. No "EN ESTE VIDEO"
  menu of text cards.

### More motion, same timing (owner feedback Oct 23 2026, applies from the next video)
"The video looks too static." The owner wants **more movement on screen, not faster cuts**: keep the
pace above and keep every element landing on its spoken word. Add life inside each scene:
- **Camera on every still:** a clear push-in *with* a slow pan (focus point travelling), zoom
  0.12–0.2 over the shot; a gentle `punch()` on the scene's key word.
- **Everything idles:** cut-outs float/bob and tilt slightly, rings and icons pulse, chips breathe
  (tiny scale 1 ↔ 1.02), the food strip items bob in turn.
- **Diagrams move:** dots/particles travel along arrows (blood cells, sugar, nitric-oxide bubbles),
  bars grow, numbers count up, gauges wobble, clocks tick, check marks draw themselves.
- **Small animated details** on stills: steam/smoke wisps over pans, sparkles on "good" items, a
  shake on "error" stamps, drifting particles (salt, leaves, droplets) matching the topic.
- **Entrances with motion:** slide/pop with a little overshoot instead of plain fades.
- No frame with nothing moving. QA: scrub at 1 s steps and check that something moves in each frame.

## 4. Transitions and section breaks
- Inside the hook: **hard cuts** (`cutVis`) and slide-ins. In the body: short 0.25 s cross-fades or
  slides, never a slow fade through empty cream.
- Section breaks: **≤ 1.5 s**, and preferably a kicker caption ("CLAVE 2 · MENOS PUERTAS") over the
  section's first picture, not a full-screen dark title slide. Use a full dark card only for the
  conclusion.
- Use a camera "lean-in" (`punch()`) on the key word of each section (≈ once per 20–30 s), not on every
  sentence.

## 5. Checks before rendering (add to the contact-sheet QA)
- Count text elements per frame: > 2 captions (besides the source line) → cut or turn into pictures.
- Any frame of cream with only text → add a picture.
- Hook: scrub the first 45 s at 1.5 s steps; every step must look different.
- Read every caption aloud: if it repeats the voice sentence word for word, shorten it to the key phrase.

## Helpers (`flat/kit.js`)
`Caption(svg, str, {cx, cy, size, hi})`: lower-third pill with a highlighted word.
`cutVis(g, t, a, b)`: hard cut on/off.
`punch(g, t, t0, cx, cy, k)`: zoom lean-in on a word.
`slideIn(e, t, t0, dir, dist, t1)`: enter from a side with overshoot.
`float(e, t, cx, cy, {amp, period, tilt, phase})`: idle bob for cut-outs.
Plus the existing `Still` (push-in), `Stamp`, `pop`, `show`.
