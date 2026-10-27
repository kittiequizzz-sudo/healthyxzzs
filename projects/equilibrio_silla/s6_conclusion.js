// CONCLUSIÓN — no need to resign yourself to fear at 60/70/80; recap of the 4 exercises (5 min a day),
// comment question, like/subscribe/share, safety (orientative; consult first; chest pain, fainting,
// severe breathlessness → urgent care, 112), close.

// 0. at 60, 70 or 80 you don't have to resign yourself to walking with fear
scene(svg, at('llegar_c') - 0.3, at('capacidad_c'), g => {
  pan(g, 'f_nieto', 'left', { from: [0.5, 0.45], to: [0.55, 0.5] });
  [['60', 250], ['70', 400], ['80', 550]].forEach(([s, y], i) => chip(g, s + ' AÑOS', at('llegar_c') + 0.5 + i * 0.5, { cx: 1510, cy: y, size: 40, fill: C.white }));
  mark(g, 'CAMINAR CON MIEDO', false, at('resignarte_c'), { cx: 1510, cy: 740, size: 34 });
});

// 1. your body can still adapt: legs, stability, heart
scene(svg, at('capacidad_c'), at('hoy_c'), g => {
  pan(g, 'f_pareja', 'left', { from: [0.5, 0.4], to: [0.5, 0.5] });
  chip(g, 'TU CUERPO SE ADAPTA', at('capacidad_c') + 0.3, { cx: 1510, cy: 220, size: 40, fill: C.ink, color: C.amber });
  chip(g, 'PIERNAS MÁS FUERTES', at('piernas_c'), { cx: 1510, cy: 400, size: 36, fill: TEAL, color: C.white });
  chip(g, 'MÁS ESTABILIDAD', at('estabilidad_c'), { cx: 1510, cy: 540, size: 36, fill: TEAL, color: C.white });
  chip(g, 'SALUD CARDIOVASCULAR', at('cardio_c'), { cx: 1510, cy: 680, size: 34, fill: TEAL, color: C.white });
});

// 2. recap: heels, chair, weight shift, marching — 5 minutes a day, adapted to you
scene(svg, at('hoy_c'), at('cual_c'), g => {
  chip(g, '4 EJERCICIOS SENCILLOS', at('hoy_c') + 0.2, { cy: 90, size: 52, fill: C.ink, color: C.amber });
  [['talones_1', 'TALONES', 'talones_c'], ['sentadilla_2', 'LEVANTARTE', 'silla_c'], ['peso_1', 'PESO', 'peso_c'], ['marcha_1', 'MARCHA', 'sitio_c']].forEach(([p, s, k], i) =>
    ExBadge(g, i + 1, p, at(k) - 0.3, { cx: 300 + i * 440, cy: 400, r: 160, label: s }));
  chip(g, '5 MINUTOS AL DÍA', at('cinco_c') - 0.5, { cy: 790, size: 56, fill: C.green, color: C.white });
  chip(g, 'ADAPTADOS A TI', at('cinco_c') + 2, { cy: 930, size: 40, fill: C.white });
});

// 3. which one was most useful? and from which Spanish city are you watching?
scene(svg, at('cual_c'), at('gusta_c') - 0.8, g => {
  [[560, 250, 1.8], [960, 190, 2.2], [1360, 250, 1.8]].forEach(([x, y, s], i) => {
    const B = Live(g, { t0: at('cual_c') + i * 0.3, cx: x, cy: y, enter: 'pop', idle: 'bob', phase: i * 0.3 });
    Icon.bubble(B.g, x - 50 * s, y - 50 * s, s);
  });
  CTAlive(g, 'comment', '¿CUÁL TE HA SIDO MÁS ÚTIL?', at('cual_c') + 1.5, { y: 470 });
  chip(g, '¿DESDE QUÉ CIUDAD NOS VES?', at('ciudad_c'), { cy: 780, size: 44, fill: C.amber });
});

// 4. like, subscribe, share
scene(svg, at('gusta_c') - 0.8, at('orientativos_c') - 0.8, g => {
  tile(g, 'f_levanta', at('gusta_c') - 0.6, { x: 560, y: 60, w: 800, h: 440 });
  CTAlive(g, 'like', 'ME GUSTA', at('gusta_c') - 0.2, { y: 560 });
  CTAlive(g, 'sub', 'SUSCRÍBETE', at('suscribete_c'), { y: 720 });
  chip(g, 'COMPÁRTELO', at('comparte_c'), { cy: 960, size: 40, fill: C.amber });
}, { punch: [at('suscribete_c')] });

// 5. orientative only; consult first if heart problems, uncontrolled BP, frequent dizziness or falls;
//    chest pain, fainting, severe breathlessness → urgent care (≥ 6 s)
scene(svg, at('orientativos_c') - 0.8, at('equilibrio_c'), g => {
  chip(g, 'EJERCICIOS ORIENTATIVOS · NO SUSTITUYEN AL MÉDICO', at('orientativos_c') - 0.5, { cy: 80, size: 32, fill: C.ink, color: C.white });
  chip(g, 'CONSULTA ANTES SI TIENES:', at('orientativos_c') + 3, { cx: 520, cy: 230, size: 34, fill: C.white });
  ['PROBLEMAS CARDÍACOS', 'HIPERTENSIÓN NO CONTROLADA', 'MAREOS FRECUENTES', 'CAÍDAS PREVIAS'].forEach((s, i) =>
    chip(g, s, at('orientativos_c') + 4 + i * 0.9, { cx: 520, cy: 370 + i * 130, size: 30, fill: C.amber }));
  warn(g, 'URGENCIAS · 112', ['DOLOR TORÁCICO', 'DESMAYO', 'AHOGO INTENSO'], at('dolor_c'), { y: 230, w: 820, size: 44, cx: 1400 });
}, { punch: [at('dolor_c')] });

// 6. close
scene(svg, at('equilibrio_c'), END + 1, g => {
  pan(g, 'f_pareja', 'full', { from: [0.5, 0.45], to: [0.5, 0.5] });
  cap(g, 'TU EQUILIBRIO MERECE CUIDADOS HOY', at('equilibrio_c') + 0.2, { size: 50, hi: 'HOY', hiColor: '#7DE08E' });
}, { fade: 0.5 });
