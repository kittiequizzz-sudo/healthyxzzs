// Flat-style health explainer toolkit: easing, SVG helpers, a jointed flat anatomy figure, charts.
// Loaded by scene HTML files; everything is a pure function of time t (seconds) so frames are deterministic.
const C = {
  cream: '#F5ECD7', ink: '#1B1A22', blue: '#58A9E4', blueDark: '#3D86C6', blueFar: '#8CC3EC',
  red: '#E23B2E', orange: '#F95C00', amber: '#F7AD36', green: '#2FA84F', grey: '#A7AAAD', white: '#FFFFFF',
  bone: '#F3E6CC', disc: '#F7AD36',
};
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const lerp = (a, b, t) => a + (b - a) * t;
const prog = (t, a, b) => clamp((t - a) / (b - a));
const E = {
  inOut: t => (t = clamp(t), t * t * t * (t * (6 * t - 15) + 10)),          // minimum-jerk (smootherstep)
  out: t => 1 - Math.pow(1 - clamp(t), 3),
  back: t => { t = clamp(t) - 1; return 1 + 2.4 * t * t * t + 1.4 * t * t; },
};
const rad = d => d * Math.PI / 180;
const NS = 'http://www.w3.org/2000/svg';
function el(tag, attrs = {}, parent) {
  const e = document.createElementNS(NS, tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(e);
  return e;
}
function set(e, attrs) { for (const k in attrs) e.setAttribute(k, attrs[k]); return e; }
// math-angle helpers in screen space (y down): angle 0 = right, 90 = up
const P = (p, len, ang) => [p[0] + len * Math.cos(rad(ang)), p[1] - len * Math.sin(rad(ang))];
const add = (a, b, k = 1) => [a[0] + b[0] * k, a[1] + b[1] * k];
const pts = arr => arr.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');

// ---------------------------------------------------------------- flat figure (side view, facing right)
// Limbs are thick round-capped strokes with an ink outline drawn underneath, so every pose stays clean.
// Pose params (degrees):
//   hipFlex   trunk raised from the floor about the hip (0 = lying flat, 90 = sitting upright)
//   lumbar, thoracic, neck   extra curl of each spine segment (curl-up / sit-up peel)
//   knee      thigh angle above horizontal for the near leg (bent-knee lying ≈ 50)
//   farLegStraight  draw the far leg straight on the floor (curl-up setup)
//   arms: 'cross' (crossed on chest) | 'under' (hands under lower back)
function Figure(svg, { x = 960, floor = 820, scale = 1 } = {}) {
  const g = el('g', {}, svg);
  const layers = {};
  for (const name of ['farLeg', 'farLegHi', 'legOut', 'leg', 'hipflex', 'torsoOut', 'torso', 'abs', 'neckOut', 'neck', 'headOut', 'head', 'armOut', 'arm', 'eye'])
    layers[name] = el(name.startsWith('head') || name === 'eye' ? 'circle' : 'polyline', { fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
  const k = scale;
  const W = { torso: 74 * k, thigh: 52 * k, shin: 38 * k, arm: 24 * k, neck: 30 * k, out: 7 * k };
  const L = { lumbar: 105 * k, thoracic: 150 * k, neck: 38 * k, head: 46 * k, thigh: 205 * k, shin: 195 * k, upper: 100 * k, fore: 92 * k };
  function draw(p, hi = {}) {
    const hip = [x, floor - W.torso / 2];
    // spine chain pointing left when lying (angle 180), rising as hipFlex/curls increase
    let a = 180 - p.hipFlex;
    const s0 = hip;
    a -= p.lumbar; const s1 = P(s0, L.lumbar, a); const aL = a;
    a -= p.thoracic; const s2 = P(s1, L.thoracic, a); const aT = a;
    a -= p.neck; const s3 = P(s2, L.neck, a);
    const headC = P(s3, L.head * 0.9, a);
    // keep the body on the floor: lift the whole spine if any point dips below the torso radius
    // legs
    const knee = P(hip, L.thigh, p.knee);
    const dy = (floor - W.shin / 2) - knee[1];
    const ankle = [knee[0] + Math.sqrt(Math.max(0, L.shin * L.shin - dy * dy)), floor - W.shin / 2];
    const toe = [ankle[0] + 34 * k, floor - 10 * k];
    const leg = [hip, knee, ankle, toe];
    const far = p.farLegStraight ? [hip, [hip[0] + L.thigh, hip[1] + 6 * k], [hip[0] + L.thigh + L.shin, floor - W.shin / 2], [hip[0] + L.thigh + L.shin + 30 * k, floor - 18 * k]]
                                 : leg.map(q => [q[0] - 10 * k, q[1] - 4 * k]);
    const spine = [s0, s1, s2];
    // front (chest side) normal of the thoracic segment
    const front = ang => [Math.cos(rad(ang - 90)), -Math.sin(rad(ang - 90))];
    let arm;
    if (p.arms === 'under') {
      const sh = P(s1, L.thoracic * 0.8, aT);
      arm = [sh, add(P(sh, L.upper, aT + 180 - 25), front(aT), -18 * k), add(s0, front(aL), -W.torso * 0.25)];
    } else {
      // crossed arms, side view: upper arm runs down the side of the chest, forearm folds back up across it
      const sh = P(s1, L.thoracic * 0.72, aT);
      const elbow = add(P(sh, L.upper * 0.95, aT + 180), front(aT), W.torso * 0.30);
      const hand = add(P(sh, L.fore * 0.05, aT + 180), front(aT), W.torso * 0.66);
      arm = [sh, elbow, hand];
    }
    const o = W.out * 2;
    set(layers.farLeg, { points: pts(far), stroke: C.blueFar, 'stroke-width': W.thigh * 0.92 });
    set(layers.legOut, { points: pts(leg), stroke: C.ink, 'stroke-width': W.thigh + o });
    set(layers.leg, { points: pts(leg), stroke: C.blue, 'stroke-width': W.thigh });
    set(layers.torsoOut, { points: pts(spine), stroke: C.ink, 'stroke-width': W.torso + o });
    set(layers.torso, { points: pts(spine), stroke: C.blue, 'stroke-width': W.torso });
    set(layers.neckOut, { points: pts([s2, s3]), stroke: C.ink, 'stroke-width': W.neck + o });
    set(layers.neck, { points: pts([s2, s3]), stroke: C.blue, 'stroke-width': W.neck });
    set(layers.headOut, { cx: headC[0], cy: headC[1], r: L.head + W.out, fill: C.ink, stroke: 'none' });
    set(layers.head, { cx: headC[0], cy: headC[1], r: L.head, fill: C.blue, stroke: 'none' });
    const eye = add(headC, [Math.cos(rad(a - 60)), -Math.sin(rad(a - 60))], L.head * 0.55);
    set(layers.eye, { cx: eye[0], cy: eye[1], r: 7 * k, fill: C.white, stroke: 'none', style: 'filter:drop-shadow(0 0 6px #fff)' });
    // hands under the lower back: the arm goes behind the torso
    if (p.arms === 'under') { g.insertBefore(layers.arm, layers.torsoOut); g.insertBefore(layers.armOut, layers.arm); }
    else { g.insertBefore(layers.armOut, layers.eye); g.insertBefore(layers.arm, layers.eye); }
    set(layers.armOut, { points: pts(arm), stroke: C.ink, 'stroke-width': W.arm + o });
    set(layers.arm, { points: pts(arm), stroke: C.blueDark, 'stroke-width': W.arm });
    // muscle highlights (rectus abdominis along the front of the trunk; hip flexors hip→front of thigh)
    const absPts = [add(s0, front(aL), W.torso * 0.22), add(s1, front(aL), W.torso * 0.24), add(P(s1, L.thoracic * 0.55, aT), front(aT), W.torso * 0.22)];
    set(layers.abs, { points: pts(absPts), stroke: C.red, 'stroke-width': W.torso * 0.42, opacity: hi.abs || 0 });
    const hf = [add(P(s0, L.lumbar * 0.55, aL), front(aL), W.torso * 0.1), hip, P(hip, L.thigh * 0.55, p.knee)];
    set(layers.hipflex, { points: pts(hf), stroke: C.red, 'stroke-width': W.thigh * 0.55, opacity: hi.hip || 0 });
    set(layers.farLegHi, { points: '', stroke: 'none' });
    return { hip, s1, s2, headC, knee, ankle, aL, aT };
  }
  return { g, draw };
}

// sit-up and curl-up motion: phase 1 curls the spine from the head down, phase 2 hinges at the hip
function situpPose(u) {           // u 0..1 (lying → up)
  const c = E.inOut(prog(u, 0, 0.45));       // curl
  const h = E.inOut(prog(u, 0.35, 1));       // hinge
  return { hipFlex: 62 * h, lumbar: 12 * c - 4 * h, thoracic: 22 * c - 6 * h, neck: 26 * c - 8 * h, knee: 50, arms: 'cross' };
}
function curlupPose(u) {
  const c = E.inOut(clamp(u));
  return { hipFlex: 0, lumbar: 0, thoracic: 14 * c, neck: 16 * c, knee: 50, farLegStraight: true, arms: 'under' };
}
// rep timeline: up for `up` s, hold, down, rest; returns 0..1
function reps(t, { up = 1.3, hold = 0.35, down = 1.7, rest = 0.4 } = {}) {
  const T = up + hold + down + rest, x = ((t % T) + T) % T;
  if (x < up) return E.inOut(x / up);
  if (x < up + hold) return 1;
  if (x < up + hold + down) return 1 - E.inOut((x - up - hold) / down);
  return 0;
}

// ---------------------------------------------------------------- text & cards
function Text(svg, str, { x, y, size = 96, color = C.ink, weight = 900, anchor = 'middle', family = 'Inter' } = {}) {
  const t = el('text', { x, y, 'font-size': size, 'font-weight': weight, fill: color, 'text-anchor': anchor, 'font-family': family, 'dominant-baseline': 'middle' }, svg);
  t.textContent = str;
  return t;
}
// entrance: slide up + fade (in seconds), optional exit
function show(e, t, t0, t1 = 1e9, { dy = 40, dur = 0.45 } = {}) {
  const a = E.out(prog(t, t0, t0 + dur)) * (1 - E.out(prog(t, t1 - 0.3, t1)));
  e.setAttribute('opacity', a.toFixed(3));
  e.setAttribute('transform', `translate(0 ${((1 - E.out(prog(t, t0, t0 + dur))) * dy).toFixed(1)})`);
  return a;
}
function pop(e, t, t0, cx, cy, t1 = 1e9) {
  const s = E.back(prog(t, t0, t0 + 0.35)) * (1 - E.out(prog(t, t1 - 0.25, t1)));
  e.setAttribute('transform', `translate(${cx} ${cy}) scale(${Math.max(0, s).toFixed(3)}) translate(${-cx} ${-cy})`);
  e.setAttribute('opacity', clamp(s * 3).toFixed(3));
}
function Card(svg, { x, y, w, h, fill = C.white, stroke = C.ink, r = 22 }) {
  const g = el('g', {}, svg);
  el('rect', { x: x + 10, y: y + 12, width: w, height: h, rx: r, fill: C.ink, opacity: 0.9 }, g);
  el('rect', { x, y, width: w, height: h, rx: r, fill, stroke, 'stroke-width': 6 }, g);
  return g;
}
