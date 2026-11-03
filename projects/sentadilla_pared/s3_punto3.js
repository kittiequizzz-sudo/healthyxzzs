// PUNTO 3 — the second heart: calf muscles, especially the soleus under the gastrocnemius, push venous blood
// back up against gravity; valves stop backflow; calf contractions squeeze deep veins (sponge); sitting
// still slows the pump, walking/ankle moves keep it going; the wall sit works the thighs → add gentle heel
// raises separately; doesn't cure swelling/varicose veins; sudden swollen painful red leg → urgent care.

// 0. kicker
scene(svg, at('p3') - 0.3, at('musculo3'), g => {
  pan(g, 'g_soleo', 'full', { from: [0.5, 0.45], to: [0.5, 0.55] });
  kicker(g, 'PUNTO 3', 'EL SEGUNDO CORAZÓN\nDE TU CUERPO', at('p3'));
});

// 1. a muscle that silently sends blood back to the heart: not in the chest, no beats
scene(svg, at('musculo3'), at('pantorrillas3'), g => {
  obj(g, 'pantorrilla', at('musculo3') + 0.3, { cx: 520, cy: 520, fit: 720 });
  mark(g, 'NO ESTÁ EN EL PECHO', false, at('pecho3'), { cx: 1340, cy: 260, size: 34 });
  chip(g, 'CAMINAR · PUNTILLAS · TOBILLOS', at('puntillas3'), { cx: 1340, cy: 420, size: 28, fill: C.white });
  chip(g, 'PIERNAS MÁS LIGERAS AL FINAL DEL DÍA', at('sorprendente3') + 1, { cx: 1340, cy: 580, size: 26, fill: C.amber });
});

// 2. the calves, especially the soleus under the gastrocnemius: "the second heart"
scene(svg, at('pantorrillas3'), at('gravedad3'), g => {
  pan(g, 'g_soleo', 'left', { from: [0.55, 0.5], to: [0.6, 0.6], zoom: 0.12 });
  chip(g, 'LAS PANTORRILLAS', at('pantorrillas3'), { cx: 1510, cy: 220, size: 38, fill: C.ink, color: C.amber });
  stamp(g, 'SÓLEO', at('soleo3'), { cx: 1510, cy: 380, size: 70, color: C.red, rot: -4 });
  chip(g, 'DEBAJO DE LOS GEMELOS', at('gemelos3'), { cx: 1510, cy: 540, size: 32, fill: C.white });
  chip(g, '«EL SEGUNDO CORAZÓN»', at('segundo3'), { cx: 1510, cy: 680, size: 36, fill: C.red, color: C.white });
  arrow(g, 1260, 380, 900, 620, at('soleo3') + 0.3, { color: C.ink, w: 9 });
}, { punch: [at('soleo3')] });

// 3. gravity: blood must climb back up; valves stop it falling; calf contractions squeeze the deep veins
scene(svg, at('gravedad3'), at('esponja3'), g => {
  pan(g, 'g_valvulas', 'left', { from: [0.5, 0.5], to: [0.7, 0.5] });
  chip(g, 'LA GRAVEDAD', at('gravedad3') + 0.3, { cx: 1510, cy: 220, size: 40, fill: C.ink, color: C.amber });
  chip(g, 'LA SANGRE DEBE SUBIR', at('arriba3') - 0.5, { cx: 1510, cy: 350, size: 34, fill: C.white });
  chip(g, 'VÁLVULAS: SIN RETROCESO', at('valvulas3'), { cx: 1510, cy: 480, size: 32, fill: C.white });
  chip(g, 'LA PANTORRILLA COMPRIME', at('comprimen3') - 1, { cx: 1510, cy: 620, size: 32, fill: C.red, color: C.white });
  chip(g, '→ RETORNO VENOSO', at('comprimen3') + 1, { cx: 1510, cy: 750, size: 36, fill: C.green, color: C.white });
});

