# News / documentary style

The feel: a calm, serious health report on Spanish-language TV, made for people over 60. Real-looking
photos fill the screen, the camera drifts slowly, and clean graphics sit on top. The viewer should trust
it, read it without effort and never feel rushed. It is **not** breaking news and not a slide deck.

## Look
| Token | Hex | Use |
|---|---|---|
| bg | `#0D1420` | Background behind everything, end card |
| panel / panel2 | `#162133` / `#1F2C42` | Panels, chart tracks, study header |
| white | `#F4F1EA` | Headline text, lower-third title bar |
| dim | `#9AA6B8` | Subtitles, small print, section name in the bug |
| red | `#D7263D` | Accent: kicker blocks, rules under headlines, wipe, ✗, subscribe |
| gold | `#F2B33D` | Highlight: key line of a headline, labels under numbers, highlighter, chapter number |
| teal | `#2BB3A3` | ✓ / possible benefit (green is not used in this style) |
| paper | `#F7F3EA` | Study page |

Colour logic: teal = benefit, gold = attention / key fact, red = risk or warning, and red is also the brand accent.

Type (all in `news/fonts.css`):
- **Oswald** 500/700, condensed caps: headlines, kickers, labels, chapter titles.
- **Source Serif 4** 700 and italic: big numbers, chapter numbers, quotes, study titles, subtitles.
- **Inter** 700–900: small print (sources, "Imagen ilustrativa") and sentences on the study page.

Sizes for seniors on a TV or phone: headline 100–120 px, number 200–240 px, lower-third title 52–60 px,
labels ≥ 40 px, small print 24 px (the only text allowed under 36 px).

Grid: 1920×1080, side margin 110 px, the bug sits at top left (70, 56), small print on the bottom
line (y = 1036), lower thirds at y ≈ 820. Keep faces out of the lower-third band when you choose
the photo's focus point.

Finish: every frame gets `Grade` (vignette + light moving grain). Photos sit under a 10–30 % dark
overlay with a bottom gradient; 55–65 % dark when a number or chapter title is on top.

## Text budget
Same rule as health-video: picture first, key phrases only.
- On screen at once: at most **one headline or one lower third or one number**, plus the bug and small print.
- Lower-third title ≤ 7 words; headline ≤ 2 lines of ≤ 18 characters; label under a number ≤ 4 words.
- The text names the fact; the voice explains it. Never put the voice sentence on screen word for word.
- Safety lines stay even if long: "Información general · consulte a su médico", warnings for people
  on insulin or blood-pressure medicine, "Recreación"/"Imagen ilustrativa".

## Pace and the edit
| Part | Change every | How |
|---|---|---|
| Hook (first 30–40 s) | 2–3 s | hard cuts between hero photos, headline rising in, number slam, one callout |
| Body | 4–6 s | camera drift on each photo, lower third or number entering on its word, study page, bars |
| Chapter opener | 3–4 s | red wipe → darkened photo → chapter number + title |
| Warnings / checklist | hold 8–12 s | still panel, items appear on their words, no camera move |

- Calmer than health-video: no zoom punches except on one key number per section (`punch`, k ≤ 0.05),
  no flashes, no shakes, no fast whips. The fastest cut is 1.5 s.
- **Camera move on every photo** (`Photo` from/to): zoom 1.0 → 1.08–1.18 over the shot, drifting toward
  the subject. Alternate in and out between consecutive shots so the edit breathes.
- **Cuts:** inside a section, hard cuts (`cutVis`) on the first word of the new beat. Between sections,
  the red `Wipe` (0.55 s), then the chapter opener. Short 0.35 s cross-fades (`sceneVis`) only for
  "before → after" of the same place.
- One graphic idea per shot: photo + one lower third, or photo + one number, or photo + study page.

## Sound
- Voice: a documentary narrator (see `asset-order.md` voice spec).
- Music bed: wordless, slow, low "documentary" pulse (soft piano or strings + light percussion),
  about 18 dB under the voice, constant, fading in and out at the ends. Free sources only (YouTube
  Audio Library). Optional soft whoosh on the wipe at −15 dB. No news stingers or alarm sounds.

## Honesty rules (non-negotiable)
1. **No real network.** Never use the name, logo, colours set or graphics package of a real channel
   (Univision, Telemundo, CNN, BBC Mundo, etc.) and never write "noticiero" or "en vivo" as if this were
   one. The bug shows only this channel's own name.
2. **No fake urgency.** No "ÚLTIMA HORA", "URGENTE", "ALERTA" banners, no ticker of headlines, no live
   dot. Health information is evergreen: call it "INFORME", "REPORTAJE" or the topic name.
3. **No invented people.** AI photos show anonymous people only. Never put a name and title ("Dr. …,
   cardiólogo") under an AI face, never stage an interview, never make an AI person say a quote.
   Recurring characters (e.g. Doña Rosa) are fine when the story labels them a dramatisation
   ("Recreación" in small print).
4. **Real sources only.** A study page shows the real publication type, year and a finding taken from
   the source (paraphrased in Spanish is fine; never an invented title, journal or sample size).
   A quote is verbatim from a document you found, attributed to the organisation or document.
5. **Label pictures.** Small print "Imagen ilustrativa" on AI photos of people, "Recreación" on
   dramatised scenes, "Fuente: …" under every number.
6. Everything in health-video's health-claim rules applies.

## QA (each contact sheet, before rendering)
- Every frame: a photo or a chart fills the screen; never text on plain navy except the end card.
- Count text: one headline / lower third / number at a time (+ bug + small print).
- Lower thirds and headlines don't cover a face or the thing being talked about.
- Callouts land on the right spot through the whole camera move (use `Photo.map`).
- Small print matches the shot: the right source under each number, "Imagen ilustrativa" on AI people.
- Hook: step through the first 40 s at 2 s; every step looks different.
- Readability: view a frame at phone size (480 px wide); every label still readable.
- Honesty: no real network look, no urgency banners, no named AI experts.
