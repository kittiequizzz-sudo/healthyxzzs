# Project history: what was tried and what the owner decided

The channel makes Spanish-language health and fitness explainers for a broad and senior audience.
The owner chats in Vietnamese and works for free (no paid APIs). The reference style came from three demo
cuts in `reference/` (blue faceless anatomy character on cream, AI image-to-video motion, orange/amber
motion graphics).

| # | Approach | Result | Why |
|---|----------|--------|-----|
| 1 | Edit with the demo clips as stand-ins | Rejected | "Why did you just copy my demo?" New videos need new visuals. |
| 2 | Code-drawn blue character (Cairo rig) | Rejected | Too simple for the health niche; viewers won't stay. |
| 3 | Puppet cut from a demo frame | Rejected | Visible cut seams. |
| 4 | Puppet from the senior rig sheet, full-range lateral raise | Rejected | Anatomically wrong: doll-joint shoulders, no scapula, armpit or palm change. → wrote `anatomy-motion.md`. |
| 5 | AI video (Veo, Kling, etc.) | Rejected by the owner | "Bad video AI", can't keep the character consistent, and costs money. |
| 6 | 3D body (MakeHuman CC0) toon-rendered | Dropped | Featureless and uncanny. |
| 7 | Pose-sheet warp/morph animation (hip pivot, optical flow) | Rejected | Flaws at the seams; "this method is no good". |
| 8 | Code-drawn flat figures (tubes, then shaped parts) | Rejected | "Ugly", "doesn't seem right". |
| 9 | Pictogram figures | Not chosen | |
| 10 | Rig from the owner's flat parts sheet | Rejected | "Looks creepy af": rigid parts rotating at pins. |
| 11 | **Infographics + illustrated step sequences of real drawings** | **APPROVED** ("that's what I'm talking about") | Every frame is a real drawing; motion is explained with steps, arrows and callouts. |
| 13 | 10-min diabetes video (`projects/azucar_sube/`) from a full brief (.docx) written for an on-camera doctor | Delivered (awaiting feedback) | Narrator rewrite (no fake credential); new character Doña Carmen (blue-skin style, two 2×2 sheets), metaphor panels (muscle shop, key factory), object sheet; voice sent in 3 parts and joined. |
| 14 | 19-min exercise topic video (`projects/levantarse_silla/`, sit-to-stand for 60+, Spanish, "tú") | Planned: script fixes, fact-check, plan, order sent; waiting on sheets + voice | New ordinary-build character Antonio instead of the bodybuilder senior_m, because the story is about weak legs. Owner then switched to a new natural-skin cartoon style (`characters/antonio/style_ref.jpg`); prompts rewritten. |
| 12 | Same format for a 22-min organ topic video (`projects/7dias_sin_cenar/`): organ sheet + 2×2 scene panels + food sheet, ~300 voice cues, sections rendered in parallel | **APPROVED** ("right, tốt") | First full video delivered. Scene panels with push-in replace any character animation. |

What worked from the start: the infographic scenes (titles, spine diagram with force counter, EMG bar
chart, takeaway cards, sources).

Feedback after video 13 (azucar_sube): "too much text, looks like a presentation; keep the key
phrases, add images, raise the pace at the start without rushing; it's YouTube, not slides" →
`youtube-style.md` (picture first, ≤ 6-word captions, hook cut every 1.5–2.5 s, ~1 drawing per 15–20 s).

Delivery note: the app's upload limit is 30 MB, so long videos go out as parts split without
re-encoding (`qa-checklist.md`).

Lesson: moving a drawn human in code always reads as a puppet. Don't propose another
animated-figure method unless the owner asks for one explicitly.

Feedback after `levantarse_silla` (3 videos delivered, Oct 2026): no fixed main character any more, a
diverse cast; more expressive, adult-animation faces (not a kids' cartoon); fewer repeated pictures
(~1 different panel per 15–20 s, each used at most twice). Applies from the next video on; the three
`levantarse_silla` videos stay as delivered. → `style-bible.md` (Characters), `prompt-blocks.md`.

Owner clarification (Oct 23 2026): "chia 3 phần" means **3 parts of ONE video** (for checking), not 3
published videos. Don't add part bridges ("Próximo vídeo · Parte 2", repeated disclaimers, "Parte 3 de 3"
tags, re-used hooks). Render each part from the continuous voice and deliver one joined MP4 (see
`projects/7_alimentos_corazon/render_full.sh`). `levantarse_silla` was mistakenly built as 3 videos.

Feedback after `7_alimentos_corazon` (Oct 23 2026): the video feels static. The owner wants **more
movement inside scenes, still synced to the voice and not faster/denser cuts** → `youtube-style.md` §3
"More motion, same timing". Not re-rendered; applies from the next video.

`soleo_segundo_corazon` (Oct 23 2026), first video with the new rules: ONE page (`video.html` + one
`s*_*.js` per section) on one cue file for the whole voice; rendered in parallel chunks and the 3 check
parts cut from the joined MP4 (`render_full.sh`). Motion kit in its `common.js`: `Live()` (entrance +
idle on everything), `Shot` (push-in + pan), `flow()` (cells/sugar along paths), `CalfPump` (animated
muscle pump), `heelRaise()` (rep loop from the pose sheet with calf glow). Reuse it for the next video.
Pose sheet of a person on a chair: `cut_poses.py` lost the legs and chair; cut by connected components
on the flat background (drop the floor line, clear the enclosed background under the seat).

