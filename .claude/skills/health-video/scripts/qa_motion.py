#!/usr/bin/env python3
"""Measure the motion in a video clip with pose estimation, and check it against an exercise spec.

Two jobs:
  1. QA an AI-generated clip: did the character do the right exercise, through the right range, at a
     sensible tempo, without the body melting (limb lengths drifting) or jittering?
       qa_motion.py clip.mp4 --exercise lateral_raise --view front -o qa/S04
  2. Capture motion from a real exercise video (a coach demo the user supplies) so the puppet can
     replay a real human's timing:
       qa_motion.py coach.mp4 --capture -o motion_captures/lateral_raise_coach

Outputs <out>.json (per-frame angles, reps, verdicts) and <out>.png (angle curves).
Angles (degrees):
  abd_l/abd_r   shoulder abduction (trunk-down vs upper arm), front view
  flex_l/flex_r shoulder flexion seen from the side (same geometry; use with --view side)
  elbow_l/r     elbow flexion (0 = straight)
  hip_l/r       hip flexion (0 = standing straight)
  knee_l/r      knee flexion (0 = straight)
  trunk         trunk lean from vertical (+ forward/sideways, whichever the camera sees)
"""
import argparse
import json
import math
import os
import sys

import cv2
import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
MODEL = os.environ.get("HV_POSE_MODEL", os.path.expanduser("~/.cache/health-video/pose_landmarker_full.task"))

# Expected motion per exercise: which channel moves, valid range at the bottom/top, tempo limits.
# Ranges come from references/motion-research.md (research values where they exist, coaching
# standards otherwise) widened for 2D-projection error.
SPECS = {
    "lateral_raise": {"channel": "abd", "bottom": (0, 35), "top": (75, 110), "still": ["knee", "trunk"]},
    "lateral_raise_too_high": {"channel": "abd", "bottom": (0, 35), "top": (125, 180)},
    "lateral_raise_swing": {"channel": "abd", "bottom": (0, 40), "top": (70, 130), "needs": {"knee": (20, 120)},
                            "jitter_max": 10, "sym_max": 25, "consistency_max": 0.16},
    "front_raise": {"channel": "flex", "bottom": (0, 30), "top": (75, 110), "still": ["knee", "trunk"]},
    "overhead_press": {"channel": "abd", "bottom": (60, 100), "top": (145, 180)},
    "biceps_curl": {"channel": "elbow", "bottom": (0, 35), "top": (110, 160), "still": ["trunk"]},
    "squat": {"channel": "knee", "bottom": (0, 20), "top": (90, 140)},
    "half_squat": {"channel": "knee", "bottom": (0, 20), "top": (55, 95)},
    "hip_hinge": {"channel": "hip", "bottom": (0, 20), "top": (60, 110), "max": {"knee": 35}},
    "sit_to_stand": {"channel": "knee", "bottom": (0, 25), "top": (75, 110)},
    "calf_raise": {"channel": "body_y", "bottom": None, "top": None},
}

L = {"nose": 0, "sh_l": 11, "sh_r": 12, "el_l": 13, "el_r": 14, "wr_l": 15, "wr_r": 16, "hip_l": 23, "hip_r": 24,
     "kn_l": 25, "kn_r": 26, "an_l": 27, "an_r": 28}


def _angle(a, b, c):
    v1, v2 = np.subtract(a, b), np.subtract(c, b)
    n = np.linalg.norm(v1) * np.linalg.norm(v2)
    if n < 1e-6:
        return float("nan")
    return float(np.degrees(np.arccos(np.clip(v1 @ v2 / n, -1, 1))))


