// INTRO (0 → Punto 1). Hook: doing everything right, still 155/95 → why? → 5 possible reasons.

// 0. frustrating: you do exactly what the doctor said…
scene(svg, -1, at('pastilla0'), g => {
  pan(g, 'm_pastillero', 'full', { from: [0.55, 0.4], to: [0.5, 0.5] });
  cap(g, 'HACES TODO BIEN…', at('medico0'), { t1: at('sigue_alta') });
  cap(g, '…Y TU TENSIÓN SIGUE ALTA', at('sigue_alta'), { hi: 'SIGUE ALTA', hiColor: '#FF7A6E' });
}, { whoosh: false });

// 1. your pill every day, on time, trusting the treatment
scene(svg, at('pastilla0'), at('una_manana'), g => {
  pan(g, 'm_pastilla', 'left', { from: [0.45, 0.4], to: [0.5, 0.5] });
  obj(g, 'pastillero', at('pastilla0') + 0.3, { cx: 1510, cy: 300, fit: 380 });
  mark(g, 'CADA DÍA', true, at('pastilla0') + 0.8, { cx: 1510, cy: 520, size: 40 });
  mark(g, 'A SU HORA', true, at('horarios'), { cx: 1510, cy: 660, size: 40 });
  mark(g, 'CONFIANDO', true, at('confias'), { cx: 1510, cy: 800, size: 40 });
});

// 2. one morning: the cuff, the button…
scene(svg, at('una_manana'), at('c155') - 0.6, g => {
  pan(g, 'm_manguito', 'full', { from: [0.6, 0.5], to: [0.55, 0.45], zoom: 0.2 });
  cap(g, 'UNA MAÑANA…', at('una_manana') + 0.3, { hi: 'MAÑANA' });
});

// 3. 155 / 95
scene(svg, at('c155') - 0.6, at('pregunta0'), g => {
  tile(g, 'm_susto', at('c155') - 0.4, { x: 80, y: 160, w: 840, h: 600 });
  Monitor(g, at('c155') - 0.4, { cx: 1400, cy: 460, s: 1.15, sys: 155, dia: 95, pulse: 82, count: 1.5 });
}, { punch: [at('c155') + 1.2] });

// 4. why does it keep rising if I take my medication?
scene(svg, at('pregunta0'), at('sorprendente'), g => {
  pan(g, 'x_susto', 'full', { from: [0.5, 0.35], to: [0.45, 0.4] });
  cap(g, '¿POR QUÉ SIGUE ALTA SI TOMO MI PASTILLA?', at('porque0'), { size: 46, hi: '¿POR QUÉ' });
});

// 5. the answer isn't always the pill: a habit, another medicine, something at night
scene(svg, at('sorprendente'), at('importante0'), g => {
  chip(g, 'NO SIEMPRE ES LA PASTILLA', at('sorprendente') + 0.3, { cy: 120, size: 48, fill: C.ink, color: C.amber });
  const it = [['salero', 'UN HÁBITO', 'habito0', 420], ['blister', 'OTRO MEDICAMENTO', 'otro_dolor', 960], ['cpap', 'ALGO NOCTURNO', 'duermes0', 1500]];
  it.forEach(([n, s, k, x], i) => { obj(g, n, at('sorprendente') + 1 + i * 0.5, { cx: x, cy: 480, fit: 300, phase: i * 0.3 }); chip(g, s, at(k) - 0.3, { cx: x, cy: 760, size: 36, fill: C.amber }); });
});

// 6. high despite treatment ≠ the medicines stopped working
scene(svg, at('importante0'), at('hoy'), g => {
  pan(g, 'p_explica', 'left', { from: [0.3, 0.4], to: [0.5, 0.45] });
  chip(g, 'LO IMPORTANTE', at('importante0'), { cx: 1510, cy: 220, size: 44, fill: C.ink, color: C.amber });
  mark(g, 'NO SIGNIFICA QUE', false, at('no_significa0'), { cx: 1510, cy: 380, size: 34 });
  chip(g, 'LA PASTILLA NO SIRVA', at('no_significa0') + 0.6, { cx: 1510, cy: 480, size: 34 });
  chip(g, 'HAY EXPLICACIONES', at('explicaciones'), { cx: 1510, cy: 640, size: 38, fill: TEAL, color: C.white });
  chip(g, '+ REVISIÓN MÉDICA', at('revision0') - 0.5, { cx: 1510, cy: 770, size: 38 });
});

// 7. today: 5 possible reasons — pay attention to the 4th (night)
scene(svg, at('hoy'), at('antes'), g => {
  chip(g, '5 POSIBLES RAZONES', at('hoy') + 0.3, { cy: 120, size: 56, fill: C.red, color: C.white });
  const names = ['tensiometro', 'blister', 'salero', 'cpap', 'pastillero'];
  names.forEach((n, i) => {
    const cx = 240 + i * 360, L = Live(g, { t0: at('hoy') + 1 + i * 0.35, cx, cy: 470, enter: 'pop', idle: 'bob', phase: i * 0.2 });
    el('circle', { cx, cy: 470, r: 150, fill: i === 3 ? NIGHT : C.white, stroke: C.ink, 'stroke-width': 7 }, L.g);
    Cutout(L.g, src(n), { cx, cy: 470, iw: SZ[n][0], ih: SZ[n][1], fit: 190 });
    Text(L.g, String(i + 1), { x: cx - 110, y: 350, size: 60, color: C.red });
  });
  const ring = el('circle', { cx: 1320, cy: 470, r: 175, fill: 'none', stroke: C.amber, 'stroke-width': 12, opacity: 0 }, g);
  anim(t => set(ring, { opacity: t < at('cuarta') ? 0 : 1, r: 175 + 10 * Math.sin(t * 5) }));
  chip(g, '¡ATENCIÓN A LA 4ª!', at('cuarta'), { cx: 1320, cy: 760, size: 44, fill: C.amber });
  chip(g, 'UN PROBLEMA NOCTURNO', at('nocturno0'), { cx: 1320, cy: 880, size: 34, fill: NIGHT, color: C.white });
});

// 8. before starting: never change or stop your treatment on your own
scene(svg, at('antes'), at('quedate'), g => {
  obj(g, 'pastillero', at('antes'), { cx: 960, cy: 420, fit: 560, amp: 0.5 });
  stamp(g, 'NUNCA LO CAMBIES POR TU CUENTA', at('nunca0'), { cx: 960, cy: 780, size: 62, color: C.red, rot: -4 });
}, { punch: [at('nunca0')] });

// 9. stay to the end: better questions for your next appointment
scene(svg, at('quedate'), at('p1') - 0.3, g => {
  pan(g, 'z_cuaderno', 'full', { from: [0.45, 0.45], to: [0.5, 0.5] });
  cap(g, 'QUÉDATE HASTA EL FINAL', at('quedate'), { cy: 110, hi: 'FINAL' });
  cap(g, 'PREGUNTAS PARA TU CONSULTA', at('consulta0') - 1, { hi: 'TU CONSULTA' });
});
