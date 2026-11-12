// Punto 1 — cold air: same air, different bronchi; cold dry air narrows sensitive airways; faster breathing worse; scarf, nose breathing, warm-up, severe-cold days; follow prescribed prevention; scarf never replaces medication.
window.START = at('h1') - 1.2;
window.END = at('h2') - 1.2;
window.DURATION = window.END;
const svg = Stage('p1');
const c = k => () => at(k);

TitleCard(svg, 1, 'EL FRÍO NO ES INOFENSIVO', 'Protege el aire que respiras', () => START, c('dos1'));
stillScene(svg, 'b1a', c('dos1'), c('porque1'), { focus: [0.5, 0.45], zoom: 0.14 }, g => {
  const k = Kicker(g, 1, 'CONSEJO 1 · FRÍO'); Progress(g, 0);
  const a = CAP(g, 'MISMO AIRE, REACCIONES DISTINTAS', { hi: 'DISTINTAS' });
  return t => { slideIn(k, t, at('dos1'), 'l', 600); show(a, t, at('dos1') + 3); };
});
scene(svg, c('porque1'), c('frio1'), g => {
  const l = el('g', {}, g); cut(l, 'pulmones', 640, 520, 520);
  const lab = Chip(g, 'LOS BRONQUIOS LLEVAN EL AIRE A LOS PULMONES', { cx: 960, cy: 900, fill: C.white, size: 38 });
  const s = Chip(g, 'CON ASMA: MUY SENSIBLES', { cx: 1400, cy: 420, fill: ACC, color: C.white, size: 44 });
  sfx('pop', at('bronquios1') + 1); sfx('pop', at('sensibles1'));
  return t => { pop(l, t, at('porque1') + 0.5, 640, 520); pop(lab, t, at('bronquios1') + 1.5, 960, 900); pop(s, t, at('sensibles1'), 1400, 420); };
});
scene(svg, c('frio1'), c('consejo1'), g => {
  const p = Pair(g, ['bronquio_sano', 'BRONQUIO ABIERTO', C.green], ['bronquio_estrecho', 'IRRITADO Y ESTRECHO', C.red], { cy: 450 });
  const sn = el('g', {}, g); IC.snow(sn, 900, 160, 1.2);
  const r = ChipRow(g, [['TOS', () => at('frio1') + 4.5], ['SILBIDOS', () => at('frio1') + 5.5], ['FALTA DE AIRE', () => at('frio1') + 6.5]], { cy: 830, size: 42, fill: '#EAD3D0' });
  const d = CAP(g, 'PEOR SI RESPIRAS DEPRISA', { hi: 'DEPRISA', size: 52 });
  sfx('pop', at('frio1')); sfx('pop', at('frio1') + 2.5);
  return t => { pop(p.a, t, at('frio1'), 560, 450); pop(sn, t, at('frio1') + 1, 960, 220); show(p.ar, t, at('frio1') + 2); pop(p.b, t, at('frio1') + 2.5, 1360, 450); r(t); show(d, t, at('deprisa1')); };
});
stillScene(svg, 'b1b', () => at('deprisa1') + 4, c('consejo1'), { focus: [0.55, 0.45], zoom: 0.14 }, g => {
  const a = CAP(g, 'CAMINAR RÁPIDO O SUBIR ESCALERAS', { hi: 'ESCALERAS', size: 52 });
  return t => show(a, t, at('deprisa1') + 4.2);
}, true);
scene(svg, c('consejo1'), c('bufanda1'), g => {
  const a = Text(g, 'NO HACE FALTA ENCERRARSE', { x: 960, y: 380, size: 80, color: C.grey });
  const b = Text(g, 'PROTEGE EL AIRE QUE RESPIRAS', { x: 960, y: 520, size: 80, color: ACC });
  const s = el('g', {}, g); cut(s, 'bufanda', 960, 780, 280);
  sfx('pop', at('proteger1'));
  return t => { show(a, t, at('consejo1') + 0.3); pop(b, t, at('proteger1'), 960, 520); pop(s, t, at('proteger1') + 1, 960, 780); };
});
stillScene(svg, 'b1c', c('bufanda1'), c('nariz1'), { focus: [0.45, 0.45], zoom: 0.16 }, g => {
  const r = SideChips(g, [['EL AIRE SE CALIENTA', () => at('calentarse1') + 0.5], ['Y SE HUMEDECE', () => at('calentarse1') + 2.5], ['SIN AGOBIARTE', () => at('ligera1') + 1]], { cx: 1480, y0: 200, dy: 120, size: 40 });
  const a = CAP(g, 'BUFANDA SUAVE SOBRE NARIZ Y BOCA', { hi: 'NARIZ Y BOCA', size: 52 });
  return t => { show(a, t, at('bufanda1')); r(t); };
});
stillScene(svg, 'b1d', c('nariz1'), c('temprano1'), { focus: [0.5, 0.45], zoom: 0.14 }, g => {
  const r = ChipRow(g, [['FILTRA', c('filtra1')], ['CALIENTA', () => at('filtra1') + 1], ['HUMEDECE', () => at('filtra1') + 2]], { cy: 110, size: 44 });
  const a = CAP(g, 'RESPIRA POR LA NARIZ', { hi: 'NARIZ', size: 58 });
  const b = CAP(g, 'SOLO POR LA BOCA: MÁS IRRITANTE', { hi: 'MÁS IRRITANTE', size: 52 });
  return t => { show(a, t, at('nariz1'), at('boca1')); r(t); show(b, t, at('boca1') + 0.3); };
});
stillScene(svg, 'b2a', c('temprano1'), () => at('calentamiento1') + 4, { focus: [0.55, 0.5], zoom: 0.14 }, g => {
  const a = CAP(g, 'CALIENTA UN POCO DENTRO DE CASA', { hi: 'DENTRO', size: 52 });
  return t => show(a, t, at('temprano1') + 0.5);
});
stillScene(svg, 'b2b', () => at('calentamiento1') + 4, c('intenso1'), { focus: [0.45, 0.5], zoom: 0.14 }, g => {
  const a = CAP(g, 'Y SAL CAMINANDO DESPACIO', { hi: 'DESPACIO' });
  return t => show(a, t, at('calentamiento1') + 4.2);
});
stillScene(svg, 'b2c', c('intenso1'), c('medico1'), { focus: [0.3, 0.5], zoom: 0.14 }, g => {
  const a = CAP(g, 'OJO CON LOS DÍAS DE FRÍO INTENSO', { hi: 'FRÍO INTENSO', size: 52 });
  return t => show(a, t, at('intenso1') + 0.5);
});
scene(svg, c('medico1'), c('detalle1'), g => {
  const st = Still(el('g', {}, g), 'cut/b2d.png', { x: 120, y: 160, w: 840, h: 500, iw: SZ.b2d[0], ih: SZ.b2d[1], r: 28 });
  const w = el('g', {}, g); Card(w, { x: 1020, y: 200, w: 780, h: 420, fill: C.white }); el('rect', { x: 1020, y: 200, width: 780, height: 110, rx: 36, fill: '#D9A84E' }, w); el('rect', { x: 1020, y: 260, width: 780, height: 50, fill: '#D9A84E' }, w);
  Text(w, 'TRATAMIENTO INDICADO', { x: 1410, y: 257, size: 46 }); Text(w, 'SIGUE LAS INSTRUCCIONES', { x: 1410, y: 400, size: 40 }); Text(w, 'DE TU MÉDICO', { x: 1410, y: 460, size: 40 });
  const s = Stamp(g, 'LA BUFANDA NO SUSTITUYE TU MEDICACIÓN', { cx: 960, cy: 830, size: 50, color: C.red, rot: -2 });
  sfx('alert', at('medico1') + 1); sfx('stamp', at('sustituye1'));
  return t => { show(st.g, t, at('medico1')); st.draw(t, at('medico1'), at('detalle1')); pop(w, t, at('medico1') + 1, 1410, 410); s.draw(t, at('sustituye1')); };
}, true);
scene(svg, c('detalle1'), () => END + 1, g => {
  const host = Host(g, 'three_q', { cx: 420, cy: 600, fit: 700 });
  const q = Bubble(g, '¿Y el aire de tu casa?', { cx: 1220, cy: 300, size: 56 });
  const h = el('g', {}, g); IC.house(h, 1080, 470, 2.8);
  sfx('ding', at('detalle1') + 0.5); sfx('pop', at('hogar1') + 1);
  return t => { host(t, at('detalle1')); pop(q, t, at('detalle1') + 0.5, 1220, 300); pop(h, t, at('hogar1') + 1, 1220, 610); };
});

window.draw = t => drawScenes(t);
