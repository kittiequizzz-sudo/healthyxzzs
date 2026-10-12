#!/usr/bin/env python3
"""Render a health-explainer video from a timeline JSON.

The look matches the reference demos: cream background, AI-animated character
clips as the base layer, and code-drawn motion graphics on top (orange labels,
amber number tiles, bar charts, arrows, X/check icons, zoom callouts, dashed
guide lines). Shots change on hard cuts.

Usage:
  render.py timeline.json -o out.mp4               full render with audio
  render.py timeline.json --draft -o draft.mp4     half-res, fast preview
  render.py timeline.json --frame 12.4 -o f.png    one frame for QA
  render.py timeline.json --sheet 0:30:0.5 -o s.png contact sheet for QA
  render.py timeline.json --start 10 --end 20 ...  render a sub-range

All times in the timeline are absolute seconds on the voice-over clock.
See references/timeline-spec.md for the schema.
"""
import argparse
import json
import math
import os
import random
import shutil
import subprocess
import sys
import tempfile

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
FONT_DIR = os.path.normpath(os.path.join(HERE, "..", "assets", "fonts"))
FONTS = {
    "black": "Inter-Black.otf",
    "extrabold": "Inter-ExtraBold.otf",
    "bold": "Inter-Bold.otf",
}

# Sampled from the reference frames.
PALETTE = {
    "cream": "#F5ECD7",
    "orange": "#F95C00",
    "amber": "#F7AD36",
    "ink": "#14100E",
    "blue": "#58A9E4",
    "purple": "#8E6AC8",
    "red": "#E23B2E",
    "green": "#2FA84F",
    "gray": "#A7AAAD",
    "white": "#FFFFFF",
    "navy": "#1B2238",
    "cyan": "#BFF3FF",
}

BASE_W, BASE_H = 1920, 1080


# ---------------------------------------------------------------- helpers

def color(c, alpha=255):
    if c is None:
        return None
    if isinstance(c, (list, tuple)):
        return tuple(c) if len(c) == 4 else (*c, alpha)
    c = PALETTE.get(c, c)
    c = c.lstrip("#")
    return (int(c[0:2], 16), int(c[2:4], 16), int(c[4:6], 16), alpha)


_font_cache = {}


def font(weight, size):
    key = (weight, int(size))
    if key not in _font_cache:
        _font_cache[key] = ImageFont.truetype(os.path.join(FONT_DIR, FONTS.get(weight, weight)), int(size))
    return _font_cache[key]


def clamp01(x):
    return 0.0 if x < 0 else 1.0 if x > 1 else x


def ease_out_cubic(t):
    t = clamp01(t)
    return 1 - (1 - t) ** 3


def ease_in_out(t):
    t = clamp01(t)
    return 3 * t * t - 2 * t * t * t


def ease_out_back(t, s=2.0):
    t = clamp01(t) - 1
    return 1 + (s + 1) * t ** 3 + s * t ** 2


class Ctx:
    """Render context: output scale factor and the base frame of the current shot."""

    def __init__(self, scale, fps):
        self.k = scale  # output px per design px (design space is 1920x1080)
        self.fps = fps
        self.W = int(round(BASE_W * scale)) // 2 * 2
        self.H = int(round(BASE_H * scale)) // 2 * 2
        self.base = None  # current base frame (numpy HxWx3), for callouts

    def px(self, v, axis):
        """Design-space coordinate -> output px. Values 0..1 are fractions of the frame."""
        if abs(v) <= 1.0:  # fraction of the frame
            return v * (BASE_W if axis == "x" else BASE_H) * self.k
        return v * self.k  # design-space pixels (1920x1080)

    def pt(self, xy):
        return self.px(xy[0], "x"), self.px(xy[1], "y")


def blit(frame, img, cx, cy, scale=1.0, opacity=1.0, angle=0.0):
    """Alpha-composite an RGBA PIL image centred at (cx, cy) onto a numpy RGB frame."""
    if opacity <= 0.003 or scale <= 0.01:
        return
    if angle:
        img = img.rotate(angle, resample=Image.BICUBIC, expand=True)
    if abs(scale - 1) > 1e-3:
        w = max(1, int(img.width * scale))
        h = max(1, int(img.height * scale))
        img = img.resize((w, h), Image.BILINEAR)
    x0 = int(round(cx - img.width / 2))
    y0 = int(round(cy - img.height / 2))
    paste(frame, img, x0, y0, opacity)


def paste(frame, img, x0, y0, opacity=1.0):
    H, W = frame.shape[:2]
    x1, y1 = x0 + img.width, y0 + img.height
    sx0, sy0 = max(0, -x0), max(0, -y0)
    dx0, dy0 = max(0, x0), max(0, y0)
    dx1, dy1 = min(W, x1), min(H, y1)
    if dx1 <= dx0 or dy1 <= dy0:
        return
    src = np.asarray(img, dtype=np.float32)[sy0:sy0 + (dy1 - dy0), sx0:sx0 + (dx1 - dx0)]
    a = src[..., 3:4] * (opacity / 255.0)
    region = frame[dy0:dy1, dx0:dx1].astype(np.float32)
    frame[dy0:dy1, dx0:dx1] = (src[..., :3] * a + region * (1 - a)).astype(np.uint8)


