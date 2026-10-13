// Flat fitness-illustration figure (side view, facing right) built from shaped, cel-shaded body parts.
// Each part is defined in a local bone frame: x runs along the bone (0..L), +y is the ANTERIOR side.
// Parts in one depth group share one ink silhouette (outlines drawn under all fills), so joints are seamless.
// Requires lib.js (C, el, set, rad, clamp, E, prog).

const FIG = {
  skin: '#5FAEE6', skinShade: '#3F86C4', skinFar: '#8FC4EC', skinFarShade: '#6BA8D9',
  shorts: '#3A3F4B', shortsShade: '#2A2E37', hair: '#D9D4CB', hairShade: '#B5AFA4',
  ink: '#1B1A22', red: '#E23B2E',
};

// ---- shape builders (local frame) -----------------------------------------------------------
function smoothClosed(pts, k = 0.5) {
  const n = pts.length; let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
    const c1 = [p1[0] + (p2[0] - p0[0]) * k / 3, p1[1] + (p2[1] - p0[1]) * k / 3];
    const c2 = [p2[0] - (p3[0] - p1[0]) * k / 3, p2[1] - (p3[1] - p1[1]) * k / 3];
    d += `C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return d + 'Z';
}
// limb: half-widths at the ends (anterior a0→a1, posterior p0→p1) + gaussian bulges [{at, w, amp, side:+1 ant / -1 post}]
function limb(L, a0, a1, p0, p1, bulges = [], capA = 0.9, capB = 0.9, n = 14) {
  const top = [], bot = [];
  for (let i = 0; i <= n; i++) {
    const s = i / n, x = s * L;
    let ya = a0 + (a1 - a0) * s, yp = p0 + (p1 - p0) * s;
    for (const b of bulges) {
      const g = b.amp * Math.exp(-Math.pow((s - b.at) / b.w, 2));
      if (b.side > 0) ya += g; else yp += g;
    }
    top.push([x, ya]); bot.push([x, -yp]);
  }
  const pts = [...top];
  pts.push([L + capB * (a1 + p1) / 2 * 0.55, (a1 - p1) / 2]);
  for (let i = bot.length - 1; i >= 0; i--) pts.push(bot[i]);
  pts.push([-capA * (a0 + p0) / 2 * 0.55, (a0 - p0) / 2]);
  return smoothClosed(pts);
}

// ---- figure ------------------------------------------------------------------------------------
function FlatFigure(svg, { x = 960, floor = 820, scale = 1, id = 'f' + Math.random().toString(36).slice(2, 7) } = {}) {
  const k = scale;
  const defs = el('defs', {}, svg);
  // two-tone cel shading across the bone (posterior side darker); objectBoundingBox follows the local frame
  function grad(name, base, shade) {
    const g = el('linearGradient', { id: `${id}-${name}`, x1: 0, y1: 0, x2: 0, y2: 1 }, defs);
    el('stop', { offset: 0, 'stop-color': shade }, g); el('stop', { offset: 0.38, 'stop-color': shade }, g);
    el('stop', { offset: 0.38, 'stop-color': base }, g); el('stop', { offset: 1, 'stop-color': base }, g);
    return `url(#${id}-${name})`;
  }
  const F = {
    skin: grad('skin', FIG.skin, FIG.skinShade), far: grad('far', FIG.skinFar, FIG.skinFarShade),
    shorts: grad('shorts', FIG.shorts, FIG.shortsShade), hair: FIG.hair,
  };
  const root = el('g', {}, svg);
  const L = { lumbar: 98 * k, thoracic: 150 * k, neck: 34 * k, head: 92 * k, pelvis: 70 * k,
              thigh: 215 * k, shin: 205 * k, foot: 70 * k, upper: 112 * k, fore: 100 * k, hand: 40 * k };
  // part shapes (local frames)
  const S = {
    lumbar: limb(L.lumbar, 50 * k, 52 * k, 46 * k, 50 * k, [{ at: 0.45, w: 0.4, amp: 3 * k, side: 1 }], 0.4, 0.4),
    thoracic: limb(L.thoracic, 54 * k, 50 * k, 52 * k, 52 * k, [{ at: 0.6, w: 0.26, amp: 14 * k, side: 1 }, { at: 0.6, w: 0.35, amp: 8 * k, side: -1 }], 0.5, 0.9),
    neck: limb(L.neck + 14 * k, 21 * k, 19 * k, 22 * k, 20 * k, [], 0.3, 0.3),
    pelvis: limb(L.pelvis, 50 * k, 48 * k, 50 * k, 60 * k, [{ at: 0.35, w: 0.45, amp: 10 * k, side: -1 }], 0.9, 0.5),
    thigh: limb(L.thigh, 34 * k, 22 * k, 30 * k, 20 * k, [{ at: 0.35, w: 0.35, amp: 7 * k, side: 1 }, { at: 0.4, w: 0.4, amp: 5 * k, side: -1 }], 0.9, 0.9),
    shin: limb(L.shin, 20 * k, 13 * k, 20 * k, 12 * k, [{ at: 0.28, w: 0.25, amp: 11 * k, side: -1 }], 0.9, 0.7),
    upper: limb(L.upper, 18 * k, 13 * k, 19 * k, 14 * k, [{ at: 0.12, w: 0.2, amp: 6 * k, side: 1 }, { at: 0.12, w: 0.2, amp: 5 * k, side: -1 }, { at: 0.55, w: 0.25, amp: 4 * k, side: 1 }, { at: 0.45, w: 0.3, amp: 4 * k, side: -1 }], 0.9, 0.8),
    fore: limb(L.fore, 15 * k, 10 * k, 15 * k, 10 * k, [{ at: 0.2, w: 0.25, amp: 4 * k, side: 1 }], 0.8, 0.6),
    hand: limb(L.hand, 11 * k, 9 * k, 11 * k, 8 * k, [{ at: 0.5, w: 0.4, amp: 3 * k, side: 1 }], 0.6, 1.2),
    shortsThigh: limb(L.thigh * 0.48, 40 * k, 33 * k, 36 * k, 30 * k, [{ at: 0.3, w: 0.4, amp: 6 * k, side: 1 }], 0.9, 0.2),
    shortsPelvis: limb(L.pelvis + 8 * k, 53 * k, 52 * k, 52 * k, 58 * k, [{ at: 0.35, w: 0.45, amp: 8 * k, side: -1 }], 0.7, 0.3),
    // foot: heel at -14, toes forward along +x; sole along -y side (posterior = sole)
    foot: smoothClosed([[-16 * k, -14 * k], [-10 * k, 12 * k], [20 * k, 16 * k], [L.foot, 8 * k], [L.foot + 8 * k, -4 * k], [L.foot - 6 * k, -14 * k], [10 * k, -16 * k]], 0.5),
    // head in profile: cranium + jaw + nose; bone axis points from neck to crown, face on +y
    head: smoothClosed([[0 * k, -26 * k], [22 * k, -42 * k], [52 * k, -46 * k], [78 * k, -36 * k], [92 * k, -10 * k], [90 * k, 18 * k], [78 * k, 36 * k],
                        [62 * k, 42 * k], [54 * k, 50 * k], [44 * k, 46 * k], [30 * k, 44 * k], [14 * k, 38 * k], [2 * k, 22 * k]], 0.6),
    hair: smoothClosed([[20 * k, -44 * k], [52 * k, -50 * k], [80 * k, -38 * k], [96 * k, -10 * k], [94 * k, 16 * k], [84 * k, 6 * k], [74 * k, -16 * k], [52 * k, -30 * k], [30 * k, -32 * k], [14 * k, -34 * k]], 0.6),
    ear: smoothClosed([[38 * k, -6 * k], [52 * k, -8 * k], [56 * k, 2 * k], [48 * k, 10 * k], [36 * k, 6 * k]], 0.6),
  };
  // muscle overlays (local frames of their parts)
  const M = {
    abs: limb(L.lumbar + L.thoracic * 0.42, 50 * k, 51 * k, -18 * k, -18 * k, [{ at: 0.5, w: 0.5, amp: 3 * k, side: 1 }], 0.5, 0.6),
    hipflexPelvis: limb(L.pelvis * 0.6, 44 * k, 40 * k, -18 * k, -16 * k, [], 0.6, 0.6),
    quads: limb(L.thigh * 0.85, 34 * k, 23 * k, -6 * k, -4 * k, [{ at: 0.35, w: 0.35, amp: 7 * k, side: 1 }], 0.6, 0.7),
    hipflexThigh: limb(L.thigh * 0.35, 34 * k, 30 * k, -10 * k, -10 * k, [{ at: 0.6, w: 0.5, amp: 5 * k, side: 1 }], 0.8, 0.5),
    delt: limb(L.upper * 0.38, 24 * k, 15 * k, 25 * k, 15 * k, [], 0.9, 0.4),
  };

  function layer(parent) { return { out: el('g', {}, parent), fill: el('g', {}, parent), hi: el('g', {}, parent) }; }
  const groups = { farArm: layer(root), farLeg: layer(root), body: layer(root), nearLeg: layer(root), shorts: layer(root), nearArm: layer(root) };
  const parts = {};
  function part(name, grp, shape, fill, { ow = 7 * k, mirror = false } = {}) {
    const o = el('path', { d: shape, fill: FIG.ink, stroke: FIG.ink, 'stroke-width': ow * 2, 'stroke-linejoin': 'round' }, groups[grp].out);
    const f = el('path', { d: shape, fill }, groups[grp].fill);
    parts[name] = { o, f, mirror, hi: [] };
  }
  function overlay(name, onPart, shape) {
    const p = el('path', { d: shape, fill: FIG.red, opacity: 0 }, groups[parts[onPart].grp || 'body'].hi);
    parts[onPart].hi.push({ name, p });
  }
  // build parts (draw order inside groups = order here)
  part('farUpper', 'farArm', S.upper, F.far); part('farFore', 'farArm', S.fore, F.far); part('farHand', 'farArm', S.hand, F.far);
  part('farThigh', 'farLeg', S.thigh, F.far, { mirror: true }); part('farShin', 'farLeg', S.shin, F.far, { mirror: true }); part('farFoot', 'farLeg', S.foot, F.far);
  part('pelvis', 'body', S.pelvis, F.skin); part('lumbar', 'body', S.lumbar, F.skin); part('thoracic', 'body', S.thoracic, F.skin);
  part('neck', 'body', S.neck, F.skin); part('head', 'body', S.head, F.skin);
  part('thigh', 'nearLeg', S.thigh, F.skin, { mirror: true }); part('shin', 'nearLeg', S.shin, F.skin, { mirror: true }); part('foot', 'nearLeg', S.foot, F.skin);
  part('shortsPelvis', 'shorts', S.shortsPelvis, F.shorts); part('shortsThigh', 'shorts', S.shortsThigh, F.shorts, { mirror: true });
  part('upper', 'nearArm', S.upper, F.skin); part('fore', 'nearArm', S.fore, F.skin); part('hand', 'nearArm', S.hand, F.skin);
  // details drawn on top of the body group: hair, ear, eye
  const det = el('g', {}, groups.body.fill);
  const hair = el('path', { d: S.hair, fill: F.hair, stroke: FIG.ink, 'stroke-width': 4 * k, 'stroke-linejoin': 'round' }, det);
  const ear = el('path', { d: S.ear, fill: 'none' }, det);
  const eye = el('ellipse', { rx: 8 * k, ry: 4 * k, fill: '#fff', style: 'filter:drop-shadow(0 0 6px #d8f4ff)' }, det);
  // muscle highlight shapes
  const hiG = groups.body.hi, hiLeg = groups.nearLeg.hi, hiArm = groups.nearArm.hi;
  const H = {
    abs: el('path', { d: M.abs, fill: FIG.red, opacity: 0 }, hiG),
    hipflexPelvis: el('path', { d: M.hipflexPelvis, fill: FIG.red, opacity: 0 }, hiG),
    hipflexThigh: el('path', { d: M.hipflexThigh, fill: FIG.red, opacity: 0 }, hiLeg),
    quads: el('path', { d: M.quads, fill: FIG.red, opacity: 0 }, hiLeg),
    delt: el('path', { d: M.delt, fill: FIG.red, opacity: 0 }, hiArm),
  };
  // shorts must cover the near hip highlight → move highlight group under shorts? keep: shorts drawn after nearLeg hi

  const T = (p, a, mirror) => `translate(${p[0].toFixed(1)} ${p[1].toFixed(1)}) rotate(${(-a).toFixed(2)})${mirror ? ' scale(1 -1)' : ''}`;
  const P = (p, len, a) => [p[0] + len * Math.cos(rad(a)), p[1] - len * Math.sin(rad(a))];
  function place(name, p, a) {
    const pr = parts[name], tr = T(p, a, pr.mirror);
    pr.o.setAttribute('transform', tr); pr.f.setAttribute('transform', tr);
  }
  // pose: hipFlex, lumbar, thoracic, neck (deg), knee (thigh angle above horizontal), arms: 'cross'|'under'|'side'
  function draw(p, hi = {}) {
    const hip = [x, floor - 46 * k];
    const aP = 180 - p.hipFlex * 0.85;                    // pelvis follows most of the hip flexion
    const aL = 180 - p.hipFlex - p.lumbar;
    const aT = aL - p.thoracic;
    const aN = aT - p.neck * 0.6;
    const aH = aN - p.neck * 0.4 - 8;
    const s1 = P(hip, L.lumbar, aL), s2 = P(s1, L.thoracic, aT), s3 = P(s2, L.neck, aN);
    place('pelvis', hip, aP); place('lumbar', hip, aL); place('thoracic', s1, aT); place('neck', s2, aN); place('head', s3, aH);
    for (const e of [parts.head.o, parts.head.f]) e.setAttribute('transform', T(s3, aH, false) + ' scale(1.15)');
    // head details in the head frame
    const hf = T(s3, aH, false) + ' scale(1.15)';
    hair.setAttribute('transform', hf); ear.setAttribute('transform', hf);
    const eyeP = (() => { const a = rad(aH), lx = 62 * k, ly = 34 * k; return [s3[0] + lx * Math.cos(a) + ly * Math.sin(a), s3[1] - lx * Math.sin(a) + ly * Math.cos(a)]; })();
    set(eye, { cx: eyeP[0], cy: eyeP[1], transform: `rotate(${(-aH + 90).toFixed(1)} ${eyeP[0]} ${eyeP[1]})` });
    // legs: thigh at knee angle, shin solved to the floor
    const knee = P(hip, L.thigh, p.knee);
    const ankleY = floor - 16 * k;
    const dy = ankleY - knee[1], dx = Math.sqrt(Math.max(1, L.shin * L.shin - dy * dy));
    const ankle = [knee[0] + dx, ankleY];
    const aShin = Math.atan2(-(ankle[1] - knee[1]), ankle[0] - knee[0]) * 180 / Math.PI;
    place('thigh', hip, p.knee); place('shin', knee, aShin); place('foot', ankle, 0);
    place('shortsPelvis', hip, aP); place('shortsThigh', hip, p.knee);
    if (p.farLegStraight) {
      const kf = P(hip, L.thigh, -3), af = P(kf, L.shin, -2);
      place('farThigh', [hip[0] - 4, hip[1] + 4], -3); place('farShin', kf, -2); place('farFoot', [af[0], ankleY], 80);
    } else {
      place('farThigh', [hip[0] - 14 * k, hip[1] - 2], p.knee + 2); place('farShin', [knee[0] - 16 * k, knee[1]], aShin); place('farFoot', [ankle[0] - 18 * k, ankleY], 0);
    }
    // arms
    const sh = P(s1, L.thoracic * 0.78, aT);
    const shF = [sh[0] - 6 * k, sh[1] - 2 * k];
    let aU, aF, aHd;
    if (p.arms === 'under') { aU = aT + 180 + 8; aF = aT + 180 - 22; aHd = aF - 10; }   // hands slide under the lower back
    else if (p.arms === 'side') { aU = aT + 180; aF = aU + 10; aHd = aF; }
    else { aU = aT + 180 + 24; aF = aT - 6; aHd = aF + 12; }     // crossed: upper arm down the chest front, forearm folds back up across it
    const el1 = P(sh, L.upper * (p.arms === 'cross' || !p.arms ? 0.8 : 1), aU), wr = P(el1, L.fore * (p.arms === 'cross' || !p.arms ? 0.78 : 1), aF);
    place('upper', sh, aU); place('fore', el1, aF); place('hand', wr, aHd);
    const el2 = P(shF, L.upper * 0.8, aU + 4), wr2 = P(el2, L.fore * 0.78, aF + 6);
    place('farUpper', shF, aU + 4); place('farFore', el2, aF + 6); place('farHand', wr2, aHd + 6);
    // highlights
    set(H.abs, { transform: T(hip, aL, false), opacity: hi.abs || 0 });
    // abs follow the curl: place on lumbar frame but bend with thoracic via a second copy is overkill; lumbar frame is fine
    set(H.hipflexPelvis, { transform: T(hip, aP, false), opacity: hi.hip || 0 });
    set(H.hipflexThigh, { transform: T(hip, p.knee, true), opacity: hi.hip || 0 });
    set(H.quads, { transform: T(hip, p.knee, true), opacity: hi.quads || 0 });
    set(H.delt, { transform: T(sh, aU, false), opacity: hi.delt || 0 });
    return { hip, s1, s2, s3, knee, ankle };
  }
  return { g: root, draw };
}
