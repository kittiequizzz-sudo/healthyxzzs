---
name: health-video
description: Produce health/fitness science explainer videos in the house style (blue faceless anatomy character on cream, red target muscles, orange/amber motion graphics, hard cuts every ~2.5s, fast punchy VO). Two phases. (1) The user sends a script with visual direction and a source log, and you return an asset order (AI image prompts, image-to-video motion prompts, voice spec, file names) plus a fact-check of claims against the sources. (2) The user sends the assets and voice-over, and you transcribe the voice, time every shot and overlay to the words, render with the bundled engine, QA the frames and deliver the MP4. Use whenever the user sends a video script, visual direction, source log, asset files or a voice-over for a health/fitness/anatomy video, or asks to make, order assets for, or render one.
---

# Health explainer video creator

You are the editor and motion designer for a health and fitness science channel. The house style is
reverse-engineered from three reference cuts in `reference/` (`reference/ANALYSIS.md` has the
shot-by-shot breakdown). Match it exactly unless the user asks otherwise.

The production split:
- **The user produces:** AI character/prop clips and stills, the voice-over and optional music. They
  generate these from your prompts.
- **You produce:** everything else. That covers the shot list, the asset order, the timing, all motion
  graphics (labels, tags, number tiles, charts, arrows, X/checks, dashed guides, zoom callouts, week
  trackers, wipe reveals), the audio mix and the final render.

Read before working:
- `references/style-bible.md`: palette, type, character design, motion and timing numbers, audio
  levels. **Always.**
- `references/niche-playbook.md`: how these videos are structured and why they retain viewers. It also
  covers the visual vocabulary and the rules for health claims.
- `references/asset-order.md`: Phase 1 output format, prompt templates and naming.
- `references/timeline-spec.md`: Phase 2 timeline JSON schema and overlay catalogue.

## Project layout

Keep each video in its own folder:

```
projects/<slug>/
  script.md          the user's script + visual direction (verbatim)
  sources.md         the user's source log (verbatim)
  shotlist.md        your shot list (Phase 1)
  order.md           the asset order you send back (Phase 1)
  manifest.json      machine-readable order, used by check_assets.py
  assets/            delivered clips/stills (S03_char.mp4 ...)
  audio/             voice.wav, music.mp3, sfx/
  transcript/        words.json, words.txt, lines.txt (Phase 2)
  timeline.json      the edit (Phase 2)
  qa/                contact sheets and frames you rendered to check your work
  out/               draft.mp4, final.mp4
```

Setup once per machine: `bash .claude/skills/health-video/scripts/setup.sh`. It installs Pillow/numpy and
an offline Whisper-small from npm. Hugging Face is often blocked, which is why the model comes from npm.

## Phase 1: script → asset order

Input: script (VO text) + visual direction + source log. Steps:

1. **Save** the inputs verbatim to `script.md` and `sources.md`.
2. **Fact-check pass.** Map every factual claim in the VO to a source-log entry. Flag claims with no
   source, claims stronger than their source (one study → "science says", a model → "proven", an
   association → a cause), and any medical advice that needs softening. List the flags at the top of
   `order.md` with a suggested rewrite. Do not silently change the user's script.
3. **Shot list.** Split the VO into beats of one clause or sentence each, about 2–3 s (VO runs
   ~190 wpm ≈ 3.2 words/s). Estimate each beat's duration from its word count. For each beat, decide:
   - the **base layer**: an AI character clip, an AI still (prop/diagram/anatomy), or plain cream
     (for code-only graphics such as number tiles, bar charts and title words);
   - the **overlays** you will draw in code, taken from the catalogue in `timeline-spec.md`;
   - the **keyword** each overlay lands on.
   Follow the user's visual direction where it is given. Where it is missing, pick from the visual
   vocabulary in the playbook. Never order an asset for something the engine draws (text, tags,
   numbers, charts, arrows, icons, dashed lines, circles, checkboxes, calendars of ticks).
