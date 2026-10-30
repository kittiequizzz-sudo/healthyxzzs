# Scene plan: "Levantarte de la silla: 4 ejercicios"

~2,650 spoken words → ~17–18 min at 150 wpm. Built like `projects/7dias_sin_cenar/` (one HTML per section on
the shared voice timeline, `common.js`, `render_sections.mjs`). Sections: `intro`, `tobillo`, `gluteos`,
`cuadriceps`, `sentadilla`, `cierre`. Rules: `youtube-style.md` (picture on every beat, ≤ 6-word captions,
≤ 2 captions on screen, hook cut every 1.5–2.5 s).

Character: `senior_m` (blue skin, grey hair and beard, dark grey shorts, barefoot: bare feet show the ankle work
well). Same sturdy wooden chair with backrest and armrests, no wheels, in every drawing. Exercise poses face
**left** so the right leg (the one the script lifts) is nearest the camera.

Recurring device: a **4-step progress strip** at the top right (tobillo · glúteo · cuádriceps · levantarse), the
current step ringed orange, plus a **leg "chain" diagram** (item `cadena`): the working muscle lights red as each
exercise starts and all four light up together in apartado 4 and the recap.

Drawings: 4 pose sheets (13 poses) + 5 scene sheets (20 panels) + 1 item sheet (8 items) = 41 drawings, ≈ 1 per
26 s. Exercise instructions hold a pose for 4–6 s each and are refreshed with push-ins, callouts, arrows and
counters, so the budget is met in practice; if a section looks thin at QA, order a 6th 2×2 sheet.

## intro (~1:45)
Hook, cut every 1.5–2.5 s, no title card first:
- `hook_1` cold open: man pushing up from the armchair with both hands. Caption "UNA SIMPLE SILLA".
- Punch-in on the hands on the armrests: caption "buscas **APOYO**".
- `hook_2`: half-up, legs trembling (2 small tremble ticks drawn in code, no screen shake). "¿DOS INTENTOS?"
- `hook_4`: mirror, thought "?". Big caption «¿ME ESTOY HACIENDO MAYOR?».
- Stamp over `hook_1`: "NO TIENES QUE **RESIGNARTE**" (green).
- Muscle chain item with dim muscles → "músculos **DORMIDOS**".
- `hook_3` walking in the park + green ✓ "CAMINAR ✓"; then split screen: walking vs `hook_1` standing up, label
  "CAMINAR ≠ **LEVANTARTE**" (never "caminar no sirve").
- Fast preview of the 4 exercises: 4 pose cut-outs (ankle up, glute lean, knee extended, standing), ~1 s each,
  landing in the progress strip. "4 EJERCICIOS · 1 SILLA". Chair item pops.
- Teaser: tile 1 grows "el que nadie relaciona…" with a "?" on the ankle; tile 4 "lo reúne todo".
- CTA: comment bubble "¿Usas las manos?" + red subscribe pill.
- "Tu **INDEPENDENCIA**" over `cierre_1`.

## tobillo (~3:20)
- Kicker "1 · EL TOBILLO" over `meta_1` (heavy door, rusty hinges); hinge pulses red, door shakes 2°.
- "No siempre empieza en las rodillas": chain diagram, knee and thigh flash then the ankle lights red.
- Mechanism: sit-to-stand pose 2 of `poses_sentadilla` (leaning forward) with a dashed arrow over the ankle:
  "el peso pasa **SOBRE LOS PIES**". Then an amber chip "poca movilidad = compensar".
- "No pesas, no sentadillas": dumbbell icon ✗, squat icon ✗ → item `tobillo` (ankle bones) "la **BASE**".
- Name card: "BÁSCULA DE TOBILLO" → small "punta y talón".
- Setup: item `silla` ✓ next to item `silla_ruedas` ✗; then `poses_tobillo` pose 1 with chips "espalda erguida",
  "pies a la anchura de caderas".
- Step 1: pose 2 (toes up), red callout on the shin (`espinilla` item inset), up arrow on toes, hold counter 2 s.
- Step 2: pose 3 (heels up), red callout on the calf (`pantorrilla` inset), counter "1 repetición".
- Rep counter 1 → 15 (big number) with breathing icon "respira tranquilo".
- "No necesitas rapidez": tortoise vs hare icon? → keep to a slow metronome icon "LENTO y CONTROLADO".
  Safety chips: "rigidez → menos recorrido" (amber), "dolor → **DETENTE**" (red).
- `meta_2` house foundations: "BUENOS **CIMIENTOS**".
- Subscribe CTA (red pill) over pose 2 looping with pose 3.
- Bridge: "¿Qué músculo te **IMPULSA**?" → chain diagram, glute pulses. Progress strip moves to 2.

## gluteos (~3:20)
- Kicker "2 · LOS GLÚTEOS" over the chain diagram (glute red). "EL MOTOR OCULTO".
- "Culpa a las rodillas": knee icon with "?" → glute ring.
- `diario_1` sofa after lunch, phone ringing; then `diario_2` pushing on the knees: chips "inclinarse · manos ·
  intentos".
