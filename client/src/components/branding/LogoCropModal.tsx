import {
  useCallback,
  useRef,
  useState,
  type SyntheticEvent,
} from 'react';
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  type Crop,
  type PixelCrop,
} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Button } from '@databricks/appkit-ui/react';
import {
  exportCropToSquarePng,
  LOGO_EXPORT_SIZE,
} from '@/components/branding/logoCropExport';

type LogoCropModalProps = {
  open: boolean;
  imageSrc: string;
  onClose: () => void;
  /** PNG blob; caller uploads or revokes object URLs. */
  onConfirm: (blob: Blob) => void | Promise<void>;
};

function defaultPercentCrop(mediaWidth: number, mediaHeight: number): Crop {
  return centerCrop(
    {
      unit: '%',
      width: 78,
      height: 72,
    },
    mediaWidth,
    mediaHeight,
  );
}

/**
 * Free-form rectangular crop; export centers the selection on a transparent square
 * PNG at {@link LOGO_EXPORT_SIZE}.
 */
export function LogoCropModal({
  open,
  imageSrc,
  onClose,
  onConfirm,
}: LogoCropModalProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const [busy, setBusy] = useState(false);

  const onImageLoad = useCallback((e: SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const next = defaultPercentCrop(width, height);
    setCrop(next);
    setCompletedCrop(convertToPixelCrop(next, width, height));
  }, []);

  const handleConfirm = useCallback(async () => {
    const img = imgRef.current;
    const c = completedCrop;
    if (!img || !c?.width || !c?.height) return;
    setBusy(true);
    try {
      const blob = await exportCropToSquarePng(
        imageSrc,
        c,
        img.width,
        img.height,
      );
      await onConfirm(blob);
      onClose();
    } finally {
      setBusy(false);
    }
  }, [imageSrc, onClose, onConfirm, completedCrop]);

  if (!open || !imageSrc) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="logo-crop-title"
    >
      <div className="flex max-h-[90vh] w-full max-w-lg flex-col gap-4 overflow-y-auto rounded-lg border bg-card p-4 shadow-lg">
        <div>
          <h2 id="logo-crop-title" className="text-base font-semibold">
            Crop logo
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Drag the handles to choose the region. The saved image is a{' '}
            {LOGO_EXPORT_SIZE}×{LOGO_EXPORT_SIZE} square; extra space stays transparent
            when your crop is not square.
          </p>
        </div>

        <div className="max-h-[min(50vh,320px)] w-full overflow-auto rounded-md bg-muted">
          <ReactCrop
            crop={crop}
            onChange={(pixelCrop, percentCrop) => {
              setCrop(percentCrop);
              setCompletedCrop(pixelCrop);
            }}
            onComplete={(c) => setCompletedCrop(c)}
          >
            <img
              ref={imgRef}
              alt=""
              src={imageSrc}
              className="max-h-[min(50vh,320px)] w-auto max-w-full object-contain"
              onLoad={onImageLoad}
            />
          </ReactCrop>
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose} disabled={busy}>
            Cancel
          </Button>
          <Button
            type="button"
            onClick={() => void handleConfirm()}
            disabled={busy || !completedCrop?.width}
          >
            {busy ? 'Saving…' : 'Use crop'}
          </Button>
        </div>
      </div>
    </div>
  );
}
