// PUNTO 6 — sudden anxiety / sense of impending doom: Concha (69, dramatización) resting after lunch, sudden
// unease, pounding heart, chest pressure — "it's just nerves" → delays care; stress response: sympathetic +
// adrenaline → palpitations, sweat, restlessness, alarm; anxiety ≠ always a heart attack, panic attacks are
// real too, often impossible to tell apart without a medical check; anxiety + chest/breath/sweat/nausea/jaw
// → 112, don't wait to calm down; listen to your body; share with a woman who says "it's nerves".

// 0. kicker
scene(svg, at('p6') - 0.3, at('dificil6'), g => {
  pan(g, 'n_miedo', 'full', { from: [0.5, 0.45], to: [0.5, 0.5] });
  kicker(g, 'SÍNTOMA 6', 'ANGUSTIA O SENSACIÓN\nDE MUERTE INMINENTE', at('p6'));
});

// 1. sometimes the first thing isn't pain: an intense anguish, as if something terrible were about to happen
scene(svg, at('dificil6'), at('concha6'), g => {
  pan(g, 'm_adrenalina', 'left', { from: [0.5, 0.5], to: [0.5, 0.45] });
  mark(g, 'NO SIEMPRE EMPIEZA CON DOLOR', false, at('dificil6') + 1, { cx: 1510, cy: 220, size: 26 });
  chip(g, 'ANGUSTIA MUY INTENSA', at('angustia6'), { cx: 1510, cy: 380, size: 34, fill: C.red, color: C.white });
  chip(g, '«VA A PASAR ALGO TERRIBLE»', at('terrible6'), { cx: 1510, cy: 510, size: 30, fill: C.white });
  chip(g, 'LO DESCRIBEN MUJERES CON INFARTO', at('describen6'), { cx: 1510, cy: 650, size: 24, fill: C.amber });
});

// 2. Concha, 69: resting after lunch, no bad news — sudden unease, pounding heart, chest pressure
scene(svg, at('concha6'), at('nervios6') - 1.5, g => {
  story(g, 'CONCHA, 69 AÑOS', at('concha6'));
  tile(g, 'n_sofa', at('concha6') + 0.5, { x: 140, y: 170, w: 760, h: 500, label: 'DESCANSANDO, SIN MOTIVOS' });
  tile(g, 'n_miedo', at('inquietud6') - 0.3, { x: 1020, y: 170, w: 760, h: 500, label: 'INQUIETUD · PALPITACIONES · PRESIÓN' });
});

// 3. "Calm down, it's just nerves" — blaming anxiety can delay medical care
scene(svg, at('nervios6') - 1.5, at('porque6'), g => {
  pan(g, 'n_hija', 'left', { from: [0.5, 0.45], to: [0.5, 0.5] });
  mark(g, '«TRANQUILA, SERÁN LOS NERVIOS»', false, at('nervios6') - 0.5, { cx: 1510, cy: 300, size: 24 });
  chip(g, 'UN PROBLEMA IMPORTANTE', at('problema6'), { cx: 1510, cy: 460, size: 30, fill: C.red, color: C.white });
  chip(g, 'RETRASA LA ATENCIÓN MÉDICA', at('retrasar6'), { cx: 1510, cy: 590, size: 28, fill: C.white });
  tag(g, 'DRAMATIZACIÓN', at('nervios6') - 1.5, { x: 1580, y: 960 });
});

// 4. why: physical stress → sympathetic system + adrenaline → palpitations, sweat, restlessness, alarm
scene(svg, at('porque6'), at('ansiedad6'), g => {
  pan(g, 'm_adrenalina', 'left', { from: [0.45, 0.5], to: [0.55, 0.5] });
  chip(g, '¿POR QUÉ?', at('porque6'), { cx: 1510, cy: 180, size: 44, fill: C.ink, color: C.amber });
  chip(g, 'ADRENALINA', at('adrenalina6'), { cx: 1510, cy: 320, size: 44, fill: C.red, color: C.white });
  ['PALPITACIONES', 'SUDORACIÓN', 'INQUIETUD', 'SENSACIÓN DE ALARMA'].forEach((s, i) => chip(g, s, at('palpitaciones6') + i * 0.7, { cx: 1510, cy: 450 + i * 105, size: 30, fill: C.white }));
});

// 5. anxiety ≠ always a heart attack; panic attacks are real too; often only a doctor can tell them apart
scene(svg, at('ansiedad6'), at('angustia_rep6'), g => {
  obj(g, 'cerebro', at('ansiedad6'), { cx: 520, cy: 400, fit: 420 });
  obj(g, 'corazon', at('panico6'), { cx: 520, cy: 760, fit: 320, phase: 0.4 });
  mark(g, 'ANSIEDAD ≠ SIEMPRE INFARTO', true, at('ansiedad6') + 0.5, { cx: 1300, cy: 300, size: 32 });
  chip(g, 'EL PÁNICO TAMBIÉN DA SÍNTOMAS REALES', at('panico6'), { cx: 1300, cy: 460, size: 26, fill: C.white });
  chip(g, 'A VECES SOLO EL MÉDICO', at('diferenciarlas6') - 0.5, { cx: 1300, cy: 610, size: 32, fill: C.amber });
  chip(g, 'PUEDE DIFERENCIARLOS', at('diferenciarlas6') + 0.5, { cx: 1300, cy: 720, size: 32, fill: C.amber });
});

// 6. sudden anguish + chest pressure, breathlessness, sweat, nausea or jaw → 112; don't wait to calm down (≥ 6 s)
scene(svg, at('angustia_rep6'), at('idea6'), g => {
  call112(g, at('angustia_rep6') + 0.5, ['ANGUSTIA REPENTINA +', 'PRESIÓN EN EL PECHO · FALTA DE AIRE', 'SUDOR FRÍO · NÁUSEAS · MANDÍBULA']);
  mark(g, '«ES TODO PSICOLÓGICO»', false, at('psicologico6') - 0.5, { cx: 1110, cy: 900, size: 34 });
}, { punch: [at('llama6')] });

// 7. listening to your body isn't constant worry — it's knowing when something deserves attention
scene(svg, at('idea6'), at('comparte6'), g => {
  pan(g, 'n_llamada', 'full', { from: [0.5, 0.45], to: [0.5, 0.5] });
  cap(g, 'ESCUCHA LAS SEÑALES DE TU CUERPO', at('escuchar6'), { size: 48, hi: 'ESCUCHA', hiColor: '#7DE08E' });
});

// 8. share with a woman who brushes symptoms off as "just nerves"
scene(svg, at('comparte6'), at('hoy_c') - 0.3, g => {
  tile(g, 'z_amigas', at('comparte6'), { x: 410, y: 80, w: 1100, h: 600 });
  chip(g, '¿CONOCES A UNA MUJER QUE DICE «SON NERVIOS»?', at('comparte6') + 0.5, { cy: 770, size: 32, fill: C.white });
  chip(g, 'COMPÁRTELE ESTE VÍDEO', at('conversacion6') - 1, { cy: 900, size: 44, fill: C.amber });
}, { punch: [at('conversacion6') - 1] });
