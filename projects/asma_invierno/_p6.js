// Punto 6 — keep moving: avoiding activity spirals; adapted activity helps when asthma is controlled; indoor options; warm up; calm breathing, pursed lips can help some people but don't open bronchi or replace treatment; stop and follow plan if wheeze/chest tightness; repeated symptoms → review.
window.START = at('h6') - 1.2;
window.END = at('c0') - 0.6;
window.DURATION = window.END;
const svg = Stage('p6');
const c = k => () => at(k);

TitleCard(svg, 6, 'QUE EL ASMA NO TE ROBE EL MOVIMIENTO', 'Actividad adaptada en invierno', () => START, c('errores6'));
stillScene(svg, 'g1a', c('errores6'), c('movimiento6'), { focus: [0.45, 0.45], zoom: 0.14 }, g => {
  const k = Kicker(g, 6, 'CONSEJO 6 · MOVIMIENTO'); Progress(g, 5);
  const r = SideChips(g, [['SIN PASEOS', () => at('caminar6') + 0.3], ['SIN ESCALERAS', () => at('caminar6') + 2.5], ['MÁS HORAS SENTADO', c('sentados6')]], { cx: 1500, y0: 260, dy: 120, size: 40 });
  return t => { slideIn(k, t, at('errores6'), 'l', 600); r(t); };
});
scene(svg, c('movimiento6'), c('interiores6'), g => {
  const a = Text(g, 'EL CUERPO NECESITA MOVIMIENTO', { x: 960, y: 200, size: 66, color: ACC });
  const ts = [['heart', 'CORAZÓN', 1.5], ['dumbbell', 'FUERZA', 3.5], ['light', 'BIENESTAR', 5.5]].map(([ic, l, d], i) => [IconTile(g, ic, l, 420 + i * 540, 520, { w: 420, h: 380 }), d, 420 + i * 540]);
  const n = Chip(g, 'CON EL ASMA BIEN CONTROLADA', { cx: 960, cy: 860, fill: C.white, size: 44 });
  ts.forEach(([, d]) => sfx('pop', at('adaptada6') + d, 0.5)); sfx('pop', at('controlada6'));
  return t => { show(a, t, at('movimiento6')); ts.forEach(([x, d, cx]) => pop(x, t, at('adaptada6') + d, cx, 520)); pop(n, t, at('controlada6'), 960, 860); };
});
stillScene(svg, 'g1b', c('interiores6'), () => at('pasillo6') + 3, { focus: [0.5, 0.45], zoom: 0.14 }, g => {
  const a = CAP(g, '¿FRÍO FUERA? MUÉVETE DENTRO', { hi: 'DENTRO' });
  return t => show(a, t, at('interiores6') + 0.5);
});
stillScene(svg, 'g1c', () => at('pasillo6') + 3, c('respiras6'), { focus: [0.4, 0.5], zoom: 0.14 }, g => {
  const a = CAP(g, 'SUAVE, JUNTO A UNA SILLA · CALIENTA ANTES', { hi: 'CALIENTA', size: 48 });
  return t => show(a, t, at('pasillo6') + 3.2);
});
stillScene(svg, 'g1d', c('respiras6'), c('noabren6'), { focus: [0.45, 0.45], zoom: 0.14 }, g => {
  const a = CAP(g, 'RESPIRACIÓN TRANQUILA Y CONTROLADA', { hi: 'TRANQUILA', size: 52 });
  const b = Chip(g, 'LABIOS FRUNCIDOS: AYUDA A ALGUNAS PERSONAS', { cx: 960, cy: 120, fill: C.white, size: 36 });
  sfx('pop', at('labios6'));
  return t => { show(a, t, at('tranquila6')); pop(b, t, at('labios6'), 960, 120); };
});
scene(svg, c('noabren6'), c('silbidos6'), g => {
  const p = Pair(g, ['bronquio_estrecho', 'TÉCNICA DE RESPIRACIÓN', C.grey], ['bronquio_sano', 'MEDICACIÓN INDICADA', C.green], { cy: 470 });
  const s = Stamp(g, 'NO SUSTITUYE EL TRATAMIENTO EN UNA CRISIS', { cx: 960, cy: 870, size: 46, color: C.red, rot: -2 });
  sfx('pop', at('noabren6')); sfx('pop', at('noabren6') + 2); sfx('stamp', at('noabren6') + 5);
  return t => { pop(p.a, t, at('noabren6'), 560, 470); show(p.ar, t, at('noabren6') + 1.5); pop(p.b, t, at('noabren6') + 2, 1360, 470); s.draw(t, at('noabren6') + 5); };
});
scene(svg, c('silbidos6'), c('idea6'), g => {
  const w = el('g', {}, g); Warn(el('g', { transform: 'translate(-280 0)' }, w), 'DETÉN LA ACTIVIDAD SI APARECEN…', ['SILBIDOS INTENSOS', 'OPRESIÓN EN EL PECHO', 'DIFICULTAD PARA RESPIRAR'], { kind: 'red', y: 150, w: 1100 });
  const st = Still(el('g', {}, g), 'cut/g2a.png', { x: 1280, y: 180, w: 560, h: 400, iw: SZ.g2a[0], ih: SZ.g2a[1], r: 26 });
  const n = Chip(g, 'SIGUE TU PLAN · SI SE REPITE, CONSULTA', { cx: 960, cy: 820, fill: ACC, color: C.white, size: 40 });
  sfx('alert', at('silbidos6') + 0.3); sfx('pop', at('repetida6'));
  return t => { show(w, t, at('silbidos6') + 0.3); show(st.g, t, at('silbidos6') + 1); st.draw(t, at('silbidos6'), at('idea6')); pop(n, t, at('repetida6'), 960, 820); };
}, true);
stillScene(svg, 'g2c', c('idea6'), c('objetivo6'), { focus: [0.5, 0.45], zoom: 0.12 }, g => {
  const r = ChipRow(g, [['CONOCER TUS LÍMITES', c('limites6')], ['TUS DESENCADENANTES', () => at('limites6') + 2], ['TRATAMIENTO ADECUADO', () => at('limites6') + 4]], { cy: 110, size: 36 });
  const a = CAP(g, 'ASMA ≠ RENUNCIAR A LO QUE DISFRUTAS', { hi: '≠', size: 52 });
  return t => { show(a, t, at('renunciar6')); r(t); };
});
stillScene(svg, 'g2d', c('objetivo6'), c('truco6'), { focus: [0.5, 0.5], zoom: 0.12 }, g => {
  const a = CAP(g, 'TU VIDA COTIDIANA, CON SEGURIDAD', { hi: 'SEGURIDAD' });
  return t => show(a, t, at('objetivo6') + 1);
});
scene(svg, c('truco6'), () => END + 1, g => {
  const a = Text(g, 'NO HAY UN TRUCO MILAGROSO', { x: 960, y: 340, size: 70, color: C.grey });
  const b = Text(g, 'PEQUEÑAS DECISIONES', { x: 960, y: 470, size: 84, color: ACC });
  const d = Text(g, '+ EL TRATAMIENTO CORRECTO', { x: 960, y: 580, size: 60 });
  const host = Host(g, 'three_q', { cx: 1700, cy: 820, fit: 360 });
  sfx('pop', at('truco6') + 3); sfx('alert', at('advertencia6'));
  return t => { show(a, t, at('truco6')); pop(b, t, at('truco6') + 3, 960, 470); show(d, t, at('truco6') + 5); host(t, at('advertencia6')); };
});

window.draw = t => drawScenes(t);
