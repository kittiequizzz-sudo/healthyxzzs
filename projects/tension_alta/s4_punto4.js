// PUNTO 4 — apnea del sueño: night should rest the heart; airway blocks, O2 drops, sympathetic surges,
// non-dipper, morning BP high despite pills, signs, sleep study, CPAP.

// 0. kicker
scene(svg, at('p4') - 0.3, at('debería'), g => {
  pan(g, 'a_ronca', 'full', { from: [0.3, 0.45], to: [0.45, 0.45] });
  kicker(g, 'PUNTO 4', 'LA APNEA DEL SUEÑO', at('p4'));
});

// 1. at night the heart should rest: rate and pressure go down naturally
scene(svg, at('debería'), at('sin_embargo4'), g => {
  pan(g, 'n_corazon', 'left', { from: [0.5, 0.5], to: [0.45, 0.4] });
  ECG(g, at('disminuir4') - 0.5, { x: 1230, y: 250, w: 560, h: 150, bpm: t => 72 - 14 * prog(t, at('disminuir4'), at('disminuir4') + 3) });
  chip(g, '↓ FRECUENCIA CARDÍACA', at('disminuir4'), { cx: 1510, cy: 500, size: 30, fill: '#2F5F9E', color: C.white });
  chip(g, '↓ PRESIÓN ARTERIAL', at('desciende') - 0.5, { cx: 1510, cy: 620, size: 32, fill: TEAL, color: C.white });
});

// 2. what if instead your body faced alarm after alarm, without you noticing? → OSA
scene(svg, at('sin_embargo4'), at('vias'), g => {
  pan(g, 'n_alarma', 'full', { from: [0.4, 0.5], to: [0.55, 0.45] });
  cap(g, 'UNA ALARMA TRAS OTRA', at('alarma4'), { hi: 'ALARMA', hiColor: '#FF7A6E', t1: at('apnea4') });
  cap(g, 'APNEA OBSTRUCTIVA DEL SUEÑO', at('apnea4'), { hi: 'APNEA' });
}, { punch: [at('apnea4')] });

// 3. the airway narrows or blocks again and again → breathing stops → less oxygen
scene(svg, at('vias'), at('cada4'), g => {
  pan(g, 'n_via', 'left', { from: [0.6, 0.4], to: [0.45, 0.55], zoom: 0.22 });
  chip(g, 'LA VÍA AÉREA SE CIERRA', at('bloquean'), { cx: 1510, cy: 230, size: 32, fill: C.red, color: C.white });
  const L = Live(g, { t0: at('oxigeno4') - 0.5, cx: 1510, cy: 420, enter: 'r', idle: 'none' });
  Text(L.g, 'OXÍGENO EN SANGRE', { x: 1510, y: 360, size: 32 });
  const b = Bar(L.g, { x: 1280, y: 395, w: 460, h: 70, color: C.blue });
  anim(t => b.draw(0.95 - 0.4 * E.inOut(prog(t, at('oxigeno4'), at('oxigeno4') + 2.5))));
  chip(g, 'NO LO RECUERDAS…', at('aunque4'), { cx: 1510, cy: 600, size: 36, fill: NIGHT, color: C.white });
  chip(g, '…PERO TU CEREBRO REACCIONA', at('cerebro4'), { cx: 1510, cy: 720, size: 30, fill: C.amber });
});

// 4. each interruption: sympathetic surge, vessels contract, transient pressure spikes — dozens per night
scene(svg, at('cada4'), at('consecuencia4'), g => {
  Seesaw(g, at('cada4'), { cx: 560, cy: 430, w: 800, tilt: t => -16 * E.inOut(prog(t, at('cada4') + 0.5, at('cada4') + 2)) });
  ECG(g, at('corazon4') - 0.5, { x: 1060, y: 150, w: 760, h: 160, bpm: t => 64 + 40 * prog(t, at('corazon4'), at('corazon4') + 1.5) });
  Vessel(g, at('contraerse4') - 0.6, { x: 1060, y: 480, w: 760, r: 80, n: 8, narrow: t => 0.8 * E.inOut(prog(t, at('contraerse4') - 0.2, at('contraerse4') + 1.4)) });
  chip(g, 'SUBIDAS DE TENSIÓN', at('elevaciones') - 0.6, { cx: 1440, cy: 680, size: 38, fill: C.red, color: C.white });
  NightBar(g, at('decenas') - 1, { x: 160, y: 820, w: 1600, h: 90, ticks: Array.from({ length: 30 }, (_, i) => (i + 0.4 * Math.sin(i * 5)) / 30), tA: at('decenas') - 0.8, gap: 0.1, label: false });
  chip(g, 'DECENAS DE VECES CADA NOCHE', at('decenas'), { cx: 960, cy: 980, size: 34, fill: NIGHT, color: C.white });
});

