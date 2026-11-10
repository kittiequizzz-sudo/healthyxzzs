// Señal 3 — cold feet / tingling: normal vs repeated; circulation (arteries as roads, plaques, PAD, risk factors, calf pain that eases with rest, slow wounds) vs nerves (cables; pins, burning, numbness; diabetes, B12, compression); diabetes foot care; acute cold pale foot = emergency.
window.START = at('h3') - 1.2;
window.END = at('h4') - 1.2;
window.DURATION = window.END;
const svg = Stage('p3');
const c = k => () => at(k);

TitleCard(svg, 3, 'PIES FRÍOS U HORMIGUEO', 'Que aparece sin explicación', () => START, c('revelar3'));
scene(svg, c('revelar3'), c('invierno3'), g => {
  const k = Kicker(g, 3, 'SEÑAL 3 · PIES'); Progress(g, 2);
  const p = el('g', {}, g); cut(p, 'pie', 960, 560, 520);
  const a = CAP(g, 'TUS PIES PUEDEN AVISAR ANTES QUE EL DOLOR', { hi: 'ANTES', size: 50 });
  sfx('pop', at('revelar3') + 0.5);
  return t => { slideIn(k, t, at('revelar3'), 'l', 600); pop(p, t, at('revelar3') + 0.5, 960, 560); show(a, t, at('curioso3')); };
});
scene(svg, c('invierno3'), c('dos3'), g => {
  const k = Kicker(g, 3, 'SEÑAL 3 · PIES'); Progress(g, 2);
  const v = VsCards(g, ['NORMAL', [['Pies fríos en invierno', () => at('invierno3') + 0.5], ['Pierna dormida tras estar quieto', () => at('duerma3') + 1]]],
    ['MERECE ATENCIÓN', [['Frío u hormigueo repetido', () => at('repetida3') + 1], ['Entumecimiento frecuente', () => at('repetida3') + 3], ['Incluso con calor', () => at('repetida3') + 5.5]]]);
  sfx('pop', at('invierno3')); sfx('pop', at('repetida3'));
  return t => { v.draw(t, at('invierno3'), at('repetida3')); };
});
scene(svg, c('dos3'), c('carreteras3'), g => {
  const h = Text(g, 'DOS SISTEMAS CLAVE', { x: 960, y: 160, size: 72, color: ACC });
  const a = ItemCard(g, 'arteria', 560, 540, { w: 560, h: 520, fit: 400, label: 'CIRCULACIÓN', size: 46 });
  const b = ItemCard(g, 'nervio', 1360, 540, { w: 560, h: 520, fit: 400, label: 'NERVIOS PERIFÉRICOS', size: 40 });
  sfx('pop', at('dos3') + 3.5); sfx('pop', at('dos3') + 5.5);
  return t => { show(h, t, at('dos3')); pop(a, t, at('dos3') + 3.5, 560, 540); pop(b, t, at('dos3') + 5.5, 1360, 540); };
});
// arteries as roads that narrow
scene(svg, c('carreteras3'), c('eap3'), g => {
  const h = Text(g, 'LAS ARTERIAS: CARRETERAS DE OXÍGENO', { x: 960, y: 150, size: 56, color: ACC });
  const road = el('g', {}, g);
  el('rect', { x: 160, y: 380, width: 1600, height: 240, rx: 120, fill: '#E7B8B0', stroke: C.ink, 'stroke-width': 6 }, road);
  const plaque = el('path', { fill: '#E9CF7A', stroke: C.ink, 'stroke-width': 5 }, road);
  const dots = [0, 1, 2, 3, 4, 5].map(() => el('circle', { r: 26, fill: C.red, stroke: C.ink, 'stroke-width': 4 }, road));
  const lab = Chip(g, 'PLACAS DE GRASA → MENOS SANGRE A LOS PIES', { cx: 960, cy: 820, fill: C.white, size: 40 });
  sfx('pop', at('carreteras3') + 0.5); sfx('stamp', at('placas3') + 2);
  return t => { show(h, t, at('carreteras3')); show(road, t, at('carreteras3') + 0.5);
    const u = E.inOut(prog(t, at('placas3') + 1, at('placas3') + 4)), ph = 170 * u;
    set(plaque, { d: `M760 380 Q960 ${380 + ph} 1160 380 Z M760 620 Q960 ${620 - ph} 1160 620 Z` });
    dots.forEach((d, i) => { const x = 200 + ((t * (220 - 140 * u) + i * 280) % 1560); const y = 500 + 60 * Math.sin(i * 2); set(d, { cx: x.toFixed(1), cy: y.toFixed(1), opacity: t > at('carreteras3') + 0.5 ? 1 : 0 }); });
    pop(lab, t, at('placas3') + 2, 960, 820); };
});
scene(svg, c('eap3'), c('pista3'), g => {
  const h = Text(g, 'ENFERMEDAD ARTERIAL PERIFÉRICA', { x: 960, y: 160, size: 62, color: ACC });
  const s = Text(g, 'MÁS PROBABLE CON…', { x: 960, y: 260, size: 44 });
  const ts = [['flame', 'TABACO', 0], ['sugar', 'DIABETES', 1.3], ['heart', 'HIPERTENSIÓN', 2.6], ['drop', 'COLESTEROL\nALTO', 4]].map(([ic, l, d], i) => [IconTile(g, ic, l, 300 + i * 440, 580, { w: 400, h: 400 }), d, 300 + i * 440]);
  ts.forEach(([, d]) => sfx('pop', at('eap3') + 2 + d, 0.5));
  return t => { show(h, t, at('eap3')); show(s, t, at('eap3') + 1.5); ts.forEach(([x, d, cx]) => pop(x, t, at('eap3') + 2 + d, cx, 580)); };
});
stillScene(svg, 'd1b', c('pista3'), () => at('pista3') + 3.8, { focus: [0.5, 0.6], zoom: 0.14 }, g => {
  const a = CAP(g, 'DOLOR EN LA PANTORRILLA AL CAMINAR', { hi: 'PANTORRILLA', size: 52 });
  return t => show(a, t, at('pista3') + 0.3);
});
stillScene(svg, 'd1c', () => at('pista3') + 3.8, c('heridas3'), { focus: [0.4, 0.45], zoom: 0.12 }, g => {
  const a = CAP(g, '…QUE MEJORA AL DESCANSAR', { hi: 'DESCANSAR' });
  return t => show(a, t, at('pista3') + 4);
});
stillScene(svg, 'd1d', c('heridas3'), c('nervios3'), { focus: [0.5, 0.5], zoom: 0.12 }, g => {
  const r = SideChips(g, [['HERIDAS QUE NO CICATRIZAN', () => at('heridas3') + 0.5], ['CAMBIOS DE TEMPERATURA', () => at('heridas3') + 3.5], ['CAMBIOS DE COLOR', () => at('heridas3') + 5]], { cx: 520, y0: 180, dy: 120, size: 36 });
  [0.5, 3.5, 5].forEach(d => sfx('pop', at('heridas3') + d, 0.5));
  return r;
});
// nerves as cables
scene(svg, c('nervios3'), c('b12_3'), g => {
  const h = Text(g, 'LOS NERVIOS: CABLES ENTRE PIES Y CEREBRO', { x: 960, y: 150, size: 54, color: ACC });
  const p = el('g', {}, g); cut(p, 'pie', 330, 620, 380);
  const b = el('g', {}, g); cut(b, 'cerebro', 1590, 420, 340);
  const wire = el('path', { d: 'M420 560 C760 560 900 420 1420 420', fill: 'none', stroke: '#E2C25A', 'stroke-width': 18, 'stroke-linecap': 'round' }, g);
  const sig = [0, 1, 2].map(() => el('circle', { r: 16, fill: C.white, stroke: C.ink, 'stroke-width': 4 }, g));
  const r = ChipRow(g, [['PINCHAZOS', () => at('pinchazos3') + 3], ['QUEMAZÓN', () => at('pinchazos3') + 4], ['DESCARGAS', () => at('pinchazos3') + 5], ['MENOS SENSIBILIDAD', () => at('pinchazos3') + 6.5]], { cy: 900, size: 36 });
  const L = wire.getTotalLength ? 1100 : 1100;
  sfx('pop', at('cables3')); [3, 4, 5, 6.5].forEach(d => sfx('pop', at('pinchazos3') + d, 0.4));
  return t => { show(h, t, at('nervios3') + 0.5); pop(p, t, at('cables3'), 330, 620); pop(b, t, at('cables3') + 0.5, 1590, 420); show(wire, t, at('cables3') + 1);
    const bad = t > at('pinchazos3');
    sig.forEach((d, i) => { const u = ((t * 0.45) + i / 3) % 1; const pt = wire.getPointAtLength(u * wire.getTotalLength()); set(d, { cx: pt.x.toFixed(1), cy: pt.y.toFixed(1), opacity: t > at('cables3') + 1 ? (bad && i % 2 ? 0.25 : 1) : 0 }); });
    r(t); };
});
scene(svg, c('b12_3'), c('detalle3'), g => {
  const h = Text(g, 'PUEDE RELACIONARSE CON…', { x: 960, y: 160, size: 64, color: ACC });
  const ts = [['sugar', 'DIABETES', 0.3], ['pill', 'FALTA DE\nVITAMINA B12', 2.5], ['hand', 'COMPRESIÓN\nDE UN NERVIO', 5.5]].map(([ic, l, d], i) => [IconTile(g, ic, l, 420 + i * 540, 560, { w: 460, h: 440 }), d, 420 + i * 540]);
  ts.forEach(([, d]) => sfx('pop', at('b12_3') + d, 0.5));
  return t => { show(h, t, at('b12_3')); ts.forEach(([x, d, cx]) => pop(x, t, at('b12_3') + d, cx, 560)); };
});
stillScene(svg, 'd2a', c('detalle3'), c('diabetes3'), { focus: [0.5, 0.6], zoom: 0.12 }, g => {
  const a = CAP(g, 'SIN SENSIBILIDAD, LAS HERIDAS PASAN DESAPERCIBIDAS', { hi: 'DESAPERCIBIDAS', size: 44 });
  return t => show(a, t, at('sensibilidad3'));
});
stillScene(svg, 'd2b', c('diabetes3'), c('urgente3'), { focus: [0.6, 0.55], zoom: 0.14 }, g => {
  const r = SideChips(g, [['HERIDAS', () => at('diabetes3') + 4], ['AMPOLLAS', () => at('diabetes3') + 5], ['CAMBIOS EN LA PIEL', () => at('diabetes3') + 6]], { cx: 380, y0: 180, dy: 120, size: 40 });
  const a = CAP(g, 'CON DIABETES: REVISA TUS PIES', { hi: 'REVISA' });
  [4, 5, 6].forEach(d => sfx('pop', at('diabetes3') + d, 0.5));
  return t => { show(a, t, at('diabetes3') + 0.5); r(t); };
});
scene(svg, c('urgente3'), c('leves3'), g => {
  const w = el('g', {}, g); Warn(el('g', { transform: 'translate(-280 0)' }, w), 'PIE DE REPENTE…', ['MUY FRÍO', 'PÁLIDO', 'DOLOROSO', 'SIN SENSIBILIDAD'], { kind: 'red', y: 120, w: 1100 });
  const p = el('g', {}, g); cut(p, 'pie', 1560, 380, 340);
  const u = el('g', {}, g); Card(u, { x: 1260, y: 640, w: 600, h: 150, fill: C.red, r: 75 }); IC.phone(u, 1290, 665, 1); Text(u, 'URGENCIAS · 112', { x: 1600, y: 717, size: 48, color: C.white });
  sfx('alert', at('urgente3') + 0.3); sfx('alert', at('urgente3') + 7);
  return t => { show(w, t, at('urgente3') + 0.3); pop(p, t, at('urgente3') + 1, 1560, 380); pop(u, t, at('urgente3') + 7, 1560, 715); };
}, true);
stillScene(svg, 'd1a', c('leves3'), c('observa3'), { focus: [0.5, 0.6], zoom: 0.12 }, g => {
  const a = CAP(g, 'LEVES PERO PERSISTENTES → CONSULTA', { hi: 'CONSULTA', size: 52 });
  return t => show(a, t, at('leves3') + 1);
});
stillScene(svg, 'd2c', c('observa3'), c('movilidad3'), { focus: [0.55, 0.6], zoom: 0.12 }, g => {
  const a = CAP(g, 'COMPARA TUS DOS PIES', { hi: 'DOS PIES' });
  return t => show(a, t, at('observa3') + 0.5);
});
stillScene(svg, 'd2d', c('movilidad3'), c('moratones3'), { focus: [0.5, 0.5], zoom: 0.12 }, g => {
  const a = CAP(g, 'CIRCULACIÓN Y NERVIOS = MOVILIDAD SEGURA', { hi: 'MOVILIDAD', size: 50 });
  return t => show(a, t, at('movilidad3') + 1);
});
scene(svg, c('moratones3'), () => END + 1, g => {
  const host = Host(g, 'three_q', { cx: 420, cy: 600, fit: 700 });
  const q = Bubble(g, '¿Manchas moradas sin golpe?', { cx: 1220, cy: 330, size: 52 });
  const p = el('g', {}, g); cut(p, 'moraton', 1220, 660, 320);
  sfx('ding', at('moratones3'));
  return t => { host(t, at('moratones3')); pop(q, t, at('moratones3'), 1220, 330); pop(p, t, at('moratones3') + 3, 1220, 660); };
});

window.draw = t => drawScenes(t);
