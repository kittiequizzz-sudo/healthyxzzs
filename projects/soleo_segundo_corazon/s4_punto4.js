// PUNTO 4 — el movimiento paso a paso: chair, posture, the seated heel raise, timing, 3 errors, safety.

// 0. kicker over the man checking a stable chair
scene(svg, at('p4') - 0.3, at('llegado'), g => {
  pan(g, 'e_silla', 'full', { from: [0.3, 0.4], to: [0.45, 0.5] });
  kicker(g, 'PUNTO 4', 'EL MOVIMIENTO\nPASO A PASO', at('p4'));
});

// 1. pay attention: posture, speed and control make the difference
scene(svg, at('llegado'), at('silla4'), g => {
  heelRaise(g, at('llegado'), { cx: 560, floor: 1020, h: 900, period: 4.6 });
  chip(g, 'PRESTA ATENCIÓN', at('atencion4'), { cx: 1350, cy: 200, size: 48, fill: C.ink, color: C.amber });
  chip(g, '1 · POSTURA', at('postura'), { cx: 1350, cy: 380, size: 50 });
  chip(g, '2 · VELOCIDAD', at('velocidad'), { cx: 1350, cy: 530, size: 50, phase: 0.3 });
  chip(g, '3 · CONTROL', at('control4'), { cx: 1350, cy: 680, size: 50, phase: 0.6 });
  chip(g, 'MARCAN LA DIFERENCIA', at('control4') + 2.5, { cx: 1350, cy: 860, size: 40, fill: C.green, color: C.white });
});

// 2. a stable chair, with a backrest, no wheels
scene(svg, at('silla4'), at('sientate'), g => {
  pan(g, 'e_silla', 'left', { from: [0.55, 0.6], to: [0.6, 0.45] });
  mark(g, 'SILLA ESTABLE', true, at('silla4') + 1.5, { cx: 1510, cy: 300, size: 42 });
  mark(g, 'CON RESPALDO', true, at('respaldo'), { cx: 1510, cy: 480, size: 42 });
  mark(g, 'SIN RUEDAS', true, at('ruedas'), { cx: 1510, cy: 660, size: 42 });
});

// 3. sit: back straight, shoulders relaxed, knees ~90°, feet flat, hip-width apart
scene(svg, at('sientate'), at('accesorio'), g => {
  const hr = heelRaise(g, at('sientate'), { cx: 700, floor: 1020, h: 900, fixed: 10, glow: false });
  const X = px => hr.x + px * hr.s, Y = py => hr.y + py * hr.s;
  const draw = (d, t0, col = C.green) => {
    const p = el('path', { d, fill: 'none', stroke: col, 'stroke-width': 10, 'stroke-linecap': 'round', 'stroke-dasharray': '1 1' }, g);
    const len = p.getTotalLength() + 2;
    set(p, { 'stroke-dasharray': len + ' ' + len });
    anim(t => set(p, { 'stroke-dashoffset': len * (1 - E.out(prog(t, t0, t0 + 0.7))), opacity: t < t0 ? 0 : 0.6 + 0.4 * Math.sin(t * 4) ** 2 }));
  };
  draw(`M${X(28)} ${Y(190)} L${X(30)} ${Y(480)}`, at('espalda'));
  draw(`M${X(95)} ${Y(170)} L${X(95)} ${Y(225)} M${X(70)} ${Y(205)} L${X(95)} ${Y(228)} L${X(120)} ${Y(205)}`, at('hombros'), C.blue);
  const kx = X(325), ky = Y(495), rr = 70;
  draw(`M${kx - rr} ${ky} A${rr} ${rr} 0 0 0 ${kx - 12} ${ky + rr}`, at('rodillas'), C.orange);
  draw(`M${X(240)} ${Y(772)} L${X(405)} ${Y(772)}`, at('coloca'), C.green);
  chip(g, 'ESPALDA ERGUIDA', at('espalda'), { cx: 1450, cy: 230, size: 44 });
  chip(g, 'HOMBROS RELAJADOS', at('hombros'), { cx: 1450, cy: 390, size: 44, fill: C.blue, color: C.white });
  chip(g, 'RODILLAS ≈ 90°', at('rodillas'), { cx: 1450, cy: 550, size: 44, fill: C.amber });
  chip(g, 'PIES APOYADOS', at('coloca'), { cx: 1450, cy: 710, size: 44, fill: C.green, color: C.white });
  chip(g, 'ANCHURA DE CADERAS', at('caderas'), { cx: 1450, cy: 870, size: 40 });
});

