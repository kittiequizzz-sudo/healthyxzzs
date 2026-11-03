// PUNTO 1 — the limit of walking after 60: 8,000 steps and still an untrained capacity (strength); the opening
// question (20 min walking vs a few minutes at the wall); Antonio (68, Madrid, dramatización): walks daily
// but tired on stairs, swollen ankles; sarcopenia; venous return (valves + calf pump), persistent swelling →
// doctor; isometric/strength work complements walking.

// 0. kicker
scene(svg, at('p1') - 0.3, at('ocho_mil1'), g => {
  pan(g, 'a_paseo', 'full', { from: [0.5, 0.45], to: [0.5, 0.5] });
  kicker(g, 'PUNTO 1', 'EL LÍMITE DE CAMINAR\nDESPUÉS DE LOS 60', at('p1'));
});

// 1. 8,000 steps a day and still an untrained capacity — walking is great for ageing, and it's true
scene(svg, at('ocho_mil1'), at('diferencia1'), g => {
  Food(g, 'zapatillas', at('ocho_mil1') - 0.2, { cx: 520, cy: 400, r: 190, label: '8.000 PASOS AL DÍA', fill: C.green, color: C.white });
  chip(g, '¿Y AUN ASÍ ALGO SIN ENTRENAR?', at('sin_entrenar1'), { cx: 1350, cy: 300, size: 32, fill: C.white });
  wrapQ(g, at('contradictorio1'), 1350, 470, 1.2);
  mark(g, 'CAMINAR ES DE LO MEJOR', true, at('cierto1') - 1, { cx: 1350, cy: 680, size: 34 });
});

// 2. but being active ≠ giving muscles everything they need to keep their strength
scene(svg, at('diferencia1'), at('plantear1'), g => {
  tile(g, 'u_tipos', at('diferencia1'), { x: 140, y: 160, w: 840, h: 520 });
  chip(g, 'MANTENERSE ACTIVO', at('activo1'), { cx: 1430, cy: 330, size: 40, fill: C.green, color: C.white });
  Sign(g, '≠', at('activo1') + 1, { cx: 1430, cy: 460, size: 110, color: C.ink });
  chip(g, 'CONSERVAR LA FUERZA', at('fuerza1') - 0.5, { cx: 1430, cy: 590, size: 40, fill: C.amber });
});

// 3. the question for the end: 20 minutes walking or a few minutes at the wall?
scene(svg, at('plantear1'), at('antonio1'), g => {
  chip(g, 'LA PREGUNTA DEL VÍDEO', at('plantear1'), { cy: 90, size: 44, fill: C.ink, color: C.amber });
  Food(g, 'zapatillas', at('veinte1') - 0.3, { cx: 520, cy: 420, r: 180, label: '20 MIN CAMINANDO', fill: C.white });
  Text(g, '¿O?', { x: 960, y: 420, size: 90, color: C.ink });
  Food(g, 'pared', at('pocos1') - 0.3, { cx: 1400, cy: 420, r: 180, label: 'UNOS MINUTOS EN LA PARED', fill: C.white, phase: 0.4 });
  chip(g, 'DEPENDE DEL BENEFICIO QUE BUSCAS', at('depende1'), { cy: 820, size: 40, fill: C.amber });
  chip(g, 'RESPUESTA AL FINAL', at('depende1') + 2, { cy: 950, size: 32, fill: C.white });
});

// 4. Antonio, 68, Madrid: walks his neighbourhood every afternoon, greets his neighbours
scene(svg, at('antonio1'), at('preocupante1'), g => {
  pan(g, 'n_barrio', 'full', { from: [0.45, 0.45], to: [0.55, 0.5] });
  tag(g, 'DRAMATIZACIÓN', at('antonio1'), { x: 1580, y: 40 });
  cap(g, 'ANTONIO, 68 AÑOS · MADRID', at('madrid1'), { hi: 'ANTONIO' });
});

