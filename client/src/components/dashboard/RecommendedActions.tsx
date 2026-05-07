import { Card } from '@databricks/appkit-ui/react';
import type { RecommendedAction } from '@/data/overview';
import { iconFor } from './icon-map';

const ACCENT: Record<RecommendedAction['accent'], string> = {
  emerald: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  amber: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  sky: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300',
  violet: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300',
};

export function RecommendedActions({ actions }: { actions: RecommendedAction[] }) {
  return (
    <section className="space-y-2">
      <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Recommended actions
      </div>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-4">
        {actions.map((action) => {
          const Icon = iconFor(action.iconKey);
          return (
            <Card key={action.id} className="gap-2 p-3">
              <div className="flex items-start gap-2">
                <div
                  className={`flex size-7 shrink-0 items-center justify-center rounded-md ${ACCENT[action.accent]}`}
                >
                  <Icon className="size-3.5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold leading-tight">
                    {action.title}
                  </div>
                  <div className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
                    {action.description}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
