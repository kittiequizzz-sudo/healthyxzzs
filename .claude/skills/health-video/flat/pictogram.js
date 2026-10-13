// Pictogram-style figure (medical / physio-app icon look): geometric, no outlines, floating head,
// uniform rounded limbs, one body colour; working muscles shown as a red segment on the body.
function PictoFigure(svg, { x = 960, floor = 820, scale = 1, color = '#2B3A55', farColor = '#9AA6BA', hiColor = '#E23B2E' } = {}) {
  const k = scale, g = el('g', {}, svg);
  const L = { lumbar: 95 * k, thoracic: 135 * k, neck: 30 * k, thigh: 200 * k, shin: 190 * k, upper: 105 * k, fore: 95 * k, head: 40 * k };
  const W = { torso: 62 * k, limb: 34 * k, arm: 26 * k };
  const mk = (w, c) => el('polyline', { fill: 'none', stroke: c, 'stroke-width': w, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
  const farLeg = mk(W.limb, farColor), farArm = mk(W.arm, farColor);
  const torso = mk(W.torso, color), abs = mk(W.torso * 0.42, hiColor), leg = mk(W.limb, color), hip = mk(W.limb * 0.5, hiColor);
  const head = el('circle', { r: L.head, fill: color }, g), arm = mk(W.arm, color);
  const Pp = (p, len, a) => [p[0] + len * Math.cos(rad(a)), p[1] - len * Math.sin(rad(a))];
  const pt = a => a.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
  function draw(p, hi = {}) {
    const hp = [x, floor - W.torso / 2];
    const aL = 180 - p.hipFlex - p.lumbar, aT = aL - p.thoracic, aN = aT - p.neck;
    const s1 = Pp(hp, L.lumbar, aL), s2 = Pp(s1, L.thoracic, aT);
    const hc = Pp(s2, L.neck + L.head + 14 * k, aN);           // floating head: visible gap above the shoulders
    const knee = Pp(hp, L.thigh, p.knee);
    const ay = floor - W.limb / 2, dy = ay - knee[1];
    const ankle = [knee[0] + Math.sqrt(Math.max(1, L.shin * L.shin - dy * dy)), ay];
    const toe = [ankle[0] + 34 * k, ay];
    set(torso, { points: pt([hp, s1, s2]) });
    set(head, { cx: hc[0], cy: hc[1] });
    set(leg, { points: pt([hp, knee, ankle, toe]) });
    const front = a => [Math.cos(rad(a - 90)), -Math.sin(rad(a - 90))];
    const ab0 = [hp[0] + front(aL)[0] * W.torso * 0.22, hp[1] + front(aL)[1] * W.torso * 0.22];
    const ab1 = [s1[0] + front(aT)[0] * W.torso * 0.22, s1[1] + front(aT)[1] * W.torso * 0.22];
    const ab2 = Pp(ab1, L.thoracic * 0.4, aT);
    set(abs, { points: pt([Pp(ab0, 14 * k, aL), ab1, ab2]), opacity: hi.abs || 0 });
    set(hip, { points: pt([Pp(hp, 10 * k, aL), hp, Pp(hp, L.thigh * 0.45, p.knee)]), opacity: hi.hip || 0 });
    if (p.farLegStraight) { const kf = Pp(hp, L.thigh, -2), af = Pp(kf, L.shin, -1); set(farLeg, { points: pt([hp, kf, af]) }); }
    else set(farLeg, { points: pt([[hp[0] - 12 * k, hp[1]], [knee[0] - 14 * k, knee[1]], [ankle[0] - 14 * k, ankle[1]], [toe[0] - 14 * k, toe[1]]]) });
    const sh = Pp(s1, L.thoracic * 0.85, aT);
    let pts;
    if (p.arms === 'under') { const el2 = Pp(sh, L.upper, aT + 180 + 6); pts = [sh, el2, Pp(el2, L.fore * 0.8, aT + 180 - 20)]; }
    else { const el2 = Pp(sh, L.upper * 0.75, aT + 180 + 26); pts = [sh, el2, Pp(el2, L.fore * 0.7, aT - 8)]; }
    set(arm, { points: pt(pts) });
    set(farArm, { points: pt(pts.map(q => [q[0] - 8 * k, q[1] - 4 * k])) });
  }
  return { g, draw };
}
