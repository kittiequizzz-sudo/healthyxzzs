---
name: health-video
description: Produce health/fitness science explainer videos in the house style (faceless blue anatomy mannequins on cream, red target muscles, orange/amber motion graphics, hard cuts every ~2.5s, fast punchy VO), with correct, smooth exercise motion. Phases. (0) The user sends character sheets (young man, seniors…) and you build reusable characters and rigs. (1) The user sends a script with visual direction and a source log, and you research every movement, plan each shot's motion path (AI image-to-video with start/end poses, or code puppet), and return the asset order with exact pose and motion prompts plus a fact-check. (2) The user sends assets and voice, and you QA every AI clip's motion with pose tracking, time everything to the voice, animate puppet shots, render, QA frames and deliver the MP4. Use for any script, character sheet, source log, asset, AI clip or voice-over for a health/fitness/anatomy video, or a request to make, order assets for, check motion of, or render one.
---

# Health explainer video creator

You are the editor, motion designer and movement coach for a health and fitness science channel.
The look is reverse-engineered from the reference cuts in `reference/`; see `reference/ANALYSIS.md`.
Viewers in this niche judge credibility by quality. The characters must be richly illustrated, and
every movement must be the movement a coach would actually teach.

The production split:
- **The user makes:** character sheets, AI stills and AI video clips (from your prompts), the
  voice-over and the music.
- **You make:** the movement research, shot plan, prompts, motion QA, puppet animation, every motion
  graphic, timing, audio mix and final render.

Read before working:
- `references/style-bible.md`: palette, type, motion graphics, timing and audio numbers. **Always.**
- `references/motion-research.md`: how each exercise really moves. **Always, before planning any shot
  where a body moves.** If an exercise is missing, research it first (use web search) and add a card.
  Never invent joint angles.
- `references/anatomy-motion.md`: what a body must *look like* at each key pose (scapula, hands,
  armpit, muscle shapes) and why rotating a still limb drawing is anatomically wrong. **Always,
  before writing any keyframe or motion prompt.**
- `references/character-sheets.md`: the cast, what the user generates per character, and which
  motion path suits which shot.
- `references/niche-playbook.md`: script structure, retention, visual vocabulary, health-claim rules.
- `references/asset-order.md`: Phase 1 output format and prompt templates (stills, pose keyframes,
  motion prompts).
- `references/timeline-spec.md`: timeline JSON, including `puppet` shots and the overlay catalogue.

Setup once per machine: `bash .claude/skills/health-video/scripts/setup.sh`. It installs the renderer
dependencies, the offline Whisper model, and the MediaPipe pose model plus libEGL used for motion QA.

## Project layout

```
characters/<id>/        reusable cast: master sheet views, rig kit, <view>.rig.json, notes.md
projects/<slug>/
  script.md, sources.md         the user's inputs, verbatim
  shotlist.md                   beats, motion plan per shot (exercise card, path, tempo, reps)
  order.md, manifest.json       the asset order (Phase 1)
  assets/  audio/               deliveries
  qa/motion/                    qa_motion.py reports for every AI clip (json + curve png)
  transcript/                   words.json / words.txt / lines.txt
  timeline.json                 the edit
  qa/  out/                     contact sheets, draft.mp4, final.mp4
```

## Phase 0: characters (once per character)

1. Save the user's sheet images to `characters/<id>/`. Check the requirements in
   `character-sheets.md`: A-pose with a gap between arms and torso, cream background, consistent
   views, no text. Ask for regenerations where they fail, and say exactly why.
2. If a rig kit was supplied (body without arms + separate limb images), write
   `<view>.rig.json` with `image` pieces, pivots at the joints and `muscles`/`regions`. If only the
   master sheet exists, cut pieces with polygons. Do this only where the art has gaps between
   parts, and add `underlay` shapes for anything a moving piece uncovers.
3. Sweep every joint through its full researched range (`render.py --sheet` on a test timeline) and
   look at every frame. Seams, gaps or detached parts mean the rig isn't done.
4. Write `characters/<id>/notes.md`: proportions, the tempo multiplier (seniors ×1.5) and any
   ranges this body should not exceed.

## Phase 1: script → research → asset order

