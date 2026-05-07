import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@databricks/appkit-ui/react';
import { Info } from 'lucide-react';
import type { DriverAnalysis as DriverAnalysisData, DriverItem } from '@/data/overview';
import { iconFor } from './icon-map';

function DriverBar({ driver }: { driver: DriverItem }) {
  const { rangeMin, rangeMax, deltaValue } = driver;
  const total = rangeMax - rangeMin;
  const zeroPct = ((0 - rangeMin) / total) * 100;
  const valuePct = (Math.abs(deltaValue) / total) * 100;
  const isNegative = deltaValue < 0;
  const barColor = isNegative ? 'bg-rose-500' : 'bg-emerald-500';
  const Icon = iconFor(driver.iconKey);

  const stepCount = 5;
  const ticks = Array.from({ length: stepCount }, (_, i) => {
    const v = rangeMin + (total * i) / (stepCount - 1);
    return Number.isInteger(v) ? `${v}` : v.toFixed(1);
  });

  return (
    <div className="grid grid-cols-[1fr_2fr_1fr] items-center gap-3 py-1.5">
      <div className="flex items-start gap-2">
        <div className="mt-0.5 flex size-6 items-center justify-center rounded-md bg-muted text-muted-foreground">
          <Icon className="size-3" />
        </div>
        <div className="min-w-0">
          <div className="truncate text-xs font-medium">{driver.label}</div>
          <div className="text-[10px] text-muted-foreground">{driver.unit}</div>
        </div>
      </div>

      <div>
        <div className="mb-0.5 flex justify-end">
          <span
            className={`text-[11px] font-semibold ${
              isNegative ? 'text-rose-600' : 'text-emerald-600'
            }`}
          >
            {driver.deltaLabel}
          </span>
        </div>
        <div className="relative h-1.5 rounded-full bg-muted">
          <div
            className="absolute top-0 h-full w-px bg-border"
            style={{ left: `${zeroPct}%` }}
          />
          <div
            className={`absolute top-0 h-full rounded-full ${barColor}`}
            style={{
              left: isNegative ? `${zeroPct - valuePct}%` : `${zeroPct}%`,
              width: `${valuePct}%`,
            }}
          />
        </div>
        <div className="mt-0.5 flex justify-between text-[8px] text-muted-foreground/70">
          {ticks.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>

      <div className="text-right text-[10px] leading-tight text-muted-foreground">
        {driver.description}
      </div>
    </div>
  );
}

export function DriverAnalysis({ data }: { data: DriverAnalysisData }) {
  return (
    <Card className="flex h-full flex-col gap-1 py-3">
      <CardHeader className="px-4 pb-1">
        <CardTitle className="flex items-center gap-1.5 text-sm font-semibold">
          Driver Analysis
          <Info className="size-3.5 text-muted-foreground" />
        </CardTitle>
        <div className="text-[11px] text-muted-foreground">
          {data.regionLabel} {data.periodLabel}
        </div>
      </CardHeader>
      <CardContent className="space-y-0 divide-y divide-border/60 px-4 pb-1">
        {data.drivers.map((driver) => (
          <DriverBar key={driver.id} driver={driver} />
        ))}
      </CardContent>
    </Card>
  );
}
