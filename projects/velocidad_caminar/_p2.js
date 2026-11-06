// Punto 2 — faster walking: heart, breathing, blood; regular moderate walking helps fitness, blood pressure, glucose; calves/thighs/glutes; not breathless; caution; slow still counts.
window.START = at('h2') - 0.4;
window.END = at('h3') - 0.4;
window.DURATION = window.END;
const svg = Stage('p2');
const c = k => () => at(k);

TitleCard(svg, 2, 'CAMINAR MÁS RÁPIDO', 'Corazón, músculos y circulación', () => START, c('nosabe2'));
scene(svg, c('nosabe2'), c('dos2'), g => {
  const k = Kicker(g, 2, 'PUNTO 2 · CORAZÓN'); Progress(g, 1);
  const w = el('g', {}, g); cut(w, 'reloj', 560, 520, 400); const x = el('g', {}, g); Mark(x, false, 700, 380, 1);
  const h = el('g', {}, g); cut(h, 'corazon', 1360, 520, 420);
  const t1 = Text(g, 'NO CUENTA PASOS', { x: 560, y: 820, size: 46, color: C.grey });
  const t2 = Text(g, 'SIENTE EL ESFUERZO', { x: 1360, y: 820, size: 46, color: ACC });
  sfx('pop', at('nosabe2') + 0.5); sfx('pop', at('nosabe2') + 2); sfx('pop', at('percibe2') + 0.5);
  return t => { slideIn(k, t, at('nosabe2'), 'l', 600); pop(w, t, at('nosabe2') + 0.5, 560, 520); pop(x, t, at('nosabe2') + 2, 700, 380); show(t1, t, at('nosabe2') + 2); pop(h, t, at('percibe2') + 0.5, 1360, 520); show(t2, t, at('percibe2') + 1.5); };
});
stillScene(svg, 'c1a', c('dos2'), c('tranquilo2'), { focus: [0.5, 0.5], zoom: 0.12 }, g => {
  const a = CAP(g, 'MISMOS 20 MINUTOS, ESFUERZOS DISTINTOS', { hi: 'DISTINTOS', size: 50 });
  return t => show(a, t, at('dos2') + 1);
});
scene(svg, c('tranquilo2'), c('estimulo2'), g => {
  const gg = Gauge(g, 620, 700, 300);
  const r = SideChips(g, [['EL CORAZÓN LATE MÁS DEPRISA', c('late2')], ['RESPIRACIÓN MÁS PROFUNDA', () => at('late2') + 2.5], ['MÁS OXÍGENO A LAS PIERNAS', () => at('late2') + 4.5]], { cx: 1450, y0: 330, dy: 160, size: 36 });
  const h = Text(g, 'AL ACELERAR, SUBE LA DEMANDA', { x: 960, y: 140, size: 60, color: ACC });
  sfx('pop', at('tranquilo2')); [0, 2.5, 4.5].forEach(d => sfx('pop', at('late2') + d, 0.5));
  return t => { pop(gg.g, t, at('tranquilo2'), 620, 560); gg.set(needle([[at('tranquilo2'), 0.12], [at('aumentar2'), 0.15], [at('aumentar2') + 3, 0.45]], t)); show(h, t, at('tranquilo2') + 0.5); r(t); };
});
stillScene(svg, 'c1b', c('estimulo2'), c('practica2'), { focus: [0.5, 0.4], zoom: 0.14 }, g => {
  const a = CAP(g, 'UN PEQUEÑO CAMBIO, UN GRAN ESTÍMULO', { hi: 'GRAN ESTÍMULO', size: 52 });
  return t => show(a, t, at('estimulo2') + 0.3);
});
scene(svg, c('practica2'), c('inmediatas2'), g => {
  const h = Text(g, 'CON LA PRÁCTICA REGULAR, PUEDE AYUDAR A…', { x: 960, y: 150, size: 54, color: ACC });
  const ts = [['lungs', 'MÁS\nRESISTENCIA', () => at('practica2') + 1.5, 420], ['heart', 'CONTROLAR LA\nPRESIÓN', c('presion2'), 960], ['drop', 'USAR MEJOR\nLA GLUCOSA', c('glucosa2'), 1500]]
    .map(([ic, l, k, cx]) => [IconTile(g, ic, l, cx, 520, { w: 460, h: 420 }), k, cx]);
  ts.forEach(([, k]) => sfx('pop', k(), 0.6));
  return t => { show(h, t, at('practica2')); ts.forEach(([x, k, cx]) => pop(x, t, k(), cx, 520)); };
});
stillScene(svg, 'c1c', c('inmediatas2'), () => at('inmediatas2') + 4.2, { focus: [0.55, 0.5], zoom: 0.12 }, g => {
  const a = CAP(g, 'NO ES INMEDIATO: ES PROGRESIVO', { hi: 'PROGRESIVO' });
  return t => show(a, t, at('inmediatas2') + 0.3);
});
stillScene(svg, 'c1d', () => at('inmediatas2') + 4.2, c('unico2'), { focus: [0.5, 0.5], zoom: 0.12 }, g => {
  const a = CAP(g, 'ACTIVIDAD ADECUADA Y CONSTANTE', { hi: 'CONSTANTE' });
  return t => show(a, t, at('inmediatas2') + 4.4);
});
scene(svg, c('unico2'), c('coordinadamente2'), g => {
  const h = Text(g, 'TUS PIERNAS TAMBIÉN TRABAJAN', { x: 960, y: 150, size: 66, color: ACC });
  const it = [['gemelos', 'PANTORRILLAS', 'IMPULSO', 'pantorrillas2'], ['muslos', 'MUSLOS', 'SOSTÉN', 'muslos2'], ['gluteos', 'GLÚTEOS', 'ESTABILIDAD', 'gluteos2']]
    .map(([n, l, s, k], i) => { const cx = 420 + i * 540; return [ItemCard(g, n, cx, 500, { w: 440, h: 500, fit: 340, label: l, size: 42 }), Chip(g, s, { cx, cy: 840, fill: ACC, color: C.white, size: 38 }), k, cx]; });
  it.forEach(([, , k]) => sfx('pop', at(k), 0.6));
  return t => { show(h, t, at('unico2') + 0.5); it.forEach(([cc, ch, k, cx]) => { pop(cc, t, at(k), cx, 500); pop(ch, t, at(k) + 1.2, cx, 840); }); };
});
stillScene(svg, 'c2a', c('coordinadamente2'), c('super2'), { focus: [0.5, 0.5], zoom: 0.14 }, g => {
  const a = CAP(g, 'TODO TRABAJA EN EQUIPO', { hi: 'EN EQUIPO' });
  const b = CAP(g, 'MÁS RESISTENCIA PARA SUBIR CUESTAS', { hi: 'CUESTAS', size: 52 });
  return t => { show(a, t, at('coordinadamente2') + 0.5, at('cuesta2') - 3); show(b, t, at('cuesta2') - 3); };
});
stillScene(svg, 'c2b', c('super2'), c('autobus2'), { focus: [0.5, 0.45], zoom: 0.12 }, g => {
  const a = CAP(g, 'EL SUPERMERCADO', { hi: 'SUPERMERCADO' });
  return t => show(a, t, at('super2'));
});
stillScene(svg, 'c2c', c('autobus2'), c('confusion2'), { focus: [0.4, 0.5], zoom: 0.12 }, g => {
  const a = CAP(g, 'LA PARADA DEL AUTOBÚS, SIN DESCANSOS', { hi: 'SIN DESCANSOS', size: 50 });
  return t => show(a, t, at('autobus2'));
});
scene(svg, c('confusion2'), c('depende2'), g => {
  const p = el('g', {}, g); Card(p, { x: 560, y: 160, w: 800, h: 640, fill: C.white }); cut(p, 'rapido', 960, 480, 560);
  const x = el('g', {}, g); Mark(x, false, 1300, 230, 1.3);
  const a = CAP(g, 'MÁS RÁPIDO ≠ SIN ALIENTO', { hi: 'SIN ALIENTO' });
  sfx('pop', at('confusion2') + 1); sfx('stamp', at('aliento2'));
  return t => { pop(p, t, at('confusion2') + 1, 960, 480); pop(x, t, at('aliento2'), 1300, 230); show(a, t, at('aliento2')); };
});
scene(svg, c('depende2'), c('equilibrio2'), g => {
  const h = Text(g, 'LA INTENSIDAD DEPENDE DE TI', { x: 960, y: 150, size: 66, color: ACC });
  const a = el('g', {}, g); Card(a, { x: 200, y: 260, w: 700, h: 560, fill: C.white }); cut(a, 'lento', 550, 500, 380); Text(a, 'UN POCO MÁS QUE TU PASO', { x: 550, y: 770, size: 36 });
  const b = el('g', {}, g); Card(b, { x: 1020, y: 260, w: 700, h: 560, fill: C.white }); cut(b, 'moderado', 1370, 500, 380); Text(b, 'CON MÁS ENERGÍA', { x: 1370, y: 770, size: 36 });
  const n = Chip(g, 'AMBOS PUEDEN SER «MODERADO»', { cx: 960, cy: 930, fill: C.white, size: 40 });
  sfx('pop', at('depende2') + 1); sfx('pop', at('otras2')); sfx('ding', at('otras2') + 2.5);
  return t => { show(h, t, at('depende2')); pop(a, t, at('depende2') + 1, 550, 540); pop(b, t, at('otras2'), 1370, 540); pop(n, t, at('otras2') + 2.5, 960, 930); };
});
scene(svg, c('equilibrio2'), c('despacio2'), g => {
  const w = Warn(g, 'CUIDADO SI TIENES…', ['PROBLEMAS DE EQUILIBRIO', 'DOLOR ARTICULAR IMPORTANTE', 'ENFERMEDAD CARDIOVASCULAR'], { kind: 'amber', y: 150, w: 1400 });
  const k = Chip(g, 'NO ACELERES SIN ORIENTACIÓN PROFESIONAL', { cx: 960, cy: 720, fill: C.white, size: 40 });
  const m = Chip(g, 'ESTIMULAR SIN SUPERAR TUS LÍMITES', { cx: 960, cy: 870, fill: ACC, color: C.white, size: 44 });
  sfx('alert', at('equilibrio2') + 0.3); sfx('pop', at('equilibrio2') + 6); sfx('ding', at('mejora2'));
  return t => { pop(w, t, at('equilibrio2') + 0.3, 960, 380); pop(k, t, at('equilibrio2') + 6, 960, 720); pop(m, t, at('mejora2'), 960, 870); };
});
stillScene(svg, 'c2d', c('despacio2'), c('reconocer2'), { focus: [0.5, 0.5], zoom: 0.12 }, g => {
  const a = CAP(g, 'CAMINAR DESPACIO TAMBIÉN SUMA', { hi: 'TAMBIÉN SUMA' });
  const b = el('g', {}, g); Mark(b, true, 1720, 180, 1.2);
  sfx('ding', at('despacio2') + 1);
  return t => { show(a, t, at('despacio2') + 0.3); pop(b, t, at('despacio2') + 1, 1720, 180); };
});
scene(svg, c('reconocer2'), c('prueba2'), g => {
  const h = Text(g, '¿TRABAJA LO SUFICIENTE TU CUERPO?', { x: 960, y: 160, size: 60, color: ACC });
  const it = [['reloj', 560], ['corazon', 1360]].map(([n, cx]) => { const x = el('g', {}, g); cut(x, n, cx, 520, 340); return [x, cx]; });
  const m1 = el('g', {}, g); Mark(m1, false, 700, 380, 0.9); const m2 = el('g', {}, g); Mark(m2, false, 1500, 380, 0.9);
  const a = Chip(g, 'NO HACE FALTA RELOJ NI PULSÓMETRO', { cx: 960, cy: 860, fill: C.white, size: 44 });
  sfx('pop', at('ventaja2') + 2); sfx('pop', at('ventaja2') + 4);
  return t => { show(h, t, at('reconocer2')); it.forEach(([x, cx], i) => pop(x, t, at('reconocer2') + 1.5 + i, cx, 520)); pop(m1, t, at('ventaja2') + 2, 700, 380); pop(m2, t, at('ventaja2') + 4, 1500, 380); pop(a, t, at('ventaja2') + 4.5, 960, 860); };
});
scene(svg, c('prueba2'), () => END + 1, g => {
  const host = Host(g, 'three_q', { cx: 420, cy: 600, fit: 700 });
  const q = Bubble(g, 'Una prueba con tu propia voz', { cx: 1220, cy: 330, size: 52 });
  const b = el('g', {}, g); IC.bubble(b, 1100, 520, 2.6);
  sfx('ding', at('prueba2') + 0.5); sfx('pop', at('voz2'));
  return t => { host(t, at('prueba2')); pop(q, t, at('prueba2') + 0.5, 1220, 330); pop(b, t, at('voz2'), 1230, 650); };
});

window.draw = t => drawScenes(t);
