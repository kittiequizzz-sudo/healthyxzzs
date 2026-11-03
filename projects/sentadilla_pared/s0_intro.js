// INTRO (0 → Punto 1). Hook: you walk every day, yet heavy legs, breathless on stairs, BP surprises →
// maybe more than walking → a wall at home, no machines → isometric wall squat, promising studies →
// walking stays valuable → what's coming → subscribe.

// 0. years of doing "the right thing": walking every morning, the daily steps
scene(svg, -1, at('noche0') - 0.3, g => {
  pan(g, 'a_paseo', 'full', { from: [0.45, 0.45], to: [0.55, 0.5] });
  cap(g, 'CAMINAS CADA MAÑANA…', at('sales0') - 0.5, { hi: 'CADA MAÑANA', t1: at('pasos0') + 1 });
  cap(g, '…Y CUMPLES TUS PASOS', at('pasos0') + 1, { hi: 'TUS PASOS' });
}, { whoosh: false });

// 1. but at night: heavy legs, breathless on stairs, blood pressure still surprising you
scene(svg, at('noche0') - 0.3, at('pregunta0'), g => {
  chip(g, 'PERO AL LLEGAR LA NOCHE…', at('noche0'), { cy: 90, size: 44, fill: C.ink, color: C.amber });
  tile(g, 'a_piernas', at('pesadas0') - 0.2, { x: 70, y: 200, w: 570, h: 380, label: 'PIERNAS PESADAS' });
  tile(g, 'a_escalera', at('escaleras0') - 0.2, { x: 675, y: 200, w: 570, h: 380, label: 'SIN ALIENTO' });
  tile(g, 'a_tension', at('tension0') - 0.2, { x: 1280, y: 200, w: 570, h: 380, label: 'TENSIÓN CON SORPRESAS' });
});

// 2. what if your body needs more than walking?
scene(svg, at('pregunta0'), at('pared0') - 0.5, g => {
  pan(g, 'n_piensa', 'full', { from: [0.5, 0.45], to: [0.5, 0.5] });
  cap(g, '¿Y SI NECESITAS ALGO MÁS QUE CAMINAR?', at('algo_mas0') - 1.5, { size: 48, hi: 'ALGO MÁS' });
});

// 3. that extra stimulus may be waiting on a simple wall at home — no machines, no weights
scene(svg, at('pared0') - 0.5, at('diferente0') - 1, g => {
  pan(g, 'w_pared', 'left', { from: [0.45, 0.5], to: [0.55, 0.5] });
  chip(g, 'UNA SIMPLE PARED DE TU CASA', at('pared0'), { cx: 1510, cy: 260, size: 30, fill: C.white });
  mark(g, 'SIN MÁQUINAS', false, at('maquinas0'), { cx: 1510, cy: 420, size: 38 });
  mark(g, 'SIN PESAS', false, at('maquinas0') + 0.8, { cx: 1510, cy: 560, size: 38 });
  mark(g, 'SIN SALIR DE CASA', true, at('maquinas0') + 1.8, { cx: 1510, cy: 700, size: 34 });
});

// 4. the isometric wall squat; promising studies on blood pressure, done correctly and regularly
scene(svg, at('diferente0') - 1, at('atencion0'), g => {
  tile(g, 'w_sentada', at('diferente0') - 0.8, { x: 120, y: 160, w: 840, h: 560 });
  tile(g, 'w_muslos', at('diferente0') + 0.3, { x: 1060, y: 160, w: 740, h: 490 });
  stamp(g, 'SENTADILLA ISOMÉTRICA', at('nombre0'), { cx: 960, cy: 830, size: 58, color: TEAL, rot: -3 });
  chip(g, 'ESTUDIOS PROMETEDORES: ↓ PRESIÓN ARTERIAL', at('estudios0') + 1, { cy: 980, size: 32, fill: C.white });
  source(g, 'British Journal of Sports Medicine, 2023 (metaanálisis de 270 ensayos)', at('estudios0') + 1);
}, { punch: [at('nombre0')] });

// 5. walking is still extremely beneficial — the surprise is why holding a position adds something different
scene(svg, at('atencion0'), at('hoy0'), g => {
  tile(g, 'c_amigas', at('atencion0'), { x: 140, y: 160, w: 760, h: 500, label: 'CAMINAR: MUY BENEFICIOSO' });
  tile(g, 'c_pared', at('sorpresa0') - 0.3, { x: 1020, y: 160, w: 760, h: 500, label: 'LA PARED: OTRO ESTÍMULO' });
  Sign(g, '+', at('sorpresa0') + 0.5, { cx: 960, cy: 410, size: 140, color: C.ink });
});

// 6. today: inside your vessels, the leg muscles, how to adapt it safely
scene(svg, at('hoy0'), at('suscribete0') - 0.5, g => {
  chip(g, 'HOY DESCUBRIRÁS', at('hoy0'), { cy: 90, size: 46, fill: C.ink, color: C.amber });
  Food(g, 'arteria', at('vasos0') - 0.3, { cx: 420, cy: 420, r: 160, label: 'TUS VASOS SANGUÍNEOS' });
  Food(g, 'pantorrilla', at('musculos0') - 0.3, { cx: 960, cy: 420, r: 160, label: 'LOS MÚSCULOS', phase: 0.3 });
  Food(g, 'pared', at('adaptar0') - 0.3, { cx: 1500, cy: 420, r: 160, label: 'CÓMO ADAPTARLO', phase: 0.6 });
  chip(g, 'A TU EDAD, SIN RIESGOS INNECESARIOS', at('adaptar0') + 1.5, { cy: 820, size: 38, fill: C.green, color: C.white });
});

// 7. subscribe
scene(svg, at('suscribete0') - 0.5, at('p1') - 0.3, g => {
  tile(g, 'z_grupo', at('suscribete0') - 0.3, { x: 410, y: 80, w: 1100, h: 600 });
  CTAlive(g, 'sub', 'SUSCRÍBETE AL CANAL', at('suscribete0'), { y: 740 });
}, { punch: [at('suscribete0') + 0.2] });
