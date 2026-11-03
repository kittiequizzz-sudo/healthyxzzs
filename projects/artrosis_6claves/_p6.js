// Punto 6 — food and silent inflammation: two plates, Mediterranean nutrients, no miracle food, weight.
window.START = at('h6') - 0.3;
window.END = at('c0') - 0.3;
window.DURATION = window.END;
const svg = Stage('p6');
const c = k => () => at(k);

TitleCard(svg, 6, 'LA INFLAMACIÓN SILENCIOSA', 'Lo que comes y tus articulaciones', () => START, c('comida6'));
stillScene(svg, 'c1c', c('comida6'), c('milagroso'), { focus: [0.5, 0.5], zoom: 0.1 }, g => {
  const k = Kicker(g, 6, 'ALIMENTACIÓN'); Progress(g, 5);
  const a = CAP(g, 'TU COMIDA… Y TUS RODILLAS', { hi: 'RODILLAS' });
  return t => { slideIn(k, t, at('comida6') + 0.2, 'l', 600); show(a, t, at('comida6') + 1.5); };
});
scene(svg, c('milagroso'), c('desgaste6'), g => {
  const a = el('g', {}, g); Card(a, { x: 360, y: 130, w: 1200, h: 170, fill: C.white }); Mark(a, false, 480, 215, 0.9); Text(a, 'ALIMENTO MILAGROSO', { x: 1010, y: 215, size: 60, color: C.grey });
  const ts = [['scale', 'PESO'], ['dumbbell', 'MÚSCULOS'], ['flame', 'INFLAMACIÓN']].map(([ic, s], i) => [IconTile(g, ic, s, 460 + i * 500, 600, { w: 380, h: 380 }), i]);
  const b = Chip(g, 'MÁS IMPORTANTE DESPUÉS DE LOS 60', { cx: 960, cy: 920, size: 40, fill: ACC, color: C.white });
  sfx('pop', at('milagroso')); [0, 1.2, 2.6].forEach(d => sfx('pop', at('peso6') + d, 0.6)); sfx('pop', at('peso6') + 6);
  return t => { pop(a, t, at('milagroso'), 960, 215); ts.forEach(([tile, i]) => pop(tile, t, at('peso6') + [0, 1.2, 2.6][i], 460 + i * 500, 600)); pop(b, t, at('peso6') + 6, 960, 920); };
});
scene(svg, c('desgaste6'), c('cocina'), g => {
  const k = ItemCard(g, 'rodilla_art', 520, 520, { w: 520, h: 700, fit: 600 });
  const a = el('g', {}, g); Card(a, { x: 950, y: 200, w: 800, h: 160, fill: C.white }); IC.gear(a, 990, 230, 1); Text(a, 'DESGASTE MECÁNICO', { x: 1400, y: 282, size: 50 });
  const pl = Text(g, '+', { x: 1350, y: 450, size: 110, color: ACC });
  const b = el('g', {}, g); Card(b, { x: 950, y: 530, w: 800, h: 160, fill: '#FCE3D3' }); IC.flame(b, 990, 560, 1); Text(b, 'INFLAMACIÓN', { x: 1400, y: 612, size: 52 });
  const d = el('g', {}, g); Card(d, { x: 950, y: 730, w: 800, h: 160, fill: '#FCEDCE' }); IC.sugar(d, 990, 760, 1); Text(d, 'METABOLISMO', { x: 1400, y: 812, size: 52 });
  sfx('pop', at('desgaste6') - 0.5); sfx('pop', at('inflamatorios6')); sfx('pop', at('inflamatorios6') + 1.5);
  return t => { pop(k, t, at('desgaste6') - 2, 520, 520); pop(a, t, at('desgaste6') - 0.5, 1350, 280); show(pl, t, at('inflamatorios6') - 0.4); pop(b, t, at('inflamatorios6'), 1350, 610); pop(d, t, at('inflamatorios6') + 1.5, 1350, 810); };
});
stillScene(svg, 'c1a', c('cocina'), c('platos'), { focus: [0.5, 0.5], zoom: 0.1 }, g => {
  const a = CAP(g, 'TAMBIÉN EN LA COCINA', { hi: 'COCINA' });
  return t => show(a, t, at('cocina'));
});
// two plates
scene(svg, c('platos'), c('mediterraneo'), g => {
  const h = Text(g, 'DOS PLATOS', { x: 960, y: 120, size: 80, color: ACC });
  const P = (cx, fill) => { const p = el('g', {}, g); el('circle', { cx: cx + 6, cy: 530, r: 360, fill: SHADOW }, p); el('circle', { cx, cy: 520, r: 360, fill, stroke: C.ink, 'stroke-width': 6 }, p); el('circle', { cx, cy: 520, r: 300, fill: 'none', stroke: C.grey, 'stroke-width': 3, opacity: 0.5 }, p); return p; };
  const pa = P(500, C.white), pb = P(1420, C.white);
  const A = [['bolleria', 400, 400], ['embutido', 610, 480], ['cola', 480, 650]].map(([n, x, y]) => { const e = el('g', {}, g); cut(e, n, x, y, 250); return [e, x, y]; });
  const B = [['verduras', 1310, 410], ['sardinas', 1540, 470], ['aceite', 1330, 650], ['frutos', 1560, 660]].map(([n, x, y]) => { const e = el('g', {}, g); cut(e, n, x, y, 230); return [e, x, y]; });
  const ma = el('g', {}, g); Mark(ma, false, 500, 940, 0.8); const mb = el('g', {}, g); Mark(mb, true, 1420, 940, 0.8);
  const a = CAP(g, 'MISMA ENERGÍA, EFECTOS DISTINTOS', { hi: 'EFECTOS DISTINTOS', size: 52 });
  sfx('pop', at('primero6')); sfx('pop', at('segundo6')); A.forEach((x, i) => sfx('pop', at('primero6') + 0.8 + i * 1.1, 0.5)); B.forEach((x, i) => sfx('pop', at('segundo6') + 0.8 + i * 1.6, 0.5));
  return t => {
    show(h, t, at('platos')); pop(pa, t, at('platos') + 0.8, 500, 520); pop(pb, t, at('platos') + 1.2, 1420, 520);
    A.forEach(([e, x, y], i) => pop(e, t, at('primero6') + 0.8 + i * 1.1, x, y)); B.forEach(([e, x, y], i) => pop(e, t, at('segundo6') + 0.8 + i * 1.6, x, y));
    show(a, t, at('ambos6'), at('ambos6') + 4); pop(ma, t, at('ambos6') + 4, 500, 940); pop(mb, t, at('ambos6') + 4.4, 1420, 940);
  };
});
stillScene(svg, 'c1b', c('mediterraneo'), c('sardinas'), { focus: [0.5, 0.45], zoom: 0.12 }, g => {
  const a = CAP(g, 'EL PATRÓN MEDITERRÁNEO', { hi: 'MEDITERRÁNEO' });
  return t => show(a, t, at('mediterraneo') + 0.3);
});
// nutrients
scene(svg, c('sardinas'), c('ninguno6'), g => {
  const cs = [['sardinas', 'OMEGA-3', 'sardinas', 380], ['vitc', 'VITAMINA C → COLÁGENO', 'naranjas', 960], ['lentejas', 'PROTEÍNAS Y MINERALES', 'legumbres', 1540]].map(([n, s, k, cx]) => [ItemCard(g, n, cx, 470, { w: 500, h: 560, fit: 380, label: s, size: s.length > 14 ? 30 : 42 }), k, cx]);
  const fr = el('g', {}, g); cut(fr, 'frutos', 1760, 330, 170);
  const a = CAP(g, 'NUTRIENTES INTERESANTES', { hi: 'NUTRIENTES' });
  cs.forEach(([, k]) => sfx('pop', at(k), 0.7));
  return t => { cs.forEach(([cc, k, cx]) => pop(cc, t, at(k), cx, 470)); pop(fr, t, at('legumbres') + 1.5, 1760, 330); show(a, t, at('legumbres') + 3); };
});
scene(svg, c('ninguno6'), c('sobrepeso'), g => {
  const s = Stamp(g, 'NINGUNO REGENERA EL CARTÍLAGO', { cx: 960, cy: 300, size: 64, color: C.red, rot: -3 });
  const ts = [['plate', 'ALIMENTACIÓN\nEQUILIBRADA'], ['walk', 'ACTIVIDAD\nFÍSICA'], ['scale', 'PESO\nADECUADO']].map(([ic, l], i) => [IconTile(g, ic, l, 480 + i * 480, 690, { w: 400, h: 380 }), i]);
  sfx('stamp', at('ninguno6') + 0.5); [0, 2, 3.6].forEach(d => sfx('pop', at('equilibrada') + d, 0.6));
  return t => { s.draw(t, at('ninguno6') + 0.5); ts.forEach(([tile, i]) => pop(tile, t, at('equilibrada') + [0, 2, 3.6][i], 480 + i * 480, 690)); };
});
stillScene(svg, 'c1d', c('sobrepeso'), c('transformar'), { focus: [0.5, 0.5], zoom: 0.12 }, g => {
  const a = Chip(g, 'SI HAY SOBREPESO', { cx: 1550, cy: 140, fill: C.white, size: 42 });
  const b = Chip(g, 'BAJAR POCO A POCO, CON SUPERVISIÓN', { cx: 1240, cy: 270, fill: C.white, size: 38 });
  const cc = CAP(g, 'MENOS PESO → MENOS CARGA EN LA RODILLA', { hi: 'MENOS CARGA', size: 48 });
  sfx('pop', at('sobrepeso')); sfx('pop', at('sobrepeso') + 2.5);
  return t => { slideIn(a, t, at('sobrepeso'), 'r', 400); slideIn(b, t, at('sobrepeso') + 2.5, 'r', 400); show(cc, t, at('sobrepeso') + 5); };
});
// small steps checklist
scene(svg, c('transformar'), () => at('invito') - 0.2, g => {
  const h = Text(g, 'SIN CAMBIARLO TODO DE GOLPE', { x: 960, y: 140, size: 66, color: ACC });
  const rows = [['bolleria', 'verduras', 'ULTRAPROCESADOS → FRESCOS', 'sustituyendo'], ['sardinas', null, 'PROTEÍNA EN CADA COMIDA', 'proteinas6'], ['agua', null, 'BEBE AGUA SEGÚN TUS NECESIDADES', 'hidratacion']].map(([n1, n2, s, k], i) => {
    const r = el('g', {}, g), y = 320 + i * 220; Card(r, { x: 200, y: y - 90, w: 1520, h: 180, fill: C.white });
    cut(r, n1, 320, y, 150); if (n2) { Arrow(r, 410, y, 470, y, C.ink, 8); cut(r, n2, 560, y, 150); }
    Text(r, s, { x: n2 ? 1150 : 1050, y, size: 46 }); IC.check(r, 1600, y - 45, 0.9); return [r, k, y];
  });
  rows.forEach(([, k], i) => sfx('pop', i ? at(k) : at('transformar') + 1.5, 0.7));
  return t => { show(h, t, at('transformar')); rows.forEach(([r, k, y], i) => pop(r, t, i ? at(k) : at('transformar') + 1.5, 960, y)); };
});
scene(svg, () => at('invito') - 0.2, () => at('distinguir') + 2.5, g => {
  const host = Host(g, 'waving', { cx: 420, cy: 580, fit: 700 });
  const w = el('g', { transform: 'translate(300 0)' }, g); const cta = CTA(w, 'sub', 520);
  sfx('click', at('suscribe6'));
  return t => { host(t, at('invito') - 0.2); pop(cta, t, at('suscribe6'), 1260, 520); };
});
scene(svg, () => at('distinguir') + 2.5, c('decisiones'), g => {
  const a = el('g', {}, g); Card(a, { x: 200, y: 260, w: 700, h: 360, fill: C.white }); IC.check(a, 500, 300, 1); Text(a, 'CONSEJOS ÚTILES', { x: 550, y: 500, size: 52 });
  const b = el('g', {}, g); Card(b, { x: 1020, y: 260, w: 700, h: 360, fill: C.white }); IC.cross(b, 1320, 300, 1); Text(b, 'FALSAS PROMESAS', { x: 1370, y: 500, size: 52, color: C.grey });
  const cc = CAP(g, 'NI UN EJERCICIO ÚNICO NI UN INGREDIENTE SECRETO', { size: 44, hi: 'SECRETO' });
  sfx('pop', at('distinguir') + 2.6); sfx('pop', at('distinguir') + 4);
  return t => { pop(a, t, at('distinguir') + 2.6, 550, 440); pop(b, t, at('distinguir') + 4, 1370, 440); show(cc, t, at('distinguir') + 6); };
});
scene(svg, c('decisiones'), () => END + 1, g => {
  const cal = el('g', {}, g); IC.calendar(cal, 760, 160, 4);
  const r = ChipRow(g, [['FUERZA', () => at('decisiones') + 4], ['MOVILIDAD', () => at('decisiones') + 5], ['INDEPENDENCIA', () => at('decisiones') + 6]], { cy: 860, size: 46, fill: C.green, color: C.white });
  const a = Text(g, 'PEQUEÑAS DECISIONES CADA DÍA', { x: 960, y: 120, size: 60, color: ACC });
  sfx('pop', at('decisiones')); [4, 5, 6].forEach(d => sfx('pop', at('decisiones') + d, 0.5));
  return t => { pop(cal, t, at('decisiones'), 960, 360); show(a, t, at('decisiones') + 0.4); r(t); };
});

window.draw = t => drawScenes(t);
