import { useMemo, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Separator,
  Switch,
} from '@databricks/appkit-ui/react';
import { RotateCcw } from 'lucide-react';
import { LogoCropModal } from '@/components/branding/LogoCropModal';
import { PageHeader } from '@/components/PageHeader';
import { SETTINGS_GROUPS } from '@/data/sections';
import { useBranding } from '@/branding/BrandingProvider';
import {
  normalizeHex,
  parseBrandingSearch,
  patchBrandingInSearch,
} from '@/branding/branding';

const DEFAULT_PRIMARY = '#b91c1c';

/** Demo settings: toggles plus URL-driven branding (logo upload hash and palette). */
export function SettingsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const {
    hasBrandingChangesFromInitial,
    resetBrandingToInitial,
  } = useBranding();

  const parsed = useMemo(
    () => parseBrandingSearch(searchParams),
    [searchParams],
  );

  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadPending, setUploadPending] = useState(false);
  const [copyDone, setCopyDone] = useState(false);
  const [cropImageSrc, setCropImageSrc] = useState<string | null>(null);

  const primaryDisplay = parsed.primary ?? DEFAULT_PRIMARY;
  const secondaryPickerValue =
    parsed.secondary ?? parsed.primary ?? DEFAULT_PRIMARY;
  const accentPickerValue = parsed.accent ?? parsed.primary ?? DEFAULT_PRIMARY;

  const shareUrl = useMemo(() => {
    const q = searchParams.toString();
    const origin =
      typeof window !== 'undefined' ? window.location.origin : '';
    return `${origin}${location.pathname}${q ? `?${q}` : ''}`;
  }, [location.pathname, searchParams]);

  const [enabled, setEnabled] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    SETTINGS_GROUPS.forEach((group) => {
      group.toggles.forEach((toggle) => {
        initial[`${group.id}:${toggle.id}`] = toggle.enabled;
      });
    });
    return initial;
  });

  function openCropForFile(file: File | undefined): void {
    if (!file) return;
    setUploadError(null);
    setCropImageSrc((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
  }

  function closeCropModal(): void {
    setCropImageSrc((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
  }

  async function uploadLogoBlob(blob: Blob): Promise<void> {
    setUploadError(null);
    setUploadPending(true);
    try {
      const fd = new FormData();
      fd.append('logo', blob, 'logo.png');
      const res = await fetch('/api/branding/upload', {
        method: 'POST',
        body: fd,
      });
      const data = (await res.json()) as { logo?: string; error?: string };
      if (!res.ok) {
        setUploadError(data.error ?? 'Upload failed');
        return;
      }
      const logoHash = data.logo;
      if (logoHash) {
        setSearchParams(
          (prev) => patchBrandingInSearch(prev, { logoHash }),
          { replace: true },
        );
      }
    } catch {
      setUploadError('Upload failed');
    } finally {
      setUploadPending(false);
    }
  }

  function setPrimaryFromPicker(hex: string): void {
    const n = normalizeHex(hex);
    if (!n) return;
    setSearchParams((prev) => patchBrandingInSearch(prev, { primary: n }), {
      replace: true,
    });
  }

  function setSecondaryFromPicker(hex: string): void {
    const n = normalizeHex(hex);
    if (!n) return;
    setSearchParams((prev) => patchBrandingInSearch(prev, { secondary: n }), {
      replace: true,
    });
  }

  function setAccentFromPicker(hex: string): void {
    const n = normalizeHex(hex);
    if (!n) return;
    setSearchParams((prev) => patchBrandingInSearch(prev, { accent: n }), {
      replace: true,
    });
  }

  async function copyShareUrl(): Promise<void> {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopyDone(true);
      window.setTimeout(() => setCopyDone(false), 2000);
    } catch {
      setUploadError('Could not copy to clipboard');
    }
  }

  return (
    <div className="space-y-5">
      <LogoCropModal
        open={cropImageSrc !== null}
        imageSrc={cropImageSrc ?? ''}
        onClose={closeCropModal}
        onConfirm={async (blob) => {
          await uploadLogoBlob(blob);
        }}
      />

      <PageHeader
        title="Settings"
        description="Connections and alerting controls"
        showFilters={false}
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Branding</CardTitle>
          <CardDescription>
            Logo and colors update the URL and the app as you change them. Undo
            restores branding from when you first opened this session.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="text-sm font-medium">Logo</div>
            <div className="flex flex-wrap items-center gap-3">
              <input
                type="file"
                accept="image/png,image/jpeg,image/gif,image/webp"
                disabled={uploadPending}
                className="text-sm file:mr-2 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-primary-foreground"
                onChange={(e) => {
                  openCropForFile(e.target.files?.[0]);
                  e.target.value = '';
                }}
              />
              {uploadPending ? (
                <span className="text-xs text-muted-foreground">Uploading…</span>
              ) : null}
            </div>
            {uploadError ? (
              <p className="text-xs text-destructive">{uploadError}</p>
            ) : null}
            {parsed.logoHash ? (
              <p className="text-xs text-muted-foreground font-mono">
                Logo id: {parsed.logoHash}
              </p>
            ) : null}
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium">Primary</span>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={primaryDisplay}
                  onChange={(e) => setPrimaryFromPicker(e.target.value)}
                  className="h-9 w-14 cursor-pointer rounded border border-input bg-background p-1"
                />
                <span className="text-xs font-mono text-muted-foreground">
                  {primaryDisplay}
                </span>
              </div>
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium">Secondary</span>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={secondaryPickerValue}
                  onChange={(e) => setSecondaryFromPicker(e.target.value)}
                  className="h-9 w-14 cursor-pointer rounded border border-input bg-background p-1"
                />
                <span className="text-xs font-mono text-muted-foreground">
                  {parsed.secondary ? parsed.secondary : '(default mix)'}
                </span>
              </div>
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium">Accent</span>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={accentPickerValue}
                  onChange={(e) => setAccentFromPicker(e.target.value)}
                  className="h-9 w-14 cursor-pointer rounded border border-input bg-background p-1"
                />
                <span className="text-xs font-mono text-muted-foreground">
                  {parsed.accent ? parsed.accent : '(default mix)'}
                </span>
              </div>
            </label>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={!hasBrandingChangesFromInitial}
              onClick={() => resetBrandingToInitial()}
              className="gap-2"
            >
              <RotateCcw className="size-3.5" />
              Undo branding
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => void copyShareUrl()}
            >
              {copyDone ? 'Copied' : 'Copy share link'}
            </Button>
          </div>

          <div className="rounded-md border bg-muted/40 px-3 py-2">
            <div className="text-xs font-medium text-muted-foreground">
              Current URL
            </div>
            <p className="mt-1 break-all font-mono text-xs">{shareUrl}</p>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {SETTINGS_GROUPS.map((group) => (
          <Card key={group.id}>
            <CardHeader>
              <CardTitle className="text-base">{group.title}</CardTitle>
              <CardDescription>{group.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {group.toggles.map((toggle, idx) => {
                const key = `${group.id}:${toggle.id}`;
                return (
                  <div key={toggle.id}>
                    {idx > 0 ? <Separator className="mb-3" /> : null}
                    <div className="flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <div className="text-sm font-medium">{toggle.label}</div>
                        <div className="text-xs text-muted-foreground">
                          {toggle.description}
                        </div>
                      </div>
                      <Switch
                        checked={enabled[key]}
                        onCheckedChange={(v) =>
                          setEnabled((prev) => ({ ...prev, [key]: v }))
                        }
                      />
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
