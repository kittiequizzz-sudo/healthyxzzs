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
