// PUNTO 4 — supported marching on the spot: standing still vs balance in motion; one leg for a split second
// when turning; hips/ankles/abdomen; strength + coordination + dynamic balance; how to do it (comfortable
// knee height, ~60 s), brain uses eyes/joints/inner ear; venous return, light cardio (no instant BP drop);
// supervision if needed, stop signs, consistency over perfection, share, 3 mistakes next.

// 0. kicker
scene(svg, at('p4') - 0.3, at('diferencia4'), g => {
  pan(g, 'h_escalon', 'full', { from: [0.5, 0.45], to: [0.55, 0.5] });
  kicker(g, 'EJERCICIO 4', 'MARCHA ESTÁTICA CON APOYO', at('p4'));
});

// 1. standing still vs moving: lifting a foot, changing direction → keeping stable in motion
scene(svg, at('diferencia4'), at('situacion4'), g => {
  mark(g, 'QUIETO: SEGURO', true, at('quieto4') - 0.5, { cx: 560, cy: 110, size: 40 });
  mark(g, 'EN MOVIMIENTO: NO TANTO', false, at('levantar4') - 0.5, { cx: 1360, cy: 110, size: 40 });
  tile(g, 'h_gato', at('levantar4'), { x: 140, y: 230, w: 760, h: 480, label: 'LEVANTAR UN PIE' });
  tile(g, 'h_gira', at('direccion4'), { x: 1020, y: 230, w: 760, h: 480, label: 'CAMBIAR DE DIRECCIÓN' });
  chip(g, 'ESTABILIDAD EN MOVIMIENTO', at('desafio4'), { cy: 930, size: 48, fill: C.amber });
});

// 2. walking down the hallway and turning: for a split second, all your weight on one leg
scene(svg, at('situacion4'), at('cadera4') - 1.5, g => {
  pan(g, 'h_gira', 'full', { from: [0.55, 0.4], to: [0.5, 0.55] });
  cap(g, 'TODO TU PESO SOBRE UNA PIERNA', at('fraccion4') + 1, { hi: 'UNA PIERNA', size: 50 });
});

// 3. hips, ankles and abdomen must cooperate → otherwise you lose control; train stability while switching support
scene(svg, at('cadera4') - 1.5, at('marcha4'), g => {
  Poses(g, 'marcha', at('cadera4') - 1.3, { cx: 520, cy: 560, h: 800, idx: () => 1 });
  [['CADERA', 'cadera4', 260], ['TOBILLOS', 'tobillos4', 400], ['ABDOMEN', 'tobillos4', 540]].forEach(([s, k, y], i) =>
    chip(g, s, at(k) + i * 0.4, { cx: 1300, cy: y, size: 44, fill: C.white }));
  mark(g, 'SENSACIÓN DE PERDER EL CONTROL', false, at('control4'), { cx: 1300, cy: 710, size: 30 });
  chip(g, 'ESTABLE AL CAMBIAR DE APOYO', at('apoyo4'), { cx: 1300, cy: 870, size: 34, fill: C.green, color: C.white });
});

// 4. marching on the spot: strength, coordination, dynamic balance
scene(svg, at('marcha4'), at('coloca4'), g => {
  Poses(g, 'marcha', at('marcha4'), { cx: 520, cy: 560, h: 800, idx: CYCLE(at('marcha4') + 0.8, [[1, 1.2], [2, 0.7], [3, 1.2], [2, 0.7]]) });
  chip(g, 'CAMINAR SIN DESPLAZARTE', at('sitio4'), { cx: 1300, cy: 220, size: 40, fill: C.ink, color: C.amber });
  chip(g, 'FUERZA', at('fuerza4'), { cx: 1300, cy: 420, size: 48, fill: C.white });
  chip(g, 'COORDINACIÓN', at('coordinacion4'), { cx: 1300, cy: 570, size: 48, fill: C.white });
  chip(g, 'EQUILIBRIO DINÁMICO', at('dinamico4'), { cx: 1300, cy: 720, size: 44, fill: TEAL, color: C.white });
});

// 5. set-up: sturdy chair against a wall, hands on the backrest, feet slightly apart, eyes ahead (not down)
scene(svg, at('coloca4'), at('levanta4'), g => {
  Poses(g, 'marcha', at('coloca4'), { cx: 560, cy: 560, h: 800 });
  mark(g, 'SILLA RESISTENTE, CONTRA LA PARED', true, at('coloca4') + 0.4, { cx: 1330, cy: 240, size: 26 });
  mark(g, 'AMBAS MANOS EN EL RESPALDO', true, at('manos4'), { cx: 1330, cy: 390, size: 28 });
  mark(g, 'MIRADA AL FRENTE', true, at('mirada4'), { cx: 1330, cy: 540, size: 34 });
  mark(g, 'MIRAR AL SUELO TODO EL RATO', false, at('suelo4'), { cx: 1330, cy: 690, size: 28 });
});

