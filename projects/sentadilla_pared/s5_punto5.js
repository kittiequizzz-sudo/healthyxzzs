// PUNTO 5 — don't stop walking: walking's benefits (heart, lungs, mood, sleep, social life) can't be replaced
// by a wall sit; strength matters as much as endurance (low chair, stairs, shopping bags); plan: ~20 min
// walking at a talking pace + wall work later, 2–3 strength sessions a week; don't replace your medicines;
// no need for 10,000 steps; answer to the opening question: complementary, not either/or.

// 0. kicker
scene(svg, at('p5') - 0.3, at('abandonar5'), g => {
  pan(g, 'c_amigas', 'full', { from: [0.5, 0.45], to: [0.5, 0.5] });
  kicker(g, 'PUNTO 5', 'LA COMBINACIÓN INTELIGENTE', at('p5'));
});

// 1. dropping your walks for the wall would be a mistake — the key is combining, not choosing
scene(svg, at('abandonar5'), at('mejores5'), g => {
  Food(g, 'zapatillas', at('abandonar5') + 0.5, { cx: 520, cy: 400, r: 180, label: 'DEJAR DE CAMINAR', cross: at('error5'), fill: C.white });
  mark(g, 'UN ERROR', false, at('error5') + 0.3, { cx: 1330, cy: 320, size: 44 });
  chip(g, 'LA CLAVE: NO ELEGIR…', at('clave5'), { cx: 1330, cy: 480, size: 38, fill: C.white });
  chip(g, '…SINO COMBINAR', at('clave5') + 2, { cx: 1330, cy: 610, size: 44, fill: C.green, color: C.white });
});

// 2. walking: heart, lungs, mood, sleep, social life — a wall sit can't replace all that
scene(svg, at('mejores5'), at('olvidan5'), g => {
  pan(g, 'z_grupo', 'left', { from: [0.45, 0.5], to: [0.55, 0.45] });
  chip(g, 'CAMINAR SIGUE SIENDO DE LO MEJOR', at('mejores5') + 0.3, { cx: 1510, cy: 160, size: 24, fill: C.ink, color: C.amber });
  [['CORAZÓN', 'corazon5'], ['PULMONES', 'pulmones5'], ['ÁNIMO', 'animo5'], ['DESCANSO', 'descanso5'], ['VIDA SOCIAL', 'sociales5']].forEach(([s, k], i) =>
    mark(g, s, true, at(k) - 0.3, { cx: 1510, cy: 280 + i * 110, size: 30 }));
  chip(g, 'LA PARED NO LO SUSTITUYE', at('sustituir5') - 1, { cx: 1510, cy: 860, size: 28, fill: C.amber });
});

// 3. what many forget: strength matters as much as endurance (low chair, stairs, shopping bags)
scene(svg, at('olvidan5'), at('estrategia5'), g => {
  chip(g, 'LO QUE MUCHOS OLVIDAN', at('olvidan5'), { cy: 80, size: 44, fill: C.ink, color: C.amber });
  tile(g, 'c_silla', at('silla5') - 0.3, { x: 70, y: 190, w: 570, h: 380, label: 'LEVANTARSE DE UNA SILLA BAJA' });
  tile(g, 'n_escalera', at('silla5') + 1, { x: 675, y: 190, w: 570, h: 380, label: 'SUBIR ESCALERAS' });
  tile(g, 'c_bolsas', at('bolsas5') - 0.3, { x: 1280, y: 190, w: 570, h: 380, label: 'CARGAR LA COMPRA' });
  chip(g, 'RESISTENCIA ≠ FUERZA', at('diferentes5'), { cy: 760, size: 50, fill: C.white });
});

// 4. a reasonable plan: ~20 min walking at a talking pace + later a few minutes at the wall; 2–3 sessions/week
scene(svg, at('estrategia5'), at('competicion5'), g => {
  chip(g, 'UNA ESTRATEGIA RAZONABLE', at('estrategia5'), { cy: 80, size: 44, fill: C.green, color: C.white });
  tile(g, 'c_amigas', at('veinte5') - 0.3, { x: 140, y: 170, w: 760, h: 480, label: '≈ 20 MIN · PUEDES CONVERSAR' });
  tile(g, 'c_pared', at('tarde5'), { x: 1020, y: 170, w: 760, h: 480, label: 'MÁS TARDE: UNOS MINUTOS EN LA PARED' });
  chip(g, 'FUERZA: 2–3 SESIONES POR SEMANA', at('semanales5'), { cy: 790, size: 40, fill: C.white });
  chip(g, 'NO SUSTITUYAS TUS MEDICAMENTOS', at('medicamentos5') - 0.5, { cy: 920, size: 38, fill: C.red, color: C.white });
});

// 5. walking isn't a competition: no obligation to reach 10,000 steps; regular, progressive, safe
scene(svg, at('competicion5'), at('recuperemos5'), g => {
  pan(g, 'a_paseo', 'left', { from: [0.5, 0.45], to: [0.5, 0.5] });
  mark(g, 'NO ES UNA COMPETICIÓN', true, at('competicion5') + 0.5, { cx: 1510, cy: 260, size: 30 });
  mark(g, '«10.000 PASOS» OBLIGATORIOS', false, at('diez_mil5') - 0.5, { cx: 1490, cy: 420, size: 26 });
  chip(g, 'REGULAR · PROGRESIVA · SEGURA', at('regular5') + 1, { cx: 1510, cy: 580, size: 28, fill: C.green, color: C.white });
});

// 6. back to the question: the wall can lower resting BP notably — but a short session doesn't replace walking
scene(svg, at('recuperemos5'), at('respuesta5'), g => {
  chip(g, 'LA PREGUNTA DEL PRINCIPIO', at('recuperemos5'), { cy: 90, size: 44, fill: C.ink, color: C.amber });
  Food(g, 'pared', at('superar5') - 1, { cx: 520, cy: 400, r: 170, label: 'UNOS MINUTOS EN LA PARED', fill: C.white });
  Food(g, 'zapatillas', at('superar5') - 0.3, { cx: 1400, cy: 400, r: 170, label: '20 MIN CAMINANDO', fill: C.white, phase: 0.4 });
  chip(g, 'ISOMÉTRICO: ↓ PRESIÓN EN REPOSO', at('sugieren5'), { cx: 520, cy: 760, size: 30, fill: C.green, color: C.white });
  mark(g, 'NO SUSTITUYE AL PASEO', false, at('sustituya5'), { cx: 1400, cy: 760, size: 30 });
});

// 7. the answer: not one or the other — your heart needs movement, muscles strength, the body both
scene(svg, at('respuesta5'), at('despues_c') - 0.3, g => {
  pan(g, 'z_antonio', 'left', { from: [0.45, 0.5], to: [0.5, 0.45] });
  chip(g, 'LA RESPUESTA: LAS DOS', at('respuesta5') + 0.5, { cx: 1510, cy: 200, size: 36, fill: C.green, color: C.white });
  chip(g, 'CORAZÓN → MOVIMIENTO', at('movimiento5'), { cx: 1510, cy: 340, size: 32, fill: C.white });
  chip(g, 'MÚSCULOS → FUERZA', at('musculos5'), { cx: 1510, cy: 460, size: 32, fill: C.white });
  chip(g, 'CUERPO → EQUILIBRIO', at('equilibrio5'), { cx: 1510, cy: 580, size: 32, fill: C.white });
  chip(g, 'AUTONOMÍA POR MUCHOS AÑOS', at('autonomia5'), { cx: 1510, cy: 730, size: 30, fill: C.amber });
});
