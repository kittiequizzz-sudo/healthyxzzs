"""Exercise motion library: research-based joint angles + smooth (minimum-jerk) timing.

Every movement is a list of keyframes (time, pose). Between keyframes the joints follow the
minimum-jerk profile (Flash & Hogan 1985): s(τ) = 10τ³ − 15τ⁴ + 6τ⁵, which starts and stops
with zero velocity and acceleration and gives the bell-shaped velocity of real human reaches.
On top of that:
  * left/right asymmetry: one side lags ~1-2 frames, as people never move perfectly in sync;
  * breathing (≈15 breaths/min resting) and a slow postural sway, so holds are never frozen;
  * optional follow-through on fast cheats (small overshoot then settle).

Joint channels (degrees unless noted) - the rig maps the ones it has and ignores the rest:
  front view: arm_l, arm_r (shoulder abduction: 0 = hanging, 90 = shoulder height),
              elbow_l, elbow_r (flexion), shrug_l, shrug_r (0..1 scapular elevation),
              body_y (px, + = hips drop), lean (deg, + = trunk leans back / to screen right)
  side view:  shoulder (flexion: 0 down, 90 forward), elbow, trunk (forward lean), hip, knee,
              body_y, body_x
See references/motion-research.md for where each number comes from.
"""
import math

# ------------------------------------------------------------------ easing

def min_jerk(t):
    t = 0.0 if t < 0 else 1.0 if t > 1 else t
    return t * t * t * (10 - 15 * t + 6 * t * t)


def ease_hold(t):
    return 0.0


# ------------------------------------------------------------------ research data
# Tempo presets: (concentric, top pause, eccentric, bottom pause) seconds per rep.
TEMPO = {
    # matches the reference AI clips' pace (raise ≈0.3–0.5 s) but long enough to read as smooth
    "video": (0.55, 0.35, 0.75, 0.25),
    # 2–8 s/rep is the range used in hypertrophy research; slower eccentric than concentric
    "controlled": (1.0, 0.3, 2.0, 0.3),
    "slow": (2.0, 0.5, 3.0, 0.5),
    # a heavy, momentum-driven rep (cheating demos)
    "cheat": (0.32, 0.08, 0.55, 0.2),
}

STAND_FRONT = {"arm_l": 10, "arm_r": 10, "elbow_l": 8, "elbow_r": 8, "shrug_l": 0, "shrug_r": 0, "body_y": 0, "lean": 0}
STAND_SIDE = {"shoulder": 4, "elbow": 8, "trunk": 4, "hip": 0, "knee": 4, "body_y": 0, "body_x": 0}


def scap_shrug(abduction):
    """Scapular elevation implied by arm height.

    Scapulohumeral rhythm is ≈2:1 after the first ~30° (Inman 1944; e.g. physiotutors). Upper-trap
    driven elevation becomes visible as the arm goes past shoulder height - this is the 'traps take
    over' fault. Returns 0..1."""
    return max(0.0, min(1.0, (abduction - 90) / 70.0)) * 0.9


