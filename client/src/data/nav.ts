import {
  LayoutDashboard,
  MapPin,
  Package,
  Store,
  Radio,
  DollarSign,
  Workflow,
  Bell,
  FileText,
  Database,
  Settings,
  type LucideIcon,
} from 'lucide-react';

export type NavItem = {
  to: string;
  label: string;
  icon: LucideIcon;
};

export const PRIMARY_NAV: NavItem[] = [
  { to: '/', label: 'Overview', icon: LayoutDashboard },
  { to: '/markets', label: 'Markets', icon: MapPin },
  { to: '/brands', label: 'Categories', icon: Package },
  { to: '/stores', label: 'Stores', icon: Store },
  { to: '/channels', label: '1P vs 3P', icon: Radio },
  { to: '/financials', label: 'Financials', icon: DollarSign },
  { to: '/workflows', label: 'Workflows', icon: Workflow },
  { to: '/alerts', label: 'Alerts', icon: Bell },
  { to: '/reports', label: 'Reports', icon: FileText },
  { to: '/data-explorer', label: 'Data Explorer', icon: Database },
];

export const SECONDARY_NAV: NavItem[] = [
  { to: '/settings', label: 'Settings', icon: Settings },
];
