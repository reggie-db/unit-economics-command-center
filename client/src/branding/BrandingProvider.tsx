import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from 'react';
import { useSearchParams } from 'react-router';
import {
  applyBrandingSnapshotToSearch,
  applyBrandingToDocument,
  brandingEquals,
  parseBrandingSearch,
  type BrandingFromUrl,
} from './branding';

type BrandingContextValue = {
  branding: BrandingFromUrl;
  logoSrc: string | null;
  /** Branding parsed from the URL on first app load (session baseline for Undo). */
  initialBranding: BrandingFromUrl;
  hasBrandingChangesFromInitial: boolean;
  resetBrandingToInitial: () => void;
};

const BrandingContext = createContext<BrandingContextValue | null>(null);

export function BrandingProvider({ children }: { children: ReactNode }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialBrandingRef = useRef<BrandingFromUrl | null>(null);
  if (initialBrandingRef.current === null) {
    initialBrandingRef.current = parseBrandingSearch(searchParams);
  }

  const branding = useMemo(
    () => parseBrandingSearch(searchParams),
    [searchParams],
  );

  const initialBranding = initialBrandingRef.current;

  const hasBrandingChangesFromInitial = useMemo(
    () => !brandingEquals(branding, initialBranding),
    [branding, initialBranding],
  );

  useEffect(() => {
    applyBrandingToDocument(branding);
  }, [branding]);

  const logoSrc = branding.logoHash
    ? `/api/branding/logo/${branding.logoHash}`
    : null;

  const resetBrandingToInitial = useCallback(() => {
    const baseline = initialBrandingRef.current;
    if (!baseline) return;
    setSearchParams(
      (prev) => applyBrandingSnapshotToSearch(prev, baseline),
      { replace: true },
    );
  }, [setSearchParams]);

  const value = useMemo(
    () => ({
      branding,
      logoSrc,
      initialBranding,
      hasBrandingChangesFromInitial,
      resetBrandingToInitial,
    }),
    [
      branding,
      logoSrc,
      initialBranding,
      hasBrandingChangesFromInitial,
      resetBrandingToInitial,
    ],
  );

  return (
    <BrandingContext.Provider value={value}>{children}</BrandingContext.Provider>
  );
}

export function useBranding(): BrandingContextValue {
  const ctx = useContext(BrandingContext);
  if (!ctx) {
    throw new Error('useBranding must be used within BrandingProvider');
  }
  return ctx;
}

export function useBrandingOptional(): BrandingContextValue | null {
  return useContext(BrandingContext);
}
