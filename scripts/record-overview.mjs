/**
 * Records a short walkthrough of the running dev server with Playwright and
 * converts the WebM capture into the README hero GIF (`docs/overview.gif`).
 *
 * The script is meant to be called by `npm run docs:gif`. It expects the dev
 * server to already be running on http://localhost:8000 (start it with
 * `npm run dev` in another terminal). It opens a Chromium window with a
 * fixed 1280x720 viewport, scrolls/navigates through the highest-signal
 * pages for the executive 1P-vs-3P narrative, then encodes the recording
 * into a compact GIF using ffmpeg's two-pass palette workflow.
 *
 * Steps recorded in order:
 *   1. Overview (slow scroll through KPIs, drivers, channel margin, promo)
 *   2. 1P vs 3P channel detail
 *   3. Markets list
 *   4. Categories
 *
 * Output:
 *   - tmp/recording/overview.webm   (Playwright video, kept for debugging)
 *   - docs/overview.gif             (README hero asset)
 */

import { chromium } from 'playwright';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  claimRecording,
  encodeGif,
  ensureDevServerReachable,
  resetRecordingDir,
  sleep,
  smoothScroll,
} from './lib/recording.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..');
const RECORDING_DIR = join(ROOT, 'tmp', 'recording');
const OUTPUT_GIF = join(ROOT, 'docs', 'overview.gif');
const RAW_VIDEO = join(RECORDING_DIR, 'overview.webm');

const BASE_URL = process.env.RECORD_URL || 'http://localhost:8000';

// Recording / encode tunables. Lower fps and smaller width keep the GIF small
// enough for GitHub README inline previews; bump them when you have a faster
// host or want a sharper capture.
const VIEWPORT = { width: 1280, height: 720 };
const RECORD_FPS = 4;
const GIF_WIDTH = 820;
const GIF_PALETTE_COLORS = 64;

async function record() {
  await resetRecordingDir(RECORDING_DIR);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 1,
    recordVideo: { dir: RECORDING_DIR, size: VIEWPORT },
  });
  const page = await context.newPage();

  console.log(`> opening ${BASE_URL}`);
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await page.waitForSelector('text=Unit Economics Command Center', { timeout: 15_000 });
  await sleep(1500);

  // 1) Overview top - hold on KPI strip + insight banner
  await sleep(1500);

  // 2) Scroll into Regional map + driver analysis
  await smoothScroll(page, 320, 1200);
  await sleep(1200);

  // 3) Scroll into Channel margin compare + Promo allocation
  await smoothScroll(page, 360, 1200);
  await sleep(1300);

  // 4) Scroll into Markets table + recommended actions
  await smoothScroll(page, 360, 1200);
  await sleep(1300);

  // 5) Jump to 1P vs 3P channels detail page
  await page.goto(`${BASE_URL}/channels`, { waitUntil: 'networkidle' });
  await sleep(1500);
  await smoothScroll(page, 240, 800);
  await sleep(1200);

  // 6) Markets table page
  await page.goto(`${BASE_URL}/markets`, { waitUntil: 'networkidle' });
  await sleep(1500);

  // 7) Categories
  await page.goto(`${BASE_URL}/brands`, { waitUntil: 'networkidle' });
  await sleep(1500);

  await page.close();
  await context.close();
  await browser.close();

  const claimed = await claimRecording(RECORDING_DIR, RAW_VIDEO);
  console.log(`> wrote ${claimed.path} (${(claimed.sizeBytes / 1024).toFixed(1)} KB)`);
}

async function main() {
  await ensureDevServerReachable(BASE_URL);
  await record();
  console.log(`> encoding gif to ${OUTPUT_GIF}`);
  const encoded = await encodeGif(RAW_VIDEO, OUTPUT_GIF, {
    fps: RECORD_FPS,
    width: GIF_WIDTH,
    colors: GIF_PALETTE_COLORS,
  });
  console.log(
    `> wrote ${encoded.path} (${(encoded.sizeBytes / 1024).toFixed(1)} KB)`,
  );
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
