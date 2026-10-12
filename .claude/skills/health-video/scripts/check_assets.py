#!/usr/bin/env python3
"""Check delivered assets against an order manifest.

  check_assets.py project_dir            # reads project_dir/manifest.json, scans project_dir/assets

Matches files by asset id prefix (e.g. "S03_char" matches "S03_char.mp4" or "S03_char_v2.png"),
reports missing ones, unexpected extras, and probes size/duration/background colour so problems
(wrong aspect, too short, non-cream background) are caught before timeline work starts.
"""
import json
import os
import subprocess
import sys

CREAM = (245, 236, 215)
VIDEO = (".mp4", ".mov", ".webm", ".mkv")
IMAGE = (".png", ".jpg", ".jpeg", ".webp")
AUDIO = (".wav", ".mp3", ".m4a", ".aac", ".flac")


def probe(path):
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration:stream=codec_type,width,height",
                          "-of", "json", path], capture_output=True, text=True)
    try:
        j = json.loads(out.stdout)
    except json.JSONDecodeError:
        return {}
    v = next((s for s in j.get("streams", []) if s.get("codec_type") == "video"), {})
    return {"w": v.get("width"), "h": v.get("height"), "dur": float(j.get("format", {}).get("duration", 0) or 0)}


def corner_color(path):
    from PIL import Image
    if path.lower().endswith(VIDEO):
        tmp = path + ".probe.png"
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", path, "-frames:v", "1", tmp])
        img = Image.open(tmp).convert("RGB")
        os.remove(tmp)
    else:
        img = Image.open(path).convert("RGB")
    w, h = img.size
    px = [img.getpixel((8, 8)), img.getpixel((w - 9, 8)), img.getpixel((8, h - 9)), img.getpixel((w - 9, h - 9))]
    return tuple(sum(c[i] for c in px) // 4 for i in range(3))


def main():
    proj = sys.argv[1] if len(sys.argv) > 1 else "."
    man = json.load(open(os.path.join(proj, "manifest.json")))
    adir = os.path.join(proj, "assets")
    files = sorted(os.listdir(adir)) if os.path.isdir(adir) else []
    used = set()
    ok = True
    ids = [a["id"] for a in man["assets"]]

    def owner(f):
        """The manifest id a file belongs to: the longest id that prefixes its name."""
        stem = os.path.splitext(f)[0]
        cands = [i for i in ids if stem.startswith(i)]
        return max(cands, key=len) if cands else None

    for a in man["assets"]:
        hits = [f for f in files if owner(f) == a["id"]]
        if not hits:
            print(f"MISSING  {a['id']:<28} {a.get('kind', '')}: {a.get('desc', '')}")
            ok = False
            continue
        f = hits[-1]
        used.update(hits)
        p = os.path.join(adir, f)
        info = probe(p)
        notes = []
        kind = a.get("kind")
        ext = os.path.splitext(f)[1].lower()
        if kind == "video" and ext not in VIDEO:
            notes.append("expected a video clip")
        if kind == "image" and ext not in IMAGE:
            notes.append("expected an image")
        if kind == "audio" and ext not in AUDIO + VIDEO:
            notes.append("expected audio")
        if kind in ("video", "image") and info.get("w"):
            if abs(info["w"] / info["h"] - 16 / 9) > 0.02 and not a.get("any_aspect"):
                notes.append(f"aspect {info['w']}x{info['h']} is not 16:9")
            if info["w"] < 1280 and not a.get("any_aspect"):
                notes.append(f"low resolution {info['w']}x{info['h']}")
            if a.get("bg", "cream") == "cream":
                c = corner_color(p)
                if max(abs(c[i] - CREAM[i]) for i in range(3)) > 18:
                    notes.append(f"background {c} is not cream #F5ECD7 (will show a seam)")
        if kind == "video" and a.get("min_duration") and info.get("dur", 0) < a["min_duration"]:
            notes.append(f"only {info['dur']:.1f}s, need {a['min_duration']}s (last frame will be held)")
        status = "OK      " if not notes else "CHECK   "
        dims = f"{info.get('w')}x{info.get('h')}" if info.get("w") else ""
        dur = f"{info['dur']:.1f}s" if info.get("dur") else ""
        print(f"{status} {a['id']:<28} {f:<40} {dims:>10} {dur:>7}  {'; '.join(notes)}")
    for f in files:
        if f not in used:
            print(f"EXTRA    {f}")
    sys.exit(0 if ok else 1)


if __name__ == "__main__":
    main()
