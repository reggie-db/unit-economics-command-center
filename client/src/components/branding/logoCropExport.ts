import type { PixelCrop } from 'react-image-crop';

/** Pixel dimensions used for stored logos (sidebar displays smaller; this keeps bitmap crisp). */
export const LOGO_EXPORT_SIZE = 128;

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('image load failed'));
    img.src = src;
  });
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error('could not encode image'));
      },
      type,
      1,
    );
  });
}

/**
 * Renders the cropped region into a square PNG. Non-square crops are centered on a
 * transparent square so wide or tall marks keep clear margins instead of stretching.
 *
 * @param pixelCrop Crop in **displayed** image pixels (react-image-crop output).
 * @param displayW display width of the {@code <img>} (clientWidth).
 * @param displayH display height of the {@code <img>} (clientHeight).
 */
export async function exportCropToSquarePng(
  imageSrc: string,
  pixelCrop: PixelCrop,
  displayW: number,
  displayH: number,
  outputSize: number = LOGO_EXPORT_SIZE,
): Promise<Blob> {
  const image = await loadImage(imageSrc);
  const naturalW = image.naturalWidth;
  const naturalH = image.naturalHeight;
  const sx = naturalW / displayW;
  const sy = naturalH / displayH;

  const x = pixelCrop.x * sx;
  const y = pixelCrop.y * sy;
  const cw = pixelCrop.width * sx;
  const ch = pixelCrop.height * sy;

  const side = Math.max(cw, ch);
  const canvas = document.createElement('canvas');
  canvas.width = outputSize;
  canvas.height = outputSize;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('canvas unsupported');

  ctx.clearRect(0, 0, outputSize, outputSize);

  const scale = outputSize / side;
  const destW = cw * scale;
  const destH = ch * scale;
  const destX = (outputSize - destW) / 2;
  const destY = (outputSize - destH) / 2;

  ctx.drawImage(image, x, y, cw, ch, destX, destY, destW, destH);

  return canvasToBlob(canvas, 'image/png');
}