// 6. lift one knee slowly (comfortable height), lower with control, then the other leg; keep alternating
scene(svg, at('levanta4'), at('sesenta4'), g => {
  const al = at('alternando4');
  Poses(g, 'marcha', at('levanta4'), { cx: 560, cy: 560, h: 800, enter: 'none', fade: 0.5,
    idx: t => t < al ? KEYS([[0, 0], [at('levanta4') + 0.6, 1], [at('baja4') + 0.2, 2], [at('otra4') + 0.4, 3]])(t) : CYCLE(al, [[2, 0.7], [1, 1.4], [2, 0.7], [3, 1.4]])(t) });
  chip(g, 'SUBE UNA RODILLA DESPACIO', at('levanta4') + 0.3, { cx: 1350, cy: 220, size: 34, fill: C.white });
  chip(g, 'A UNA ALTURA CÓMODA', at('comoda4'), { cx: 1350, cy: 340, size: 36, fill: C.amber });
  chip(g, 'TRONCO ESTABLE · BAJA CONTROLADO', at('baja4') - 0.8, { cx: 1350, cy: 480, size: 28, fill: C.white });
  chip(g, 'AHORA LA OTRA PIERNA', at('otra4'), { cx: 1350, cy: 620, size: 36, fill: C.white });
  chip(g, 'ALTERNA, MUY DESPACIO', at('alternando4'), { cx: 1350, cy: 760, size: 38, fill: TEAL, color: C.white });
});

// 7. ~60 s; rest if needed; safe, stable, conscious (not higher, not more reps); breathe naturally
scene(svg, at('sesenta4'), at('practicas4'), g => {
  Poses(g, 'marcha', at('sesenta4'), { cx: 500, cy: 560, h: 800, enter: 'none', idx: CYCLE(at('sesenta4'), [[2, 0.7], [1, 1.4], [2, 0.7], [3, 1.4]]) });
  const S = Stopwatch(g, { cx: 1300, cy: 280, r: 130, total: 60 });
  const L = Live(g, { t0: at('sesenta4') + 0.3, cx: 1300, cy: 280, enter: 'pop', idle: 'none' });
  L.g.appendChild(S.g);
  anim(t => S.draw(60 * prog(t, at('sesenta4') + 0.5, at('practicas4') - 0.5)));
  chip(g, '≈ 60 SEGUNDOS', at('sesenta4') + 1, { cx: 1300, cy: 480, size: 40, fill: TEAL, color: C.white });
  chip(g, 'DESCANSA SI LO NECESITAS', at('descansar4'), { cx: 1300, cy: 600, size: 32, fill: C.white });
  mark(g, 'SEGURO · ESTABLE · CONSCIENTE', true, at('seguro4'), { cx: 1300, cy: 740, size: 28 });
  chip(g, 'RESPIRA CON NATURALIDAD', at('respira4'), { cx: 1300, cy: 880, size: 34, fill: C.green, color: C.white });
});

// 8. while practising, the brain uses eyes, joints and inner ear → walking, small steps, turns
scene(svg, at('practicas4'), at('ademas4'), g => {
  obj(g, 'cerebro', at('practicas4'), { cx: 960, cy: 400, fit: 380 });
  [['ojo', 'OJOS', 300, 'ojos4'], ['planta', 'ARTICULACIONES', 960, 'articulaciones4'], ['oido', 'OÍDO INTERNO', 1620, 'oido4']].forEach(([n, s, x, k]) => {
    obj(g, n, at(k) - 0.3, { cx: x, cy: x === 960 ? 760 : 680, fit: n === 'planta' ? 200 : 250 });
    chip(g, s, at(k), { cx: x, cy: x === 960 ? 920 : 860, size: 32, fill: C.white });
  });
  flow(g, 'M420 600 C560 500 680 450 790 420', at('ojos4'), { n: 5, period: 2, color: C.amber, shape: 'dot', r: 10, line: C.amber });
  flow(g, 'M960 650 L960 560', at('articulaciones4'), { n: 3, period: 1.4, color: C.amber, shape: 'dot', r: 10, line: C.amber });
  flow(g, 'M1500 600 C1360 500 1240 450 1130 420', at('oido4'), { n: 5, period: 2, color: C.amber, shape: 'dot', r: 10, line: C.amber });
  chip(g, 'CAMINAR · ESCALONES · GIROS', at('caminar4'), { cx: 960, cy: 110, size: 40, fill: TEAL, color: C.white });
});

