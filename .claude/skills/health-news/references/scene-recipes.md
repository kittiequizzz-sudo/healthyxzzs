# Scene recipes

All components live in `news/news.js` and follow the flat-renderer rule: build once, `draw(t, …)` every
frame, no state between frames. Times come from cues (`at('key')`), never typed by hand in a real video.
Working example of each: `projects/news_demo/scene.html`.

## Page skeleton
```html
<link rel="stylesheet" href="../../.claude/skills/health-news/news/fonts.css">
<script src="../../.claude/skills/health-video/flat/lib.js"></script>
<script src="../../.claude/skills/health-video/flat/kit.js"></script>
<script src="../../.claude/skills/health-news/news/news.js"></script>
<script src="cues.js"></script>
…
<svg id="s" width="1920" height="1080" viewBox="0 0 1920 1080"></svg>
```
```js
const svg = NewsStage();
// shots: groups shown between two times with a draw(t) for their contents
const shots = [];
const shot = (a, b, build, hard = true) => { const g = el('g', {}, svg); shots.push({ g, a, b, hard, draw: build(g) }); };
… shots …
const bug = Bug(svg, { name: 'SALUD 60+', section: 'EL CORAZÓN' });
const sp = SmallPrint(svg), wipe = Wipe(svg), grade = Grade(svg);   // created last = drawn on top
window.draw = t => {
  for (const s of shots) if ((s.hard ? cutVis : sceneVis)(s.g, t, s.a, s.b) > 0) s.draw(t);
  bug.draw(t); sp.set(source, note); wipe.draw(t, tSectionStart); grade.draw(t);
};
```
Don't name a global `P`, `C`, `E` or `N` (taken by lib.js/news.js). For long videos put `shot`, the bug,
small print, wipe, grade and the photo size table in the project's `common.js`.

## Components
| Call | What it is | Draw |
|---|---|---|
| `Photo(p, href, {iw, ih, x, y, w, h, from:[zoom,fx,fy], to:[…], dark, fade})` | photo filling a box with a slow camera move; `map(px,py)` gives the screen point of an image pixel this frame | `draw(t, a, b)` = move from a to b |
| `Bug(svg, {name, section})` | channel name + section, top left; `.section('…')` to change | `draw(t, t0)` |
| `LowerThird(p, {kicker, title, x, y, size})` | red kicker + white title bar wiping in | `draw(t, t0, t1)` |
| `Headline(p, lines, {x, y, size, anchor, hi})` | lines rising out of a mask, red rule; `hi` = gold line | `draw(t, t0, t1)` |
| `BigNumber(p, {to, from, dec, prefix, suffix, label, x, y, size})` | serif count-up (Spanish grouping 100.000, decimals 1,8), gold label | `draw(t, t0, t1)` |
| `Chapter(p, {n, title, sub})` | "01" + title + italic subtitle, left aligned | `draw(t, t0, t1)` |
| `StudyCard(p, {pub, title, lines, hi})` | paper page sliding up, highlighter on line `hi` | `draw(t, t0, tHighlight, t1)` |
| `Quote(p, {lines, who})` | real quote, lines appearing one by one | `draw(t, t0, t1)` |
| `Bars(p, {rows:[[label, value, color]], max, unit, dec})` | horizontal bars on dark tracks | `draw(t, [t0 per row])` |
| `Split(p, left, right)` with `{href, iw, ih, label, good}` | two photos, teal ✓ / red ✗ verdict bars | `draw(t, a, b, tLeft, tRight)` |
| `Callout(p, {r, lx, ly, text})` | ring drawing itself + leader + gold label | `draw(t, t0, t1, photo.map(px, py))` |
| `Checklist(p, {title, items})` | numbered panel ("PREGUNTE A SU MÉDICO") | `draw(t, [t0 per item])` |
| `Wipe(svg)` | red slab with gold edge across the screen | `draw(t, tMid)`; swap shots at tMid |
| `SmallPrint(svg)` | `set(source, note)` each frame: "Fuente: …" left, "Imagen ilustrativa" right | — |
| `EndCard(p, {name})` | channel name, SUSCRÍBASE with bell, consult-your-doctor line | `draw(t, t0)` |
| `Grade(svg)` | vignette + grain; call `draw(t)` last | `draw(t)` |

From kit.js: `cutVis` / `sceneVis` (shot visibility), `punch` (one lean-in on a key number),
`float` (idle bob for a cut-out object), `Cutout` (item-sheet cut-outs), `Icon.heart/pill/…`.

## Hook recipe (first 30–40 s)
1. **Cold open** on a hero photo (person in the situation), camera drifting in. No title card.
2. **Headline** rises on the question (2 lines, second in gold).
3. **Number slam** on a darkened second photo (`BigNumber`), source in small print.
4. Two or three **hard cuts** through the problem (photos with one lower third each).
5. **Promise**: three small framed photos for the three parts of the answer (`Photo` with x/y/w/h),
   each ~1 s, then "quédese hasta el final" over the last hero photo with a lower third.
6. Red **wipe** into chapter 1.

## Section recipe
1. Wipe → **Chapter** opener on a darkened photo (3–4 s). Update `bug.section(…)`.
2. **Situation**: hero photo + lower third with the section's key fact.
3. **Mechanism**: a photo with a `Callout` on the body part or object, or `Bars` / `BigNumber` for the data.
4. **Evidence**: `StudyCard` beside a photo (photo left 1000 px, page right).
5. **What to do**: `Split` (✓/✗) or a teal-bordered lower third; for safety advice, `Checklist`.
6. Last line bridges to the next section; the wipe lands on the next heading's pause.

Ending: last hero photo with the closing line as a `Headline`, then `EndCard`.

## Beat → visual
| Voice beat | Visual |
|---|---|
| a person's situation / symptom | hero photo, camera drifting to the face or the hands; lower third |
| "un estudio / investigadores" | `StudyCard` with the real finding highlighted |
| a single striking number | `BigNumber` on a 60 % dark photo, source in small print |
| comparison of amounts | `Bars` (gold for the one that matters, dim for the rest) |
| body part / organ | photo + `Callout`, or an organ item cut-out with `float` on a dark panel |
| food or habit good vs bad | `Split` with ✓/✗ |
| an organisation's recommendation | `Quote` (verbatim) or lower third "RECOMENDACIÓN" + source |
| warning / who should be careful | still photo, red kicker lower third "PRECAUCIÓN", hold 6–8 s |
| "pregunte a su médico" | `Checklist` with 2–4 questions |
| new section | `Wipe` + `Chapter` |
