# Reference analysis: "5 lateral raise mistakes" demos

Three reference cuts supplied by the channel owner:

| File | Real content | Notes |
|------|--------------|-------|
| `demo_1.mp4` | 0:00–0:28.9 | Hook / intro. The file is 3:56 long; everything after 0:28.9 is black and silent (export padding). |
| `demo_2.mp4` | 0:00–0:28.2 | Continues straight from demo 1 (the "5" tile carries over) → Mistake 1. Black and silent after 0:28.2. |
| `demo_3.mp4` | 0:00–0:25.1 | Later in the same video: end of Mistake 2, then Mistake 3. |

All three are 1920×1080, 30 fps, H.264 + AAC 44.1 kHz stereo. The audio is mastered to about −14 LUFS.

## Production method (as reverse-engineered)

- **Base layer:** AI-generated 2D cartoon stills of one recurring character, animated with
  image-to-video (the poses change fluidly and outlines wobble slightly from frame to frame, as is
  typical of i2v). The camera is static.
- **Overlay layer:** motion graphics composited on top: title words, amber tags, number tiles, bar
  chart, arrows, X/check icons, dashed guides, zoom callout circles and a week tracker. They stay
  static while the character moves, which confirms they are separate layers.
- **Muscle highlights:** red recolouring of the target muscle, either baked into the clip or revealed
  with a bottom-to-top wipe (demo 1, 7.4–7.8 s).
- **Edit:** hard cuts only, no transitions, about one shot every 2.5 s, with graphics landing
  0.1–0.3 s before the spoken keyword.
- **Audio:** dry male VO at ~193 wpm. A low, warm music bed sits ~16 dB under it and stays
  constant. Sound effects are not clearly audible.

## Transcripts (Whisper-small, word-timed)

**Demo 1:** "You do lateral raises every week, and your shoulders still look exactly the same. Here's
what nobody tells you. Your deltoid is the biggest muscle in your entire arm. Bigger than your
triceps and more than double your biceps. And the side of it is what makes you look wide. But the
way most people raise, other muscles end up doing the job. Today, the five mistakes that keep your
side delts small, and what the science actually says about each one. And the last one is something
that I've never seen before."

**Demo 2:** "Something most coaches get completely backwards. Mistake 1. Let's start with the
obvious one. Heavy dumbbells. A little bounce from the knees. A jerk from the lower back. It looks
strong. But when you swing, your legs and your back are lifting the weight, not your delts.
Researchers modeled the lateral raise on a computer. A small push at the start was fine. A big swing
took the work away from the shoulder. So drop the weight until you can lift it with a little bit
of force."

**Demo 3:** "…their head. But the dumbbell is heaviest for your delts when your arm is parallel to
the floor. Go higher and the lever gets shorter. More of the job goes to your traps. And in one study
of lifters, raising past shoulder height was linked to signs of shoulder impingement. So stop when
your elbows reach shoulder height. That's the top. Mistake 3. Most people grab the same dumbbells and
do the same 10…"

## Shot-by-shot

Times are seconds. "VO" is the line spoken over the shot; "lead" means the graphic lands before
the keyword.

### Demo 1: hook

| # | Time | Base | Overlays (time) | VO |
|---|------|------|-----------------|----|
| 1 | 0.0–2.4 | Front, full body, lateral raise loop; delts red | Week tracker M–S (T and F letters orange); ticks on T 1.4, F 1.8 | "You do lateral raises every week," |
| 2 | 2.4–5.1 | Back view, scratching head, looking in a mirror | Zoom callout of the shoulder, pops at 3.0 | "…and your shoulders still look exactly the same." |
| 3 | 5.1–7.0 | Waist-up front close-up, idle | — | "Here's what nobody tells you." |
| 4 | 7.0–10.3 | Side close-up | Deltoid wipes red 7.4–7.8; BIGGEST fades in at 8.1 (word at 8.3) | "Your deltoid is the biggest muscle in your entire arm." |
| 5 | 10.3–13.3 | Cream | Bars grow: deltoid 10.4 (orange), triceps 10.9, biceps 11.9; dashed ghost on biceps 12.5 ("double") | "Bigger than your triceps and more than double your biceps." |
| 6 | 13.3–16.0 | Front lateral raise | Delts go red 14.3; outward arrows 15.3; WIDE tag 15.5 (word at 15.8) | "And the side of it is what makes you look wide." |
| 7 | 16.0–18.0 | Squat-and-swing cheat, knees red | — | "But the way most people raise," |
| 8 | 18.0–20.3 | Lateral raise, traps red | Red X pops at 18.0 | "…other muscles end up doing the job." |
| 9 | 20.3–23.9 | Cream | Tiles 1–5 pop, 0.13 s stagger, idle wobble | "Today, the five mistakes that keep your side delts small," |
| 10 | 23.9–27.0 | Two scientists (green, purple) with notepads | Small tile row pops above them; tile 1 turns orange | "…and what the science actually says about each one." |
| 11 | 27.0–28.9 | Cream | Tile 5 turns orange and scales to 1.3 at 27.5; others shrink away; 5 slides to centre | "And the last one…" |

