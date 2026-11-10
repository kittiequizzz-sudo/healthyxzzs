// Intro — «Eso es normal a tu edad»; ageing vs chronic disease; six changes; stay to the end (painless problems); subscribe.
window.START = 0;
window.END = at('h1') - 1.2;
window.DURATION = window.END;
const svg = Stage('intro');
const c = k => () => at(k);

stillScene(svg, 'i1d', () => 0, c('silla0'), { focus: [0.6, 0.45], zoom: 0.14 }, g => {
  const a = CAP(g, '«ESO ES NORMAL A TU EDAD»', { hi: 'NORMAL', size: 62 });
  return t => show(a, t, at('normal0'));
}, true);
stillScene(svg, 'i1a', c('silla0'), c('olvidamos0'), { focus: [0.5, 0.4], zoom: 0.14 }, g => {
  const a = CAP(g, 'LEVANTARSE CUESTA', { hi: 'CUESTA' });
  return t => show(a, t, at('silla0') + 0.3);
}, true);
stillScene(svg, 'i1b', c('olvidamos0'), c('cansancio0'), { focus: [0.45, 0.4], zoom: 0.14 }, g => {
  const a = CAP(g, 'OLVIDOS', { hi: 'OLVIDOS', size: 64 });
  return t => show(a, t, at('olvidamos0') + 0.3);
}, true);
stillScene(svg, 'i1c', c('cansancio0'), c('ysi0'), { focus: [0.4, 0.45], zoom: 0.14 }, g => {
  const a = CAP(g, 'UN CANSANCIO NUEVO', { hi: 'NUEVO' });
  return t => show(a, t, at('cansancio0') + 0.3);
}, true);
stillScene(svg, 'i2a', c('ysi0'), c('cambia0'), { focus: [0.45, 0.5], zoom: 0.16 }, g => {
  const a = CAP(g, '¿Y SI NO FUERA SOLO LA EDAD?', { hi: 'SOLO LA EDAD' });
  return t => show(a, t, at('ysi0') + 0.5);
});
scene(svg, c('cambia0'), c('diferencia0'), g => {
  const h = Text(g, 'EL CUERPO CAMBIA CON LOS AÑOS', { x: 960, y: 160, size: 66, color: ACC });
  const it = [['musculo_debil', 'MÚSCULOS: MENOS FUERZA', 'musculos0'], ['arteria_rigida', 'ARTERIAS: MENOS FLEXIBLES', 'arterias0'], ['rinones', 'ÓRGANOS: OTRO RITMO', () => at('arterias0') + 2.5]].map(([n, l, k], i) => [ItemCard(g, n, 420 + i * 540, 540, { w: 480, h: 500, fit: 320, label: l, size: 30 }), typeof k === 'string' ? c(k) : k, 420 + i * 540]);
  it.forEach(([, k]) => sfx('pop', k(), 0.6));
  return t => { show(h, t, at('cambia0')); it.forEach(([x, k, cx]) => pop(x, t, k(), cx, 540)); };
});
scene(svg, c('diferencia0'), c('seis0'), g => {
  const a = el('g', {}, g); Card(a, { x: 160, y: 300, w: 700, h: 360, fill: C.white }); Text(a, 'ENVEJECER', { x: 510, y: 430, size: 60, color: C.green }); Text(a, 'DE FORMA NATURAL', { x: 510, y: 520, size: 40 });
  const ne = Text(g, '≠', { x: 960, y: 490, size: 140, color: C.red });
  const b = el('g', {}, g); Card(b, { x: 1060, y: 300, w: 700, h: 360, fill: C.white }); Text(b, 'ENFERMEDAD', { x: 1410, y: 430, size: 60, color: C.red }); Text(b, 'CRÓNICA QUE TRATAR', { x: 1410, y: 520, size: 40 });
  const cc = CAP(g, 'CONFUNDIRLAS = IGNORAR SEÑALES', { hi: 'IGNORAR', size: 54 });
  sfx('pop', at('diferencia0') + 1); sfx('stamp', at('diferencia0') + 3); sfx('pop', at('diferencia0') + 4.5);
  return t => { pop(a, t, at('diferencia0') + 1, 510, 480); pop(ne, t, at('diferencia0') + 3, 960, 490); pop(b, t, at('diferencia0') + 4.5, 1410, 480); show(cc, t, at('confunden0') + 1); };
});
scene(svg, c('seis0'), c('final0'), g => {
  const h = Text(g, '6 CAMBIOS DESPUÉS DE LOS 60', { x: 960, y: 150, size: 76, color: ACC });
  const ts = SIGNS.map(([ic, l], i) => [IconTile(g, ic, l, 360 + (i % 3) * 600, 410 + Math.floor(i / 3) * 360, { w: 460, h: 310 }), at('seis0') + 1 + i * 0.8, 360 + (i % 3) * 600, 410 + Math.floor(i / 3) * 360]);
  const r = ChipRow(g, [['¿NORMAL?', c('aprenderas0')], ['¿REVISIÓN MÉDICA?', () => at('aprenderas0') + 3], ['HÁBITOS QUE PROTEGEN', () => at('aprenderas0') + 6]], { cy: 1000, size: 34 });
  ts.forEach(([, k]) => sfx('pop', k, 0.5));
  return t => { show(h, t, at('seis0')); ts.forEach(([x, k, cx, cy]) => pop(x, t, k, cx, cy)); r(t); };
});
scene(svg, c('final0'), c('suscribe0'), g => {
  const host = Host(g, 'three_q', { cx: 420, cy: 600, fit: 700 });
  const b = Bubble(g, 'Quédate hasta el final', { cx: 1200, cy: 300, size: 56 });
  const t5 = IconTile(g, 'heart', 'ALGUNOS PROBLEMAS\nAVANZAN SIN DOLOR', 1220, 650, { w: 760, h: 380 });
  sfx('ding', at('final0') + 0.3); sfx('pop', at('final0') + 2.5);
  return t => { host(t, at('final0')); pop(b, t, at('final0') + 0.3, 1200, 300); pop(t5, t, at('final0') + 2.5, 1220, 650); };
});
stillScene(svg, 'i2b', c('suscribe0'), c('comencemos0'), { focus: [0.5, 0.5], zoom: 0.1 }, g => {
  const s = CTA(el('g', {}, g), 'sub', 160);
  const cc = CAP(g, 'COMPRENDE Y CUIDA TU CUERPO', { hi: 'CUIDA' });
  sfx('click', at('suscribe0') + 3);
  return t => { show(cc, t, at('suscribe0') + 0.5); pop(s, t, at('suscribe0') + 3, 960, 160); };
});
stillScene(svg, 'i2c', c('comencemos0'), () => END + 1, { focus: [0.45, 0.45], zoom: 0.1 }, g => {
  const a = CAP(g, 'EMPECEMOS POR LOS MÚSCULOS', { hi: 'MÚSCULOS' });
  return t => show(a, t, at('comencemos0') + 0.5);
});

window.draw = t => drawScenes(t);
