// PUNTO 2 — what really builds up in arteries: too many LDL particles over years cross the lining, get
// retained, inflame → plaque; HDL carries cholesterol back to the liver but high HDL doesn't guarantee
// protection; eggs may raise LDL and HDL and make LDL larger — particle number still matters; BP adds
// risk; eggs don't cause hypertension; swapping eggs for pastries/cold cuts/salt backfires.

// 0. kicker
scene(svg, at('p2') - 0.3, at('obstruyen2'), g => {
  pan(g, 'r_ldl', 'full', { from: [0.5, 0.5], to: [0.55, 0.45] });
  kicker(g, 'PUNTO 2', 'LA VERDAD SOBRE TUS ARTERIAS', at('p2'));
});

// 1. arteries don't clog because of "too many eggs": particles high for years → build-up in the wall
scene(svg, at('obstruyen2'), at('distinguir2'), g => {
  obj(g, 'arteria', at('obstruyen2'), { cx: 520, cy: 520, fit: 560 });
  mark(g, 'NO POR «DEMASIADOS HUEVOS»', false, at('obstruyen2') + 0.6, { cx: 1340, cy: 260, size: 32 });
  chip(g, 'PARTÍCULAS ELEVADAS', at('particulas2'), { cx: 1340, cy: 440, size: 40, fill: C.white });
  chip(g, 'DURANTE AÑOS', at('particulas2') + 1.5, { cx: 1340, cy: 560, size: 40, fill: C.white });
  chip(g, 'SE ACUMULAN EN LA PARED', at('acumulacion2'), { cx: 1340, cy: 720, size: 36, fill: C.red, color: C.white });
});

// 2. two protagonists from your blood test: LDL and HDL
scene(svg, at('distinguir2'), at('malo2'), g => {
  chip(g, 'DOS PROTAGONISTAS DE TUS ANÁLISIS', at('distinguir2') + 0.2, { cy: 120, size: 42, fill: C.ink, color: C.amber });
  [['LDL', 'ldl2', 560, '#D99A1E'], ['HDL', 'hdl2', 1360, '#2F5F9E']].forEach(([s, k, x, col]) => {
    const L = Live(g, { t0: at(k) - 0.2, cx: x, cy: 520, enter: 'pop', idle: 'bob', phase: x / 1000 });
    el('circle', { cx: x, cy: 520, r: 210, fill: col, stroke: C.ink, 'stroke-width': 9 }, L.g);
    Text(L.g, s, { x, y: 520, size: 140, color: C.white });
    sfx(at(k) - 0.2, 'pop');
  });
});

// 3. LDL: "bad cholesterol", really a carrier to tissues; the problem is too many particles
scene(svg, at('malo2'), at('atravesar2'), g => {
  pan(g, 'r_ldl', 'left', { from: [0.3, 0.45], to: [0.6, 0.5] });
  chip(g, 'LDL: «COLESTEROL MALO»', at('malo2') + 0.3, { cx: 1510, cy: 220, size: 30, fill: '#D99A1E', color: C.white });
  chip(g, 'TRANSPORTA COLESTEROL', at('transportar2'), { cx: 1510, cy: 360, size: 30, fill: C.white });
  chip(g, 'A LOS TEJIDOS', at('transportar2') + 1, { cx: 1510, cy: 460, size: 30, fill: C.white });
  chip(g, 'PROBLEMA: DEMASIADAS', at('demasiadas2'), { cx: 1510, cy: 620, size: 32, fill: C.red, color: C.white });
});

// 4. some cross the inner layer, get retained, trigger inflammation → silent atherosclerotic plaque
scene(svg, at('atravesar2'), at('hdl_2'), g => {
  tile(g, 'r_ldl', at('atravesar2'), { x: 80, y: 120, w: 820, h: 520 });
  chip(g, 'ATRAVIESAN LA PARED', at('atravesar2') + 0.5, { cx: 490, cy: 740, size: 34, fill: C.white });
  chip(g, 'QUEDAN RETENIDAS', at('retenidas2'), { cx: 490, cy: 850, size: 34, fill: C.white });
  chip(g, 'INFLAMACIÓN', at('inflamatoria2'), { cx: 490, cy: 960, size: 34, fill: C.red, color: C.white });
  tile(g, 'r_placa', at('silencioso2') - 0.3, { x: 1020, y: 120, w: 820, h: 520 });
  chip(g, 'UN PROCESO SILENCIOSO', at('silencioso2'), { cx: 1430, cy: 740, size: 34, fill: C.ink, color: C.amber });
  chip(g, 'PLACA DE ATEROSCLEROSIS', at('placas2'), { cx: 1430, cy: 850, size: 32, fill: C.red, color: C.white });
});

// 5. HDL carries cholesterol back to the liver ("good"), but high HDL doesn't guarantee protection
scene(svg, at('hdl_2'), at('encajan2'), g => {
  pan(g, 'r_hdl', 'left', { from: [0.4, 0.5], to: [0.55, 0.45] });
  chip(g, 'HDL', at('hdl_2') + 0.2, { cx: 1510, cy: 190, size: 52, fill: '#2F5F9E', color: C.white });
  chip(g, 'TEJIDOS → HÍGADO', at('tejidos2'), { cx: 1510, cy: 330, size: 36, fill: C.white });
  chip(g, '«COLESTEROL BUENO»', at('bueno2'), { cx: 1510, cy: 450, size: 34, fill: C.white });
  mark(g, 'HDL ALTO ≠ PROTEGIDO', false, at('garantiza2'), { cx: 1510, cy: 620, size: 32 });
  chip(g, 'SOBRE TODO SI EL LDL SIGUE ALTO', at('ldl_alto2'), { cx: 1510, cy: 770, size: 24, fill: C.amber });
});

