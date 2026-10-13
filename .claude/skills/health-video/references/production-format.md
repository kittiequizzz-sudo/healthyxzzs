# Production format (APPROVED by the channel owner, use this for every video)

**Infographic explainer + illustrated exercise step sequences.** Rendered entirely in code
(`flat/render.mjs` captures `scene.html` frame by frame → MP4). See `projects/sample_flat/scene.html`
for the approved reference implementation.

## Never do this (all rejected by the user)
- Animating drawn characters by rotating cut-out limbs (puppets, rig sheets): looks creepy.
- Code-drawn human figures (stick, tube, flat-vector or pictogram): too simple or ugly.
- Warping or morphing between drawings.
- Reusing clips from the reference demos as if they were new work.

## Exercise scenes = step sequences of real drawings
1. Research the exercise first (`motion-research.md`, `anatomy-motion.md`); add a card if missing.
2. Order ONE pose sheet per exercise from the user: 3–4 key poses in a single row, same character,
   same scale, same floor line, side view, cream #F5ECD7 background, no text (template:
   `characters/senior_m/situp_pose_sheet.md`). The user generates it in a free image app.
3. Check each pose against the anatomy checklist; ask for a regeneration with exact fixes if any fail.
4. Cut each pose to a transparent PNG (align on the planted feet, recolour skin to house blue #58A9E4).
5. In the scene: show poses one at a time (0.22 s fade, slight push-in about the hip), progress dots,
   numbered step cards that light up with their pose, pulsing red callout circles on the working
   muscle, and a dashed motion arc for the moving body part. A shorter exercise variant can reuse a
   subset of the poses, alternating between them (e.g. curl-up = sit-up poses 1–2 with STOP HERE).

## Infographic scenes (code-drawn, approved)
Kinetic titles, anatomy diagrams (e.g. the spine with squeezing discs + force arrows), count-up
numbers, animated bar charts with reference lines, check/X takeaway cards, on-screen source line.
Every number on screen must come from the source log / research.

## Per-video workflow
Script/topic → research + fact-check → scene plan + pose-sheet orders → user sends pose sheets +
voice-over → transcribe, time every beat 0.1–0.3 s before its word → render → frame QA → deliver.
