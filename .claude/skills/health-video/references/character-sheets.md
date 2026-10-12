# Character sheets: what the user generates, and how each piece is used

The show needs several people: a young athletic man, seniors (male and female), sometimes "other
people", scientists or a doctor. Each character is generated **once** as a sheet, then reused in every
video. Characters keep the house look: a faceless mannequin with a smooth head, two glowing white
almond eyes, flat cel-shaded colour, bold black outlines and a flat cream background `#F5ECD7`.
Age and body type come from proportions, posture and clothing, not from facial features.

## Cast suggestions (the user decides)

| ID | Who | Skin | Build and clothing | Posture/motion notes |
|----|-----|------|--------------------|-----------------------|
| `young_m` | main lifter (reference character) | sky blue `#58A9E4` | athletic, defined muscles, dark grey shorts, barefoot | `video` tempo |
| `senior_m` | older man | blue or teal | softer build, slight belly, short-sleeve top + trousers or shorts, sneakers | slight forward head and rounded shoulders; tempo ×1.5 |
| `senior_f` | older woman | blue or violet | slim/soft build, simple top + leggings, sneakers | tempo ×1.5, smaller ranges |
| `crowd` | "most people" | purple `#8E6AC8` | same as young_m | used in groups of 3 |
| `sci_a`, `sci_b` | researchers | green / purple | white lab coats, round glasses, notepad | gesture loops only |

## 1. Master sheet (needed for both motion paths)

Generate each view as its own 16:9 image, 1920×1080 or larger, with the character full body,
centred, filling ~85% of the height:
- `<id>_front.png`: front view, **A-pose**: arms ~25–30° out from the body so there is cream
  between the arms and the torso, hands in loose fists, feet hip-width, no props.
- `<id>_side.png`: profile facing right, standing tall, arms hanging, no props.
- `<id>_back.png`: optional; used for mirror and back-muscle shots.
- `<id>_34.png`: optional 3/4 view; used for squat and lunge "hero" shots in AI video.

Prompt (adapt the build and clothing per character):
> 2D cartoon illustration, bold clean black outlines, cel-shaded flat colours with one soft shadow
> tone, faceless {build} {man/woman} mannequin character, smooth {skin} skin, bald smooth head, two
> glowing white almond-shaped eyes, no nose, no mouth, no ears, {clothing}, {view}, A-pose with arms
> 30 degrees away from the body and a clear gap between arms and torso, hands in loose fists, full
> body, centred, flat solid cream background #F5ECD7, no floor, no shadow, no text, character
> reference sheet style, 16:9

Use the same seed or character-reference feature for every view, so it's one consistent person.

## 2. Rig kit (for the puppet path: clean cut-out animation in code)

Cutting a finished picture leaves seams wherever one part covered another. The rig kit avoids that:
each moving part arrives as its own image, so nothing hidden ever needs to be guessed. Make it from
the master sheet with your image tool's edit mode, keeping the same canvas size and position for
every file so the parts line up pixel for pixel:

| File | Content |
|------|---------|
| `<id>_front_body.png` | the front A-pose with **both arms removed at the shoulder**. Rounded deltoid caps stay on the body, with a clean outline around each shoulder. |
| `<id>_front_upperarm_l.png`, `_r` | just that upper arm (shoulder cap to elbow) in its A-pose position, on cream |
| `<id>_front_forearm_l.png`, `_r` | just the forearm + fist, in position |
| `<id>_side_body.png` | profile with the near arm and near leg removed |
| `<id>_side_arm.png`, `<id>_side_leg.png` | the near arm / near leg in position |
| `<id>_front_red_<muscle>.png` | optional: the master front image with only that muscle recoloured red `#E23B2E` (otherwise the skill paints muscle regions itself) |

Edit prompt example: "Same image, same canvas, remove both arms at the shoulders, keep rounded
shoulder caps with clean black outline, change nothing else."
Props go separately, one per file on cream: `prop_dumbbell_side.png` (handle horizontal),
`prop_dumbbell_end.png` (end-on hexagon), plus any chair, mat, band or barbell the script needs.

The skill then writes `<id>_front.rig.json` (pivots, parents, z-order), checks every joint through
its full range of motion with a contact sheet, and keeps the rig in `characters/<id>/` for all
future videos.

## 3. Pose keyframes (for the AI-video path)

For each AI clip the order lists a **start pose** and an **end pose** image to generate from the
master sheet (image edit: "same character, same style, now {pose}"). Many AI video tools take a
first and a last frame. Giving both pins the range of motion, and the motion prompt describes only
the path between them. The skill writes those pose prompts with the exact angles from the exercise
card (for example "arms raised out to the sides exactly to shoulder height, elbows slightly bent,
palms down, shoulders relaxed, not shrugged").

## Which path for which shot

| Shot need | Path |
|-----------|------|
| Exercise demo with weight shift, legs, squats, lunges, walking, sit-to-stand | AI video (start/end frames + motion prompt), then `qa_motion.py` |
| Any exercise range of motion, arms included (raises, presses, curls) and fault demos | AI video between anatomically drawn keyframes, checked by QA + the anatomy checklist. Rotating a limb drawing can't show the scapula, armpit, hand rotation or muscle changes (see anatomy-motion.md). |
| Holds under labels, muscle highlights, breathing, small settles (≤15°) | puppet / keyframe still |
| Talking, idle, "most people" groups, scientists | puppet idle (breathing/sway) or short AI loops |
