// PUNTO 5 — tres pequeños hábitos antes de dormir: breathing, caffeine/water, consistency + 7-day challenge.

// Steam wisps rising over a cup at (cx, cy).
function steam(g, t0, cx, cy) {
  const ws = [-40, 0, 40].map(dx => el('path', { fill: 'none', stroke: '#B9AFA0', 'stroke-width': 9, 'stroke-linecap': 'round', opacity: 0 }, g));
  anim(t => ws.forEach((w, i) => {
    const p = ((t - t0) * 0.6 + i / 3) % 1, x = cx + (i - 1) * 40, y = cy - p * 120;
    set(w, { d: `M${x} ${y} q 18 -30 0 -60 q -18 -30 0 -60`, opacity: t < t0 ? 0 : 0.8 * Math.sin(Math.PI * p) });
  }));
}
// Needle gauge (green → amber → red); draw(v 0..1).
function Gauge(g, { cx, cy, r = 230, label = '' }) {
  const s = el('g', {}, g);
  const arc = (a0, a1, col) => {
    const p = a => [cx - r * Math.cos(a), cy - r * Math.sin(a)];
    const [x0, y0] = p(a0), [x1, y1] = p(a1);
    el('path', { d: `M${x0} ${y0} A${r} ${r} 0 0 1 ${x1} ${y1}`, fill: 'none', stroke: col, 'stroke-width': 50 }, s);
  };
  arc(0, Math.PI / 3, C.green); arc(Math.PI / 3, 2 * Math.PI / 3, C.amber); arc(2 * Math.PI / 3, Math.PI, C.red);
  const nd = el('line', { x1: cx, y1: cy, stroke: C.ink, 'stroke-width': 16, 'stroke-linecap': 'round' }, s);
  el('circle', { cx, cy, r: 24, fill: C.ink }, s);
  if (label) Text(s, label, { x: cx, y: cy + 80, size: 46 });
  return { g: s, draw(v) { const a = clamp(v) * Math.PI; set(nd, { x2: cx - (r - 40) * Math.cos(a), y2: cy - (r - 40) * Math.sin(a) }); } };
}

// 0. kicker
scene(svg, at('p5') - 0.3, at('ahora5'), g => {
  pan(g, 'a_dormir', 'full', { from: [0.6, 0.4], to: [0.5, 0.45] });
  kicker(g, 'PUNTO 5', '3 HÁBITOS\nANTES DE DORMIR', at('p5'));
});

// 1. three small details for a comfortable, sustainable routine
scene(svg, at('ahora5'), at('un_dia') - 3, g => {
  heelRaise(g, at('ahora5'), { cx: 560, floor: 1020, h: 900, period: 4.6 });
  chip(g, 'TRES PEQUEÑOS DETALLES', at('detalles5'), { cx: 1360, cy: 300, size: 46, fill: C.ink, color: C.amber });
  chip(g, 'UNA RUTINA CÓMODA', at('sostenible') - 1, { cx: 1360, cy: 480, size: 44 });
  chip(g, 'Y SOSTENIBLE', at('sostenible'), { cx: 1360, cy: 620, size: 44, fill: C.green, color: C.white });
});