// 4. no equipment: while watching TV or listening to music
scene(svg, at('accesorio'), at('comienza'), g => {
  chip(g, 'SIN ACCESORIOS', at('accesorio'), { cy: 130, size: 50, fill: C.ink, color: C.amber });
  tile(g, 'e_tv', at('television4') - 0.4, { x: 110, y: 260, w: 800, h: 520, label: 'VIENDO LA TELE' });
  tile(g, 'e_musica', at('musica') - 0.4, { x: 1010, y: 260, w: 800, h: 520, label: 'CON MÚSICA' });
});

// 5. the move: toes stay on the floor, slowly lift both heels, no pain (close on the feet)
scene(svg, at('comienza'), at('contraccion4'), g => {
  chip(g, 'AHORA, EL MOVIMIENTO', at('comienza'), { cx: 1400, cy: 160, size: 46, fill: C.ink, color: C.amber });
  const hr = heelRaise(g, at('comienza'), { cx: 536, floor: 946, h: 1500, period: 5.5, start: -0.5, fixed: t => t < at('puntas') ? 10 : null });
  const ring = el('circle', { cx: hr.x + 385 * hr.s, cy: hr.y + 752 * hr.s, r: 80, fill: 'none', stroke: C.green, 'stroke-width': 10, opacity: 0 }, g);
  anim(t => set(ring, { opacity: t < at('dedos') + 0.4 ? 0 : 1, r: 80 + 8 * Math.sin(t * 5) }));
  chip(g, 'PUNTAS EN EL SUELO', at('dedos') + 0.4, { cx: 1400, cy: 340, size: 46, fill: C.green, color: C.white });
  chip(g, 'ELEVA LOS TALONES', at('eleva'), { cx: 1400, cy: 520, size: 46, fill: C.amber });
  chip(g, 'LENTAMENTE', at('eleva') + 1, { cx: 1400, cy: 680, size: 46 });
  chip(g, 'SIN DOLOR', at('eleva') + 3.2, { cx: 1400, cy: 840, size: 46, fill: C.white, phase: 0.4 });
});

// 6. a light contraction in the calves — no forcing, no exaggerated height; natural and controlled
scene(svg, at('contraccion4'), at('manten'), g => {
  heelRaise(g, at('contraccion4'), { cx: 580, floor: 1020, h: 900, period: 4.6, start: 1 });
  chip(g, 'LIGERA CONTRACCIÓN', at('contraccion4'), { cx: 1380, cy: 220, size: 44, fill: C.red, color: C.white });
  mark(g, 'FORZAR EL TOBILLO', false, at('forzar'), { cx: 1380, cy: 400, size: 40 });
  mark(g, 'ALTURA EXAGERADA', false, at('forzar') + 1.6, { cx: 1380, cy: 560, size: 40 });
  mark(g, 'NATURAL Y CONTROLADO', true, at('natural'), { cx: 1380, cy: 740, size: 40 });
});

// 7. hold 1–2 s at the top, lower gently, never let them drop
scene(svg, at('manten') - 0.3, at('repite'), g => {
  const up = at('manten') + 0.2, down = at('bajalos');
  heelRaise(g, at('manten') - 0.3, { cx: 580, floor: 1020, h: 900, period: 4.6, fixed: t => t < up ? 11 : t < down ? 12 : t < down + 1.2 ? 11 : t < at('golpe') - 0.2 ? 13 : null, start: 3.8 });
  const sw = Stopwatch(g, { cx: 1380, cy: 330, r: 140, total: 2 });
  const L = Live(g, { t0: at('manten'), cx: 1380, cy: 330, idle: 'bob' });
  L.g.appendChild(sw.g);
  anim(t => sw.draw(clamp(t - up, 0, 2.05)));
  chip(g, 'MANTÉN 1 – 2 SEGUNDOS', at('manten') + 0.6, { cx: 1380, cy: 560, size: 42, fill: C.amber });
  chip(g, 'BAJA SUAVEMENTE', at('bajalos'), { cx: 1380, cy: 710, size: 42, fill: C.green, color: C.white });
  mark(g, 'DEJARLOS CAER DE GOLPE', false, at('golpe'), { cx: 1380, cy: 860, size: 36 });
});

// 8. repeat with calm breathing — don't clench the belly or hold your breath
scene(svg, at('repite'), at('primera'), g => {
  heelRaise(g, at('repite'), { cx: 560, floor: 1020, h: 900, period: 5 });
  Breath(g, at('repite') + 1, { cx: 1380, cy: 400, r: 170, period: 5 });
  chip(g, 'RESPIRA TRANQUILO', at('repite') + 1.5, { cx: 1380, cy: 680, size: 44, fill: C.blue, color: C.white });
  mark(g, 'CONTENER EL AIRE', false, at('contener'), { cx: 1380, cy: 840, size: 40 });
});

