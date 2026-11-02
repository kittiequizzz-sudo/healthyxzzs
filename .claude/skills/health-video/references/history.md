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

| 14 | `projects/cerebro_noche/` (sleep/brain, Intro + Punto 1–2, 4:52): white round-head character (`characters/round_m/`), night navy stage, code diagrams (glymphatic flow, hypnogram, brain→muscle STOP gate) | Delivered | Owner then switched the look for the next video → `cartoon-style.md`. |

Oct 2026: owner picked a **cartoon-panel style** (flat doodle scenes on pastel colours, hand-lettered titles,
no locked character) from a reference image → `cartoon-style.md`. Text is added in code, not baked in.

