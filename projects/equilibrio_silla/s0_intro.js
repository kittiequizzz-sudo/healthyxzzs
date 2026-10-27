// INTRO (0 → Punto 1). Hook: the fear starts before the fall → it's also circulation/blood pressure →
// calves are a pump → 4 chair exercises in 5 minutes (watch the 3rd) → stay for 3 everyday mistakes.

// 0. the real fear starts seconds before: getting up from a chair with trembling legs
scene(svg, -1, at('mesa0') - 0.3, g => {
  pan(g, 'a_sillon', 'full', { from: [0.55, 0.4], to: [0.45, 0.45] });
  cap(g, 'EL MIEDO NO EMPIEZA AL CAER…', 0.3, { t1: at('empieza0') + 0.2, hi: 'MIEDO' });
  cap(g, '…EMPIEZA UNOS SEGUNDOS ANTES', at('empieza0') + 0.2, { hi: 'ANTES', t1: at('tiemblan0') });
  cap(g, 'LAS PIERNAS TE TIEMBLAN', at('tiemblan0'), { hi: 'TIEMBLAN', hiColor: '#FF7A6E' });
}, { whoosh: false });

// 1. a table, a wall, the back of a sofa — any support will do
scene(svg, at('mesa0') - 0.3, at('inquietante0'), g => {
  tile(g, 'a_sillon', at('mesa0') - 0.2, { x: 70, y: 170, w: 570, h: 370, label: 'UNA MESA' });
  tile(g, 'a_pared', at('pared0') - 0.2, { x: 675, y: 170, w: 570, h: 370, label: 'UNA PARED' });
  tile(g, 'a_sofa', at('sofa0') - 0.2, { x: 1280, y: 170, w: 570, h: 370, label: 'UN SOFÁ' });
  chip(g, 'CUALQUIER APOYO SIRVE', at('apoyo0'), { cy: 790, size: 52, fill: C.amber });
});

// 2. it can happen even when you still feel strong enough to walk
scene(svg, at('inquietante0'), at('sabias0'), g => {
  pan(g, 'a_camina', 'full', { from: [0.5, 0.4], to: [0.5, 0.5] });
  cap(g, 'INCLUSO SI AÚN TIENES FUERZA PARA CAMINAR', at('fuerza0') - 0.6, { size: 46, hi: 'INCLUSO' });
});

// 3. instability doesn't always start in the legs: circulation and blood pressure on standing
scene(svg, at('sabias0'), at('corazon0'), g => {
  wrapQ(g, at('sabias0') + 0.2, 960, 170, 1.4);
  mark(g, 'NO SIEMPRE EMPIEZA EN LAS PIERNAS', false, at('piernas0') - 0.5, { cy: 340, size: 40 });
  tile(g, 'c_piernas', at('circulacion0') - 0.2, { x: 230, y: 470, w: 640, h: 440, label: 'CIRCULACIÓN' });
  const M = Live(g, { t0: at('presion0') - 0.3, cx: 1350, cy: 690, enter: 'pop', idle: 'none' });
  Card(M.g, { x: 1060, y: 520, w: 580, h: 340, fill: C.white });
  Text(M.g, 'PRESIÓN ARTERIAL', { x: 1350, y: 590, size: 40 });
  Text(M.g, 'AL PONERTE DE PIE', { x: 1350, y: 650, size: 36, weight: 800, color: TEAL });
  const nd = el('line', { x1: 1350, y1: 800, stroke: C.red, 'stroke-width': 14, 'stroke-linecap': 'round' }, M.g);
  el('path', { d: 'M1190 800 A160 100 0 0 1 1510 800', fill: 'none', stroke: '#D8D2C4', 'stroke-width': 18 }, M.g);
  anim(t => { const a = Math.PI * (0.62 - 0.22 * E.inOut(prog(t, at('presion0') + 0.4, at('presion0') + 1.2)) + 0.03 * Math.sin(t * 3)); set(nd, { x2: 1350 - 140 * Math.cos(a), y2: 800 - 90 * Math.sin(a) }); });
  sfx(at('presion0') - 0.3, 'pop');
});