1. Save `script.md` and `sources.md`. **Fact-check** each claim against the source log and flag
   unsupported or overstated claims with suggested rewrites (rules in the playbook).
2. **Beats:** split the VO into ~2–3 s beats (≈3.2 words/s). For each beat pick the base
   (character / prop / anatomy / plain cream), the overlays and the keyword they land on.
3. **Movement research:** for every beat where a body moves, open its card in
   `motion-research.md`. Missing card → search for kinematics and EMG studies, write the card with
   confidence labels, add `motion.py` and `qa_motion.py` entries. Record in `shotlist.md`: the
   exercise, the correct or fault variant, view, reps, tempo (video/controlled; seniors slower), and
   the muscles to highlight on which word.
4. **Choose the motion path per shot** (table in `character-sheets.md`): AI video for whole-body,
   weight-shift and leg movements, for "hero" shots, and for **any** range of motion (arms
   included). Puppet only for holds, breathing/idle, small settles and highlights on keyframe
   stills.
5. **Write the order** (`asset-order.md` format). For AI clips: a start-pose and end-pose prompt with
   the card's exact angles, and a motion prompt (one action, the reps, the tempo in seconds, what
   must stay still, a static camera, cream background). For puppet shots: nothing to order.
6. Reply with a short summary (shots, assets, runtime, flags) and deliver `order.md`.

## Phase 2: assets + voice → video

1. **Collect and check files:** copy them into `assets/` and `audio/`, then run `check_assets.py`.
2. **Motion QA every AI clip, before any editing:**
   `python3 .claude/skills/health-video/scripts/qa_motion.py assets/S07_clip.mp4 --exercise lateral_raise -o qa/motion/S07`.
   Read the verdicts *and* look at the curve PNG. REJECT means wrong range, a missing rep, a
   one-frame pop instead of a lift, asymmetry, moving parts that should stay still, limbs changing
   length (melting) or jitter. Collect all rejects into one regeneration list with the specific
   fix for each (for example "arms only reached 70°, end frame must show arms at shoulder height").
   Never cut a rejected clip into the video. Use a puppet shot or a hold of the start pose until
   the replacement arrives.
3. **Transcribe** with `transcribe.mjs`. The script is the truth for the words; the transcript only
   supplies timestamps.
4. **Build `timeline.json`:**
   - shots start 0.1–0.2 s before their first word, with hard cuts;
   - overlays land 0.1–0.3 s before their keyword;
   - muscle highlights (`highlight_at`) land on the muscle's name;
   - a rep's top position should coincide with the stressed word when possible (shift `delay`);
   - AI clips: `trim` to the cleanest rep;
   - puppet shots: `puppet` block with `motion`, `reps`, `tempo`, `highlight`, plus `capture` when
     a real demo curve exists.
5. **QA frames:** run `render.py --draft --sheet`. Check placement, spelling, that limbs never
   detach, and that each rep looks like the card. For puppet shots, render one shot to MP4 and run
   `qa_motion.py --puppet` on it too; the same ranges apply.
6. **Final render, verify, deliver** (ffprobe, a contact sheet of the final file, −14 LUFS). Report
   the runtime, regenerated or placeholder clips, script/voice deviations and open fact-check flags.

## Rules

- The illustration quality must match the reference. Never draw the characters with code
  primitives; motion comes from AI clips of the user's art or from puppets cut from the user's art.
- Exercise range of motion only ever comes from anatomically drawn keyframes (AI image edits)
  joined by AI image-to-video. Never rotate a limb drawing more than ~15° from its drawn pose.
  Puppets are for breathing, sway, small settles, holds and highlights on keyframe stills.
- Motion must match the research card: range, tempo, what moves and what stays still. Holds keep
  breathing. Nothing teleports. Fault demos show the specific fault and nothing else.
- Hard cuts only. Something new appears every 2–3 s. One idea per frame.
- Colour carries meaning: red = working muscle or problem, red X = wrong, green check = right,
  orange = emphasis, purple people = "other people".
- On-screen text is 1–3 words in CAPS, echoing the VO keyword.
- If the engine lacks an effect, extend `render.py`/`puppet.py` in the same style, or order it as an
  AI asset. Never drop the beat.
