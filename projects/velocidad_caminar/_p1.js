// Punto 1 — gait speed reveals health: slow by choice vs slow by need; many systems work; JAMA 2011 (Studenski) association, not cause; watch trends.
window.START = at('h1') - 0.8;
window.END = at('h2') - 0.4;
window.DURATION = window.END;
const svg = Stage('p1');
const c = k => () => at(k);

TitleCard(svg, 1, 'TU VELOCIDAD REVELA TU SALUD', 'Más de lo que imaginas', () => START, c('paisaje1'));
stillScene(svg, 's1a', c('paisaje1'), c('nopuede1'), { focus: [0.45, 0.5], zoom: 0.12 }, g => {
  const k = Kicker(g, 1, 'PUNTO 1 · VELOCIDAD'); Progress(g, 0);
  const a = CAP(g, 'DESPACIO… PORQUE DISFRUTAS', { hi: 'DISFRUTAS' });
  return t => { slideIn(k, t, at('paisaje1'), 'l', 600); show(a, t, at('paisaje1') + 2); };
});
stillScene(svg, 's1b', c('nopuede1'), c('iguales1'), { focus: [0.5, 0.5], zoom: 0.12 }, g => {
  const a = CAP(g, '…O PORQUE NO PUEDES MÁS', { hi: 'NO PUEDES MÁS' });
  return t => show(a, t, at('nopuede1') + 0.3);
});
scene(svg, c('iguales1'), c('complejo1'), g => {
  const a = el('g', {}, g); Card(a, { x: 180, y: 160, w: 620, h: 500, fill: C.white }); cut(a, 'lento', 490, 380, 380); Text(a, 'POR GUSTO', { x: 490, y: 620, size: 40, color: C.green });
  const b = el('g', {}, g); Card(b, { x: 1120, y: 160, w: 620, h: 500, fill: C.white }); cut(b, 'lento', 1430, 380, 380); Text(b, 'POR NECESIDAD', { x: 1430, y: 620, size: 40, color: C.red });
  const eq = Text(g, '=', { x: 960, y: 420, size: 120, color: C.grey });
  const l = Chip(g, 'A SIMPLE VISTA, IGUALES', { cx: 960, cy: 760, fill: C.white, size: 44 });
  const m = Chip(g, 'PARA EL MÉDICO: HISTORIAS DISTINTAS', { cx: 960, cy: 900, fill: ACC, color: C.white, size: 44 });
  sfx('pop', at('iguales1')); sfx('pop', at('medico1') + 1);
  return t => { pop(a, t, at('iguales1'), 490, 410); pop(b, t, at('iguales1') + 0.4, 1430, 410); show(eq, t, at('iguales1') + 1); pop(l, t, at('iguales1') + 1, 960, 760); pop(m, t, at('medico1') + 1, 960, 900); };
});
stillScene(svg, 's1c', c('complejo1'), c('musculos1'), { focus: [0.5, 0.35], zoom: 0.12 }, g => {
  const a = CAP(g, 'CAMINAR: UN TRABAJO MUY COMPLEJO', { hi: 'COMPLEJO' });
  return t => show(a, t, at('complejo1') + 0.5);
});
scene(svg, c('musculos1'), c('indicador1'), g => {
  const it = [['muslos', 'MÚSCULOS', 'musculos1', 'MOVIMIENTO'], ['corazon', 'CORAZÓN', 'corazon1', 'OXÍGENO'], ['pulmones', 'PULMONES', 'pulmones1', 'RESPIRACIÓN'], ['cerebro', 'CEREBRO', 'cerebro1', 'EQUILIBRIO']]
    .map(([n, l, k, s], i) => { const cx = 285 + i * 450; const card = ItemCard(g, n, cx, 470, { w: 400, h: 460, fit: 280, label: l, size: 42 }); const ch = Chip(g, s, { cx, cy: 790, fill: ACC, color: C.white, size: 34 }); return [card, ch, k, cx]; });
  const a = CAP(g, 'MUCHOS SISTEMAS A LA VEZ', { hi: 'A LA VEZ' });
  it.forEach(([, , k]) => sfx('pop', at(k), 0.6));
  return t => { it.forEach(([cc, ch, k, cx]) => { pop(cc, t, at(k), cx, 470); pop(ch, t, at(k) + 1, cx, 790); }); show(a, t, at('automatica1') + 1); };
});
scene(svg, c('indicador1'), c('jama1'), g => {
  const gg = Gauge(g, 960, 700, 300, { labels: ['LENTA', 'NORMAL', 'ÁGIL'] });
  const h = Text(g, 'VELOCIDAD HABITUAL = INDICADOR DE CAPACIDAD FÍSICA', { x: 960, y: 170, size: 50, color: ACC });
  sfx('pop', at('indicador1'));
  return t => { pop(gg.g, t, at('indicador1'), 960, 560); gg.set(needle([[at('indicador1'), 0.1], [at('indicador1') + 2.5, 0.62]], t)); show(h, t, at('indicador1') + 0.6); };
});
stillScene(svg, 's1d', c('jama1'), c('general1'), { focus: [0.5, 0.5], zoom: 0.12 }, g => {
  const a = CAP(g, 'MILES DE ADULTOS MAYORES ESTUDIADOS', { hi: 'MILES', size: 52 });
  const s = Source(g, 'Studenski et al., JAMA 2011', 70);
  return t => { show(a, t, at('jama1') + 2); show(s, t, at('jama1') + 2); };
});
scene(svg, c('general1'), c('atencion1'), g => {
  const h = Text(g, 'EN GENERAL…', { x: 960, y: 150, size: 70, color: ACC });
  const a = el('g', {}, g); Card(a, { x: 180, y: 260, w: 700, h: 560, fill: C.white }); cut(a, 'moderado', 530, 520, 400); Text(a, 'MÁS ÁGILES', { x: 530, y: 770, size: 46, color: C.green });
  const b = el('g', {}, g); Card(b, { x: 1040, y: 260, w: 700, h: 560, fill: C.white }); cut(b, 'lento', 1390, 520, 400); Text(b, 'MÁS LENTOS', { x: 1390, y: 770, size: 46, color: C.grey });
  const r = Chip(g, 'MEJORES PERSPECTIVAS DE SUPERVIVENCIA', { cx: 960, cy: 920, fill: C.white, size: 40 });
  sfx('pop', at('general1') + 1); sfx('pop', at('general1') + 3); sfx('ding', at('general1') + 5);
  return t => { show(h, t, at('general1')); pop(a, t, at('general1') + 1, 530, 540); pop(b, t, at('general1') + 3, 1390, 540); pop(r, t, at('general1') + 5, 960, 920); };
});
scene(svg, c('atencion1'), c('piensalo1'), g => {
  const s = Stamp(g, 'ATENCIÓN', { cx: 960, cy: 200, size: 80, color: C.red, rot: -4 });
  const a = el('g', {}, g); Card(a, { x: 160, y: 360, w: 1600, h: 200, fill: C.white }); Mark(a, false, 300, 460, 1.1); Text(a, 'FORZAR EL PASO NO ALARGA LA VIDA', { x: 1010, y: 465, size: 56 });
  const b = el('g', {}, g); Card(b, { x: 160, y: 620, w: 1600, h: 200, fill: C.white }); Mark(b, true, 300, 720, 1.1); Text(b, 'LA VELOCIDAD REFLEJA TU SALUD', { x: 1010, y: 725, size: 56, color: ACC });
  const n = Source(g, 'Asociación, no causa');
  sfx('stamp', at('atencion1') + 0.3); sfx('pop', at('nosignifica1') + 0.5); sfx('pop', at('refleja1') + 0.5);
  return t => { s.draw(t, at('atencion1') + 0.3); pop(a, t, at('nosignifica1') + 0.5, 960, 460); pop(b, t, at('refleja1') + 0.5, 960, 720); show(n, t, at('refleja1') + 2); };
});
scene(svg, c('piensalo1'), c('notado1'), g => {
  const h = Text(g, 'PIÉNSALO ASÍ', { x: 960, y: 140, size: 70, color: ACC });
  const ok = [['FUERZA', 'muslos'], ['ARTICULACIONES', 'gemelos'], ['CORAZÓN EN FORMA', 'corazon']].map(([l], i) => Chip(g, l, { cx: 480, cy: 280 + i * 115, fill: '#D3E4D8', size: 46 }));
  const p1 = el('g', {}, g); cut(p1, 'moderado', 480, 790, 420);
  const ko = [['DEBILIDAD MUSCULAR'], ['FALTA DE AIRE'], ['POCO EQUILIBRIO']].map(([l], i) => Chip(g, l, { cx: 1440, cy: 280 + i * 115, fill: '#EAD3D0', size: 46 }));
  const p2 = el('g', {}, g); cut(p2, 'lento', 1440, 790, 420);
  [0, 1, 2].forEach(i => { sfx('pop', at('soltura1') + i * 2, 0.5); sfx('pop', at('debilidad1') + i * 2, 0.5); });
  return t => { show(h, t, at('piensalo1')); ok.forEach((x, i) => slideIn(x, t, at('soltura1') + i * 2, 'l', 400)); pop(p1, t, at('soltura1') + 7, 480, 790); ko.forEach((x, i) => slideIn(x, t, at('debilidad1') + i * 2, 'r', 400)); pop(p2, t, at('debilidad1') + 6.5, 1440, 790); };
});
stillScene(svg, 's2c', c('notado1'), c('nosiempre1'), { focus: [0.45, 0.55], zoom: 0.12 }, g => {
  const a = CAP(g, '¿AHORA TARDAS MÁS QUE ANTES?', { hi: 'TARDAS MÁS' });
  return t => show(a, t, at('notado1') + 0.5);
});
scene(svg, c('nosiempre1'), c('trayecto1'), g => {
  const h = Text(g, 'NO SIEMPRE ES UNA ENFERMEDAD', { x: 960, y: 150, size: 64, color: ACC });
  const r = ChipRow(g, [['EL TERRENO', c('terreno1')], ['EL CANSANCIO', () => at('terreno1') + 1.2], ['MEDICAMENTOS', () => at('terreno1') + 2.4], ['DOLOR ARTICULAR', () => at('terreno1') + 3.8]], { cy: 360, size: 40 });
  const w = Warn(g, 'MERECE ATENCIÓN', ['SI TU VELOCIDAD BAJA POCO A POCO', 'O SIN EXPLICACIÓN → CONSULTA'], { kind: 'amber', y: 520, w: 1400 });
  sfx('alert', at('progresiva1'));
  return t => { show(h, t, at('nosiempre1')); r(t); pop(w, t, at('progresiva1'), 960, 700); };
});
stillScene(svg, 's2a', c('trayecto1'), c('reloj1'), { focus: [0.5, 0.5], zoom: 0.12 }, g => {
  const r = SideChips(g, [['MISMO TRAYECTO CORTO', () => at('trayecto1') + 2], ['CONDICIONES SIMILARES', () => at('trayecto1') + 5], ['TU PASO NATURAL', () => at('trayecto1') + 7]], { cx: 1480, y0: 200, dy: 120, size: 38 });
  [2, 5, 7].forEach(d => sfx('pop', at('trayecto1') + d, 0.5));
  return t => r(t);
});
stillScene(svg, 'i2c', c('reloj1'), c('tendencias1'), { focus: [0.45, 0.45], zoom: 0.1 }, g => {
  const a = CAP(g, 'SIN COMPETIR CON EL RELOJ', { hi: 'SIN COMPETIR' });
  return t => show(a, t, at('reloj1') + 0.2);
});
stillScene(svg, 's2b', c('tendencias1'), c('comenta1'), { focus: [0.5, 0.5], zoom: 0.12 }, g => {
  const a = CAP(g, 'TENDENCIAS, NO CIFRAS PERFECTAS', { hi: 'TENDENCIAS' });
  return t => show(a, t, at('tendencias1') + 0.5);
});
stillScene(svg, 's2d', c('comenta1'), c('interesante1'), { focus: [0.5, 0.45], zoom: 0.1 }, g => {
  const a = el('g', {}, g); const cc = CTA(a, 'comment', 160);
  const b = CAP(g, '¿CAMINAS MÁS DESPACIO QUE ANTES?', { hi: 'MÁS DESPACIO', size: 52 });
  sfx('click', at('comenta1') + 1);
  return t => { pop(cc, t, at('comenta1') + 1, 960, 160); show(b, t, at('comenta1') + 1.5); };
});
scene(svg, c('interesante1'), () => END + 1, g => {
  const host = Host(g, 'three_q', { cx: 420, cy: 600, fit: 700 });
  const q = Bubble(g, '¿Qué pasa al acelerar un poco?', { cx: 1220, cy: 330, size: 50 });
  const it = [['corazon', 1050], ['gemelos', 1400]].map(([n, cx]) => { const x = el('g', {}, g); cut(x, n, cx, 700, 260); return [x, cx]; });
  sfx('ding', at('interesante1') + 0.5);
  return t => { host(t, at('interesante1')); pop(q, t, at('interesante1') + 0.5, 1220, 330); it.forEach(([x, cx], i) => pop(x, t, at('interesante1') + 4 + i, cx, 700)); };
});

window.draw = t => drawScenes(t);
