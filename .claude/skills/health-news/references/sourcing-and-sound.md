# Sourcing pictures and sound yourself

The owner prepares only a few key assets (a recurring character, a scene the stock libraries don't have)
and the voice. You find every other picture and make all the sound. Worked example:
`projects/news_demo2/` (scene.html, credits.json, window.SFX).

## Photos: `scripts/find_media.py`
```
export TMPDIR=<scratchpad>
python3 .claude/skills/health-news/scripts/find_media.py search "blood pressure" --n 8 --sheet <scratchpad>/s1.jpg
python3 .claude/skills/health-news/scripts/find_media.py search "heart anatomy" --src science --sheet <scratchpad>/s2.jpg
python3 .claude/skills/health-news/scripts/find_media.py get projects/<slug> bp_arm oca98fa9d
```
All searches go through Openverse, which proxies the files, so they work even though the photo hosts
themselves are blocked here. Look at the contact sheet before choosing.

| `--src` | Sources | Licence | Best for | Size |
|---|---|---|---|---|
| `stock` (default) | WordPress Photo Directory, rawpixel PD set, StockSnap | CC0 | people, food, clinics, objects | 960–2048 px |
| `flickr` | Flickr | CC0 / PD / CC BY | everyday life, markets, Latin America, older people | ≤ 1024 px |
| `science` | Wellcome Collection, NASA, Met, Cleveland, Brooklyn, SMK, Rijksmuseum | CC0 / PD / CC BY | old anatomy plates, medical history, space, archive look | varies |
| `commons` | Wikimedia Commons API | CC0 / PD / BY / BY-SA | anatomy, diagrams | rate-limited here (429) |

- `get` saves `assets/<name>.jpg` at 2112 px wide (Lanczos + light unsharp when upscaling) and logs
  title, author, licence and page in `credits.json`. **CC BY pictures (Flickr, Wellcome) need the
  credit line in the video description**; CC BY-SA is filtered out on purpose (share-alike on the video).
- Short English queries work best ("stethoscope", "senior couple", "salmon vegetables"). Search a beat
  two ways (object + people) and pick the more cinematic picture.
- Small pictures (≤ 1300 px) look best framed (`Photo` with w ≤ 1100, `Split`), under a dark overlay,
  or as a parallax clip (below); the grain hides the softness. Archive plates (portrait) go framed on
  the navy background, like a document.
- **Watermarks:** some rawpixel files come back with a tiled "rawpixel" watermark. Check every download
  at 1:1 on a contact sheet of centre crops and drop any with a mark.

## Motion without footage: `scripts/parallax.py` + `Clip`
Stock video sites are blocked here (see the table at the end), so motion comes from **2.5D parallax**:
Depth Anything V2 Small (Apache-2.0, ONNX on CPU, downloaded once from GitHub) estimates depth, and the
photo is warped so near things move more than far things. It reads as a real camera move.
```
python3 .claude/skills/health-news/scripts/parallax.py assets/couple.jpg clips/couple --move push --secs 3.6 --focus 0.5 0.4
```
- Moves: `push`, `pull`, `left`, `right`, `rise`, `orbit`; `--amount` 1.0 (gentle) to 1.5 (max before the
  edges stretch). `--focus x y` = the point to keep centred (a face). ~3 s per clip on CPU.
- In the scene: `const c = Clip(g, 'clips/couple', { n: 108, dark: 0.15 }); … c.draw(t, t0)`. The renderer
  waits for each frame to load (`window.ready`), so renders stay deterministic.
- Use it for hero shots (hook, chapter openers, the closing shot), about 1 in 3 shots; keep the rest as
  `Photo` camera moves. Avoid it on pictures with thin foreground details (hair against sky, fences),
  where the stretching shows; look at the first and last frame before using a clip.
- Clips are big (≈ 30 MB per 4 s): `clips/` is git-ignored, regenerate them with the same command
  (write the commands in the project's `plan.md`).

## Sources that need the owner (ask when needed)
| Site | What it adds | Needs |
|---|---|---|
| Pixabay | stock **video**, music, photos (free, commercial OK) | domains `pixabay.com`, `cdn.pixabay.com` + free API key (secret `PIXABAY_API_KEY`) |
| Mixkit | high-quality stock video, no key | domains `mixkit.co`, `assets.mixkit.co` |
| Internet Archive | public-domain medical/educational films (Prelinger), archive look | domain `archive.org` (+ `*.archive.org`) |
| NASA Images | space/science video, public domain | domains `images-api.nasa.gov`, `images-assets.nasa.gov` |
| Coverr | stock video | domain `coverr.co` + free API key |
| Pexels | best people footage | not issuing new API keys (Oct 2026) |
| Freesound / Jamendo | real recorded SFX and music | domains `cdn.freesound.org` / `*.jamendo.com` (search already works through Openverse) |

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
