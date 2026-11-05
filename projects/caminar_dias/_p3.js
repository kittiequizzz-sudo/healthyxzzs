// Punto 3 — speed: own pace, moderate intensity, talk test, same speed ≠ same effort, 5-5-5 pacing, heart/lung warning, CTA.
window.START = at('h3') - 0.6;
window.END = at('h4') - 0.4;
window.DURATION = window.END;
const svg = Stage('p3');
const c = k => () => at(k);

TitleCard(svg, 3, 'LA VELOCIDAD IMPORTA', 'Pero sin llegar a agotarte', () => START, c('rapido3'));
stillScene(svg, 'p3aa', c('rapido3'), c('ciencia3'), { focus: [0.4, 0.5], zoom: 0.12 }, g => {
  const k = Kicker(g, 3, 'PUNTO 3 · VELOCIDAD'); Progress(g, 2);
  const a = CAP(g, 'MÁS RÁPIDO NO SIEMPRE ES MEJOR', { hi: 'NO SIEMPRE', size: 52 });
  const b = CAP(g, 'SIN CONTROL: FATIGA INNECESARIA', { hi: 'FATIGA', size: 52 });
  return t => { slideIn(k, t, at('rapido3'), 'l', 600); show(a, t, at('rapido3') + 0.3, at('fatiga3')); show(b, t, at('fatiga3') + 2); };
});
scene(svg, c('ciencia3'), c('habla'), g => {
  const h = ItemCard(g, 'corazon', 560, 480, { w: 400, h: 420, fit: 300, label: 'CORAZÓN', size: 36 });
  const l = ItemCard(g, 'pulmones', 1000, 480, { w: 400, h: 420, fit: 300, label: 'PULMONES', size: 36 });
  const r = SideChips(g, [['MÁS EFICIENTES', () => at('moderado3') + 3], ['MÁS RESISTENCIA', () => at('moderado3') + 6], ['MENOS RIESGO', () => at('moderado3') + 8]], { cx: 1560, y0: 330, dy: 150, size: 38 });
  const a = CAP(g, 'RITMO MODERADO', { hi: 'MODERADO' });
  const q = Bubble(g, '¿Sin aparatos?', { cx: 960, cy: 180, size: 54 });
  sfx('pop', at('ciencia3') + 1); sfx('pop', at('ciencia3') + 1.6); [3, 6, 8].forEach(d => sfx('pop', at('moderado3') + d, 0.5)); sfx('ding', at('como3'));
  return t => { pop(h, t, at('ciencia3') + 1, 560, 480); pop(l, t, at('ciencia3') + 1.6, 1000, 480); show(a, t, at('moderado3')); r(t); pop(q, t, at('como3') + 1, 960, 180); };
});
// talk test
scene(svg, c('habla'), c('detalle3'), g => {
  const h = Text(g, 'LA PRUEBA DEL HABLA', { x: 960, y: 130, size: 80, color: ACC });
  const ok = el('g', {}, g); Card(ok, { x: 160, y: 260, w: 760, h: 560, fill: C.white });
  const so = el('g', {}, ok); const sts = Still(so, 'cut/p3ab.png', { x: 200, y: 300, w: 680, h: 340, iw: SZ.p3ab[0], ih: SZ.p3ab[1], r: 20, zoom: 0.04 });
  Text(ok, 'FRASES COMPLETAS', { x: 540, y: 700, size: 44, color: C.green }); Text(ok, 'cantar cuesta → MODERADO', { x: 540, y: 770, size: 36, weight: 700 }); Mark(ok, true, 860, 290, 0.7);
  const ko = el('g', {}, g); Card(ko, { x: 1000, y: 260, w: 760, h: 560, fill: C.white });
  const sk = el('g', {}, ko); const stk = Still(sk, 'cut/p3ac.png', { x: 1040, y: 300, w: 680, h: 340, iw: SZ.p3ac[0], ih: SZ.p3ac[1], r: 20, zoom: 0.04 });
  Text(ko, 'SOLO UNAS PALABRAS', { x: 1380, y: 700, size: 44, color: C.red }); Text(ko, '→ DEMASIADO INTENSO', { x: 1380, y: 770, size: 36, weight: 700 }); Mark(ko, false, 1700, 290, 0.7);
  sfx('pop', at('frases')); sfx('alert_soft', at('palabras'));
  return t => { show(h, t, at('habla')); pop(ok, t, at('frases'), 540, 540); sts.draw(t, at('frases'), at('detalle3')); pop(ko, t, at('palabras'), 1380, 540); stk.draw(t, at('palabras'), at('detalle3')); };
});
stillScene(svg, 'p3ad', c('detalle3'), c('concreta3'), { focus: [0.5, 0.5], zoom: 0.08 }, g => {
  const a = CAP(g, 'MISMA VELOCIDAD, DISTINTO ESFUERZO', { hi: 'DISTINTO', size: 50 });
  const r = SideChips(g, [['65: CÓMODO', c('comodo3')], ['80: EXIGENTE', () => at('comodo3') + 3]], { cx: 1600, y0: 150, size: 40 });
  sfx('pop', at('comodo3')); sfx('pop', at('comodo3') + 3);
  return t => { show(a, t, at('misma3')); r(t); };
});
stillScene(svg, 'p3ba', c('concreta3'), c('variaciones'), { focus: [0.5, 0.5], zoom: 0.12 }, g => {
  const a = CAP(g, 'UN ESFUERZO TOLERABLE Y SEGURO', { hi: 'TOLERABLE', size: 52 });
  return t => show(a, t, at('tolerable'));
});
// 5-5-5 pacing bar
scene(svg, c('variaciones'), c('competicion3'), g => {
  const h = Text(g, 'UN PASEO EN TRES PARTES', { x: 960, y: 150, size: 70, color: ACC });
  const seg = [['LENTO', 0.35, C.blue], ['UN POCO MÁS RÁPIDO', 0.75, C.orange], ['BAJANDO EL RITMO', 0.35, C.blue]].map(([l, hgt, col], i) => {
    const s = el('g', {}, g), x = 220 + i * 500; el('rect', { x, y: 700 - 360 * hgt, width: 460, height: 360 * hgt, rx: 20, fill: col, 'fill-opacity': 0.8, stroke: C.ink, 'stroke-width': 5 }, s);
    Text(s, "5'", { x: x + 230, y: 650, size: 70, color: C.white }); Text(s, l, { x: x + 230, y: 770, size: 36 }); return [s, i];
  });
  [0, 1, 2].forEach(i => sfx('pop', at('lento5') + i * 2.8, 0.6));
  return t => { show(h, t, at('variaciones')); seg.forEach(([s, i]) => pop(s, t, at('lento5') + i * 2.8, 450 + i * 500, 600)); };
});
stillScene(svg, 'p3bb', c('competicion3'), c('cardiacas3'), { focus: [0.5, 0.5], zoom: 0.12 }, g => {
  const a = CAP(g, 'SIN CONVERTIRLO EN UNA COMPETICIÓN', { hi: 'COMPETICIÓN', size: 50 });
  return t => show(a, t, at('competicion3') + 0.2);
});
scene(svg, c('cardiacas3'), c('agotado3'), g => {
  const w = Warn(g, 'ANTES DE SUBIR LA INTENSIDAD', ['¿ENFERMEDAD DEL CORAZÓN?', '¿PROBLEMAS RESPIRATORIOS O DE MOVILIDAD?', 'CONSULTA CON UN PROFESIONAL'], { kind: 'amber', y: 200, w: 1500 });
  sfx('alert_soft', at('cardiacas3') + 0.2);
  return t => pop(w, t, at('cardiacas3') + 0.2, 960, 420);
});
stillScene(svg, 'p3bc', c('agotado3'), c('megusta3'), { focus: [0.5, 0.5], zoom: 0.12 }, g => {
  const a = CAP(g, 'GANAR CAPACIDAD, NO AGOTARTE', { hi: 'NO AGOTARTE' });
  return t => show(a, t, at('agotado3') + 1);
});
stillScene(svg, 'p3bd', c('megusta3'), c('sorprendente3'), { focus: [0.5, 0.5], zoom: 0.1 }, g => {
  const a = el('g', { transform: 'translate(-420 -760)' }, g); const l = CTA(a, 'like', 900);
  const b = el('g', {}, g); Card(b, { x: 1160, y: 75, w: 440, h: 130, fill: C.white, r: 65 }); IC.share(b, 1190, 90, 1); Text(b, 'COMPARTE', { x: 1435, y: 142, size: 46 });
  sfx('click', at('megusta3') + 7); sfx('click', at('megusta3') + 9);
  return t => { pop(l, t, at('megusta3') + 7, 540, 140); pop(b, t, at('megusta3') + 9, 1380, 140); };
});
scene(svg, c('sorprendente3'), () => END + 1, g => {
  const m = ItemCard(g, 'muslos', 640, 500, { w: 460, h: 560, fit: 460 });
  const dn = el('g', {}, g); Arrow(dn, 960, 300, 960, 620, C.red, 18);
  const a = Text(g, 'CAMINAR CADA DÍA…', { x: 1360, y: 420, size: 56 });
  const b = Text(g, '¿Y PERDER FUERZA?', { x: 1360, y: 520, size: 64, color: C.red });
  sfx('pop', at('sorprendente3')); sfx('alert_soft', at('sorprendente3') + 3);
  return t => { pop(m, t, at('sorprendente3'), 640, 500); show(a, t, at('sorprendente3') + 0.5); show(dn, t, at('sorprendente3') + 3); show(b, t, at('sorprendente3') + 3); };
});

window.draw = t => drawScenes(t);