// 5. some lose the nightly dip: "non-dipper" · or wake up with high BP despite pills
scene(svg, at('consecuencia4'), at('sospechar'), g => {
  chip(g, 'SIN DESCENSO NOCTURNO', at('consecuencia4') + 0.5, { cy: 80, size: 44, fill: C.red, color: C.white });
  const ch = Chart24(g, at('consecuencia4') + 0.8, { x: 300, y: 220, w: 1320, h: 480, label: 'PRESIÓN ARTERIAL' });
  ch.curve(BP_DIP, '#9AA3B5', at('consecuencia4') + 1.2, at('pierden'), { wd: 8 });
  ch.curve(BP_FLAT, '#B5372E', at('pierden'), at('pierden') + 3.5, { wd: 12 });
  chip(g, '«NON-DIPPER»', at('nondipper'), { cx: 1300, cy: 300, size: 40, fill: '#B5372E', color: C.white });
  Monitor(g, at('al_despertar') - 0.5, { cx: 960, cy: 900, s: 0.42, sys: 152, dia: 96, count: 1 });
  chip(g, 'ALTA AL DESPERTAR', at('al_despertar'), { cx: 560, cy: 900, size: 34, fill: C.amber });
  chip(g, 'AUNQUE TOMES TU PASTILLA', at('al_despertar') + 2.5, { cx: 1400, cy: 900, size: 30, fill: C.white });
}, { punch: [at('nondipper')] });

// 6. how to suspect it: loud snoring with pauses seen by someone else
scene(svg, at('sospechar'), at('cabeza4') - 1, g => {
  pan(g, 'a_ronca', 'left', { from: [0.25, 0.45], to: [0.6, 0.45] });
  chip(g, '¿CÓMO SOSPECHARLA?', at('sospechar'), { cx: 1510, cy: 230, size: 38, fill: C.ink, color: C.amber });
  chip(g, 'RONQUIDOS FUERTES', at('ronquidos'), { cx: 1510, cy: 400, size: 38, fill: C.amber });
  chip(g, 'PAUSAS AL RESPIRAR', at('pausas'), { cx: 1510, cy: 540, size: 38, fill: C.amber });
});

// 7. headache, dry mouth, daytime tiredness, poor concentration
scene(svg, at('cabeza4') - 1, at('lo_importante4'), g => {
  tile(g, 'a_cabeza', at('cabeza4') - 0.6, { x: 90, y: 110, w: 850, h: 400, label: 'DOLOR DE CABEZA · BOCA SECA' });
  tile(g, 'a_somnolencia', at('cansancio4') - 0.4, { x: 980, y: 110, w: 850, h: 400, label: 'CANSANCIO · CONCENTRACIÓN' });
  mark(g, 'NO TODOS TIENEN LOS MISMOS SÍNTOMAS', true, at('no_todas4'), { cx: 960, cy: 720, size: 32 });
  mark(g, 'RONCAR ≠ TENER APNEA', false, at('roncar'), { cx: 960, cy: 860, size: 40 });
});

// 8. not just sleep quality: higher CV risk, common in hard-to-control hypertension
scene(svg, at('lo_importante4'), at('reconoces'), g => {
  heart(g, at('lo_importante4') + 0.3, 520, 470, 380, { period: 0.6 });
  chip(g, 'NO SOLO AFECTA AL DESCANSO', at('lo_importante4') + 0.5, { cx: 1300, cy: 260, size: 34, fill: C.white });
  chip(g, '↑ RIESGO CARDIOVASCULAR', at('riesgo4'), { cx: 1300, cy: 420, size: 38, fill: C.red, color: C.white });
  chip(g, 'FRECUENTE EN HIPERTENSIÓN', at('dificil4') - 1.5, { cx: 1300, cy: 580, size: 34, fill: C.amber });
  chip(g, 'DIFÍCIL DE CONTROLAR', at('dificil4') - 1, { cx: 1300, cy: 690, size: 34, fill: C.amber });
});

// 9. tell your doctor · sleep study · CPAP can help lower BP (effect varies)
scene(svg, at('reconoces'), at('pregunta4'), g => {
  pan(g, 'a_cpap', 'left', { from: [0.4, 0.4], to: [0.5, 0.55] });
  chip(g, 'COMÉNTALO CON TU MÉDICO', at('reconoces') + 0.5, { cx: 1510, cy: 210, size: 30, fill: TEAL, color: C.white });
  chip(g, 'ESTUDIO DEL SUEÑO', at('estudio'), { cx: 1510, cy: 350, size: 38, fill: C.white });
  chip(g, 'CPAP', at('cpap') + 1, { cx: 1510, cy: 500, size: 64, fill: C.blue, color: C.white });
  chip(g, 'PUEDE AYUDAR A BAJAR LA TENSIÓN', at('cpap') + 4, { cx: 1510, cy: 650, size: 24, fill: C.green, color: C.white });
  chip(g, 'EL EFECTO VARÍA', at('varia'), { cx: 1510, cy: 760, size: 34, fill: C.amber });
});

// 10. do you wake up tired even after enough hours? comments
scene(svg, at('pregunta4'), at('quinta'), g => {
  tile(g, 'a_cabeza', at('pregunta4') + 0.2, { x: 410, y: 80, w: 1100, h: 600 });
  chip(g, '¿TE DESPIERTAS CANSADO?', at('despiertas'), { cx: 960, cy: 60, size: 44, fill: NIGHT, color: C.white });
  CTAlive(g, 'comment', 'CUÉNTAMELO EN LOS COMENTARIOS', at('cuentamelo'), { y: 760 });
});

// 11. one more: maybe your treatment needs an individual review and adjustment
scene(svg, at('quinta'), at('p5') - 0.3, g => {
  obj(g, 'pastillero', at('quinta') + 0.5, { cx: 960, cy: 420, fit: 600, amp: 0.5 });
  chip(g, 'LA QUINTA EXPLICACIÓN', at('quinta') + 0.3, { cy: 110, size: 46, fill: C.ink, color: C.amber });
  cap(g, 'UN AJUSTE INDIVIDUALIZADO', at('ajuste4') - 1.5, { cy: 820, hi: 'AJUSTE' });
});
