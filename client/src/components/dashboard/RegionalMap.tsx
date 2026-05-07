import 'leaflet/dist/leaflet.css';

import { useEffect } from 'react';
import {
  CircleMarker,
  MapContainer,
  TileLayer,
  Tooltip,
  useMap,
} from 'react-leaflet';
import { Card } from '@databricks/appkit-ui/react';
import type { LatLngBoundsLiteral } from 'leaflet';
import type { MapBucket, RegionalMap as RegionalMapData } from '@/data/overview';

const BUCKET_COLORS: Record<
  MapBucket,
  { fill: string; stroke: string; legend: string }
> = {
  positive_strong: {
    fill: '#10b981',
    stroke: '#047857',
    legend: 'bg-emerald-500',
  },
  positive_mild: {
    fill: '#84cc16',
    stroke: '#4d7c0f',
    legend: 'bg-lime-500',
  },
  negative_mild: {
    fill: '#f59e0b',
    stroke: '#b45309',
    legend: 'bg-amber-500',
  },
  negative_strong: {
    fill: '#f43f5e',
    stroke: '#be123c',
    legend: 'bg-rose-500',
  },
};

// Bounding box wrapping the Southeast bubbles. Leaflet will fit the view
// to this rectangle on first render and the user can pan/zoom from there.
const SOUTHEAST_BOUNDS: LatLngBoundsLiteral = [
  [24.5, -90.5], // SW (south of Miami / west of New Orleans)
  [37.0, -75.0], // NE (north of Nashville / east of Atlantic seaboard)
];

const TILE_URL = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

/**
 * Leaflet reads layout late; after the grid assigns height we invalidate so tiles
 * fill the pane instead of staying at the initial (often zero) size.
 */
function MapResizeSync() {
  const map = useMap();

  useEffect(() => {
    const container = map.getContainer();

    function invalidate(): void {
      map.invalidateSize({ pan: false });
    }

    invalidate();

    const observer = new ResizeObserver(() => invalidate());
    observer.observe(container);

    return () => observer.disconnect();
  }, [map]);

  return null;
}

export function RegionalMap({ map }: { map: RegionalMapData }) {
  return (
    <Card className="relative flex h-full min-h-[200px] flex-col overflow-hidden p-0">
      <div className="relative min-h-0 w-full flex-1">
        <MapContainer
          attributionControl={false}
          bounds={SOUTHEAST_BOUNDS}
          scrollWheelZoom={false}
          className="z-0 block h-full w-full min-h-full rounded-none border-0"
          style={{
            height: '100%',
            width: '100%',
            background: 'var(--muted)',
          }}
        >
          <MapResizeSync />
          <TileLayer url={TILE_URL} attribution="" subdomains="abcd" />
          {map.bubbles.map((bubble) => {
            const colors = BUCKET_COLORS[bubble.bucket];
            return (
              <CircleMarker
                key={bubble.marketId}
                center={[bubble.lat, bubble.lon]}
                radius={bubble.radius / 2}
                pathOptions={{
                  color: colors.stroke,
                  fillColor: colors.fill,
                  fillOpacity: 0.7,
                  weight: 1.5,
                }}
              >
                <Tooltip
                  direction="bottom"
                  offset={[0, bubble.radius / 2]}
                  opacity={1}
                  permanent
                  className="!border-0 !bg-transparent !shadow-none !text-[10px] !font-medium !text-foreground"
                >
                  {bubble.label}
                </Tooltip>
              </CircleMarker>
            );
          })}
        </MapContainer>

        <Card className="pointer-events-none absolute bottom-3 left-3 z-[400] max-w-[210px] gap-1 p-3 text-xs shadow-md">
          <div className="text-[11px] font-semibold">{map.title}</div>
          <ul className="space-y-1">
            {map.legend.map((item) => (
              <li key={item.bucket} className="flex items-center gap-2">
                <span
                  className={`size-2.5 rounded-full ${BUCKET_COLORS[item.bucket].legend}`}
                />
                <span className="text-[10px] text-muted-foreground">
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Card>
  );
}
