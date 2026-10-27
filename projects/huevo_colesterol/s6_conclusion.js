// CONCLUSIÓN — no fear of foods; the egg-cholesterol-heart link is more complex; the egg isn't an enemy but
// consider your situation: know your LDL, control BP, watch your usual diet; small changes; comment
// question; like/subscribe/bell; educational disclaimer + consult your doctor (≥ 6 s); close.

// 0. caring for arteries isn't living in fear of food, it's decisions that protect you
scene(svg, at('cada_dia5') + 2.4, at('anos_c'), g => {
  pan(g, 'z_paseo', 'full', { from: [0.5, 0.45], to: [0.55, 0.5] });
  cap(g, 'SIN MIEDO A LOS ALIMENTOS', at('miedo_c'), { hi: 'SIN MIEDO', t1: at('decisiones_c') + 0.5 });
  cap(g, 'DECISIONES QUE TE PROTEGEN', at('decisiones_c') + 0.5, { hi: 'TE PROTEGEN', hiColor: '#7DE08E' });
});

// 1. for years many dropped eggs to avoid high cholesterol — the link is far more complex
scene(svg, at('anos_c'), at('enemigo_c'), g => {
  tile(g, 'a_rechaza', at('anos_c'), { x: 410, y: 80, w: 1100, h: 600 });
  chip(g, 'LA RELACIÓN ES MÁS COMPLEJA', at('compleja_c') - 1, { cy: 820, size: 48, fill: C.amber });
});

// 2. not an enemy, not a free pass: know your LDL, control your BP, watch your usual diet
scene(svg, at('enemigo_c'), at('cambios_c'), g => {
  Food(g, 'huevo', at('enemigo_c'), { cx: 420, cy: 420, r: 200 });
  mark(g, 'NO ES UN ENEMIGO', true, at('enemigo_c') + 1, { cx: 1300, cy: 170, size: 36 });
  mark(g, 'NI SE COME SIN PENSAR', false, at('tampoco_c'), { cx: 1300, cy: 300, size: 36 });
  chip(g, 'LO IMPORTANTE:', at('ldl_c') - 1, { cx: 1300, cy: 450, size: 36, fill: C.ink, color: C.amber });
  mark(g, 'CONOCE TU LDL', true, at('ldl_c'), { cx: 1300, cy: 580, size: 36 });
  mark(g, 'CONTROLA TU TENSIÓN', true, at('tension_c'), { cx: 1300, cy: 710, size: 36 });
  mark(g, 'CUIDA TU DIETA HABITUAL', true, at('dieta_c'), { cx: 1300, cy: 840, size: 34 });
});

// 3. small changes: EVOO, fewer cold cuts, more vegetables, enough fibre
scene(svg, at('cambios_c'), at('pregunta_c'), g => {
  chip(g, 'PEQUEÑOS CAMBIOS', at('cambios_c') + 0.3, { cy: 110, size: 52, fill: C.ink, color: C.amber });
  Food(g, 'aceite', at('aove_c') - 0.3, { cx: 300, cy: 460, r: 150, label: 'ACEITE DE OLIVA', fill: C.green, color: C.white });
  Food(g, 'salchichas', at('embutidos_c') - 0.3, { cx: 740, cy: 460, r: 150, label: 'MENOS EMBUTIDOS', cross: at('embutidos_c') + 0.4, phase: 0.3 });
  Food(g, 'espinacas', at('verduras_c') - 0.3, { cx: 1180, cy: 460, r: 150, label: 'MÁS VERDURAS', fill: C.green, color: C.white, phase: 0.6 });
  Food(g, 'avena', at('fibra_c') - 0.3, { cx: 1620, cy: 460, r: 150, label: 'SUFICIENTE FIBRA', fill: C.green, color: C.white, phase: 0.9 });
});

// 4. question: will you keep eating eggs as before or change how you cook them?
scene(svg, at('pregunta_c'), at('util_c'), g => {
  tile(g, 'z_cocina', at('pregunta_c'), { x: 410, y: 70, w: 1100, h: 600 });
  CTAlive(g, 'comment', '¿COMO ANTES O CAMBIARÁS?', at('seguiras_c') - 0.3, { y: 720 });
  chip(g, 'CUÉNTAMELO EN LOS COMENTARIOS', at('cuentamelo_c'), { cy: 950, size: 38, fill: C.amber });
});

// 5. like, subscribe, bell
scene(svg, at('util_c'), at('terminar_c') - 0.3, g => {
  tile(g, 'z_desayuno', at('util_c'), { x: 560, y: 60, w: 800, h: 440 });
  CTAlive(g, 'like', 'ME GUSTA', at('gusta_c') - 0.3, { y: 560 });
  CTAlive(g, 'sub', 'SUSCRÍBETE Y ACTIVA LA CAMPANITA', at('suscribete_c') - 0.3, { y: 740 });
}, { punch: [at('suscribete_c')] });

// 6. educational content, not a substitute for a professional; consult before big diet or medication changes (≥ 6 s)
scene(svg, at('terminar_c') - 0.3, at('porque_c'), g => {
  chip(g, 'CONTENIDO EDUCATIVO · NO SUSTITUYE AL MÉDICO', at('terminar_c'), { cy: 90, size: 38, fill: C.ink, color: C.white });
  warn(g, 'CONSULTA A TU MÉDICO', ['ANTES DE CAMBIAR TU DIETA O MEDICACIÓN SI TIENES:', 'COLESTEROL ELEVADO · HIPERTENSIÓN', 'DIABETES · ANTECEDENTES CARDIOVASCULARES'], at('colesterol_c') - 1, { y: 250, w: 1500, size: 40 });
}, { punch: [at('colesterol_c')] });

// 7. close: many small healthy habits, kept for life
scene(svg, at('porque_c'), END + 1, g => {
  pan(g, 'z_paseo', 'full', { from: [0.5, 0.5], to: [0.55, 0.45] });
  cap(g, 'MUCHOS PEQUEÑOS HÁBITOS', at('habitos_c'), { hi: 'PEQUEÑOS HÁBITOS', hiColor: '#7DE08E' });
}, { fade: 0.5 });
