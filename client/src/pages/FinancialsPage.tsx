import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@databricks/appkit-ui/react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { PNL } from '@/data/sections';

const USD = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
  maximumFractionDigits: 1,
});

export function FinancialsPage() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Financials"
        description="P&L summary - May 12 to Jun 8, 2025"
      />

      <Card className="overflow-hidden p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead>Line item</TableHead>
              <TableHead className="text-right">Period amount</TableHead>
              <TableHead className="text-right">Δ vs. prior 4 wks</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {PNL.map((row) => {
              const isPositiveDelta = row.delta >= 0;
              const TrendIcon = isPositiveDelta ? ArrowUpRight : ArrowDownRight;
              const deltaColor = isPositiveDelta ? 'text-emerald-600' : 'text-rose-600';
              return (
                <TableRow
                  key={row.label}
                  className={row.isSubtotal ? 'bg-muted/30 font-semibold' : undefined}
                >
                  <TableCell className={row.isSubtotal ? '' : 'pl-6'}>
                    {row.label}
                  </TableCell>
                  <TableCell
                    className={`text-right tabular-nums ${
                      row.isNegative ? 'text-rose-600' : ''
                    }`}
                  >
                    {USD.format(row.amount)}
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${deltaColor}`}>
                      <TrendIcon className="size-3" />
                      {row.delta.toFixed(1)}%
                    </span>
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
