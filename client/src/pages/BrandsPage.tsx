import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@databricks/appkit-ui/react';
import { ArrowDownRight, ArrowRight, ArrowUpRight, Package } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { BRANDS, type Trend } from '@/data/sections';

const TREND_META: Record<
  Trend,
  { icon: typeof ArrowUpRight; color: string; label: string }
> = {
  up: { icon: ArrowUpRight, color: 'text-emerald-600', label: 'Improving' },
  down: { icon: ArrowDownRight, color: 'text-rose-600', label: 'Compressing' },
  flat: { icon: ArrowRight, color: 'text-muted-foreground', label: 'Steady' },
};

const COMPACT_USD = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
  maximumFractionDigits: 1,
});

export function BrandsPage() {
  const totalStores = BRANDS.reduce((acc, b) => acc + b.stores, 0);
  const totalRevenue = BRANDS.reduce((acc, b) => acc + b.revenueDollars, 0);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Categories"
        description={`${BRANDS.length} merchandise categories, ${totalStores.toLocaleString()} active SKUs, ${COMPACT_USD.format(totalRevenue)} TTM revenue`}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {BRANDS.map((brand) => {
          const meta = TREND_META[brand.marginTrend];
          const TrendIcon = meta.icon;
          return (
            <Card key={brand.id}>
              <CardHeader className="flex flex-row items-start justify-between gap-2">
                <div className="flex items-start gap-3">
                  <div className="flex size-10 items-center justify-center rounded-md bg-muted text-muted-foreground">
                    <Package className="size-4" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{brand.name}</CardTitle>
                    <div className="text-xs text-muted-foreground">{brand.segment}</div>
                  </div>
                </div>
                <Badge variant="outline" className={meta.color}>
                  <TrendIcon className="mr-0.5 size-3" />
                  {meta.label}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
                      SKUs
                    </div>
                    <div className="text-lg font-semibold tabular-nums">{brand.stores}</div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
                      Revenue
                    </div>
                    <div className="text-lg font-semibold tabular-nums">
                      {COMPACT_USD.format(brand.revenueDollars)}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
                      Margin
                    </div>
                    <div className="text-lg font-semibold tabular-nums">
                      {brand.contributionMarginPct.toFixed(1)}%
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{brand.notes}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