def measure(path, every=1):
    import mediapipe as mp
    from mediapipe.tasks import python as mpt
    from mediapipe.tasks.python import vision
    if not os.path.exists(MODEL):
        sys.exit(f"pose model missing at {MODEL}; run scripts/setup.sh")
    det = vision.PoseLandmarker.create_from_options(vision.PoseLandmarkerOptions(
        base_options=mpt.BaseOptions(model_asset_path=MODEL), running_mode=vision.RunningMode.VIDEO,
        min_pose_detection_confidence=0.3, min_tracking_confidence=0.3))
    cap = cv2.VideoCapture(path)
    fps = cap.get(cv2.CAP_PROP_FPS) or 30
    rows = []
    i = 0
    while True:
        ok, f = cap.read()
        if not ok:
            break
        if i % every:
            i += 1
            continue
        t = i / fps
        r = det.detect_for_video(mp.Image(image_format=mp.ImageFormat.SRGB, data=cv2.cvtColor(f, cv2.COLOR_BGR2RGB)), int(t * 1000))
        row = {"t": round(t, 4)}
        if r.pose_landmarks:
            lm = r.pose_landmarks[0]
            P = {k: (lm[v].x * f.shape[1], lm[v].y * f.shape[0]) for k, v in L.items()}
            vis = {k: lm[v].visibility for k, v in L.items()}
            mid_sh = np.mean([P["sh_l"], P["sh_r"]], axis=0)
            mid_hip = np.mean([P["hip_l"], P["hip_r"]], axis=0)
            for s in ("l", "r"):
                # arm elevation measured against the trunk axis (robust to cartoon shoulder widths)
                down_s = tuple(np.asarray(P["sh_" + s]) + (mid_hip - mid_sh))
                row["abd_" + s] = _angle(down_s, P["sh_" + s], P["el_" + s])
                row["flex_" + s] = row["abd_" + s]
                row["elbow_" + s] = 180 - _angle(P["sh_" + s], P["el_" + s], P["wr_" + s])
                row["hip_" + s] = 180 - _angle(P["sh_" + s], P["hip_" + s], P["kn_" + s])
                row["knee_" + s] = 180 - _angle(P["hip_" + s], P["kn_" + s], P["an_" + s])
                row["uarm_" + s] = math.dist(P["sh_" + s], P["el_" + s])
                row["farm_" + s] = math.dist(P["el_" + s], P["wr_" + s])
            row["trunk"] = float(np.degrees(np.arctan2(abs(mid_sh[0] - mid_hip[0]), mid_hip[1] - mid_sh[1])))
            row["torso_len"] = float(np.linalg.norm(mid_sh - mid_hip))
            row["body_y"] = float(mid_hip[1])
            row["vis"] = float(np.mean([vis[k] for k in ("sh_l", "sh_r", "el_l", "el_r", "wr_l", "wr_r", "hip_l", "hip_r")]))
        rows.append(row)
        i += 1
    return rows, fps


def series(rows, key):
    t = np.array([r["t"] for r in rows])
    v = np.array([r.get(key, np.nan) for r in rows], float)
    ok = ~np.isnan(v)
    if ok.sum() >= 2:
        v = np.interp(t, t[ok], v[ok])
    return t, v


def median5(v):
    """Reject single-frame pose-detector spikes."""
    if len(v) < 5:
        return v
    pad = np.pad(v, (2, 2), mode="edge")
    return np.median(np.stack([pad[i:i + len(v)] for i in range(5)]), axis=0)


