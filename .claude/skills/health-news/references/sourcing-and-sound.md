# Sourcing pictures and sound yourself

The owner prepares only a few key assets (a recurring character, a scene the stock libraries don't have)
and the voice. You find every other picture and make all the sound. Worked example:
`projects/news_demo2/` (scene.html, credits.json, window.SFX).

## Photos: `scripts/find_media.py`
```
export TMPDIR=<scratchpad>
python3 .claude/skills/health-news/scripts/find_media.py search "blood pressure" --n 8 --sheet <scratchpad>/s1.jpg
python3 .claude/skills/health-news/scripts/find_media.py get projects/<slug> bp_arm oca98fa9d
```
- Searches Openverse with commercial + modification licences only, from **WordPress Photo Directory,
  rawpixel (public-domain set) and StockSnap**, all CC0. Openverse proxies the files, so it works even
  though those hosts are blocked here. Look at the contact sheet before choosing.
- `get` saves `assets/<name>.jpg` and logs title, author, licence and page in `credits.json`.
- Short English queries work best ("stethoscope", "senior couple", "salmon vegetables"). Search a
  beat two ways (object + people) and pick the more cinematic picture.
- Sizes: WordPress ≈ 2048 px; rawpixel/StockSnap come back at ≈ 960–1300 px. `get` resizes every
  photo to 2112 px wide (Lanczos + light unsharp when upscaling); prefer the small ones framed
  (`Photo` with w ≤ 1100, `Split`) or under a dark overlay; the grain hides the softness.
- **Watermarks:** some rawpixel files come back with a tiled "rawpixel" watermark. Check every download
  at 1:1 on a contact sheet of centre crops and drop any with a mark.
- Wikimedia Commons (`--src commons`) has the best medical and anatomy pictures, but from this
  environment its API and file server answer 429 most of the time. Try it for anatomy only; the
  script backs off and retries.
- Pexels / Pixabay (best for people and video footage) need the owner to allow their domains and add a
  free API key as an environment secret. Until then there is no stock footage: motion comes from the
  camera moves, callouts and graphics.

Rules for people in stock photos: never imply that an identifiable person has the disease being
discussed or did something bad. Use them for neutral moments (measuring blood pressure, eating,
walking, a couple smiling), and keep symptoms on hands, objects or silhouettes. Small print
"Imagen ilustrativa" on every photo of people. Historic photos (Library of Congress) can carry the
source as their note.

Credits: CC0 needs none, but list `credits.json` in the video description anyway (good practice,
and required for any CC BY picture).

## Sound: `scripts/sfx.py` + `scripts/mix.py`
All effects and the music bed are synthesised (numpy), so there are no licence questions.
- `python3 scripts/sfx.py lib <dir>` writes every effect to listen to: whoosh, swish, impact, boom,
  riser, tick, paper, marker, ding, thunk, pop, heart, shutter.
- The scene lists its sound design in `window.SFX = [[t, 'name', gainDb], …]` on the same timeline
  as the pictures (cue-based in a real video: `[at('k'), 'impact', -4]`).
- `python3 scripts/mix.py scene.html out/video.mp4 out/mixed.mp4 [--voice audio/voice.mp3]` builds the
  soundtrack (voice, ducked music bed, effects) and normalises to −14 LUFS. Several section pages:
  pass them comma-separated.

Sound grammar (keep it this sparse; seniors dislike busy sound):
| Moment | Effect | Gain |
|---|---|---|
| video start | boom | −10 |
| headline / lower third in | swish | −6 to −8 |
| hard cut (only on the hook and between shots) | swish | −10 |
| number slam | impact, then tick run during the count-up | −4 / −6 |
| heart topic accent | heart (1–2 beats) | −4 |
| callout ring | marker | −14 |
| into a chapter | riser 0.9 s before, whoosh on the wipe, boom on the title | −6 / −2 / −4 |
| study page / highlighter | paper / marker | −2 / −4 |
| ✓ / ✗ verdicts | ding / thunk | −6 |
| end card | whoosh, pop on the button | −6 / −4 |
No effect under a warning or the checklist, and never two effects within 0.2 s of a spoken keyword.