// 5. lately: legs tire on the stairs, swollen ankles at night — why, if he never stopped moving?
scene(svg, at('preocupante1'), at('sarcopenia1') - 1.5, g => {
  chip(g, 'ALGO PREOCUPANTE', at('preocupante1'), { cy: 90, size: 44, fill: C.ink, color: C.amber });
  tile(g, 'n_escalera', at('sube1') - 0.3, { x: 70, y: 190, w: 570, h: 380, label: 'SE CANSA EN LA ESCALERA' });
  tile(g, 'n_tobillos', at('tobillos1') - 0.3, { x: 675, y: 190, w: 570, h: 380, label: 'TOBILLOS HINCHADOS' });
  tile(g, 'n_piensa', at('pregunta1') - 0.3, { x: 1280, y: 190, w: 570, h: 380, label: '«¿POR QUÉ, SI CAMINO?»' });
});

// 6. sarcopenia: progressive loss of muscle mass and strength with age; muscles need specific stimuli
scene(svg, at('sarcopenia1') - 1.5, at('retorno1'), g => {
  pan(g, 'u_sarcopenia', 'left', { from: [0.4, 0.5], to: [0.6, 0.5] });
  stamp(g, 'SARCOPENIA', at('sarcopenia1'), { cx: 1510, cy: 220, size: 60, color: C.red, rot: -4 });
  chip(g, 'PÉRDIDA DE MASA Y FUERZA', at('perdida1'), { cx: 1510, cy: 380, size: 30, fill: C.white });
  chip(g, 'NECESITA ESTÍMULOS ESPECÍFICOS', at('estimulos1'), { cx: 1510, cy: 500, size: 26, fill: C.amber });
  mark(g, 'CAMINAR: RESISTENCIA', true, at('resistencia1'), { cx: 1510, cy: 650, size: 30 });
  mark(g, 'NO SIEMPRE BASTA PARA LA FUERZA', false, at('no_siempre1'), { cx: 1490, cy: 790, size: 24 });
});

// 7. venous return: vein valves + calf contractions; heaviness or swelling; persistent swelling → doctor
scene(svg, at('retorno1'), at('posibilidad1'), g => {
  tile(g, 'u_valvulas', at('valvulas1') - 0.3, { x: 140, y: 150, w: 760, h: 500, label: 'VÁLVULAS VENOSAS' });
  tile(g, 'u_bomba', at('pantorrillas1') - 0.3, { x: 1020, y: 150, w: 760, h: 500, label: 'BOMBA DE LA PANTORRILLA' });
  chip(g, 'SI FALLAN: PESADEZ O HINCHAZÓN', at('pesadez1'), { cy: 790, size: 38, fill: C.white });
  chip(g, 'HINCHAZÓN PERSISTENTE → AL MÉDICO', at('persistente1'), { cy: 920, size: 38, fill: C.red, color: C.white });
});

// 8. the opportunity: strength and isometric work (muscle working while you stay still) complement walking
scene(svg, at('posibilidad1'), at('esencial1'), g => {
  WallPoses(g, 'pared', at('posibilidad1'), { wallX: 380, floorY: 990, h: 880, idx: KEYS([[0, 0], [at('isometricas1'), 1], [at('inmovil1') - 0.3, 2]]) });
  chip(g, 'CONTRACCIÓN ISOMÉTRICA', at('isometricas1'), { cx: 1320, cy: 260, size: 40, fill: TEAL, color: C.white });
  chip(g, 'EL MÚSCULO TRABAJA SIN MOVERTE', at('inmovil1'), { cx: 1320, cy: 400, size: 30, fill: C.white });
  chip(g, '+ COMPLEMENTA AL PASEO', at('complementar1'), { cx: 1320, cy: 560, size: 34, fill: C.green, color: C.white });
  chip(g, 'PUEDE AYUDAR A LA TENSIÓN', at('control1'), { cx: 1320, cy: 700, size: 32, fill: C.amber });
});

// 9. what happens inside your vessels? the next big reveal
scene(svg, at('esencial1'), at('p2') - 0.3, g => {
  pan(g, 'p_muslo', 'full', { from: [0.4, 0.5], to: [0.6, 0.5] });
  cap(g, '¿QUÉ PASA DENTRO DE TUS VASOS?', at('esencial1') + 1, { hi: 'DENTRO', size: 50 });
});
