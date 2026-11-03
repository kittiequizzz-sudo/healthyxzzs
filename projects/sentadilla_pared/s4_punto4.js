// PUNTO 4 — how to do it after 60: safety set-up (firm wall, non-slip floor, good shoes, no loose rugs; ask
// first if balance, knee or heart problems); level 1: back on the wall, feet hip-width and a bit forward,
// slide down only a few cm (no right angle), breathe out, never hold your breath, hold 5–10 s, stand, rest;
// progress slowly (studies use longer holds — not unsupervised to start); heel raises 8–10; stop signs.

// 0. kicker
scene(svg, at('p4') - 0.3, at('pared4'), g => {
  pan(g, 'r_respira', 'full', { from: [0.5, 0.45], to: [0.5, 0.5] });
  kicker(g, 'PUNTO 4', 'CÓMO HACERLO BIEN\nDESPUÉS DE LOS 60', at('p4'));
});

// 1. simple-looking — but doing it right matters more than the seconds you last
scene(svg, at('pared4'), at('firme4'), g => {
  Food(g, 'cronometro', at('pared4') + 0.3, { cx: 520, cy: 440, r: 200 });
  chip(g, 'HACERLO BIEN', at('diferencia4'), { cx: 1330, cy: 340, size: 48, fill: C.green, color: C.white });
  Sign(g, '>', at('diferencia4') + 1.5, { cx: 1330, cy: 480, size: 110, color: C.ink });
  chip(g, 'AGUANTAR MÁS SEGUNDOS', at('segundos4') - 0.5, { cx: 1330, cy: 620, size: 38, fill: C.white });
});

// 2. before you start: firm wall, non-slip floor, good shoes, no rugs that slide
scene(svg, at('firme4'), at('equilibrio4'), g => {
  chip(g, 'ANTES DE EMPEZAR', at('firme4') - 0.3, { cy: 80, size: 44, fill: C.ink, color: C.amber });
  [['pared', 'PARED FIRME', 'firme4'], ['zapatillas', 'BUEN CALZADO', 'calzado4'], ['alfombra', 'SIN ALFOMBRAS', 'alfombras4']].forEach(([n, s, k], i) =>
    Food(g, n, at(k) - 0.3, { cx: 420 + i * 540, cy: 380, r: 160, label: s, cross: n === 'alfombra' ? at(k) + 0.5 : null, check: n !== 'alfombra' ? at(k) + 0.4 : null, phase: i * 0.3 }));
  chip(g, 'SUELO ANTIDESLIZANTE', at('suelo4'), { cy: 720, size: 40, fill: C.white });
});

// 3. balance trouble, knee pain or heart problems → ask a professional first; it's about the right stimulus
scene(svg, at('equilibrio4'), at('nivel4'), g => {
  pan(g, 'r_consulta', 'left', { from: [0.5, 0.45], to: [0.5, 0.5] });
  chip(g, '¿EQUILIBRIO · RODILLAS · CORAZÓN?', at('equilibrio4') + 0.5, { cx: 1510, cy: 260, size: 26, fill: C.white });
  chip(g, '→ CONSULTA PRIMERO', at('equilibrio4') + 2.5, { cx: 1510, cy: 390, size: 34, fill: C.amber });
  mark(g, 'DEMOSTRAR FUERZA', false, at('demostrar4'), { cx: 1510, cy: 560, size: 32 });
  mark(g, 'UN ESTÍMULO ADECUADO', true, at('demostrar4') + 2, { cx: 1510, cy: 700, size: 30 });
});

// 4. level 1: back on the wall, feet hip-width, a little forward, slide down only a few centimetres
scene(svg, at('nivel4'), at('recto4') - 0.5, g => {
  WallPoses(g, 'pared', at('nivel4'), { wallX: 380, floorY: 990, h: 880,
    idx: KEYS([[0, 0], [at('adelanta4'), 1], [at('desliza4') + 0.5, 2]]) });
  chip(g, 'NIVEL 1 · PRINCIPIANTES', at('nivel4') + 0.3, { cx: 1330, cy: 170, size: 34, fill: C.ink, color: C.amber });
  chip(g, '1 · ESPALDA CONTRA LA PARED', at('espalda4'), { cx: 1330, cy: 300, size: 30, fill: C.white });
  chip(g, '2 · PIES A LA ANCHURA DE CADERAS', at('caderas4'), { cx: 1330, cy: 410, size: 26, fill: C.white });
  chip(g, '3 · PIES UN POCO ADELANTE', at('adelanta4'), { cx: 1330, cy: 520, size: 30, fill: C.white });
  chip(g, '4 · BAJA SOLO UNOS CENTÍMETROS', at('centimetros4'), { cx: 1330, cy: 630, size: 28, fill: C.green, color: C.white });
});

