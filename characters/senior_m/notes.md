# senior_m: senior male

Source: `sheet_original.webp`, a user-supplied composite sheet (1448×1086 as received through the
chat). Crops `front_crop.png`, `side_crop.png`, `back_crop.png` and `34_crop.png` are recoloured to
cream. Each is only ~600 px tall, so they serve as identity references, not as final video art.

- Look: blue skin, grey swept hair, grey beard and brows, glowing white eyes, dark grey shorts,
  barefoot. Very muscular, bodybuilder definition, with ageing texture (neck folds, loose skin,
  hand veins, knee creases).
- Pose tracking (MediaPipe) on the crops: front visibility 1.00, 3/4 0.98, side 0.77 (the far arm is
  hidden). `qa_motion.py` will work on clips of this character.
- Motion: senior tempo ×1.5 and range of motion ≈0.8 by default unless the script shows a fit senior
  doing full-range lifts (this build supports that).
- Puppet rig: not yet. The front A-pose has only a small arm/torso gap, so it needs the rig kit
  (body without arms + separate arm images) at full resolution.
- Extra poses on the sheet (flex, walk, hands on hips, seated, side stretch) are good start or end
  keyframe references for AI clips.

## Front puppet rig (from `rig_sheet.webp`)
- `front_body.png` (body without arms) + `front_arm_l.png` / `front_arm_r.png`, placed by `src_anchor`
  at the shoulder sockets with scale 0.65. A deltoid cap piece (an oval cut from the top of each arm)
  rotates at 0.6× the arm angle and covers the shoulder joint.
- The arm art is drawn ≈12° inward, so `rest` = −12. Calibrated with `qa_motion.py`: commanded 12°/88°
  measures 11°/81°.
- **Limits: abduction −12…100°.** Above ~100° the cap's cut shows, so overhead moves for this
  character go to AI video.
- Hands are open (no fists), so dumbbell shots need a fist arm variant or an AI clip.
- Test: `test_timeline.json` (2 controlled senior lateral raises) passes motion QA.
