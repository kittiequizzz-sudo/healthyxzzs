// Rig built from a user-supplied flat character rig sheet (separate parts with round joint ends).
// Each part image is placed with: translate(joint) rotate(target - restAxis) scale(s) translate(-anchor).
// Proportions follow standard adult ratios for body height H (Drillis & Contini segment lengths).
function SheetFigure(svg, { x = 960, floor = 820, H = 560, dir = '', id = 'sf' + Math.random().toString(36).slice(2, 6) } = {}) {
  const defs = el('defs', {}, svg);
  const f = el('filter', { id: id + '-far' }, defs);
  el('feColorMatrix', { type: 'matrix', values: '0.72 0 0 0 0.08  0 0.75 0 0 0.10  0 0 0.82 0 0.14  0 0 0 1 0' }, f);
  // part definitions in sheet-part pixel coords: A = proximal joint, B = point along the bone, S = extra anchor
  const D = {
    head:    { A: [72, 191], B: [82, 20] },
    chest:   { A: [78, 239], B: [58, 12], S: [44, 72] },
    abdomen: { A: [56, 187], B: [56, 29] },
    pelvis:  { A: [77, 185], B: [80, 29] },
    upper:   { A: [45, 29], B: [64, 224] },
    fore:    { A: [39, 29], B: [73, 204] },
    fist:    { A: [36, 28], B: [40, 120] },
    thigh:   { A: [31, 30], B: [63, 228] },
    shin:    { A: [46, 28], B: [51, 203] },
    foot:    { A: [31, 28], B: [31, 28] },
  };
  const len = (p) => Math.hypot(D[p].B[0] - D[p].A[0], D[p].B[1] - D[p].A[1]);
  // segment lengths as fractions of height (Drillis & Contini 1966): thigh .245, shank .246, upper arm .186,
  // forearm .146, hip→shoulder ≈ .29, head+neck ≈ .17
  const T = { head: 0.165 * H, chest: 0.19 * H, abdomen: 0.105 * H, pelvis: 0.10 * H, upper: 0.186 * H, fore: 0.146 * H,
              fist: 0.08 * H, thigh: 0.245 * H, shin: 0.235 * H };
  // widths keep one common scale (matching the sheet's assembled figure); lengths are fitted to the targets
  const WS = H / 860;
  const S = {}, SL = {};
  for (const p in T) { S[p] = WS; SL[p] = T[p] / len(p); }
  S.head = SL.head = Math.min(T.head / len('head'), WS * 1.05);
  S.foot = SL.foot = WS * 1.05; S.fist = SL.fist = WS;
  const rest = p => Math.atan2(-(D[p].B[1] - D[p].A[1]), D[p].B[0] - D[p].A[0]) * 180 / Math.PI;
  const g = el('g', {}, svg);
  const mk = (p, far) => el('image', { href: `${dir}part_${p}.png`, filter: far ? `url(#${id}-far)` : null }, g);
  const order = [['upper', 1], ['fore', 1], ['fist', 1], ['thigh', 1], ['shin', 1], ['foot', 1],
                 ['abdomen'], ['chest'], ['head'], ['thigh'], ['shin'], ['foot'], ['pelvis'], ['upper'], ['fore'], ['fist']];
  const I = order.map(([p, far]) => ({ p, far: !!far, e: mk(p, far) }));
  I.forEach(o => { if (!o.far) o.e.removeAttribute('filter'); });
  const P = (p, l, a) => [p[0] + l * Math.cos(rad(a)), p[1] - l * Math.sin(rad(a))];
  function place(e, p, J, a, lf = 1) {
    const d = D[p];
    const rot = p === 'foot' ? 0 : -(a - rest(p));
    // rotate the image so its bone axis is vertical, scale width/length separately, then rotate to the target
    const r0 = -(-90 - rest(p));
    e.setAttribute('transform', `translate(${J[0].toFixed(1)} ${J[1].toFixed(1)}) rotate(${(rot - r0).toFixed(2)}) scale(${S[p].toFixed(4)} ${(SL[p] * lf).toFixed(4)}) rotate(${r0.toFixed(2)}) translate(${-d.A[0]} ${-d.A[1]})`);
  }
  // world point of a part-local anchor
  function local(p, J, a, q) {
    const d = D[p], r0 = rad(-(-90 - rest(p))), r1 = rad(-(a - rest(p))) - r0;
    let vx = q[0] - d.A[0], vy = q[1] - d.A[1];
    [vx, vy] = [vx * Math.cos(r0) - vy * Math.sin(r0), vx * Math.sin(r0) + vy * Math.cos(r0)];
    vx *= S[p]; vy *= SL[p];
    return [J[0] + vx * Math.cos(r1) - vy * Math.sin(r1), J[1] + vx * Math.sin(r1) + vy * Math.cos(r1)];
  }
  // pose: hipFlex, lumbar, thoracic, neck, knee (thigh angle, deg above horizontal), arms 'cross'|'under'|'side'|'down'
  // standing: {stand:true}
  function draw(p) {
    const byPart = {}; I.forEach(o => (byPart[o.p + (o.far ? 'F' : '')] = o.e));
    let hip, aP, aL, aT, aN, knee, aTh, aSh, ankle;
    if (p.stand) {
      hip = [x, floor - 64 * S.foot - T.thigh * 0.9 - T.shin * 0.9];
      aP = 90; aL = 90; aT = 90 + (p.lean || 0); aN = 92;
      aTh = 270; aSh = 270;
    } else {
      hip = [x, floor - 0.065 * H];
      aP = 180 - p.hipFlex * 0.8; aL = 180 - p.hipFlex - p.lumbar; aT = aL - p.thoracic; aN = aT - p.neck;
      aTh = p.knee;
    }
    const waist = P(hip, T.pelvis * 0.85, aP);
    const s1 = P(waist, T.abdomen * 0.85, aL);
    const neck = P(s1, T.chest * 0.92, aT);
    place(byPart.pelvis, 'pelvis', hip, aP);
    place(byPart.abdomen, 'abdomen', waist, aL);
    place(byPart.chest, 'chest', s1, aT);
    place(byPart.head, 'head', neck, aN);
    knee = P(hip, T.thigh * 0.9, aTh);
    if (p.stand) { ankle = [knee[0], floor - 64 * S.foot]; aSh = 270; }
    else {
      const ay = floor - 64 * S.foot, dy = ay - knee[1], L = T.shin * 0.9;
      ankle = [knee[0] + Math.sqrt(Math.max(1, L * L - dy * dy)), ay];
      aSh = Math.atan2(-(ankle[1] - knee[1]), ankle[0] - knee[0]) * 180 / Math.PI;
    }
    const sh = local('chest', s1, aT, D.chest.S);
    let aU, aF;
    if (p.stand || p.arms === 'down') { aU = 270 - 4; aF = 270 + 4; }
    else if (p.arms === 'under') { aU = aT + 180 + 6; aF = aT + 180 - 18; }
    else {                                                  // arms rest by the sides, then reach toward the knees as the trunk curls up
      const toKnee = Math.atan2(-(knee[1] - sh[1]), knee[0] - sh[0]) * 180 / Math.PI;
      const c = clamp((p.hipFlex + p.thoracic + p.neck) / 45), side = aT + 180 + 4;
      const al = (a, b, t) => a + ((((b - a) % 360) + 540) % 360 - 180) * t;   // shortest-way angle blend
      aU = al(side, toKnee + 8, E.inOut(c)); aF = al(side - 2, toKnee + 2, E.inOut(c));
    }
    const cross = false;
    const lfU = cross ? 0.62 : 1, lfF = cross ? 0.62 : 1;
    const elbow = P(sh, T.upper * 0.88 * lfU, aU), wrist = P(elbow, T.fore * 0.88 * lfF, aF);
    const off = (q, dx, dy) => [q[0] + dx, q[1] + dy];
    for (const [k, dx, dy] of [['', 0, 0], ['F', -0.025 * H, -0.006 * H]]) {
      place(byPart['thigh' + k], 'thigh', off(hip, dx, dy), aTh);
      place(byPart['shin' + k], 'shin', off(knee, dx, dy), aSh);
      place(byPart['foot' + k], 'foot', off(ankle, dx, dy), 0);
      place(byPart['upper' + k], 'upper', off(sh, dx * 0.6, dy), aU + (k ? 4 : 0), lfU);
      place(byPart['fore' + k], 'fore', off(elbow, dx * 0.6, dy), aF + (k ? 4 : 0), lfF);
      place(byPart['fist' + k], 'fist', off(wrist, dx * 0.6, dy), aF + (k ? 4 : 0));
    }
    return { hip, knee, ankle, neck, sh };
  }
  return { g, draw, T };
}
