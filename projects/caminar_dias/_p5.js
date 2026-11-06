// Punto 5 — rest matters: no obligation to walk 7 days, WHO 150–300 min/week, 30×5, start lower, signals to reduce, active rest, discipline.
window.START = at('h5') - 0.7;
window.END = at('h6') - 0.2;
window.DURATION = window.END;
const svg = Stage('p5');
const c = k => () => at(k);

TitleCard(svg, 5, 'DESCANSAR TAMBIÉN IMPORTA', 'Caminar cada día puede ser bueno', () => START, c('siete5'));
stillScene(svg, 'p5aa', c('siete5'), c('recuperacion5'), { focus: [0.5, 0.5], zoom: 0.12 }, g => {
  const k = Kicker(g, 5, 'PUNTO 5 · DESCANSO'); Progress(g, 4);
  const a = CAP(g, '¿7 DE 7, SÍ O SÍ?', { hi: '7 DE 7' });
  const b = CAP(g, 'EL CUERPO NO FUNCIONA ASÍ', { hi: 'NO' });
  return t => { slideIn(k, t, at('siete5'), 'l', 600); show(a, t, at('siete5') + 0.3, at('organismo5')); show(b, t, at('organismo5')); };
});
stillScene(svg, 'p5ab', c('recuperacion5'), c('oms'), { focus: [0.5, 0.45], zoom: 0.12 }, g => {
  const a = CAP(g, 'LA RECUPERACIÓN TAMBIÉN CUENTA', { hi: 'RECUPERACIÓN' });
  const b = Stamp(g, 'NO HAY OBLIGACIÓN DE 7 DÍAS', { cx: 1250, cy: 180, size: 52, color: C.green, rot: -3 });
  sfx('stamp', at('obligacion5'));
  return t => { show(a, t, at('recuperacion5') + 2, at('obligacion5')); b.draw(t, at('obligacion5')); };
});
// WHO weekly minutes
scene(svg, c('oms'), c('cuidado5'), g => {
  const h = Text(g, '150–300 MINUTOS / SEMANA', { x: 960, y: 140, size: 80, color: ACC });
  const s = Text(g, 'actividad moderada · OMS', { x: 960, y: 220, size: 40, weight: 700 });
  const days = ['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((d, i) => { const w = el('g', {}, g), x = 200 + i * 225; el('rect', { x, y: 360, width: 190, height: 300, rx: 20, fill: C.white, stroke: C.ink, 'stroke-width': 5 }, w); Text(w, d, { x: x + 95, y: 410, size: 48 }); const f = el('rect', { x: x + 20, y: 640, width: 150, height: 0, rx: 12, fill: C.green }, w); const n = Text(w, "30'", { x: x + 95, y: 540, size: 52, color: C.white }); n.setAttribute('opacity', 0); return [w, f, n, i]; });
  const tot = Chip(g, "5 × 30' = 150 MINUTOS", { cx: 960, cy: 790, fill: C.green, color: C.white, size: 50 });
  const alt = Chip(g, 'O PASEOS MÁS CORTOS REPARTIDOS', { cx: 960, cy: 920, fill: C.white, size: 40 });
  const src = Source(g, 'OMS 2020 · adultos mayores');
  sfx('pop', at('oms')); [0, 1, 2, 3, 4].forEach(i => sfx('pop', at('cinco5') + i * 0.5, 0.4)); sfx('ding', at('cinco5') + 3); sfx('pop', at('repartir5'));
  return t => {
    show(h, t, at('oms')); show(s, t, at('oms') + 1); show(src, t, at('oms') + 1);
    days.forEach(([w, f, n, i]) => { show(w, t, at('oms') + 3 + i * 0.15); const on = i < 5 && t > at('cinco5') + i * 0.5; set(f, { y: on ? 380 : 640, height: on ? 260 : 0 }); n.setAttribute('opacity', on ? 1 : 0); });
    pop(tot, t, at('cinco5') + 3, 960, 790); pop(alt, t, at('repartir5'), 960, 920);
  };
});
stillScene(svg, 'p5ac', c('cuidado5'), c('todos5'), { focus: [0.5, 0.5], zoom: 0.12 }, g => {
  const a = CAP(g, 'NO ES UNA EXIGENCIA ABSOLUTA', { hi: 'NO' });
  const b = Chip(g, 'EMPIEZA CON MENOS Y SUBE POCO A POCO', { cx: 1150, cy: 140, fill: C.white, size: 36 });
  sfx('pop', at('apenas5'));
  return t => { show(a, t, at('cuidado5') + 0.3); pop(b, t, at('apenas5'), 1150, 140); };
});
scene(svg, c('todos5'), () => at('dolor5') + 6, g => {
  const ok = el('g', {}, g); Card(ok, { x: 160, y: 200, w: 760, h: 620, fill: C.white }); Mark(ok, true, 540, 290, 1.1); Text(ok, 'CADA DÍA ESTÁ BIEN SI…', { x: 540, y: 420, size: 44 });
  ['INTENSIDAD CÓMODA', 'TE RECUPERAS BIEN', 'SIN MOLESTIAS IMPORTANTES'].forEach((s, i) => Text(ok, '· ' + s, { x: 540, y: 520 + i * 80, size: 36, weight: 800 }));
  const ko = el('g', {}, g); Card(ko, { x: 1000, y: 200, w: 760, h: 620, fill: '#EBDCD8' }); Mark(ko, false, 1380, 290, 1.1); Text(ko, 'REDUCE Y CONSULTA SI…', { x: 1380, y: 420, size: 44, color: C.red });
  ['DOLOR MUSCULAR QUE NO SE VA', 'FATIGA EXCESIVA', 'ARTICULACIONES QUE EMPEORAN'].forEach((s, i) => Text(ko, '· ' + s, { x: 1380, y: 520 + i * 80, size: 36, weight: 800 }));
  sfx('pop', at('comoda5')); sfx('alert_soft', at('dolor5'));
  return t => { pop(ok, t, at('comoda5'), 540, 510); pop(ko, t, at('senales5') + 3, 1380, 510); };
});
stillScene(svg, 'p5bc', () => at('dolor5') + 6, c('descansar5'), { focus: [0.5, 0.5], zoom: 0.12 }, g => {
  const a = CAP(g, 'VALORAR LA CAUSA', { hi: 'CAUSA' });
  return t => show(a, t, at('dolor5') + 6.2);
});
stillScene(svg, 'p5ba', c('descansar5'), c('sostenible'), { focus: [0.5, 0.5], zoom: 0.12 }, g => {
  const a = CAP(g, 'DESCANSAR ≠ QUEDARSE QUIETO', { hi: '≠' });
  const r = SideChips(g, [['MOVIMIENTOS SUAVES', () => at('suaves5') + 2], ['MOVILIDAD', () => at('suaves5') + 4], ['TAREAS DE CASA', () => at('suaves5') + 6]], { cx: 1580, y0: 160, size: 38 });
  [2, 4, 6].forEach(d => sfx('pop', at('suaves5') + d, 0.5));
  return t => { show(a, t, at('descansar5') + 0.3); r(t); };
});
stillScene(svg, 'p5ad', c('sostenible'), c('disciplina'), { focus: [0.5, 0.5], zoom: 0.12 }, g => {
  const a = CAP(g, 'LA RECUPERACIÓN HACE EL HÁBITO SOSTENIBLE', { hi: 'SOSTENIBLE', size: 48 });
  return t => show(a, t, at('sostenible') + 0.5);
});
scene(svg, c('disciplina'), c('pregunta5'), g => {
  const a = el('g', {}, g); Card(a, { x: 200, y: 280, w: 700, h: 420, fill: C.white }); Text(a, 'DISCIPLINA', { x: 550, y: 400, size: 64, color: C.green }); Text(a, 'construye hábitos', { x: 550, y: 500, size: 44, weight: 700 }); Mark(a, true, 550, 600, 0.9);
  const b = el('g', {}, g); Card(b, { x: 1020, y: 280, w: 700, h: 420, fill: '#EBDCD8' }); Text(b, 'EXIGENCIA EXCESIVA', { x: 1370, y: 400, size: 52, color: C.red }); Text(b, 'los rompe', { x: 1370, y: 500, size: 44, weight: 700 }); Mark(b, false, 1370, 600, 0.9);
  sfx('pop', at('construye')); sfx('pop', at('construye') + 2.4);
  const hd = Text(g, 'DISCIPLINA ≠ EXIGENCIA', { x: 960, y: 170, size: 66, color: ACC });
  return t => { show(hd, t, at('disciplina') + 0.3); pop(a, t, at('construye'), 550, 490); pop(b, t, at('construye') + 2.4, 1370, 490); };
});
stillScene(svg, 'p5bd', c('pregunta5'), c('siguiente5'), { focus: [0.5, 0.5], zoom: 0.1 }, g => {
  const q = Bubble(g, '¿7 días o descansas 1 o 2?', { cx: 1300, cy: 170, size: 46 });
  const cta = CTA(el('g', {}, g), 'comment', 960);
  sfx('ding', at('pregunta5') + 2.3); sfx('click', at('dejamelo5'));
  return t => { pop(q, t, at('pregunta5') + 2.3, 1300, 170); pop(cta, t, at('dejamelo5'), 960, 960); };
});
stillScene(svg, 'p5bb', c('siguiente5'), () => END + 1, { focus: [0.5, 0.5], zoom: 0.1 }, g => {
  const a = CAP(g, 'TU SEMANA, A TU MEDIDA', { hi: 'A TU MEDIDA' });
  return t => show(a, t, at('siguiente5') + 2);
});

window.draw = t => drawScenes(t);