def smooth(v, k=5):
    v = median5(v)
    if len(v) < k:
        return v
    pad = np.pad(v, (k // 2, k // 2), mode="edge")
    return np.convolve(pad, np.ones(k) / k, mode="valid")


def reps_from(t, v, lo, hi):
    """Rep segmentation with hysteresis: bottom→top crossings."""
    mid = (lo + hi) / 2
    reps, state, start = [], "low", None
    for i in range(len(v)):
        if state == "low" and v[i] > mid:
            state = "high"
            start = i
        elif state == "high" and v[i] < mid:
            state = "low"
            seg = slice(max(0, start - 30), i + 1)
            j = int(np.argmax(v[seg])) + seg.start
            reps.append({"peak_t": float(t[j]), "peak": float(v[j])})
    return reps


def phase_times(t, v, lo_thr, hi_thr):
    """Concentric/eccentric durations: time spent travelling between the 10% and 90% levels."""
    a, b = lo_thr + 0.1 * (hi_thr - lo_thr), lo_thr + 0.9 * (hi_thr - lo_thr)
    ups, downs = [], []
    i = 0
    n = len(v)
    while i < n - 1:
        if v[i] <= a < v[i + 1]:
            j = i
            while j < n - 1 and v[j] < b:
                j += 1
            if j < n - 1:
                ups.append(t[j] - t[i])
            i = j
        elif v[i] >= b > v[i + 1]:
            j = i
            while j < n - 1 and v[j] > a:
                j += 1
            if j < n - 1:
                downs.append(t[j] - t[i])
            i = j
        else:
            i += 1
    return ups, downs


def check(rows, fps, exercise, view, rigid=False):
    spec = SPECS.get(exercise, {})
    ch = spec.get("channel", "abd")
    out = {"exercise": exercise, "verdicts": [], "pass": True}

    def fail(msg):
        out["verdicts"].append("FAIL " + msg)
        out["pass"] = False

    def note(msg):
        out["verdicts"].append("ok   " + msg)

    vis = np.array([r.get("vis", 0) for r in rows])
    if (vis < 0.5).mean() > 0.3:
        fail(f"pose not visible in {(vis < 0.5).mean():.0%} of frames (cropped, occluded or style not readable)")
    sides = ("l", "r") if ch not in ("trunk", "body_y") else ("",)
    for s in sides:
        key = f"{ch}_{s}" if s else ch
        t, v = series(rows, key)
        v = smooth(v)
        if spec.get("top"):
            lo, hi = float(np.percentile(v, 5)), float(np.percentile(v, 95))
            out[key] = {"min": round(lo, 1), "max": round(hi, 1)}
            b0, b1 = spec["bottom"]
            t0, t1 = spec["top"]
            (note if b0 <= lo <= b1 else fail)(f"{key} bottom {lo:.0f}° (expected {b0}–{b1}°)")
            (note if t0 <= hi <= t1 else fail)(f"{key} top {hi:.0f}° (expected {t0}–{t1}°)")
            r = reps_from(t, v, lo, hi)
            ups, downs = phase_times(t, v, lo, hi)
            out[key]["reps"] = len(r)
            out[key]["concentric_s"] = [round(x, 2) for x in ups]
            out[key]["eccentric_s"] = [round(x, 2) for x in downs]
            note(f"{key}: {len(r)} rep(s), up {np.mean(ups) if ups else float('nan'):.2f}s, down {np.mean(downs) if downs else float('nan'):.2f}s")
            if ups and min(ups) < 0.12 and "swing" not in exercise:
                fail(f"{key} jumps up in {min(ups):.2f}s - looks like a pop, not a lift")
    # symmetry for bilateral moves
    if ch in ("abd", "flex", "elbow") and len(sides) == 2:
        _, a = series(rows, f"{ch}_l")
        _, b = series(rows, f"{ch}_r")
        d = float(np.nanmedian(np.abs(smooth(a) - smooth(b))))
        (note if d < spec.get("sym_max", 15) else fail)(f"left/right differ by {d:.0f}° on average")
    # parts that should stay still
    for part in spec.get("still", []):
        key = part if part == "trunk" else part + "_l"
        _, v = series(rows, key)
        rng = float(np.nanpercentile(v, 95) - np.nanpercentile(v, 5))
        (note if rng < 15 else fail)(f"{key} moves {rng:.0f}° (should stay still)")
    for part, (a0, a1) in spec.get("needs", {}).items():
        _, v = series(rows, part + "_l")
        pk = float(np.nanpercentile(v, 95))
        (note if a0 <= pk <= a1 else fail)(f"{part} peaks at {pk:.0f}° (expected {a0}–{a1}° for this fault demo)")
    for part, mx in spec.get("max", {}).items():
        _, v = series(rows, part + "_l")
        pk = float(np.nanpercentile(v, 95))
        (note if pk <= mx else fail)(f"{part} peaks at {pk:.0f}° (max {mx}°)")
    # AI artefacts: limbs changing length = melting; high-frequency wobble = jitter
    # (skipped for puppet renders: rigid parts cannot melt, so any change is detector noise)
    for key in (() if rigid else ("uarm_l", "uarm_r", "farm_l", "farm_r", "torso_len")):
        _, v = series(rows, key)
        if np.isnan(v).all():
            continue
        cv_ = float(np.nanstd(v) / max(1e-6, np.nanmean(v)))
        if key.startswith(("uarm", "farm")) and ch in ("abd", "flex"):
            cv_ *= 0.5  # 2D foreshortening explains some change when arms swing toward the camera
        (note if cv_ < spec.get("consistency_max", 0.12) else fail)(f"{key} length varies {cv_:.0%} (body consistency)")
    _, a = series(rows, f"{ch}_l" if ch not in ("trunk", "body_y") else ch)
    a = median5(a)
    jitter = float(np.nanstd(a - smooth(a, 7)))
    (note if jitter < spec.get("jitter_max", 4) else fail)(f"frame-to-frame jitter {jitter:.1f}°")
    return out


def plot(rows, keys, out_png, title):
    W, H = 1400, 520
    img = np.full((H, W, 3), 255, np.uint8)
    t = np.array([r["t"] for r in rows])
    if len(t) < 2:
        return
    cols = [(46, 92, 249), (54, 173, 247), (79, 168, 47), (200, 106, 142), (40, 40, 40), (120, 120, 120)]
    x = lambda tt: int(60 + (tt - t[0]) / max(1e-6, t[-1] - t[0]) * (W - 90))
    y = lambda a: int(H - 40 - (a / 180.0) * (H - 80))
    for a in range(0, 181, 30):
        cv2.line(img, (60, y(a)), (W - 30, y(a)), (230, 230, 230), 1)
        cv2.putText(img, f"{a}", (20, y(a) + 4), cv2.FONT_HERSHEY_SIMPLEX, 0.4, (90, 90, 90), 1)
    for k, c in zip(keys, cols):
        _, v = series(rows, k)
        pts = np.array([[x(tt), y(vv)] for tt, vv in zip(t, v) if not np.isnan(vv)], np.int32)
        if len(pts) > 1:
            cv2.polylines(img, [pts], False, c, 2, cv2.LINE_AA)
        cv2.putText(img, k, (70 + 110 * keys.index(k), 22), cv2.FONT_HERSHEY_SIMPLEX, 0.55, c, 2)
    cv2.putText(img, title, (W - 520, 22), cv2.FONT_HERSHEY_SIMPLEX, 0.55, (0, 0, 0), 1)
    cv2.imwrite(out_png, img)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("video")
    ap.add_argument("--exercise", default="lateral_raise")
    ap.add_argument("--view", default="front")
    ap.add_argument("--capture", action="store_true", help="just extract angle curves (for motion capture)")
    ap.add_argument("--puppet", action="store_true", help="QA a puppet render: skip the limb-length (melting) check")
    ap.add_argument("--start", type=float, default=0)
    ap.add_argument("--end", type=float)
    ap.add_argument("-o", "--out", required=True)
    a = ap.parse_args()
    rows, fps = measure(a.video)
    rows = [r for r in rows if r["t"] >= a.start and (a.end is None or r["t"] <= a.end)]
    os.makedirs(os.path.dirname(os.path.abspath(a.out)), exist_ok=True)
    result = {"video": a.video, "fps": fps, "frames": rows}
    if not a.capture:
        result["qa"] = check(rows, fps, a.exercise, a.view, rigid=a.puppet)
        for v in result["qa"]["verdicts"]:
            print(v)
        print("PASS" if result["qa"]["pass"] else "REJECT")
    ch = SPECS.get(a.exercise, {}).get("channel", "abd")
    keys = [f"{ch}_l", f"{ch}_r", "knee_l", "trunk", "elbow_l"] if ch not in ("trunk", "body_y") else ["trunk", "knee_l", "hip_l"]
    plot(rows, keys, a.out + ".png", f"{os.path.basename(a.video)}  {a.exercise}")
    with open(a.out + ".json", "w") as f:
        json.dump(result, f, indent=1)


if __name__ == "__main__":
    main()