// 9. leg muscles help venous return, slightly more cardiovascular work; part of a healthy routine, no instant BP drop
scene(svg, at('ademas4'), at('dificultades4'), g => {
  obj(g, 'pantorrilla', at('ademas4'), { cx: 360, cy: 560, fit: 640, amp: 0.4 });
  flow(g, 'M600 900 C600 700 600 450 600 180', at('venoso4') - 0.3, { n: 7, period: 2.6, line: VEIN });
  chip(g, 'RETORNO VENOSO', at('venoso4'), { cx: 1300, cy: 220, size: 44, fill: VEIN, color: C.white });
  heart(g, at('cardio4') - 0.3, 1000, 470, 220);
  chip(g, '↑ LIGERO TRABAJO CARDIOVASCULAR', at('cardio4'), { cx: 1330, cy: 640, size: 26, fill: C.white });
  mark(g, 'MOVILIDAD Y CORAZÓN', true, at('rutina4'), { cx: 1330, cy: 770, size: 32 });
  mark(g, 'NO BAJA LA TENSIÓN AL INSTANTE', false, at('garantiza4'), { cx: 1300, cy: 900, size: 28 });
});

// 10. big difficulties standing → supervision / professional adaptation; stop signs (≥ 6 s)
scene(svg, at('dificultades4'), at('conoces4'), g => {
  chip(g, '¿TE CUESTA MUCHO ESTAR DE PIE?', at('dificultades4') + 0.3, { cy: 100, size: 38, fill: C.white });
  chip(g, 'SOLO CON SUPERVISIÓN', at('supervision4'), { cy: 220, size: 44, fill: C.amber });
  warn(g, 'DETENTE SI APARECEN', ['MAREOS', 'DOLOR EN EL PECHO', 'DIFICULTAD PARA RESPIRAR'], at('detente4'), { y: 340, w: 1100, size: 44 });
}, { punch: [at('detente4')] });

// 11. you don't need perfection: a safe version you can repeat consistently
scene(svg, at('conoces4'), at('comparte4'), g => {
  [['talones_1', 'TALONES'], ['sentadilla_2', 'SENTADILLA'], ['peso_1', 'PESO'], ['marcha_1', 'MARCHA']].forEach(([p, s], i) =>
    ExBadge(g, i + 1, p, at('conoces4') + 0.3 + i * 0.3, { cx: 300 + i * 440, cy: 330, r: 140, label: s }));
  mark(g, 'PERFECTOS DESDE EL PRIMER DÍA', false, at('perfectamente4'), { cy: 680, size: 34 });
  mark(g, 'UNA VERSIÓN SEGURA, CON CONSTANCIA', true, at('constancia4'), { cy: 840, size: 34 });
});

// 12. share it with someone who's starting to feel unsteady
scene(svg, at('comparte4'), at('antes4'), g => {
  tile(g, 'a_camina', at('comparte4'), { x: 410, y: 80, w: 1100, h: 600 });
  chip(g, 'COMPÁRTELO CON QUIEN LO NECESITE', at('comparte4') + 0.5, { cy: 790, size: 44, fill: C.amber });
  chip(g, 'MÁS CONFIANZA AL CAMINAR', at('confianza4'), { cy: 930, size: 38, fill: C.white });
}, { punch: [at('comparte4') + 0.5] });

// 13. before finishing: 3 very common mistakes
scene(svg, at('antes4'), at('p5') - 0.3, g => {
  chip(g, 'ANTES DE TERMINAR…', at('antes4') + 0.2, { cy: 200, size: 48, fill: C.white });
  [0, 1, 2].forEach(i => {
    const L = Live(g, { t0: at('antes4') + 1.5 + i * 0.4, cx: 560 + i * 400, cy: 520, enter: 'pop', idle: 'bob', phase: i * 0.3 });
    el('circle', { cx: 560 + i * 400, cy: 520, r: 130, fill: C.red, stroke: C.ink, 'stroke-width': 8 }, L.g);
    Text(L.g, String(i + 1), { x: 560 + i * 400, y: 520, size: 130, color: C.white });
    sfx(at('antes4') + 1.5 + i * 0.4, 'pop');
  });
  chip(g, '3 ERRORES HABITUALES', at('antes4') + 3, { cy: 820, size: 52, fill: C.ink, color: C.amber });
});