// 9. first time: 1–2 minutes; if comfortable, up to 5, with small breaks
scene(svg, at('primera'), at('no_existe'), g => {
  heelRaise(g, at('primera'), { cx: 330, floor: 1000, h: 720, period: 4.6 });
  chip(g, 'LA PRIMERA VEZ', at('primera'), { cx: 1180, cy: 160, size: 48, fill: C.ink, color: C.amber });
  const L = Live(g, { t0: at('minutos12') - 0.3, cx: 1180, cy: 480, enter: 'r', idle: 'none' });
  const bar = Bar(L.g, { x: 700, y: 440, w: 1000, h: 90, color: C.green });
  for (let m = 0; m <= 5; m++) { el('line', { x1: 706 + m * 197.6, y1: 545, x2: 706 + m * 197.6, y2: 570, stroke: C.ink, 'stroke-width': 5 }, L.g); Text(L.g, m + '′', { x: 706 + m * 197.6, y: 605, size: 34 }); }
  const breaks = [2, 3.4].map(m => el('rect', { x: 700 + m * 197.6, y: 440, width: 14, height: 90, fill: C.cream, opacity: 0 }, L.g));
  anim(t => {
    bar.draw(0.4 * E.inOut(prog(t, at('minutos12'), at('minutos12') + 1.5)) + 0.6 * E.inOut(prog(t, at('cinco_min') - 1, at('cinco_min') + 1.5)));
    breaks.forEach(b => set(b, { opacity: t > at('pausas4') ? 1 : 0 }));
  });
  chip(g, 'EMPIEZA CON 1 – 2 MIN', at('minutos12'), { cx: 1000, cy: 330, size: 40, fill: C.green, color: C.white });
  chip(g, 'HASTA 5 MIN', at('cinco_min'), { cx: 1500, cy: 760, size: 48, fill: C.amber });
  chip(g, 'CON PAUSAS', at('pausas4'), { cx: 1000, cy: 760, size: 40 });
});

// 10. no exact number of reps guarantees benefits; the key: move without discomfort
scene(svg, at('no_existe'), at('probarlo'), g => {
  pan(g, 'e_pareja', 'left', { from: [0.3, 0.4], to: [0.6, 0.5] });
  chip(g, 'NO HAY UN NÚMERO MÁGICO', at('no_existe'), { cx: 1510, cy: 300, size: 32, fill: C.amber });
  mark(g, 'MOVERTE SIN MOLESTIAS', true, at('clave'), { cx: 1510, cy: 480, size: 32 });
  mark(g, 'NO PASAR HORAS INMÓVIL', true, at('clave') + 2.5, { cx: 1510, cy: 640, size: 32 });
});

// 11. after dinner or any time; after a big meal, wait until you feel ready
scene(svg, at('probarlo'), at('errores'), g => {
  const ck = Clock(g, { cx: 560, cy: 470, r: 220, night: true });
  const L = Live(g, { t0: at('probarlo'), cx: 560, cy: 470, idle: 'bob' });
  L.g.appendChild(ck.g);
  anim(t => ck.draw(21 + 1.5 * prog(t, at('probarlo'), at('errores'))));
  const P = Live(g, { t0: at('abundante') - 0.3, cx: 560, cy: 850, enter: 'pop', idle: 'bob', phase: 0.4 });
  Icon.plate(P.g, 480, 770, 1.6);
  chip(g, 'DESPUÉS DE CENAR', at('probarlo') + 0.4, { cx: 1380, cy: 260, size: 46 });
  chip(g, 'O EN CUALQUIER MOMENTO', at('cualquier_momento'), { cx: 1380, cy: 420, size: 40, phase: 0.3 });
  chip(g, '¿COMIDA ABUNDANTE?', at('abundante'), { cx: 1380, cy: 620, size: 44, fill: C.amber });
  chip(g, 'ESPERA A SENTIRTE BIEN', at('espera'), { cx: 1380, cy: 780, size: 40, fill: C.green, color: C.white });
});