// 5. no need for a right angle — a small bend is enough to start (the deep pose crossed out)
scene(svg, at('recto4') - 0.5, at('respiracion4'), g => {
  const L = Live(g, { t0: at('recto4') - 0.5, cx: 520, cy: 560, enter: 'fade', idle: 'none' });
  const [iw, ih] = SZ.pared_3, s = 700 / ih;
  el('rect', { x: 230, y: 160, width: 60, height: 760, fill: '#E7DDCB', stroke: C.ink, 'stroke-width': 5 }, L.g);
  Cutout(L.g, src('pared_3'), { cx: 290 + iw * s / 2, cy: 920 - 350, iw, ih, fit: 700 });
  crossOut(g, at('recto4'), { cx: 470, cy: 560, r: 230 });
  const R = Live(g, { t0: at('pequena4') - 0.5, cx: 1240, cy: 560, enter: 'pop', idle: 'none' });
  el('rect', { x: 960, y: 160, width: 60, height: 760, fill: '#E7DDCB', stroke: C.ink, 'stroke-width': 5 }, R.g);
  const [jw, jh] = SZ.pared_2, s2 = 760 / jh;
  Cutout(R.g, src('pared_2'), { cx: 1020 + jw * s2 / 2, cy: 920 - 380, iw: jw, ih: jh, fit: 760 });
  chip(g, 'NO HACE FALTA ÁNGULO RECTO', at('recto4'), { cx: 470, cy: 990, size: 30, fill: C.red, color: C.white });
  chip(g, 'UNA FLEXIÓN PEQUEÑA BASTA', at('pequena4'), { cx: 1300, cy: 990, size: 30, fill: C.green, color: C.white });
});

// 6. breathing: breathe in gently, breathe out — never hold your breath; hold 5–10 s; stand up; rest
scene(svg, at('respiracion4'), at('domines4'), g => {
  WallPoses(g, 'pared', at('respiracion4'), { wallX: 380, floorY: 990, h: 880, enter: 'none',
    idx: KEYS([[0, 2], [at('vuelve4'), 1], [at('vuelve4') + 1.2, 0]]) });
  Breath(g, at('inspira4') - 0.3, { cx: 1180, cy: 330, r: 120, period: 6, inPart: 0.45 });
  mark(g, 'NUNCA AGUANTES LA RESPIRACIÓN', false, at('nunca4'), { cx: 1400, cy: 560, size: 28 });
  const S = Stopwatch(g, { cx: 1650, cy: 330, r: 110, total: 10 });
  const L = Live(g, { t0: at('manten4') - 0.3, cx: 1650, cy: 330, enter: 'pop', idle: 'none' });
  L.g.appendChild(S.g);
  anim(t => S.draw(t - at('manten4')));
  chip(g, 'MANTÉN 5–10 SEGUNDOS', at('manten4'), { cx: 1400, cy: 700, size: 34, fill: TEAL, color: C.white });
  chip(g, 'DESCANSA Y REPITE', at('descansa4'), { cx: 1400, cy: 830, size: 34, fill: C.white });
});

// 7. progress the time gradually; studies use longer holds — not necessarily right to start unsupervised
scene(svg, at('domines4'), at('complementar4'), g => {
  Food(g, 'calendario', at('domines4'), { cx: 500, cy: 420, r: 200, label: 'AUMENTA POCO A POCO' });
  chip(g, 'SI NO HAY MOLESTIAS', at('domines4') + 2, { cx: 1340, cy: 300, size: 34, fill: C.white });
  chip(g, 'LOS ESTUDIOS: CONTRACCIONES MÁS LARGAS', at('estudiados4'), { cx: 1340, cy: 460, size: 26, fill: C.amber });
  mark(g, 'PARA EMPEZAR SIN SUPERVISIÓN', false, at('supervision4') - 0.5, { cx: 1340, cy: 610, size: 28 });
});

// 8. add heel raises at the wall: hands on it, knees soft, 8–10 slow comfortable reps, no bouncing
scene(svg, at('complementar4'), at('regla4'), g => {
  const idx = CYCLE(at('manos4') + 0.8, [[0, 1.0], [1, 1.8], [2, 1.2]]);
  WallPoses(g, 'talones', at('complementar4'), { wallX: 420, floorY: 1000, h: 900, idx });
  chip(g, '+ ELEVACIONES DE TALONES', at('complementar4') + 0.3, { cx: 1330, cy: 200, size: 32, fill: C.ink, color: C.amber });
  RepCounter(g, at('reps4') - 0.3, { cx: 1330, cy: 470, period: 4, total: '8–10', max: 10 });
  mark(g, 'SIN REBOTES NI TIRONES', true, at('rebotes4') - 0.3, { cx: 1330, cy: 830, size: 28 });
});

// 9. the rule: controlled, never desperately exhausting; stop and get help if dizziness, chest pain, breathlessness, palpitations (≥ 6 s)
scene(svg, at('regla4'), at('cuatro4'), g => {
  mark(g, 'CONTROLADO, NUNCA AGOTADOR', true, at('controlado4'), { cy: 100, size: 38 });
  warn(g, 'DETENTE SI NOTAS', ['MAREO · DOLOR TORÁCICO', 'FALTA DE AIRE DESPROPORCIONADA', 'PALPITACIONES CON MALESTAR'], at('mareo4'), { y: 230, w: 1200, size: 42 });
}, { punch: [at('mareo4')] });

// 10. no need for 4 minutes straight away nor every day; individual progress and recovery; subscribe
scene(svg, at('cuatro4'), at('p5') - 0.3, g => {
  tile(g, 'c_pared', at('cuatro4'), { x: 410, y: 70, w: 1100, h: 560 });
  chip(g, 'NI 4 MINUTOS DE GOLPE, NI TODOS LOS DÍAS', at('cuatro4') + 0.5, { cy: 690, size: 34, fill: C.white });
  chip(g, 'PROGRESIÓN Y RECUPERACIÓN', at('progresion4'), { cy: 800, size: 36, fill: C.green, color: C.white });
  CTAlive(g, 'sub', 'SUSCRÍBETE', at('suscribete4'), { y: 870 });
}, { punch: [at('suscribete4') + 0.2] });
