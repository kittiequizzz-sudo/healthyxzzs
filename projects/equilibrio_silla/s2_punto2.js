// PUNTO 2 — assisted chair squat (sit-to-stand): warning signs, walking isn't always enough, quadriceps
// + glutes, how to do it (lean from the hips, press, stand 1 s, sit down slowly), 8–10 reps, armrests if
// needed, cardiovascular note (not a BP treatment), stop signs, link to balance, subscribe.

// 0. kicker
scene(svg, at('p2') - 0.3, at('momento2'), g => {
  pan(g, 'l_facil', 'full', { from: [0.5, 0.45], to: [0.55, 0.4] });
  kicker(g, 'EJERCICIO 2', 'SENTADILLA CON SILLA\nLEVÁNTATE SIN MIEDO', at('p2'));
});

// 1. an everyday test: getting up without pushing with your arms
scene(svg, at('momento2'), at('intentos2'), g => {
  pan(g, 'l_brazos', 'full', { from: [0.5, 0.4], to: [0.5, 0.5] });
  cap(g, '¿TE LEVANTAS SIN AYUDARTE CON LOS BRAZOS?', at('brazos2') - 0.4, { size: 44, hi: 'SIN' });
});

// 2. warning signs: several attempts, trembling knees, reaching for a table → your body is warning you
scene(svg, at('intentos2'), at('realidad2'), g => {
  tile(g, 'l_intenta', at('intentos2') - 0.2, { x: 70, y: 150, w: 570, h: 380, label: 'VARIOS INTENTOS' });
  tile(g, 'a_sillon', at('rodillas2') - 0.2, { x: 675, y: 150, w: 570, h: 380, label: 'RODILLAS QUE TIEMBLAN' });
  tile(g, 'a_sofa', at('mesa2') - 0.2, { x: 1280, y: 150, w: 570, h: 380, label: 'BUSCAR UN APOYO' });
  chip(g, 'TU CUERPO TE AVISA', at('avisando2'), { cy: 760, size: 52, fill: C.amber });
  chip(g, 'NECESITA FUERZA Y ESTABILIDAD', at('avisando2') + 1.2, { cy: 900, size: 38, fill: C.white });
});

// 3. walking every day is good, but not always enough
scene(svg, at('realidad2'), at('cuadriceps2'), g => {
  pan(g, 'e_parque', 'left', { from: [0.5, 0.4], to: [0.5, 0.5] });
  mark(g, 'CAMINAR ES BENEFICIOSO', true, at('caminar2'), { cx: 1510, cy: 330, size: 34 });
  mark(g, 'PERO NO SIEMPRE BASTA', false, at('suficiente2'), { cx: 1510, cy: 500, size: 34 });
  chip(g, 'FALTA FUERZA PARA LEVANTARTE', at('suficiente2') + 1.5, { cx: 1510, cy: 670, size: 28, fill: C.amber });
  source(g, 'Programa Otago: ejercicios de fuerza y equilibrio para prevenir caídas en mayores', at('suficiente2'));
});

// 4. quadriceps (front of the thigh) and glutes
scene(svg, at('cuadriceps2'), at('pierden2'), g => {
  tile(g, 'u_cuadriceps', at('cuadriceps2') - 0.2, { x: 140, y: 170, w: 760, h: 500, label: 'CUÁDRICEPS' });
  tile(g, 'u_gluteos', at('gluteos2') - 0.2, { x: 1020, y: 170, w: 760, h: 500, label: 'GLÚTEOS' });
  chip(g, 'LOS MÚSCULOS PARA LEVANTARTE', at('gluteos2') + 1, { cy: 860, size: 44, fill: C.ink, color: C.amber });
});

// 5. when they weaken, getting up costs more and more
scene(svg, at('pierden2'), at('segundo2'), g => {
  pan(g, 'u_debil', 'left', { from: [0.5, 0.5], to: [0.5, 0.45] });
  chip(g, 'MÚSCULO DÉBIL', at('pierden2') + 0.3, { cx: 1510, cy: 330, size: 44, fill: C.red, color: C.white });
  chip(g, 'LEVANTARSE CUESTA', at('esfuerzo2') - 0.5, { cx: 1510, cy: 480, size: 40, fill: C.white });
  chip(g, 'CADA VEZ MÁS', at('esfuerzo2') + 0.5, { cx: 1510, cy: 610, size: 40, fill: C.white });
});

