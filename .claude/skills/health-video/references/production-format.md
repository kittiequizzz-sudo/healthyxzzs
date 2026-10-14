# Production format (APPROVED by the channel owner, use this for every video)

**Infographic explainer + real drawings shown as stills or step sequences.** Rendered entirely in code
(`flat/render.mjs` captures HTML scenes frame by frame → MP4). Two approved references:
- Exercise video: `projects/sample_flat/scene.html` (sit-up vs curl-up, 28 s).
- Topic/organ video: `projects/7dias_sin_cenar/` ("¿Qué pasa si dejas de cenar 7 días?", 22 min,
  Spanish; intro + 6 sections + conclusion). Owner's verdict: "right, tốt".

**Style rules that override older recipes below: `youtube-style.md`** (picture first, ≤ 6-word
captions, a paced hook, no slide-deck look).

## Never do this (all rejected by the user)
- Animating drawn characters by rotating cut-out limbs (puppets, rig sheets): looks creepy.
- Code-drawn human figures (stick, tube, flat-vector or pictogram): too simple or ugly.
- Warping or morphing between drawings.
- Reusing clips from the reference demos as if they were new work.
- Slide-deck look: sentence cards on empty cream, text menus ("EN ESTE VIDEO" with 4 cards), long
  full-screen title slides, slow fades through empty cream.

## Exercise scenes = step sequences of real drawings
1. Research the exercise first (`motion-research.md`, `anatomy-motion.md`); add a card if missing.
2. Order ONE pose sheet per exercise from the user: 3–4 key poses in a single row, same character,
   same scale, same floor line, side view, cream #F5ECD7 background, no text (template:
   `characters/senior_m/situp_pose_sheet.md`). The user generates it in a free image app.
3. Check each pose against the anatomy checklist; ask for a regeneration with exact fixes if any fail.
4. Cut the poses: `scripts/cut_poses.py` (aligned transparent PNGs in the house blue + `<name>_poses.json`).
5. In the scene: show poses one at a time (0.22 s fade, slight push-in about the hip), progress dots,
   numbered step cards that light up with their pose, pulsing red callout circles on the working
   muscle, and a dashed motion arc for the moving body part. A shorter exercise variant can reuse a
   subset of the poses, alternating between them (e.g. curl-up = sit-up poses 1–2 with STOP HERE).

## Infographic scenes (code-drawn, approved)
Kinetic titles, anatomy diagrams (e.g. the spine with squeezing discs + force arrows), count-up
numbers, animated bar charts with reference lines, check/X takeaway cards, on-screen source line.
Every number on screen must come from the source log / research.

## Topic / organ explainers (long videos, e.g. "what happens to your organs if…")
Structure follows the script: intro → `PUNTO 1…n` → conclusion. One HTML file per section on the
shared voice timeline; shared pieces in the project's `common.js`. Building blocks (see the 7dias files):
- **Section break:** a kicker caption ("PUNTO 2 · EL HÍGADO") over the section's first picture, ≤ 1.5 s.
  The full dark ink title card is now only for the conclusion.
- **Progress strip:** the six organs in small circles at the top right, the current one ringed orange.
- **Organ map** (intro): body silhouette in the middle, organ tiles left/right with dashed leader lines
  to dots on the body; the organ being named lights up (red ring, pulsing dot), the others dim.
- **Scene stills** from the 2×2 panels: a rounded frame with a slow push-in, plus side chips/cards
  (age, clock, foods). Swap between two stills with a 0.5 s crossfade for "before → after".
- **Mechanism diagrams:** battery draining (glycogen), activity chart drawn over time (MMC waves),
  blood-pressure curve with the night dip, insulin "key" opening a cell door with glucose entering,
  cell with rotating recycle arrows (autophagy), pie slice (1/5 of energy), count-up (≈100.000).
- **Judgement:** pictures with ✓/✗ badges (some people / others), a rubber-stamp verdict over a
  picture ("NO GARANTIZADO"), a red warning card for risk groups (short lines), full-red emergency screen
  ("→ URGENCIAS"). Avoid columns of sentence cards.
- **Symptom row:** 5 tiles with icons popping one per spoken word.
- **CTA cards** where the script asks: subscribe (red pill), share, comment (bubble icon); final
  like / subscribe / bell row.
- **Quiz:** three option cards (A/B/C with drawings). Don't reveal the answer if the script asks viewers to
  comment it.
- **Ending:** the script's closing quote in large type on ink, then "Nos vemos…" with the organ row.
Colour logic: green = possible benefit, amber = depends / caution, red = risk / warning.

## Per-video workflow
Script/topic → research + fact-check → scene plan + pose-sheet orders → user sends pose sheets +
voice-over → transcribe, time every beat 0.1–0.3 s before its word → render → frame QA → deliver.

## Language
- On-screen text uses the script's language (usually Spanish; Inter covers á é í ó ú ñ ¿ ¡).
- Chat with the owner in Vietnamese. Image prompts in English with a Vietnamese explanation.
