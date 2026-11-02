# House style (FIXED, Nov 2026): "2D Minimalist Brain Character Explainer"

The owner fixed this style for **every** video from now on ("bây giờ dùng theo style này cố định").
Reference build: `projects/partes_cerebro/` (3-part series, intro → punto 1–5 → conclusión). Character:
`characters/brainy/` (sheet + 13 cut poses). Older looks (blue-skin senior_m, Don Manuel, cream #F5ECD7
infographics) are retired; keep them only as history.

## Look
- **Mascot:** round white head with an exposed pink brain on top, simple white body, thick black ink
  outline, flat colours, no shading, soft blue-grey shadow under the feet. Partner = same mascot with a
  pink bow and eyelashes; child = smaller mascot; older friend = grey moustache; doctor/nurse = same
  mascot with glasses/stethoscope or cap (never a red cross).
- **Background:** off-white `#F7F6F2`. Ink `#1B1A22`, highlight pink `#E0707A`, pale pink `#F9D3D3`,
  yellow `#F7C531` (chips, badges), green `#3FAE5A` (✓ / benefit), red `#E23B2E` (warning), amber
  `#F2A33A` (advice). Typeface: Inter Black.
- **Captions:** white speech-bubble pills with a 7 px ink outline, one key word in pink (`Bubble()`).
  Chips = pills with a 6 px outline (`Chip()`). Still panels sit in a rounded ink frame with a slow push-in.
- **Diagrams:** ordered from the user in the same doodle style, each region in its own flat colour, then
  split with `scripts/split_regions.py` so one region lights up while the rest dims (`BrainMap()`).

## Building blocks (`projects/partes_cerebro/common.js`, copy it for a new video)
Beat engine: `beat(cue, builder)` — each beat lasts until the next cue; hard cuts in the hook, otherwise
the next beat fades in over the previous one (never through empty background).
Builders: `still(panel, {cap, hi, chips, punch, tag})`, `brain({map, on, labels, mascot, items, extra})`,
`mascot(pose, {cap, chips, with, extra, stamp})`, `row([[cut, label, cue]], {head, cap})`,
`big(lines, {pic})`, `kicker(n, title, {map, on})`, `countUp(n, label, {until, src})`, `cta('sub')`,
`strokeCard(head, icons, {go})`, `adviceCard(head, lines)`, `endCard({next, chip, topics})`,
plus `Network`, `Mark` (✓/✗), `Arrow`, `Drop`.

## Assets to order for each video (simple file names a, b, c, … for the user)
1. **Mascot expression sheets** (8 separate poses each) for the emotions/actions the script needs. Reuse
   `projects/partes_cerebro/cut/m_*.png` (21 poses) before ordering new ones.
2. **Diagram sheets** in doodle style with flat region colours (two identical copies: coloured + plain,
   or separate items).
3. **2×2 scene panels** with the mascot acting out the script's moments.
4. **Exercise pose sheets**: the mascot doing the exercise, 3–4 poses in one row, side view, plain
   `#F7F6F2` background, no floor drawing (cut with `cut_poses.py --skin none`).
Every prompt says "in the exact style of the attached mascot" and the user attaches
`characters/brainy/sheet.jpg` (and the first delivered sheet for consistency).

## Delivery
- Background music: generated, royalty-free (`scripts/make_music.py` + `scripts/mix_music.sh`, music
  ≈15 dB under the voice, ducked while it speaks). Per-video wrapper: `projects/partes_cerebro/finish.sh`.
- Long scripts can go out as a series of complete videos (pre-roll title + recap, end card "CONTINÚA EN
  LA PARTE n"), cut from one voice take; extra intro/outro lines are recorded separately.
- Compress with x264 CRF 24 `-tune animation`; send files under 30 MB (split at 290 s when needed).
