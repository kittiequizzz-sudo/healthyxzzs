// PUNTO 5 — cold sweat, dizziness, feeling faint: blamed on low BP, heat, not eating; Pilar (67, dramatización)
// sitting reading, no effort, sudden cold sweat, damp hands, dizzy, fears fainting; sympathetic alarm → sweat;
// pump failure/arrhythmia → less blood to the brain → dizziness, fainting; also dehydration, inner ear,
// glucose, medicines — look at onset, intensity, companions; + breath/nausea/chest/jaw → 112; while waiting:
// don't walk/drive, sit safely, upright if breathless; improving ≠ safe; subscribe.

// 0. kicker
scene(svg, at('p5') - 0.3, at('rapidamente5'), g => {
  pan(g, 'p_sudor', 'full', { from: [0.5, 0.45], to: [0.5, 0.5] });
  kicker(g, 'SÍNTOMA 5', 'SUDOR FRÍO, MAREO\nY SENSACIÓN DE DESMAYO', at('p5'));
});

// 1. sudden sweating, head spinning, weakness — blamed on low BP, heat, not eating; can be a serious heart problem
scene(svg, at('rapidamente5'), at('pilar5'), g => {
  chip(g, 'SEÑALES MUY RÁPIDAS', at('rapidamente5') + 0.3, { cy: 90, size: 44, fill: C.ink, color: C.amber });
  [['termometro', 'SUDOR REPENTINO', 'sudar5'], ['cerebro', 'LA CABEZA DA VUELTAS', 'vueltas5'], ['pila', 'DEBILIDAD INTENSA', 'debilidad5']]
    .forEach(([n, s, k], i) => Food(g, n, at(k) - 0.3, { cx: 420 + i * 540, cy: 340, r: 140, label: s, phase: i * 0.3 }));
  chip(g, '«LA TENSIÓN BAJA» · «EL CALOR» · «NO HE COMIDO»', at('atribuyen5'), { cy: 680, size: 32, fill: C.white });
  chip(g, 'PUEDE SER UN PROBLEMA CARDÍACO GRAVE', at('grave5') - 0.5, { cy: 830, size: 38, fill: C.red, color: C.white });
});

// 2. Pilar, 67: sitting reading, pleasant room, no effort — sudden cold sweat, damp hands
scene(svg, at('pilar5'), at('apoyarse5'), g => {
  story(g, 'PILAR, 67 AÑOS', at('pilar5'));
  tile(g, 'p_revista', at('revista5') - 0.3, { x: 140, y: 170, w: 760, h: 500, label: 'SENTADA, SIN ESFUERZO' });
  tile(g, 'p_sudor', at('frio5') - 0.3, { x: 1020, y: 170, w: 760, h: 500, label: 'SUDOR FRÍO · MANOS HÚMEDAS' });
});

// 3. dizzy, needs to lean, fears passing out — "low blood pressure"… but she'd never felt anything like it
scene(svg, at('apoyarse5'), at('porque5'), g => {
  pan(g, 'p_mareo', 'left', { from: [0.45, 0.45], to: [0.5, 0.5] });
  chip(g, 'MAREO · TEME DESMAYARSE', at('apoyarse5') - 1, { cx: 1510, cy: 260, size: 28, fill: C.red, color: C.white });
  mark(g, '«ES LA TENSIÓN BAJA»', false, at('baja5'), { cx: 1510, cy: 420, size: 32 });
  chip(g, 'NUNCA LE HABÍA PASADO', at('semejante5'), { cx: 1510, cy: 580, size: 32, fill: C.amber });
  tag(g, 'DRAMATIZACIÓN', at('apoyarse5'), { x: 1580, y: 960 });
});

// 4. why: danger response — the sympathetic system triggers heavy sweating, even without heat
scene(svg, at('porque5'), at('ritmo5') - 1.5, g => {
  pan(g, 'm_campana', 'left', { from: [0.5, 0.5], to: [0.55, 0.45] });
  chip(g, '¿POR QUÉ?', at('porque5'), { cx: 1510, cy: 200, size: 44, fill: C.ink, color: C.amber });
  chip(g, 'RESPUESTA ANTE EL PELIGRO', at('peligro5'), { cx: 1510, cy: 340, size: 30, fill: C.white });
  chip(g, 'SISTEMA SIMPÁTICO', at('simpatico5'), { cx: 1510, cy: 470, size: 36, fill: C.red, color: C.white });
  chip(g, '→ SUDOR INTENSO SIN CALOR', at('simpatico5') + 2, { cx: 1510, cy: 600, size: 30, fill: C.amber });
});