### Demo 2: Mistake 1 (swinging)

| # | Time | Base | Overlays | VO |
|---|------|------|----------|----|
| 1 | 0.0–2.9 | Cream | Orange "5" tile; framed inset picture (arm out, "?") slides in at 0.9 | "Something most coaches get completely backwards." |
| 2 | 2.9–4.2 | Squat-with-dumbbells pose, offset right | MISTAKE 1 fades in at 3.3 | "Mistake 1." |
| 3 | 4.2–6.2 | Same pose, closer framing | — | "Let's start with the obvious one." |
| 4 | 6.2–7.5 | Two dumbbells (one drops in) | HEAVY tag 6.5 | "Heavy dumbbells." |
| 5 | 7.5–9.0 | Squat, knees red | — | "A little bounce from the knees." |
| 6 | 9.0–12.0 | Swing up, knees red | Curved orange arrow at the hip, 10.0 | "A jerk from the lower back. It looks strong." |
| 7 | 12.0–17.4 | Side view, bent-over swing | Legs and lower back go red 14.0–15.0; shoulder callout 16.0 plus red X 16.4 | "But when you swing, your legs and your back are lifting the weight, not your delts." |
| 8 | 17.4–20.4 | Retro CRT, wireframe skeleton raising arms | — | "Researchers modeled the lateral raise on a computer." |
| 9 | 20.4–25.6 | CRT zoomed in | Shoulder joints glow orange; small curved arrow → green check 22.5; big arrow → meter drains → red X 25.0 | "A small push at the start was fine. A big swing took the work away from the shoulder." |
| 10 | 25.6–27.5 | Big dumbbell | Down arrow; swaps to a smaller dumbbell | "So drop the weight…" |
| 11 | 27.5–28.2 | Standing with light dumbbells, delts red | — | "…until you can lift it with a little bit of force." |

### Demo 3: Mistake 2 ending → Mistake 3

| # | Time | Base | Overlays | VO |
|---|------|------|----------|----|
| 1 | 0.0–0.5 | Overhead raise, traps red | Red X | "…their head." |
| 2 | 0.5–3.0 | Arms parallel, delts red | Down arrows at the hands, 1.5 | "But the dumbbell is heaviest for your delts when your arm is parallel to the floor." |
| 3 | 3.0–7.5 | Flat simplified figure, arm rotating up with dumbbell | Double arrow showing the moment arm, shrinking as the arm rises | "Go higher and the lever gets shorter." |
| 4 | 7.5–10.0 | Overhead raise, traps red | — | "More of the job goes to your traps." |
| 5 | 10.0–12.0 | Three purple mannequins | 1 STUDY tag 11.0 | "And in one study of lifters," |
| 6 | 12.0–14.0 | Raise above shoulder height | Dashed line at shoulder height draws 12.2; up arrow 13.0 | "…raising past shoulder height…" |
| 7 | 14.0–16.4 | Anatomical shoulder (bones) | Orange circle on the subacromial space | "…was linked to signs of shoulder impingement." |
| 8 | 16.4–20.5 | Standing → raises to the line, delts red | Dashed line; green check 19.4; THE TOP 19.5 | "So stop when your elbows reach shoulder height. That's the top." |
| 9 | 20.5–22.0 | Standing, offset right | MISTAKE 3, 20.6 | "Mistake 3." |
| 10 | 22.0–24.0 | Three purple mannequins raising in sync | — | "Most people grab the same dumbbells" |
| 11 | 24.0–25.1 | Dumbbell + calendar | Calendar flips JAN→FEB; "10" tag | "…and do the same 10…" |

## Takeaways encoded in the skill

The palette, type, timing and audio numbers are in
`.claude/skills/health-video/references/style-bible.md`. The structure and visual vocabulary are in
`references/niche-playbook.md`.