// 6. the second exercise: sitting down and getting up, as a controlled workout
scene(svg, at('segundo2'), at('busca2'), g => {
  chip(g, 'EJERCICIO 2', at('segundo2'), { cy: 90, size: 44, fill: C.ink, color: C.amber });
  [0, 1, 2, 3].forEach(i => {
    const L = Live(g, { t0: at('sentarte2') + i * 0.45, cx: 330 + i * 420, cy: 540, enter: 'pop', idle: 'none' });
    Cutout(L.g, src('sentadilla_' + i), { cx: 330 + i * 420, cy: 540, iw: SZ['sentadilla_' + i][0], ih: SZ['sentadilla_' + i][1], fit: 600 });
    sfx(at('sentarte2') + i * 0.45, 'pop');
  });
  chip(g, 'SENTARTE Y LEVANTARTE', at('sentarte2') + 0.3, { cy: 940, size: 52, fill: C.green, color: C.white });
});

// 7. a stable chair: backrest, no wheels, against a wall
scene(svg, at('busca2'), at('sientate2'), g => {
  obj(g, 'silla', at('busca2'), { cx: 620, cy: 560, fit: 640, amp: 0.3 });
  chip(g, 'UNA SILLA ESTABLE', at('busca2') + 0.3, { cx: 1350, cy: 230, size: 44, fill: C.ink, color: C.amber });
  mark(g, 'CON RESPALDO', true, at('respaldo2'), { cx: 1350, cy: 400, size: 42 });
  mark(g, 'SIN RUEDAS', true, at('ruedas2'), { cx: 1350, cy: 550, size: 42 });
  mark(g, 'CONTRA LA PARED', true, at('pared2'), { cx: 1350, cy: 700, size: 42 });
});

// 8. sit up straight, feet flat shoulder-width apart, knees in line with the feet
scene(svg, at('sientate2'), at('inclina2'), g => {
  Poses(g, 'sentadilla', at('sientate2'), { cx: 560, cy: 560, h: 800 });
  mark(g, 'ESPALDA ERGUIDA', true, at('sientate2') + 0.4, { cx: 1350, cy: 270, size: 38 });
  mark(g, 'PIES APOYADOS', true, at('pies2'), { cx: 1350, cy: 420, size: 38 });
  mark(g, 'ANCHURA DE LOS HOMBROS', true, at('hombros2'), { cx: 1350, cy: 570, size: 32 });
  mark(g, 'RODILLAS ALINEADAS CON LOS PIES', true, at('alineadas2'), { cx: 1330, cy: 720, size: 28 });
});

// 9. lean forward from the hips, press the floor, stand up slowly with thighs and glutes, hold 1 s
scene(svg, at('inclina2'), at('importante2'), g => {
  Poses(g, 'sentadilla', at('inclina2'), { cx: 560, cy: 560, h: 800, enter: 'none',
    idx: KEYS([[0, 0], [at('inclina2') + 0.6, 1], [at('presiona2') + 0.3, 2], [at('despacio2') + 0.3, 3]]) });
  chip(g, '1 · INCLINA EL TRONCO', at('inclina2') + 0.3, { cx: 1350, cy: 200, size: 36, fill: C.white });
  chip(g, 'PECHO HACIA LAS RODILLAS', at('pecho2'), { cx: 1350, cy: 310, size: 30, fill: C.amber });
  chip(g, '2 · PRESIONA EL SUELO', at('presiona2'), { cx: 1350, cy: 440, size: 36, fill: C.white });
  chip(g, '3 · LEVÁNTATE DESPACIO', at('despacio2'), { cx: 1350, cy: 570, size: 36, fill: C.white });
  chip(g, 'MUSLOS Y GLÚTEOS', at('muslos2'), { cx: 1350, cy: 680, size: 32, fill: TEAL, color: C.white });
  chip(g, 'DE PIE 1 SEGUNDO', at('manten2'), { cx: 1350, cy: 810, size: 36, fill: C.white });
  chip(g, 'SIN BLOQUEAR LAS RODILLAS', at('manten2') + 1.5, { cx: 1350, cy: 920, size: 30, fill: C.amber });
});

// 10. the most important part: sit back down slowly — don't drop, control the descent
scene(svg, at('importante2'), at('escalones2'), g => {
  const k = at('lentamente2');
  Poses(g, 'sentadilla', at('importante2'), { cx: 560, cy: 560, h: 800, enter: 'none', fade: 0.6,
    idx: KEYS([[0, 3], [k + 0.4, 2], [k + 1.6, 1], [k + 2.8, 0]]) });
  chip(g, 'LO MÁS IMPORTANTE', at('importante2') + 0.3, { cx: 1350, cy: 220, size: 40, fill: C.ink, color: C.amber });
  chip(g, 'SIÉNTATE DESPACIO', at('lentamente2'), { cx: 1350, cy: 380, size: 44, fill: C.white });
  stamp(g, 'NO TE DEJES CAER', at('caer2'), { cx: 1350, cy: 570, size: 54, color: C.red, rot: -5 });
  chip(g, 'DESCENSO CONTROLADO', at('controla2'), { cx: 1350, cy: 770, size: 40, fill: C.green, color: C.white });
});

