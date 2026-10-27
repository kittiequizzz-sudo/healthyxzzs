// PUNTO 1 — heel raises: calves (gastrocnemius + soleus) = "second heart"; gravity pools blood when
// sitting; calf squeezes deep veins (venous return); after 60 less effective; how to do it (chair against
// a wall, 2 s up / 3 s down, 15–20 reps, breathe out going up), seated version, limits, CTA.

// 0. kicker
scene(svg, at('p1') - 0.3, at('musculo1'), g => {
  pan(g, 'd_escalera', 'full', { from: [0.5, 0.45], to: [0.5, 0.6] });
  kicker(g, 'EJERCICIO 1', 'ELEVACIONES DE TALONES\nDESPIERTA TU «SEGUNDO CORAZÓN»', at('p1'));
});

// 1. a muscle that works silently: walking, a step, standing
scene(svg, at('musculo1'), at('refiero1'), g => {
  chip(g, 'UN MÚSCULO QUE TRABAJA EN SILENCIO', at('musculo1') + 0.3, { cy: 90, size: 44, fill: C.ink, color: C.amber });
  tile(g, 'd_calle', at('caminas1') - 0.2, { x: 70, y: 200, w: 570, h: 380, label: 'CAMINAR' });
  tile(g, 'd_escalera', at('escalon1') - 0.2, { x: 675, y: 200, w: 570, h: 380, label: 'SUBIR UN ESCALÓN' });
  tile(g, 'd_mercado', at('de_pie1') - 0.2, { x: 1280, y: 200, w: 570, h: 380, label: 'ESTAR DE PIE' });
  chip(g, 'MARCA LA DIFERENCIA AL LEVANTARTE', at('diferencia1'), { cy: 820, size: 40, fill: C.white });
});

// 2. the calves: gastrocnemius and soleus — "the second heart"
scene(svg, at('refiero1'), at('sentado1'), g => {
  obj(g, 'pantorrilla', at('refiero1'), { cx: 560, cy: 540, fit: 820, amp: 0.4 });
  chip(g, 'GEMELOS', at('gemelos1'), { cx: 1350, cy: 260, size: 52, fill: C.white });
  chip(g, 'SÓLEO', at('soleo1'), { cx: 1350, cy: 400, size: 52, fill: C.white });
  arrow(g, 1130, 280, 760, 380, at('gemelos1') + 0.2, { color: C.ink, w: 9 });
  arrow(g, 1160, 420, 790, 620, at('soleo1') + 0.2, { color: C.ink, w: 9 });
  heart(g, at('segundo1') - 0.4, 1350, 640, 220);
  chip(g, '«EL SEGUNDO CORAZÓN»', at('segundo1'), { cx: 1350, cy: 860, size: 48, fill: C.red, color: C.white });
}, { punch: [at('segundo1')] });

// 3. sitting a long time: gravity pools blood in the legs
scene(svg, at('sentado1'), at('moverte1'), g => {
  pan(g, 'd_tele', 'left', { from: [0.45, 0.45], to: [0.5, 0.55] });
  chip(g, 'MUCHO TIEMPO SENTADO', at('sentado1') + 0.8, { cx: 1510, cy: 220, size: 36, fill: C.white });
  chip(g, 'GRAVEDAD ↓', at('gravedad1'), { cx: 1510, cy: 360, size: 46, fill: C.ink, color: C.white });
  tile(g, 'c_piernas', at('acumularse1') - 0.3, { x: 1240, y: 470, w: 540, h: 360 });
  chip(g, 'LA SANGRE SE ACUMULA', at('acumularse1') + 0.4, { cx: 1510, cy: 900, size: 34, fill: C.red, color: C.white });
});

// 4. moving: calves contract, squeeze the deep veins, push blood back up (venous return)
scene(svg, at('moverte1'), at('sesenta1'), g => {
  pan(g, 'c_bomba', 'left', { from: [0.25, 0.5], to: [0.6, 0.5], zoom: 0.07 });
  flow(g, 'M1228 950 C1228 700 1228 450 1228 130', at('comprimen1'), { n: 7, period: 2.6, line: VEIN });
  chip(g, 'LAS PANTORRILLAS SE CONTRAEN', at('moverte1') + 1, { cx: 1560, cy: 250, size: 30, fill: C.white });
  chip(g, 'COMPRIMEN LAS VENAS PROFUNDAS', at('comprimen1'), { cx: 1560, cy: 420, size: 28, fill: C.white });
  chip(g, '↑ SANGRE HACIA EL CORAZÓN', at('impulsar1'), { cx: 1560, cy: 590, size: 32, fill: C.red, color: C.white });
  chip(g, 'RETORNO VENOSO', at('retorno1'), { cx: 1560, cy: 760, size: 44, fill: VEIN, color: C.white });
  chip(g, 'Y SE PUEDE ESTIMULAR', at('sencillo1'), { cx: 1560, cy: 900, size: 32, fill: C.green, color: C.white });
});

