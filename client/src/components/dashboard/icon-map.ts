import {
  Users,
  Receipt,
  UsersRound,
  DollarSign,
  Truck,
  TrendingUp,
  BarChart3,
  User,
  Tag,
  Store,
  Smartphone,
  Percent,
  Package,
  Flame,
  Coffee,
  Cookie,
  Fuel,
  type LucideIcon,
} from 'lucide-react';

export const ICONS: Record<string, LucideIcon> = {
  users: Users,
  receipt: Receipt,
  usersRound: UsersRound,
  dollar: DollarSign,
  truck: Truck,
  trendingUp: TrendingUp,
  barChart: BarChart3,
  user: User,
  tag: Tag,
  store: Store,
  smartphone: Smartphone,
  percent: Percent,
  package: Package,
  flame: Flame,
  coffee: Coffee,
  cookie: Cookie,
  fuel: Fuel,
};

export function iconFor(key: string): LucideIcon {
  return ICONS[key] ?? TrendingUp;
}
