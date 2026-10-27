// PUNTO 4 — the preparation mistake: the egg gets the blame for what comes with it (salt, saturated fat,
// calories): fried eggs + bacon + sausages + white bread; sodium → BP, saturated fat → LDL; reused, smoking
// oil degrades and oxidises; better: boiled, poached, griddled with a little EVOO, omelette with vegetables,
// Mediterranean breakfast; same egg, two breakfasts; comment question; → how many per week.

// 0. kicker
scene(svg, at('p4') - 0.3, at('peligro4'), g => {
  pan(g, 'p_plato', 'full', { from: [0.5, 0.5], to: [0.45, 0.45] });
  kicker(g, 'PUNTO 4', 'EL ERROR AL PREPARAR\nLOS HUEVOS', at('p4'));
});

// 1. the danger is what you consider normal: the egg for protein, the plate full of salt, fat, calories
scene(svg, at('peligro4'), at('habitual4'), g => {
  chip(g, 'EL PELIGRO: LO QUE VES «NORMAL»', at('normal4') - 0.5, { cy: 90, size: 42, fill: C.ink, color: C.amber });
  Food(g, 'huevo', at('proteinas4') - 0.3, { cx: 960, cy: 310, r: 130, label: 'PROTEÍNAS', fill: C.green, color: C.white });
  Food(g, 'salero', at('sal4'), { cx: 460, cy: 650, r: 120, label: 'SAL', fill: C.red, color: C.white });
  Food(g, 'beicon', at('saturadas4'), { cx: 960, cy: 650, r: 120, label: 'GRASAS SATURADAS', fill: C.red, color: C.white, phase: 0.3 });
  Food(g, 'cruasan', at('saturadas4') + 1, { cx: 1460, cy: 650, r: 120, label: 'CALORÍAS', fill: C.red, color: C.white, phase: 0.6 });
  chip(g, 'LA CULPA NO ES DEL HUEVO', at('acompana4') - 0.5, { cy: 960, size: 40, fill: C.amber });
});

// 2. a typical breakfast: two fried eggs, bacon, sausages, white bread — "protein-rich" at first sight
scene(svg, at('habitual4'), at('embutidos4'), g => {
  chip(g, 'UN DESAYUNO HABITUAL', at('habitual4') + 0.2, { cy: 90, size: 46, fill: C.ink, color: C.amber });
  obj(g, 'frito', at('fritos4'), { cx: 330, cy: 380, fit: 380 });
  obj(g, 'frito', at('fritos4') + 0.3, { cx: 560, cy: 470, fit: 320, phase: 0.3 });
  obj(g, 'beicon', at('beicon4'), { cx: 900, cy: 400, fit: 380, phase: 0.5 });
  obj(g, 'salchichas', at('salchichas4'), { cx: 1260, cy: 420, fit: 360, phase: 0.2 });
  obj(g, 'pan_blanco', at('pan4'), { cx: 1600, cy: 400, fit: 320, phase: 0.7 });
  chip(g, '¿RICO EN PROTEÍNAS?', at('primera4'), { cy: 760, size: 46, fill: C.white });
  chip(g, 'MERECE ATENCIÓN', at('primera4') + 2, { cy: 900, size: 42, fill: C.amber });
});

// 3. cold cuts and processed meat: lots of sodium and saturated fat → harder to control BP and LDL
scene(svg, at('embutidos4'), at('exceso4'), g => {
  pan(g, 'p_plato', 'left', { from: [0.45, 0.45], to: [0.6, 0.5] });
  chip(g, 'CARNES PROCESADAS', at('embutidos4') + 0.3, { cx: 1510, cy: 200, size: 34, fill: C.ink, color: C.amber });
  chip(g, 'SODIO', at('sodio4'), { cx: 1400, cy: 340, size: 40, fill: C.red, color: C.white });
  chip(g, 'GRASAS SATURADAS', at('sodio4') + 1.5, { cx: 1560, cy: 450, size: 32, fill: C.red, color: C.white });
  chip(g, '→ TENSIÓN ARTERIAL', at('frecuentemente4') + 1, { cx: 1510, cy: 610, size: 34, fill: C.white });
  chip(g, '→ COLESTEROL LDL', at('ldl4'), { cx: 1510, cy: 730, size: 34, fill: C.white });
});

