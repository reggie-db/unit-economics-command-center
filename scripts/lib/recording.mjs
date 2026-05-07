/**
 * Shared helpers for the README GIF recorders. Centralised so that
 * `scripts/record-overview.mjs` and `scripts/record-branding.mjs` share one
 * dev-server probe, recording-dir bookkeeping, and ffmpeg encoder.
 */

import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, readdir, rename, rm, stat } from 'node:fs/promises';
import { dirname, join } from 'node:path';

/** Sleep helper for orchestrating scripted user actions inside Playwright. */
export function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

/**
 * Smooth-scrolls the document by `pixels` over `durationMs` so the scroll
 * shows up as motion in the recording rather than a jump cut.
 */
export async function smoothScroll(page, pixels, durationMs) {
  await page.evaluate(
    async ({ pixels, durationMs }) => {
      const start = performance.now();
      const startY = window.scrollY;
      return new Promise((resolve) => {
        function step(now) {
          const t = Math.min((now - start) / durationMs, 1);
          // ease-in-out cubic for a comfortable scroll feel
          const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
          window.scrollTo(0, startY + pixels * eased);
          if (t < 1) requestAnimationFrame(step);
          else resolve();
        }
        requestAnimationFrame(step);
      });
    },
    { pixels, durationMs },
  );
}

/** Light HEAD probe so we fail fast with a friendly error if the dev server is down. */
export async function ensureDevServerReachable(baseUrl) {
  try {
    const res = await fetch(baseUrl, { method: 'GET' });
    if (!res.ok && res.status >= 500) {
      throw new Error(`Dev server responded ${res.status}`);
    }
  } catch (err) {
    throw new Error(
      `Could not reach ${baseUrl}. Start the dev server first with: npm run dev\n` +
        `Underlying error: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
}

/** Empties the recording directory so each run starts clean. */
export async function resetRecordingDir(dir) {
  await mkdir(dir, { recursive: true });
  for (const entry of await readdir(dir)) {
    await rm(join(dir, entry), { recursive: true, force: true });
  }
}

/**
 * Renames the .webm Playwright produced into `targetPath` and returns its size.
 * Throws if Playwright didn't produce a .webm in the directory.
 */
export async function claimRecording(dir, targetPath) {
  const files = (await readdir(dir)).filter((f) => f.endsWith('.webm'));
  if (files.length === 0) {
    throw new Error(`Playwright did not produce a .webm in ${dir}`);
  }
  const produced = join(dir, files[0]);
  if (existsSync(targetPath)) await rm(targetPath);
  await rename(produced, targetPath);
  const sizeBytes = (await stat(targetPath)).size;
  return { path: targetPath, sizeBytes };
}

/** Spawns ffmpeg with the given args and resolves on a clean exit. */
export function runFfmpeg(args) {
  return new Promise((resolve, reject) => {
    const child = spawn('ffmpeg', args, { stdio: ['ignore', 'inherit', 'inherit'] });
    child.on('error', reject);
    child.on('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`ffmpeg exited with code ${code}`));
    });
  });
}

/**
 * Encodes a webm into a compact GIF with a two-pass palette filter and writes
 * it to `outputGif`. All knobs default to README-friendly settings.
 */
export async function encodeGif(rawVideo, outputGif, opts = {}) {
  const fps = opts.fps ?? 4;
  const width = opts.width ?? 820;
  const colors = opts.colors ?? 64;

  await mkdir(dirname(outputGif), { recursive: true });

  const filter = [
    `fps=${fps}`,
    `scale=${width}:-1:flags=lanczos`,
    'split[s0][s1]',
    `[s0]palettegen=max_colors=${colors}:stats_mode=diff[p]`,
    '[s1][p]paletteuse=dither=bayer:bayer_scale=5:diff_mode=rectangle',
  ].join(',');

  await runFfmpeg(['-y', '-i', rawVideo, '-lavfi', filter, '-f', 'gif', outputGif]);

  const sizeBytes = (await stat(outputGif)).size;
  return { path: outputGif, sizeBytes };
}
