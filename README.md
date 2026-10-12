# healthyxzzs

Production kit for animated health and fitness science explainers.

- `reference/`: the three demo cuts and `ANALYSIS.md`, a shot-by-shot breakdown with transcripts and timing.
- `.claude/skills/health-video/`: the Claude Code skill.
  - **Phase 1:** send a script, visual direction and source log. You get back an asset order with AI image and motion prompts, the voice spec and file names, plus a fact-check of the claims.
  - **Phase 2:** send the assets and voice-over. You get back the finished MP4, timed to the voice and rendered with the bundled engine (`scripts/render.py`).
- `projects/<slug>/`: one folder per video.

Smoke test:

```bash
bash .claude/skills/health-video/scripts/setup.sh
cd .claude/skills/health-video/templates/example
python3 ../../scripts/render.py timeline.json -o /tmp/example.mp4
```

The example project uses clips cut from the demos as stand-ins for real assets.
