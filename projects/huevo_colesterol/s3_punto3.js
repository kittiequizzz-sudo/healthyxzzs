// PUNTO 3 — not everyone responds the same: hyper-responders (absorption + liver regulation, genetic
// variants); hyper-responder ≠ certain disease: watch LDL and, when indicated, apoB; extra care with familial
// hypercholesterolaemia, past heart attack/stroke, CVD, type 2 diabetes → ask your doctor/dietitian;
// don't copy your neighbour; review risk factors with a professional; subscribe.

// 0. kicker
scene(svg, at('p3') - 0.3, at('dos3'), g => {
  pan(g, 'g_adn', 'full', { from: [0.45, 0.5], to: [0.55, 0.5] });
  kicker(g, 'PUNTO 3', 'NO TODOS RESPONDEMOS IGUAL', at('p3'));
});

// 1. two people, same breakfast for weeks: one stable, the other LDL up — metabolism differs
scene(svg, at('dos3'), at('grupo3'), g => {
  chip(g, 'EL MISMO DESAYUNO, VARIAS SEMANAS', at('dos3') + 0.3, { cy: 90, size: 40, fill: C.ink, color: C.amber });
  tile(g, 'd_contento', at('estable3') - 0.3, { x: 140, y: 190, w: 760, h: 480, label: 'COLESTEROL ESTABLE' });
  tile(g, 'd_preocupado', at('aumento3') - 0.3, { x: 1020, y: 190, w: 760, h: 480, label: '↑ LDL CONSIDERABLE' });
  wrapQ(g, at('como3'), 960, 830, 1.1);
  chip(g, 'CADA METABOLISMO ES DISTINTO', at('metabolismo3'), { cy: 990, size: 40, fill: C.amber });
});

// 2. "hyper-responders": more dietary cholesterol → bigger changes in the blood
scene(svg, at('grupo3'), at('intestino3'), g => {
  pan(g, 'g_lupa', 'left', { from: [0.45, 0.5], to: [0.55, 0.45] });
  chip(g, 'UN GRUPO DE PERSONAS', at('grupo3') + 0.3, { cx: 1510, cy: 220, size: 32, fill: C.white });
  stamp(g, 'HIPERRESPONDEDORES', at('hiper3'), { cx: 1510, cy: 400, size: 40, color: TEAL, rot: -4 });
  chip(g, 'MÁS COLESTEROL EN LA DIETA', at('pronunciados3') - 0.8, { cx: 1510, cy: 580, size: 26, fill: C.white });
  chip(g, '→ CAMBIOS MAYORES EN SANGRE', at('pronunciados3'), { cx: 1510, cy: 690, size: 26, fill: C.amber });
});

// 3. why: gut absorption + liver regulation vary with genetics and metabolism
scene(svg, at('intestino3'), at('comprender3'), g => {
  tile(g, 'g_intestino', at('intestino3') - 0.2, { x: 70, y: 180, w: 570, h: 380, label: 'INTESTINO: ABSORCIÓN' });
  tile(g, 'g_higados', at('higado3') - 0.2, { x: 675, y: 180, w: 570, h: 380, label: 'HÍGADO: REGULACIÓN' });
  tile(g, 'g_adn', at('variantes3') - 0.2, { x: 1280, y: 180, w: 570, h: 380, label: 'VARIANTES GENÉTICAS' });
  chip(g, 'VARÍAN DE UNA PERSONA A OTRA', at('higado3') + 2, { cy: 800, size: 44, fill: C.amber });
});

// 4. hyper-responder ≠ automatically heart disease; watch your results: LDL and, when indicated, apoB
scene(svg, at('comprender3'), at('situaciones3'), g => {
  pan(g, 'd_medica', 'left', { from: [0.5, 0.45], to: [0.6, 0.5] });
  mark(g, 'NO ES ENFERMEDAD SEGURA', false, at('automaticamente3'), { cx: 1510, cy: 220, size: 28 });
  chip(g, 'VIGILA TUS ANÁLISIS', at('analiticos3'), { cx: 1510, cy: 380, size: 34, fill: C.white });
  chip(g, 'COLESTEROL LDL', at('ldl3'), { cx: 1510, cy: 510, size: 36, fill: '#D99A1E', color: C.white });
  chip(g, 'APOLIPOPROTEÍNA B', at('apob3') - 0.3, { cx: 1510, cy: 630, size: 30, fill: TEAL, color: C.white });
});