// 2. not one perfect day, but months and years
scene(svg, at('un_dia') - 3, at('primer_detalle'), g => {
  const A = Live(g, { t0: at('un_dia') - 0.6, cx: 520, cy: 520, enter: 'l', idle: 'breathe', amp: 0.5 });
  Card(A.g, { x: 220, y: 280, w: 600, h: 460, fill: C.white });
  Text(A.g, 'UN SOLO DÍA', { x: 520, y: 370, size: 48 });
  Text(A.g, 'PERFECTO', { x: 520, y: 440, size: 48 });
  Icon.cross(A.g, 460, 520, 1.2);
  const B = Live(g, { t0: at('meses') - 0.4, cx: 1400, cy: 520, enter: 'r', idle: 'breathe', amp: 0.5 });
  Card(B.g, { x: 1100, y: 280, w: 600, h: 460, fill: C.white });
  Text(B.g, 'MESES Y AÑOS', { x: 1400, y: 370, size: 48 });
  const dots = [];
  for (let r = 0; r < 4; r++) for (let c = 0; c < 9; c++) dots.push(el('circle', { cx: 1176 + c * 56, cy: 470 + r * 60, r: 20, fill: C.ink, opacity: 0.15 }, B.g));
  anim(t => { const n = Math.floor(dots.length * prog(t, at('meses'), at('meses') + 4)); dots.forEach((d, i) => set(d, { fill: i < n ? C.green : C.ink, opacity: i < n ? 1 : 0.15 })); });
  chip(g, 'HÁBITOS QUE PUEDAS MANTENER', at('meses') - 2, { cx: 960, cy: 880, size: 42, fill: C.ink, color: C.amber });
});

// 3. detail 1: your breathing — many hold their breath without noticing
scene(svg, at('primer_detalle'), at('contienen') - 1.5, g => {
  pan(g, 'h_respira', 'full', { from: [0.35, 0.5], to: [0.45, 0.35] });
  kicker(g, 'DETALLE 1', 'TU RESPIRACIÓN', at('primer_detalle'));
});
scene(svg, at('contienen') - 1.5, at('presion'), g => {
  pan(g, 'x_respira', 'full', { from: [0.45, 0.5], to: [0.45, 0.38], zoom: 0.12, base: 1.02 });
  cap(g, 'CONTENER EL AIRE SIN DARTE CUENTA', at('contienen'), { size: 50, hi: 'CONTENER EL AIRE', hiColor: '#FF7A6E' });
});

// 4. that raises pressure in the chest → a transient rise in blood pressure
scene(svg, at('presion'), at('mientras5'), g => {
  const ga = Gauge(g, { cx: 760, cy: 640, label: 'TENSIÓN ARTERIAL' });
  const L = Live(g, { t0: at('presion'), cx: 760, cy: 560, enter: 'pop', idle: 'none' });
  L.g.appendChild(ga.g);
  anim(t => ga.draw(0.25 + 0.5 * E.inOut(prog(t, at('presion') + 1, at('tension5') + 0.8)) + 0.02 * Math.sin(t * 9)));
  chip(g, 'MÁS PRESIÓN EN EL PECHO', at('presion') + 0.5, { cx: 1450, cy: 330, size: 36, fill: C.amber });
  chip(g, 'SUBIDA TRANSITORIA', at('tension5') - 0.5, { cx: 1450, cy: 500, size: 38, fill: C.red, color: C.white });
});

// 5. breathe calmly: in gently through the nose, out slowly
scene(svg, at('mientras5'), at('relajarte'), g => {
  pan(g, 'h_respira', 'left', { from: [0.4, 0.4], to: [0.5, 0.3] });
  Breath(g, at('mientras5') + 0.3, { cx: 1510, cy: 420, r: 170, period: 6 });
  chip(g, 'INSPIRA POR LA NARIZ', at('inspirar'), { cx: 1510, cy: 700, size: 36, fill: C.blue, color: C.white });
  chip(g, 'SUELTA EL AIRE DESPACIO', at('soltar'), { cx: 1510, cy: 830, size: 34 });
});

// 6. it helps you relax; no complicated rhythm; just avoid unnecessary tension
scene(svg, at('relajarte'), at('segundo_detalle'), g => {
  heelRaise(g, at('relajarte'), { cx: 560, floor: 1020, h: 900, period: 5 });
  chip(g, 'TE AYUDA A RELAJARTE', at('relajarte') + 0.4, { cx: 1360, cy: 300, size: 44, fill: C.green, color: C.white });
  mark(g, 'RITMOS COMPLICADOS', false, at('ritmo'), { cx: 1360, cy: 500, size: 40 });
  mark(g, 'SIN TENSIONES', true, at('tensiones'), { cx: 1360, cy: 690, size: 44 });
});

