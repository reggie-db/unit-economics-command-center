import { Button } from '@databricks/appkit-ui/react';
import { Calendar, ChevronDown, Filter } from 'lucide-react';
import type { ReactNode } from 'react';

type PageHeaderProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
  showFilters?: boolean;
};

export function PageHeader({
  title,
  description,
  actions,
  showFilters = true,
}: PageHeaderProps) {
  return (
    <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <div className="min-w-0">
        <h1 className="truncate text-base font-semibold tracking-tight md:text-lg">
          {title}
        </h1>
        {description ? (
          <p className="text-xs text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {showFilters || actions ? (
        <div className="flex flex-wrap items-center gap-2">
          {showFilters ? (
            <>
              <Button variant="outline" size="sm" className="h-7 gap-2 text-xs">
                <Calendar className="size-3.5" />
                May 12 - Jun 8, 2025
                <ChevronDown className="size-3 text-muted-foreground" />
              </Button>
              <Button variant="outline" size="sm" className="h-7 gap-2 text-xs">
                <Filter className="size-3.5" />
                Filters
              </Button>
            </>
          ) : null}
          {actions}
        </div>
      ) : null}
    </header>
  );
}