// 4. like a sponge: squeeze → out, release → it refills; sitting still slows it, walking keeps it going
scene(svg, at('esponja3'), at('relacion3'), g => {
  tile(g, 'g_esponja', at('esponja3'), { x: 140, y: 150, w: 760, h: 500, label: 'COMO UNA ESPONJA' });
  tile(g, 'g_dormido', at('sentado3') - 0.3, { x: 1020, y: 150, w: 760, h: 500, label: 'SENTADO: LA BOMBA SE DUERME' });
  chip(g, 'CAMINAR Y MOVER LOS TOBILLOS LA ACTIVAN', at('caminar3'), { cy: 800, size: 36, fill: C.green, color: C.white });
});

// 5. the wall sit works mainly the thighs → add gentle heel raises, separately at first (balance, knees)
scene(svg, at('relacion3'), at('ejemplo3'), g => {
  Food(g, 'pared', at('relacion3') + 0.3, { cx: 500, cy: 380, r: 170, label: 'PARED → MUSLOS', fill: C.white });
  Sign(g, '+', at('talones3') - 0.3, { cx: 960, cy: 380, size: 140, color: C.ink });
  Food(g, 'pantorrilla', at('talones3'), { cx: 1420, cy: 380, r: 170, label: 'TALONES → PANTORRILLAS', fill: C.white, phase: 0.4 });
  chip(g, 'AL PRINCIPIO, POR SEPARADO', at('separado3'), { cy: 760, size: 42, fill: C.amber });
  chip(g, 'SI TIENES PROBLEMAS DE EQUILIBRIO O RODILLAS', at('separado3') + 1.5, { cy: 890, size: 30, fill: C.white });
});

// 6. heel raises at the wall: hands on the wall, body upright, heels up slowly, down with control
scene(svg, at('ejemplo3'), at('eso_si3'), g => {
  const idx = t => t < at('eleva3') ? 0 : CYCLE(at('eleva3'), [[1, 2.2], [2, 1.8]])(t);
  WallPoses(g, 'talones', at('ejemplo3'), { wallX: 420, floorY: 1000, h: 900, idx });
  chip(g, 'MANOS EN LA PARED · CUERPO ERGUIDO', at('ejemplo3') + 0.5, { cx: 1330, cy: 250, size: 26, fill: C.white });
  PhaseCue(g, at('eleva3'), ['SUBE LOS TALONES DESPACIO', 'BAJA CONTROLANDO'], t => idx(t) === 1 ? 0 : 1, { cx: 1330, cy: 420, size: 32 });
  chip(g, '→ ACTIVA LA BOMBA MUSCULAR', at('activa3'), { cx: 1330, cy: 590, size: 30, fill: C.green, color: C.white });
  mark(g, 'SIN PRISA NI ESFUERZO INTENSO', true, at('rapido3'), { cx: 1330, cy: 740, size: 26 });
});

// 7. it doesn't stop the heart working nor erase swelling or varicose veins; sudden swollen, painful, red leg → urgent (≥ 6 s)
scene(svg, at('eso_si3'), at('pregunta3'), g => {
  mark(g, 'NO ELIMINA HINCHAZÓN NI VARICES', false, at('varices3') - 0.5, { cy: 100, size: 34 });
  tile(g, 'k_medico', at('repentina3') - 0.5, { x: 120, y: 220, w: 760, h: 500 });
  warn(g, 'VALORACIÓN URGENTE', ['PIERNA HINCHADA DE REPENTE', '+ DOLOR O ENROJECIMIENTO'], at('repentina3'), { y: 260, w: 900, size: 40, cx: 1380 });
}, { punch: [at('urgente3')] });

// 8. heavy legs at the end of the day? tell me in the comments, and from which city
scene(svg, at('pregunta3'), at('p4') - 0.3, g => {
  tile(g, 'k_sofa', at('pregunta3'), { x: 410, y: 70, w: 1100, h: 600 });
  CTAlive(g, 'comment', '¿PIERNAS PESADAS AL FINAL DEL DÍA?', at('pesadas3') - 0.5, { y: 740 });
  chip(g, '¿DESDE QUÉ CIUDAD NOS VES?', at('ciudad3'), { cy: 960, size: 38, fill: C.amber });
});
