---
name: health-video
description: Make health and fitness science explainer videos in the channel's approved format. It combines code-rendered infographics (kinetic titles, anatomy diagrams, count-up numbers, charts, check/X takeaways, on-screen sources) with exercise step sequences built from real drawings: one AI pose sheet per exercise, which the user generates, shown as sequential poses with step cards, muscle callouts and motion arcs. There is no puppet animation and no code-drawn people. Workflow: script or topic → research and fact-check → pose-sheet prompts → the user sends pose sheets and a voice-over → cut poses, build scenes, time them to the voice, render and QA → deliver the MP4. Use for any health/fitness video script, topic, pose sheet, voice-over or render request on this channel.
---

# Health explainer video creator

You make research-backed health and fitness explainer videos for this channel. Read
`references/production-format.md` first: it is the format the owner approved, the list of what they
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

## Workflow per video
1. **Intake:** save the script (any language) and source log to `projects/<slug>/`.
2. **Research and fact-check:** check every claim against the sources and flag overstated or unsupported
   ones (`references/niche-playbook.md`). For every exercise, open or write its card in
   `references/motion-research.md` and its drawing spec in `references/anatomy-motion.md`, using web
   search for studies and citing them.
3. **Scene plan:** split the script into ~2–4 s beats and pick a scene type for each from
   `production-format.md`: infographic, diagram, chart, exercise step sequence or takeaway.
4. **Order pose sheets:** one prompt per exercise. Use 3–4 poses in one row, the same character, a cream
   background and no text (template: `characters/senior_m/situp_pose_sheet.md`). Add only the props the
   exercise needs.
5. **Check delivered sheets** against the anatomy checklist, and ask for regenerations with exact fixes.
6. **Cut poses:** `python3 scripts/cut_poses.py sheet.webp projects/<slug>/poses --name <exercise> --count N`.
   This writes aligned transparent PNGs in the house blue, plus `<name>_poses.json`.
7. **Build `scene.html`:** start from `projects/sample_flat/scene.html` and use `flat/lib.js` for text,
   cards, easing and charts.
8. **Time to the voice:** `node scripts/transcribe.mjs voice.wav transcript --lang spanish|english`.
   The script stays the truth for the words; the transcript only gives timestamps. Every beat lands
   0.1–0.3 s before its keyword.
9. **Render and QA:** run `node flat/render.mjs scene.html x --frames t1,t2,… --png out/f` and look at
   the frames. Fix placement, spelling and timing. Then run
   `node flat/render.mjs scene.html out/final.mp4 --audio voice.wav`.
10. **Deliver** the MP4, along with a short Vietnamese summary of what's in it and any open fact-check flags.

Setup once per machine: `bash scripts/setup.sh`. It installs Whisper (offline), the flat renderer
dependencies (playwright-core) and the motion QA tools.

## Files
- `references/production-format.md`: the approved format, the rejections and the scene recipes. **Read first.**
- `references/motion-research.md`, `references/anatomy-motion.md`: exercise research and drawing specs.
- `references/niche-playbook.md`: script structure, retention and health-claim rules.
- `references/style-bible.md`: palette (cream `#F5ECD7`, skin `#58A9E4`, red `#E23B2E`, orange
  `#F95C00`, amber `#F7AD36`, ink `#1B1A22`) and typography (Inter Black/ExtraBold).
- `references/history.md`: what was tried in this project and why it was dropped. Read it before
  proposing a "new" approach.
- `references/legacy-skill-notes.md`: the earlier skill version (AI video, puppets), kept for reference only.
- `flat/`: `render.mjs` (HTML → MP4, deterministic), `lib.js` (helpers). `figure.js`, `pictogram.js` and
  `sheetfigure.js` are rejected experiments; don't use them for videos.
- `scripts/`: `cut_poses.py`, `transcribe.mjs`, `setup.sh`, plus the legacy tools `render.py`,
  `puppet.py`, `motion.py` and `qa_motion.py`.
- `characters/`: the user's character sheets. `projects/`: one folder per video.
