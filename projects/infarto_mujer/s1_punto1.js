// PUNTO 1 — sudden, extreme exhaustion: Carmen (68, dramatización); narrowed coronaries → the heart muscle
// suffers on effort → disproportionate fatigue even without chest pain; new, intense, hard to explain; also
// anaemia, thyroid, infections, sleep; red flags: sudden + breathless, cold sweat, nausea, chest discomfort →
// 112, don't drive; days of energy loss → see a doctor soon; comment question.

// 0. kicker
scene(svg, at('p1') - 0.3, at('diferencia1'), g => {
  pan(g, 'c_escalera', 'full', { from: [0.5, 0.45], to: [0.5, 0.5] });
  kicker(g, 'SÍNTOMA 1', 'AGOTAMIENTO EXTREMO\nY REPENTINO', at('p1'));
});

// 1. tired after a hard day vs a body that no longer responds; many don't notice until worse symptoms
scene(svg, at('diferencia1'), at('carmen1'), g => {
  Food(g, 'sillon', at('diferencia1') + 0.3, { cx: 500, cy: 400, r: 170, label: 'CANSANCIO NORMAL', fill: C.green, color: C.white });
  Sign(g, '≠', at('responde1') - 0.5, { cx: 960, cy: 400, size: 180 });
  Food(g, 'pila', at('responde1'), { cx: 1420, cy: 400, r: 170, label: 'TU CUERPO NO RESPONDE', fill: C.red, color: C.white });
  chip(g, 'MUCHAS NO NOTAN LA DIFERENCIA', at('reconocen1'), { cy: 760, size: 42, fill: C.white });
  chip(g, '«INOFENSIVO»… O NO', at('inofensivo1'), { cy: 900, size: 40, fill: C.amber });
});

// 2. Carmen, 68, Valladolid: always active, cooks for her grandchildren, walks every morning
scene(svg, at('carmen1'), at('extrano1'), g => {
  pan(g, 'c_cocina', 'full', { from: [0.45, 0.45], to: [0.55, 0.5] });
  story(g, 'CARMEN, 68 AÑOS · VALLADOLID', at('carmen1'));
  cap(g, 'SIEMPRE HA SIDO ACTIVA', at('activa1'), { cy: 900, hi: 'ACTIVA', hiColor: '#7DE08E' });
});

// 3. lately: making the bed needs a rest, a few steps exhaust her, she wakes up without energy
scene(svg, at('extrano1'), at('envejeciendo1'), g => {
  chip(g, 'ALGO EXTRAÑO', at('extrano1'), { cy: 90, size: 44, fill: C.ink, color: C.amber });
  tile(g, 'c_cama', at('cama1') - 0.2, { x: 70, y: 210, w: 570, h: 380, label: 'HACER LA CAMA = DESCANSAR' });
  tile(g, 'c_escalera', at('escalones1') - 0.2, { x: 675, y: 210, w: 570, h: 380, label: 'POCOS ESCALONES = AGOTADA' });
  tile(g, 'c_despierta', at('dormir1') - 0.2, { x: 1280, y: 210, w: 570, h: 380, label: 'DUERME… Y SIN ENERGÍA' });
  tag(g, 'DRAMATIZACIÓN', at('extrano1'), { x: 1580, y: 960 });
});

// 4. she thinks it's ageing — but that change deserves medical attention
scene(svg, at('envejeciendo1'), at('porque1'), g => {
  pan(g, 'c_despierta', 'left', { from: [0.5, 0.45], to: [0.5, 0.5] });
  mark(g, '«ES LA EDAD»', false, at('envejeciendo1') + 0.6, { cx: 1510, cy: 360, size: 40 });
  mark(g, 'MERECE ATENCIÓN MÉDICA', true, at('atencion1'), { cx: 1510, cy: 520, size: 30 });
});

// 5. why: the heart needs oxygen-rich blood; narrowed coronaries → the muscle suffers on effort → fatigue
scene(svg, at('porque1'), at('habitual1'), g => {
  pan(g, 'h_arteria', 'left', { from: [0.45, 0.5], to: [0.62, 0.45] });
  chip(g, '¿POR QUÉ?', at('porque1'), { cx: 1510, cy: 180, size: 44, fill: C.ink, color: C.amber });
  chip(g, 'NECESITA SANGRE CON OXÍGENO', at('oxigeno1'), { cx: 1510, cy: 310, size: 26, fill: C.white });
  chip(g, 'ARTERIAS CORONARIAS ESTRECHAS', at('coronarias1'), { cx: 1510, cy: 430, size: 26, fill: C.red, color: C.white });
  chip(g, 'EL MÚSCULO SUFRE AL ESFORZARSE', at('sufrir1'), { cx: 1510, cy: 550, size: 26, fill: C.white });
  chip(g, '→ FATIGA DESPROPORCIONADA', at('fatiga1'), { cx: 1510, cy: 680, size: 28, fill: C.amber });
  chip(g, 'INCLUSO SIN DOLOR EN EL PECHO', at('opresivo1'), { cx: 1510, cy: 800, size: 26, fill: C.white });
});

