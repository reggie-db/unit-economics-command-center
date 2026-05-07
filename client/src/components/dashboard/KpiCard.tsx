import { Card, CardContent } from '@databricks/appkit-ui/react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import type { KpiCard as KpiCardData } from '@/data/overview';
import { iconFor } from './icon-map';
import { Sparkline } from './Sparkline';

export function KpiCard({ kpi }: { kpi: KpiCardData }) {
  const Icon = iconFor(kpi.iconKey);
  const isUp = kpi.deltaTrend === 'up';
  const TrendIcon = isUp ? ArrowUpRight : ArrowDownRight;
  const trendColor = isUp ? 'text-emerald-600' : 'text-rose-600';

  return (
    <Card className="gap-1 py-2.5">
      <CardContent className="space-y-1 px-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex size-6 items-center justify-center rounded-md bg-muted text-muted-foreground">
            <Icon className="size-3.5" />
          </div>
          <div className="flex-1 text-right">
            <div className="text-[10px] font-medium text-muted-foreground">
              {kpi.label}
            </div>
            <div className="text-lg font-semibold tabular-nums leading-tight">
              {kpi.value}
            </div>
          </div>
        </div>
        {kpi.subLabel ? (
          <div className="text-right text-[10px] text-muted-foreground">
            {kpi.subLabel}
          </div>
        ) : null}
        <div className={`flex items-center gap-1 text-[10px] font-medium ${trendColor}`}>
          <TrendIcon className="size-3" />
          <span>{kpi.deltaLabel}</span>
        </div>
        <div className="-mx-1 -mb-1">
          <Sparkline data={kpi.sparkline} trend={kpi.deltaTrend} height={22} />
        </div>
      </CardContent>
    </Card>
  );
}
