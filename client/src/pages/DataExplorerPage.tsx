import {
  Badge,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@databricks/appkit-ui/react';
import { Database } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { DATA_ASSETS } from '@/data/sections';

export function DataExplorerPage() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Data Explorer"
        description="Unity Catalog tables backing the command center"
        showFilters={false}
      />

      <Card className="overflow-hidden p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead>Table</TableHead>
              <TableHead>Catalog</TableHead>
              <TableHead>Schema</TableHead>
              <TableHead className="text-right">Rows</TableHead>
              <TableHead>Freshness</TableHead>
              <TableHead>Owner</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {DATA_ASSETS.map((asset) => (
              <TableRow key={asset.id}>
                <TableCell>
                  <div className="flex items-center gap-2 font-medium">
                    <Database className="size-3.5 text-muted-foreground" />
                    {asset.table}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{asset.catalog}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-mono text-[10px]">
                    {asset.schema}
                  </Badge>
                </TableCell>
                <TableCell className="text-right tabular-nums">{asset.rowCount}</TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {asset.freshnessRelative}
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">{asset.owner}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
