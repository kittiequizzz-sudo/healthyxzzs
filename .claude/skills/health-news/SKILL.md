---
name: health-news
description: Make health videos for Latin seniors (Spanish, 60+) in a TV news / documentary style ("informe de salud"), the second visual style of this channel next to health-video. Realistic photos the user generates in free apps (single 16:9 hero photos, 2x2 photo grids, product-style item sheets) shown full-bleed with slow documentary camera moves, film grade and grain; code-rendered news graphics on a dark navy look (channel bug, red/white lower thirds, kinetic serif/condensed headlines, big serif count-up numbers, chapter openers, the study on screen as a paper page with a highlighter, real quotes, bar charts, split ✓/✗ comparisons, callouts that follow the camera, checklists, red wipe transitions, source line and "Imagen ilustrativa" labels, end card). Shares the health-video toolchain (renderer, Whisper cues, section renders, cutters). No fake network branding, no "última hora", no invented experts or quotes, no paid tools. Use when the user asks for the news, documentary, reportaje or noticiero style, or invokes /health-news.
---

# Health news / documentary video creator

Same channel, same audience (Spanish-speaking seniors, mostly Latin American), same research rules as
`health-video`. What changes is the **look and the edit**: a calm, trustworthy TV-documentary report
instead of a bright cartoon infographic. Reference: `projects/news_demo/scene.html` (30 s style demo,
no voice; it uses the 7dias drawings as stand-ins, a real video uses realistic photos).

Read first: `references/news-style.md` (look, pacing, honesty rules), then
`references/scene-recipes.md` (components and the hook/section recipes). Photos and voice:
`references/asset-order.md`.

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

## Workflow per video
1. **Intake:** save the script and source log to `projects/<slug>/` (`.docx`: unzip `word/document.xml`).
   Rewrite for a narrator if the script speaks as a doctor (health-video rule). Turn any "noticia de
   última hora" framing into an evergreen "informe".
2. **Research and fact-check** (`factcheck.md`, in Vietnamese, corrected lines in Spanish). Note the
   exact source for every number, study card and quote; a quote you can't find verbatim is dropped.
3. **Scene plan** (`plan.md`): split into beats of 3–6 s and pick a recipe per beat from
   `scene-recipes.md`. Hook first 30–40 s: a cut every 2–3 s. Budget **1 photo per 8–12 s of voice**
   (photos carry the whole picture in this style). Mark which photos are full-bleed heroes.
4. **Order assets** (`asset-order.md`): hero photos one per prompt (16:9), secondary photos as 2×2
   grids, item sheets on white, plus the voice spec. Write `order.md`.
5. **Check delivered photos:** hands and fingers, faces consistent for the recurring character,
   no text, no logos, no brand names, medical devices plausible, no gore. Ask for regenerations with
   exact fixes.
6. **Prepare:** put photos in `assets/` under their ordered names. Grids:
   `python3 .claude/skills/health-video/scripts/cut_items.py grid.png projects/<slug>/cut --grid 2x2 --names a,b,c,d`.
   Item sheets: same script with `--names` (white background works; corners are sampled).
   Read sizes once (`python3 -c "from PIL import Image; print(Image.open(f).size)"`) into the
   project's `common.js` size table.
7. **Build:** short video → one `scene.html` from `projects/news_demo/scene.html`. Long video → one HTML
   per section + `common.js` with the shared bug, small print, wipe and grade (pattern:
   `projects/7dias_sin_cenar/common.js`, but news components). Every page loads
   `news/fonts.css`, health-video `lib.js` + `kit.js`, then `news/news.js`.
8. **Time to the voice:** `node .claude/skills/health-video/scripts/transcribe.mjs audio/voice.mp3 transcript --lang spanish`,
   write `cues.txt`, run `cues.mjs` → `cues.js`. Graphics land 0.1–0.3 s before their word; hard cuts
   land on the first word of the beat.
9. **QA:** `node .claude/skills/health-video/scripts/qa_pages.mjs projects/<slug> 3 intro.html …` and look
   at every contact sheet with the checks in `news-style.md` § QA, then the shared `qa-checklist.md`.
10. **Render and deliver:** `render.mjs … --audio` (short) or `render_sections.mjs … --jobs 3` (long).
    The film grain makes the CRF 17 render huge (30 s ≈ 50 MB), so re-encode once for delivery:
    `ffmpeg -i final.mp4 -c:v libx264 -crf 26 -preset slow -c:a copy -movflags +faststart final_small.mp4`
    (30 s ≈ 3 MB, grain still visible). Then split anything over 30 MB into ~280 s parts without
    re-encoding again (`qa-checklist.md`). Summarise in
    Vietnamese, including any on-screen facts you changed. Commit scenes, cues and cut assets, never the
    full render.

## Files
- `references/news-style.md`: palette, type, grid, pacing, transitions, sound, honesty rules, QA.
- `references/scene-recipes.md`: every component with its call, the hook and section recipes, beat → visual table.
- `references/asset-order.md`: photo prompt templates (hero, 2×2 grid, item sheet), recurring characters, voice spec, delivery checks.
- `news/news.js`: components (`NewsStage`, `Grade`, `Photo`, `Bug`, `LowerThird`, `Headline`,
  `BigNumber`, `Chapter`, `StudyCard`, `Quote`, `Bars`, `Split`, `Callout`, `Checklist`, `Wipe`,
  `SmallPrint`, `EndCard`). `news/fonts.css`: Oswald, Source Serif 4, Inter.
- `assets/fonts/`: Oswald and Source Serif 4 (SIL OFL); Inter comes from health-video.
