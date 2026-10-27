// PUNTO 1 — the myth: egg cholesterol doesn't simply stick to artery walls. Dietary vs blood cholesterol;
// the body needs cholesterol (hormones, vitamin D, membranes); the liver adjusts its own production;
// responses differ (genetics); saturated fat matters more; whole habits, not one food; CTA like.

// 0. kicker
scene(svg, at('p1') - 0.3, at('anos1'), g => {
  pan(g, 'm_tuberia', 'full', { from: [0.5, 0.45], to: [0.45, 0.5] });
  kicker(g, 'PUNTO 1', 'EL GRAN MITO DEL COLESTEROL', at('p1'));
});

// 1. "egg cholesterol sticks to your arteries, like grease in a pipe" — the body is more complex: MYTH
scene(svg, at('anos1'), at('conceptos1'), g => {
  pan(g, 'm_tuberia', 'left', { from: [0.35, 0.45], to: [0.55, 0.5] });
  chip(g, 'LO QUE NOS HICIERON CREER', at('anos1') + 0.5, { cx: 1510, cy: 220, size: 28, fill: C.white });
  chip(g, 'HUEVO → PEGADO A LA ARTERIA', at('pegada1'), { cx: 1510, cy: 360, size: 28, fill: C.amber });
  chip(g, 'COMO UNA TUBERÍA', at('tuberia1'), { cx: 1510, cy: 490, size: 36, fill: C.white });
  stamp(g, 'MITO', at('complejo1'), { cx: 625, cy: 500, size: 140, color: C.red, rot: -10 });
  chip(g, 'EL CUERPO ES MÁS COMPLEJO', at('complejo1') + 0.8, { cx: 1510, cy: 680, size: 28, fill: TEAL, color: C.white });
}, { punch: [at('complejo1')] });

// 2. dietary cholesterol vs blood cholesterol: related, not the same
scene(svg, at('conceptos1'), at('necesita1'), g => {
  chip(g, 'DOS CONCEPTOS DISTINTOS', at('conceptos1') + 0.3, { cy: 90, size: 44, fill: C.ink, color: C.amber });
  Food(g, 'cocido', at('alimentario1') - 0.3, { cx: 520, cy: 420, r: 170, label: 'COLESTEROL ALIMENTARIO', size: 30 });
  Food(g, 'tubo', at('sanguineo1') - 0.3, { cx: 1400, cy: 420, r: 170, label: 'COLESTEROL SANGUÍNEO', size: 30 });
  Sign(g, '≠', at('sanguineo1') + 0.6, { cx: 960, cy: 420, size: 180 });
  chip(g, 'RELACIONADOS, PERO NO IGUALES', at('relacionados1'), { cy: 880, size: 44, fill: C.white });
});

// 3. your body needs cholesterol: hormones, vitamin D, cell membranes → balance, not elimination
scene(svg, at('necesita1'), at('protagonista1'), g => {
  pan(g, 'm_usos', 'left', { from: [0.4, 0.45], to: [0.6, 0.5] });
  chip(g, 'TU CUERPO LO NECESITA', at('necesita1') + 0.3, { cx: 1510, cy: 200, size: 32, fill: C.ink, color: C.amber });
  chip(g, 'HORMONAS', at('hormonas1'), { cx: 1510, cy: 340, size: 40, fill: C.white });
  chip(g, 'VITAMINA D', at('vitamina1'), { cx: 1510, cy: 460, size: 40, fill: C.white });
  chip(g, 'MEMBRANAS CELULARES', at('membranas1'), { cx: 1510, cy: 580, size: 32, fill: C.white });
  mark(g, 'EQUILIBRIO, NO ELIMINARLO', true, at('eliminarlo1'), { cx: 1510, cy: 760, size: 26 });
});

// 4. the overlooked protagonist: the liver makes much of the cholesterol you need
scene(svg, at('protagonista1'), at('fabrica_int1'), g => {
  obj(g, 'higado', at('protagonista1') + 0.3, { cx: 600, cy: 520, fit: 720 });
  chip(g, 'UN PROTAGONISTA OLVIDADO', at('protagonista1') + 0.5, { cx: 1400, cy: 300, size: 32, fill: C.white });
  stamp(g, 'EL HÍGADO', at('higado1') - 0.3, { cx: 1400, cy: 470, size: 70, color: '#8E3B2E', rot: -4 });
  chip(g, 'FABRICA GRAN PARTE', at('fabrica1'), { cx: 1400, cy: 650, size: 40, fill: C.amber });
  chip(g, 'DEL COLESTEROL', at('fabrica1') + 0.6, { cx: 1400, cy: 760, size: 40, fill: C.amber });
});

// 5. a smart factory: more from food → makes less; less from food → makes more
scene(svg, at('fabrica_int1'), at('sin_embargo1'), g => {
  pan(g, 'm_fabrica', 'left', { from: [0.45, 0.5], to: [0.6, 0.45] });
  chip(g, 'UNA FÁBRICA INTELIGENTE', at('fabrica_int1') + 0.4, { cx: 1510, cy: 180, size: 30, fill: C.ink, color: C.amber });
  gauge(g, at('recibes1') - 0.6, { cx: 1510, cy: 500, r: 190, label: 'PRODUCCIÓN' }, t =>
    0.55 - 0.3 * E.inOut(prog(t, at('recibes1') + 0.5, at('recibes1') + 1.8)) + 0.5 * E.inOut(prog(t, at('menos1') + 0.3, at('menos1') + 1.6)));
  chip(g, '+ EN LA DIETA → FABRICA MENOS', at('recibes1') + 0.3, { cx: 1510, cy: 700, size: 26, fill: C.white });
  chip(g, '– EN LA DIETA → FABRICA MÁS', at('menos1') + 0.2, { cx: 1510, cy: 820, size: 26, fill: C.white });
});