// 5. pump or rhythm trouble → less blood to the brain → dizziness, weakness, fainting
scene(svg, at('ritmo5') - 1.5, at('enganoso5'), g => {
  tile(g, 'm_ritmo', at('ritmo5') - 1.3, { x: 140, y: 150, w: 760, h: 500, label: 'ALTERACIÓN DEL RITMO' });
  tile(g, 'm_cerebro', at('cerebro5') - 0.3, { x: 1020, y: 150, w: 760, h: 500, label: 'MENOS SANGRE AL CEREBRO' });
  chip(g, 'MAREO · DEBILIDAD · DESMAYO', at('desmayos5'), { cy: 800, size: 44, fill: C.red, color: C.white });
});

// 6. tricky: also dehydration, inner ear, glucose, medicines — key: onset, intensity, what comes with it
scene(svg, at('enganoso5'), at('experimentas5'), g => {
  chip(g, 'TAMBIÉN PUEDE SER…', at('enganoso5') + 0.5, { cy: 90, size: 44, fill: C.ink, color: C.amber });
  [['infusion', 'DESHIDRATACIÓN', 'deshidratacion5'], ['cerebro', 'OÍDO INTERNO', 'oido5'], ['glucometro', 'GLUCOSA', 'glucosa5'], ['pila', 'MEDICAMENTOS', 'medicamentos5']]
    .forEach(([n, s, k], i) => Food(g, n, at(k) - 0.3, { cx: 300 + i * 440, cy: 360, r: 130, label: s, phase: i * 0.2, size: 26 }));
  mark(g, 'NO TODO MAREO ES UN INFARTO', true, at('medicamentos5') + 1.5, { cy: 640, size: 36 });
  chip(g, 'CLAVE: CÓMO EMPIEZA · CUÁNTO · CON QUÉ', at('clave5'), { cy: 800, size: 36, fill: C.amber });
});

// 7. cold sweat + intense dizziness + breath/nausea/chest/jaw → don't wait, call 112 and explain (≥ 6 s)
scene(svg, at('experimentas5'), at('mientras5'), g => {
  call112(g, at('experimentas5') + 0.5, ['SUDOR FRÍO + MAREO INTENSO', '+ FALTA DE AIRE · NÁUSEAS', '+ PECHO O MANDÍBULA'], { y: 200 });
  chip(g, 'EXPLICA LO QUE SIENTES', at('llama5') + 1, { cx: 1110, cy: 900, size: 36, fill: C.amber });
}, { punch: [at('llama5')] });

// 8. while help comes: don't walk, drive or exert yourself; sit safely; upright if breathless
scene(svg, at('mientras5'), at('suscribirte5'), g => {
  chip(g, 'MIENTRAS LLEGA LA AYUDA', at('mientras5'), { cy: 80, size: 44, fill: C.green, color: C.white });
  tile(g, 'x_llaves', at('evita5') - 0.3, { x: 70, y: 170, w: 570, h: 380, label: 'NO CAMINES NI CONDUZCAS' });
  tile(g, 'p_llamada', at('sientate5') - 0.3, { x: 675, y: 170, w: 570, h: 380, label: 'SIÉNTATE, POSICIÓN SEGURA' });
  tile(g, 'x_llamar', at('tronco5') - 0.3, { x: 1280, y: 170, w: 570, h: 380, label: 'TRONCO INCORPORADO' });
  mark(g, '«YA ME ENCUENTRO MEJOR» ≠ PELIGRO PASADO', false, at('mejoren5') - 0.5, { cy: 760, size: 32 });
});

// 9. subscribe; recognising an alarm isn't living in fear, it's knowing when to act
scene(svg, at('suscribirte5'), at('p6') - 0.3, g => {
  tile(g, 'z_paseo', at('suscribirte5'), { x: 410, y: 80, w: 1100, h: 600 });
  CTAlive(g, 'sub', 'SUSCRÍBETE Y ACTIVA LA CAMPANITA', at('suscribirte5') + 0.3, { y: 730 });
  chip(g, 'NO ES MIEDO: ES SABER CUÁNDO ACTUAR', at('miedo5'), { cy: 950, size: 36, fill: C.amber });
}, { punch: [at('suscribirte5') + 0.5] });