// 4. sodium raises BP (salt sensitivity); saturated fat raises LDL; over years → more cardiovascular risk
scene(svg, at('exceso4'), at('aceite4'), g => {
  Food(g, 'salero', at('exceso4') + 0.2, { cx: 300, cy: 300, r: 130 });
  Sign(g, '→', at('exceso4') + 0.8, { cx: 560, cy: 300, size: 130, color: C.ink });
  Monitor(g, at('exceso4') + 1, { cx: 880, cy: 300, s: 0.6, sys: 150, dia: 95, count: 1.3 });
  chip(g, 'SENSIBILIDAD A LA SAL', at('sensibilidad4'), { cx: 560, cy: 520, size: 32, fill: C.amber });
  Food(g, 'mantequilla', at('grasas4'), { cx: 1150, cy: 300, r: 130, phase: 0.3 });
  Sign(g, '→', at('grasas4') + 0.6, { cx: 1400, cy: 300, size: 130, color: C.ink });
  chip(g, '↑ LDL', at('grasas4') + 1.2, { cx: 1650, cy: 300, size: 60, fill: '#D99A1E', color: C.white });
  chip(g, 'DURANTE AÑOS → ↑ RIESGO CARDIOVASCULAR', at('anos4'), { cy: 780, size: 40, fill: C.red, color: C.white });
});

// 5. less obvious: reused, overheated oil degrades and oxidises — don't keep reusing it, especially if it smokes
scene(svg, at('aceite4'), at('buena4'), g => {
  pan(g, 'p_aceite', 'left', { from: [0.4, 0.5], to: [0.5, 0.45] });
  chip(g, 'ACEITE RECALENTADO', at('aceite4') + 1, { cx: 1510, cy: 220, size: 34, fill: C.ink, color: C.amber });
  chip(g, 'DEGRADACIÓN Y OXIDACIÓN', at('oxidacion4'), { cx: 1510, cy: 370, size: 30, fill: C.white });
  mark(g, 'REUTILIZARLO SIEMPRE', false, at('reutilizar4'), { cx: 1510, cy: 530, size: 30 });
  chip(g, 'SI HUMEA O CAMBIA DE OLOR', at('humear4'), { cx: 1510, cy: 690, size: 28, fill: C.red, color: C.white });
});

// 6. good news: boil, poach or griddle with a little extra-virgin olive oil
scene(svg, at('buena4'), at('tortilla4'), g => {
  chip(g, 'LA BUENA NOTICIA', at('buena4') + 0.2, { cy: 90, size: 46, fill: C.green, color: C.white });
  Food(g, 'cocido', at('cocerlos4') - 0.2, { cx: 380, cy: 420, r: 170, label: 'COCIDOS' });
  tile(g, 'p_escalfado', at('escalfarlos4') - 0.2, { x: 700, y: 250, w: 520, h: 340, label: 'ESCALFADOS' });
  Food(g, 'sarten', at('plancha4') - 0.2, { cx: 1540, cy: 420, r: 170, label: 'A LA PLANCHA' });
  Food(g, 'aceite', at('plancha4') + 1.2, { cx: 1540, cy: 800, r: 110, label: 'POCO ACEITE DE OLIVA', fill: C.green, color: C.white });
});

