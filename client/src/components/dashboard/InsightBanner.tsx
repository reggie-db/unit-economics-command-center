import { Button, Card } from '@databricks/appkit-ui/react';
import { AlertTriangle, ChevronRight } from 'lucide-react';
import type { InsightBanner as InsightBannerData } from '@/data/overview';

export function InsightBanner({ insight }: { insight: InsightBannerData }) {
  return (
    <Card className="border-amber-200 bg-amber-50/50 py-2 dark:border-amber-900/40 dark:bg-amber-950/20">
      <div className="flex items-center justify-between gap-3 px-3">
        <div className="flex items-start gap-2">
          <div className="mt-0.5 flex size-6 items-center justify-center rounded-md bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
            <AlertTriangle className="size-3.5" />
          </div>
          <div className="space-y-0.5">
            <div className="text-xs font-semibold leading-tight">{insight.title}</div>
            <div className="text-[11px] text-muted-foreground leading-snug">
              {insight.body}
            </div>
          </div>
        </div>
        <Button variant="outline" size="sm" className="h-7 shrink-0 text-xs">
          View
          <ChevronRight className="size-3" />
        </Button>
      </div>
    </Card>
  );
}