// 6. not the usual tiredness: something new, intense, hard to explain — shopping, showering, dressing
scene(svg, at('habitual1'), at('atencion1b'), g => {
  pan(g, 'h_pila', 'left', { from: [0.5, 0.5], to: [0.5, 0.45] });
  mark(g, 'EL CANSANCIO DE SIEMPRE', false, at('habitual1') + 0.3, { cx: 1510, cy: 200, size: 28 });
  chip(g, 'NUEVO · INTENSO · INEXPLICABLE', at('nueva1'), { cx: 1510, cy: 340, size: 26, fill: C.red, color: C.white });
  chip(g, 'PAUSAS AL HACER LA COMPRA', at('compra1'), { cx: 1510, cy: 480, size: 28, fill: C.white });
  chip(g, 'DUCHARSE O VESTIRSE CUESTA', at('duchar1'), { cx: 1510, cy: 600, size: 28, fill: C.white });
  chip(g, '«SIN NADA DE ENERGÍA»', at('debilidad1'), { cx: 1510, cy: 720, size: 30, fill: C.amber });
});

// 7. but: also anaemia, thyroid, infections, sleep — tiredness ≠ automatically a heart attack
scene(svg, at('atencion1b'), at('alerta1'), g => {
  pan(g, 'h_causas', 'left', { from: [0.5, 0.5], to: [0.5, 0.45] });
  chip(g, 'TAMBIÉN PUEDE SER…', at('atencion1b') + 0.5, { cx: 1510, cy: 180, size: 36, fill: C.ink, color: C.amber });
  [['ANEMIA', 'anemia1'], ['TIROIDES', 'tiroideas1'], ['INFECCIONES', 'infecciones1'], ['PROBLEMAS DE SUEÑO', 'infecciones1']].forEach(([s, k], i) =>
    chip(g, s, at(k) + (i === 3 ? 1.2 : 0), { cx: 1510, cy: 310 + i * 115, size: 32, fill: C.white }));
  mark(g, 'CANSANCIO ≠ INFARTO SIEMPRE', false, at('automaticamente1'), { cx: 1510, cy: 800, size: 26 });
});

// 8. the real red flag: sudden, unexplained, different — with breathlessness, cold sweat, nausea, chest discomfort
scene(svg, at('alerta1'), at('brusca1'), g => {
  chip(g, 'LA VERDADERA SEÑAL DE ALERTA', at('alerta1'), { cy: 90, size: 44, fill: C.red, color: C.white });
  chip(g, 'REPENTINO · INEXPLICABLE · DIFERENTE', at('repentino1'), { cy: 220, size: 36, fill: C.white });
  chip(g, '+ SI APARECE CON:', at('acompanado1'), { cy: 350, size: 36, fill: C.ink, color: C.amber });
  [['pulmones', 'FALTA DE AIRE'], ['termometro', 'SUDOR FRÍO'], ['estomago', 'NÁUSEAS'], ['corazon', 'MOLESTIA EN EL PECHO']]
    .forEach(([n, s], i) => Food(g, n, at('acompanado1') + 0.8 + i * 0.6, { cx: 300 + i * 440, cy: 600, r: 130, label: s, phase: i * 0.2, size: 26 }));
});

// 9. sudden symptoms that suggest a heart attack → call 112 now; don't drive, don't wait (≥ 6 s)
scene(svg, at('brusca1'), at('dias1'), g => {
  call112(g, at('brusca1') + 1, ['SÍNTOMAS BRUSCOS', 'NO CONDUZCAS', 'NO ESPERES A QUE PASEN']);
}, { punch: [at('llama1')] });

// 10. several days of marked energy loss, even without other symptoms → see a doctor soon
scene(svg, at('dias1'), at('pregunta1'), g => {
  tile(g, 'z_medica', at('dias1'), { x: 140, y: 150, w: 900, h: 560 });
  chip(g, 'VARIOS DÍAS SIN ENERGÍA', at('dias1') + 0.5, { cx: 1450, cy: 320, size: 34, fill: C.white });
  chip(g, 'AUNQUE NO HAYA MÁS SÍNTOMAS', at('dias1') + 2.5, { cx: 1450, cy: 450, size: 26, fill: C.white });
  chip(g, '→ VALORACIÓN MÉDICA PRONTO', at('valoracion1'), { cx: 1450, cy: 600, size: 30, fill: C.green, color: C.white });
});

// 11. comment: ever felt a tiredness so strange that resting didn't help?
scene(svg, at('pregunta1'), at('p2') - 0.3, g => {
  tile(g, 'c_cama', at('pregunta1'), { x: 410, y: 70, w: 1100, h: 600 });
  CTAlive(g, 'comment', '¿UN CANSANCIO TAN EXTRAÑO?', at('pregunta1') + 1, { y: 740 });
  chip(g, 'CUÉNTAMELO EN LOS COMENTARIOS', at('cuentamelo1'), { cy: 960, size: 36, fill: C.amber });
});