// 7. detail 2: the hours before bed — stimulating drinks
scene(svg, at('segundo_detalle'), at('cafe'), g => {
  pan(g, 'f_dormir', 'full', { from: [0.3, 0.5], to: [0.4, 0.4] });
  kicker(g, 'DETALLE 2', 'ANTES DE ACOSTARTE', at('segundo_detalle'));
  chip(g, 'BEBIDAS ESTIMULANTES', at('estimulantes'), { cx: 1300, cy: 140, size: 42, fill: C.amber });
});

// 8. coffee, caffeinated tea or energy drinks late can disturb sleep
scene(svg, at('cafe'), at('dormir_mal'), g => {
  pan(g, 'h_cafe', 'full', { from: [0.2, 0.6], to: [0.45, 0.45] });
  cap(g, 'CAFÉ · TÉ · ENERGÉTICAS', at('cafe') + 0.2, { t1: at('dificultar') });
  cap(g, 'DE NOCHE, PEOR SUEÑO', at('dificultar'), { hi: 'PEOR SUEÑO', hiColor: '#FF7A6E' });
});

// 9. sleeping badly, as a habit, is linked to cardiovascular problems
scene(svg, at('dormir_mal'), at('reducir'), g => {
  obj(g, 'reloj', at('dormir_mal'), { cx: 540, cy: 460, fit: 400 });
  arrow(g, 800, 460, 1080, 460, at('dormir_mal') + 1.4, { color: C.red });
  const H = obj(g, 'corazon', at('dormir_mal') + 1.8, { cx: 1360, cy: 460, fit: 380, idle: 'none' });
  anim(t => { const b = 1 + 0.07 * Math.pow(Math.sin(Math.PI * ((t % 0.7) / 0.7)), 8); H.g.setAttribute('transform', `translate(1360 460) scale(${b.toFixed(4)}) translate(-1360 -460)`); });
  chip(g, 'DORMIR MAL', at('dormir_mal') + 0.3, { cx: 540, cy: 800, size: 48, fill: C.ink, color: C.white });
  chip(g, 'SALUD CARDIOVASCULAR', at('dormir_mal') + 2.2, { cx: 1360, cy: 800, size: 40, fill: C.red, color: C.white });
});

// 10. cut caffeine in the hours before bed, if it affects your sleep
scene(svg, at('reducir'), at('agua'), g => {
  obj(g, 'cafe', at('reducir'), { cx: 660, cy: 560, fit: 520 });
  steam(g, at('reducir') + 0.4, 660, 380);
  const X = Live(g, { t0: at('reducir') + 1.2, cx: 900, cy: 400, enter: 'pop', idle: 'shake' });
  Icon.cross(X.g, 840, 340, 1.2);
  chip(g, 'MENOS CAFEÍNA', at('reducir') + 0.8, { cx: 1400, cy: 420, size: 50, fill: C.amber });
  chip(g, 'ANTES DE DORMIR', at('reducir') + 1.4, { cx: 1400, cy: 560, size: 46 });
  chip(g, 'SI AFECTA A TU DESCANSO', at('reducir') + 3.5, { cx: 1400, cy: 700, size: 34 });
});

// 11. a little water if thirsty — no big amounts before bed
scene(svg, at('agua'), at('templada'), g => {
  obj(g, 'agua', at('agua'), { cx: 640, cy: 540, fit: 460 });
  mark(g, 'UN POCO DE AGUA', true, at('agua') + 0.6, { cx: 1360, cy: 400, size: 46 });
  chip(g, 'SIN GRANDES CANTIDADES', at('grandes') - 0.6, { cx: 1360, cy: 600, size: 40, fill: C.amber });
});