// 6. but it doesn't work the same in everyone: small changes vs larger LDL rises (genetics)
scene(svg, at('sin_embargo1'), at('nunca1'), g => {
  chip(g, 'NO FUNCIONA IGUAL EN TODOS', at('sin_embargo1') + 0.3, { cy: 90, size: 44, fill: C.ink, color: C.amber });
  tile(g, 'd_contento', at('pequenos1') - 0.3, { x: 140, y: 200, w: 760, h: 480, label: 'CAMBIOS PEQUEÑOS' });
  tile(g, 'd_preocupado', at('importantes1') - 0.3, { x: 1020, y: 200, w: 760, h: 480, label: '↑ LDL MÁS IMPORTANTE' });
  chip(g, 'PREDISPOSICIÓN GENÉTICA', at('genetica1'), { cy: 900, size: 44, fill: C.amber });
});

// 7. "eggs never raise cholesterol" is as wrong as "they always harm the heart"
scene(svg, at('nunca1'), at('saturadas1'), g => {
  obj(g, 'huevo', at('nunca1'), { cx: 960, cy: 300, fit: 320 });
  mark(g, '«NUNCA SUBEN EL COLESTEROL»', false, at('nunca1') + 0.6, { cy: 620, size: 40 });
  mark(g, '«SIEMPRE DAÑAN EL CORAZÓN»', false, at('siempre1'), { cy: 790, size: 40 });
});

// 8. saturated fat usually raises LDL more than the cholesterol in an egg
scene(svg, at('saturadas1'), at('yemas1'), g => {
  chip(g, 'OTRO DETALLE FUNDAMENTAL', at('saturadas1') + 0.3, { cy: 90, size: 44, fill: C.ink, color: C.amber });
  Food(g, 'beicon', at('saturadas1') + 1.2, { cx: 260, cy: 400, r: 120 });
  Food(g, 'mantequilla', at('saturadas1') + 1.6, { cx: 560, cy: 400, r: 120, phase: 0.3 });
  Food(g, 'cruasan', at('saturadas1') + 2.0, { cx: 860, cy: 400, r: 120, phase: 0.6 });
  chip(g, 'GRASAS SATURADAS', at('saturadas1') + 2.4, { cx: 560, cy: 600, size: 40, fill: C.red, color: C.white });
  Food(g, 'huevo', at('saturadas1') + 2.8, { cx: 1500, cy: 420, r: 100 });
  chip(g, 'COLESTEROL DEL HUEVO', at('saturadas1') + 3.2, { cx: 1500, cy: 600, size: 30, fill: C.white });
  chip(g, '↑ LDL: SUELEN INFLUIR MÁS', at('influir1'), { cx: 560, cy: 760, size: 38, fill: C.amber });
});

// 9. dropping yolks while eating cold cuts, pastries or butter may not bring the expected improvement
scene(svg, at('yemas1'), at('conjunto1'), g => {
  pan(g, 'h_yema', 'left', { from: [0.4, 0.45], to: [0.6, 0.5] });
  chip(g, 'QUITAR LAS YEMAS…', at('yemas1') + 0.2, { cx: 1510, cy: 200, size: 34, fill: C.white });
  chip(g, '+ EMBUTIDOS', at('embutidos1'), { cx: 1510, cy: 330, size: 36, fill: C.red, color: C.white });
  chip(g, '+ BOLLERÍA', at('bolleria1'), { cx: 1510, cy: 450, size: 36, fill: C.red, color: C.white });
  chip(g, '+ MANTEQUILLA', at('mantequilla1'), { cx: 1510, cy: 570, size: 36, fill: C.red, color: C.white });
  mark(g, 'NO TRAE LA MEJORA', false, at('mejora1'), { cx: 1510, cy: 740, size: 32 });
});

// 10. heart health depends on all your habits, not one food
scene(svg, at('conjunto1'), at('pregunta1'), g => {
  pan(g, 'h_mediterranea', 'full', { from: [0.5, 0.45], to: [0.55, 0.5] });
  cap(g, 'EL CONJUNTO DE TUS HÁBITOS', at('conjunto1') + 0.8, { hi: 'CONJUNTO', hiColor: '#7DE08E', t1: at('conjunto1') + 4.5 });
  cap(g, 'NO UN ALIMENTO AISLADO', at('conjunto1') + 4.5, { hi: 'AISLADO' });
});

// 11. so why do some people develop plaques that narrow their arteries? → LDL
scene(svg, at('pregunta1'), at('gusta1'), g => {
  pan(g, 'r_placa', 'full', { from: [0.5, 0.5], to: [0.5, 0.45] });
  cap(g, '¿POR QUÉ SE FORMAN PLACAS?', at('placas1') - 1, { hi: 'PLACAS', hiColor: '#FF7A6E', t1: at('respuesta1') + 0.5 });
  cap(g, 'LA RESPUESTA: EL LDL', at('respuesta1') + 0.5, { hi: 'LDL' });
});

// 12. like
scene(svg, at('gusta1'), at('p2') - 0.3, g => {
  tile(g, 'm_balanza', at('gusta1'), { x: 510, y: 80, w: 900, h: 560 });
  CTAlive(g, 'like', 'DALE A ME GUSTA', at('megusta1') - 0.3, { y: 760 });
});
