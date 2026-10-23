// INTRO (0 → Punto 1). Hook: heart → hidden muscle in the legs → seated heel raise → the evening sofa.
// Heart that beats (scale pulse ~70 bpm) on top of its idle bob.
function beating(L, cx, cy, k = 0.07) {
  anim(t => {
    const b = 1 + k * Math.pow(Math.sin(Math.PI * ((t % 0.85) / 0.85)), 8);
    L.g.setAttribute('transform', `translate(${cx} ${cy}) scale(${b.toFixed(4)}) translate(${-cx} ${-cy})`);
  });
  return L;
}

// 0. your heart is not the only one working
scene(svg, -1, at('existe'), g => {
  const glow = el('circle', { cx: 960, cy: 470, r: 260, fill: C.red, opacity: 0.12 }, g);
  anim(t => set(glow, { r: 250 + 25 * Math.pow(Math.sin(Math.PI * ((t % 0.85) / 0.85)), 8) }));
  beating(obj(g, 'corazon', 0, { cx: 960, cy: 470, fit: 480, idle: 'none' }), 960, 470);
  cap(g, 'TU CORAZÓN NO TRABAJA SOLO', 0.4, { hi: 'NO TRABAJA SOLO' });
}, { punch: [at('existe') - 3.2] });

// 1. another muscle, hidden in your legs
scene(svg, at('existe'), at('sorprendente'), g => {
  beating(obj(g, 'corazon', at('existe'), { cx: 520, cy: 330, fit: 320, enter: 'l', idle: 'none' }), 520, 330);
  obj(g, 'pierna', at('piernas0'), { cx: 1360, cy: 520, fit: 640, enter: 'r' });
  const ring = el('ellipse', { cx: 1380, cy: 440, rx: 120, ry: 190, fill: 'none', stroke: C.orange, 'stroke-width': 10, opacity: 0 }, g);
  anim(t => set(ring, { opacity: clamp(prog(t, at('piernas0') + 0.6, at('piernas0') + 0.9)), rx: 120 + 8 * Math.sin(t * 5), ry: 190 + 8 * Math.sin(t * 5) }));
  flow(g, 'M1300 700 C1100 760 760 700 600 470', at('piernas0') + 1, { n: 9, period: 2.6, line: VEIN });
  cap(g, 'OTRO MÚSCULO, EN TUS PIERNAS', at('existe') + 0.6, { hi: 'EN TUS PIERNAS' });
});

// 2. …and you can switch it on without getting up from the chair
scene(svg, at('sorprendente'), at('piensa'), g => {
  heelRaise(g, at('sorprendente'), { cx: 640, floor: 1020, h: 900, start: 0.6 });
  chip(g, 'SIN LEVANTARTE', at('silla0') - 0.6, { cx: 1380, cy: 420, size: 60, fill: C.amber });
  chip(g, 'DE LA SILLA', at('silla0'), { cx: 1380, cy: 580, size: 60, fill: C.ink, color: C.white });
}, { punch: [at('silla0')] });

// 3. every night: dinner is over, you clear the table
scene(svg, at('piensa'), at('sofa0'), g => {
  pan(g, 'n_platos', 'full', { from: [0.56, 0.5], to: [0.5, 0.36], base: 1.3, zoom: 0.12 });   // keeps the wine on the table out of frame
  const ck = Clock(g, { cx: 1590, cy: 190, r: 95, night: true });
  const L = Live(g, { t0: at('piensa') + 0.4, cx: 1590, cy: 190, idle: 'bob' });
  L.g.appendChild(ck.g);
  anim(t => ck.draw(21 + 0.6 * prog(t, at('piensa'), at('sofa0') + 6)));
  cap(g, 'CADA NOCHE…', at('piensa') + 0.2, { hi: 'NOCHE' });
});

// 4. the sofa, the TV: the perfect moment to rest
scene(svg, at('sofa0'), at('inmovil0'), g => {
  pan(g, 'n_sofa', 'full', { from: [0.6, 0.45], to: [0.45, 0.4] });
  cap(g, 'EL MOMENTO PERFECTO PARA DESCANSAR', at('descansar'), { size: 50, hi: 'DESCANSAR' });
});

// 5. while you stay still, the calves barely push the blood up
scene(svg, at('inmovil0'), at('organismo0'), g => {
  pan(g, 'q_pies', 'left', { from: [0.5, 0.65], to: [0.45, 0.55] });
  CalfPump(g, at('inmovil0') + 0.5, { cx: 1500, cy: 560, s: 0.68, mode: 'idle' });
  chip(g, 'INMÓVIL', at('inmovil0') + 0.6, { cx: 625, cy: 230, size: 56, fill: C.ink, color: C.white });
  chip(g, 'APENAS HAY IMPULSO', at('impulsar'), { cx: 1500, cy: 960, size: 38, fill: C.amber });
});

// 6. …and your body keeps working on the dinner's nutrients
scene(svg, at('organismo0'), at('cincuenta'), g => {
  pan(g, 'd_digestion', 'full', { from: [0.5, 0.3], to: [0.5, 0.6] });
  cap(g, 'TU CUERPO GESTIONA LA CENA', at('organismo0') + 0.8, { hi: 'LA CENA' });
});