EXERCISES = {
    # ---------------------------------------------------------------- shoulders (front view)
    "lateral_raise": {
        "view": "front",
        "muscles": ["side_delts"],
        "bottom": {"arm_l": 12, "arm_r": 12, "elbow_l": 10, "elbow_r": 10},
        # stop at shoulder height: load torque on the delt peaks with the arm parallel to the floor
        "top": {"arm_l": 88, "arm_r": 88, "elbow_l": 16, "elbow_r": 16},
        "cue": "Slight elbow bend, lead with the elbows, stop at shoulder height, no shrug.",
    },
    "lateral_raise_too_high": {
        "view": "front",
        "muscles": ["traps"],
        "bottom": {"arm_l": 12, "arm_r": 12, "elbow_l": 10, "elbow_r": 10},
        "top": {"arm_l": 150, "arm_r": 150, "elbow_l": 14, "elbow_r": 14, "shrug_l": scap_shrug(150), "shrug_r": scap_shrug(150)},
        "cue": "Fault: raising past shoulder height shifts work to the upper traps (and was linked to impingement signs).",
    },
    "lateral_raise_shrug": {
        "view": "front",
        "muscles": ["traps"],
        "bottom": {"arm_l": 12, "arm_r": 12, "elbow_l": 10, "elbow_r": 10},
        "top": {"arm_l": 80, "arm_r": 80, "elbow_l": 18, "elbow_r": 18, "shrug_l": 0.9, "shrug_r": 0.9},
        "cue": "Fault: shoulders hike toward the ears during the raise.",
    },
    "lateral_raise_swing": {
        "view": "front",
        "muscles": ["quads", "lower_back"],
        "tempo": "cheat",
        # dip with the knees, then drive with legs/back while the arms are flung up
        "phases": [
            ("dip", {"arm_l": 16, "arm_r": 16, "body_y": 38, "lean": -3, "elbow_l": 14, "elbow_r": 14}, 0.35),
            ("drive", {"arm_l": 98, "arm_r": 98, "body_y": -6, "lean": 7, "elbow_l": 18, "elbow_r": 18}, 0.30),
            ("settle", {"arm_l": 90, "arm_r": 90, "body_y": 0, "lean": 4}, 0.18),
            ("lower", {"arm_l": 12, "arm_r": 12, "body_y": 0, "lean": 0, "elbow_l": 10, "elbow_r": 10}, 0.6),
            ("pause", None, 0.2),
        ],
        "cue": "Fault: knee bounce + lower-back jerk swing the weight; the delts barely work.",
    },
    "shrug": {
        "view": "front",
        "muscles": ["traps"],
        "bottom": {"shrug_l": 0, "shrug_r": 0},
        "top": {"shrug_l": 1, "shrug_r": 1},
    },
    "overhead_press": {
        "view": "front",
        "muscles": ["front_delts", "triceps"],
        "bottom": {"arm_l": 82, "arm_r": 82, "elbow_l": 95, "elbow_r": 95},
        "top": {"arm_l": 165, "arm_r": 165, "elbow_l": 10, "elbow_r": 10, "shrug_l": 0.5, "shrug_r": 0.5},
    },
    # ---------------------------------------------------------------- side view
    "front_raise": {
        "view": "side", "muscles": ["front_delts"],
        "bottom": {"shoulder": 5, "elbow": 10}, "top": {"shoulder": 90, "elbow": 12},
    },
    "biceps_curl": {
        # elbow excursion ≈115–157° across studies; upper arm stays pinned
        "view": "side", "muscles": ["biceps"],
        "bottom": {"shoulder": 4, "elbow": 8}, "top": {"shoulder": 10, "elbow": 140},
    },
    "biceps_curl_cheat": {
        # heavy curls showed ≈35° trunk motion vs ≈12° for light ones; shoulder hikes under fatigue
        "view": "side", "muscles": ["lower_back", "front_delts"], "tempo": "cheat",
        "phases": [
            ("lean_in", {"trunk": 14, "elbow": 14, "shoulder": -6}, 0.35),
            ("heave", {"trunk": -18, "elbow": 135, "shoulder": 28}, 0.32),
            ("lower", {"trunk": 4, "elbow": 8, "shoulder": 4}, 0.7),
            ("pause", None, 0.2),
        ],
    },
    "squat": {
        # parallel ("horizontal") squat ≈113° knee / ≈128° hip flexion; half squat ≈71° / ≈88°
        "view": "side", "muscles": ["quads", "glutes"],
        "bottom": {"knee": 113, "hip": 128, "trunk": 42},
        "top": {"knee": 4, "hip": 0, "trunk": 4},
        "start": "top",
    },
    "half_squat": {
        "view": "side", "muscles": ["quads", "glutes"],
        "bottom": {"knee": 71, "hip": 88, "trunk": 30}, "top": {"knee": 4, "hip": 0, "trunk": 4}, "start": "top",
    },
    "hip_hinge": {
        # RDL-style: knees stay soft and nearly fixed, trunk travels; good-morning knee ≈5°
        "view": "side", "muscles": ["hamstrings", "glutes"],
        "bottom": {"knee": 18, "hip": 85, "trunk": 80}, "top": {"knee": 6, "hip": 0, "trunk": 4}, "start": "top",
    },
}


# ------------------------------------------------------------------ tracks