- Mechanism: item `gluteo`; hip-extension arrow drawn over sit-to-stand pose 2 → pose 3: "extiende la **CADERA**".
- "Muchas horas sentados": clock count-up 8 h over a seated pose → muscle dims "se debilita".
- Name card "EMPUJE ISOMÉTRICO DE CADERA".
- Setup: `poses_gluteo` pose 1 (upright), chips "pies bajo las rodillas", "hombros relajados".
- Pose 2 (hinge from the hips, straight back): dashed hip arc; amber "sin redondear la espalda".
- Pose 3 (squeeze): red pulse on the glute, down arrows under the heels, timer 5 s **contrae** → 5 s **relaja**
  (ring timer), "8–10 veces", breathing icon "NO contengas el aire".
- `meta_4` foot on the egg: "firme, **SIN APLASTAR**".
- Comment CTA "¿Notaste los glúteos?".
- Amber note "Preparación, no sustituto".
- Bridge: progress strip 3, chain diagram thigh lights.

## cuadriceps (~3:20)
- Kicker "3 · LOS CUÁDRICEPS" over `meta_3` (house on leg columns). "LAS **COLUMNAS**".
- Columns crack slightly (code line), "más esfuerzo".
- `diario_2` (hands on knees) again, then `diario_3` stairs: "manos en las rodillas", "tardan en responder".
  Causes card: "varias causas · una: **menos fuerza**".
- Item `cuadriceps`: "extienden la **RODILLA**" + "controlan al bajar". Three icons: levantarse · escalón ·
  sentarse.
- Name card "EXTENSIÓN DE RODILLA CON PAUSA".
- `poses_cuadriceps` pose 1: hands on the seat sides; pose 2: right leg rising; pose 3: leg near horizontal,
  toes up. Red callout on the front of the thigh; hold counter 3–4 s; lowering count 1·2·3 with a down arc.
- "10–12 veces · cambia de pierna"; green "empieza con 5".
- "CONTROL > ALTURA": two arcs, a fast high one ✗ and a slow controlled one ✓.
- Comment CTA "¿Una pierna más débil?" (two thighs, one amber).
- Subscribe CTA.
- Bridge: progress strip 4; chain diagram all three muscles lit → "fuerza · equilibrio · control".

## sentadilla (~4:10)
- Kicker "4 · LEVANTARSE" over `diario_4` (memory: jumping up at the door knock, warm sepia tint "HACE AÑOS").
- "TU **INDEPENDENCIA**" over `hook_1` → contrast.
- Chain diagram: ankle + glute + quad light together "**JUNTOS**".
- Name card "SENTADILLA CONTROLADA CON SILLA" + small "levantarse y sentarse".
- Level 1: `rutina_1` chair against the wall (wall icon + ✓ "no se desliza").
- `poses_sentadilla` pose 1: seated at the front edge, feet slightly back, chip "talones apoyados".
- Pose 2: lean forward, "pecho hacia las rodillas", arrows down through the feet "EMPUJA EL SUELO".
- `rutina_2` level 1 with armrests: green "usar las manos **NO ES TRAMPA**".
- Pose 3 standing: "equilibrio un instante".
- Pose 4 lowering, hips back: count 1·2·3 with a slow down arc; "músculos trabajan al **ALARGARSE**".
- Level 2 card: pose 1–3 again with crossed-arm poses (the sheet is drawn arms crossed); chip "si todavía no:
  usa apoyo" (green).
- Dose card: "5 → 10", "1–2 series", rest icon. "TÉCNICA > REPETICIONES".
- `rutina_3` calendar on the wall: "observa · con **CONTROL**"; comment CTA «Empiezo hoy».
- `rutina_4` proud standing: "paciencia · constancia · progresión"; "si necesitas ayuda, **ÚSALA**".
- "una habilidad para **TU CASA**".

## cierre (~2:30)
- Over `cierre_1`: "NO HAS PERDIDO TU FUERZA" → "una **SEÑAL**".
- Recap: the 4 progress tiles with their pose cut-outs, each lighting on its word (tobillos · glúteos ·
  cuádriceps · levantarse).
- "No por 20 repeticiones una mañana": "20" crossed out → calendar weeks filling "**COSTUMBRE**".
- Quiz: 4 option cards (A–D with pose cut-outs). Do not reveal an answer.
- CTAs: like · subscribe · share row over `cierre_2`. Next video teaser over `cierre_3` (only if confirmed).
- Warning card, held ≥ 8 s: "Educativo · no sustituye al médico"; 4 icons (dolor intenso · mareos · equilibrio
  · operación) → "consulta antes" over `cierre_4`. Red card "Debilidad repentina → URGENCIAS".
- Ending: «Levantarte con seguridad, confianza e independencia» on ink, progress row.