// 5. extra care: familial hypercholesterolaemia, heart attack, stroke, CVD → ask before eating many more eggs
scene(svg, at('situaciones3'), at('diabetes3'), g => {
  chip(g, 'MÁS PRECAUCIÓN SI TIENES…', at('situaciones3') + 0.3, { cy: 80, size: 42, fill: C.ink, color: C.amber });
  tile(g, 'k_familia', at('familiar3') - 0.3, { x: 140, y: 170, w: 760, h: 450, label: 'HIPERCOLESTEROLEMIA FAMILIAR' });
  tile(g, 'k_infarto', at('infarto3') - 0.3, { x: 1020, y: 170, w: 760, h: 450, label: 'INFARTO' });
  chip(g, 'ICTUS', at('ictus3'), { cx: 1150, cy: 760, size: 36, fill: C.red, color: C.white });
  chip(g, 'ENFERMEDAD CARDIOVASCULAR', at('padeces3'), { cx: 1580, cy: 760, size: 28, fill: C.red, color: C.white });
  chip(g, 'CONSULTA ANTES DE AUMENTAR LOS HUEVOS', at('consultar3'), { cy: 920, size: 36, fill: C.amber });
});

// 6. type 2 diabetes (+ hypertension, weight, cholesterol): not automatic elimination, a plan for your risk
scene(svg, at('diabetes3'), at('recomendacion3'), g => {
  pan(g, 'k_diabetes', 'left', { from: [0.45, 0.45], to: [0.55, 0.5] });
  chip(g, 'DIABETES TIPO 2', at('diabetes3') + 0.6, { cx: 1510, cy: 200, size: 40, fill: C.ink, color: C.amber });
  chip(g, '+ TENSIÓN · PESO · COLESTEROL', at('presentas3'), { cx: 1510, cy: 330, size: 26, fill: C.white });
  mark(g, 'ELIMINARLOS SIN MÁS', false, at('eliminar3'), { cx: 1510, cy: 500, size: 30 });
  mark(g, 'UN PLAN A TU MEDIDA', true, at('plan3'), { cx: 1510, cy: 650, size: 32 });
});

// 7. don't decide by what works for your neighbour
scene(svg, at('recomendacion3'), at('antecedentes3'), g => {
  pan(g, 'k_vecina', 'full', { from: [0.5, 0.45], to: [0.5, 0.4] });
  cap(g, 'LO QUE LE FUNCIONA A TU VECINO…', at('vecino3') - 0.5, { size: 50, hi: 'TU VECINO', t1: at('garantiza3') });
  cap(g, '…NO TIENE POR QUÉ FUNCIONARTE A TI', at('garantiza3'), { size: 46, hi: 'A TI', hiColor: '#FF7A6E' });
});

// 8. your history, results and whole diet count more than any universal rule
scene(svg, at('antecedentes3'), at('prohibirte3'), g => {
  chip(g, 'TUS ANTECEDENTES', at('antecedentes3'), { cx: 520, cy: 250, size: 44, fill: C.white });
  chip(g, 'TUS RESULTADOS', at('antecedentes3') + 1, { cx: 1400, cy: 250, size: 44, fill: C.white });
  chip(g, 'TU DIETA COMPLETA', at('dieta3'), { cx: 960, cy: 420, size: 44, fill: C.white });
  mark(g, 'REGLAS UNIVERSALES', false, at('universal3'), { cy: 640, size: 44 });
});

// 9. neither ban a food nor eat it without limits: review your risk factors regularly with a professional
scene(svg, at('prohibirte3'), at('interesa3'), g => {
  pan(g, 'd_medica', 'full', { from: [0.5, 0.45], to: [0.55, 0.5] });
  cap(g, 'NI PROHIBIR, NI SIN LÍMITES', at('prohibirte3') + 0.5, { hi: 'NI', t1: at('revisar3') });
  cap(g, 'REVISA TU RIESGO CON UN PROFESIONAL', at('revisar3'), { size: 48, hi: 'UN PROFESIONAL', hiColor: '#7DE08E' });
});

// 10. subscribe
scene(svg, at('interesa3'), at('porque3'), g => {
  tile(g, 'h_mediterranea', at('interesa3'), { x: 410, y: 80, w: 1100, h: 600 });
  CTAlive(g, 'sub', 'SUSCRÍBETE AL CANAL', at('suscribete3') - 0.3, { y: 730 });
  chip(g, 'CIENCIA SENCILLA · CONSEJOS PRÁCTICOS', at('sencilla3'), { cy: 950, size: 34, fill: C.amber });
}, { punch: [at('suscribete3')] });

// 11. the common mistake isn't the egg, it's what we put next to it
scene(svg, at('porque3'), at('p4') - 0.3, g => {
  pan(g, 'p_plato', 'full', { from: [0.5, 0.5], to: [0.6, 0.45] });
  cap(g, 'EL ERROR: LO QUE LO ACOMPAÑA', at('lado3') - 0.5, { hi: 'LO QUE LO ACOMPAÑA', hiColor: '#FF7A6E' });
});
