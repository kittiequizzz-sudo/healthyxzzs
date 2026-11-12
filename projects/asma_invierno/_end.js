// Conclusion — breathing calmly; recap of the six; small steps; urgent warning; quiz A/B/C (answer not shown); share + subscribe.
window.START = at('c0') - 0.6;
window.END = 1159.52;
window.DURATION = window.END;
const svg = Stage('end');
const c = k => () => at(k);

stillScene(svg, 'za', () => START, c('miedo_c'), { focus: [0.5, 0.45], zoom: 0.14 }, g => {
  const a = CAP(g, 'RESPIRAR CON TRANQUILIDAD', { hi: 'TRANQUILIDAD', size: 58 });
  return t => show(a, t, START + 0.5);
}, true);
scene(svg, c('miedo_c'), c('golpe_c'), g => {
  const h = Text(g, 'EL INVIERNO NO TIENE QUE SER UNA TEMPORADA DE MIEDO', { x: 960, y: 140, size: 46, color: ACC });
  const ks = [-3.5, -2.5, 3.4, 5.2, 7.5, 9.8];
  const ts = SIGNS.map(([ic, l], i) => [IconTile(g, ic, l, 360 + (i % 3) * 600, 380 + Math.floor(i / 3) * 360, { w: 460, h: 310 }), ks[i], 360 + (i % 3) * 600, 380 + Math.floor(i / 3) * 360]);
  ts.forEach(([, d]) => sfx('pop', at('seis_c') + d, 0.5));
  return t => { show(h, t, at('miedo_c')); ts.forEach(([x, d, cx, cy]) => pop(x, t, at('seis_c') + d, cx, cy)); };
});
stillScene(svg, 'zc', c('golpe_c'), c('advertencia'), { focus: [0.5, 0.5], zoom: 0.12 }, g => {
  const a = CAP(g, 'PEQUEÑOS AJUSTES CADA DÍA', { hi: 'CADA DÍA' });
  return t => show(a, t, at('golpe_c') + 0.5);
});
scene(svg, c('advertencia'), c('quiz'), g => {
  const w = el('g', {}, g); Warn(el('g', { transform: 'translate(-280 0)' }, w), 'ATENCIÓN URGENTE · 112', ['DIFICULTAD INTENSA PARA RESPIRAR', 'NO PUEDES HABLAR CON NORMALIDAD', 'EMPEORAMIENTO RÁPIDO', 'EL RESCATE NO FUNCIONA SEGÚN TU PLAN'], { kind: 'red', y: 100, w: 1100 });
  const st = Still(el('g', {}, g), 'cut/zb.png', { x: 1280, y: 160, w: 560, h: 400, iw: SZ.zb[0], ih: SZ.zb[1], r: 26 });
  const n = Chip(g, 'NO ESPERES A QUE PASE SOLO', { cx: 1560, cy: 660, fill: C.red, color: C.white, size: 34 });
  const s = Source(g, 'Contenido educativo · no sustituye el tratamiento indicado por tu médico', 1010);
  sfx('alert', at('advertencia') + 0.3); sfx('pop', at('noesperes_c'));
  return t => { show(w, t, at('advertencia') + 0.3); show(st.g, t, at('si_c')); st.draw(t, at('si_c'), at('quiz')); pop(n, t, at('noesperes_c'), 1560, 660); show(s, t, at('educativos_c')); };
}, true);
scene(svg, c('quiz'), c('util_c'), g => {
  const h = Text(g, 'PREGUNTA DEL DÍA', { x: 960, y: 110, size: 76, color: ACC });
  const q = Text(g, '¿Qué puede empeorar el asma en invierno?', { x: 960, y: 210, size: 48, weight: 800 });
  const op = (L, ics, lines, cx, k) => { const o = el('g', {}, g); Card(o, { x: cx - 270, y: 290, w: 540, h: 500, fill: C.white });
    el('circle', { cx, cy: 360, r: 46, fill: ACC, stroke: C.ink, 'stroke-width': 5 }, o); Text(o, L, { x: cx, y: 364, size: 56, color: C.white });
    ics.forEach((ic, i) => IC[ic](o, cx - 50 * ics.length * 0.8 + i * 80 - 10, 440, 0.75));
    lines.forEach((s, i) => Text(o, s, { x: cx, y: 620 + i * 48, size: 32 })); return [o, cx, k]; };
  const ops = [op('A', ['snow'], ['SOLO EL', 'AIRE FRÍO'], 380, 'opA'), op('B', ['snow', 'drop2', 'flame', 'virus'], ['FRÍO, HUMEDAD,', 'IRRITANTES', 'E INFECCIONES'], 960, 'opB'), op('C', ['walk'], ['SOLO HACER', 'EJERCICIO'], 1540, 'opC')];
  const cta = CTA(el('g', { transform: 'translate(-200 0)' }, g), 'comment', 920);
  const host = Host(g, 'three_q', { cx: 1760, cy: 880, fit: 300 });
  sfx('ding', at('quiz')); ops.forEach(([, , k]) => sfx('pop', at(k), 0.6)); sfx('click', at('escribe'));
  return t => { show(h, t, at('quiz')); show(q, t, at('quiz') + 0.5); ops.forEach(([o, cx, k]) => pop(o, t, at(k) - 1, cx, 540)); pop(cta, t, at('escribe'), 760, 920); host(t, at('quiz') + 1); };
});
stillScene(svg, 'zd', c('util_c'), () => END + 1, { focus: [0.5, 0.45], zoom: 0.1 }, g => {
  const b = el('g', {}, g); Card(b, { x: 460, y: 75, w: 440, h: 130, fill: C.white, r: 65 }); IC.share(b, 490, 90, 1); Text(b, 'COMPARTE', { x: 735, y: 142, size: 46 });
  const s = CTA(el('g', { transform: 'translate(350 0)' }, g), 'sub', 140);
  const cc = CAP(g, 'TU RESPIRACIÓN, TU INDEPENDENCIA', { hi: 'INDEPENDENCIA', size: 54 });
  sfx('click', at('util_c') + 2); sfx('click', at('util_c') + 6);
  return t => { pop(b, t, at('util_c') + 2, 680, 140); pop(s, t, at('util_c') + 6, 1310, 140); show(cc, t, at('util_c') + 9); };
});

window.draw = t => drawScenes(t);
