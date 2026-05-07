import { Badge, Card } from '@databricks/appkit-ui/react';
import { AlertTriangle, Info, ShieldAlert } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { ALERTS, type Alert } from '@/data/sections';

const SEVERITY_META: Record<
  Alert['severity'],
  {
    icon: typeof AlertTriangle;
    accent: string;
    iconBg: string;
    badgeClass: string;
    label: string;
  }
> = {
  critical: {
    icon: ShieldAlert,
    accent: 'border-l-rose-500',
    iconBg: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300',
    badgeClass: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300',
    label: 'Critical',
  },
  warning: {
    icon: AlertTriangle,
    accent: 'border-l-amber-500',
    iconBg: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
    badgeClass: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
    label: 'Warning',
  },
  info: {
    icon: Info,
    accent: 'border-l-sky-500',
    iconBg: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300',
    badgeClass: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300',
    label: 'Info',
  },
};

export function AlertsPage() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Alerts"
        description={`${ALERTS.length} active alerts across margin, channel, and pipeline detectors`}
      />

      <div className="space-y-3">
        {ALERTS.map((alert) => {
          const meta = SEVERITY_META[alert.severity];
          const Icon = meta.icon;
          return (
            <Card key={alert.id} className={`border-l-4 ${meta.accent} py-3`}>
              <div className="flex items-start gap-3 px-4">
                <div
                  className={`flex size-8 shrink-0 items-center justify-center rounded-md ${meta.iconBg}`}
                >
                  <Icon className="size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold">{alert.title}</span>
                    <Badge variant="secondary" className={meta.badgeClass}>
                      {meta.label}
                    </Badge>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">{alert.body}</p>
                </div>
                <div className="text-right text-[11px] text-muted-foreground">
                  <div>{alert.triggeredRelative}</div>
                  <div className="font-medium">{alert.source}</div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
