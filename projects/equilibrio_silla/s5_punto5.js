// PUNTO 5 — three mistakes: (1) getting up too fast, especially in the morning (orthostatic drop: sit on the
// edge, move the ankles, wait; repeated → doctor); (2) holding your breath while straining (sudden BP
// changes; breathe out on the effort); (3) believing walking is enough (strength + balance complement it).
// Goal: move more safely, not train harder; never change BP doses yourself.

// 0. kicker
scene(svg, at('p5') - 0.3, at('practicar5'), g => {
  pan(g, 'i_gira', 'full', { from: [0.5, 0.45], to: [0.5, 0.5] });
  kicker(g, 'PUNTO 5', '3 ERRORES QUE PONEN EN PELIGRO\nTU EQUILIBRIO Y TU CORAZÓN', at('p5'));
});

// 1. even with the exercises, some harmless-looking habits raise the risk of dizziness, trips and falls
scene(svg, at('practicar5'), at('primer5'), g => {
  chip(g, 'AUNQUE HAGAS LOS 4 EJERCICIOS…', at('practicar5') + 0.3, { cy: 120, size: 44, fill: C.white });
  chip(g, 'HÁBITOS QUE PERJUDICAN', at('habitos5'), { cy: 280, size: 50, fill: C.ink, color: C.amber });
  chip(g, 'Y PARECEN INOFENSIVOS', at('inofensivos5'), { cy: 430, size: 44, fill: C.white });
  [['MAREOS', 520], ['TROPIEZOS', 960], ['CAÍDAS', 1400]].forEach(([s, x], i) => chip(g, s, at('mareos5') + 0.5 + i * 0.5, { cx: x, cy: 680, size: 48, fill: C.red, color: C.white }));
});

// 2. mistake 1: getting up too fast, especially in the morning
scene(svg, at('primer5'), at('acostado5'), g => {
  pan(g, 'e_cama', 'full', { from: [0.5, 0.45], to: [0.45, 0.4] });
  tag(g, 'ERROR 1', at('primer5'), { x: 230, y: 90 });
  cap(g, 'LEVANTARTE DEMASIADO RÁPIDO', at('primer5') + 0.8, { hi: 'DEMASIADO RÁPIDO', hiColor: '#FF7A6E', t1: at('manana5') + 0.2 });
  cap(g, 'SOBRE TODO POR LA MAÑANA', at('manana5') + 0.2, { hi: 'POR LA MAÑANA' });
});

// 3. after hours lying down, blood shifts to legs and abdomen; if BP regulation is slow → dizziness, blurred vision
scene(svg, at('acostado5'), at('reducir5'), g => {
  obj(g, 'cama', at('acostado5'), { cx: 430, cy: 330, fit: 520 });
  chip(g, 'VARIAS HORAS ACOSTADO', at('acostado5') + 0.8, { cx: 430, cy: 560, size: 32, fill: C.white });
  tile(g, 'c_piernas', at('sangre5') - 0.3, { x: 820, y: 100, w: 560, h: 380 });
  chip(g, 'SANGRE → PIERNAS Y ABDOMEN', at('sangre5'), { cx: 1100, cy: 560, size: 30, fill: C.red, color: C.white });
  chip(g, 'LA PRESIÓN TARDA EN AJUSTARSE', at('responden5'), { cx: 960, cy: 700, size: 34, fill: C.white });
  tile(g, 'c_mareo', at('vision5') - 0.3, { x: 1460, y: 610, w: 400, h: 270 });
  chip(g, 'MAREO · VISIÓN BORROSA', at('vision5'), { cx: 960, cy: 850, size: 40, fill: C.amber });
});

// 4. fix: sit on the edge of the bed, move the ankles, wait a moment; if it keeps happening → doctor
scene(svg, at('reducir5'), at('segundo5'), g => {
  pan(g, 'e_tobillo', 'left', { from: [0.5, 0.5], to: [0.6, 0.55] });
  chip(g, 'PARA EVITARLO', at('reducir5'), { cx: 1510, cy: 180, size: 40, fill: C.green, color: C.white });
  chip(g, '1 · SIÉNTATE AL BORDE', at('borde5'), { cx: 1510, cy: 330, size: 34, fill: C.white });
  chip(g, '2 · MUEVE LOS TOBILLOS', at('tobillos5'), { cx: 1510, cy: 460, size: 34, fill: C.white });
  chip(g, '3 · ESPERA UNOS INSTANTES', at('espera5'), { cx: 1510, cy: 590, size: 32, fill: C.white });
  chip(g, 'SI SE REPITE → TU MÉDICO', at('consulta5'), { cx: 1510, cy: 760, size: 34, fill: C.amber });
});