// 7. from 50–60: too many hours sitting → circulation and metabolic health
scene(svg, at('cincuenta'), at('interesante0'), g => {
  chip(g, 'A PARTIR DE LOS 50 – 60 AÑOS', at('cincuenta'), { cy: 120, size: 50, fill: C.ink, color: C.amber });
  obj(g, 'silla', at('cincuenta') + 0.5, { cx: 560, cy: 560, fit: 520 });
  const ck = Clock(g, { cx: 1300, cy: 470, r: 170 });
  const L = Live(g, { t0: at('horas0') - 0.4, cx: 1300, cy: 470, idle: 'bob' });
  L.g.appendChild(ck.g);
  anim(t => ck.draw(19 + 4 * E.inOut(prog(t, at('horas0'), at('interesante0')))));
  chip(g, 'HORAS Y HORAS SENTADO', at('horas0'), { cx: 1300, cy: 720, size: 42, fill: C.white });
  chip(g, 'CIRCULACIÓN', at('circ0'), { cx: 1080, cy: 880, size: 40, fill: C.amber });
  chip(g, 'METABOLISMO', at('circ0') + 1.2, { cx: 1520, cy: 880, size: 40, fill: C.amber, phase: 0.5 });
});

// 8. no kilometres, no exhausting workouts — just start moving
scene(svg, at('interesante0'), at('profundo0'), g => {
  chip(g, 'LO INTERESANTE…', at('interesante0'), { cy: 130, size: 52, fill: C.ink, color: C.amber });
  obj(g, 'zapatillas', at('kilometros') - 0.3, { cx: 330, cy: 560, fit: 330 });
  mark(g, 'CAMINAR KILÓMETROS', false, at('kilometros'), { cx: 1080, cy: 330, enter: 'r' });
  mark(g, 'EJERCICIOS AGOTADORES', false, at('agotadores'), { cx: 1080, cy: 540, enter: 'r' });
  mark(g, 'EMPEZAR A MOVERTE', true, at('moverte0'), { cx: 1080, cy: 760, size: 52 });
}, { punch: [at('moverte0')] });

// 9. deep in your calves: the soleus, a kind of second heart
scene(svg, at('profundo0'), at('investigaciones0'), g => {
  pan(g, 's_anatomia', 'left', { from: [0.45, 0.35], to: [0.55, 0.55], zoom: 0.22 });
  chip(g, 'MÚSCULO SÓLEO', at('soleo0'), { cx: 1510, cy: 250, size: 56, fill: C.amber });
  chip(g, '«SEGUNDO CORAZÓN»', at('segundo0'), { cx: 1510, cy: 430, size: 48, fill: C.ink, color: C.white });
  arrow(g, 1510, 930, 1510, 600, at('segundo0') + 1, { color: VEIN, w: 16 });
  flow(g, 'M1450 940 L1450 600', at('segundo0') + 1, { n: 4, period: 1.8 });
  flow(g, 'M1570 940 L1570 600', at('segundo0') + 1.4, { n: 4, period: 1.8 });
}, { punch: [at('segundo0')] });

// 10. research: switching it on in a specific way may help glucose
scene(svg, at('investigaciones0'), at('hoy'), g => {
  pan(g, 's_cientifica', 'full', { from: [0.35, 0.5], to: [0.6, 0.4] });
  cap(g, 'INVESTIGACIONES SOBRE LA GLUCOSA', at('glucosa0') - 1.5, { size: 50, hi: 'GLUCOSA' });
});

// 11. today: the seated move · your circulation · your brain
scene(svg, at('hoy'), at('quedate'), g => {
  chip(g, 'HOY DESCUBRIRÁS', at('hoy'), { cy: 110, size: 50, fill: C.ink, color: C.amber });
  obj(g, 'silla', at('hoy') + 0.8, { cx: 560, cy: 330, fit: 210 });
  chip(g, 'UN MOVIMIENTO SENTADO', at('hoy') + 1.1, { cx: 1120, cy: 330, enter: 'r' });
  obj(g, 'corazon', at('circ1'), { cx: 560, cy: 580, fit: 200, phase: 0.3 });
  chip(g, 'TU CIRCULACIÓN', at('circ1') + 0.3, { cx: 1120, cy: 580, enter: 'r' });
  obj(g, 'cerebro', at('cerebro0') - 0.5, { cx: 560, cy: 830, fit: 220, phase: 0.6 });
  chip(g, 'TU CEREBRO', at('cerebro0') - 0.2, { cx: 1120, cy: 830, enter: 'r' });
});

// 12. stay to the end: how to do it right, and the mistake to avoid
scene(svg, at('quedate'), at('p1'), g => {
  cap(g, 'QUÉDATE HASTA EL FINAL', at('quedate'), { cy: 110, hi: 'FINAL' });
  tile(g, 'x_bien', at('correctamente0') - 1, { x: 150, y: 230, w: 760, h: 500 });
  mark(g, 'CÓMO HACERLO BIEN', true, at('correctamente0'), { cx: 530, cy: 830, size: 40 });
  tile(g, 'x_puntas', at('error0') - 0.5, { x: 1010, y: 230, w: 760, h: 500 });
  mark(g, 'EL ERROR A EVITAR', false, at('error0'), { cx: 1390, cy: 830, size: 40 });
});
