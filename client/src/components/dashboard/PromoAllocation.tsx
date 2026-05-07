import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@databricks/appkit-ui/react';
import { ArrowRight } from 'lucide-react';
import type { PromoAllocation as PromoAllocationData } from '@/data/overview';

const USD_COMPACT = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
  maximumFractionDigits: 1,
});

function AllocationBar({
  label,
  onePPct,
  threePPct,
  emphasis,
}: {
  label: string;
  onePPct: number;
  threePPct: number;
  emphasis: 'current' | 'recommended';
}) {
  const isRecommended = emphasis === 'recommended';
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between gap-2">
        <div className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </div>
        <div className="text-[10px] text-muted-foreground">
          1P {onePPct}% / 3P {threePPct}%
        </div>
      </div>
      <div
        className={`flex h-5 w-full overflow-hidden rounded-md border ${
          isRecommended ? 'border-emerald-300/70' : 'border-border'
        }`}
      >
        <div
          className={`flex items-center justify-end px-2 text-[11px] font-semibold text-white ${
            isRecommended ? 'bg-emerald-500' : 'bg-emerald-500/70'
          }`}
          style={{ width: `${onePPct}%` }}
        >
          {onePPct >= 18 ? '1P' : ''}
        </div>
        <div
          className={`flex items-center justify-start px-2 text-[11px] font-semibold text-white ${
            isRecommended ? 'bg-rose-500' : 'bg-rose-500/70'
          }`}
          style={{ width: `${threePPct}%` }}
        >
          {threePPct >= 18 ? '3P' : ''}
        </div>
      </div>
    </div>
  );
}

/**
 * Compares the current vs recommended split of the monthly promotional budget
 * between first-party and third-party channels and surfaces the modeled
 * annualized contribution lift if the recommendation is adopted.
 */
export function PromoAllocation({ data }: { data: PromoAllocationData }) {
  return (
    <Card className="flex h-full flex-col gap-1 py-3">
      <CardHeader className="px-4 pb-1">
        <CardTitle className="text-sm font-semibold">{data.title}</CardTitle>
        <CardDescription className="text-[11px] leading-snug">
          {data.subtitle}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-2 px-4 pb-2">
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-md border bg-muted/30 px-2 py-1">
            <div className="text-[10px] text-muted-foreground">Monthly budget</div>
            <div className="text-sm font-semibold tabular-nums">
              {USD_COMPACT.format(data.monthlyBudgetUsd)}
            </div>
          </div>
          <div className="rounded-md border border-emerald-300/60 bg-emerald-50/60 px-2 py-1 dark:bg-emerald-950/20">
            <div className="text-[10px] text-emerald-700/80 dark:text-emerald-300/80">
              Annual lift
            </div>
            <div className="text-sm font-semibold tabular-nums text-emerald-700 dark:text-emerald-200">
              +{USD_COMPACT.format(data.estAnnualLiftUsd)}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <AllocationBar
            label="Today"
            onePPct={data.current.onePPct}
            threePPct={data.current.threePPct}
            emphasis="current"
          />
          <div className="flex items-center justify-center text-muted-foreground">
            <ArrowRight className="size-3.5" />
          </div>
          <AllocationBar
            label="Recommended"
            onePPct={data.recommended.onePPct}
            threePPct={data.recommended.threePPct}
            emphasis="recommended"
          />
        </div>

        <p className="text-[11px] leading-snug text-muted-foreground">
          {data.rationale}
        </p>
      </CardContent>
    </Card>
  );
}
