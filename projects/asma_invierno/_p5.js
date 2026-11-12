// Punto 5 — colds can trigger asthma attacks: viruses raise airway inflammation; not everyone gets complications; handwashing (useful, not enough), avoid sick contacts, well-fitted mask in crowded indoor places; vaccines (flu, COVID-19, pneumococcus, RSV when indicated); keep usual treatment; follow action plan if worse.
window.START = at('h5') - 1.2;
window.END = at('h6') - 1.2;
window.DURATION = window.END;
const svg = Stage('p5');
const c = k => () => at(k);

TitleCard(svg, 5, 'UN RESFRIADO PUEDE COMPLICAR TU ASMA', 'Prevención en temporada de virus', () => START, c('frase5'));
stillScene(svg, 'f1a', c('frase5'), c('virus5'), { focus: [0.45, 0.45], zoom: 0.14 }, g => {
  const k = Kicker(g, 5, 'CONSEJO 5 · RESFRIADOS'); Progress(g, 4);
  const a = CAP(g, '«ES SOLO UN RESFRIADO»…', { hi: 'SOLO' });
  return t => { slideIn(k, t, at('frase5'), 'l', 600); show(a, t, at('solo5')); };
});
scene(svg, c('virus5'), c('manos5'), g => {
  const v = el('g', {}, g); IC.virus(v, 300, 260, 3);
  const ar = el('g', {}, g); Arrow(ar, 700, 410, 900, 410, ACC, 14);
  const b = el('g', {}, g); Card(b, { x: 1000, y: 190, w: 600, h: 460, fill: C.white }); cut(b, 'bronquio_estrecho', 1300, 380, 300); Text(b, 'CRISIS ASMÁTICA', { x: 1300, y: 600, size: 44, color: C.red });
  const r = ChipRow(g, [['RESFRIADO', () => at('virus5') + 1], ['GRIPE', () => at('virus5') + 2], ['OTROS VIRUS', () => at('virus5') + 3]], { cy: 780, size: 40 });
  const n = CAP(g, 'NO SIEMPRE HAY COMPLICACIONES: PREVENIR Y VIGILAR', { hi: 'PREVENIR', size: 44 });
  sfx('pop', at('virus5')); sfx('pop', at('virus5') + 5);
  return t => { pop(v, t, at('virus5'), 450, 410); show(ar, t, at('virus5') + 4.5); pop(b, t, at('virus5') + 5, 1300, 420); r(t); show(n, t, at('nosignifica5')); };
});
stillScene(svg, 'f1b', c('manos5'), c('contacto5'), { focus: [0.6, 0.5], zoom: 0.14 }, g => {
  const a = CAP(g, 'LÁVATE BIEN LAS MANOS', { hi: 'LAS MANOS' });
  const b = Chip(g, 'ÚTIL, PERO NO SUFICIENTE SOLO', { cx: 960, cy: 120, fill: C.white, size: 40 });
  sfx('pop', at('higiene5'));
  return t => { show(a, t, at('manos5') + 1); pop(b, t, at('higiene5'), 960, 120); };
});
stillScene(svg, 'f1c', c('contacto5'), c('mascarilla5'), { focus: [0.55, 0.45], zoom: 0.14 }, g => {
  const a = CAP(g, 'DISTANCIA CON QUIEN TIENE SÍNTOMAS', { hi: 'DISTANCIA', size: 52 });
  return t => show(a, t, at('contacto5') + 1);
});
stillScene(svg, 'f1d', c('mascarilla5'), c('vacunas5'), { focus: [0.45, 0.4], zoom: 0.14 }, g => {
  const a = CAP(g, 'MASCARILLA EN INTERIORES CONCURRIDOS', { hi: 'MASCARILLA', size: 50 });
  return t => show(a, t, at('mascarilla5') + 1);
});
scene(svg, c('vacunas5'), c('mantener5'), g => {
  const st = Still(el('g', {}, g), 'cut/f2a.png', { x: 100, y: 180, w: 760, h: 460, iw: SZ.f2a[0], ih: SZ.f2a[1], r: 26 });
  const h = Text(g, 'VACUNAS RECOMENDADAS', { x: 1340, y: 200, size: 52, color: ACC });
  const vs = ['GRIPE', 'COVID-19', 'NEUMOCOCO', 'VIRUS RESPIRATORIO SINCITIAL'].map((s, i) => [Chip(g, s, { cx: 1340, cy: 320 + i * 110, fill: C.white, size: s.length > 12 ? 30 : 40 }), i]);
  const n = CAP(g, 'CONSULTA CUÁLES TE CORRESPONDEN', { hi: 'CONSULTA' });
  vs.forEach(([, i]) => sfx('pop', at('lista5') + i * 1.4, 0.5));
  return t => { show(st.g, t, at('vacunas5')); st.draw(t, at('vacunas5'), at('mantener5')); show(h, t, at('vacunas5') + 1); vs.forEach(([x, i]) => slideIn(x, t, at('lista5') + i * 1.4, 'r', 400)); show(n, t, at('consulta5') + 1); };
});
stillScene(svg, 'f2b', c('mantener5'), c('empeora5'), { focus: [0.55, 0.45], zoom: 0.14 }, g => {
  const a = CAP(g, 'MANTÉN TU TRATAMIENTO DURANTE LA INFECCIÓN', { hi: 'MANTÉN', size: 46 });
  return t => show(a, t, at('mantener5') + 0.5);
});
scene(svg, c('empeora5'), c('pregunta5'), g => {
  const w = el('g', {}, g); Warn(el('g', { transform: 'translate(-280 0)' }, w), 'SI EMPEORAS…', ['MÁS TOS', 'MÁS MEDICACIÓN DE ALIVIO', 'DIFICULTAD PARA RESPIRAR'], { kind: 'amber', y: 160, w: 1100 });
  const st = Still(el('g', {}, g), 'cut/f2c.png', { x: 1280, y: 200, w: 560, h: 400, iw: SZ.f2c[0], ih: SZ.f2c[1], r: 26 });
  const n = Chip(g, 'SIGUE TU PLAN DE ACCIÓN Y PIDE VALORACIÓN', { cx: 960, cy: 820, fill: ACC, color: C.white, size: 40 });
  sfx('alert', at('empeora5') + 0.3); sfx('pop', at('empeora5') + 6);
  return t => { show(w, t, at('empeora5') + 0.3); show(st.g, t, at('empeora5') + 3); st.draw(t, at('empeora5'), at('pregunta5')); pop(n, t, at('empeora5') + 6, 960, 820); };
}, true);
scene(svg, c('pregunta5'), () => END + 1, g => {
  const host = Host(g, 'three_q', { cx: 420, cy: 600, fit: 700 });
  const q = Bubble(g, '¿Dejar de moverse hasta la primavera?', { cx: 1220, cy: 300, size: 46 });
  const st = Still(el('g', {}, g), 'cut/f2d.png', { x: 980, y: 440, w: 480, h: 300, iw: SZ.f2d[0], ih: SZ.f2d[1], r: 22 });
  sfx('ding', at('dejar5'));
  return t => { host(t, at('pregunta5')); pop(q, t, at('dejar5'), 1220, 300); show(st.g, t, at('pregunta5') + 0.5); st.draw(t, at('pregunta5'), END); };
});

window.draw = t => drawScenes(t);
