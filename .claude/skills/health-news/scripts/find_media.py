#!/usr/bin/env python3
"""Search free-licence photos on Wikimedia Commons (and Openverse) and download the chosen ones.

  find_media.py search "elderly woman dinner" [--n 12] [--src stock|flickr|science|commons]   → candidates + contact sheet
  find_media.py get <project_dir> <name> <candidate_id> [--fast]                    → assets/<name>.jpg (AI-upscaled to 2112 px) + credits.json

Only licences that allow commercial use and modification are kept (CC0, PD, CC BY, CC BY-SA).
Every download is logged in <project>/credits.json; put the CC BY / BY-SA lines in the video description.
"""
import argparse, io, json, os, re, sys, time, urllib.error, urllib.parse, urllib.request

# Wikimedia's robot policy needs a descriptive agent with a contact URL, and polite pacing.
UA = {'User-Agent': 'health-news-video/1.0 (https://github.com/kittiequizzz-sudo/healthyxzzs) python-urllib'}
OK = re.compile(r'^(cc0|public domain|pd|cc by(-sa)? ?[0-9.]*|cc-by(-sa)?-[0-9.]+)$', re.I)
# candidates of every search, so `get` can fetch them later (not TMPDIR: setting it breaks Chromium renders)
# one small file per candidate, so parallel searches never clobber each other
CACHE = os.path.expanduser('~/.cache/health-news/candidates')
os.makedirs(CACHE, exist_ok=True)


def fetch(url, data=False, tries=5):
    url = urllib.parse.quote(url, safe=':/?=&%,')
    for k in range(tries):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=40) as r:
                b = r.read()
            return json.loads(b) if data else b
        except urllib.error.HTTPError as e:
            if e.code != 429 or k == tries - 1:
                raise
            time.sleep(min(60, int(e.headers.get('Retry-After') or 0) or 4 * 2 ** k))   # shared IPs get rate-limited


def strip(html):
    return re.sub(r'<[^>]+>', '', html or '').strip()


def commons(q, n):
    p = {'action': 'query', 'format': 'json', 'generator': 'search', 'gsrsearch': f'{q} filetype:bitmap',
         'gsrnamespace': 6, 'gsrlimit': n * 3, 'prop': 'imageinfo', 'iiprop': 'url|size|extmetadata', 'iiurlwidth': 1920}
    d = fetch('https://commons.wikimedia.org/w/api.php?' + urllib.parse.urlencode(p), True)
    out = []
    for pg in sorted(d.get('query', {}).get('pages', {}).values(), key=lambda x: x.get('index', 0)):
        ii = pg['imageinfo'][0]; m = ii.get('extmetadata', {})
        lic = strip(m.get('LicenseShortName', {}).get('value'))
        if not OK.match(lic) or ii['width'] < 1200 or ii['width'] < ii['height']:
            continue
        out.append({'id': 'c' + str(pg['pageid']), 'title': pg['title'], 'url': ii['thumburl'], 'w': ii['width'], 'h': ii['height'],
                    'license': lic, 'author': strip(m.get('Artist', {}).get('value'))[:80], 'page': ii['descriptionurl']})
    return out[:n]


def wm_thumb(url, w):
    # upload.wikimedia.org/wikipedia/commons/a/ab/Name.jpg → …/commons/thumb/a/ab/Name.jpg/<w>px-Name.jpg
    m = re.match(r'(https://upload\.wikimedia\.org/wikipedia/commons/)(\w/\w\w/)([^/]+)$', url)
    return f"{m[1]}thumb/{m[2]}{m[3]}/{w}px-{m[3]}" if m else url


# Source groups (Openverse proxies all of these; checked from this environment, Oct 2026)
GROUPS = {
    'stock': ('wordpress,rawpixel,stocksnap', 'cc0,pdm'),                      # modern stock photos, CC0
    'flickr': ('flickr', 'cc0,pdm,by'),                                         # huge, ≤ 1024 px, CC BY needs credit
    'science': ('nasa,wellcome_collection,met,clevelandmuseum,brooklynmuseum,smk,rijksmuseum', 'cc0,pdm,by'),
}                                                                               # medical history, anatomy plates, space


