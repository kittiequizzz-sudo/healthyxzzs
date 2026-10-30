# Motion research: how each exercise really moves

**Rule: before any shot shows a body moving, look the movement up here. If it isn't here, research it
first** (biomechanics papers, then reputable coaching sources). Then add a card in the same format,
and add matching entries to `scripts/motion.py` (`EXERCISES`) and `scripts/qa_motion.py` (`SPECS`).
Never invent joint angles. If no study gives a number, use the coaching standard and label it as one.

Confidence labels: **[study]** = measured in a study (cited); **[ref]** = measured from our reference
videos with `qa_motion.py`; **[coach]** = standard coaching cue, no measured study found.

## How human movement looks (applies to every exercise)

- **Smoothness:** point-to-point movements follow the minimum-jerk profile. Velocity is
  bell-shaped, and the movement starts and ends with zero velocity and acceleration
  ([Flash & Hogan 1985](https://pmc.ncbi.nlm.nih.gov/articles/PMC6565116);
  [minimum-jerk notes](https://nbviewer.jupyter.org/github/demotu/BMC/blob/master/notebooks/MinimumJerkHypothesis.ipynb)).
  `motion.py` uses s(τ)=10τ³−15τ⁴+6τ⁵ between keyframes.
- **Tempo:** hypertrophy studies use 0.5–8 s per rep with similar results; slower eccentrics are the
  common recommendation
  ([Schoenfeld 2015](https://pubmed.ncbi.nlm.nih.gov/25601394/);
  [Wilk 2021 review](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8310485/)). Our reference clips lift
  in ≈0.37 s and lower in ≈0.33 s **[ref]**, which is fast. The `video` tempo (0.55 s up / 0.75 s down)
  keeps that energy but reads as smooth. Use `controlled` (1 s / 2 s) when the script talks about
  slow, controlled reps.
- **Never perfectly symmetric:** one side lags 1–2 frames (40 ms default). Holds keep breathing
  (≈15 breaths/min) and a slow postural sway, so no frame is ever frozen.
- **Shoulder rhythm:** after the first ~30°, arm elevation follows a ≈2:1 humerus-to-scapula
  ratio ([physiotutors](https://www.physiotutors.com/wiki/scapulohumeral-rythm/)). Visible shoulder
  hiking (the upper traps) belongs in "too high" or "shrugging" fault shots, not in correct reps.
- **Older adults:** move more slowly in every phase of sit-to-stand, with more trunk lean and lower
  trunk angular velocity
  ([Van Lummel 2013](https://fis.dshs-koeln.de/en/publications/automated-approach-for-quantifying-the-repeated-sit-to-stand-usin/);
  [ageing STS study](https://ejournal.umm.ac.id/index.php/physiohs/article/view/40501)). For senior
  characters, scale tempos by ×1.4–1.6, use a smaller range of motion and allow a slight trunk lean.
  Their gait cadence is ≈119–125 steps/min with peak hip flexion ≈30–34° **[study]**
  ([older-adult gait norms](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10730124/)).

## Exercise cards

Each card lists: view, phases with joint angles, muscles to highlight, correct cues, common faults
(each a separate motion), and the QA ranges used by `qa_motion.py`.

### Lateral raise (front view)
- Bottom: arms hang close to the sides, elbows soft, **palms facing the thighs** (neutral grip).
  Top: **≈80–95° at shoulder height** **[coach]**, **palms facing the floor**, the elbows soft
  (≈10–30°) and leading. Arms move in the **scapular plane, ≈20–30° in front of the body**
  **[coach]**. The reference clips peak at 89–101° **[ref]**.
- Passive motion that must show: the clavicle elevates and retracts, the scapula rotates upward and
  tilts back ([Ludewig 2009](https://pmc.ncbi.nlm.nih.gov/articles/PMC2657311)), and the armpit opens.
  There is no visible shrug in a correct rep. Full drawing spec and frame checklist:
  `anatomy-motion.md`.
- Muscles: side (medial) delts. Neutral humeral rotation gave the most medial-delt activity, while
  internal rotation shifted work to the rear delts and upper traps
  ([Coratella 2020](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7503819/)).
- Tempo: `video` or `controlled`. No knee or trunk motion (QA: knees and trunk move <15°).
- Faults:
  - `lateral_raise_too_high`: past ≈150°, the shoulders hike and the traps light up.
  - `lateral_raise_shrug`: the shoulders elevate during the raise.
  - `lateral_raise_swing`: knee dip (knee flexion reached ≈85° in the reference **[ref]**), then a
    hip/back drive while the arms are flung up in ≈0.17–0.20 s **[ref]**.

### Front raise (side view)
- Shoulder flexion 0→≈90° with a straight-ish arm (elbow ≈10°) **[coach]**. Muscles: front delts.
  The trunk stays vertical.

### Overhead press (front view)
- Start: upper arms ≈80° abduction, elbows ≈90–95° with forearms vertical. Finish: ≈165°, elbows
  ≈10°, with slight scapular elevation as the arms pass overhead (2:1 rhythm) **[coach + rhythm]**.
  Muscles: front delts, triceps.

### Shrug (front view)
- Pure scapular elevation, ≈2–3 cm of travel at the scale of the reference character (shift the
  shoulders by 24 px). Arms stay hanging. Muscles: upper traps.

### Biceps curl (side view)
- Elbow flexion ≈8°→≈140°. Measured excursions range from ≈115° to ≈157° across setups **[study]**
  ([exosuit study](https://arxiv.org/pdf/2402.11421);
  [lab report](https://public.websites.umich.edu/~mvs330/f01/ALA%20Curl/results2.html)). The upper
  arm stays pinned to the side (shoulder ≤10°). Muscles: biceps.
- Fault `biceps_curl_cheat`: trunk swing of ≈35° with heavy loads vs ≈12° with light ones, plus
  shoulder hiking when fatigued **[study]** (same sources).

### Squat (side view)
- Parallel ("horizontal") squat: knee ≈113°, hip ≈128°. Half squat: knee ≈71°, hip ≈88° **[study]**
  ([squat-depth angles](https://wnus.usz.edu.pl/cejssm/de/issue/1244/article/19713/)). The trunk leans
  forward ≈35–45° at depth **[coach]**. Knees track over the toes, heels stay down. A parallel squat
  is not injurious to a healthy knee
  ([Escamilla 2001](https://pubmed.ncbi.nlm.nih.gov/11194098/)).
- Muscles: quads, glutes.

### Hip hinge / Romanian deadlift (side view)
- The knees stay soft and nearly fixed (≈15–20°) while the trunk travels to ≈70–90° of forward lean
  **[coach]**. For comparison, the deadlift reached ≈104–108° of knee flexion and the good morning
  ≈5° **[study]** ([Schellenberg 2013](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3878967/)). The
  back stays neutral and the dumbbells hang vertically (gravity). Muscles: hamstrings, glutes.

### Push-up (side view)
- Elbow range ≈100° **[study]**
  ([kinematics lab](https://public.websites.umich.edu/~mvs330/f00/diamonation/results2.html)). The
  body stays a straight plank from head to heel, and the upper arms sit ≈45° from the torso
  **[coach]**. The hardest point is the bottom, where elbow loading peaks
  ([ISB 2005](https://media.isbweb.org/images/conf/2005/abstracts/0189.pdf)).
- Faults: sagging hips, flared elbows (90°).

### Forward lunge (side view)
- Step ≈60% of body height in the standard protocol. Self-selected steps are ≈10% shorter. Front
  knee ≈90° at the bottom **[coach]**. Forward lunges put more demand on the hip extensors
  **[study]** ([Riemann 2013](https://pubmed.ncbi.nlm.nih.gov/23584319/)). The trunk stays upright,
  and the back knee drops toward the floor.

### Bent-over dumbbell row (side view)
- Trunk hinged ≈45° to near-parallel with a flat back. The elbow pulls back toward the hip, with
  shoulder extension and scapular retraction **[coach; no measured study found]**. Muscles: lats,
  rhomboids, rear delts, biceps.

### Sit-to-stand (side view, a key senior move)
- Phases: trunk flexion forward (weight shift over the feet) → lift-off → hip and knee extension →
  stand. Older adults take longer in every phase and use more trunk flexion; fallers rely more on
  trunk, hip and knee flexion strategies **[study]**
  ([fallers study](https://doaj.org/article/dd037966510c46499cb7d447e07392f2)). Seated knees ≈90°
  **[coach]**.

### Heel / calf raise (front or side view)
- Rise onto the balls of the feet and lower slowly. Bodyweight calf raises improved explosive
  plantar-flexion force in men aged about 73 **[study]**
  ([calf-raise training in elderly men](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5583613/)). No study range in degrees
  was found; show a clearly visible heel lift of ≈5–8 cm **[coach]**.

### Walking (side view)
- Older adults: cadence ≈119–125 steps/min (≈2 steps/s), peak hip flexion ≈30–34°, speed
  ≈1.26–1.29 m/s **[study]** (older-adult gait norms above). Arms swing opposite to the legs.

## Adding a new exercise (checklist)
1. Search for kinematics studies (joint angles, phase durations) and EMG studies (which muscles).
   Prefer PubMed or PMC sources.
2. Write a card here with confidence labels and links.
3. Add `EXERCISES[...]` in `motion.py` (view, bottom/top or phases, muscles, tempo) and
   `SPECS[...]` in `qa_motion.py` (channel, bottom/top ranges, still parts).
4. If a real demo video is available, run `qa_motion.py --capture` on it and compare the curve with
   the card. Real timing beats guessed timing.

### Sit-up, bent-knee (side view)
- Setup: lying on the back, knees bent ≈90°, feet flat and hip-width apart, arms crossed on the chest
  (hands behind the head invite neck pulling) **[coach]**
  ([The Manual](https://themanual.com/fitness/how-to-do-sit-ups);
  [Today](https://www.today.com/today/amp/tdna219780)).
- Two phases **[study]**: (1) **curl / trunk-flexion phase**: the chin tucks, then the head, shoulders
  and upper back peel off the floor one vertebra at a time while the lower back stays down. This is
  where the abdominals work hardest; pure spine flexion gives >50% MVC
  ([curl-up vs sit-up EMG](https://pmc.ncbi.nlm.nih.gov/articles/PMC155519)). (2) **Hip-flexion phase**:
  the whole curled trunk hinges up at the hips toward the thighs, driven by the hip flexors
  (iliopsoas, rectus femoris). Traditional sit-ups showed more rectus femoris and peak hip flexion,
  a trunk-focused version more rectus abdominis and obliques
  ([Sullivan 2015](https://researchwith.montclair.edu/en/publications/effect-of-traditional-vs-modified-bent-knee-sit-up-on-abdominal-a/)).
- Lowering reverses it: the hips extend first, then the spine unrolls back to the floor, under control.
- Tempo **[coach]**: ≈1–1.5 s up, ≈1.5–2 s down, no bounce off the floor.
- Safety note for scripts: McGill reported ≈3,300 N of lumbar compression in a sit-up, and bent knees
  barely change it ([Michigan Today](https://michigantoday.umich.edu/2016/08/17/just-say-no-to-sit-ups);
  [Six Physio](https://sixphysio.com/blog/media/the-end-of-the-sit-up)). For older viewers or back pain,
  flag it and offer the **curl-up** (phase 1 only, one knee bent, hands under the lower back).
- Faults: pulling on the neck with the hands; momentum swing with the feet lifting; jerking up with
  a flat back (no curl); arching the lower back; dropping back down.
- Muscles: rectus abdominis + obliques (curl phase), hip flexors (hinge phase).

### Seated toe raise + heel raise ("punta y talón", side view, chair)
- Setup: sitting upright on a stable chair, knees ≈90°, feet hip-width, flat **[coach]**.
- Phase 1, toes up: heels stay down, ankle dorsiflexes (forefoot lifts toward the shin), hold ≈2 s, lower
  slowly. Muscle: tibialis anterior (front of the shin). Phase 2, heels up: forefoot stays down, ankle
  plantarflexes, heel lift ≈5–8 cm **[coach]**. Muscles: calf; with the knee bent the soleus does most of
  the work (standard anatomy).
- Why it matters: weight-bearing dorsiflexion range predicted dynamic balance in 88 older adults
  ([PMC7932177](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7932177/)); ankle ROM and knee strength were
  linked to the 5× sit-to-stand in 95 older women
  ([PMC5214953](https://pmc.ncbi.nlm.nih.gov/articles/PMC5214953)) **[study, association only]**.
- Tempo slow (≈1–2 s each way). Nothing moves but the feet. Faults: slapping the toes down; lifting the knees
  with the hip flexors instead of moving at the ankle.

### Seated isometric hip push ("empuje isométrico de cadera sentado", side view)
- Setup: feet flat under the knees, hip-width; trunk hinged ≈20–30° forward from the hips with a neutral
  back **[coach]**.
- Action: press the heels into the floor and squeeze the glutes as if about to stand, buttocks stay on the
  seat; 5 s on / 5 s off, 8–10 reps, keep breathing (no Valsalva) **[coach]**.
- Muscles: gluteus maximus (hip extensor), with the quads co-contracting. In sit-to-stand, glute max and the
  thigh muscles all exceeded 40% of max in 24 older adults
  ([IES 2018](https://journals.sagepub.com/doi/abs/10.3233/IES-182115)) **[study]**.
- No visible joint motion; only tension. Faults: rounding the back, holding the breath, lifting off the seat.

### Seated knee extension with pause (side view)
- Setup: upright, hands on the sides of the seat; the thigh stays on the seat throughout **[coach]**.
- Knee goes from ≈90° flexion to near full extension (leg ≈horizontal), ankle dorsiflexed at the top, hold
  3–4 s, lower over ≈3 s; 10–12 reps per leg, start with 5 **[coach]**.
- Muscles: quadriceps. Seated/home quadriceps programmes improved strength in small trials of older adults
  ([Baker 2001](https://www.jrheum.org/content/jrheum/28/7/1655.full.pdf);
  [PMC6342874](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6342874/)) **[study]**.
- Faults: leaning back, lifting the thigh off the seat, kicking up fast, dropping the leg.

### Sit-to-stand, training version (add-on to the card above)
- Level 1: chair against a wall, sitting near the front edge, feet slightly behind the knees, heels down,
  hands on armrests allowed. Level 2: arms crossed on the chest (the 30-s chair-stand test posture).
- Lean the trunk forward (≈40° in our drawing, **[coach]**; no measured older-adult value found), push the
  floor, stand, pause, then sit with the hips back over a 3-count (eccentric). 5→10 reps, 1–2 sets.
- Repeated sit-to-stand training raised knee-extensor strength in frail older adults (Fujita 2019, Exp
  Gerontol) **[study]**.
