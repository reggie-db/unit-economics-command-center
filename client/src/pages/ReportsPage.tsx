import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@databricks/appkit-ui/react';
import { Download, FileText } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { REPORTS } from '@/data/sections';

export function ReportsPage() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Reports"
        description="Recurring operating reports and digests"
        showFilters={false}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {REPORTS.map((report) => (
          <Card key={report.id}>
            <CardHeader className="flex flex-row items-start justify-between gap-2">
              <div className="flex items-start gap-3">
                <div className="flex size-9 items-center justify-center rounded-md bg-muted text-muted-foreground">
                  <FileText className="size-4" />
                </div>
                <div>
                  <CardTitle className="text-sm">{report.name}</CardTitle>
                  <div className="text-xs text-muted-foreground">
                    {report.cadence} - {report.owner}
                  </div>
                </div>
              </div>
              <Badge variant="outline">{report.format}</Badge>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p className="text-xs text-muted-foreground">{report.description}</p>
              <div className="flex justify-end">
                <Button size="sm" variant="outline">
                  <Download className="size-3.5" />
                  Open
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
