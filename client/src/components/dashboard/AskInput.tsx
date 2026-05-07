import { Button, Card, Input } from '@databricks/appkit-ui/react';
import { Send, Sparkles } from 'lucide-react';

const EXAMPLE_QUESTION =
  'Which markets are growing frequency but losing profitability?';

export function AskInput() {
  return (
    <Card className="gap-1 p-2">
      <div className="flex items-center gap-2">
        <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Sparkles className="size-3.5" />
        </div>
        <Input
          defaultValue={EXAMPLE_QUESTION}
          className="h-8 border-0 bg-transparent text-xs shadow-none focus-visible:ring-0"
        />
        <Button size="icon" className="size-7">
          <Send className="size-3.5" />
        </Button>
      </div>
      <div className="pl-9 text-[10px] text-muted-foreground">
        AI insights use governed data. Verify critical decisions.
      </div>
    </Card>
  );
}