class Track:
    """Keyframed pose curve sampled with minimum-jerk interpolation per channel."""

    def __init__(self, start_pose):
        self.keys = [(0.0, dict(start_pose))]

    @property
    def end(self):
        return self.keys[-1][0]

    def to(self, pose, dur):
        last = dict(self.keys[-1][1])
        if pose:
            last.update(pose)
        self.keys.append((self.end + max(1e-3, dur), last))
        return self

    def hold(self, dur):
        return self.to(None, dur)

    def sample(self, t):
        ks = self.keys
        if t <= ks[0][0]:
            return dict(ks[0][1])
        if t >= ks[-1][0]:
            return dict(ks[-1][1])
        for (t0, p0), (t1, p1) in zip(ks, ks[1:]):
            if t0 <= t <= t1:
                s = min_jerk((t - t0) / (t1 - t0))
                return {k: p0.get(k, p1.get(k, 0)) + (p1.get(k, p0.get(k, 0)) - p0.get(k, p1.get(k, 0))) * s
                        for k in set(p0) | set(p1)}
        return dict(ks[-1][1])


def build(exercise, reps=1, tempo=None, lead_in=0.15, end="hold", base=None, scale_rom=1.0):
    """Track for `reps` repetitions of an exercise.

    lead_in: seconds of stillness before the first rep (the cut lands, then the motion starts).
    end:     "hold" stays at the end pose; "top" finishes holding the top position (like the
             reference shots that hold the arms at shoulder height under a label).
    scale_rom: shrink/extend the range of motion (e.g. 0.6 for a partial rep).
    """
    ex = EXERCISES[exercise]
    view = ex["view"]
    rest = dict(STAND_FRONT if view == "front" else STAND_SIDE)
    if base:
        rest.update(base)
    tempo = tempo or ex.get("tempo", "video")
    con, top_p, ecc, bot_p = TEMPO[tempo] if isinstance(tempo, str) else tempo

    def scaled(a, b):
        return {k: a.get(k, rest.get(k, 0)) + (b[k] - a.get(k, rest.get(k, 0))) * scale_rom for k in b}

    if "phases" in ex:
        start = dict(rest)
        tr = Track(start).hold(lead_in)
        for _ in range(reps):
            for name, pose, dur in ex["phases"]:
                k = (con / TEMPO["cheat"][0]) if tempo != "cheat" else 1.0
                if pose is None:
                    tr.hold(dur * k)
                else:
                    tr.to(pose, dur * k)
        return tr
    bottom = dict(rest)
    bottom.update(ex["bottom"])
    top = dict(bottom)
    top.update(scaled(bottom, ex["top"]))
    first, second = (bottom, top) if ex.get("start", "bottom") == "bottom" else (top, bottom)
    if ex.get("start", "bottom") == "top":  # squat/hinge: start standing, go down, come up
        con, ecc = ecc, con
    tr = Track(first).hold(lead_in)
    for i in range(reps):
        tr.to(second, con).hold(top_p)
        if end == "top" and i == reps - 1:
            break
        tr.to(first, ecc).hold(bot_p)
    return tr


def keyframes(start_pose, steps):
    """Custom motion: steps = [{"pose": {...}, "dur": 0.5} | {"hold": 0.3}]."""
    tr = Track(start_pose)
    for s in steps:
        if "hold" in s:
            tr.hold(s["hold"])
        else:
            tr.to(s["pose"], s.get("dur", 0.5))
    return tr


# ------------------------------------------------------------------ life

def alive(pose, t, seed=0.0, breath_hz=0.25, sway=1.0, lag=None, track=None):
    """Add breathing, sway and left/right lag to a sampled pose.

    lag: {"arm_r": 0.05} → that channel is sampled 50 ms later (needs `track`)."""
    p = dict(pose)
    if track is not None and lag:
        for ch, dt in lag.items():
            p[ch] = track.sample(t - dt).get(ch, p.get(ch, 0))
    b = 0.5 - 0.5 * math.cos(2 * math.pi * breath_hz * t + seed)
    p["breath"] = b
    p["body_y"] = p.get("body_y", 0) - 1.6 * b * sway
    p["lean"] = p.get("lean", 0) + 0.35 * sway * math.sin(2 * math.pi * 0.11 * t + seed * 1.7)
    for side in ("l", "r"):
        k = "arm_" + side
        if k in p:
            p[k] += 0.6 * sway * math.sin(2 * math.pi * 0.17 * t + (0 if side == "l" else 1.3) + seed)
    return p