// 4. heart, vessels and muscles must coordinate quickly; if that fails: dizziness, insecurity
scene(svg, at('corazon0'), at('sorprendente0'), g => {
  pan(g, 'c_engranajes', 'left', { from: [0.5, 0.45], to: [0.5, 0.5] });
  chip(g, 'CORAZÓN', at('corazon0') + 0.6, { cx: 1510, cy: 220, size: 40, fill: C.white });
  chip(g, 'VASOS SANGUÍNEOS', at('vasos0'), { cx: 1510, cy: 340, size: 36, fill: C.white });
  chip(g, 'MÚSCULOS', at('musculos0'), { cx: 1510, cy: 460, size: 40, fill: C.white });
  chip(g, 'COORDINACIÓN RÁPIDA', at('musculos0') + 1.2, { cx: 1510, cy: 590, size: 34, fill: TEAL, color: C.white });
  tile(g, 'c_mareo', at('falla0'), { x: 1290, y: 660, w: 440, h: 290 });
  chip(g, 'MAREO · INSEGURIDAD', at('falla0') + 1, { cx: 1510, cy: 990, size: 32, fill: C.red, color: C.white });
});

// 5. the surprise: calf muscles work as an auxiliary pump returning blood to the heart
scene(svg, at('sorprendente0'), at('hoy0'), g => {
  pan(g, 'c_bomba', 'left', { from: [0.3, 0.5], to: [0.55, 0.5] });
  chip(g, 'TUS PANTORRILLAS', at('pantorrillas0'), { cx: 1510, cy: 220, size: 40, fill: C.ink, color: C.amber });
  stamp(g, 'BOMBA AUXILIAR', at('bomba0'), { cx: 1530, cy: 400, size: 52, color: C.red, rot: -5 });
  heart(g, at('devolver0') - 0.3, 1510, 640, 230);
  chip(g, 'LA SANGRE VUELVE AL CORAZÓN', at('devolver0'), { cx: 1510, cy: 830, size: 30, fill: C.white });
  chip(g, 'MOVIMIENTOS MUY SENCILLOS', at('sencillos0'), { cx: 1510, cy: 960, size: 32, fill: C.green, color: C.white });
}, { punch: [at('bomba0')] });

// 6. today: 4 exercises, 5 minutes, a chair as support — legs, balance, circulation
scene(svg, at('hoy0'), at('quedate0'), g => {
  chip(g, '4 EJERCICIOS CON UNA SILLA', at('hoy0') + 0.2, { cy: 90, size: 52, fill: C.ink, color: C.amber });
  [['talones_1', 'TALONES'], ['sentadilla_2', 'SENTADILLA'], ['peso_1', 'PESO'], ['marcha_1', 'MARCHA']].forEach(([p, s], i) =>
    ExBadge(g, i + 1, p, at('hoy0') + 0.8 + i * 0.35, { cx: 300 + i * 440, cy: 390, r: 150, label: s, hl: i === 2 ? at('tercero0') : null }));
  chip(g, '5 MINUTOS', at('cinco0'), { cx: 520, cy: 730, size: 44, fill: C.white });
  chip(g, 'SILLA COMO APOYO', at('silla0'), { cx: 1400, cy: 730, size: 40, fill: C.white });
  [['PIERNAS', 'fortalecer0', 520], ['EQUILIBRIO', 'equilibrio0', 960], ['CIRCULACIÓN', 'circ0', 1400]]
    .forEach(([s, k, x]) => chip(g, s, at(k), { cx: x, cy: 880, size: 40, fill: TEAL, color: C.white }));
  chip(g, '¡ATENCIÓN AL 3º!', at('tercero0') + 0.3, { cx: 1180, cy: 1000, size: 36, fill: C.amber });
  chip(g, 'SE PIERDE SIN DARTE CUENTA', at('pierden0'), { cx: 560, cy: 1000, size: 32, fill: C.white });
});

// 7. stay to the end: 3 everyday mistakes
scene(svg, at('quedate0'), at('porque0'), g => {
  pan(g, 'e_cama', 'full', { from: [0.5, 0.4], to: [0.45, 0.45] });
  cap(g, 'QUÉDATE HASTA EL FINAL', at('quedate0'), { cy: 110, hi: 'FINAL' });
  cap(g, '3 ERRORES COTIDIANOS', at('errores0'), { hi: '3 ERRORES', hiColor: '#FF7A6E' });
});

// 8. regaining confidence can start with something simple
scene(svg, at('porque0'), at('p1') - 0.3, g => {
  pan(g, 'l_facil', 'full', { from: [0.5, 0.45], to: [0.6, 0.4] });
  cap(g, 'RECUPERA LA CONFIANZA AL LEVANTARTE', at('porque0') + 0.4, { size: 48, hi: 'CONFIANZA', hiColor: '#7DE08E' });
});
