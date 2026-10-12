# Timeline JSON (input to `scripts/render.py`)

All times are **absolute seconds on the voice-over clock** (take them from `transcript/words.txt`).
Positions are `[x, y]`: values between −1 and 1 are fractions of the frame (`[0.5, 0.5]` = centre),
and larger values are pixels in the 1920×1080 design space. Paths are relative to the timeline file.

```json
{
  "fps": 30,
  "bg": "cream",
  "voice": "audio/voice.wav",
  "music": {"src": "audio/music.mp3", "gain_db": -17, "fade_in": 1.0, "fade_out": 2.0},
  "sfx": [{"src": "audio/sfx/pop.wav", "at": 20.45, "gain_db": -14}],
  "duration": 512.3,
  "shots": [
    {
      "id": "S04",
      "start": 6.85, "end": 10.25,
      "asset": "assets/S04_char_side-deltoid.png",
      "push": [1.0, 1.05],
      "overlays": [
        {"type": "image", "src": "assets/S04_char_side-deltoid_red.png", "width": 1920, "in": "wipe_up", "at": 7.2},
        {"type": "text", "text": "BIGGEST", "pos": [0.70, 0.36], "at": 8.1}
      ]
    }
  ]
}
```

## Shot fields

| Field | Default | Meaning |
|-------|---------|---------|
| `start`, `end` | — | Shot window. `end` defaults to the next shot's start. Cuts are hard. |
| `asset` | none | `.mp4/.mov/.webm` clip or `.png/.jpg` still. Omit it for plain cream (graphics-only beats). |
| `trim` | 0 | Seconds to skip at the head of the clip. |
| `speed` | 1.0 | Playback speed of the clip. `fit_speed: true` stretches the clip to fill the shot. A clip shorter than the shot holds its last frame. |
| `pos` | `[0.5, 0.5]` | Where the asset's centre sits (e.g. `[0.68, 0.5]` to make room for a title on the left). |
| `scale` | 1.0 | Scale after contain-fit. |
| `push` | `[1, 1]` | Zoom from → to across the shot (ease in-out). Use 1.04–1.08 on stills. |
| `focus` | none | `[x, y]` point the push zooms towards. |
| `bg` | timeline `bg` | Background colour behind the asset. |

## Overlay catalogue

Common fields: `at` (start, defaults to the shot start), `until` (defaults to the shot end), `in`
(`pop` | `fade` | `rise` | `wipe_up` | `wipe_right` | `grow` | `none`), `in_dur`, `out` (`cut` |
`fade` | `pop`), `out_dur`.

| type | Key fields | Reference use |
|------|-----------|---------------|
| `text` | `text`, `pos`, `size` (110), `color` (orange), `weight` | BIGGEST, MISTAKE 1, THE TOP (defaults to `in: fade`) |
| `tag` | `text`, `pos`, `size` (52), `fill` (amber), `angle` | WIDE, HEAVY, 1 STUDY, 10 |
| `numbers` | `count` or `labels`, `pos`, `box` (170), `gap` (95), `stagger` (0.13), `highlight` {`index`, `at`, `scale`, `focus`} | "the five mistakes"; focus on the last one |
| `bars` | `bars` [{`label`, `value` 0–1, `color`, `at`}], `pos` (baseline centre), `width`, `height`, `bar_width`, `ghost` {`index`, `value`, `at`} | deltoid vs triceps vs biceps |
| `icon` | `kind` (`x` \| `check`), `pos`, `size` (90) | wrong / right |
| `arrow` | `from`, `to`, `width` (16), `head` (40), `double`, `color` | outward "wide" arrows, down "drop the weight", lever length |
| `dashed` | `from`, `to`, `width` (8), `dash`, `gap` | shoulder-height guide line |
| `callout` | `source` [x, y, radius_px], `pos`, `radius` (150), `color` | zoom circle on a muscle (live from the base frame) |
| `week` | `pos`, `days`, `highlight` [idx], `checks` [{`day`, `at`}] | "every week" tracker |
| `image` | `src`, `pos`, `width`/`height`/`scale`, `border` (colour), `radius`, `angle` | highlight variants (`in: wipe_up`), props, framed inset pictures |

For curved arrows, meters, CRT screens and other one-off graphics, order the art as a still or
clip. If a pattern keeps recurring across videos, add a new overlay class to `render.py`. Each class
is ~30 lines: build sprites in `__init__`, composite them in `draw(frame, t)` with `blit`/`paste`.

## QA commands

```bash
R=.claude/skills/health-video/scripts/render.py
python3 $R timeline.json --draft --sheet 0:60:0.5 -o qa/sheet_000-060.png   # look at every 0.5 s
python3 $R timeline.json --frame 8.3 -o qa/f_8.3.png                         # full-res close-up
python3 $R timeline.json --draft --start 0 --end 30 -o out/draft_hook.mp4    # quick motion check
python3 $R timeline.json -o out/final.mp4                                    # final, with audio mix
```
