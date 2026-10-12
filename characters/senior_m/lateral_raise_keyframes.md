# senior_m: lateral raise, keyframes and motion prompts

Built from `.claude/skills/health-video/references/anatomy-motion.md` (lateral raise spec) and
`motion-research.md`. Generate each keyframe as an **image edit of the senior_m front view**, so the
character, style and framing stay identical. Use a 16:9 canvas, full body centred, flat cream
background `#F5ECD7`, no text and no ground shadow. All three keyframes must use the same framing
and character size, because the video tool interpolates between them.

## Keyframe A: start (bottom)
> Same senior character, same art style, same framing and cream background. He stands tall, feet
> hip-width, knees soft, holding a black hexagonal dumbbell in each hand. Arms hang relaxed close to
> his sides, elbows very slightly bent, palms facing his outer thighs (neutral grip), fists closed
> around the handles. Each dumbbell's handle points straight forward toward the viewer, so the
> hexagon end of each dumbbell faces the camera beside the thigh. Shoulders relaxed and down, chest
> up, neck long, looking straight ahead.

## Keyframe B: middle (about 45°)
> Same character, same framing. He raises both dumbbells out to the sides and slightly forward to
> halfway: upper arms at about 45 degrees from his body, held slightly in front of the torso
> line. Elbows softly bent and leading, each elbow level with or slightly above its hand. Palms
> turning toward the floor, wrists straight, dumbbells level. Shoulders stay down, no shrug. The
> shoulder muscle starts to bunch, the armpit begins to open. Torso, hips and legs unchanged.

## Keyframe C: top (shoulder height)
> Same character, same framing. Both arms raised out to the sides to exactly shoulder height: upper
> arms parallel to the floor, slightly in front of the body (about 20 degrees forward), elbows
> softly bent (about 15 degrees) and at the highest point of the arm, hands level with the elbows.
> Palms facing the floor, wrists straight, dumbbells level with handles pointing forward. The side
> shoulder muscles are visibly contracted, round and bunched. Shoulders stay down, with the neck
> and trapezius line exactly as in the standing pose, no shrug. Armpits open, the sides of the
> ribcage and lats visible. Torso upright, no lean back, knees soft and still.

## Keyframe C-red (optional, for highlights)
> Same image as keyframe C, change nothing except recolour only the side (middle) deltoid on both
> shoulders, the outer cap from the top of the shoulder down to about a third of the upper arm, to
> a glossy red #E23B2E. Keep all outlines.

## Motion prompts (image-to-video)

**Clip 1: one controlled rep up.** First frame = A, last frame = C, 5 s:
> Static locked-off camera, flat cream background. The senior man performs one slow, controlled
> dumbbell lateral raise: both arms rise smoothly out to the sides and slightly forward, elbows
> softly bent and leading, palms turning to face the floor, until the upper arms are parallel to
> the floor. The rise takes about 1 second, then he holds still at shoulder height and breathes.
> Shoulders stay down, no shrugging. Torso, head, hips and legs do not move. Consistent anatomy,
> hands keep gripping the dumbbells, no morphing, no extra limbs, no camera movement, no text.

**Clip 2: lowering.** First frame = C, last frame = A, 5 s:
> …he slowly lowers both dumbbells back to his sides over about 2 seconds, under control, palms
> turning back to face his thighs, then stands still breathing. Shoulders down, torso still…

**Clip 3: two full reps (for a continuous demo).** First frame = A, last frame = A, 8–10 s:
> …performs two slow, controlled lateral raises: about 1 second up to shoulder height, a brief
> pause, about 2 seconds down to the sides, then repeats…

## QA after generation
```
python3 .claude/skills/health-video/scripts/qa_motion.py clip1.mp4 --exercise lateral_raise -o qa/motion/clip1
```
Expect: bottom ≈5–20°, top 75–100°, up ≈0.8–1.2 s, down ≈1.5–2.5 s, knees and trunk still,
left/right within 15°. Then check the anatomy checklist in `anatomy-motion.md` frame by frame
(palms, elbows leading, no shrug, smooth shoulder contour, open armpits, dumbbells level).
