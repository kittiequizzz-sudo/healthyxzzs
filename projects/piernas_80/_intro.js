// Intro — legs change before the first pain; 5 transformations; comment + subscribe.
window.START = 0;
window.END = at('h1') - 0.3;
window.DURATION = window.END;
const svg = Stage('intro');
const c = k => () => at(k);

stillScene(svg, 'a1a', () => 0, c('siguen'), { focus: [0.45, 0.45], zoom: 0.14 }, g => {
  const a = CAP(g, '¿LEVANTARTE CUESTA MÁS?', { hi: 'CUESTA MÁS' });
  return t => show(a, t, 2);
}, true);
stillScene(svg, 'a1b', c('siguen'), c('cuando0'), { focus: [0.4, 0.5], zoom: 0.12 }, g => {
  const a = CAP(g, 'YA NO RESPONDEN IGUAL', { hi: 'NO RESPONDEN' });
  return t => show(a, t, at('siguen') + 1.5);
}, true);
stillScene(svg, 'a1c', c('cuando0'), c('sorprendente0'), { focus: [0.4, 0.45], zoom: 0.14 }, g => {
  const a = CAP(g, '¿CUÁNDO EMPEZÓ?', { hi: 'CUÁNDO' });
  const b = CAP(g, '¿POR QUÉ NADIE TE AVISÓ?', { hi: 'NADIE' });
  return t => { show(a, t, at('cuando0'), at('nadie0')); show(b, t, at('nadie0')); };
}, true);
stillScene(svg, 'a1d', c('sorprendente0'), c('musculos0'), { focus: [0.5, 0.65], zoom: 0.12 }, g => {
  const a = CAP(g, 'ANTES DEL PRIMER DOLOR', { hi: 'ANTES' });
  return t => show(a, t, at('sorprendente0') + 2);
});
scene(svg, c('musculos0'), c('importante0'), g => {
  const ts = [['dumbbell', 'MÚSCULOS', 'musculos0'], ['heart', 'CIRCULACIÓN', 'circulacion0'], ['feet', 'NERVIOS Y\nEQUILIBRIO', 'nervios0']].map(([ic, s, k], i) => [IconTile(g, ic, s, 420 + i * 540, 470, { w: 440, h: 440 }), k, i]);
  const dn = [0, 1, 2].map(i => { const a = el('g', {}, g); Arrow(a, 600 + i * 540, 290, 600 + i * 540, 380, C.red, 12); return a; });
  const a = CAP(g, 'CAMBIOS SILENCIOSOS', { hi: 'SILENCIOSOS' });
  ['musculos0', 'circulacion0', 'nervios0'].forEach(k => sfx('pop', at(k), 0.7));
  return t => { ts.forEach(([tile, k, i]) => { pop(tile, t, at(k), 420 + i * 540, 470); show(dn[i], t, at(k) + 0.6); }); show(a, t, at('nervios0') + 2); };
});
stillScene(svg, 'a2a', c('importante0'), c('cinco0'), { focus: [0.5, 0.5], zoom: 0.1 }, g => {
  const a = CAP(g, '80 AÑOS ≠ PERDER TU INDEPENDENCIA', { hi: '≠', size: 52 });
  const r = ChipRow(g, [['PREVENIR', c('prevenirse')], ['RETRASAR', () => at('prevenirse') + 1.6], ['MEJORAR', () => at('prevenirse') + 2.6]], { cy: 130, size: 44, fill: C.white });
  [0, 1.6, 2.6].forEach(d => sfx('pop', at('prevenirse') + d, 0.6));
  return t => { show(a, t, at('ochenta0'), at('prevenirse') + 4); r(t); };
});
scene(svg, c('cinco0'), c('cuentame0'), g => {
  const h = Text(g, '5 TRANSFORMACIONES', { x: 960, y: 140, size: 90, color: ACC });
  const ts = SIGNS.map(([ic, s], i) => { const cx = 230 + i * 365, cy = 520; return [IconTile(g, ic, s, cx, cy, { w: 320, h: 340 }), cx, cy, i]; });
  const ring = el('rect', { x: 1528, y: 330, width: 350, height: 380, rx: 44, fill: 'none', stroke: C.red, 'stroke-width': 10 }, g);
  const w = Chip(g, '¡ATENCIÓN! INCLUSO SIN DOLOR', { cx: 1300, cy: 850, fill: C.red, color: C.white, size: 42 });
  ts.forEach(([, , , i]) => sfx('pop', at('cinco0') + 1 + i * 0.6, 0.5)); sfx('alert_soft', at('ultima0'));
  return t => { pop(h, t, at('cinco0'), 960, 140); ts.forEach(([tile, cx, cy, i]) => pop(tile, t, at('cinco0') + 1 + i * 0.6, cx, cy)); show(ring, t, at('ultima0')); pop(w, t, at('ultima0') + 2, 1300, 850); };
});
stillScene(svg, 'a2b', c('cuentame0'), c('suscribe0'), { focus: [0.45, 0.4], zoom: 0.1 }, g => {
  const q = Bubble(g, '¿Qué edad tienes? ¿Desde qué ciudad?', { cx: 1180, cy: 160, size: 44 });
  const w = el('g', { transform: 'translate(0 0)' }, g); const cta = CTA(w, 'comment', 960);
  sfx('click', at('cuentame0') + 0.5); sfx('ding', at('edad0'));
  return t => { pop(cta, t, at('cuentame0') + 0.5, 960, 960); pop(q, t, at('edad0'), 1180, 160); };
});
scene(svg, c('suscribe0'), c('envejecer0'), g => {
  const host = Host(g, 'waving', { cx: 420, cy: 580, fit: 700 });
  const h = Text(g, 'CUIDA TU MOVILIDAD', { x: 1260, y: 330, size: 64, color: ACC });
  const w = el('g', { transform: 'translate(300 0)' }, g); const cta = CTA(w, 'sub', 560);
  sfx('click', at('suscribe0') + 0.6);
  return t => { host(t, at('suscribe0')); show(h, t, at('suscribe0') + 1.5); pop(cta, t, at('suscribe0') + 0.6, 1260, 560); };
});
stillScene(svg, 'a2c', c('envejecer0'), c('renunciar0'), { focus: [0.45, 0.5], zoom: 0.1 }, g => {
  const a = CAP(g, 'ENVEJECER ES NATURAL', { hi: 'NATURAL' });
  return t => show(a, t, at('envejecer0'));
});
stillScene(svg, 'a2d', c('renunciar0'), () => END + 1, { focus: [0.45, 0.5], zoom: 0.12 }, g => {
  const a = CAP(g, 'RENUNCIAR A MOVERTE, NO', { hi: 'NO' });
  return t => show(a, t, at('renunciar0') + 0.3);
});

window.draw = t => drawScenes(t);
