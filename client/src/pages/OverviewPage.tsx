import { Button } from '@databricks/appkit-ui/react';
import { Calendar, ChevronDown, Filter } from 'lucide-react';
import { OVERVIEW } from '@/data/overview';
import { PageHeader } from '@/components/PageHeader';
import { KpiCard } from '@/components/dashboard/KpiCard';
import { InsightBanner } from '@/components/dashboard/InsightBanner';
import { RegionalMap } from '@/components/dashboard/RegionalMap';
import { DriverAnalysis } from '@/components/dashboard/DriverAnalysis';
import { MarketsTable } from '@/components/dashboard/MarketsTable';
import { AskInput } from '@/components/dashboard/AskInput';
import { RecommendedActions } from '@/components/dashboard/RecommendedActions';
import { ChannelMarginCompare } from '@/components/dashboard/ChannelMarginCompare';
import { PromoAllocation } from '@/components/dashboard/PromoAllocation';
import { Expandable } from '@/components/dashboard/Expandable';

export function OverviewPage() {
  const data = OVERVIEW;

  return (
    <div className="space-y-3">
      <PageHeader
        title="Unit Economics Command Center"
        description="Defend convenience-store margins by shifting orders from 3P marketplaces to the native app"
        showFilters={false}
        actions={
          <>
            <Button variant="outline" size="sm" className="h-7 gap-2 text-xs">
              <Calendar className="size-3.5" />
              {data.periodLabel}
              <ChevronDown className="size-3 text-muted-foreground" />
            </Button>
            <Button variant="outline" size="sm" className="h-7 gap-2 text-xs">
              {data.comparisonLabel}
              <ChevronDown className="size-3 text-muted-foreground" />
            </Button>
            <Button variant="outline" size="sm" className="h-7 gap-2 text-xs">
              <Filter className="size-3.5" />
              Filters
            </Button>
          </>
        }
      />

      <section className="grid grid-cols-2 gap-2 md:grid-cols-3 xl:grid-cols-6">
        {data.kpis.map((kpi) => (
          <KpiCard key={kpi.id} kpi={kpi} />
        ))}
      </section>

      <InsightBanner insight={data.insight} />

      <section className="grid grid-cols-1 items-stretch gap-3 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <Expandable title="1P share of delivery orders">
          <RegionalMap map={data.regionalMap} />
        </Expandable>
        <Expandable
          title="Driver analysis"
          description={`${data.driverAnalysis.regionLabel} ${data.driverAnalysis.periodLabel}`}
        >
          <DriverAnalysis data={data.driverAnalysis} />
        </Expandable>
      </section>

      <section className="grid grid-cols-1 items-stretch gap-3 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <Expandable
          title={data.channelMargin.title}
          description={data.channelMargin.subtitle}
        >
          <ChannelMarginCompare data={data.channelMargin} />
        </Expandable>
        <Expandable
          title={data.promoAllocation.title}
          description={data.promoAllocation.subtitle}
        >
          <PromoAllocation data={data.promoAllocation} />
        </Expandable>
      </section>

      <section className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <AskInput />
        <Expandable title="Markets ranked by margin lift opportunity">
          <MarketsTable markets={data.markets} />
        </Expandable>
      </section>

      <RecommendedActions actions={data.recommendedActions} />
    </div>
  );
}
