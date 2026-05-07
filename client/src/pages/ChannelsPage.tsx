import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Progress,
} from '@databricks/appkit-ui/react';
import { ArrowDownRight, ArrowUpRight, Smartphone, Truck } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { CHANNELS } from '@/data/sections';

const USD = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
});

export function ChannelsPage() {
  const totalShare = CHANNELS.reduce((acc, c) => acc + c.sharePct, 0);
  const oneP = CHANNELS.find((c) => c.id === 'delivery_1p');
  const threeP = CHANNELS.find((c) => c.id === 'delivery_3p');

  return (
    <div className="space-y-5">
      <PageHeader
        title="1P vs 3P channels"
        description="Native app + curbside vs. third-party marketplaces"
      />

      {oneP && threeP ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card className="border-emerald-200/60 bg-emerald-50/30 dark:bg-emerald-950/10">
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-md bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                <Smartphone className="size-5" />
              </div>
              <div>
                <CardTitle className="text-base">{oneP.channel}</CardTitle>
                <div className="text-xs text-muted-foreground">
                  {oneP.sharePct.toFixed(1)}% of orders
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold tabular-nums text-emerald-700 dark:text-emerald-200">
                {USD.format(oneP.contributionPerOrder)}
              </div>
              <div className="text-xs text-muted-foreground">contribution per order</div>
              <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-emerald-700">
                <ArrowUpRight className="size-3" />
                {oneP.changePp.toFixed(1)} pp vs. prior 4 wks
              </div>
            </CardContent>
          </Card>

          <Card className="border-rose-200/60 bg-rose-50/30 dark:bg-rose-950/10">
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-md bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300">
                <Truck className="size-5" />
              </div>
              <div>
                <CardTitle className="text-base">{threeP.channel}</CardTitle>
                <div className="text-xs text-muted-foreground">
                  {threeP.sharePct.toFixed(1)}% of orders
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold tabular-nums text-rose-700 dark:text-rose-200">
                {USD.format(threeP.contributionPerOrder)}
              </div>
              <div className="text-xs text-muted-foreground">
                contribution per order after marketplace take rate
              </div>
              <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-rose-700">
                <ArrowDownRight className="size-3" />
                {threeP.changePp.toFixed(1)} pp vs. prior 4 wks
              </div>
            </CardContent>
          </Card>
        </div>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Channel mix - share of all orders</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {CHANNELS.map((channel) => {
            const isUp = channel.trend === 'up';
            const TrendIcon = isUp ? ArrowUpRight : ArrowDownRight;
            const trendColor = isUp ? 'text-emerald-600' : 'text-rose-600';
            return (
              <div key={channel.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{channel.channel}</span>
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${trendColor}`}>
                      <TrendIcon className="size-3" />
                      {channel.changePp.toFixed(1)} pp
                    </span>
                    <span className="w-12 text-right tabular-nums">
                      {channel.sharePct.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <Progress value={(channel.sharePct / totalShare) * 100} />
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Contribution per order by channel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
            {CHANNELS.map((channel) => (
              <div key={channel.id} className="rounded-md border p-3">
                <div className="text-xs text-muted-foreground">{channel.channel}</div>
                <div className="mt-1 text-2xl font-semibold tabular-nums">
                  {USD.format(channel.contributionPerOrder)}
                </div>
                <div className="mt-1 text-[11px] text-muted-foreground">
                  {channel.sharePct.toFixed(1)}% of orders
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