// 12. warm water has no special soleus-activating power; good hydration is part of a healthy life
scene(svg, at('templada'), at('tercer'), g => {
  obj(g, 'agua', at('templada'), { cx: 520, cy: 540, fit: 420, enter: 'none' });
  stamp(g, 'SIN PODERES ESPECIALES', at('templada') + 1.5, { cx: 1250, cy: 400, size: 58, color: C.orange });
  mark(g, 'HIDRATACIÓN ADECUADA', true, at('hidratacion'), { cx: 1250, cy: 680, size: 42 });
});

// 13. detail 3, maybe the most important: consistency
scene(svg, at('tercer'), at('no_cometas'), g => {
  pan(g, 'h_calendario', 'full', { from: [0.4, 0.5], to: [0.6, 0.35] });
  kicker(g, 'DETALLE 3', 'LA CONSTANCIA', at('tercer') + 0.5);
}, { punch: [at('constancia')] });

// 14. five minutes won't transform your circulation overnight
scene(svg, at('no_cometas'), at('factores'), g => {
  const ck = Clock(g, { cx: 560, cy: 500, r: 230 });
  const L = Live(g, { t0: at('no_cometas'), cx: 560, cy: 500, idle: 'bob' });
  L.g.appendChild(ck.g);
  anim(t => ck.draw(22 + 10 * E.inOut(prog(t, at('no_cometas') + 1, at('manana') + 1))));
  chip(g, '5 MINUTOS DE TALONES', at('no_cometas') + 1.5, { cx: 1340, cy: 300, size: 44 });
  stamp(g, 'NO ES MAGIA', at('manana'), { cx: 1340, cy: 560, size: 80, color: C.red });
  chip(g, 'DE LA NOCHE A LA MAÑANA', at('manana') + 0.6, { cx: 1340, cy: 800, size: 38, fill: C.ink, color: C.white });
});

// 15. depends on many factors; long-term studies are still needed
scene(svg, at('factores'), at('pausa_activa'), g => {
  [[520, 380, 1.6, 0], [800, 640, 1.1, 0.3], [380, 720, 0.9, 0.6]].forEach(([x, y, s, p], i) => wrapQ(g, at('factores') + i * 0.4, x, y, s));
  chip(g, 'DEPENDE DE MUCHOS FACTORES', at('factores') + 0.3, { cx: 1300, cy: 380, size: 38 });
  chip(g, 'FALTAN ESTUDIOS', at('investigaciones5') - 0.5, { cx: 1300, cy: 580, size: 46, fill: C.amber });
  chip(g, 'A LARGO PLAZO', at('investigaciones5'), { cx: 1300, cy: 710, size: 46, fill: C.amber });
});

// 16. but as a small active break it reminds you that your body needs to move
scene(svg, at('pausa_activa'), at('empezar5'), g => {
  pan(g, 'a_silla', 'full', { from: [0.3, 0.3], to: [0.4, 0.55] });
  cap(g, 'UNA PEQUEÑA PAUSA ACTIVA', at('pausa_activa') + 0.5, { hi: 'PAUSA ACTIVA' });
});

// 17. a few minutes after dinner + small breaks through the day
scene(svg, at('empezar5'), at('combina'), g => {
  const L = Live(g, { t0: at('empezar5'), cx: 960, cy: 560, enter: 'up', idle: 'none' });
  el('line', { x1: 200, y1: 560, x2: 1720, y2: 560, stroke: C.ink, 'stroke-width': 12, 'stroke-linecap': 'round' }, L.g);
  [8, 12, 16, 20, 23].forEach(h => { const x = 200 + (h - 8) / 15 * 1520; el('line', { x1: x, y1: 540, x2: x, y2: 580, stroke: C.ink, 'stroke-width': 6 }, L.g); Text(L.g, h + ':00', { x, y: 630, size: 34 }); });
  const sun = el('circle', { r: 26, fill: C.amber, stroke: C.ink, 'stroke-width': 5 }, L.g);
  anim(t => { const u = ((t - at('empezar5')) / 6) % 1; set(sun, { cx: 200 + u * 1520, cy: 480 - 60 * Math.sin(Math.PI * u) }); });
  const pins = [[10.5, 'durante_dia'], [13.5, 'durante_dia'], [17, 'durante_dia'], [21.3, 'empezar5']].map(([h, k], i) => {
    const x = 200 + (h - 8) / 15 * 1520, P = Live(g, { t0: at(k) + 0.6 + (i % 3) * 0.35, cx: x, cy: 500, enter: 'pop', idle: 'bob', phase: i * 0.2 });
    el('circle', { cx: x, cy: 560, r: 26, fill: h > 20 ? C.orange : C.green, stroke: C.ink, 'stroke-width': 6 }, P.g);
    return P;
  });
  chip(g, 'UNOS MINUTOS TRAS CENAR', at('empezar5') + 0.6, { cx: 1460, cy: 780, size: 36, fill: C.orange, color: C.white });
  chip(g, 'PAUSAS DURANTE EL DÍA', at('durante_dia'), { cx: 740, cy: 780, size: 36, fill: C.green, color: C.white });
});

