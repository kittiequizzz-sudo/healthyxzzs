// Punto 5 — proprioception: foot messengers, neuropathy; Federico (=Rafael); ball under foot; home safety; warning.
window.START = at('h5') - 0.3;
window.END = at('carta') - 0.3;
window.DURATION = window.END;
const svg = Stage('p5');
const c = k => () => at(k);

TitleCard(svg, 5, 'EL SENTIDO INVISIBLE', 'La sensibilidad de tus pies', () => START, c('pasillo'));
stillScene(svg, 'f1a', c('pasillo'), c('sindolor5'), { focus: [0.5, 0.5], zoom: 0.16 }, g => {
  const k = Kicker(g, 5, 'SENSIBILIDAD'); Progress(g, 4);
  const a = CAP(g, 'TU PASILLO DE SIEMPRE', { hi: 'DE SIEMPRE' });
  const b = CAP(g, 'EL SUELO NO ESTÁ DONDE ESPERABAS', { hi: 'NO ESTÁ', size: 50 });
  const d = CAP(g, 'MIRANDO SIEMPRE HACIA ABAJO', { hi: 'ABAJO' });
  return t => { slideIn(k, t, at('pasillo'), 'l', 600); show(a, t, at('pasillo') + 1, at('suelo5')); show(b, t, at('suelo5'), at('inseguros')); show(d, t, at('inseguros')); };
});
scene(svg, c('sindolor5'), c('propio'), g => {
  const r = [['SIN DOLOR', 0], ['RODILLAS QUE FUNCIONAN', 1.6], ['MÚSCULOS QUE RESPONDEN', 3.2]].map(([s, d], i) => { const x = el('g', {}, g); Card(x, { x: 460, y: 190 + i * 170, w: 1000, h: 130, fill: C.white }); Mark(x, true, 560, 255 + i * 170, 0.7); Text(x, s, { x: 1010, y: 255 + i * 170, size: 46 }); return [x, d, 255 + i * 170]; });
  const a = Text(g, '… Y AUN ASÍ, ALGO CAMBIA', { x: 960, y: 780, size: 64, color: C.red });
  r.forEach(([, d]) => sfx('pop', at('sindolor5') + d, 0.6));
  return t => { r.forEach(([x, d, y]) => pop(x, t, at('sindolor5') + d, 960, y)); show(a, t, at('sindolor5') + 5.5); };
});
scene(svg, c('propio'), c('mensajeros'), g => {
  const s = Stamp(g, 'PROPIOCEPCIÓN', { cx: 960, cy: 150, size: 84, color: ACC, rot: -3 });
  const f = ItemCard(g, 'pie_nervio', 520, 560, { w: 520, h: 600, fit: 500 });
  const br = el('g', {}, g); IC.brain(br, 1300, 300, 2.2);
  const ln = el('path', { d: 'M780 560 C1000 560 1100 420 1290 420', fill: 'none', stroke: C.amber, 'stroke-width': 10, 'stroke-dasharray': '18 14' }, g);
  const lab = Text(g, 'SABER DÓNDE ESTÁN TUS PIERNAS SIN MIRARLAS', { x: 1340, y: 640, size: 30 });
  const r = ChipRow(g, [['ESCALERAS', c('gracias')], ['SUELO IRREGULAR', () => at('gracias') + 1.8], ['EQUILIBRIO', () => at('gracias') + 3.8]], { cy: 920, size: 42 });
  sfx('stamp', at('propio') + 5); sfx('pop', at('cerebro5')); [0, 1.8, 3.8].forEach(d => sfx('pop', at('gracias') + d, 0.5));
  return t => { s.draw(t, at('propio') + 5); pop(f, t, at('cerebro5'), 520, 560); pop(br, t, at('cerebro5') + 1, 1410, 410); show(ln, t, at('cerebro5') + 1.5); ln.setAttribute('stroke-dashoffset', (-t * 60).toFixed(0)); show(lab, t, at('cerebro5') + 2); r(t); };
});
// messengers from the foot to the brain
scene(svg, c('mensajeros'), c('calcetines'), g => {
  const f = ItemCard(g, 'pie_nervio', 480, 600, { w: 520, h: 560, fit: 460 });
  const br = el('g', {}, g); IC.brain(br, 1420, 180, 2.2);
  const msgs = [0, 1, 2, 3, 4, 5, 6, 7].map(i => el('circle', { r: 16, fill: C.amber, stroke: C.ink, 'stroke-width': 3 }, g));
  const r = SideChips(g, [['PRESIÓN', () => at('mensajeros') + 4], ['MOVIMIENTO', () => at('mensajeros') + 5], ['POSICIÓN', () => at('mensajeros') + 6.2]], { cx: 1520, y0: 520, dy: 120, size: 40 });
  const a = CAP(g, 'PEQUEÑOS AJUSTES PARA NO CAERTE', { hi: 'NO CAERTE', size: 52 });
  const b = CAP(g, 'DIABETES · FALTA DE B12 → NERVIOS', { hi: 'NERVIOS', size: 52 });
  sfx('pop', at('mensajeros')); sfx('alert_soft', at('precisas'));
  return t => {
    pop(f, t, at('mensajeros'), 480, 600); pop(br, t, at('mensajeros') + 0.5, 1530, 290); r(t);
    const weak = E.inOut(prog(t, at('precisas'), at('precisas') + 2));
    msgs.forEach((m, i) => { const u = ((t - at('mensajeros')) * 0.35 + i / 8) % 1, x = 560 + 860 * u, y = 760 - 470 * u - 80 * Math.sin(u * Math.PI); const lost = weak > 0 && i % 2 === 0; set(m, { cx: x.toFixed(1), cy: y.toFixed(1), opacity: t > at('mensajeros') + 1 ? (lost ? 1 - weak : 1) * (u > 0.95 ? 0 : 1) : 0 }); });
    show(a, t, at('ajustes'), at('precisas')); show(b, t, at('diabetes'));
  };
});
stillScene(svg, 'f2b', c('calcetines'), c('federico'), { focus: [0.5, 0.65], zoom: 0.14 }, g => {
  const a = CAP(g, 'COMO CON CALCETINES GRUESOS', { hi: 'CALCETINES' });
  return t => show(a, t, at('calcetines') + 2);
});
// Federico (= Rafael)
stillScene(svg, 'f1b', c('federico'), c('luces'), { focus: [0.45, 0.45], zoom: 0.1 }, g => {
  const a = Drama2(g, 'FEDERICO · 85 · ASTURIAS');
  const b = CAP(g, 'MONTAÑAS Y CAMINOS', { hi: 'MONTAÑAS' });
  sfx('pop', at('federico') + 0.5);
  return t => { pop(a, t, at('federico') + 0.5, 1640, 150); show(b, t, at('montanas')); };
});
stillScene(svg, 'f1c', c('luces'), c('oscuridad'), { focus: [0.55, 0.45], zoom: 0.14 }, g => {
  const a = CAP(g, 'ENCIENDE TODAS LAS LUCES', { hi: 'TODAS' });
  Drama(g);
  return t => show(a, t, at('luces') + 0.5);
});
stillScene(svg, 'f1d', c('oscuridad'), c('reconocian'), { focus: [0.5, 0.45], zoom: 0.12 }, g => {
  const a = CAP(g, '¿MIEDO A LA OSCURIDAD?', { hi: 'OSCURIDAD' });
  Drama(g);
  return t => show(a, t, at('oscuridad') + 0.5);
});
stillScene(svg, 'f2a', c('reconocian'), c('neuro'), { focus: [0.5, 0.6], zoom: 0.12 }, g => {
  const a = CAP(g, 'SUS PIES NO "RECONOCEN" EL SUELO', { hi: '"RECONOCEN"', size: 52 });
  const b = CAP(g, 'TROPIEZA CON ALFOMBRAS', { hi: 'ALFOMBRAS' });
  Drama(g);
  return t => { show(a, t, at('reconocian') + 1, at('alfombras')); show(b, t, at('alfombras')); };
});
stillScene(svg, 'f2c', c('neuro'), c('quehacer5'), { focus: [0.45, 0.55], zoom: 0.12 }, g => {
  const a = CAP(g, 'EXPLORACIÓN NEUROLÓGICA', { hi: 'NEUROLÓGICA' });
  const b = Chip(g, 'INSEGURIDAD ≠ PIERNAS DÉBILES', { cx: 1250, cy: 140, fill: C.white, size: 42 });
  sfx('pop', at('debiles5'));
  return t => { show(a, t, at('neuro') + 2); pop(b, t, at('debiles5'), 1250, 140); };
});
// exercise: ball under the foot
scene(svg, c('quehacer5'), c('equilibrio5'), g => {
  const h = Chip(g, 'EJERCICIO · PELOTA BAJO EL PIE', { cx: 960, cy: 95, fill: ACC, color: C.white, size: 44 });
  const row = PoseRow(g, ['pf1', 'pf2', 'pf3'], [], { y: 170, h: 640, x0: 70, x1: 1500 });
  const steps = [['¿QUÉ PUEDES HACER?', 'quehacer5'], ['SENTADO, PELOTA BLANDA BAJO UN PIE', 'pelota'], ['HACIA ADELANTE', 'muevela'], ['HACIA ATRÁS', 'atras'], ['HACIA LOS LADOS · 1–2 MINUTOS', 'lados'], ['DESPUÉS, CAMBIA DE PIE', 'cambia5'], ['ESTÍMULO, NO TRATAMIENTO', 'tactil']].map(([s, k]) => [CAP(g, s, { cy: 920, size: 48 }), k]);
  const cnt = Counter(g, { cx: 1700, cy: 470, label: 'MINUTOS / PIE' }); cnt.set('1–2');
  ['pelota', 'muevela', 'atras', 'lados', 'cambia5'].forEach(k => sfx('pop', at(k), 0.6));
  return t => {
    show(h, t, at('quehacer5'));
    if (t < at('muevela')) row.forEach(({ c, st }) => { c.setAttribute('opacity', t > at('pelota') ? 0.5 : 0.25); st.draw(t, 0, 1); });
    else if (t < at('cambia5')) lightRow(row, t, [at('muevela'), at('atras'), at('lados')]);
    else { const i = Math.floor((t - at('cambia5')) / 1) % 3; row.forEach(({ c, st }, j) => { c.setAttribute('opacity', j === i ? 1 : 0.4); st.draw(t, 0, 1); }); }
    steps.forEach(([cap, k], i) => show(cap, t, at(k), i < steps.length - 1 ? at(steps[i + 1][1]) : 1e9));
    show(cnt.g, t, at('lados'));
  };
});
stillScene(svg, 'f3a', c('equilibrio5'), c('pasillos'), { focus: [0.45, 0.5], zoom: 0.12 }, g => {
  const a = CAP(g, 'EQUILIBRIO JUNTO A UN APOYO FIRME', { hi: 'APOYO FIRME', size: 50 });
  const b = Chip(g, 'MEJOR CON SUPERVISIÓN', { cx: 1450, cy: 140, fill: C.white, size: 40 });
  sfx('pop', at('equilibrio5') + 4);
  return t => { show(a, t, at('equilibrio5') + 0.5); slideIn(b, t, at('equilibrio5') + 4, 'r', 400); };
});
stillScene(svg, 'f2d', c('pasillos'), c('calzado'), { focus: [0.6, 0.5], zoom: 0.12 }, g => {
  const r = SideChips(g, [['PASILLOS ILUMINADOS', () => at('pasillos') + 0.2], ['SIN ALFOMBRAS SUELTAS', () => at('pasillos') + 1.6]], { cx: 420, y0: 150, size: 40 });
  sfx('pop', at('pasillos') + 0.2); sfx('pop', at('pasillos') + 1.6);
  return t => r(t);
});
stillScene(svg, 'f3b', c('calzado'), c('entumecimiento'), { focus: [0.6, 0.6], zoom: 0.12 }, g => {
  const a = CAP(g, 'CALZADO ESTABLE', { hi: 'ESTABLE' });
  const b = Chip(g, 'TAN IMPORTANTE COMO EL EJERCICIO', { cx: 1250, cy: 140, fill: C.white, size: 40 });
  sfx('pop', at('calzado') + 1.5);
  return t => { show(a, t, at('calzado')); pop(b, t, at('calzado') + 1.5, 1250, 140); };
});
scene(svg, c('entumecimiento'), c('cuidar5'), g => {
  const w = Warn(g, 'PIDE VALORACIÓN MÉDICA SI HAY…', ['ENTUMECIMIENTO QUE NO SE VA', 'PÉRDIDA DE SENSIBILIDAD', 'TROPIEZOS FRECUENTES'], { kind: 'amber', y: 130, w: 1400 });
  const u = el('g', {}, g); Card(u, { x: 360, y: 760, w: 1200, h: 150, fill: C.red }); Text(u, 'DEBILIDAD REPENTINA → URGENCIAS', { x: 960, y: 836, size: 54, color: C.white });
  sfx('alert_soft', at('entumecimiento') + 0.2); sfx('alert', at('repentina5'));
  return t => { pop(w, t, at('entumecimiento') + 0.2, 960, 350); pop(u, t, at('repentina5'), 960, 836); };
});
stillScene(svg, 'f3c', c('cuidar5'), c('comunicacion'), { focus: [0.45, 0.5], zoom: 0.12 }, g => {
  const a = CAP(g, 'NO SOLO FUERZA', { hi: 'NO SOLO' });
  return t => show(a, t, at('cuidar5'));
});
stillScene(svg, 'f3d', c('comunicacion'), () => END + 1, { focus: [0.45, 0.5], zoom: 0.1 }, g => {
  const a = CAP(g, 'PIES Y CEREBRO, CONECTADOS', { hi: 'CONECTADOS' });
  const r = SideChips(g, [['CONFIANZA', () => at('comunicacion') + 6], ['INDEPENDENCIA', () => at('comunicacion') + 7.5]], { cx: 1600, y0: 160, size: 42, fill: C.green, color: C.white });
  sfx('pop', at('comunicacion') + 6); sfx('pop', at('comunicacion') + 7.5);
  return t => { show(a, t, at('comunicacion') + 1); r(t); };
});

window.draw = t => drawScenes(t);
