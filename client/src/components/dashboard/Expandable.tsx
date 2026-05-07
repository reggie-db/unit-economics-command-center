import { useState, type ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@databricks/appkit-ui/react';
import { Maximize2 } from 'lucide-react';

type ExpandableProps = {
  /** Title shown inside the expanded dialog. */
  title: string;
  /** Optional description shown beneath the title in the dialog. */
  description?: string;
  /**
   * Widget content. The same JSX is rendered inline (in the host card) and,
   * when expanded, again inside the dialog. The expanded copy only mounts
   * while the dialog is open so heavy children (e.g. Leaflet) don't run
   * twice in the background.
   */
  children: ReactNode;
  /** Optional override for the floating expand button position. */
  buttonPosition?: 'top-right' | 'top-left';
};

/**
 * Wraps a dashboard widget so the user can click the floating maximize button
 * to view the same widget content at full dialog size. The wrapper itself
 * adds no card chrome - it just overlays a button on top of whatever the
 * caller renders. Place it directly around the widget root that already has
 * a relative or card-shaped container.
 */
export function Expandable({
  title,
  description,
  children,
  buttonPosition = 'top-right',
}: ExpandableProps) {
  const [open, setOpen] = useState(false);

  const positionClass =
    buttonPosition === 'top-right'
      ? 'right-2 top-2'
      : 'left-2 top-2';

  return (
    <div className="relative h-full">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Expand ${title}`}
        className={`absolute z-20 inline-flex size-7 items-center justify-center rounded-md bg-background/70 text-muted-foreground backdrop-blur-sm transition hover:bg-muted hover:text-foreground ${positionClass}`}
      >
        <Maximize2 className="size-3.5" />
      </button>

      {children}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex h-[88vh] max-h-[88vh] w-[min(1180px,95vw)] max-w-[min(1180px,95vw)] flex-col gap-3 p-4 sm:p-6">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle className="text-base">{title}</DialogTitle>
            {description ? (
              <DialogDescription className="text-xs">{description}</DialogDescription>
            ) : null}
          </DialogHeader>
          <div className="flex min-h-0 flex-1 flex-col overflow-auto">
            {open ? children : null}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
