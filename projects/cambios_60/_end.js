// Conclusion — ageing is not resignation; recap of the six; prevent, detect, control; habits; educational disclaimer + urgent signs; open comment question; subscribe + share.
window.START = at('c0') - 0.6;
window.END = 1298.12;
window.DURATION = window.END;
const svg = Stage('end');
const c = k => () => at(k);

stillScene(svg, 'za', () => START, c('respondemos_c'), { focus: [0.5, 0.45], zoom: 0.12 }, g => {
  const a = CAP(g, 'ENVEJECER NO ES RESIGNARSE', { hi: 'RESIGNARSE', size: 58 });
  const r = ChipRow(g, [['NI PERDER FUERZA', () => at('cumplir_c') + 2], ['NI VIVIR CON DOLOR', () => at('cumplir_c') + 4], ['NI IGNORAR SÍNTOMAS', () => at('cumplir_c') + 6]], { cy: 110, size: 36 });
  return t => { show(a, t, START + 0.5); r(t); };
}, true);
scene(svg, c('respondemos_c'), c('lista_c'), g => {
  const a = Text(g, 'EL CUERPO CAMBIA: ES INEVITABLE', { x: 960, y: 360, size: 66, color: C.grey });
  const b = Text(g, 'CÓMO RESPONDES MARCA LA DIFERENCIA', { x: 960, y: 500, size: 66, color: ACC });
  sfx('ding', at('respondemos_c') + 3);
  return t => { show(a, t, at('respondemos_c') + 0.3); pop(b, t, at('respondemos_c') + 3, 960, 500); };
});
scene(svg, c('lista_c'), c('noesperes_c'), g => {
  const ks = [0.3, 2, 3.5, 5, 7, 9];
  const ts = SIGNS.map(([ic, l], i) => [IconTile(g, ic, l, 360 + (i % 3) * 600, 300 + Math.floor(i / 3) * 340, { w: 460, h: 300 }), ks[i], 360 + (i % 3) * 600, 300 + Math.floor(i / 3) * 340]);
  const r = ChipRow(g, [['PREVENIR', () => at('prevenirse_c') + 2], ['DETECTAR A TIEMPO', () => at('prevenirse_c') + 3], ['CONTROLAR', () => at('prevenirse_c') + 5]], { cy: 960, size: 42, fill: ACC, color: C.white });
  ts.forEach(([, d]) => sfx('pop', at('lista_c') + d, 0.5));
  return t => { ts.forEach(([x, d, cx, cy]) => pop(x, t, at('lista_c') + d, cx, cy)); r(t); };
});
stillScene(svg, 'zb', c('noesperes_c'), c('advertencia'), { focus: [0.5, 0.5], zoom: 0.12 }, g => {
  const r = ChipRow(g, [['MANTENTE ACTIVO', c('activo_c')], ['ALIMÉNTATE BIEN', () => at('activo_c') + 1.5], ['REVISIONES', () => at('activo_c') + 3], ['OBSERVA LOS CAMBIOS', () => at('activo_c') + 5]], { cy: 110, size: 34 });
  const a = CAP(g, 'NO ESPERES A ENCONTRARTE MAL', { hi: 'NO ESPERES' });
  return t => { show(a, t, at('noesperes_c') + 0.5); r(t); };
});
scene(svg, c('advertencia'), c('pregunta_c'), g => {
  const a = el('g', {}, g); Card(a, { x: 260, y: 110, w: 1400, h: 170, fill: C.white }); el('rect', { x: 260, y: 110, width: 26, height: 170, rx: 12, fill: '#D9A84E' }, a); Text(a, 'SÍNTOMAS NUEVOS, PERSISTENTES O QUE EMPEORAN', { x: 975, y: 175, size: 40 }); Text(a, '→ CONSULTA CON UN PROFESIONAL', { x: 975, y: 235, size: 40, color: ACC });
  const w = Warn(g, 'ATENCIÓN URGENTE · 112', ['DOLOR TORÁCICO INTENSO', 'DIFICULTAD RESPIRATORIA GRAVE', 'SIGNOS REPENTINOS DE ICTUS'], { kind: 'red', y: 340, w: 1300 });
  const s = Source(g, 'Contenido educativo · no sustituye una valoración médica', 1010);
  sfx('alert', at('advertencia') + 0.3); sfx('pop', at('consulta_c')); sfx('alert', at('urgente_c'));
  return t => { show(s, t, at('educativo_c')); pop(a, t, at('consulta_c'), 960, 195); pop(w, t, at('urgente_c'), 960, 570); };
}, true);
scene(svg, c('pregunta_c'), c('suscribe_c'), g => {
  const h = Text(g, 'PREGUNTA DEL DÍA', { x: 960, y: 120, size: 76, color: ACC });
  const q = Chip(g, '¿QUÉ CAMBIO TE PREOCUPA MÁS?', { cx: 960, cy: 260, fill: C.white, size: 50 });
  const ops = [['dumbbell', 'LA FUERZA'], ['brain', 'LA MEMORIA'], ['heart', 'EL CORAZÓN']].map(([ic, l], i) => [IconTile(g, ic, l, 520 + i * 440, 560, { w: 380, h: 360 }), 520 + i * 440, i]);
  const cta = CTA(el('g', {}, g), 'comment', 900);
  sfx('ding', at('pregunta_c')); ops.forEach(([, , i]) => sfx('pop', at('opciones_c') + i * 1.2, 0.6)); sfx('click', at('deja_c'));
  return t => { show(h, t, at('pregunta_c')); pop(q, t, at('cual_c'), 960, 260); ops.forEach(([x, cx, i]) => pop(x, t, at('opciones_c') + i * 1.2, cx, 560)); pop(cta, t, at('deja_c'), 960, 900); };
});
stillScene(svg, 'zc', c('suscribe_c'), c('manos_c'), { focus: [0.45, 0.45], zoom: 0.1 }, g => {
  const s = CTA(el('g', { transform: 'translate(350 0)' }, g), 'sub', 140);
  const b = el('g', {}, g); Card(b, { x: 460, y: 75, w: 440, h: 130, fill: C.white, r: 65 }); IC.share(b, 490, 90, 1); Text(b, 'COMPARTE', { x: 735, y: 142, size: 46 });
  sfx('click', at('suscribe_c') + 2.5); sfx('click', at('suscribe_c') + 5);
  return t => { pop(s, t, at('suscribe_c') + 2.5, 1310, 140); pop(b, t, at('suscribe_c') + 5, 680, 140); };
});
stillScene(svg, 'zd', c('manos_c'), () => END + 1, { focus: [0.5, 0.45], zoom: 0.08 }, g => {
  const a = CAP(g, 'TU BIENESTAR, EN BUENA MEDIDA, EN TUS MANOS', { hi: 'EN TUS MANOS', size: 48 });
  sfx('ding', at('manos_c') + 2);
  return t => show(a, t, at('manos_c') + 0.5);
});

window.draw = t => drawScenes(t);
