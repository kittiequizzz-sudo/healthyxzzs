// Punto 2 — deep squats: knee angle and pressure, load vs tolerance, the chair squat.
window.START = at('h2') - 0.3;
window.END = at('h3') - 0.3;
window.DURATION = window.END;
const svg = Stage('p2');
const c = k => () => at(k);

TitleCard(svg, 2, 'SENTADILLAS PROFUNDAS', 'Cuando fortalecer se vuelve un problema', () => START, c('baja2'));
stillScene(svg, 's1c', c('baja2'), c('curioso2'), { focus: [0.45, 0.55], zoom: 0.12 }, g => {
  const k = Kicker(g, 2, 'SENTADILLAS'); Progress(g, 1);
  const a = CAP(g, 'UNA SILLA DEMASIADO BAJA', { hi: 'DEMASIADO BAJA' });
  return t => { slideIn(k, t, at('baja2') + 0.2, 'l', 600); show(a, t, at('baja2') + 0.8); };
});
stillScene(svg, 's1b', c('curioso2'), c('demostrar'), { focus: [0.5, 0.5], zoom: 0.12 }, g => {
  const a = CAP(g, 'EL MISMO ESFUERZO… A PROPÓSITO', { hi: 'A PROPÓSITO', size: 54 });
  const s = Bubble(g, '¿Cuanto más bajo, mejor?', { cx: 1340, cy: 180, size: 48 });
  sfx('pop', at('masbajen'));
  return t => { show(a, t, at('curioso2') + 1); pop(s, t, at('masbajen'), 1340, 180); };
});
scene(svg, c('demostrar'), c('rotula'), g => {
  const a = el('g', {}, g); Card(a, { x: 260, y: 230, w: 1400, h: 220, fill: C.white }); Mark(a, false, 400, 340, 1.1); Text(a, 'DEMOSTRAR CUÁNTO SE DOBLAN', { x: 1020, y: 340, size: 56, color: C.grey });
  const b = el('g', {}, g); Card(b, { x: 260, y: 530, w: 1400, h: 220, fill: C.white }); Mark(b, true, 400, 640, 1.1); Text(b, 'SOPORTAR ESFUERZOS ADECUADOS', { x: 1020, y: 640, size: 56 });
  sfx('pop', at('demostrar')); sfx('ding', at('demostrar') + 4);
  return t => { pop(a, t, at('demostrar') + 0.2, 960, 340); pop(b, t, at('demostrar') + 4, 960, 640); };
});
// knee angle gauge and patellofemoral pressure
scene(svg, c('rotula'), c('existe2'), g => {
  const kc = ItemCard(g, 'rodilla_flex', 520, 500, { w: 640, h: 640, fit: 540 });
  const glow = el('circle', { cx: 660, cy: 420, r: 60, fill: C.red, opacity: 0 }, g);
  const ga = el('g', {}, g); const cx = 1360, cy = 620, R = 300;
  Card(ga, { x: 990, y: 200, w: 740, h: 560, fill: C.white });
  el('path', { d: `M${cx - R} ${cy} A${R} ${R} 0 0 1 ${cx} ${cy - R}`, fill: 'none', stroke: C.green, 'stroke-width': 40, opacity: 0.8 }, ga);
  el('path', { d: `M${cx} ${cy - R} A${R} ${R} 0 0 1 ${cx + R} ${cy}`, fill: 'none', stroke: C.orange, 'stroke-width': 40, opacity: 0.8 }, ga);
  const needle = el('path', { d: `M${cx} ${cy} L${cx - R + 60} ${cy}`, stroke: C.ink, 'stroke-width': 14, 'stroke-linecap': 'round' }, ga);
  el('circle', { cx, cy, r: 22, fill: C.ink }, ga);
  Text(ga, 'FLEXIÓN', { x: cx, y: cy + 80, size: 46 });
  Text(ga, 'POCA', { x: cx - R + 20, y: cy + 80, size: 32, color: C.green }); Text(ga, 'MUCHA', { x: cx + R - 20, y: cy + 80, size: 32, color: C.orange });
  const a = CAP(g, 'MÁS FLEXIÓN → MÁS PRESIÓN', { hi: 'MÁS PRESIÓN' });
  const b = Chip(g, 'NO DESTRUYE EL CARTÍLAGO', { cx: 960, cy: 140, fill: C.white, size: 44 });
  const b2 = Chip(g, 'ALGUNOS PUEDEN HACERLAS', { cx: 960, cy: 140, fill: C.green, color: C.white, size: 44 });
  sfx('pop', at('rotula')); sfx('pop', at('flexion2')); sfx('pop', at('nodestruye')); sfx('pop', at('algunas2'));
  return t => {
    pop(kc, t, at('rotula'), 520, 500); pop(ga, t, at('flexion2') - 0.6, 1360, 480);
    const u = E.inOut(prog(t, at('flexion2'), at('flexion2') + 4)) * (1 - 0.6 * E.inOut(prog(t, at('nodestruye'), at('nodestruye') + 1.5)));
    const ang = Math.PI * (1 - 0.85 * u);
    set(needle, { d: `M${cx} ${cy} L${(cx + (R - 60) * Math.cos(ang)).toFixed(1)} ${(cy - (R - 60) * Math.sin(ang)).toFixed(1)}` });
    set(glow, { opacity: (0.15 + 0.45 * u) * (t > at('flexion2') ? 1 : 0), r: 40 + 50 * u });
    show(a, t, at('flexion2') + 1.5, at('nodestruye')); show(b, t, at('nodestruye'), at('algunas2')); show(b2, t, at('algunas2'));
  };
});
// load vs tolerance
scene(svg, c('existe2'), c('imitar'), g => {
  const r = ChipRow(g, [['ARTROSIS', c('existe2')], ['DEBILIDAD', () => at('existe2') + 1], ['DOLOR PERSISTENTE', () => at('existe2') + 2]], { cy: 150, size: 40, fill: C.white });
  const sc = el('g', {}, g); const beam = el('g', {}, sc);
  el('path', { d: 'M960 820 L900 900 H1020 Z', fill: C.grey, ...ink }, sc);
  el('rect', { x: 560, y: 470, width: 800, height: 22, rx: 11, fill: C.ink }, beam);
  const L = el('g', {}, beam); Card(L, { x: 470, y: 500, w: 340, h: 180, fill: C.orange }); Text(L, 'PROFUNDIDAD', { x: 640, y: 570, size: 40, color: C.white }); Text(L, 'EXCESIVA', { x: 640, y: 620, size: 40, color: C.white });
  const Rr = el('g', {}, beam); Card(Rr, { x: 1110, y: 500, w: 340, h: 180, fill: C.green }); Text(Rr, 'TOLERANCIA', { x: 1280, y: 570, size: 40, color: C.white }); Text(Rr, 'DE LA RODILLA', { x: 1280, y: 620, size: 36, color: C.white });
  el('path', { d: 'M960 492 L960 820', stroke: C.ink, 'stroke-width': 14 }, sc);
  const a = CAP(g, 'SUPERA LA TOLERANCIA', { hi: 'SUPERA' });
  sfx('pop', at('existe2')); sfx('pop', at('existe2') + 1); sfx('pop', at('existe2') + 2); sfx('alert_soft', at('excesiva2') + 0.5);
  return t => {
    r(t); show(sc, t, at('existe2') + 2.5);
    const tilt = 9 * E.inOut(prog(t, at('excesiva2'), at('excesiva2') + 1.2));
    beam.setAttribute('transform', `rotate(${-tilt} 960 481)`); show(a, t, at('excesiva2') + 1.5);
  };
});
stillScene(svg, 's1d', c('imitar'), c('suelo2'), { focus: [0.5, 0.5], zoom: 0.1 }, g => {
  const a = CAP(g, 'NO COPIES EJERCICIOS DE JÓVENES', { hi: 'NO COPIES', size: 54 });
  return t => show(a, t, at('imitar') + 0.3);
});
stillScene(svg, 's1a', c('suelo2'), c('version2'), { focus: [0.5, 0.55], zoom: 0.12 }, g => {
  const r = SideChips(g, [['CUÁDRICEPS', c('sencillo2')], ['CADERAS ESTABLES', () => at('sencillo2') + 2.5], ['EQUILIBRIO', () => at('sencillo2') + 5]], { cx: 1600, y0: 200, size: 42 });
  const a = CAP(g, 'PARECE SENCILLO…', { hi: 'SENCILLO' });
  [0, 2.5, 5].forEach(d => sfx('pop', at('sencillo2') + d, 0.6));
  return t => { show(a, t, at('sencillo2')); r(t); };
});
stillScene(svg, 's2b', c('version2'), c('silla2'), { focus: [0.5, 0.5], zoom: 0.1 }, g => {
  const a = CAP(g, 'TU VERSIÓN SEGURA', { hi: 'SEGURA' });
  return t => show(a, t, at('version2') + 3);
});
stillScene(svg, 's2a', c('silla2'), c('situate'), { focus: [0.55, 0.5], zoom: 0.12 }, g => {
  const a = CAP(g, 'SILLA FIRME CONTRA LA PARED', { hi: 'CONTRA LA PARED' });
  return t => show(a, t, at('silla2') + 0.5);
});
// exercise: chair squat
scene(svg, c('situate'), c('molestias2'), g => {
  const h = Chip(g, 'EJERCICIO · SENTADILLA A LA SILLA', { cx: 960, cy: 95, fill: ACC, color: C.white, size: 44 });
  const row = PoseRow(g, ['ss1', 'ss2', 'ss3', 'ss4'], [], { y: 170, h: 640 });
  const steps = [['PIES AL ANCHO DE CADERAS', 'situate'], ['CADERAS ATRÁS, DESPACIO', 'flexiona2'], ['TOCA EL ASIENTO SUAVE', 'asiento'], ['SUBE CON LOS REPOSABRAZOS', 'levantarte2']].map(([s, k]) => [CAP(g, s, { cy: 920, size: 52 }), k]);
  const cnt = Counter(g, { cx: 1690, cy: 920 }); cnt.set('5 ×');
  const ok = Chip(g, 'SIN FORZAR · RESPIRA', { cx: 260, cy: 920, fill: C.green, color: C.white, size: 32 });
  ['situate', 'flexiona2', 'asiento', 'levantarte2', 'cinco2'].forEach(k => sfx('pop', at(k), 0.6));
  return t => {
    show(h, t, at('situate'));
    const keys = [at('situate'), at('flexiona2'), at('asiento'), at('levantarte2')];
    if (t < at('cinco2')) lightRow(row, t, keys);
    else { const i = Math.floor((t - at('cinco2')) / 0.9) % 4; row.forEach(({ c, st }, j) => { c.setAttribute('opacity', j === [0, 1, 2, 3][i] ? 1 : 0.4); st.draw(t, 0, 1); }); }
    steps.forEach(([c, k], i) => show(c, t, at(k), i < 3 ? at(steps[i + 1][1]) : at('cinco2')));
    show(cnt.g, t, at('cinco2')); show(ok, t, at('cinco2') + 2);
  };
});
// warning ≥ 8 s
scene(svg, c('molestias2'), c('fundamental2'), g => {
  const w = Warn(g, 'SI HAY MOLESTIAS', ['REDUCE EL RECORRIDO', 'CONSULTA A UN FISIOTERAPEUTA', '¿SE HINCHA O DUELE MÁS? → MENOS INTENSIDAD'], { kind: 'amber', y: 200, w: 1500 });
  sfx('alert_soft', at('molestias2') + 0.2);
  return t => pop(w, t, at('molestias2') + 0.2, 960, 420);
});
stillScene(svg, 's2c', c('fundamental2'), c('objetivo2'), { focus: [0.5, 0.45], zoom: 0.12 }, g => {
  const a = Chip(g, 'NO MÁS PROFUNDA', { cx: 1500, cy: 150, fill: C.white, size: 46 });
  const b = Chip(g, 'MÁS PROGRESIVA', { cx: 1500, cy: 290, fill: C.green, color: C.white, size: 46 });
  const cc = CAP(g, 'FUERZA POCO A POCO', { hi: 'POCO A POCO' });
  sfx('pop', at('fundamental2') + 2); sfx('pop', at('fundamental2') + 4.5);
  return t => { slideIn(a, t, at('fundamental2') + 2, 'r', 400); slideIn(b, t, at('fundamental2') + 4.5, 'r', 400); show(cc, t, at('fundamental2') + 0.5); };
});
stillScene(svg, 's2d', c('objetivo2'), () => END + 1, { focus: [0.5, 0.45], zoom: 0.1 }, g => {
  const r = SideChips(g, [['LEVANTARTE', () => at('objetivo2') + 4], ['CAMINAR', () => at('objetivo2') + 5.2], ['SIN DEPENDER', () => at('objetivo2') + 7]], { cx: 1640, y0: 200, size: 42 });
  const a = CAP(g, 'NO IMPRESIONAR: SER LIBRE', { hi: 'SER LIBRE' });
  [4, 5.2, 7].forEach(d => sfx('pop', at('objetivo2') + d, 0.6));
  return t => { show(a, t, at('objetivo2') + 0.5); r(t); };
});

window.draw = t => drawScenes(t);
