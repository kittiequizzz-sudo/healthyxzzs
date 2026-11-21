// Shared pieces for "Levantarse de una silla" (cartoon-panel style). Needs lib.js, kit.js, cartoon.js, cues.js.
// Every section runs on the global voice timeline (t = seconds into audio/voice.mp3).
const T = CUE, LEAD = 0.2;
const at = k => { if (!(k in T)) throw new Error('missing cue ' + k); return T[k] - LEAD; };
const PANEL = [832, 466], POSE = [1672, 941];

function Stage() {
  const svg = document.getElementById('s');
  el('rect', { width: 1920, height: 1080, fill: K.frame }, svg);
  return svg;
}
const scenes = [];
function scene(svg, a, b, build, { hard = true } = {}) {
  const g = el('g', {}, svg);
  const draw = build(g) || (() => {});
  scenes.push({ g, a, b, draw, hard });
}
function drawScenes(t) {
  for (const s of scenes) {
    const v = s.hard ? cutVis(s.g, t, s.a(), s.b()) : sceneVis(s.g, t, s.a(), s.b() + 0.25, 0.25);
    if (v > 0) s.draw(t);
  }
}
// Full-screen panel from a 2x2 sheet. zoom 0 keeps image coordinates fixed (for labels pointing at things).
function panel(g, n, o = {}) { return Panel(g, 'cut/' + n + '.png', { iw: PANEL[0], ih: PANEL[1], ...o }); }
// Panel-image fraction (u, v) → screen point, valid when zoom = 0.
function pp(u, v) { const s = Math.max(1876 / PANEL[0], 1036 / PANEL[1]); return [22 + 1876 / 2 + (u - 0.5) * PANEL[0] * s, 22 + 1036 / 2 + (v - 0.5) * PANEL[1] * s]; }
// The pose sheet (4 poses in a row) as a full-screen step strip; draw(t, k) dims every pose but k (0..3, -1 = none).
function PoseStrip(g) {
  const st = Panel(g, 'assets/l1_pose.webp', { iw: POSE[0], ih: POSE[1], zoom: 0 });
  const s = Math.max(1876 / POSE[0], 1036 / POSE[1]), x0 = 22 + 1876 / 2 - POSE[0] * s / 2;
  const cols = [[0, 430], [430, 850], [850, 1262], [1262, 1672]];
  const veil = cols.map(([a, b]) => el('rect', { x: x0 + a * s, y: 22, width: (b - a) * s, height: 1036, fill: '#A8E6BF', opacity: 0 }, g));
  const num = cols.map(([a, b], i) => { const c = el('g', {}, g), cx = x0 + (a + b) / 2 * s; el('circle', { cx, cy: 990, r: 34, fill: K.paper, stroke: K.ink, 'stroke-width': 4 }, c); Hand(c, String(i + 1), { x: cx, y: 993, size: 50, anchor: 'middle' }); return c; });
  return { st, x: i => x0 + (cols[i][0] + cols[i][1]) / 2 * s, s, x0,
    draw(t, k, a = 0, b = 1) { st.draw(t, a, b); veil.forEach((r, i) => r.setAttribute('opacity', k < 0 || i === k ? 0 : 0.72)); num.forEach((c, i) => c.setAttribute('opacity', k < 0 || i === k ? 1 : 0.35)); } };
}
// Flat colour card (for code-only beats) with the frame border.
function Flat(g, fill) { el('rect', { width: 1920, height: 1080, fill: K.frame }, g); el('rect', { x: 22, y: 22, width: 1876, height: 1036, rx: 40, fill }, g); }
