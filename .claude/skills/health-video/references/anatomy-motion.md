# Anatomy in motion: how bodies must look while they move

Read this with `motion-research.md`. That file gives the *numbers* (angles, tempo). This one gives
what the *drawing* must show at each moment, and why a moving body can't be faked by rotating a
still drawing.

## Why a rotated limb drawing is wrong (lesson from the senior_m test, rejected by the user)

The first senior puppet rotated a drawing of a hanging arm around a pin at the shoulder. Every frame
away from the drawn pose was anatomically false:

| What the puppet showed | What a real body does |
|------------------------|------------------------|
| The arm hinged at the outer corner of the shoulder like a doll joint, with a visible seam and a stiff "cap" | The humeral head turns *inside* the glenoid under the deltoid. The shoulder contour flows from the trapezius over the acromion into the arm. |
| The shoulder, trapezius, collarbone and armpit never changed | The clavicle elevates and retracts, the scapula rotates upward and tilts back ([Ludewig 2009, 3D shoulder kinematics](https://pmc.ncbi.nlm.nih.gov/articles/PMC2657311)). The armpit opens, the lat and the edge of the pec stretch, and the deltoid bunches and shortens. |
| Open hands turned palm-up at the top (an external-rotation "T" pose) | Lateral raise: palms face the thighs at the start and the floor at the top. The hands grip the dumbbells and the wrists stay neutral ([Catalyst Athletics](https://catalystathletics.com/exercise/825/Dumbbell-Lateral-Raise/); [Trainwell](https://www.trainwell.net/exercises/dumbbell-lateral-raise)). |
| Arms dead straight and stiff, in the pure frontal plane | Elbows soft (slightly bent, ~10–30°) the whole time, and the arms rise in the scapular plane ~20–30° in front of the body ([Motra](https://motra.com/exercises/dumbbellFullCanLateralRaise); [Jeff Nippard](https://rosetta.to/u/jeffnippard/how-to-build-capped-shoulders-optimal-training-explained-side-delts)). |
| At rest the arms floated away from the body with the hands flared out | Relaxed arms hang close to the body, elbows by the ribs, hands at the sides of the thighs. |
| The muscle drawing of a hanging arm, just turned sideways | A raised arm shows different surfaces: the deltoid is contracted and rounder, the biceps and triceps hang under the bone, and the forearm is pronated. |

**Rule:** a limb drawing may only be rotated a few degrees from the pose it was drawn in (≤15°,
for breathing, sway or a small settle). Any real range of motion needs a new drawing for each
key pose. The in-between frames come from AI image-to-video between anatomically drawn keyframes,
then are checked by `qa_motion.py`.

## How motion is produced now

1. **Keyframe drawings.** For each exercise, the character is drawn (AI image edit from the master
   sheet) in 2–3 key poses: start, mid-range, end. Each keyframe prompt spells out the anatomy below:
   joint angles, hand orientation, what the scapula, armpit and deltoid look like, and where the
   dumbbell points.
2. **Motion between keyframes.** AI image-to-video with first frame = start keyframe and last frame =
   end keyframe (plus the motion prompt). This is how the reference videos were made, and the only
   way to get correct anatomy in every in-between frame.
3. **QA.** `qa_motion.py` checks range, tempo, symmetry and stillness. Then look at the frames
   yourself against the checklist for that exercise (below). A clip that passes the numbers but
   shows wrong anatomy (palms up, doll-joint shoulder, shrug in a correct rep) is rejected.
4. **Holds and highlights.** For a held pose under a label, use the keyframe still with breathing,
   push-in and muscle-region highlights. The puppet's small-motion features are allowed there.

## Lateral raise (dumbbell, standing): full anatomy and motion spec

**Start (bottom):** standing tall, feet hip-width, knees soft. Arms hang close to the sides,
elbows slightly bent, palms facing the thighs (neutral grip). Each dumbbell sits beside the thigh
with its handle pointing forward. In a front view you see the hex end of the dumbbell, slightly
angled. Shoulders down and relaxed (not shrugged), chest up, neck long.

**Mid (~45°):** the upper arms are halfway to horizontal, raised slightly in front of the body (scapular
plane), elbows still soft and *leading*, so the elbow sits level with or above the hand. The
dumbbells move out and up in an arc, palms turning to face the floor, wrists neutral. The deltoid
begins to bunch, the armpit opens and the outer chest edge stretches. The torso stays still.

**Top (≈ shoulder height, 80–95°):** the upper arms are about parallel to the floor and slightly
forward of the torso line. The elbows are slightly bent and at the highest point of the arm, with
the hands at the same height or a touch lower. Palms face the floor and the dumbbells are level,
handles pointing forward. The middle deltoid is visibly contracted (round, bunched cap). The
shoulders stay *down*: the trapezius slope from neck to shoulder looks the same as at the start,
with no shrug. A little natural scapular upward rotation makes the shoulder line rise slightly
and smoothly, never a hike toward the ears. The armpit is open, the lats and serratus are visible
along the ribs, and the torso is upright with no lean back.

**Motion:** up ≈0.6–1 s, a brief pause at the top, down ≈1–2 s, controlled (no drop). Older
adults move slower and may stop a little lower if mobility is limited. Shoulder abduction
range of motion declines with age ([age-related shoulder kinematics](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7924070/)).
Nothing moves except the arms: no knee bounce, no lean, no neck movement.

**Muscle highlight:** the middle (lateral) deltoid, the outer cap from the acromion down to its
insertion about a third of the way down the outer upper arm (deltoid tuberosity). The anterior head
sits on the front of the shoulder and the posterior head on the back
([Kenhub](https://kenhub.com/en/library/anatomy/the-deltoid-muscle);
[Wikipedia](https://en.wikipedia.org/wiki/Deltoid_muscle)). Red covers the outer cap only, not the
whole arm.

**Frame checklist (reject a keyframe or clip if any fails):**
- [ ] palms toward the thighs at the bottom, toward the floor at the top; fists closed on the handles
- [ ] elbows soft and level with or above the hands at the top
- [ ] arms slightly forward of the frontal plane, never behind it
- [ ] no shrug at the top; the neck-to-shoulder line is unchanged
- [ ] the shoulder contour is continuous (no doll joint), with the deltoid bunched at the top
- [ ] the armpit opens as the arm rises
- [ ] the torso, hips and knees are still; no lean back
- [ ] the dumbbells stay level, with handles pointing forward
- [ ] both arms move together within a few degrees

**Faults to show on purpose (each its own clip):** shrugging (the trapezius rises, the neck
shortens); going overhead (arms past ~120°, traps working); swinging (knee dip + hip drive + torso
lean back while the arms are flung up); internal rotation "pouring the jug" (thumbs down, elbows
rolled forward, which shifts work to the rear delt and traps per
[Coratella 2020](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7503819/)).

## Template for every other exercise

Each exercise in `motion-research.md` gets a section like the one above **before** any keyframe
prompt is written. It covers, for each key pose:
- the angle of every moving joint;
- hand, foot and prop orientation;
- what the passive structures do: scapula, armpit, spine curve, pelvis tilt, heel contact;
- which muscle surfaces are visible and contracted vs stretched;
- what must stay still;
- the frame checklist and the deliberate faults.

Research it (biomechanics and EMG papers first, reputable coaching libraries second) and cite it.
If no source covers a detail, say so and use the coaching standard.

## Sit-up (bent-knee, side view): drawing spec

**Pose 0, lying:** flat on the back, head down, knees bent ≈90° pointing up, feet flat, arms crossed
on the chest. The lower back has its natural small curve.

**Pose 1, curl 20–30°:** chin tucked (gap of a fist between chin and chest), head and shoulder
blades off the floor, upper back rounded, lower back still on the floor. The abs are visibly
shortened, with a crease at the ribs.

**Pose 2, ~45°:** the spine is fully curled (C-shape), the lower back just leaving the floor, and the
hinge starts at the hips. The feet stay flat.

**Pose 3, ~70–80° (top):** the trunk is up near vertical with the chest toward the thighs, the back
rounded slightly or neutral, the chin still lightly tucked and the arms still crossed. The hips are
at maximum flexion; the knees and feet have not moved.

**Locked across all poses:** hips, legs and feet (same pixels; only the trunk, head and arms change).

**Checklist:** chin tucked from pose 1 on; the curl comes before the hinge (never a stiff plank
swinging up); the feet stay down; the arms stay crossed with no hands pulling the head; the
movement reverses smoothly on the way down.

## Chair routine (levantarse_silla): drawing specs, side view facing LEFT
Same sturdy wooden chair (backrest, armrests, no wheels) in every pose; barefoot so the ankle is readable.

**Toe/heel raise:** locked: trunk, arms, thighs, knees ≈90°. Pose 1 feet flat. Pose 2 heels down, forefoot up
(sole visible, shin muscle tight). Pose 3 forefoot down, heel up ≈5–8 cm (calf bunched). Check: knees do not
rise in pose 2; toes stay on the floor in pose 3.

**Isometric hip push:** pose 1 upright; pose 2 hip hinge 20–30°, straight back, neck in line; pose 3 = pose 2
with glute tension and heels pressing, **buttocks on the seat**. Check: no rounded back, no lift-off.

**Knee extension:** left leg locked at 90°, hands on the seat sides. Pose 2 right knee ≈45° extended; pose 3
near straight, ankle dorsiflexed, quads contracted. Check: the thigh stays on the seat, no lean back, the moving
leg is the one nearest the viewer.

**Sit-to-stand (arms crossed):** pose 1 front edge, feet behind the knees; pose 2 trunk ≈40° forward, nose over
toes, buttocks just off; pose 3 upright, knees soft; pose 4 hips back, knees ≈60°, just above the seat.
Check: heels down in every pose, back straight (hinge, not slump), knees over the feet.