// 5. mistake 2: holding your breath while straining → sudden blood-pressure changes
scene(svg, at('segundo5'), at('solucion5'), g => {
  pan(g, 'e_aire', 'full', { from: [0.45, 0.4], to: [0.5, 0.45] });
  tag(g, 'ERROR 2', at('segundo5'), { x: 230, y: 90 });
  cap(g, 'CONTENER LA RESPIRACIÓN AL HACER FUERZA', at('segundo5') + 0.8, { size: 44, hi: 'CONTENER', hiColor: '#FF7A6E', t1: at('bruscos5') - 0.3 });
  cap(g, 'CAMBIOS BRUSCOS DE PRESIÓN', at('bruscos5') - 0.3, { hi: 'BRUSCOS', hiColor: '#FF7A6E' });
});

// 6. fix: breathe continuously, breathe out on the hardest part
scene(svg, at('solucion5'), at('tercer5'), g => {
  const idx = CYCLE(at('solucion5'), [[0, 1.0], [1, 0.8], [2, 0.8], [3, 1.4], [2, 1.0], [1, 1.0], [0, 1.0]]);
  Poses(g, 'sentadilla', at('solucion5'), { cx: 520, cy: 560, h: 800, idx });
  chip(g, 'LA SOLUCIÓN', at('solucion5') + 0.3, { cx: 1300, cy: 220, size: 44, fill: C.green, color: C.white });
  chip(g, 'RESPIRA DE FORMA CONTINUA', at('solucion5') + 1.5, { cx: 1300, cy: 380, size: 34, fill: C.white });
  PhaseCue(g, at('suelta5'), ['ESFUERZO · SUELTA EL AIRE', 'INSPIRA'], t => { const q = ((t - at('solucion5')) % 7 + 7) % 7; return q < 4 ? 0 : 1; }, { cx: 1300, cy: 560, size: 34 });
});

// 7. mistake 3: believing walking is enough → also strength and balance; they complement walks
scene(svg, at('tercer5'), at('objetivo5'), g => {
  pan(g, 'e_parque', 'left', { from: [0.5, 0.4], to: [0.5, 0.5] });
  tag(g, 'ERROR 3', at('tercer5'), { x: 90, y: 70 });
  chip(g, '«CAMINAR ES SUFICIENTE»', at('tercer5') + 1, { cx: 1510, cy: 200, size: 32, fill: C.white });
  mark(g, 'EXCELENTE PARA EL CORAZÓN', true, at('excelente5'), { cx: 1510, cy: 350, size: 28 });
  chip(g, '+ FUERZA', at('fortalecer5'), { cx: 1400, cy: 510, size: 40, fill: TEAL, color: C.white });
  chip(g, '+ EQUILIBRIO', at('fortalecer5') + 1.5, { cx: 1620, cy: 620, size: 40, fill: TEAL, color: C.white });
  chip(g, 'COMPLEMENTAN, NO SUSTITUYEN', at('complementan5'), { cx: 1510, cy: 780, size: 28, fill: C.amber });
  source(g, 'Programa Otago: fuerza + equilibrio reducen las caídas en personas mayores', at('fortalecer5'));
});

// 8. the goal isn't training harder but moving more safely; never change your BP doses yourself
scene(svg, at('objetivo5'), at('independencia5') - 1.5, g => {
  mark(g, 'ENTRENAR MÁS FUERTE', false, at('objetivo5') + 1, { cy: 200, size: 44 });
  mark(g, 'MOVERTE CON MÁS SEGURIDAD', true, at('seguridad5'), { cy: 370, size: 44 });
  obj(g, 'corazon', at('dosis5') - 1.5, { cx: 960, cy: 620, fit: 240 });
  stamp(g, 'NUNCA CAMBIES TUS DOSIS POR TU CUENTA', at('dosis5'), { cx: 960, cy: 860, size: 48, color: C.red, rot: -3 });
}, { punch: [at('dosis5')] });

// 9. independence = the movements you practise + the mistakes you avoid
scene(svg, at('independencia5') - 1.5, at('llegar_c') - 0.3, g => {
  pan(g, 'f_levanta', 'full', { from: [0.5, 0.4], to: [0.5, 0.5] });
  cap(g, 'LO QUE PRACTICAS + LO QUE EVITAS', at('independencia5'), { hi: 'PRACTICAS', hiColor: '#7DE08E', size: 50 });
});
