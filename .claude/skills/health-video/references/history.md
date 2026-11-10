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
| 14 | 22-min stroke first-aid video (`projects/ictus_6pasos/`): 9 scene sheets ordered, A–E delivered first | Part 1 (intro + Puntos 1–3, 10:32) delivered | Voice read the short "Punto n" aloud, so sections start on that cue. Rendering at ~13× real time per job; deliver a re-encode at CRF 22 split into ~160 s parts (<30 MB). |
| 15 | 20-min sarcopenia video (`projects/sarcopenia_5senales/`) | Intake, fact-check, plan, order | First topic video with exercise step sequences inside (two pose sheets) next to 2×2 scene sheets. |
| 16 | Sarcopenia video in the owner's **warm pastel adult-cartoon** style (cast of 5, colour per section, no repeated panels, owner's original mascot as host) + synthesised music and SFX | Rendered, delivered | Style and sound requested by the owner on 30 Oct. |
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
| 18 | piernas_80 (5 transformaciones 80+) | winter, original cast sheet reused by owner's choice (Ricardo=Antonio, Mercedes/Elisa/Rosario=Pilar, Federico=Rafael); 22 sheets; images sent mid-turn are not saved, ask to resend in a new message | delivered 4 Nov |
| 19 | vitaminas_piernas (6 vitaminas) | spring, old cast; owner flagged yellow cast → neutral theme + panel white balance; 4 spoken editor notes cut from the voice | delivered 5 Nov |
| 20 | caminar_dias (6 verdades caminar) | summer, old cast; owner asked for darker/muted grade → muted theme + graded cut-outs | delivered 6 Nov |
| 21 | desayuno_piernas (avena/huevos/queso) | rainy Galicia mornings, old cast, muted grade; protein bars per food | delivered 6 Nov |
| 22 | velocidad_caminar (velocidad al caminar) | Canary Islands, old cast, muted grade; intensity gauge, talk-test levels, interval strip, steps-risk curve, week plan; items/pose sheet cut by blob (calf halves merged) | delivered 6 Nov |
| 23 | senales_edad (6 señales "normal a mi edad") | Madrid late autumn, old cast, muted grade; normal-vs-attention cards, causes step-ups, artery/nerve diagrams, stroke dramatización with 112 | delivered 10 Nov |
| 24 | cambios_60 (6 cambios después de los 60) | Basque Country early winter, old cast, muted grade; elastic vs stiff artery pulse, insulin key, CKD tests, bone density pair, Pilar 6-pose exercise row (poses overlapped: cut by fixed columns + largest blob) | delivered 10 Nov |
