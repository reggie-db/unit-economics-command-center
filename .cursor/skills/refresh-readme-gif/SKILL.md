---
name: refresh-readme-gif
description: Re-record the dashboard walkthrough GIF (`docs/overview.gif`) by walking through the running dev server with Playwright and re-encoding the capture as a compact GIF with ffmpeg. Use this proactively after any change that affects the look of the dashboard - new sections on `OverviewPage`, layout shifts in `client/src/components/dashboard/`, palette / branding tweaks in `client/src/index.css`, or copy changes in `client/src/data/overview.ts` and `client/src/data/sections.ts`. Also use when the user explicitly asks to "refresh the gif", "rerecord the demo", "update the readme video", or similar. The GIF currently isn't embedded in `README.md`, but it stays under `docs/` for ad-hoc sharing and demos.
---

# Refresh dashboard walkthrough GIF

The repo keeps a `docs/overview.gif` walkthrough handy for demos. It is **not** currently embedded in `README.md`, but should still be regenerated when the UI changes so the file on disk stays current.

## When to invoke

Run this skill **after any of the following kinds of changes**:

- New widgets, sections, or pages added to the Overview (`client/src/pages/OverviewPage.tsx`).
- Visual or layout changes to existing dashboard components in `client/src/components/dashboard/*`.
- Significant copy or data changes in `client/src/data/overview.ts` or `client/src/data/sections.ts` (KPIs, drivers, recommended actions, market rows).
- Theme / palette changes in `client/src/index.css` or branding updates that change the default look.
- The user explicitly asks to refresh, rerecord, redo, or regenerate the README GIF / preview.

If the user only changed backend, build config, README prose, or other non-visual code, **skip** this skill.

## Prerequisites

The host must have:

- Node 22+ and the project's npm dependencies installed (`npm install`).
- `ffmpeg` on `PATH`. Install with `brew install ffmpeg` on macOS.
- Chromium for Playwright (the `npm run docs:gif` script auto-installs it via `playwright install chromium`).
- A reachable dev server on `http://localhost:8000`. If nothing is on port 8000 yet, the skill must start it.

## Procedure

1. **Check / start the dev server.**
   - Detect with `lsof -ti :8000` (or `curl -fsS http://localhost:8000/health`).
   - If nothing is listening, start it as a backgrounded shell job:
     ```bash
     npm run dev > /tmp/uec-dev.log 2>&1 &
     ```
     Then wait for the line `Server running on http://localhost:8000` in the log before continuing. Note whether you started it (you should stop it again at the end).

2. **Run the recorder.**
   ```bash
   npm run docs:gif
   ```
   `scripts/record-overview.mjs` launches Chromium, walks through the Overview page (KPIs, regional map + drivers, channel margin compare + promo allocation, markets table + recommended actions) and visits `/channels`, `/markets`, and `/brands`. Output: `tmp/recording/overview.webm` and `docs/overview.gif`. Shared ffmpeg + Playwright helpers live in `scripts/lib/recording.mjs`.

3. **Sanity check the output.**
   - Confirm `docs/overview.gif` is between **~1 MB and ~5 MB**. If much larger, lower `RECORD_FPS`, `GIF_WIDTH`, or `GIF_PALETTE_COLORS` at the top of `scripts/record-overview.mjs` and rerun.
   - Confirm the duration looks sensible (`ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 docs/overview.gif`). It should be roughly 15-25 seconds.

4. **Stop the dev server if you started it** (kill the background shell job; do not kill a server the user already had running).

5. **Do not commit on the user's behalf** unless they explicitly asked you to. Report the new size and any deviations.

## Tunables

`scripts/record-overview.mjs` exposes the most useful knobs near the top:

| Variable | Default | Purpose |
|----------|---------|---------|
| `VIEWPORT` | `1280x720` | Browser window size during capture. |
| `RECORD_FPS` | `4` | Target gif frame rate. Lower = smaller file. |
| `GIF_WIDTH` | `820` | Output gif width (height auto, aspect preserved). |
| `GIF_PALETTE_COLORS` | `64` | Max colors in the gif palette. |

Adjust the scripted page visits and `sleep` / `smoothScroll` durations in the same file if you want the demo to dwell longer on a particular section after big visual changes.

## Failure modes

- **`Could not reach http://localhost:8000`** - dev server isn't running. Start it (see step 1) and re-run.
- **`ffmpeg exited with code N`** - check whether `ffmpeg` is installed and on `PATH`. `which ffmpeg` should resolve to a binary.
- **Playwright fails to install Chromium** - rerun with `npx playwright install chromium` and re-execute `npm run docs:gif`.
- **GIF is much larger than ~5 MB** - drop `RECORD_FPS` to `3` or `GIF_WIDTH` to `720`.
