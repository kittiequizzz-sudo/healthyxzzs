// PUNTO 2 — jaw, neck or back pain: Mercedes (72, dramatización): pressure near the jaw on brisk walks, eases
// with rest; referred pain (shared nerve pathways); confused with neck arthritis/contracture; exertional +
// relieved by rest → possible reduced blood flow → prompt check; persistent at rest + sweat/nausea/breath/
// chest pressure → 112; women also get typical chest pain; subscribe.

// 0. kicker
scene(svg, at('p2') - 0.3, at('desconcertante2'), g => {
  pan(g, 'e_calle', 'full', { from: [0.5, 0.45], to: [0.5, 0.5] });
  kicker(g, 'SÍNTOMA 2', 'DOLOR EN MANDÍBULA,\nCUELLO O ESPALDA', at('p2'));
});

// 1. we picture intense chest pain — but the first discomfort can be in the jaw, neck or upper back
scene(svg, at('desconcertante2'), at('mercedes2'), g => {
  pan(g, 'r_nervios', 'left', { from: [0.5, 0.5], to: [0.5, 0.42] });
  chip(g, 'AÚN MÁS DESCONCERTANTE', at('desconcertante2') + 0.3, { cx: 1510, cy: 200, size: 28, fill: C.white });
  mark(g, 'NO SOLO EN EL PECHO', false, at('lugares2'), { cx: 1510, cy: 350, size: 32 });
  ['MANDÍBULA', 'CUELLO', 'ESPALDA ALTA'].forEach((s, i) => chip(g, s, at('mandibula2') + i * 0.6, { cx: 1510, cy: 500 + i * 120, size: 38, fill: C.red, color: C.white }));
});

// 2. Mercedes, 72: a strange pressure near the jaw for days — "a tooth", "a bad pillow"
scene(svg, at('mercedes2'), at('detalle2'), g => {
  story(g, 'MERCEDES, 72 AÑOS', at('mercedes2'));
  tile(g, 'e_espejo', at('presion2') - 0.3, { x: 140, y: 170, w: 760, h: 500, label: '«SERÁ UNA MUELA»' });
  tile(g, 'e_cuello', at('postura2') - 0.3, { x: 1020, y: 170, w: 760, h: 500, label: '«HE DORMIDO MAL»' });
});

// 3. the key detail: it appears when she walks fast and eases when she stops
scene(svg, at('detalle2'), at('porque2'), g => {
  chip(g, 'UN DETALLE CLAVE', at('detalle2'), { cy: 90, size: 46, fill: C.amber });
  tile(g, 'e_calle', at('camina2') - 0.3, { x: 140, y: 190, w: 760, h: 500, label: 'APARECE AL CAMINAR DEPRISA' });
  tile(g, 'e_banco', at('disminuye2') - 0.3, { x: 1020, y: 190, w: 760, h: 500, label: 'MEJORA AL DETENERSE' });
  tag(g, 'DRAMATIZACIÓN', at('detalle2'), { x: 1580, y: 960 });
});

// 4. why: the heart shares nerve pathways; the brain reads the signal as jaw/neck/shoulder/back pain
scene(svg, at('porque2'), at('confusion2'), g => {
  pan(g, 'r_centralita', 'left', { from: [0.45, 0.5], to: [0.55, 0.45] });
  chip(g, '¿POR QUÉ?', at('porque2'), { cx: 1510, cy: 180, size: 44, fill: C.ink, color: C.amber });
  chip(g, 'VÍAS NERVIOSAS COMPARTIDAS', at('vias2'), { cx: 1510, cy: 330, size: 28, fill: C.white });
  chip(g, 'EL CEREBRO SE «CONFUNDE»', at('interpretar2'), { cx: 1510, cy: 460, size: 30, fill: C.white });
  stamp(g, 'DOLOR REFERIDO', at('referido2'), { cx: 1510, cy: 640, size: 52, color: C.red, rot: -4 });
});

// 5. dangerous confusion: neck aches, arthritis, muscles are common → blamed on a contracture or age
scene(svg, at('confusion2'), at('diferencia2'), g => {
  pan(g, 'r_cervical', 'left', { from: [0.5, 0.45], to: [0.45, 0.5] });
  chip(g, 'UNA CONFUSIÓN PELIGROSA', at('confusion2'), { cx: 1510, cy: 200, size: 30, fill: C.red, color: C.white });
  chip(g, 'CERVICALES · ARTROSIS · MÚSCULOS', at('cervicales2'), { cx: 1510, cy: 340, size: 24, fill: C.white });
  chip(g, '«SERÁ UNA CONTRACTURA»', at('contractura2'), { cx: 1510, cy: 470, size: 30, fill: C.amber });
});

// 6. the difference: with effort (walking, stairs), better with rest → reduced blood flow? → prompt check
scene(svg, at('diferencia2'), at('persistente2'), g => {
  pan(g, 'r_escalera', 'left', { from: [0.4, 0.5], to: [0.6, 0.5] });
  chip(g, 'FÍJATE EN ESTO', at('diferencia2') + 0.5, { cx: 1510, cy: 180, size: 40, fill: C.ink, color: C.amber });
  chip(g, 'APARECE CON EL ESFUERZO', at('esfuerzo2'), { cx: 1510, cy: 320, size: 30, fill: C.red, color: C.white });
  chip(g, 'MEJORA CON EL REPOSO', at('reposo2'), { cx: 1510, cy: 440, size: 32, fill: C.white });
  chip(g, '¿FALTA DE RIEGO AL CORAZÓN?', at('riego2'), { cx: 1510, cy: 570, size: 28, fill: C.white });
  mark(g, 'VALORACIÓN MÉDICA RÁPIDA', true, at('rapida2'), { cx: 1510, cy: 720, size: 28 });
});

// 7. a heart attack can cause persistent pain there even at rest; sudden + sweat/nausea/breath/chest → 112 (≥ 6 s)
scene(svg, at('persistente2'), at('fundamental2'), g => {
  chip(g, 'DOLOR PERSISTENTE, INCLUSO EN REPOSO', at('persistente2'), { cy: 90, size: 36, fill: C.white });
  call112(g, at('repentina2'), ['MOLESTIA REPENTINA +', 'SUDOR FRÍO · NÁUSEAS', 'FALTA DE AIRE · PRESIÓN EN EL PECHO'], { y: 210 });
}, { punch: [at('llama2')] });

// 8. women also get the typical chest pain; its absence doesn't rule out a heart problem
scene(svg, at('fundamental2'), at('suscribete2') - 1, g => {
  obj(g, 'corazon', at('fundamental2'), { cx: 520, cy: 500, fit: 560 });
  mark(g, 'TAMBIÉN DOLOR TÍPICO EN EL PECHO', true, at('tipico2'), { cx: 1300, cy: 360, size: 28 });
  mark(g, 'SIN DOLOR ≠ SIN PROBLEMA', false, at('ausencia2'), { cx: 1300, cy: 540, size: 34 });
});

// 9. subscribe + bell; recognising a sign in time can change a life
scene(svg, at('suscribete2') - 1, at('p3') - 0.3, g => {
  tile(g, 'z_amigas', at('suscribete2') - 0.8, { x: 410, y: 80, w: 1100, h: 600 });
  CTAlive(g, 'sub', 'SUSCRÍBETE Y ACTIVA LA CAMPANITA', at('suscribete2') - 0.3, { y: 730 });
  chip(g, 'A TIEMPO PUEDE CAMBIAR UNA VIDA', at('vida2') - 1.5, { cy: 950, size: 36, fill: C.amber });
}, { punch: [at('suscribete2')] });