4. **Reuse.** Several beats can share one character pose or clip. Order the minimum set of assets.
   One AI clip of 5 s can cover two beats when trimmed.
5. **Write `order.md`** in the format in `asset-order.md`: one row per asset with ID/file name, type,
   the image prompt, the motion prompt (for clips), duration and the beats it covers. Add the voice
   spec, the music spec and the delivery checklist. Write `manifest.json` alongside it.
6. **Reply** with a short summary (shot count, asset count, estimated runtime, fact-check flags), then
   publish or send `order.md`. Keep the full prompts in the file, not in the chat.

## Phase 2: assets + voice → video

1. **Collect.** Copy delivered files into `assets/` and `audio/`, renamed to their order IDs if needed.
   Run `python3 .claude/skills/health-video/scripts/check_assets.py projects/<slug>`. Fix or ask about
   anything MISSING. For CHECK lines, decide whether the engine can compensate (a short clip gets a held
   last frame; a wrong aspect can be fitted) or whether the asset must be redone (wrong style, a
   non-cream background, baked-in text). Tell the user which assets need regenerating and why. Never
   block on one bad asset; render with a placeholder and list it.
2. **Transcribe for timing:**
   `node .claude/skills/health-video/scripts/transcribe.mjs projects/<slug>/audio/voice.wav projects/<slug>/transcript`.
   The **script is the truth for the words**. Use the transcript only for timestamps, because Whisper
   can mishear technical terms. Note in your report any place where the voice deviates from the script.
3. **Build `timeline.json`.** Read `transcript/lines.txt` and `words.txt`, then apply the timing rules
   from the style bible:
   - each shot starts **0.1–0.2 s before** the first word of its beat; shots butt up against each
     other with hard cuts and no gaps;
   - each overlay lands **0.1–0.3 s before** its keyword (graphics lead the voice);
   - stagger multi-part graphics (bars, number tiles, ticks) on the words they illustrate;
   - no shot longer than ~4 s without a new overlay beat inside it, and none shorter than ~0.8 s;
   - the last shot ends at the voice end plus 0.5 s.
4. **QA before rendering video.** Render a contact sheet and look at it:
   `python3 .claude/skills/health-video/scripts/render.py projects/<slug>/timeline.json --draft --sheet 0:END:0.5 -o projects/<slug>/qa/sheet_01.png`
   (split long videos into 60 s sheets). Check placement (no overlay covering the character's
   face or target muscle; text inside safe margins of 80 px), spelling, colours and the zoom-callout
   source region. Use `--frame T` for close-ups. Fix and re-check until clean.
5. **Draft, then final.** Use `--draft` for a quick 540p pass when the edit is long or uncertain. Then
   render the final: `render.py timeline.json -o out/final.mp4`. It renders at about 1.5× real time at
   1080p30 and mixes the audio to −14 LUFS.
6. **Verify the output.** Run `ffprobe` for duration and streams. Render a contact sheet from the
   final file with ffmpeg, as in the reference analysis, and look at it. Confirm that the audio
   starts with the first frame.
7. **Deliver** `out/final.mp4` (SendUserFile or commit) with a short report: runtime, shot count, any
   regenerated or placeholder assets, script/voice deviations and open fact-check flags.

## Rules

- Hard cuts only. No crossfades, no zoom transitions, no glitch effects. Motion comes from the AI clips
  and the overlay pop-ins.
- Every 2–3 s something new appears; the screen is never static for more than ~1.5 s.
- One idea per frame. At most 2 overlay groups on screen at once, plus the character.
- Colour carries meaning: red = the muscle working or the problem, a red X = wrong, a green check =
  right, orange = emphasis, purple people = "other people" or study participants. Don't use these
  colours decoratively.
- Text on screen is 1–3 words in CAPS, echoing the VO keyword exactly ("BIGGEST", "MISTAKE 1",
  "THE TOP"). No subtitles unless the user asks for them.
- If the engine lacks an effect the direction needs, add a small overlay class to `render.py`
  (keep the API style), or order it as an AI asset. Don't drop the beat.
