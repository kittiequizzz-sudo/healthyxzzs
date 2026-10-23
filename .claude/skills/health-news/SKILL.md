---
name: health-news
description: Make health videos for Latin seniors (Spanish, 60+) in a TV news / documentary style ("informe de salud"), the second visual style of this channel next to health-video. Real CC0 photos Claude finds itself (find_media.py via Openverse: WordPress Photo Directory, rawpixel, StockSnap) plus a few key assets from the user, shown full-bleed with slow documentary camera moves, film grade and grain; code-rendered news graphics on a dark navy look (channel bug, red/white lower thirds, kinetic serif/condensed headlines, big serif count-up numbers, chapter openers, the study on screen as a paper page with a highlighter, real quotes, bar charts, split ✓/✗ comparisons, callouts that follow the camera, checklists, red wipe transitions, source line and "Imagen ilustrativa" labels, end card) and a synthesised sound design (sfx.py effects + music bed, mix.py with voice ducking, −14 LUFS). Shares the health-video toolchain (renderer, Whisper cues, section renders, cutters). No fake network branding, no "última hora", no invented experts or quotes, no paid tools. Use when the user asks for the news, documentary, reportaje or noticiero style, or invokes /health-news.
---

# Health news / documentary video creator

Same channel, same audience (Spanish-speaking seniors, mostly Latin American), same research rules as
`health-video`. What changes is the **look and the edit**: a calm, trustworthy TV-documentary report
instead of a bright cartoon infographic. Reference: `projects/news_demo/scene.html` (30 s style demo,
no voice; it uses the 7dias drawings as stand-ins, a real video uses realistic photos).

Read first: `references/news-style.md` (look, pacing, honesty rules), then
`references/scene-recipes.md` (components and the hook/section recipes).

**Who prepares what:** you find the photos yourself (`references/sourcing-and-sound.md`,
`scripts/find_media.py`, CC0 libraries) and make all the sound (`scripts/sfx.py`, `scripts/mix.py`).
The owner sends only the voice and a few key assets the libraries can't give (a recurring character,
a specific scene): order those with `references/asset-order.md`. Photo reference with real CC0 pictures
and sound design: `projects/news_demo2/`.

## Shared with health-video (read there, don't duplicate)
This skill reuses the health-video tools and rules. Paths are relative to `.claude/skills/health-video/`.
- Working with this user (Vietnamese chat, Spanish scripts, English image prompts, zero cost,
  faceless narrator, no logos): `SKILL.md` § Working with this user. All of it applies here.
- Fact-check and claim rules: `references/niche-playbook.md` § Health-claim rules.
- Renderer and helpers: `flat/render.mjs`, `flat/lib.js`, `flat/kit.js` (`sceneVis`, `cutVis`,
  `punch`, `float`, `Cutout`, `Icon`, `pop`, `show`).
- Scripts: `scripts/transcribe.mjs`, `scripts/cues.mjs`, `scripts/render_sections.mjs`,
  `scripts/qa_pages.mjs`, `scripts/cut_items.py`, `scripts/setup.sh` (run once per machine).
- Build/QA gotchas and delivery limits: `references/qa-checklist.md`.

What does **not** carry over: the cream palette, the blue cartoon character, pose sheets, `Caption`
pills and stamps. Use the news components in `news/news.js` instead.

## Workflow per video (target: ≤ 1 h 30 from script + voice to delivered MP4)
Reference project: `projects/video1/` (10-min A1C video: `plan.js`, `cues.txt`, `index.html`).
1. **Intake (5 min):** read the script and production file (Google Drive connector if linked), save the
   voice to `projects/<slug>/audio/voice.mp3`. Start the transcription right away in the background:
   `node .claude/skills/health-video/scripts/transcribe.mjs audio/voice.mp3 transcript --lang spanish`
   (≈ 25 min CPU for 10 min of voice; install Whisper first if `~/.cache/health-video/asr` is missing).
2. **Fact-check (10 min):** the production file usually has a source log; check the numbers you will
   put on screen against it, and the faceless rules (no doctor credential, dramatisation labels).
3. **Photos (15 min, parallel):** run all searches at once (`find_media.py search … --nosheet` or with
   `--sheet`), look at the contact sheets, `get … --fast` the picks in parallel, check them at 1:1 for
   watermarks and logos. **Send the owner a real-photo order (`photos.md`, `asset-order.md` § Real photos
   the owner finds) for people, places and hero shots: they search Pexels/Unsplash/Pixabay while you
   build.** Plus AI images only for recurring characters (`order.md`). `own('name', 'fallback')` in the
   plan swaps their photo in when it arrives. Goal: ~35–45 distinct pictures per 10 minutes, none used
   more than twice; turn the hero shots into parallax clips.
4. **Plan (20 min):** `cues.txt` (label | phrase), then `plan.js`: one line per shot, keyed to cues
   (types in `news/engine.js`: photo, number, chapter, study, bars, checklist, warning, split, quote, clip,
   end, custom). The engine adds the bug, small print, wipes and the sound design. Run
   `python3 scripts/prep.py projects/<slug>` (photo sizes, voice length). Aim for a new picture or
   graphic every 4–10 s; no shot under 1.5 s.
   **Owner feedback (video 3), both are rules:**
   - **Photo-only edits are boring, and reused photos make it worse.** No photo in more than 2 shots, never
     the same photo in two shots in a row (owner photos too: `p_doctora` ended up in 4 shots of video 3).
     When a photo would come back a third time, or a beat explains a mechanism, a number, a list or a
     cause → effect, make it a 2D animated scene instead (`news/anim.js`, `type: 'custom'`). Target at least
     one animated scene for every two photo shots. Time each change to its word: add `label | phrase`
     lines to `cues.txt` for the words the animation reacts to.
   - **Order the 2D illustrations at the same time as the photo order** (step 3), not after the first
     render: `projects/video3/anim_assets.md` is the template (one object on white, no text, the shared
     style block, first image attached as style reference). Cut them out with
     `python3 scripts/art.py projects/<slug> [--keep] [--holes] [--tol N] <image> <name> …` into
     `assets/art/`, re-run prep.py; until they arrive anim.js draws vector stand-ins. Look at every cut-out
     on navy (white objects need `--tol 5`, enclosed white needs `--holes`, crossfading pairs `--keep`).