// 7. a French omelette with spinach, mushrooms or courgette; non-stick pan, no excessive heat
scene(svg, at('tortilla4'), at('mediterraneo4'), g => {
  obj(g, 'tortilla', at('tortilla4'), { cx: 960, cy: 400, fit: 560 });
  chip(g, 'TORTILLA FRANCESA', at('tortilla4') + 0.5, { cx: 960, cy: 120, size: 44, fill: C.ink, color: C.amber });
  Food(g, 'espinacas', at('espinacas4'), { cx: 330, cy: 340, r: 120 });
  Food(g, 'champinones', at('champinones4'), { cx: 1590, cy: 340, r: 120, phase: 0.3 });
  Food(g, 'calabacin', at('calabacin4'), { cx: 1590, cy: 660, r: 120, phase: 0.6 });
  Food(g, 'sarten', at('antiadherente4') - 0.3, { cx: 330, cy: 660, r: 120, phase: 0.2 });
  chip(g, 'SARTÉN ANTIADHERENTE · SIN EXCESO DE FUEGO', at('antiadherente4'), { cy: 920, size: 36, fill: C.white });
});

// 8. Mediterranean breakfast: egg + fresh tomato + wholegrain bread + a drizzle of olive oil → fibre, good fats
scene(svg, at('mediterraneo4'), at('diferencia4'), g => {
  pan(g, 'p_mediterraneo', 'left', { from: [0.45, 0.5], to: [0.55, 0.45] });
  chip(g, 'AL ESTILO MEDITERRÁNEO', at('mediterraneo4') + 0.5, { cx: 1510, cy: 190, size: 30, fill: C.ink, color: C.amber });
  mark(g, 'TOMATE NATURAL', true, at('tomate4'), { cx: 1510, cy: 330, size: 32 });
  mark(g, 'PAN INTEGRAL', true, at('integral4'), { cx: 1510, cy: 460, size: 32 });
  mark(g, 'ACEITE DE OLIVA', true, at('chorrito4'), { cx: 1510, cy: 590, size: 32 });
  chip(g, 'FIBRA · GRASAS INSATURADAS', at('fibra4'), { cx: 1510, cy: 750, size: 28, fill: C.green, color: C.white });
});

// 9. same egg, two very different breakfasts: no food is the enemy — learn to combine it
scene(svg, at('diferencia4'), at('preguntar4'), g => {
  chip(g, 'EL MISMO HUEVO', at('diferencia4') + 0.3, { cy: 90, size: 48, fill: C.ink, color: C.amber });
  tile(g, 'p_plato', at('diferencia4') + 0.8, { x: 140, y: 190, w: 760, h: 500 });
  tile(g, 'p_mediterraneo', at('diferencia4') + 1.6, { x: 1020, y: 190, w: 760, h: 500 });
  chip(g, 'NINGÚN ALIMENTO ES EL ENEMIGO', at('enemigo4'), { cy: 820, size: 42, fill: C.white });
  chip(g, 'APRENDE A COMBINARLO', at('combinarlo4'), { cy: 950, size: 44, fill: C.green, color: C.white });
});

// 10. boiled, omelette or fried? write it in the comments
scene(svg, at('preguntar4'), at('errores4'), g => {
  Food(g, 'cocido', at('cocidos4') - 0.3, { cx: 520, cy: 340, r: 150, label: 'COCIDOS' });
  Food(g, 'tortilla', at('tortilla4q') - 0.3, { cx: 960, cy: 340, r: 150, label: 'EN TORTILLA', phase: 0.3 });
  Food(g, 'frito', at('tortilla4q') + 0.5, { cx: 1400, cy: 340, r: 150, label: 'FRITOS', phase: 0.6 });
  CTAlive(g, 'comment', '¿CÓMO LOS PREFIERES?', at('escribelo4') - 0.3, { y: 720 });
});

// 11. the big question left: how many eggs a week?
scene(svg, at('errores4'), at('p5') - 0.3, g => {
  pan(g, 'n_semana', 'full', { from: [0.5, 0.5], to: [0.6, 0.5] });
  cap(g, '¿CUÁNTOS HUEVOS A LA SEMANA?', at('cuantos4') - 0.5, { hi: '¿CUÁNTOS' });
});
