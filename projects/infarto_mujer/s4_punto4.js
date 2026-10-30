// PUNTO 4 — breathlessness without chest pain: Dolores (74, dramatización) watering plants, again in the
// hallway; weak pump → higher pressure in lung vessels → can't fill the lungs; also lung disease, anaemia,
// infections; worrying if sudden/intense/different; women with diabetes may have quieter heart symptoms;
// sudden breathlessness at rest or minimal effort + sweat/nausea/weakness → 112; subscribe.

// 0. kicker
scene(svg, at('p4') - 0.3, at('situacion4'), g => {
  pan(g, 'o_baranda', 'full', { from: [0.5, 0.45], to: [0.5, 0.5] });
  kicker(g, 'SÍNTOMA 4', 'FALTA DE AIRE\nSIN DOLOR EN EL PECHO', at('p4'));
});

// 1. short of breath doing once-easy things — even with no chest pain, so it isn't linked to the heart
scene(svg, at('situacion4'), at('dolores4'), g => {
  obj(g, 'pulmones', at('situacion4') + 0.3, { cx: 500, cy: 500, fit: 560 });
  chip(g, 'TE FALTA EL AIRE', at('aire4'), { cx: 1320, cy: 300, size: 44, fill: C.red, color: C.white });
  chip(g, 'EN TAREAS QUE ERAN SENCILLAS', at('aire4') + 1.5, { cx: 1320, cy: 430, size: 30, fill: C.white });
  mark(g, 'SIN DOLOR EN EL PECHO', false, at('sin_dolor4'), { cx: 1320, cy: 590, size: 34 });
  chip(g, '«NO SERÁ EL CORAZÓN»', at('relacionan4'), { cx: 1320, cy: 740, size: 34, fill: C.amber });
});

// 2. Dolores, 74: watering her plants she can't catch her breath; it happens again in the hallway
scene(svg, at('dolores4'), at('musculo4'), g => {
  story(g, 'DOLORES, 74 AÑOS', at('dolores4'));
  tile(g, 'o_riego', at('plantas4') - 0.3, { x: 70, y: 180, w: 570, h: 380, label: 'RIEGA SUS PLANTAS' });
  tile(g, 'o_baranda', at('riega4') + 1, { x: 675, y: 180, w: 570, h: 380, label: 'SIN ALIENTO' });
  tile(g, 'o_pasillo', at('pasillo4') - 0.5, { x: 1280, y: 180, w: 570, h: 380, label: 'OTRA VEZ EN EL PASILLO' });
  chip(g, 'SU CORAZÓN LE ENVÍA UNA SEÑAL', at('senal4') - 1, { cy: 760, size: 40, fill: C.amber });
});

// 3. why: the heart pumps less well → pressure rises in the lung vessels → breathlessness, can't fill the lungs
scene(svg, at('musculo4'), at('aclaracion4'), g => {
  tile(g, 'l_bomba', at('musculo4'), { x: 140, y: 150, w: 760, h: 500, label: 'EL CORAZÓN BOMBEA PEOR' });
  tile(g, 'l_esponja', at('pulmones4') - 0.5, { x: 1020, y: 150, w: 760, h: 500, label: '↑ PRESIÓN EN LOS PULMONES' });
  chip(g, 'SENSACIÓN DE AHOGO', at('ahogo4'), { cy: 790, size: 44, fill: C.red, color: C.white });
  chip(g, '«NO PUEDO LLENAR LOS PULMONES»', at('llenar4'), { cy: 920, size: 36, fill: C.white });
});

// 4. also lung disease, anaemia, infections — worrying when sudden, intense or clearly different
scene(svg, at('aclaracion4'), at('diabetes4'), g => {
  pan(g, 'l_causas', 'left', { from: [0.5, 0.5], to: [0.5, 0.45] });
  chip(g, 'TAMBIÉN PUEDE SER…', at('aclaracion4') + 0.5, { cx: 1510, cy: 190, size: 36, fill: C.ink, color: C.amber });
  chip(g, 'PULMONES · ANEMIA · INFECCIONES', at('respiratorias4'), { cx: 1510, cy: 320, size: 24, fill: C.white });
  chip(g, 'PREOCUPA SI ES:', at('preocupante4'), { cx: 1510, cy: 470, size: 34, fill: C.red, color: C.white });
  chip(g, 'REPENTINA · INTENSA · DIFERENTE', at('preocupante4') + 1, { cx: 1510, cy: 590, size: 26, fill: C.white });
});

// 5. women with diabetes: quieter heart symptoms — breathlessness alone can be an emergency
scene(svg, at('diabetes4'), at('sentada4'), g => {
  pan(g, 'l_azucar', 'left', { from: [0.45, 0.5], to: [0.55, 0.45] });
  Food(g, 'glucometro', at('diabetes4'), { cx: 1510, cy: 260, r: 120, label: 'CON DIABETES', fill: C.amber });
  chip(g, 'SÍNTOMAS MENOS EVIDENTES', at('evidentes4'), { cx: 1510, cy: 520, size: 28, fill: C.white });
  chip(g, 'PUEDE SER UNA EMERGENCIA', at('emergencia4') - 0.5, { cx: 1510, cy: 650, size: 28, fill: C.red, color: C.white });
});

// 6. sudden breathlessness sitting or with minimal activity (+ cold sweat, nausea, weakness) → 112 (≥ 6 s)
scene(svg, at('sentada4'), at('suscribete4') - 1, g => {
  call112(g, at('sentada4') + 0.5, ['AHOGO DE PRONTO, SENTADA', 'O CON UN ESFUERZO MÍNIMO', '+ SUDOR FRÍO · NÁUSEAS · DEBILIDAD']);
  chip(g, 'NO «PRUEBES» CAMINANDO MÁS', at('resistencia4'), { cx: 1110, cy: 900, size: 34, fill: C.amber });
}, { punch: [at('llama4')] });

// 7. subscribe; breathing calmly feels ordinary until something changes
scene(svg, at('suscribete4') - 1, at('p5') - 0.3, g => {
  tile(g, 'o_riego', at('suscribete4') - 0.8, { x: 410, y: 80, w: 1100, h: 600 });
  CTAlive(g, 'sub', 'SUSCRÍBETE Y ACTIVA LAS NOTIFICACIONES', at('suscribete4') - 0.3, { y: 730 });
  chip(g, 'PRESTA ATENCIÓN CUANDO ALGO CAMBIA', at('respirar4') + 1, { cy: 950, size: 34, fill: C.amber });
}, { punch: [at('suscribete4')] });
