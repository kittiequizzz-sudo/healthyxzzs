"""Cut-out puppet animation of a detailed character illustration.

The detailed house-style illustration (AI-generated, same look as the reference videos) is cut into
pieces - deltoid caps, arms, fists, dumbbells, forearms… - each with a pivot at its joint. Pieces are
re-assembled every frame with joint angles from the motion library (motion.py), so the character
keeps its full illustrated detail while the movement is biomechanically correct and smooth.

A rig file (JSON, coordinates in source-image pixels) describes how to cut the image:

{
  "image": "char_front.png",          # the illustration, flat cream background
  "red_image": "char_front_red.png",  # optional pixel-aligned copy with muscles red (highlights)
  "recolor_red": true,                # or: derive the neutral image by turning red pixels blue
  "pieces": [
    {"name": "arm_l",  "poly": [[x,y],...], "pivot": [850,300], "z": 2, "angle": "arm_l"},
    {"name": "delt_l", "poly": [...], "select": "red", "pivot": [850,300], "z": 3,
     "angle": "arm_l", "factor": 0.55},
    {"name": "db_l",   "poly": [...], "select": "dark", "parent": "arm_l", "pivot": [815,640], "z": 4,
     "counter": 1.0},
    {"name": "fist_l", "poly": [...], "parent": "arm_l", "pivot": [815,640], "z": 5}
  ],
  "fill": [[[x,y],...]],              # holes behind moved pieces to inpaint on the base layer
  "rest": {"arm_l": 10, "arm_r": 10}, # joint angles (deg) of the drawn pose, in motion.py terms
  "sign": {"arm_l": -1, "arm_r": 1},  # screen rotation direction per joint
  "muscles": {"delts": ["delt_l", "delt_r"]}   # which pieces show red for each muscle
}

`angle` names a joint channel; a piece rotates by sign * (pose[channel] - rest[channel]) * factor
around its pivot, after its parent's transform. `counter` cancels that fraction of the parent's
rotation (keeps dumbbells level, like a neutral→pronated grip in a lateral raise).
"""
import json
import math
import os

import cairo
import cv2
import numpy as np


def _load_rgb(path):
    img = cv2.imread(path, cv2.IMREAD_COLOR)
    if img is None:
        raise FileNotFoundError(path)
    return img  # BGR


def _poly_mask(shape, poly):
    m = np.zeros(shape[:2], np.uint8)
    cv2.fillPoly(m, [np.array(poly, np.int32)], 255)
    return m


def _bg_mask(img, bg=(215, 236, 245), tol=26):
    """Pixels that belong to the cream background (BGR)."""
    d = np.abs(img.astype(np.int16) - np.array(bg, np.int16)).max(axis=2)
    return (d <= tol).astype(np.uint8) * 255


def _red_mask(img):
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    m1 = cv2.inRange(hsv, (0, 90, 70), (12, 255, 255))
    m2 = cv2.inRange(hsv, (168, 90, 70), (180, 255, 255))
    return cv2.bitwise_or(m1, m2)


def recolor_red_to_skin(img, skin_bgr=(228, 169, 88)):
    """Neutral version of an image whose muscles are painted red: keep shading, swap the hue."""
    red = _red_mask(img)
    red = cv2.dilate(red, np.ones((3, 3), np.uint8))
    out = img.copy()
    v = img.max(axis=2).astype(np.float32) / 255.0
    ref = max(1e-3, np.percentile(v[red > 0], 70)) if red.any() else 1.0
    k = np.clip(v / ref, 0.45, 1.15)[..., None]
    tint = (np.array(skin_bgr, np.float32)[None, None, :] * k).clip(0, 255).astype(np.uint8)
    out[red > 0] = tint[red > 0]
    return out


def _skin_mask(img):
    """Blue skin pixels (excludes outlines, shorts, dumbbells, eyes)."""
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    return cv2.inRange(hsv, (95, 70, 60), (125, 255, 255))


