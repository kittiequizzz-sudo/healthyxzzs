---
name: health-video
description: Make health and fitness science explainer videos for YouTube (short exercise explainers or 10–20-minute organ/topic videos, often Spanish scripts for seniors) in the channel's approved format: picture-first, key-phrase captions only, a paced hook, never a slide-deck look. Code-rendered infographics (titles, organ maps, mechanism diagrams, charts, count-ups, check/X and stamp verdicts, warnings, CTAs, quiz, on-screen sources) plus real drawings the user generates in free apps (exercise pose sheets shown as step sequences, organ/food item sheets, 2x2 scene panels shown as push-in stills). No puppet animation, no code-drawn people, no paid tools. Workflow: script → research and fact-check → asset order (sheets + voice spec) → the user sends sheets and a voice-over → cut assets, transcribe, map cues to words, build sections, render in parallel, QA → deliver the MP4 (split into parts under 30 MB). Use for any health/fitness video script, topic, asset sheet, voice-over or render request on this channel.
---

# Health explainer video creator

You make research-backed health and fitness explainer videos for this channel. They are **YouTube
videos, not slide decks**: picture first, short key-phrase captions, a fast but calm hook. Read
`references/youtube-style.md` and `references/production-format.md` first: it is the format the owner approved, the list of what they
rejected, and the scene recipes. The approved reference video is `projects/sample_flat/`
(`scene.html` → `out/sample_flat.mp4`).

## Working with this user
- **Chat in Vietnamese.** The user writes in Vietnamese; reply in Vietnamese.
- **Scripts may arrive in Spanish.** On-screen text follows the script language. Transcribe Spanish
  voice-overs with `--lang spanish`. Write fact-check notes in Vietnamese, with corrected lines given in
  the script language plus a Vietnamese meaning.
- **Image prompts in English,** since image apps follow English best, with a one-line Vietnamese
  explanation of each.
- **Zero cost.** The user does not pay for APIs. You cannot generate images or video here; the user
  generates pose sheets in free apps (Gemini, ChatGPT). Never propose paid tools as the default.
- **Never reuse clips from `reference/` demos** as if they were new work.
- **Research before showing any movement or claim.** Never invent angles, numbers or study details.
- **Faceless channel: the narrator never claims to be a doctor.** Scripts written for an on-camera
  clinician ("Soy endocrinóloga…", "mis pacientes…", host stories) get a narrator version (`script.md`)
  that removes the credential and invented personal stories. Use the original only if a real clinician
  signs it. Fictional patients (e.g. Doña Carmen) are fine when labelled "Dramatización" on screen.
- **No logos** of organisations or brands, and never AI-drawn ones; cite sources as text.

## STANDARD PROCESS (owner, 30 Oct 2026) — the default for every new script
The sarcopenia video (`projects/sarcopenia_5senales/`) is the reference build. Unless the owner says otherwise:
- **Style: warm pastel 2D cartoon for adults** in the line/palette of `characters/mascot_pastel/sheet.jpg`
  (README there has the style line and the code theme). Not the blue-skin style.
- **Small cast (~5):** order a cast lineup sheet `0 · reparto` first (main character + 2–3 recurring people +
  one per story in the script + a physio/doctor), attach it to every scene sheet. Not too many characters.
- **No repeated panels:** each drawn panel is used once. ~1 panel per 20 s of voice (≈ 6 sheets per 8 min),
  plus pose sheets for exercises, 1–3 item sheets (objects, anatomy, food) on cream `#FCEDCE`.
- **A pastel tint + accent per section** (`TINTS` in the reference `common.js`), each scene sheet prompt
  names its tint.
- **Owner's original mascot as host** (cut poses in `characters/mascot_pastel/cut/`) for CTAs, questions and
  bridges; the adult cast for the stories.
- **Give ALL prompts at once** (every part of the video), copy-paste ready in chat, in `order_pastel.md`. The
  owner generates everything, then sends the voice; build only when all sheets are in.
- **Sound:** synthesised background music + SFX, never downloaded (`scripts/collect_sfx.mjs` +
  `scripts/mix_audio.py`, see `qa-checklist.md`).
- **Delivery:** split with `scripts/split_parts.py` (cuts in voice pauses, keyframes forced at cuts,
  25 ms audio fades) — never `-f segment -c copy`, which made clicks and A/V drift at the joins.
- Build by copying `projects/sarcopenia_5senales/common.js` and its section HTMLs as the template.

## Workflow per video
1. **Intake:** save the script (any language, .docx is fine: unzip `word/document.xml`) and source log to
   `projects/<slug>/`.
2. **Research and fact-check:** check every claim against the sources and flag overstated or unsupported
   ones (`references/niche-playbook.md`). For every exercise, open or write its card in
   `references/motion-research.md` and its drawing spec in `references/anatomy-motion.md`, using web
   search for studies and citing them.
3. **Scene plan:** split the script into ~2–4 s beats and pick a scene type for each from
   `production-format.md`: infographic, diagram, chart, exercise step sequence or takeaway. Follow
   `youtube-style.md`: give every beat a picture, cap text at the key phrases (≤ 6 words, ≤ 2 captions on
   screen), keep the hook at a cut every 1.5–2.5 s, and budget ~1 drawing per 15–20 s of voice.
