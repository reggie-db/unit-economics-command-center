/**
 * Persists uploaded logos under tmp/branding/ named by a short id derived from
 * content (first 12 hex chars of SHA-256). Serves at GET /api/branding/logo/:id.
 */

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import type { Application, Request, Response } from 'express';
import multer from 'multer';

const BRANDING_DIR = path.join(process.cwd(), 'tmp', 'branding');

const ALLOWED_MIME = /^image\/(png|jpeg|gif|webp)$/i;

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 4 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (ALLOWED_MIME.test(file.mimetype)) cb(null, true);
    else cb(new Error('unsupported image type'));
  },
});

export function ensureBrandingDir(): void {
  fs.mkdirSync(BRANDING_DIR, { recursive: true });
}

export function registerBrandingRoutes(app: Application): void {
  ensureBrandingDir();

  app.post('/api/branding/upload', (req: Request, res: Response) => {
    upload.single('logo')(req, res, (err: unknown) => {
      if (err) {
        const msg =
          err instanceof multer.MulterError
            ? err.message
            : err instanceof Error
              ? err.message
              : 'upload failed';
        res.status(400).json({ error: msg });
        return;
      }

      const file = req.file;
      if (!file?.buffer?.length) {
        res.status(400).json({ error: 'missing logo file (field name: logo)' });
        return;
      }

      const hash = crypto
        .createHash('sha256')
        .update(file.buffer)
        .digest('hex')
        .slice(0, 12);
      const filePath = path.join(BRANDING_DIR, hash);
      const metaPath = `${filePath}.meta.json`;

      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, file.buffer);
        fs.writeFileSync(metaPath, JSON.stringify({ mimeType: file.mimetype }));
      }

      res.json({ logo: hash });
    });
  });

  app.get('/api/branding/logo/:hash', (req: Request, res: Response) => {
    const hashParam = req.params.hash;
    const hash = Array.isArray(hashParam) ? hashParam[0] : hashParam;
    if (!hash || !/^([a-f0-9]{12}|[a-f0-9]{64})$/i.test(hash)) {
      res.status(400).send('invalid hash');
      return;
    }
    const filePath = path.join(BRANDING_DIR, hash);
    const metaPath = `${filePath}.meta.json`;
    if (!fs.existsSync(filePath) || !fs.existsSync(metaPath)) {
      res.status(404).send('not found');
      return;
    }
    const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8')) as { mimeType: string };
    res.setHeader('Content-Type', meta.mimeType);
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.sendFile(path.resolve(filePath));
  });
}
