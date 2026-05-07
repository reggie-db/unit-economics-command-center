import { useState } from 'react';
import {
  Badge,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsList,
  TabsTrigger,
} from '@databricks/appkit-ui/react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { STORES, type Store } from '@/data/sections';

const STATUS_BADGE: Record<Store['status'], { label: string; className: string }> = {
  top_performer: { label: 'Top performer', className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' },
  on_track: { label: 'On track', className: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300' },
  watch: { label: 'Watch', className: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' },
  escalation: { label: 'Escalation', className: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300' },
};

type ViewMode = 'all' | 'top' | 'bottom';

export function StoresPage() {
  const [view, setView] = useState<ViewMode>('all');

  const visible = (() => {
    if (view === 'top') {
      return [...STORES]
        .sort((a, b) => b.contributionMarginPct - a.contributionMarginPct)
        .slice(0, 5);
    }
    if (view === 'bottom') {
      return [...STORES]
        .sort((a, b) => a.contributionMarginPct - b.contributionMarginPct)
        .slice(0, 5);
    }
    return STORES;
  })();

  return (
    <div className="space-y-5">
      <PageHeader
        title="Stores"
        description="Store-level contribution margin and variance vs. plan"
      />

      <Card className="gap-3 p-4">
        <Tabs value={view} onValueChange={(v) => setView(v as ViewMode)}>
          <TabsList>
            <TabsTrigger value="all">All stores</TabsTrigger>
            <TabsTrigger value="top">Top 5 performers</TabsTrigger>
            <TabsTrigger value="bottom">Bottom 5 performers</TabsTrigger>
          </TabsList>
        </Tabs>
      </Card>

      <Card className="overflow-hidden p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead>Store</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Market</TableHead>
              <TableHead className="text-right">Contribution Margin</TableHead>
              <TableHead className="text-right">vs. Prior 4 Wks</TableHead>
              <TableHead className="text-right">vs. Plan</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visible.map((s) => {
              const isUp = s.contributionMarginChangePp >= 0;
              const TrendIcon = isUp ? ArrowUpRight : ArrowDownRight;
              const trendColor = isUp ? 'text-emerald-600' : 'text-rose-600';
              const status = STATUS_BADGE[s.status];
              const varianceColor = s.variancePct >= 0 ? 'text-emerald-600' : 'text-rose-600';
              return (
                <TableRow key={s.id}>
                  <TableCell className="font-medium">{s.storeName}</TableCell>
                  <TableCell className="text-muted-foreground">{s.brand}</TableCell>
                  <TableCell className="text-muted-foreground">{s.market}</TableCell>
                  <TableCell className="text-right tabular-nums">
                    {s.contributionMarginPct.toFixed(1)}%
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${trendColor}`}>
                      <TrendIcon className="size-3" />
                      {s.contributionMarginChangePp.toFixed(1)} pp
                    </span>
                  </TableCell>
                  <TableCell className={`text-right text-xs font-semibold ${varianceColor}`}>
                    {s.variancePct >= 0 ? '+' : ''}
                    {s.variancePct.toFixed(1)} pp
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={status.className}>
                      {status.label}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