def recolor_skin_to_red(img, red_bgr=(46, 59, 226)):
    """Red version of blue skin, keeping the shading (lighter/darker blues → lighter/darker reds)."""
    v = img.max(axis=2).astype(np.float32) / 255.0
    sk = _skin_mask(img)
    ref = max(1e-3, np.percentile(v[sk > 0], 60)) if sk.any() else 1.0
    k = np.clip(v / ref, 0.45, 1.2)[..., None]
    return (np.array(red_bgr, np.float32)[None, None, :] * k).clip(0, 255).astype(np.uint8)


def _to_surface(bgr, alpha):
    """numpy BGR + alpha → premultiplied cairo ARGB32 surface."""
    h, w = alpha.shape
    a = alpha.astype(np.float32) / 255.0
    argb = np.zeros((h, w, 4), np.uint8)
    argb[..., 0] = (bgr[..., 0] * a).astype(np.uint8)
    argb[..., 1] = (bgr[..., 1] * a).astype(np.uint8)
    argb[..., 2] = (bgr[..., 2] * a).astype(np.uint8)
    argb[..., 3] = alpha
    surf = cairo.ImageSurface(cairo.FORMAT_ARGB32, w, h)
    buf = np.ndarray((h, surf.get_stride() // 4, 4), np.uint8, buffer=surf.get_data())
    buf[:, :w] = argb
    surf.mark_dirty()
    return surf


class Puppet:
    def __init__(self, rig_path):
        with open(rig_path) as f:
            self.rig = json.load(f)
        root = os.path.dirname(os.path.abspath(rig_path))
        R = self.rig
        src = _load_rgb(os.path.join(root, R["image"]))
        if R.get("red_image"):
            red = _load_rgb(os.path.join(root, R["red_image"]))
            neutral = src
        elif R.get("recolor_red"):
            red = src
            neutral = recolor_red_to_skin(src)
        else:
            red = neutral = src
        self.size = (src.shape[1], src.shape[0])
        bg = _bg_mask(neutral)
        fg = cv2.bitwise_not(bg)
        fg = cv2.morphologyEx(fg, cv2.MORPH_CLOSE, np.ones((3, 3), np.uint8))
        self.rest = R.get("rest", {})
        self.sign = R.get("sign", {})
        self.pieces = []
        taken = np.zeros(fg.shape, np.uint8)
        for p in sorted(R["pieces"], key=lambda p: p.get("z", 0)):
            if p.get("image"):
                # rig-kit piece: its own aligned image, nothing to cut and nothing hidden behind it
                img = _load_rgb(os.path.join(root, p["image"]))
                if p.get("crop"):  # part drawn elsewhere on a sheet
                    x0, y0, x1, y1 = p["crop"]
                    img = img[y0:y1, x0:x1]
                pfg = cv2.bitwise_not(_bg_mask(img))
                pfg = cv2.morphologyEx(pfg, cv2.MORPH_CLOSE, np.ones((3, 3), np.uint8))
                if p.get("poly"):
                    pfg = cv2.bitwise_and(pfg, _poly_mask(img.shape, p["poly"]))
                soft = cv2.GaussianBlur(pfg, (3, 3), 0)
                x, y, w, h = cv2.boundingRect(pfg)
                sl = (slice(max(0, y - 4), y + h + 4), slice(max(0, x - 4), x + w + 4))
                piece = dict(p)
                piece["origin"] = (max(0, x - 4), max(0, y - 4))
                if p.get("src_anchor"):
                    # place the part: its src_anchor (in the part image) lands on the pivot, scaled
                    ax, ay = p["src_anchor"]
                    k = p.get("scale", 1.0)
                    st = cairo.Matrix()
                    st.translate(*p["pivot"])
                    st.rotate(math.radians(p.get("rest_rotate", 0.0)))
                    st.scale(k, k)
                    st.translate(-ax, -ay)
                    piece["static"] = st
                red_img = _load_rgb(os.path.join(root, p["red_image"])) if p.get("red_image") else recolor_skin_to_red(img)
                piece["surf"] = _to_surface(img[sl], soft[sl])
                piece["surf_red"] = _to_surface(red_img[sl], cv2.bitwise_and(soft, _skin_mask(img))[sl])
                self.pieces.append(piece)
                continue
            m = cv2.bitwise_and(_poly_mask(src.shape, p["poly"]), fg)
            sel = p.get("select", "all")
            if sel == "red":
                m = cv2.bitwise_and(m, cv2.dilate(_red_mask(src), np.ones((7, 7), np.uint8)))
            elif sel == "dark":
                lum = cv2.cvtColor(neutral, cv2.COLOR_BGR2GRAY)
                m = cv2.bitwise_and(m, ((lum < p.get("dark_max", 95)) * 255).astype(np.uint8))
                m = cv2.morphologyEx(m, cv2.MORPH_CLOSE, np.ones((5, 5), np.uint8))
                # take the anti-aliased rim too, or a ghost outline stays on the base layer
                m = cv2.bitwise_and(cv2.dilate(m, np.ones((5, 5), np.uint8)), cv2.bitwise_and(_poly_mask(src.shape, p["poly"]), fg))
            for ex in p.get("exclude", []):
                m = cv2.bitwise_and(m, cv2.bitwise_not(_poly_mask(src.shape, ex)))
            # soften the cut edge by half a pixel so rotated pieces don't alias
            soft = cv2.GaussianBlur(m, (3, 3), 0)
            x, y, w, h = cv2.boundingRect(m)
            pad = 4
            x0, y0 = max(0, x - pad), max(0, y - pad)
            x1, y1 = min(src.shape[1], x + w + pad), min(src.shape[0], y + h + pad)
            sl = (slice(y0, y1), slice(x0, x1))
            piece = dict(p)
            piece["origin"] = (x0, y0)
            piece["surf"] = _to_surface(neutral[sl], soft[sl])
            piece["surf_red"] = _to_surface(red[sl], soft[sl])
            self.pieces.append(piece)
            taken = cv2.bitwise_or(taken, m)
        # base layer: everything not taken. Where a moved piece covered the body, the body behind it
        # is reconstructed: close the remaining silhouette (fills bites at shoulders/hips without
        # spilling into the background), inpaint those pixels, and redraw the ink outline there.
        rest = cv2.bitwise_and(fg, cv2.bitwise_not(taken))
        k = R.get("close_px", 41)
        closed = cv2.morphologyEx(rest, cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (k, k)))
        closed = cv2.bitwise_and(closed, fg)
        for poly in R.get("fill", []):  # optional manual fill regions
            closed = cv2.bitwise_or(closed, cv2.bitwise_and(_poly_mask(src.shape, poly), fg))
        for poly in R.get("no_fill", []):
            closed = cv2.bitwise_and(closed, cv2.bitwise_not(_poly_mask(src.shape, poly)))
        inpaint = cv2.bitwise_and(closed, cv2.dilate(taken, np.ones((3, 3), np.uint8)))
        if not R.get("reconstruct", True):
            inpaint[:] = 0
        base = neutral.copy()
        base_red = red.copy()
        if inpaint.any():
            # inpaint from body colours only: mask the background out as unknown too
            # every moved pixel is unknown (it shows the piece, not the body behind it); so is nearby background
            unknown = cv2.bitwise_or(cv2.dilate(taken, np.ones((3, 3), np.uint8)),
                                     cv2.bitwise_and(bg, cv2.dilate(inpaint, np.ones((15, 15), np.uint8))))
            base = cv2.inpaint(base, unknown, 7, cv2.INPAINT_TELEA)
            base_red = cv2.inpaint(base_red, unknown, 7, cv2.INPAINT_TELEA)
        alpha = cv2.bitwise_or(rest, inpaint)
        for poly in R.get("erase", []):  # trim art the rig replaces (e.g. square shoulder stumps)
            alpha = cv2.bitwise_and(alpha, cv2.bitwise_not(_poly_mask(src.shape, poly)))
        alpha = cv2.morphologyEx(alpha, cv2.MORPH_OPEN, np.ones((3, 3), np.uint8))
        # ink outline along the reconstructed part of the silhouette
        edge = cv2.subtract(alpha, cv2.erode(alpha, np.ones((7, 7), np.uint8)))
        edge = cv2.bitwise_and(edge, cv2.dilate(inpaint, np.ones((9, 9), np.uint8)))
        ink = np.array(R.get("ink_bgr", [14, 16, 21]), np.uint8)
        base[edge > 0] = ink
        base_red[edge > 0] = ink
        alpha = cv2.GaussianBlur(alpha, (3, 3), 0)
        self.base = _to_surface(base, alpha)
        self.base_red = _to_surface(base_red, alpha)
        # underlay: simple flat shapes drawn *behind* the body; they show only through the holes left
        # by moved pieces (shoulder caps, shorts edges hidden behind dumbbells, armpits…)
        self.underlay = []
        for u in R.get("underlay", []):
            if "sample" in u:
                b, g_, r_ = neutral[u["sample"][1], u["sample"][0]]
                col = (r_ / 255, g_ / 255, b / 255)
            else:
                h = u.get("color", "#58A9E4").lstrip("#")
                col = tuple(int(h[i:i + 2], 16) / 255 for i in (0, 2, 4))
            self.underlay.append((u, col))
        # muscle regions drawn as polygons on the art: tinted red from the neutral pixels, so any muscle
        # can be highlighted without a separate red image
        self.regions = {}
        tint = recolor_skin_to_red(neutral)
        for mus, polys in R.get("regions", {}).items():
            m = np.zeros(fg.shape, np.uint8)
            for poly in polys:
                m = cv2.bitwise_or(m, _poly_mask(src.shape, poly))
            m = cv2.bitwise_and(m, rest if not R.get("reconstruct", True) else alpha)
            m = cv2.bitwise_and(m, _skin_mask(neutral))
            m = cv2.GaussianBlur(m, (5, 5), 0)
            self.regions[mus] = _to_surface(tint, m)
        self.muscles = R.get("muscles", {})
        self.by_name = {p["name"]: p for p in self.pieces}

    # -------------------------------------------------------------- transforms
    def _rotation(self, p, pose):
        ch = p.get("angle")
        if not ch:
            return 0.0
        lim = self.rig.get("limits", {}).get(ch)
        if lim:  # the art only holds up within this range; beyond it, use an AI clip instead
            pose = dict(pose)
            pose[ch] = min(max(pose.get(ch, 0.0), lim[0]), lim[1])
        return self.sign.get(ch, 1) * (pose.get(ch, self.rest.get(ch, 0)) - self.rest.get(ch, 0)) * p.get("factor", 1.0)

    def matrix(self, name, pose, cache):
        if name in cache:
            return cache[name]
        p = self.by_name[name]
        m = cairo.Matrix()
        if p.get("parent"):
            m = self.matrix(p["parent"], pose, cache)
        ang = self._rotation(p, pose)
        if p.get("counter") and p.get("parent"):
            ang -= self._rotation(self.by_name[p["parent"]], pose) * p["counter"]
        px, py = p["pivot"]
        local = cairo.Matrix()
        for sh in p.get("shift", []):  # channel-driven translation, e.g. shrug lifts the shoulder
            v = pose.get(sh["channel"], 0.0)
            local.translate(sh.get("dx", 0) * v, sh.get("dy", 0) * v)
        local.translate(px, py)
        local.rotate(math.radians(ang))
        local.translate(-px, -py)
        m = local.multiply(m)  # local first, then parent
        cache[name] = m
        return m

    def joint(self, point, piece, pose):
        """Where a point drawn in the source image ends up for this pose."""
        m = self.matrix(piece, pose, {}) if piece else cairo.Matrix()
        return m.transform_point(*point)

    # -------------------------------------------------------------- drawing
    def draw(self, cr, pose, hl=None):
        """Draw in source-image coordinates (caller sets the cairo transform)."""
        hl = hl or {}
        red_pieces = {}
        for mus, amt in hl.items():
            for name in self.muscles.get(mus, []):
                red_pieces[name] = max(red_pieces.get(name, 0), amt)
        base_amt = max([hl.get(m, 0) for m, names in self.muscles.items() if "base" in names] or [0])
        for u, col in self.underlay:
            cr.save()
            if "ellipse" in u:
                cx, cy, rx, ry = u["ellipse"]
                cr.translate(cx, cy)
                cr.scale(rx, ry)
                cr.arc(0, 0, 1, 0, 2 * math.pi)
                cr.restore()
                cr.save()
            else:
                pts = u["poly"]
                cr.move_to(*pts[0])
                for q in pts[1:]:
                    cr.line_to(*q)
                cr.close_path()
            cr.set_source_rgb(*col)
            cr.fill_preserve()
            cr.set_source_rgb(0.06, 0.06, 0.07)
            cr.set_line_width(u.get("outline", 4.5))
            cr.set_line_join(cairo.LINE_JOIN_ROUND)
            cr.stroke()
            cr.restore()
        # whole-body motion: hips dip (body_y) and trunk lean about the ground point
        cr.save()
        gx, gy = self.rig.get("ground", [self.size[0] / 2, self.size[1]])
        self._dip = pose.get("body_y", 0.0)
        cr.translate(gx, gy)
        cr.rotate(math.radians(pose.get("lean", 0.0)) * self.rig.get("lean_sign", 1))
        breath = pose.get("breath", 0.0)
        cr.scale(1.0, 1.0 + 0.004 * breath)
        cr.translate(-gx, -gy)
        self._paint_legs(cr, pose, base_amt)
        for mus, surf in self.regions.items():
            a = hl.get(mus, 0.0)
            if a > 0.001:
                cr.set_source_surface(surf, 0, 0)
                cr.paint_with_alpha(min(1.0, a))
        cache = {}
        for p in self.pieces:
            m = self.matrix(p["name"], pose, cache)
            if p.get("static"):
                m = p["static"].multiply(m)
            self._paint(cr, p["surf"], p["surf_red"], p["origin"], m, red_pieces.get(p["name"], 0))
        cr.restore()

    def _paint_legs(self, cr, pose, base_amt):
        """Base layer with the hips lowered by body_y: above the hip line everything shifts down,
        below it the legs compress toward the planted feet (reads as a knee bend)."""
        d = self._dip
        hip_y = self.rig.get("hip_y")
        gy = self.rig.get("ground", [0, self.size[1]])[1]
        if not hip_y or abs(d) < 0.01:
            cr.translate(0, d)
            self._paint(cr, self.base, self.base_red, (0, 0), cairo.Matrix(), base_amt)
            return
        W, H = self.size
        cr.save()  # legs
        cr.rectangle(0, hip_y + d, W, gy - hip_y - d + 40)
        cr.clip()
        s = (gy - hip_y - d) / (gy - hip_y)
        cr.translate(0, gy)
        cr.scale(1.0, s)
        cr.translate(0, -gy)
        self._paint(cr, self.base, self.base_red, (0, 0), cairo.Matrix(), base_amt)
        cr.restore()
        cr.save()  # upper body
        cr.rectangle(0, -H, W, hip_y + d + H)
        cr.clip()
        cr.translate(0, d)
        self._paint(cr, self.base, self.base_red, (0, 0), cairo.Matrix(), base_amt)
        cr.restore()
        cr.translate(0, d)  # pieces (arms…) ride with the upper body

    @staticmethod
    def _paint(cr, surf, surf_red, origin, m, red_amt):
        cr.save()
        cr.transform(m)
        cr.set_source_surface(surf, *origin)
        cr.get_source().set_filter(cairo.FILTER_BILINEAR)
        cr.paint()
        if red_amt > 0.001:
            cr.set_source_surface(surf_red, *origin)
            cr.get_source().set_filter(cairo.FILTER_BILINEAR)
            cr.paint_with_alpha(min(1.0, red_amt))
        cr.restore()