def openverse(q, n, group='stock'):
    sources, licenses = GROUPS[group]
    # Openverse (CC search) proxies the files of its sources, so this works even where the photo hosts
    # themselves are blocked. WordPress Photo Directory = modern CC0 photos up to 2048 px.
    out = []
    for page in (1, 2):
        p = {'q': q, 'source': sources, 'license': licenses, 'page_size': 20, 'page': page}
        try:
            d = fetch('https://api.openverse.org/v1/images/?' + urllib.parse.urlencode(p), True)
        except Exception:
            break
        for r in d.get('results', []):
            w, h = r.get('width') or 0, r.get('height') or 0
            if w and h and w < h * 1.15:
                continue                         # 16:9 frames need landscape pictures
            px = f"https://api.openverse.org/v1/images/{r['id']}/thumb/"
            out.append({'id': 'o' + r['id'][:8], 'title': r.get('title') or '', 'url': px + '?full_size=true&compressed=false',
                        'thumb': px, 'w': w, 'h': h, 'source': r.get('source'),
                        'license': f"CC {r['license'].upper()} {r.get('license_version', '')}".strip(),
                        'author': (r.get('creator') or '')[:80], 'page': r.get('foreign_landing_url')})
        if len(out) >= n or not d.get('results'):
            break
    return out[:n]


def search(a):
    from PIL import Image, ImageDraw
    res = commons(a.q, a.n) if a.src == 'commons' else openverse(a.q, a.n, a.src)
    for r in res:
        json.dump(r, open(os.path.join(CACHE, r['id'] + '.json'), 'w'))
    if a.nosheet:
        for r in res: print(f"{r['id']:>12}  {r['w']}x{r['h']}  {r.get('source', 'commons'):<10} {r['license']:<14} {r['title'][:60]}")
        return
    W, H = 480, 270; c = 4; rows = max(1, (len(res) + c - 1) // c)
    sheet = Image.new('RGB', (W * c, H * rows), 'black')
    for k, r in enumerate(res):
        try:
            im = Image.open(io.BytesIO(fetch(r.get('thumb') or r['url']))).convert('RGB')
            im.thumbnail((W, H)); sheet.paste(im, ((k % c) * W, (k // c) * H))
        except Exception as e:
            r['error'] = str(e)[:60]
        ImageDraw.Draw(sheet).text(((k % c) * W + 6, (k // c) * H + 6), r['id'], fill='yellow')
        print(f"{r['id']:>12}  {r['w']}x{r['h']}  {r.get('source', 'commons'):<10} {r['license']:<14} {r['title'][:60]}  {r.get('error', '')}")
    out = a.sheet or os.path.expanduser('~/.cache/health-news/find_media_sheet.jpg')
    sheet.save(out); print('contact sheet:', out)


def get(a):
    import time; time.sleep(1)
    r = json.load(open(os.path.join(CACHE, a.id + '.json')))
    os.makedirs(os.path.join(a.project, 'assets'), exist_ok=True)
    dst = os.path.join(a.project, 'assets', a.name + '.jpg')
    src = os.path.join(a.project, 'assets', 'src', a.name + '.jpg')     # original, kept for re-processing
    os.makedirs(os.path.dirname(src), exist_ok=True)
    open(src, 'wb').write(fetch(r['url']))
    import cv2
    img = cv2.imread(src)
    if img.shape[1] < 2112 and not a.fast:
        sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
        import upscale                                                   # Real-ESRGAN, ~2 min per photo
        img = upscale.upscale(img, upscale.model())
    h = round(img.shape[0] * 2112 / img.shape[1])
    img = cv2.resize(img, (2112, h), interpolation=cv2.INTER_AREA if img.shape[1] > 2112 else cv2.INTER_LANCZOS4)
    cv2.imwrite(dst, img, [cv2.IMWRITE_JPEG_QUALITY, 94])
    from PIL import Image
    im = Image.open(dst)
    cf = os.path.join(a.project, 'credits.json')
    import fcntl
    lock = open(cf + '.lock', 'w'); fcntl.flock(lock, fcntl.LOCK_EX)   # parallel `get`s share credits.json
    cr = json.load(open(cf)) if os.path.exists(cf) and os.path.getsize(cf) else {}
    cr[a.name] = {k: r[k] for k in ('title', 'author', 'license', 'page')} | {'size': list(im.size)}
    json.dump(cr, open(cf, 'w'), indent=1, ensure_ascii=False)
    print(dst, im.size, r['license'], r['author'])


ap = argparse.ArgumentParser(); sp = ap.add_subparsers(dest='cmd', required=True)
s = sp.add_parser('search'); s.add_argument('q'); s.add_argument('--n', type=int, default=12); s.add_argument('--src', default='stock', help='stock | flickr | science | commons'); s.add_argument('--sheet'); s.add_argument('--nosheet', action='store_true')
g = sp.add_parser('get'); g.add_argument('project'); g.add_argument('name'); g.add_argument('id')
g.add_argument('--fast', action='store_true', help='Lanczos instead of AI upscaling (drafts)')
a = ap.parse_args()
search(a) if a.cmd == 'search' else get(a)