// 12. three common errors
scene(svg, at('errores'), at('no_requiere'), g => {
  chip(g, '3 ERRORES FRECUENTES', at('errores'), { cy: 120, size: 52, fill: C.red, color: C.white });
  [['x_puntas', 'LEVANTAR LAS PUNTAS', 'err1', 60], ['x_rebote', 'REBOTES RÁPIDOS', 'err2', 680], ['x_respira', 'AGUANTAR EL AIRE', 'err3', 1300]].forEach(([n, s, k, x]) => {
    tile(g, n, at(k) - 0.3, { x, y: 250, w: 560, h: 420, zoom: 0.2, from: [0.5, 0.5], to: [0.5, 0.7] });
    mark(g, s, false, at(k) + 0.3, { cx: x + 280, cy: 780, size: 30 });
  });
});

// 13. no maximum force, no pain
scene(svg, at('no_requiere'), at('problemas4'), g => {
  pan(g, 'x_bien', 'full', { from: [0.45, 0.4], to: [0.5, 0.6] });
  mark(g, 'SIN FUERZA MÁXIMA', true, at('no_requiere') + 0.8, { cx: 1300, cy: 220, size: 40 });
  mark(g, 'SIN DOLOR', true, at('no_requiere') + 2.4, { cx: 1300, cy: 360, size: 40 });
});

// 14. check first with a professional if…
scene(svg, at('problemas4'), at('ante'), g => {
  warn(g, 'CONSULTA PRIMERO SI TIENES', ['PROBLEMAS CIRCULATORIOS', 'UNA LESIÓN RECIENTE', 'UNA ENFERMEDAD CARDÍACA'], at('problemas4'), { y: 150 });
  chip(g, '→ PROFESIONAL SANITARIO', at('consulta4'), { cx: 960, cy: 840, size: 50, fill: C.amber });
});

// 15. sudden pain or swelling in one leg: don't exercise until a doctor has seen it (≥ 6 s)
scene(svg, at('ante'), at('fundamental'), g => {
  pan(g, 'q_tobillo', 'left', { from: [0.6, 0.65], to: [0.55, 0.45] });
  chip(g, 'DOLOR O HINCHAZÓN', at('ante'), { cx: 1510, cy: 260, size: 40, fill: C.red, color: C.white });
  chip(g, 'REPENTINA EN UNA PIERNA', at('ante') + 0.4, { cx: 1510, cy: 380, size: 34, fill: C.red, color: C.white });
  mark(g, 'NO HAGAS EL EJERCICIO', false, at('ante') + 2.5, { cx: 1510, cy: 560, size: 36 });
  chip(g, '→ VALORACIÓN MÉDICA', at('ante') + 4.2, { cx: 1510, cy: 730, size: 42, fill: C.amber });
}, { punch: [at('ante') + 2.5] });

// 16. heel raises complement your activity — they don't replace walks
scene(svg, at('fundamental'), at('tres_habitos'), g => {
  chip(g, 'ALGO FUNDAMENTAL', at('fundamental'), { cy: 110, size: 48, fill: C.ink, color: C.amber });
  heelRaise(g, at('fundamental') + 0.3, { cx: 420, floor: 960, h: 700, period: 4.6 });
  const plus = Live(g, { t0: at('complementar'), cx: 860, cy: 560, enter: 'pop', idle: 'breathe' });
  Text(plus.g, '+', { x: 860, y: 560, size: 160, color: C.green });
  tile(g, 'h_paseo', at('complementar') + 0.2, { x: 1030, y: 280, w: 760, h: 500 });
  mark(g, 'LO COMPLEMENTAN', true, at('complementar') + 0.6, { cx: 1410, cy: 880, size: 36 });
  chip(g, 'NO SUSTITUYEN LOS PASEOS', at('sustituyen'), { cx: 700, cy: 1010, size: 34, fill: C.red, color: C.white });
});

// 17. three habits are coming next
scene(svg, at('tres_habitos'), at('p5') - 0.3, g => {
  [1, 2, 3].forEach((n, i) => {
    const cx = 560 + i * 400, L = Live(g, { t0: at('tres_habitos') + 1 + i * 0.6, cx, cy: 460, enter: 'pop', idle: 'bob', phase: i * 0.3 });
    el('circle', { cx: cx + 8, cy: 470, r: 140, fill: C.ink }, L.g);
    el('circle', { cx, cy: 460, r: 140, fill: [C.blue, C.amber, C.green][i], stroke: C.ink, 'stroke-width': 8 }, L.g);
    Text(L.g, String(n), { x: cx, y: 465, size: 150, color: C.white });
  });
  cap(g, '3 HÁBITOS PARA MEJORARLO', at('tres_habitos') + 0.4, { cy: 820, size: 60, hi: '3 HÁBITOS' });
});