def soft_shadow(img, offset=(5, 7), blur=7, alpha=0.45):
    """Return img with a soft dark drop shadow beneath it (canvas grows to fit)."""
    pad = blur * 3 + max(abs(offset[0]), abs(offset[1]))
    out = Image.new("RGBA", (img.width + pad * 2, img.height + pad * 2), (0, 0, 0, 0))
    sh = Image.new("RGBA", img.size, (20, 10, 5, 0))
    sh.putalpha(img.getchannel("A").point(lambda v: int(v * alpha)))
    out.alpha_composite(sh, (pad + offset[0], pad + offset[1]))
    out = out.filter(ImageFilter.GaussianBlur(blur))
    out.alpha_composite(img, (pad, pad))
    return out


def text_image(text, size, fill, weight="extrabold", stroke=0, stroke_fill=None):
    f = font(weight, size)
    l, t, r, b = f.getbbox(text, stroke_width=stroke)
    img = Image.new("RGBA", (r - l + 4, b - t + 4), (0, 0, 0, 0))
    ImageDraw.Draw(img).text((2 - l, 2 - t), text, font=f, fill=fill, stroke_width=stroke, stroke_fill=stroke_fill)
    return img


def tile(w, h, fill, k, radius=14, outline=6, shadow=12, content=None):
    """Amber tile with black outline and hard offset shadow (number boxes, tags)."""
    o, s, r = max(1, int(outline * k)), int(shadow * k), int(radius * k)
    img = Image.new("RGBA", (int(w) + s + o * 2, int(h) + s + o * 2), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    ink = color("ink")
    d.rounded_rectangle((o + s, o + s, o + s + w, o + s + h), r, fill=ink)
    d.rounded_rectangle((o, o, o + w, o + h), r, fill=color(fill), outline=ink, width=o)
    if content is not None:
        layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
        layer.paste(content, (int(o + (w - content.width) / 2), int(o + (h - content.height) / 2)))
        img = Image.alpha_composite(img, layer)
    return img


# ----------------------------------------------------------- animation

class Anim:
    """Entrance/exit envelope shared by all overlays."""

    def __init__(self, spec, shot_end):
        self.t0 = spec.get("at", spec.get("start", 0))
        self.t1 = spec.get("until", shot_end)
        self.kind = spec.get("in", "pop")
        self.dur = spec.get("in_dur", {"pop": 0.28, "fade": 0.3, "rise": 0.35, "wipe_up": 0.45,
                                        "wipe_right": 0.45, "none": 0.0}.get(self.kind, 0.3))
        self.out = spec.get("out", "cut")
        self.out_dur = spec.get("out_dur", 0.2)

    def active(self, t):
        return self.t0 <= t < self.t1

    def state(self, t):
        """-> (scale, opacity, dy, reveal) for time t."""
        p = clamp01((t - self.t0) / self.dur) if self.dur else 1.0
        scale, op, dy, reveal = 1.0, 1.0, 0.0, 1.0
        if self.kind == "pop":
            scale = ease_out_back(p)
            op = clamp01(p * 3)
        elif self.kind == "fade":
            scale = 0.92 + 0.08 * ease_out_cubic(p)
            op = ease_out_cubic(p)
        elif self.kind == "rise":
            dy = 40 * (1 - ease_out_cubic(p))
            op = ease_out_cubic(p)
        elif self.kind.startswith("wipe"):
            reveal = ease_in_out(p)
        if self.out == "fade" and t > self.t1 - self.out_dur:
            op *= clamp01((self.t1 - t) / self.out_dur)
        elif self.out == "pop" and t > self.t1 - self.out_dur:
            q = clamp01((self.t1 - t) / self.out_dur)
            scale *= q
            op *= q
        return scale, op, dy, reveal


# --------------------------------------------------------------- overlays

class Overlay:
    def __init__(self, spec, ctx, shot_end):
        self.s = spec
        self.ctx = ctx
        self.anim = Anim(spec, shot_end)
        self.k = ctx.k

    def active(self, t):
        return self.anim.active(t)

    def pos(self, key="pos", default=(0.5, 0.5)):
        return self.ctx.pt(self.s.get(key, default))


class Text(Overlay):
    """Big orange word/phrase: BIGGEST, MISTAKE 1, THE TOP."""

    def __init__(self, spec, ctx, shot_end):
        spec.setdefault("in", "fade")
        super().__init__(spec, ctx, shot_end)
        k = self.k
        img = text_image(spec["text"], spec.get("size", 110) * k, color(spec.get("color", "orange")),
                         spec.get("weight", "extrabold"))
        self.img = soft_shadow(img, (int(4 * k) or 1, int(6 * k) or 1), max(1, int(6 * k)), 0.35) if spec.get("shadow", True) else img

    def draw(self, frame, t):
        sc, op, dy, _ = self.anim.state(t)
        x, y = self.pos()
        blit(frame, self.img, x, y + dy * self.k, sc, op)


class Tag(Overlay):
    """Amber pill label with white text: WIDE, HEAVY, 1 STUDY."""

    def __init__(self, spec, ctx, shot_end):
        super().__init__(spec, ctx, shot_end)
        k = self.k
        size = spec.get("size", 52)
        raw = text_image(spec["text"], size * k, color(spec.get("text_color", "white")))
        txt = soft_shadow(raw, (int(2 * k), int(3 * k)), max(1, int(3 * k)), 0.35)
        pad_x, pad_y = spec.get("pad", [26, 10])
        w = raw.width + 2 * pad_x * k
        h = size * 0.95 * k + 2 * pad_y * k
        self.img = tile(w, h, spec.get("fill", "amber"), k, radius=8, outline=5, shadow=7, content=txt)

    def draw(self, frame, t):
        sc, op, dy, _ = self.anim.state(t)
        x, y = self.pos()
        blit(frame, self.img, x, y + dy * self.k, sc, op, self.s.get("angle", 0))


class Numbers(Overlay):
    """Row of numbered amber tiles that pop in one after another (the "5 mistakes" beat)."""

    def __init__(self, spec, ctx, shot_end):
        super().__init__(spec, ctx, shot_end)
        k = self.k
        self.n = spec.get("count", 5)
        box = spec.get("box", 170)
        gap = spec.get("gap", 95)
        rnd = random.Random(spec.get("seed", 7))
        self.tiles, self.hi_tiles, self.offsets = [], [], []
        labels = spec.get("labels") or [str(i + 1) for i in range(self.n)]
        for i, lab in enumerate(labels):
            num = soft_shadow(text_image(lab, box * 0.62 * k, color("white")), (int(3 * k), int(4 * k)), max(1, int(4 * k)), 0.35)
            jitter = spec.get("jitter", True)
            w = box * (1 + (rnd.uniform(-0.06, 0.08) if jitter else 0)) * k
            h = box * 0.9 * (1 + (rnd.uniform(-0.04, 0.06) if jitter else 0)) * k
            self.tiles.append(tile(w, h, spec.get("fill", "amber"), k, content=num))
            self.hi_tiles.append(tile(w, h, spec.get("highlight_fill", "orange"), k, content=num))
            self.offsets.append(((rnd.uniform(-6, 6) if jitter else 0) * k, (rnd.uniform(-10, 10) if jitter else 0) * k))
        self.pitch = (box + gap) * k
        self.stagger = spec.get("stagger", 0.13)
        self.hi = spec.get("highlight")  # {"index": 4, "at": 27.5, "scale": 1.3, "focus": false}

    def draw(self, frame, t):
        cx, cy = self.pos()
        x0 = cx - self.pitch * (self.n - 1) / 2
        _, op_all, _, _ = self.anim.state(t)
        for i in range(self.n):
            ti = self.anim.t0 + i * self.stagger
            if t < ti:
                continue
            p = clamp01((t - ti) / 0.25)
            sc, op = ease_out_back(p), clamp01(p * 3) * op_all
            img = self.tiles[i]
            x, y = x0 + i * self.pitch + self.offsets[i][0], cy + self.offsets[i][1]
            if self.hi and t >= self.hi["at"]:
                q = ease_out_back(clamp01((t - self.hi["at"]) / 0.3))
                if i == self.hi["index"]:
                    img = self.hi_tiles[i]
                    sc *= 1 + (self.hi.get("scale", 1.3) - 1) * q
                    if self.hi.get("focus"):
                        x += (cx - x) * ease_in_out((t - self.hi["at"]) / 0.5)
                elif self.hi.get("focus"):
                    sc *= 1 - ease_out_cubic((t - self.hi["at"]) / 0.35)
            # tiny idle wobble keeps the tiles alive, like the reference
            wob = math.sin(t * 5.5 + i * 1.7) * 1.2
            blit(frame, img, x, y + wob * self.k, sc, op)


class Bars(Overlay):
    """Bar chart that grows bar by bar, with optional dashed 'ghost' target."""

    def __init__(self, spec, ctx, shot_end):
        spec.setdefault("in", "none")
        super().__init__(spec, ctx, shot_end)
        k = self.k
        self.bars = spec["bars"]
        self.W = spec.get("width", 760) * k
        self.Hmax = spec.get("height", 420) * k
        self.bw = spec.get("bar_width", 150) * k
        self.grow = spec.get("grow", 0.45)
        self.labels = [text_image(b["label"], spec.get("label_size", 30) * k, color("ink")) for b in self.bars]
        self.ghost = spec.get("ghost")  # {"index": 2, "value": 0.5, "at": 12.5}

    def bar_img(self, w, h, fill):
        k = self.k
        o = max(1, int(6 * k))
        img = Image.new("RGBA", (int(w) + 2 * o, int(h) + 2 * o), (0, 0, 0, 0))
        if h < 2:
            return img
        d = ImageDraw.Draw(img)
        r = int(min(22 * k, h / 2))
        d.rounded_rectangle((o, o, o + w, o + h + r), r, fill=color(fill), outline=color("ink"), width=o)
        # glossy stripe
        sx = o + w * 0.13
        if h > 30 * k:
            d.rounded_rectangle((sx, o + 14 * k, sx + 9 * k, o + h - 10 * k), int(5 * k), fill=(255, 255, 255, 80))
        return img.crop((0, 0, img.width, int(h) + 2 * o))

    def draw(self, frame, t):
        k = self.k
        cx, base_y = self.pos("pos", (0.5, 0.72))
        n = len(self.bars)
        pitch = self.W / n
        x_left = cx - self.W / 2
        # baseline
        bl = Image.new("RGBA", (int(self.W + 40 * k), max(2, int(6 * k))), color("ink"))
        paste(frame, bl, int(x_left - 20 * k), int(base_y))
        for i, b in enumerate(self.bars):
            bx = x_left + pitch * (i + 0.5)
            lab = self.labels[i]
            paste(frame, lab, int(bx - lab.width / 2), int(base_y + 22 * k))
            t_b = b.get("at", self.anim.t0 + i * 0.6)
            if t < t_b:
                continue
            h = self.Hmax * b["value"] * ease_out_cubic((t - t_b) / self.grow)
            img = self.bar_img(self.bw, h, b.get("color", "gray"))
            paste(frame, img, int(bx - img.width / 2), int(base_y - h - int(6 * k) + max(1, int(3 * k))))
        g = self.ghost
        if g and t >= g["at"]:
            bx = x_left + pitch * (g["index"] + 0.5)
            h = self.Hmax * g["value"]
            cur = self.Hmax * self.bars[g["index"]]["value"]
            op = clamp01((t - g["at"]) / 0.25)
            img = Image.new("RGBA", (int(self.bw + 8 * k), int(h - cur + 8 * k)), (0, 0, 0, 0))
            dashed_rect(ImageDraw.Draw(img), (4 * k, 4 * k, img.width - 4 * k, img.height - 4 * k), color("orange"), max(1, int(5 * k)), 22 * k, 12 * k)
            paste(frame, img, int(bx - img.width / 2), int(base_y - h - 4 * k), op)


def dashed_line(d, p0, p1, fill, width, dash, gap):
    x0, y0 = p0
    x1, y1 = p1
    L = math.hypot(x1 - x0, y1 - y0)
    if L < 1:
        return
    ux, uy = (x1 - x0) / L, (y1 - y0) / L
    s = 0.0
    while s < L:
        e = min(L, s + dash)
        d.line((x0 + ux * s, y0 + uy * s, x0 + ux * e, y0 + uy * e), fill=fill, width=int(width))
        s += dash + gap


def dashed_rect(d, box, fill, width, dash, gap):
    x0, y0, x1, y1 = box
    for a, b in (((x0, y0), (x1, y0)), ((x1, y0), (x1, y1)), ((x1, y1), (x0, y1)), ((x0, y1), (x0, y0))):
        dashed_line(d, a, b, fill, width, dash, gap)


class Icon(Overlay):
    """Red X or green check with black outline."""

    def __init__(self, spec, ctx, shot_end):
        super().__init__(spec, ctx, shot_end)
        k = self.k
        size = spec.get("size", 90) * k
        kind = spec.get("kind", "x")
        img = Image.new("RGBA", (int(size * 1.3), int(size * 1.3)), (0, 0, 0, 0))
        d = ImageDraw.Draw(img)
        m = size * 0.15
        lw = size * 0.2
        if kind == "x":
            segs = [((m, m), (size - m, size - m)), ((size - m, m), (m, size - m))]
            fill = color(spec.get("color", "red"))
        else:
            segs = [((m, size * 0.55), (size * 0.4, size - m * 1.3)), ((size * 0.4, size - m * 1.3), (size - m, m * 1.2))]
            fill = color(spec.get("color", "green"))
        off = size * 0.15
        for pts in segs:  # black outline pass then colour pass
            d.line([(x + off, y + off) for x, y in pts], fill=color("ink"), width=int(lw + 9 * k), joint="curve")
        for pts in segs:
            for x, y in pts:
                r = (lw + 9 * k) / 2
                d.ellipse((x + off - r, y + off - r, x + off + r, y + off + r), fill=color("ink"))
        for pts in segs:
            d.line([(x + off, y + off) for x, y in pts], fill=fill, width=int(lw), joint="curve")
            for x, y in pts:
                r = lw / 2
                d.ellipse((x + off - r, y + off - r, x + off + r, y + off + r), fill=fill)
        self.img = img

    def draw(self, frame, t):
        sc, op, dy, _ = self.anim.state(t)
        x, y = self.pos()
        blit(frame, self.img, x, y + dy * self.k, sc, op)


class Arrow(Overlay):
    """Orange arrow with black outline; grows from tail to head, optional double head."""

    def __init__(self, spec, ctx, shot_end):
        spec.setdefault("in", "grow")
        super().__init__(spec, ctx, shot_end)
        self.p0 = ctx.pt(spec["from"])
        self.p1 = ctx.pt(spec["to"])
        self.dur = spec.get("in_dur", 0.3)

    def draw(self, frame, t):
        k = self.k
        p = ease_out_cubic((t - self.anim.t0) / self.dur) if self.s["in"] == "grow" else 1.0
        x0, y0 = self.p0
        x1, y1 = self.p0[0] + (self.p1[0] - x0) * p, self.p0[1] + (self.p1[1] - y0) * p
        L = math.hypot(x1 - x0, y1 - y0)
        if L < 2:
            return
        w = self.s.get("width", 16) * k
        head = self.s.get("head", 40) * k
        o = max(1, 5 * k)
        pad = int(head + 2 * o + 4)
        minx, miny = int(min(x0, x1)) - pad, int(min(y0, y1)) - pad
        img = Image.new("RGBA", (int(abs(x1 - x0)) + 2 * pad, int(abs(y1 - y0)) + 2 * pad), (0, 0, 0, 0))
        d = ImageDraw.Draw(img)
        ux, uy = (x1 - x0) / L, (y1 - y0) / L
        nx, ny = -uy, ux
        a, b = (x0 - minx, y0 - miny), (x1 - minx, y1 - miny)

        def heads(p, sgn):
            tip = p
            base = (p[0] - sgn * ux * head, p[1] - sgn * uy * head)
            return [tip, (base[0] + nx * head * 0.6, base[1] + ny * head * 0.6), (base[0] - nx * head * 0.6, base[1] - ny * head * 0.6)]

        dbl = self.s.get("double", False)
        sa = (a[0] + ux * head * 0.8, a[1] + uy * head * 0.8) if dbl else a
        sb = (b[0] - ux * head * 0.8, b[1] - uy * head * 0.8)
        fill = color(self.s.get("color", "orange"))
        for c, extra in ((color("ink"), 2 * o), (fill, 0)):
            d.line((sa, sb), fill=c, width=int(w + extra))
            d.polygon(heads(b, 1), fill=c, outline=c, width=int(extra) if extra else 0)
            if dbl:
                d.polygon(heads(a, -1), fill=c, outline=c, width=int(extra) if extra else 0)
        paste(frame, img, minx, miny, self.anim.state(t)[1] if self.s["in"] != "grow" else 1.0)


class Dashed(Overlay):
    """Orange dashed guide line that draws on (shoulder-height line)."""

    def __init__(self, spec, ctx, shot_end):
        spec.setdefault("in", "grow")
        super().__init__(spec, ctx, shot_end)
        self.p0 = ctx.pt(spec["from"])
        self.p1 = ctx.pt(spec["to"])

    def draw(self, frame, t):
        k = self.k
        p = ease_out_cubic((t - self.anim.t0) / self.s.get("in_dur", 0.5)) if self.s["in"] == "grow" else 1.0
        x0, y0 = self.p0
        x1, y1 = x0 + (self.p1[0] - x0) * p, y0 + (self.p1[1] - y0) * p
        w = self.s.get("width", 8) * k
        pad = int(w * 2)
        minx, miny = int(min(x0, x1)) - pad, int(min(y0, y1)) - pad
        img = Image.new("RGBA", (int(abs(x1 - x0)) + 2 * pad, int(abs(y1 - y0)) + 2 * pad), (0, 0, 0, 0))
        d = ImageDraw.Draw(img)
        dashed_line(d, (x0 - minx, y0 - miny), (x1 - minx, y1 - miny), color(self.s.get("color", "orange")), w,
                    self.s.get("dash", 26) * k, self.s.get("gap", 14) * k)
        paste(frame, img, minx, miny)


class Callout(Overlay):
    """Circular magnifier: zooms a region of the live base frame into an orange ring."""

    def __init__(self, spec, ctx, shot_end):
        super().__init__(spec, ctx, shot_end)
        k = self.k
        self.r = spec.get("radius", 150) * k
        sx, sy = ctx.pt(spec["source"][:2])
        self.src = (sx, sy, spec["source"][2] * k)
        self.ring = spec.get("ring", 9) * k
        R = int(self.r + self.ring)
        mask = Image.new("L", (2 * R, 2 * R), 0)
        ImageDraw.Draw(mask).ellipse((self.ring, self.ring, 2 * R - self.ring, 2 * R - self.ring), 255)
        self.mask = mask
        ring = Image.new("RGBA", (2 * R, 2 * R), (0, 0, 0, 0))
        ImageDraw.Draw(ring).ellipse((self.ring / 2, self.ring / 2, 2 * R - self.ring / 2, 2 * R - self.ring / 2),
                                     outline=color(spec.get("color", "orange")), width=int(self.ring))
        self.ring_img = ring

    def draw(self, frame, t):
        sc, op, _, _ = self.anim.state(t)
        base = self.ctx.base if self.ctx.base is not None else frame
        sx, sy, sr = self.src
        H, W = base.shape[:2]
        x0, y0 = int(max(0, sx - sr)), int(max(0, sy - sr))
        x1, y1 = int(min(W, sx + sr)), int(min(H, sy + sr))
        crop = Image.fromarray(base[y0:y1, x0:x1])
        R = self.mask.width
        crop = crop.resize((R, R), Image.BILINEAR)
        disc = Image.new("RGBA", (R, R), (0, 0, 0, 0))
        disc.paste(crop, (0, 0), self.mask)
        disc.alpha_composite(self.ring_img)
        x, y = self.pos()
        blit(frame, disc, x, y, sc, op)


class Week(Overlay):
    """M T W T F S S checkbox row; selected days tick on at given times."""

    def __init__(self, spec, ctx, shot_end):
        spec.setdefault("in", "fade")
        super().__init__(spec, ctx, shot_end)
        k = self.k
        self.box = spec.get("box", 82) * k
        self.gap = spec.get("gap", 20) * k
        self.days = spec.get("days", "MTWTFSS")
        self.hl = set(spec.get("highlight", []))
        self.checks = spec.get("checks", [])  # [{"day": 1, "at": 1.4}]

    def draw(self, frame, t):
        k = self.k
        _, op, _, _ = self.anim.state(t)
        cx, cy = self.pos()
        n = len(self.days)
        tw = n * self.box + (n - 1) * self.gap
        img = Image.new("RGBA", (int(tw + 20 * k), int(self.box * 1.9)), (0, 0, 0, 0))
        d = ImageDraw.Draw(img)
        f = font("bold", 30 * k)
        checked = {c["day"]: c["at"] for c in self.checks}
        for i, ch in enumerate(self.days):
            x = 10 * k + i * (self.box + self.gap)
            d.text((x + self.box / 2, 16 * k), ch, font=f, anchor="mm", fill=color("orange" if i in self.hl else "ink"))
            y = 40 * k
            if i in checked and t >= checked[i]:
                p = clamp01((t - checked[i]) / 0.2)
                d.rounded_rectangle((x, y, x + self.box, y + self.box), int(10 * k), fill=color("orange", int(255 * p)),
                                    outline=color("ink"), width=max(1, int(3 * k)))
                if p > 0.5:
                    m = self.box * 0.25
                    d.line(((x + m, y + self.box * 0.52), (x + self.box * 0.43, y + self.box - m), (x + self.box - m, y + m)),
                           fill=color("white"), width=max(1, int(6 * k)), joint="curve")
            else:
                d.rounded_rectangle((x, y, x + self.box, y + self.box), int(10 * k), fill=color("white", 230),
                                    outline=(200, 190, 175, 255), width=max(1, int(3 * k)))
        blit(frame, img, cx, cy, 1.0, op)


class ImageOverlay(Overlay):
    """Any PNG/JPG (icon, inset picture, highlighted-muscle variant for a wipe reveal)."""

    def __init__(self, spec, ctx, shot_end, root):
        super().__init__(spec, ctx, shot_end)
        k = self.k
        img = Image.open(os.path.join(root, spec["src"])).convert("RGBA")
        if "width" in spec:
            w = spec["width"] * k
            img = img.resize((int(w), int(img.height * w / img.width)), Image.LANCZOS)
        elif "height" in spec:
            h = spec["height"] * k
            img = img.resize((int(img.width * h / img.height), int(h)), Image.LANCZOS)
        else:
            img = img.resize((max(1, int(img.width * k * spec.get("scale", 1))), max(1, int(img.height * k * spec.get("scale", 1)))), Image.LANCZOS)
        if spec.get("border"):
            bw = int(spec.get("border_width", 8) * k)
            r = int(spec.get("radius", 18) * k)
            m = Image.new("L", img.size, 0)
            ImageDraw.Draw(m).rounded_rectangle((0, 0, img.width - 1, img.height - 1), r, 255)
            img.putalpha(m)
            framed = tile(img.width, img.height, "white", k, radius=spec.get("radius", 18), outline=0, shadow=10)
            framed.alpha_composite(img, (0, 0))
            ImageDraw.Draw(framed).rounded_rectangle((0, 0, img.width - 1, img.height - 1), r, outline=color(spec["border"]), width=bw)
            img = framed
        self.img = img

    def draw(self, frame, t):
        sc, op, dy, reveal = self.anim.state(t)
        x, y = self.pos()
        img = self.img
        if self.anim.kind.startswith("wipe") and reveal < 1:
            m = Image.new("L", img.size, 0)
            if self.anim.kind == "wipe_up":
                ImageDraw.Draw(m).rectangle((0, img.height * (1 - reveal), img.width, img.height), 255)
            else:
                ImageDraw.Draw(m).rectangle((0, 0, img.width * reveal, img.height), 255)
            img = img.copy()
            img.putalpha(Image.fromarray(np.minimum(np.asarray(img.getchannel("A")), np.asarray(m))))
        blit(frame, img, x, y + dy * self.k, sc, op, self.s.get("angle", 0))


OVERLAYS = {
    "text": Text, "tag": Tag, "numbers": Numbers, "bars": Bars, "icon": Icon,
    "arrow": Arrow, "dashed": Dashed, "callout": Callout, "week": Week, "image": ImageOverlay,
}


# ------------------------------------------------------------------ shots

class Shot:
    def __init__(self, spec, ctx, root, bg):
        self.s = spec
        self.ctx = ctx
        self.root = root
        self.t0, self.t1 = spec["start"], spec["end"]
        self.bg = np.array(color(spec.get("bg", bg))[:3], dtype=np.uint8)
        self.overlays = []
        for o in spec.get("overlays", []):
            cls = OVERLAYS[o["type"]]
            o = dict(o)
            o.setdefault("at", self.t0)
            ov = cls(o, ctx, self.t1, root) if cls is ImageOverlay else cls(o, ctx, self.t1)
            self.overlays.append(ov)
        self.asset = spec.get("asset")
        self.src_frames = None
        self.still = None

    def _asset_path(self):
        return os.path.join(self.root, self.asset)

    def open(self, t_from):
        """Prepare the base layer for rendering starting at absolute time t_from."""
        if not self.asset:
            return
        p = self._asset_path()
        if not os.path.exists(p):
            sys.exit(f"missing asset: {self.asset} (shot {self.s.get('id', self.t0)})")
        if p.lower().endswith((".png", ".jpg", ".jpeg", ".webp")):
            self.still = Image.open(p).convert("RGB")
            return
        speed = self.s.get("speed", 1.0)
        dur = self.t1 - self.t0
        if self.s.get("fit_speed"):
            src_dur = float(subprocess.check_output(
                ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", p]).strip())
            speed = max(0.25, (src_dur - self.s.get("trim", 0)) / dur)
        ss = self.s.get("trim", 0) + (t_from - self.t0) * speed
        cw, ch = self.ctx.W, self.ctx.H
        vf = f"setpts=PTS/{speed},fps={self.ctx.fps},scale={cw}:{ch}:force_original_aspect_ratio=decrease:flags=lanczos"
        cmd = ["ffmpeg", "-v", "error", "-ss", f"{ss:.3f}", "-i", p, "-an", "-vf", vf, "-f", "rawvideo", "-pix_fmt", "rgb24", "-"]
        self.proc = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL)
        probe = subprocess.check_output(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries",
                                         "stream=width,height", "-of", "csv=p=0", p]).decode().strip().split(",")
        sw, sh = int(probe[0]), int(probe[1])
        r = min(cw / sw, ch / sh)
        self.vw, self.vh = min(cw, round(sw * r)), min(ch, round(sh * r))
        self.last = None

    def _next_video_frame(self):
        n = self.vw * self.vh * 3
        buf = self.proc.stdout.read(n)
        if len(buf) == n:
            self.last = np.frombuffer(buf, np.uint8).reshape(self.vh, self.vw, 3)
        return self.last

    def close(self):
        if getattr(self, "proc", None):
            self.proc.stdout.close()
            self.proc.kill()
            self.proc = None

    def base(self, t):
        cw, ch = self.ctx.W, self.ctx.H
        frame = np.empty((ch, cw, 3), np.uint8)
        frame[:] = self.bg
        src = None
        if self.still is not None:
            src = self.still
        elif self.asset:
            arr = self._next_video_frame()
            if arr is not None:
                src = Image.fromarray(arr)
        if src is None:
            return frame
        # placement: contain-fit, then user scale/pos, then slow push-in
        r = min(cw / src.width, ch / src.height)
        p = clamp01((t - self.t0) / max(1e-6, self.t1 - self.t0))
        push = self.s.get("push", [1.0, 1.0])
        z = self.s.get("scale", 1.0) * (push[0] + (push[1] - push[0]) * ease_in_out(p))
        w, h = int(src.width * r * z), int(src.height * r * z)
        if (w, h) != src.size:
            src = src.resize((w, h), Image.BILINEAR)
        cx, cy = self.ctx.pt(self.s.get("pos", [0.5, 0.5]))
        focus = self.s.get("focus")  # push towards a point: [x, y] in frame fractions
        if focus and z != 1:
            fx, fy = self.ctx.pt(focus)
            cx += (cx - fx) * (z - 1)
            cy += (cy - fy) * (z - 1)
        x0, y0 = int(cx - w / 2), int(cy - h / 2)
        sx0, sy0, dx0, dy0 = max(0, -x0), max(0, -y0), max(0, x0), max(0, y0)
        dx1, dy1 = min(cw, x0 + w), min(ch, y0 + h)
        if dx1 > dx0 and dy1 > dy0:
            frame[dy0:dy1, dx0:dx1] = np.asarray(src)[sy0:sy0 + dy1 - dy0, sx0:sx0 + dx1 - dx0]
        return frame


# ---------------------------------------------------------------- render

def load_timeline(path):
    with open(path) as f:
        tl = json.load(f)
    tl["_root"] = os.path.dirname(os.path.abspath(path))
    shots = sorted(tl["shots"], key=lambda s: s["start"])
    for a, b in zip(shots, shots[1:]):
        if "end" not in a:
            a["end"] = b["start"]
    if "end" not in shots[-1]:
        shots[-1]["end"] = tl.get("duration", shots[-1]["start"] + 3)
    tl["shots"] = shots
    tl.setdefault("duration", shots[-1]["end"])
    return tl


def frame_at(tl, ctx, t, shots_cache):
    shot_spec = next((s for s in tl["shots"] if s["start"] <= t < s["end"]), tl["shots"][-1])
    key = id(shot_spec)
    if key not in shots_cache:
        for s in shots_cache.values():
            s.close()
        shots_cache.clear()
        sh = Shot(shot_spec, ctx, tl["_root"], tl.get("bg", "cream"))
        sh.open(t)
        shots_cache[key] = sh
    sh = shots_cache[key]
    frame = sh.base(t)
    ctx.base = frame.copy()
    for ov in sh.overlays:
        if ov.active(t):
            ov.draw(frame, t)
    return frame


def render_video(tl, ctx, t_start, t_end, out_video):
    n = int(round((t_end - t_start) * ctx.fps))
    enc = subprocess.Popen(
        ["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{ctx.W}x{ctx.H}",
         "-r", str(ctx.fps), "-i", "-", "-c:v", "libx264", "-preset", "medium" if ctx.k >= 1 else "veryfast",
         "-crf", "18", "-pix_fmt", "yuv420p", out_video], stdin=subprocess.PIPE)
    cache = {}
    for i in range(n):
        t = t_start + i / ctx.fps
        enc.stdin.write(frame_at(tl, ctx, t, cache).tobytes())
        if i % (ctx.fps * 5) == 0:
            print(f"  {t:7.2f}s / {t_end:.2f}s", file=sys.stderr, flush=True)
    for s in cache.values():
        s.close()
    enc.stdin.close()
    enc.wait()


def mix_audio(tl, t_start, t_end, out_audio):
    """Voice + optional music bed + optional SFX, loudness-normalised to -14 LUFS."""
    root = tl["_root"]
    inputs, filters, labels = [], [], []
    dur = t_end - t_start
    v = tl.get("voice")
    if v:
        inputs += ["-ss", f"{t_start:.3f}", "-t", f"{dur:.3f}", "-i", os.path.join(root, v)]
        filters.append(f"[{len(labels)}:a]aresample=48000,highpass=f=70,acompressor=threshold=-20dB:ratio=3:attack=5:release=80[v]")
        labels.append("v")
    m = tl.get("music")
    if m:
        idx = len(labels)
        inputs += ["-stream_loop", "-1", "-i", os.path.join(root, m["src"])]
        fade_out = max(0, dur - m.get("fade_out", 2.0))
        filters.append(f"[{idx}:a]aresample=48000,atrim=0:{dur:.3f},volume={m.get('gain_db', -17)}dB,"
                       f"afade=t=in:d={m.get('fade_in', 1.0)},afade=t=out:st={fade_out:.3f}:d={m.get('fade_out', 2.0)}[m]")
        labels.append("m")
    for j, fx in enumerate(tl.get("sfx", [])):
        if not (t_start <= fx["at"] < t_end):
            continue
        idx = len(labels)
        inputs += ["-i", os.path.join(root, fx["src"])]
        ms = int((fx["at"] - t_start) * 1000)
        filters.append(f"[{idx}:a]aresample=48000,volume={fx.get('gain_db', -10)}dB,adelay={ms}|{ms}[s{j}]")
        labels.append(f"s{j}")
    if not labels:
        return None
    mix = "".join(f"[{l}]" for l in labels)
    filters.append(f"{mix}amix=inputs={len(labels)}:normalize=0:duration=longest,atrim=0:{dur:.3f},"
                   f"loudnorm=I=-14:TP=-1.5:LRA=11[out]")
    subprocess.run(["ffmpeg", "-v", "error", "-y", *inputs, "-filter_complex", ";".join(filters), "-map", "[out]",
                    "-c:a", "aac", "-b:a", "192k", "-ar", "48000", out_audio], check=True)
    return out_audio


def contact_sheet(tl, ctx, t0, t1, step, out):
    times = []
    t = t0
    while t < t1:
        times.append(t)
        t += step
    cols = 4
    tw = 480
    th = int(tw * ctx.H / ctx.W)
    sheet = Image.new("RGB", (cols * tw, math.ceil(len(times) / cols) * th), "black")
    d = ImageDraw.Draw(sheet)
    for i, t in enumerate(times):
        cache = {}
        img = Image.fromarray(frame_at(tl, ctx, t, cache)).resize((tw, th), Image.BILINEAR)
        for s in cache.values():
            s.close()
        x, y = (i % cols) * tw, (i // cols) * th
        sheet.paste(img, (x, y))
        d.rectangle((x, y, x + 74, y + 22), fill="black")
        d.text((x + 4, y + 3), f"{t:6.2f}", fill="yellow", font=font("bold", 16))
    sheet.save(out)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("timeline")
    ap.add_argument("-o", "--out", required=True)
    ap.add_argument("--draft", action="store_true", help="960x540, fast encode")
    ap.add_argument("--start", type=float)
    ap.add_argument("--end", type=float)
    ap.add_argument("--frame", type=float, help="render one frame at this time to a PNG")
    ap.add_argument("--sheet", help="t0:t1:step contact sheet PNG for QA")
    ap.add_argument("--no-audio", action="store_true")
    a = ap.parse_args()

    tl = load_timeline(a.timeline)
    ctx = Ctx(0.5 if a.draft else tl.get("scale", 1.0), tl.get("fps", 30))

    if a.frame is not None:
        cache = {}
        Image.fromarray(frame_at(tl, ctx, a.frame, cache)).save(a.out)
        for s in cache.values():
            s.close()
        return
    if a.sheet:
        t0, t1, step = (float(x) for x in a.sheet.split(":"))
        contact_sheet(tl, ctx, t0, t1, step, a.out)
        return

    t_start = a.start if a.start is not None else 0.0
    t_end = a.end if a.end is not None else tl["duration"]
    tmp = tempfile.mkdtemp(prefix="hv_")
    try:
        vid = os.path.join(tmp, "video.mp4")
        render_video(tl, ctx, t_start, t_end, vid)
        aud = None if a.no_audio else mix_audio(tl, t_start, t_end, os.path.join(tmp, "audio.m4a"))
        if aud:
            subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", vid, "-i", aud, "-c:v", "copy", "-c:a", "copy",
                            "-shortest", "-movflags", "+faststart", a.out], check=True)
        else:
            shutil.copy(vid, a.out)
    finally:
        shutil.rmtree(tmp, ignore_errors=True)
    print(f"wrote {a.out}", file=sys.stderr)


if __name__ == "__main__":
    main()