// 5. after 60: hours sitting + less muscle → the pump works less well
scene(svg, at('sesenta1'), at('activar1'), g => {
  chip(g, 'DESPUÉS DE LOS 60', at('sesenta1'), { cy: 100, size: 52, fill: C.ink, color: C.amber });
  obj(g, 'pantorrilla', at('sesenta1') + 0.4, { cx: 480, cy: 560, fit: 700, amp: 0.4 });
  chip(g, 'MUCHAS HORAS SENTADO', at('horas1'), { cx: 1350, cy: 290, size: 40, fill: C.white });
  chip(g, 'MENOS FUERZA MUSCULAR', at('fuerza1'), { cx: 1350, cy: 420, size: 40, fill: C.white });
  gauge(g, at('eficacia1') - 0.4, { cx: 1350, cy: 800, r: 200, label: 'BOMBA' }, t => 0.78 - 0.45 * E.inOut(prog(t, at('eficacia1'), at('eficacia1') + 1.5)));
});

// 6. so: ankle mobility, leg circulation, movement control
scene(svg, at('activar1'), at('practicar1'), g => {
  obj(g, 'zapatillas', at('activar1') + 0.2, { cx: 500, cy: 520, fit: 620 });
  chip(g, 'ACTIVA TUS PANTORRILLAS', at('activar1') + 0.4, { cx: 1350, cy: 200, size: 40, fill: C.ink, color: C.amber });
  mark(g, 'MOVILIDAD DE TOBILLOS', true, at('tobillos1'), { cx: 1350, cy: 380, size: 36 });
  mark(g, 'CIRCULACIÓN DE LAS PIERNAS', true, at('favorecer1'), { cx: 1350, cy: 530, size: 32 });
  mark(g, 'CONTROL DE TUS MOVIMIENTOS', true, at('control1'), { cx: 1350, cy: 680, size: 32 });
});

// 7. let's practise: a firm chair, against a wall
scene(svg, at('practicar1'), at('detras1'), g => {
  cap(g, 'VAMOS A PRACTICARLO', at('practicar1'), { cy: 110, hi: 'PRACTICARLO' });
  obj(g, 'silla', at('firme1') - 0.3, { cx: 640, cy: 580, fit: 600, amp: 0.3 });
  mark(g, 'UNA SILLA FIRME', true, at('firme1'), { cx: 1350, cy: 450, size: 44 });
  mark(g, 'CONTRA LA PARED', true, at('pared1'), { cx: 1350, cy: 620, size: 44 });
});

// 8. stand behind it: feet hip-width, hands on the backrest, back straight, look ahead
scene(svg, at('detras1'), at('eleva1'), g => {
  Poses(g, 'talones', at('detras1'), { cx: 560, cy: 560, h: 820 });
  chip(g, 'DE PIE, DETRÁS DE LA SILLA', at('detras1') + 0.4, { cx: 1350, cy: 170, size: 36, fill: C.ink, color: C.amber });
  mark(g, 'PIES A LA ANCHURA DE LAS CADERAS', true, at('caderas1'), { cx: 1330, cy: 330, size: 28 });
  mark(g, 'MANOS EN EL RESPALDO', true, at('respaldo1'), { cx: 1330, cy: 470, size: 32 });
  mark(g, 'ESPALDA ERGUIDA', true, at('espalda1'), { cx: 1330, cy: 610, size: 34 });
  mark(g, 'MIRADA AL FRENTE', true, at('mirada1'), { cx: 1330, cy: 750, size: 34 });
});

// 9. raise the heels slowly (no need to go high), hold 2 s, lower in 3 s
scene(svg, at('eleva1'), at('repite1'), g => {
  Poses(g, 'talones', at('eleva1'), { cx: 560, cy: 560, h: 820, enter: 'none',
    idx: KEYS([[0, 0], [at('eleva1') + 0.6, 1], [at('baja1') + 0.3, 0]]) });
  chip(g, 'SUBE LOS TALONES DESPACIO', at('eleva1') + 0.3, { cx: 1350, cy: 170, size: 34, fill: C.ink, color: C.amber });
  chip(g, 'SIN SUBIR DEMASIADO', at('exagerada1'), { cx: 1350, cy: 300, size: 36, fill: C.white });
  const S = Stopwatch(g, { cx: 1350, cy: 560, r: 130, total: 2 });
  const L = Live(g, { t0: at('manten1'), cx: 1350, cy: 560, enter: 'pop', idle: 'none' });
  L.g.appendChild(S.g);
  anim(t => S.draw(t - at('manten1') - 0.3));
  chip(g, 'MANTÉN 2 SEGUNDOS', at('manten1') + 0.4, { cx: 1350, cy: 770, size: 36, fill: TEAL, color: C.white });
  chip(g, 'BAJA EN 3 SEGUNDOS', at('baja1'), { cx: 1350, cy: 900, size: 36, fill: C.white });
});