5. **Cues + QA (15 min):** `cues.mjs transcript/words.json cues.txt cues.js`; check order and gaps; render
   one frame per shot into contact sheets and look at all of them (overflow, faces under text, labels).
   Then `node scripts/plan_check.mjs projects/<slug>/index.html projects/<slug>/qa_plan`: fix every photo it
   flags for reuse, and go through `qa_plan/motion*.jpg` (a frame 0.6 s after every cue inside every
   animated shot) with the **motion accuracy checklist** below. Re-check after the owner's art arrives
   (overlays drawn for the stand-in must be re-aligned to the real drawing).

   **Motion accuracy checklist** (each animated frame, read against its voice line):
   - *Science:* the motion shows what the voice says, in the right direction and order: what goes up or
     down, which organ sends what to which (gut → GLP-1, pancreas → insulin only while sugar is high, less
     glucagon → the liver releases less sugar), what starts and what stops. Nothing extra the script
     doesn't claim; no motion that implies a cure, a size of effect or a speed the source doesn't give.
   - *Numbers:* every count, grid, bar and meter matches the on-screen source (3 of 100 lights 3 dots).
     Curves without real data carry "Curva ilustrativa" and no axis numbers.
   - *Anatomy and objects:* the right organ, the right way up, the highlight on the right part (retina
     at the back of the eye, the key in the keyhole, the swing pivot at the bell's handle), flows starting
     and ending on the organ that sends and the one that receives.
   - *Timing:* each change lands on its word (±0.3 s), not before the voice names it; nothing important
     still entering when the shot cuts.
   - *Legibility:* labels don't cover the moving part or each other, ≥ 40 px, readable at phone size.
6. **Render (≈ 10–15 min for 10 min of video):**
   `node scripts/render_layers.mjs index.html out/video.mp4 --jobs 4 --grain 5 --crf 21 --maxrate 6M`
   then `python3 scripts/mix.py index.html out/video.mp4 out/final.mp4 --voice audio/voice.mp3`.
7. **Deliver:** split into parts under 30 MB without re-encoding (`qa-checklist.md`); summary in
   Vietnamese. Commit plan, cues, assets and credits, never `out/`.

Speed notes: `render_layers.mjs` captures the graphics only when they change (fast PNG, transparent)
and composites the photos with OpenCV; the old `render.mjs` path (full page screenshots) is ~5× slower.
Don't set `TMPDIR` for renders (Chromium crashes) and don't `pkill -f` a pattern that appears in your own
command line.

## Files
- `references/news-style.md`: palette, type, grid, pacing, transitions, sound, honesty rules, QA.
- `references/scene-recipes.md`: every component with its call, the hook and section recipes, beat → visual table.
- `references/sourcing-and-sound.md`: finding CC0 photos, watermark/people rules, credits, SFX and the mix.
- `scripts/find_media.py`, `scripts/upscale.py`, `scripts/parallax.py`, `scripts/sfx.py`, `scripts/mix.py`: photo search/download (stock, Flickr, science/museum sources), Real-ESRGAN upscaling, 2.5D parallax clips from photos, synthesised effects + music bed, soundtrack mix.
- `references/asset-order.md`: photo prompt templates (hero, 2×2 grid, item sheet), recurring characters, voice spec, delivery checks.
- `news/engine.js`: plan-driven `Story(cfg, shots)`; `scripts/prep.py`, `scripts/render_layers.mjs` + `compose.py` (fast layered render).
- `news/news.js`: components (`NewsStage`, `Grade`, `Photo`, `Bug`, `LowerThird`, `Headline`,
  `BigNumber`, `Chapter`, `StudyCard`, `Quote`, `Bars`, `Split`, `Callout`, `Checklist`, `Wipe`,
  `SmallPrint`, `EndCard`). `news/fonts.css`: Oswald, Source Serif 4, Inter.
- `scripts/map_paths.mjs` + `assets/geo/`: real country shapes (Natural Earth, offline) projected into SVG
  paths for a view (`{name, box, extent, projection}`) → `maps.js` with `window.MAPS[name]` (paths, centroids,
  bboxes). Use it for any country/map scene instead of drawing or AI-generating maps (AI maps get borders wrong).
- `scripts/plan_check.mjs`: photo-reuse report + motion QA frames (run before every render).
- `news/anim.js`: 2D animated scenes (`Agenda`, `TwoDown`, `GutGLP1`, `PancreasKeys`, `OnlyWhenHigh`,
  `LiverTap`, `BrainFull`, `QuietBell`, `WeekCalendar`, `TwoBells`, `RustyLock`, `HeartKidneys`,
  `StomachSymptoms`, `ThyroidWarn`, `EyeRetina`, `FatMuscleBlocks`, `MuscleCurve`, `MuscleDoors`, `ThreeNo`,
  `SugarDrop`, `WatchThree`) and their parts (`AnimBG`, `Kicker`, `Pill`, `Art`, `Bell`, `Stream`, `Meter`,
  `DrawLine`, `ICON`). Load it in index.html before engine.js. `scripts/art.py` cuts out owner illustrations.
- `assets/fonts/`: Oswald and Source Serif 4 (SIL OFL); Inter comes from health-video.
