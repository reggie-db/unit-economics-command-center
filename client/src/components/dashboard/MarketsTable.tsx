import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@databricks/appkit-ui/react';
import type { MarketRow } from '@/data/overview';
import { Sparkline } from './Sparkline';

const USD_COMPACT = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
  maximumFractionDigits: 1,
});

/**
 * Horizontal bar showing how far a market is from the 60% 1P-share target.
 * The track represents 0-100%, the rule sits at the 60% target line, and the
 * fill is colored against the bucket the market falls into.
 */
function ShareBar({ pct }: { pct: number }) {
  const target = 60;
  const targetPct = target;
  const barColor =
    pct >= 60
      ? 'bg-emerald-500'
      : pct >= 45
        ? 'bg-emerald-400'
        : pct >= 30
          ? 'bg-amber-500'
          : 'bg-rose-500';

  return (
    <div className="flex items-center gap-2">
      <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-muted">
        <div
          className={`absolute left-0 top-0 h-full ${barColor}`}
          style={{ width: `${Math.min(pct, 100)}%` }}
        />
        <div
          className="absolute top-[-2px] h-[calc(100%+4px)] w-px bg-foreground/30"
          style={{ left: `${targetPct}%` }}
        />
      </div>
      <span className="w-12 text-right text-xs font-semibold tabular-nums">
        {pct.toFixed(1)}%
      </span>
    </div>
  );
}

/**
 * Markets ranked by margin lift available if 1P share rises by +10 pp. The
 * recommended lever in the final column is the single action a regional
 * manager should pull next to capture that lift.
 */
export function MarketsTable({ markets }: { markets: MarketRow[] }) {
  return (
    <Card className="overflow-hidden p-0">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40 hover:bg-muted/40">
            <TableHead className="h-7 w-8 px-2 text-[10px] uppercase tracking-wide text-muted-foreground">
              #
            </TableHead>
            <TableHead className="h-7 px-2 text-[10px] uppercase tracking-wide text-muted-foreground">
              Market
            </TableHead>
            <TableHead className="h-7 px-2 text-[10px] uppercase tracking-wide text-muted-foreground">
              1P Share
            </TableHead>
            <TableHead className="h-7 px-2 text-[10px] uppercase tracking-wide text-muted-foreground">
              Trend
            </TableHead>
            <TableHead className="h-7 px-2 text-right text-[10px] uppercase tracking-wide text-muted-foreground">
              Lift @ +10pp
            </TableHead>
            <TableHead className="h-7 px-2 text-[10px] uppercase tracking-wide text-muted-foreground">
              Recommended Lever
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {markets.map((row) => {
            const trend =
              row.onePShareSparkline.at(-1)! >= row.onePShareSparkline[0] ? 'up' : 'down';
            return (
              <TableRow key={row.market}>
                <TableCell className="px-2 py-1 text-[11px] text-muted-foreground">
                  {row.rank}
                </TableCell>
                <TableCell className="px-2 py-1 text-xs font-medium">
                  {row.market}
                </TableCell>
                <TableCell className="w-44 px-2 py-1">
                  <ShareBar pct={row.onePSharePct} />
                </TableCell>
                <TableCell className="w-24 px-2 py-1">
                  <div className="h-6 w-20">
                    <Sparkline data={row.onePShareSparkline} trend={trend} height={24} />
                  </div>
                </TableCell>
                <TableCell className="px-2 py-1 text-right text-[11px] font-semibold tabular-nums text-emerald-700">
                  +{USD_COMPACT.format(row.marginLiftAtPlus10)}
                </TableCell>
                <TableCell className="px-2 py-1 text-[11px] text-muted-foreground">
                  {row.recommendedLever}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
}