// 10. 15–20 reps; breathe out going up, in going down; never hold your breath (hypertension)
scene(svg, at('repite1'), at('seguro1'), g => {
  const idx = CYCLE(at('repite1'), [[0, 1.2], [1, 2.4], [0, 2.4]]);
  Poses(g, 'talones', at('repite1'), { cx: 520, cy: 560, h: 820, enter: 'none', idx });
  RepCounter(g, at('repite1') + 0.2, { cx: 1300, cy: 300, period: 6, total: '15–20', max: 20 });
  PhaseCue(g, at('subes1'), ['SUBES · SUELTA EL AIRE', 'BAJAS · INSPIRA'], t => idx(t) === 1 ? 0 : 1, { cx: 1300, cy: 650, size: 34 });
  mark(g, 'CONTENER LA RESPIRACIÓN', false, at('nunca1'), { cx: 1300, cy: 800, size: 30 });
  chip(g, 'SOBRE TODO SI TIENES HIPERTENSIÓN', at('hipertension1'), { cx: 1300, cy: 930, size: 28, fill: C.amber });
});

// 11. not confident standing? same movement seated, toes on the floor
scene(svg, at('seguro1'), at('estabilizan1'), g => {
  const idx = CYCLE(at('mismo1'), [[2, 1.4], [3, 2.2], [2, 1.4]]);
  Poses(g, 'talones', at('seguro1'), { cx: 560, cy: 560, h: 820, idx });
  chip(g, '¿NO TE SIENTES SEGURO DE PIE?', at('seguro1') + 0.3, { cx: 1350, cy: 220, size: 32, fill: C.white });
  chip(g, 'HAZLO SENTADO', at('mismo1'), { cx: 1350, cy: 380, size: 52, fill: C.green, color: C.white });
  chip(g, 'PUNTAS EN EL SUELO', at('puntas1'), { cx: 1350, cy: 540, size: 40, fill: C.white });
  chip(g, 'SUBE Y BAJA DESPACIO', at('puntas1') + 2, { cx: 1350, cy: 680, size: 36, fill: C.white });
});

// 12. also trains ankle stabilisers; but doesn't remove dizziness nor replace a medical check
scene(svg, at('estabilizan1'), at('cuestion1'), g => {
  obj(g, 'pantorrilla', at('estabilizan1') + 0.2, { cx: 460, cy: 540, fit: 760, amp: 0.4 });
  chip(g, 'TOBILLOS MÁS ESTABLES', at('estabilizan1') + 1, { cx: 1300, cy: 220, size: 44, fill: C.green, color: C.white });
  chip(g, 'CORRIGES PEQUEÑOS DESEQUILIBRIOS', at('corregir1'), { cx: 1300, cy: 360, size: 30, fill: C.white });
  mark(g, 'NO ELIMINA LOS MAREOS', false, at('eso_si1') + 0.3, { cx: 1300, cy: 560, size: 36 });
  mark(g, 'NO SUSTITUYE AL MÉDICO', false, at('sustituye1'), { cx: 1300, cy: 710, size: 36 });
});

// 13. calves are only the beginning: other muscles hold you up when you stand
scene(svg, at('cuestion1'), at('util1'), g => {
  pan(g, 'l_intenta', 'full', { from: [0.45, 0.4], to: [0.5, 0.5] });
  cap(g, 'LAS PANTORRILLAS: SOLO EL COMIENZO', at('comienzo1') - 0.6, { hi: 'SOLO EL COMIENZO', size: 50, t1: at('otros1') + 0.5 });
  cap(g, '¿QUÉ MÚSCULOS TE SOSTIENEN?', at('otros1') + 0.5, { hi: '¿QUÉ MÚSCULOS', size: 50 });
});

// 14. comment "PIERNAS FIRMES"
scene(svg, at('util1'), at('p2') - 0.3, g => {
  Poses(g, 'talones', at('util1'), { cx: 960, cy: 380, h: 560, idx: CYCLE(at('util1'), [[0, 1.2], [1, 2.4], [0, 2.4]]) });
  CTAlive(g, 'comment', 'ESCRIBE «PIERNAS FIRMES»', at('firmes1') - 0.3, { y: 760 });
});
