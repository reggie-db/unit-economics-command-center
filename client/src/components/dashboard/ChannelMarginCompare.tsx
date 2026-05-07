import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@databricks/appkit-ui/react';
import type { ChannelMarginCompare as ChannelMarginCompareData } from '@/data/overview';
import { iconFor } from './icon-map';

const USD = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
});

/**
 * Per-category bar pair showing first-party vs third-party contribution per
 * order. The shared bar scale makes the 1P-vs-3P spread instantly readable
 * for the executive audience without a recharts container.
 */
export function ChannelMarginCompare({ data }: { data: ChannelMarginCompareData }) {
  const max = Math.max(...data.categories.flatMap((c) => [c.oneP, c.threeP]));

  return (
    <Card className="flex h-full flex-col gap-1 py-3">
      <CardHeader className="px-4 pb-1">
        <CardTitle className="text-sm font-semibold">{data.title}</CardTitle>
        <CardDescription className="text-[11px] leading-snug">
          {data.subtitle}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 px-4 pb-2">
        <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="size-2 rounded-sm bg-emerald-500" />
            1P
          </span>
          <span className="flex items-center gap-1">
            <span className="size-2 rounded-sm bg-rose-500" />
            3P
          </span>
          <span className="ml-auto">$ / order</span>
        </div>

        {data.categories.map((category) => {
          const Icon = iconFor(category.iconKey);
          const onePPct = (category.oneP / max) * 100;
          const threePPct = (category.threeP / max) * 100;
          return (
            <div key={category.id} className="space-y-0.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex size-5 items-center justify-center rounded-md bg-muted text-muted-foreground">
                    <Icon className="size-3" />
                  </div>
                  <div className="text-xs font-medium">{category.category}</div>
                </div>
                <div className="text-[10px] text-muted-foreground">
                  take rate {category.threePTakeRatePct}%
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-emerald-500"
                    style={{ width: `${onePPct}%` }}
                  />
                </div>
                <span className="w-10 text-right text-[11px] font-semibold tabular-nums text-emerald-700">
                  {USD.format(category.oneP)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-rose-500"
                    style={{ width: `${threePPct}%` }}
                  />
                </div>
                <span className="w-10 text-right text-[11px] font-semibold tabular-nums text-rose-700">
                  {USD.format(category.threeP)}
                </span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