// 11. that effort helps with stairs, uneven ground and small trips
scene(svg, at('escalones2'), at('reps2'), g => {
  chip(g, 'TE AYUDA A…', at('escalones2') - 0.5, { cy: 90, size: 48, fill: C.ink, color: C.amber });
  tile(g, 'l_escalera', at('escalones2'), { x: 70, y: 200, w: 570, h: 380, label: 'SUBIR ESCALONES' });
  tile(g, 'i_adoquin', at('irregulares2'), { x: 675, y: 200, w: 570, h: 380, label: 'SUELO IRREGULAR' });
  tile(g, 'h_gato', at('tropiezos2'), { x: 1280, y: 200, w: 570, h: 380, label: 'PEQUEÑOS TROPIEZOS' });
});

// 12. 8–10 reps; armrests are fine at first; no pain, no rush
scene(svg, at('reps2'), at('cardio2'), g => {
  const idx = CYCLE(at('reps2'), [[0, 1.0], [1, 0.8], [2, 0.8], [3, 1.4], [2, 1.0], [1, 1.0], [0, 1.0]]);
  Poses(g, 'sentadilla', at('reps2'), { cx: 520, cy: 560, h: 800, enter: 'none', idx });
  RepCounter(g, at('reps2') + 0.2, { cx: 1300, cy: 300, period: 7, total: '8–10', max: 10 });
  PhaseCue(g, at('reps2') + 0.5, ['SUBES · SUELTA EL AIRE', 'BAJA DESPACIO'], t => { const q = ((t - at('reps2')) % 7 + 7) % 7; return q < 4 ? 0 : 1; }, { cx: 1300, cy: 650, size: 34 });
  chip(g, '¿NECESITAS LAS MANOS? USA REPOSABRAZOS', at('reposabrazos2'), { cx: 1300, cy: 790, size: 26, fill: C.white });
  chip(g, 'SIN DOLOR NI PRISAS', at('prisas2'), { cx: 1300, cy: 920, size: 36, fill: C.green, color: C.white });
});

// 13. cardiovascular: big muscle groups, a bit more oxygen; can improve fitness — not a BP treatment
scene(svg, at('cardio2'), at('respirar2'), g => {
  heart(g, at('cardio2') + 0.2, 460, 470, 500);
  chip(g, 'GRANDES GRUPOS MUSCULARES', at('grupos2'), { cx: 1340, cy: 220, size: 34, fill: C.white });
  chip(g, '↑ OXÍGENO, MODERADO', at('oxigeno2'), { cx: 1340, cy: 350, size: 36, fill: C.white });
  mark(g, 'MEJOR CONDICIÓN FÍSICA', true, at('condicion2'), { cx: 1340, cy: 520, size: 34 });
  mark(g, 'NO ES UN TRATAMIENTO', false, at('tratamiento2'), { cx: 1340, cy: 680, size: 34 });
  chip(g, 'NI PARA LA TENSIÓN NI PARA LOS MAREOS', at('tratamiento2') + 1.5, { cx: 1340, cy: 820, size: 26, fill: C.amber });
});

// 14. breathe naturally; stop if dizziness, chest pain or unusual shortness of breath (≥ 6 s)
scene(svg, at('respirar2'), at('piensa2'), g => {
  mark(g, 'CONTENER EL AIRE AL LEVANTARTE', false, at('respirar2') + 0.5, { cy: 110, size: 36 });
  warn(g, 'DETENTE SI NOTAS', ['MAREO', 'DOLOR EN EL PECHO', 'FALTA DE AIRE INUSUAL'], at('notas2'), { y: 250, w: 1100, size: 46 });
}, { punch: [at('notas2')] });

// 15. strength isn't enough if your body can't correct a small imbalance → exercise 3
scene(svg, at('piensa2'), at('seguir2'), g => {
  pan(g, 'i_atras', 'full', { from: [0.5, 0.45], to: [0.45, 0.5] });
  cap(g, '¿Y SI NO SABES CORREGIR UN DESEQUILIBRIO?', at('desequilibrio2') - 1, { size: 44, hi: 'DESEQUILIBRIO' });
});

// 16. subscribe + bell; your freedom to move with confidence
scene(svg, at('seguir2'), at('p3') - 1.3, g => {
  tile(g, 'f_pareja', at('seguir2'), { x: 410, y: 80, w: 1100, h: 600 });
  CTAlive(g, 'sub', 'SUSCRÍBETE Y ACTIVA LA CAMPANITA', at('suscribete2') - 0.3, { y: 730 });
  chip(g, 'TU LIBERTAD PARA MOVERTE', at('libertad2'), { cy: 950, size: 40, fill: C.amber });
}, { punch: [at('suscribete2')] });
