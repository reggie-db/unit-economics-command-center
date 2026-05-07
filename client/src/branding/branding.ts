/** Query keys for shareable branding URLs. */

export const BRANDING_QUERY = {
  logo: 'logo',
  primary: 'primary',
  secondary: 'secondary',
  accent: 'accent',
} as const;

export type BrandingQueryKey = (typeof BRANDING_QUERY)[keyof typeof BRANDING_QUERY];

export type BrandingFromUrl = {
  logoHash: string | null;
  primary: string | null;
  secondary: string | null;
  accent: string | null;
};

const INLINE_VARS = [
  '--brand-red',
  '--brand-red-dark',
  '--brand-red-soft',
  '--brand-secondary',
  '--brand-accent',
  '--primary',
  '--ring',
  '--sidebar-primary',
  '--sidebar-ring',
  '--sidebar-accent',
  '--accent',
] as const;

export function normalizeHex(input: string | null | undefined): string | null {
  if (input == null || input === '') return null;
  let s = decodeURIComponent(input.trim());
  if (s.startsWith('#')) s = s.slice(1);
  if (s.length === 3) {
    s = s
      .split('')
      .map((c) => c + c)
      .join('');
  }
  if (!/^[0-9a-fA-F]{6}$/.test(s)) return null;
  return `#${s.toLowerCase()}`;
}

export function parseBrandingSearch(params: URLSearchParams): BrandingFromUrl {
  const logoRaw = params.get(BRANDING_QUERY.logo)?.trim();
  const logoHash =
    logoRaw && /^([a-f0-9]{12}|[a-f0-9]{64})$/i.test(logoRaw)
      ? logoRaw.toLowerCase()
      : null;

  return {
    logoHash,
    primary: normalizeHex(params.get(BRANDING_QUERY.primary)),
    secondary: normalizeHex(params.get(BRANDING_QUERY.secondary)),
    accent: normalizeHex(params.get(BRANDING_QUERY.accent)),
  };
}

function mix(hex: string, other: string, pct: number): string {
  return `color-mix(in srgb, ${hex} ${pct}%, ${other})`;
}

export function applyBrandingToDocument(branding: BrandingFromUrl): void {
  const root = document.documentElement;
  const hasColor = !!(branding.primary || branding.secondary || branding.accent);

  if (!hasColor && !branding.logoHash) {
    INLINE_VARS.forEach((key) => root.style.removeProperty(key));
    return;
  }

  if (!hasColor && branding.logoHash) {
    INLINE_VARS.forEach((key) => root.style.removeProperty(key));
    return;
  }

  const primary = branding.primary ?? '#b91c1c';
  const secondary = branding.secondary ?? mix(primary, '#ffffff', 35);
  const accent = branding.accent ?? mix(primary, '#fbbf24', 50);

  root.style.setProperty('--brand-red', primary);
  root.style.setProperty('--brand-red-dark', mix(primary, '#000000', 22));
  root.style.setProperty('--brand-red-soft', mix(primary, '#ffffff', 92));
  root.style.setProperty('--brand-secondary', secondary);
  root.style.setProperty('--brand-accent', accent);

  root.style.setProperty('--primary', primary);
  root.style.setProperty('--ring', primary);
  root.style.setProperty('--sidebar-primary', primary);
  root.style.setProperty('--sidebar-ring', primary);
  root.style.setProperty('--sidebar-accent', mix(secondary, '#ffffff', 88));
  root.style.setProperty('--accent', mix(accent, '#ffffff', 85));
}

export function buildBrandingSearchParams(args: {
  logo?: string | null;
  primary?: string | null;
  secondary?: string | null;
  accent?: string | null;
}): URLSearchParams {
  const p = new URLSearchParams();
  if (args.logo) p.set(BRANDING_QUERY.logo, args.logo);
  if (args.primary) p.set(BRANDING_QUERY.primary, args.primary.replace(/^#/, ''));
  if (args.secondary) p.set(BRANDING_QUERY.secondary, args.secondary.replace(/^#/, ''));
  if (args.accent) p.set(BRANDING_QUERY.accent, args.accent.replace(/^#/, ''));
  return p;
}

/** Whether two parsed branding snapshots match (shareable URL equality). */
export function brandingEquals(a: BrandingFromUrl, b: BrandingFromUrl): boolean {
  return (
    a.logoHash === b.logoHash &&
    a.primary === b.primary &&
    a.secondary === b.secondary &&
    a.accent === b.accent
  );
}

/**
 * Replaces branding-related query keys with the given snapshot while preserving
 * all other search params (e.g. future filters).
 */
export function applyBrandingSnapshotToSearch(
  current: URLSearchParams,
  snapshot: BrandingFromUrl,
): URLSearchParams {
  const next = new URLSearchParams(current);
  Object.values(BRANDING_QUERY).forEach((key) => next.delete(key));
  const built = buildBrandingSearchParams({
    logo: snapshot.logoHash ?? undefined,
    primary: snapshot.primary ?? undefined,
    secondary: snapshot.secondary ?? undefined,
    accent: snapshot.accent ?? undefined,
  });
  built.forEach((v, k) => next.set(k, v));
  return next;
}

/**
 * Merges a partial branding update into the current URL search params.
 * Pass `null` for a field to remove it from the URL (e.g. clear optional colors).
 */
export function patchBrandingInSearch(
  current: URLSearchParams,
  patch: Partial<Record<keyof BrandingFromUrl, string | null>>,
): URLSearchParams {
  const merged = parseBrandingSearch(current);
  const snapshot: BrandingFromUrl = {
    logoHash: patch.logoHash !== undefined ? patch.logoHash : merged.logoHash,
    primary: patch.primary !== undefined ? patch.primary : merged.primary,
    secondary: patch.secondary !== undefined ? patch.secondary : merged.secondary,
    accent: patch.accent !== undefined ? patch.accent : merged.accent,
  };
  return applyBrandingSnapshotToSearch(current, snapshot);
}
