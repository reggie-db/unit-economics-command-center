import { useMemo, useState } from 'react';
import {
  Badge,
  Card,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@databricks/appkit-ui/react';
import { ArrowDownRight, ArrowUpRight, Search } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { MARKETS, type MarketDetail } from '@/data/sections';

const STATUS_BADGE: Record<MarketDetail['status'], { label: string; className: string }> = {
  on_track: { label: 'On track', className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' },
  watch: { label: 'Watch', className: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' },
  at_risk: { label: 'At risk', className: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300' },
};

const REGIONS = ['All regions', 'Southeast', 'Southwest', 'West', 'Midwest', 'Northeast'];

export function MarketsPage() {
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState(REGIONS[0]);

  const filtered = useMemo(() => {
    return MARKETS.filter((m) => {
      const matchesRegion = region === REGIONS[0] || m.region === region;
      const matchesSearch = m.market.toLowerCase().includes(search.toLowerCase());
      return matchesRegion && matchesSearch;
    });
  }, [search, region]);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Markets"
        description={`${MARKETS.length} markets across ${new Set(MARKETS.map((m) => m.region)).size} regions`}
      />

      <Card className="gap-3 p-4">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="pointer-events-none absolute left-2 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search markets"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 pl-7"
            />
          </div>
          <Select value={region} onValueChange={setRegion}>
            <SelectTrigger size="sm" className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {REGIONS.map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="ml-auto text-xs text-muted-foreground">
            Showing {filtered.length} of {MARKETS.length}
          </span>
        </div>
      </Card>

      <Card className="overflow-hidden p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead>Market</TableHead>
              <TableHead>Region</TableHead>
              <TableHead className="text-right">Stores</TableHead>
              <TableHead className="text-right">Contribution Margin</TableHead>
              <TableHead className="text-right">vs. Prior 4 Wks</TableHead>
              <TableHead className="text-right">1P Share</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((m) => {
              const isUp = m.contributionMarginChangePp >= 0;
              const TrendIcon = isUp ? ArrowUpRight : ArrowDownRight;
              const trendColor = isUp ? 'text-emerald-600' : 'text-rose-600';
              const status = STATUS_BADGE[m.status];
              return (
                <TableRow key={m.id}>
                  <TableCell className="font-medium">{m.market}</TableCell>
                  <TableCell className="text-muted-foreground">{m.region}</TableCell>
                  <TableCell className="text-right tabular-nums">{m.stores}</TableCell>
                  <TableCell className="text-right tabular-nums">
                    {m.contributionMarginPct.toFixed(1)}%
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${trendColor}`}>
                      <TrendIcon className="size-3" />
                      {m.contributionMarginChangePp.toFixed(1)} pp
                    </span>
                  </TableCell>
                  <TableCell className="text-right tabular-nums text-xs">
                    {m.onePSharePct.toFixed(1)}%
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