// 18. combine with walks, strength work and other activities that suit you
scene(svg, at('combina'), at('reto'), g => {
  pan(g, 'h_paseo', 'full', { from: [0.4, 0.35], to: [0.5, 0.55] });
  chip(g, '+ PASEOS', at('combina') + 1, { cx: 1450, cy: 200, size: 46, fill: C.green, color: C.white });
  chip(g, '+ FUERZA', at('fuerza5'), { cx: 1450, cy: 340, size: 46, fill: C.green, color: C.white, phase: 0.3 });
  chip(g, '+ ACTIVIDADES ADAPTADAS', at('otras'), { cx: 1300, cy: 480, size: 40, fill: C.green, color: C.white, phase: 0.6 });
});

// 19. the 7-day challenge
scene(svg, at('reto'), at('cuentame5'), g => {
  pan(g, 'h_calendario', 'left', { from: [0.6, 0.4], to: [0.55, 0.45] });
  chip(g, 'RETO: 7 DÍAS', at('reto'), { cx: 1510, cy: 260, size: 60, fill: C.red, color: C.white });
  const dc = DayCounter(g, { x: 1275, y: 430, days: 7 });
  const L = Live(g, { t0: at('siete'), cx: 1510, cy: 495, enter: 'pop', idle: 'breathe' });
  L.g.appendChild(dc.g);
  anim(t => dc.draw(prog(t, at('siete') + 0.5, at('cuentame5') - 0.5)));
  chip(g, 'MENOS SOFÁ INMÓVIL', at('siete') + 2.5, { cx: 1510, cy: 700, size: 40, fill: C.amber });
});

// 20. tell me how it went — the real secret: stop spending so many hours without moving
scene(svg, at('cuentame5'), at('secreto') - 0.3, g => {
  [[560, 360, 1.8], [960, 300, 2.2], [1360, 360, 1.8]].forEach(([x, y, s], i) => {
    const B = Live(g, { t0: at('cuentame5') + 0.3 + i * 0.3, cx: x, cy: y, enter: 'pop', idle: 'bob', phase: i * 0.3 });
    Icon.bubble(B.g, x - 50 * s, y - 50 * s, s);
  });
  CTAlive(g, 'comment', '¿TE HA RESULTADO FÁCIL?', at('cuentame5') + 0.4, { y: 640 });
});
scene(svg, at('secreto') - 0.3, at('concl') - 0.3, g => {
  heelRaise(g, at('secreto') - 0.3, { cx: 1460, floor: 1020, h: 860, period: 4.6 });
  stamp(g, 'SIN MILAGROS', at('secreto') + 0.6, { cx: 640, cy: 380, size: 84, color: C.red });
  chip(g, 'MENOS HORAS', at('dejar'), { cx: 640, cy: 640, size: 54, fill: C.ink, color: C.white });
  chip(g, 'SIN MOVERTE', at('dejar') + 0.5, { cx: 640, cy: 790, size: 54, fill: C.amber });
}, { punch: [at('dejar')] });