Owner feedback (Oct 26 2026, `sueno_corazon`): the drawings look too yellow and garish ("vàng chói"). Keep
strong colours but make them harmonious → COLOR block in `prompt-blocks.md` (navy, teal, forest green,
burgundy, terracotta; no golden cast; cool moonlight at night). Applies from `sueno_corazon` on.

`sueno_corazon` (Oct 26 2026): approved by the owner as delivered ("oke rồi"). New harmonious COLOR block
worked first time (no yellow cast). New code diagrams in its `common.js`, reusable for heart/sleep topics:
`ECG` (scrolling strip, bpm(t), irregular=AF), `Chart24` (24-h chart with night band; `BP_DIP`,
`BP_FLAT`, `CORT` curves), `Seesaw` (sympathetic vs parasympathetic), `Vessel` (flowing cells,
narrow(t)), `NightBar` (awakenings), `gauge`, `breathing` (lying pose sheet, 4–6 s counter).
Whisper's chunk overlap can duplicate a few words with earlier timestamps: drop them before cues
(`words_clean.json`); it is not a misread in the voice. Waiting on a re-render: don't `pgrep -f` a
name that appears in your own wait loop (it matches itself and never ends).

Owner decisions (Oct 26 2026), from the next video on:
- **Sound effects:** yes, synthesized in code (no downloaded samples): soft whoosh on scene changes, pop on
  chips/checks, thud on crosses/stamps, heartbeat with ECG/heart beats, tick with clocks, a soft alarm on
  "alarm" scenes. Quiet and sparse (audience 60+), triggered from the same cues as the picture.
- **Background music:** composed by us in code (soft piano/pad, original, no samples) so there is no
  YouTube copyright/Content ID risk. Never use third-party tracks. Mix ≈ 20–25 dB under the voice with
  ducking under speech; match the mood per section (calm night tones, slightly brighter for solutions).
- **Intro:** the owner will supply their own channel intro later; until then, none. When it arrives, place
  it right after the hook (first ~20–30 s), 3–4 s max.
- No test sample wanted; apply directly on the next video.

Owner feedback (Oct 27 2026, after `tension_alta`): the SFX sounded harsh and off-key. `soundtrack.py`
now makes every tonal SFX a soft felt-mallet/marimba note in the current section's key (pentatonic),
low-passed, no clicks or pitch sweeps, and keeps each ≈ 14–16 dB under the voice (whoosh ≈ −25 dB). Owner then asked for a bit louder → ≈ 9–11 dB under the voice (whoosh ≈ −20 dB).

- **Oct 27, 2026 (owner, before equilibrio_silla):** (1) Effects were fine in level but got lost in the
  music → soundtrack.py: effects moved an octave above the music, glass/marimba timbre (2.76× partial),
  music darker (k=15) and dipping ~5 dB for 0.5 s under each effect. (2) Pictures swayed too much; there
  must be still moments → common.js (from equilibrio_silla on): no idle rotation, bob 6→3 px, breathe
  1.8%→1%, all idle on a shared CALM gate (~5 s moving / ~5 s still), scene drift 0.03→0.018, pan zoom
  0.16→0.09 (tile 0.12→0.07) and pans travel over the first 70 % of a scene, then hold. No test video
  needed for such notes — apply them in the next video.

- **Oct 27, 2026 — equilibrio_silla rendered** (20:33, 3 parts at 9:00 / 16:43; 13 files under 30 MB).
  First video with the calmer motion + effects above the music. New in common.js: Poses / CYCLE / KEYS
  (pose-sheet loops with cross-fade), RepCounter, PhaseCue (breath cue tied to the movement), ExBadge.
  Pose sheets: trim cut_poses canvases to the union bbox (else the figure renders small and the floor
  shadow floats); clear the cream holes under chair seats only where the ring is brown wood.

- **Oct 27, 2026 — huevo_colesterol rendered** (19:40, parts at 7:39 / 14:09; 16 files under 30 MB).
  Topic video (no exercises): new Food() (cut-out in a circle, label, optional red X / check) and Sign()
  ("≠", "→") helpers in its common.js. Cue check: compare each cue's transcript word with the phrase's
  first word — fuzzy matching can land a cue one word early, and once (despues_c) ~1.5 s early.
- **Delivery (owner, Oct 27):** put all pieces of a video in one folder `out/entrega/` numbered straight
  through (`<slug>_01.mp4` … `_NN.mp4`, parts 1→3 in order) and send them in ONE message, so the owner can
  select all and merge in order. A single full file can't be sent (app limit 30 MB per file).

- **Oct 30, 2026 (owner):** videos weren't getting many views — colours too neutral, no punch. New look:
  `flat/theme_vivid.js` (load after common.js): deep navy stage with a soft glow that changes colour per
  section, cobalt heading chips, brighter crimson/emerald/teal accents, colour grade on every drawing
  (+25 % saturation, +10 % contrast, no warm shift), white glowing frames on panels (common.js `Shot` uses
  `C.frame` when set). Prompts: new vivid COLOR block (prompt-blocks.md), metaphor panels on saturated
  gradient backgrounds. Still no yellow/golden cast. Before/after compared on huevo_colesterol frames.

- **Oct 30, 2026 — infarto_mujer rendered** (20:54, first video in the vivid look; 17 files in out/entrega/).
  The vivid theme (SVG filters) renders ~2× slower: ~2 h 15 min for 21 min of video on 4 jobs, which hits
  the 2-hour background-task limit. render_full.sh skips finished chunks, so just re-run it to finish;
  better: split into two runs, or `chmod +x render_full.sh` before the first run (it failed once on that).