// 6. eggs: may raise LDL and HDL in some people, larger LDL — but larger ≠ no risk; particle count matters
scene(svg, at('encajan2'), at('tension2'), g => {
  Food(g, 'huevo', at('encajan2'), { cx: 300, cy: 300, r: 150 });
  chip(g, '¿Y LOS HUEVOS?', at('encajan2') + 0.3, { cx: 300, cy: 520, size: 40, fill: C.ink, color: C.amber });
  chip(g, 'EN ALGUNAS PERSONAS: ↑ LDL Y ↑ HDL', at('estudios2'), { cx: 1180, cy: 160, size: 30, fill: C.white });
  tile(g, 'g_lupa', at('tamano2') - 0.3, { x: 820, y: 260, w: 720, h: 470 });
  chip(g, 'PARTÍCULAS MÁS GRANDES', at('tamano2'), { cx: 1180, cy: 800, size: 30, fill: C.white, t1: at('grandes2') + 0.5 });
  mark(g, 'MÁS GRANDES ≠ SIN RIESGO', false, at('grandes2') + 0.5, { cx: 1180, cy: 800, size: 30 });
  chip(g, 'LO CLAVE: CUÁNTAS PARTÍCULAS', at('cantidad2'), { cx: 1180, cy: 930, size: 30, fill: C.amber });
});

// 7. add blood pressure: high pressure strains vessel walls; with high LDL both add cardiovascular risk
scene(svg, at('tension2'), at('hipertension2'), g => {
  pan(g, 'r_presion', 'left', { from: [0.45, 0.5], to: [0.55, 0.5] });
  chip(g, 'OTRO FACTOR: LA TENSIÓN', at('tension2') + 0.5, { cx: 1510, cy: 200, size: 30, fill: C.ink, color: C.amber });
  chip(g, 'PAREDES BAJO PRESIÓN', at('paredes2'), { cx: 1510, cy: 340, size: 32, fill: C.white });
  chip(g, 'LDL ALTO', at('ambos2'), { cx: 1400, cy: 500, size: 36, fill: '#D99A1E', color: C.white });
  chip(g, '+ TENSIÓN ALTA', at('ambos2') + 0.8, { cx: 1620, cy: 600, size: 36, fill: C.red, color: C.white });
  chip(g, '↑ RIESGO CARDIOVASCULAR', at('desarrollo2'), { cx: 1510, cy: 760, size: 30, fill: C.amber });
});

// 8. eggs don't cause hypertension (no solid evidence for moderate intake); watch habits, tests, BP
scene(svg, at('hipertension2'), at('alguien2'), g => {
  mark(g, 'EL HUEVO NO PROVOCA HIPERTENSIÓN', true, at('hipertension2') + 1, { cy: 110, size: 38 });
  chip(g, 'SIN EVIDENCIA SÓLIDA CON CONSUMO MODERADO', at('evidencia2'), { cy: 250, size: 30, fill: C.white });
  chip(g, 'LO IMPORTANTE:', at('habitualmente2') - 0.8, { cy: 400, size: 44, fill: C.ink, color: C.amber });
  Food(g, 'tostada', at('habitualmente2'), { cx: 420, cy: 640, r: 130, label: 'LO QUE COMES A DIARIO' });
  Food(g, 'tubo', at('analisis2'), { cx: 960, cy: 640, r: 130, label: 'TUS ANÁLISIS' });
  Monitor(g, at('controlada2'), { cx: 1500, cy: 640, s: 0.55, sys: 125, dia: 80, tone: 'ok', count: 1.2 });
  chip(g, 'TU TENSIÓN CONTROLADA', at('controlada2') + 0.5, { cx: 1500, cy: 870, size: 28, fill: C.amber });
});

// 9. someone drops eggs but starts on pastries, cold cuts, salty foods — thinks they're protecting their heart
scene(svg, at('alguien2'), at('cuestion2'), g => {
  Food(g, 'frito', at('alguien2') + 0.3, { cx: 300, cy: 330, r: 150, cross: at('alguien2') + 1.3 });
  Sign(g, '→', at('bolleria2') - 0.5, { cx: 580, cy: 330, size: 150, color: C.ink });
  Food(g, 'cruasan', at('bolleria2'), { cx: 860, cy: 330, r: 130, label: 'BOLLERÍA', fill: C.red, color: C.white });
  Food(g, 'salchichas', at('bolleria2') + 0.6, { cx: 1220, cy: 330, r: 130, label: 'EMBUTIDOS', fill: C.red, color: C.white, phase: 0.3 });
  Food(g, 'salero', at('bolleria2') + 1.2, { cx: 1580, cy: 330, r: 130, label: 'SAL', fill: C.red, color: C.white, phase: 0.6 });
  chip(g, 'CREE QUE PROTEGE SU CORAZÓN…', at('creer2'), { cy: 720, size: 40, fill: C.white });
  mark(g, '…Y DESCUIDA LO IMPORTANTE', false, at('descuidando2'), { cy: 870, size: 40 });
});

// 10. same eggs, different cholesterol response → who needs special care (next)
scene(svg, at('cuestion2'), at('p3') - 0.3, g => {
  pan(g, 'd_desayuno', 'full', { from: [0.5, 0.45], to: [0.5, 0.5] });
  cap(g, 'MISMOS HUEVOS, RESPUESTA DISTINTA', at('diferente2') - 1, { hi: 'RESPUESTA DISTINTA', size: 50 });
});
