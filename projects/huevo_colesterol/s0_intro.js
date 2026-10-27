// INTRO (0 → Punto 1). Hook: the food you avoid for cholesterol may not be the problem — and its
// replacements may be worse → the egg → dietary ≠ blood cholesterol, the liver → what's coming → comment.

// 0. the food you've avoided for years may not be your arteries' real problem
scene(svg, -1, at('sorprendente0'), g => {
  pan(g, 'a_rechaza', 'full', { from: [0.5, 0.4], to: [0.5, 0.5] });
  cap(g, '¿LLEVAS AÑOS EVITÁNDOLO?', 0.4, { hi: 'AÑOS', t1: at('problema0') });
  cap(g, '¿Y SI NO ES EL PROBLEMA?', at('problema0'), { hi: 'NO ES', hiColor: '#7DE08E' });
}, { whoosh: false });

// 1. and you may be replacing it with foods that are far worse for your heart
scene(svg, at('sorprendente0'), at('hablo0'), g => {
  pan(g, 'a_bolleria', 'left', { from: [0.5, 0.45], to: [0.5, 0.5] });
  chip(g, 'LO QUE COMES EN SU LUGAR…', at('sustituyendo0'), { cx: 1510, cy: 330, size: 32, fill: C.white });
  mark(g, 'PUEDE SER PEOR', false, at('perjudican0'), { cx: 1510, cy: 500, size: 40 });
});

// 2. the egg: decades of warnings, contradictions and changing advice
scene(svg, at('hablo0'), at('quiza0'), g => {
  obj(g, 'huevo', at('hablo0'), { cx: 560, cy: 520, fit: 460 });
  stamp(g, 'EL HUEVO', at('hablo0') + 0.5, { cx: 560, cy: 880, size: 70, color: C.ink, rot: -4 });
  chip(g, 'ADVERTENCIAS', at('advertencias0') + 0.4, { cx: 1350, cy: 300, size: 44, fill: C.white });
  chip(g, 'CONTRADICCIONES', at('contradicciones0'), { cx: 1350, cy: 450, size: 44, fill: C.white });
  chip(g, 'CONSEJOS QUE CAMBIAN', at('consejos0'), { cx: 1350, cy: 600, size: 40, fill: C.amber });
});

// 3. "if I eat two eggs, will my cholesterol rise? is fat building up in my arteries?"
scene(svg, at('quiza0'), at('tension0'), g => {
  obj(g, 'frito', at('quiza0') + 0.3, { cx: 520, cy: 330, fit: 360 });
  obj(g, 'frito', at('dos0'), { cx: 820, cy: 400, fit: 300, phase: 0.4 });
  cap(g, '«SI DESAYUNO DOS HUEVOS…»', at('dos0'), { cy: 660, size: 52, hi: 'DOS HUEVOS', t1: at('acumulando0') });
  cap(g, '«¿ME SUBIRÁ EL COLESTEROL?»', at('subira0'), { cy: 800, size: 52, hi: 'COLESTEROL', t1: at('acumulando0') });
  obj(g, 'arteria', at('acumulando0') - 0.2, { cx: 1450, cy: 380, fit: 380 });
  cap(g, '«¿GRASA EN MIS ARTERIAS?»', at('acumulando0'), { cy: 760, size: 54, hi: 'ARTERIAS', hiColor: '#FF7A6E' });
});

// 4. high blood pressure or abnormal blood tests make these doubts normal
scene(svg, at('tension0'), at('interesante0'), g => {
  tile(g, 'a_tension', at('tension0'), { x: 140, y: 130, w: 760, h: 500, label: 'TENSIÓN ALTA' });
  tile(g, 'a_analitica', at('analitica0') - 0.2, { x: 1020, y: 130, w: 760, h: 500, label: 'ANALÍTICA ALTERADA' });
  chip(g, 'ES NORMAL PREOCUPARSE', at('normal0'), { cy: 860, size: 48, fill: C.amber });
});

// 5. dietary cholesterol ≠ blood cholesterol; the liver balances it; responses differ person to person
scene(svg, at('interesante0'), at('video0'), g => {
  chip(g, 'LO INTERESANTE', at('interesante0'), { cy: 90, size: 44, fill: C.ink, color: C.amber });
  Food(g, 'huevo', at('interesante0') + 1, { cx: 420, cy: 400, r: 150, label: 'EL QUE COMES' });
  Sign(g, '≠', at('sangre0') - 0.5, { cx: 960, cy: 400, size: 200 });
  Food(g, 'tubo', at('sangre0') - 0.3, { cx: 1500, cy: 400, r: 150, label: 'EL DE TU SANGRE' });
  obj(g, 'higado', at('higado0'), { cx: 960, cy: 760, fit: 300 });
  chip(g, 'TU HÍGADO REGULA', at('higado0') + 0.6, { cx: 960, cy: 960, size: 36, fill: TEAL, color: C.white, t1: at('persona0') - 0.3 });
  chip(g, 'CADA PERSONA RESPONDE DISTINTO', at('persona0') - 0.3, { cx: 960, cy: 960, size: 36, fill: C.amber });
});

// 6. today: what science says, who must be careful, the preparation mistake
scene(svg, at('video0'), at('cuarta0'), g => {
  chip(g, 'EN ESTE VÍDEO', at('video0'), { cy: 90, size: 44, fill: C.ink, color: C.amber });
  tile(g, 'm_balanza', at('ciencia0') - 0.3, { x: 70, y: 200, w: 570, h: 380, label: 'QUÉ DICE LA CIENCIA' });
  tile(g, 'k_infarto', at('cuidado0') - 0.3, { x: 675, y: 200, w: 570, h: 380, label: 'QUIÉN DEBE CUIDARSE' });
  tile(g, 'p_plato', at('error0') - 0.3, { x: 1280, y: 200, w: 570, h: 380, label: 'EL ERROR AL PREPARARLOS' });
});

// 7. watch part 4: a very common combination in Spain
scene(svg, at('cuarta0'), at('antes0'), g => {
  pan(g, 'p_plato', 'left', { from: [0.5, 0.5], to: [0.45, 0.45] });
  chip(g, '¡ATENCIÓN A LA 4ª PARTE!', at('cuarta0') + 0.5, { cx: 1510, cy: 380, size: 32, fill: C.amber });
  chip(g, 'UNA COMBINACIÓN MUY HABITUAL', at('combinacion0'), { cx: 1510, cy: 530, size: 26, fill: C.white });
});

// 8. comment: how many eggs do you eat a week?
scene(svg, at('antes0'), at('vamos0'), g => {
  tile(g, 'n_semana', at('antes0'), { x: 510, y: 70, w: 900, h: 560 });
  CTAlive(g, 'comment', '¿CUÁNTOS HUEVOS A LA SEMANA?', at('semana0') - 0.3, { y: 740 });
});

// 9. what deserves your worry — and what you can stop fearing
scene(svg, at('vamos0'), at('p1') - 0.3, g => {
  pan(g, 'd_desayuno', 'full', { from: [0.5, 0.45], to: [0.5, 0.5] });
  cap(g, 'QUÉ TEMER… Y QUÉ NO', at('temer0') - 0.8, { hi: 'Y QUÉ NO', hiColor: '#7DE08E' });
});
