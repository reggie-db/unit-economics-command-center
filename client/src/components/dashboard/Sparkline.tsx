import { Area, AreaChart, ResponsiveContainer } from 'recharts';

type SparklineProps = {
  data: number[];
  trend: 'up' | 'down' | 'flat';
  height?: number;
};

const TREND_COLOR: Record<SparklineProps['trend'], string> = {
  up: 'var(--chart-cat-8)',
  down: 'var(--chart-cat-5)',
  flat: 'var(--muted-foreground)',
};

export function Sparkline({ data, trend, height = 36 }: SparklineProps) {
  const series = data.map((value, index) => ({ x: index, value }));
  const color = TREND_COLOR[trend];
  const gradientId = `spark-${trend}`;

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={series} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.35} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          fill={`url(#${gradientId})`}
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