4. **Order assets** (`references/asset-order.md`): sheets, not single images. A pose sheet per exercise
   (3–4 poses in a row, template `characters/senior_m/situp_pose_sheet.md`); for topic videos an organ or
   food item sheet and 2×2 scene panels with the character; plus the voice spec. Write `order.md`.
5. **Check delivered sheets** (anatomy, character consistency, clocks/times, no baked-in text) and ask
   for regenerations with exact fixes.
6. **Cut poses:** `python3 scripts/cut_poses.py sheet.webp projects/<slug>/poses --name <exercise> --count N`.
   This writes aligned transparent PNGs in the house blue, plus `<name>_poses.json`.
   Other sheets: `python3 scripts/cut_items.py sheet.webp projects/<slug>/cut --names a,b,c` cuts separate
   items (organs, foods; reading order; `--close 3` if two items touch), and `--grid 2x2 --names …`
   splits a panel sheet into scene stills. Check the cut-outs on a dark contact sheet.
7. **Build scenes:** short video → one `scene.html` from `projects/sample_flat/scene.html`. Long topic
   video → one HTML per section plus `common.js`, starting from `projects/7dias_sin_cenar/` (recipes in
   `production-format.md`). Helpers: `flat/lib.js` and `flat/kit.js`.
8. **Time to the voice:** `node scripts/transcribe.mjs voice.wav transcript --lang spanish|english`.
   The script stays the truth for the words; the transcript only gives timestamps. Every beat lands
   0.1–0.3 s before its keyword. Write `cues.txt` (`label | phrase from the script`, in order) and run
   `node scripts/cues.mjs transcript/words.json cues.txt cues.js`; the scene reads `CUE.label`, so a new
   voice take only needs the cues re-run, not new times.
9. **Render and QA** (`references/qa-checklist.md`): run `node flat/render.mjs scene.html x --frames t1,t2,… --png out/f` and look at
   the frames. Fix placement, spelling and timing. Then run
   `node flat/render.mjs scene.html out/final.mp4 --audio voice.wav`.
   Long videos (10+ min): one HTML per script section, each setting `window.START`/`window.END` on the
   shared voice timeline, then `node scripts/render_sections.mjs projects/<slug> voice.mp3 out/final.mp4
   intro.html punto1.html … --jobs 3` (parallel, frame-snapped joins, voice added once; ~3× real time
   per job). Shared pieces for a video go in its `common.js` (see `projects/7dias_sin_cenar/`).
10. **Deliver** the MP4 with a short Vietnamese summary of what's in it and any changes made to on-screen
    facts. Files over 30 MB can't be uploaded to the app: split with
    `python3 scripts/split_parts.py video.mkv voice.mp3 out/parts <name>` (~170 s parts, clean joins) and
    send them in order. Never commit full renders (GitHub's 100 MB limit);
    commit the scenes, cues and assets so the video can be re-rendered.

Setup once per machine: `bash scripts/setup.sh`. It installs Whisper (offline), the flat renderer
dependencies (playwright-core) and the motion QA tools.

## Files
- `references/youtube-style.md`: picture-first rules, text budget, pacing and hook recipe. **Read first.**
- `references/production-format.md`: the approved format, the rejections and the scene recipes.
- `references/motion-research.md`, `references/anatomy-motion.md`: exercise research and drawing specs.
- `references/niche-playbook.md`: script structure, retention and health-claim rules.
- `references/style-bible.md`: palette (cream `#F5ECD7`, skin `#58A9E4`, red `#E23B2E`, orange
  `#F95C00`, amber `#F7AD36`, ink `#1B1A22`) and typography (Inter Black/ExtraBold).
- `references/history.md`: what was tried in this project and why it was dropped. Read it before
  proposing a "new" approach.
- `references/asset-order.md`: sheet types, prompt templates, voice spec, delivery checks.
- `references/qa-checklist.md`: build/QA gotchas (overflow, z-order, cues) and delivery limits.
- `references/legacy-skill-notes.md`: the earlier skill version (AI video, puppets), kept for reference only.
- `flat/`: `render.mjs` (HTML → MP4, deterministic), `lib.js` (helpers), `kit.js` (Still with push-in,
  Tile, Cutout, Stamp, Clock, DayCounter, icons, sceneVis, and the YouTube helpers Caption, cutVis,
  punch, slideIn, float). Organ/topic video reference:
  `projects/7dias_sin_cenar/intro.html`. `figure.js`, `pictogram.js` and
  `sheetfigure.js` are rejected experiments; don't use them for videos.
- `scripts/`: `cut_poses.py`, `cut_items.py`, `transcribe.mjs`, `cues.mjs`, `qa_pages.mjs` (contact sheet per section), `render_sections.mjs`, `setup.sh`, plus the legacy tools `render.py`,
  `puppet.py`, `motion.py` and `qa_motion.py`.
- `characters/`: the user's character sheets. `projects/`: one folder per video.
