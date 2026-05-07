import { useState } from 'react';
import {
  Badge,
  Button,
  Card,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@databricks/appkit-ui/react';
import { CheckCircle2, Loader2, Play, XCircle } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { WORKFLOWS, type Workflow } from '@/data/sections';

const STATUS_META: Record<
  Workflow['status'],
  { icon: typeof CheckCircle2; className: string; label: string }
> = {
  success: { icon: CheckCircle2, className: 'text-emerald-600', label: 'Success' },
  running: { icon: Loader2, className: 'text-sky-600 animate-spin', label: 'Running' },
  failed: { icon: XCircle, className: 'text-rose-600', label: 'Failed' },
};

export function WorkflowsPage() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(WORKFLOWS.map((w) => [w.id, w.enabled])),
  );

  return (
    <div className="space-y-5">
      <PageHeader
        title="Workflows"
        description={`${WORKFLOWS.length} automations running on Lakeflow & Foundation Model APIs`}
        showFilters={false}
        actions={
          <Button size="sm">
            <Play className="size-3.5" />
            New workflow
          </Button>
        }
      />

      <Card className="overflow-hidden p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead>Workflow</TableHead>
              <TableHead>Cadence</TableHead>
              <TableHead>Last run</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Enabled</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {WORKFLOWS.map((wf) => {
              const meta = STATUS_META[wf.status];
              const Icon = meta.icon;
              return (
                <TableRow key={wf.id}>
                  <TableCell>
                    <div className="font-medium">{wf.name}</div>
                    <div className="text-xs text-muted-foreground">{wf.description}</div>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{wf.cadence}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {wf.lastRunRelative}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="gap-1">
                      <Icon className={`size-3 ${meta.className}`} />
                      {meta.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Switch
                      checked={enabled[wf.id]}
                      onCheckedChange={(v) => setEnabled((prev) => ({ ...prev, [wf.id]: v }))}
                    />
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
