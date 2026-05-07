// Static demo datasets for each sidebar section. These exist so navigating
// the sidebar produces something believable without any backend wired up.
//
// All datasets are framed for a national convenience-store chain whose
// executives are deciding where to shift promotional and operational
// investment between first-party (1P) digital channels and third-party (3P)
// delivery marketplaces in order to defend contribution margin.

export type Trend = 'up' | 'down' | 'flat';

export type MarketDetail = {
  id: string;
  market: string;
  region: string;
  stores: number;
  contributionMarginPct: number;
  contributionMarginChangePp: number;
  /** First-party share of delivery orders, percent (0-100). */
  onePSharePct: number;
  status: 'on_track' | 'watch' | 'at_risk';
};

export const MARKETS: MarketDetail[] = [
  { id: 'atl', market: 'Atlanta, GA', region: 'Southeast', stores: 84, contributionMarginPct: 22.1, contributionMarginChangePp: -2.8, onePSharePct: 28.4, status: 'at_risk' },
  { id: 'clt', market: 'Charlotte, NC', region: 'Southeast', stores: 52, contributionMarginPct: 23.4, contributionMarginChangePp: -1.6, onePSharePct: 35.8, status: 'watch' },
  { id: 'tpa', market: 'Tampa, FL', region: 'Southeast', stores: 41, contributionMarginPct: 24.0, contributionMarginChangePp: -1.1, onePSharePct: 31.0, status: 'watch' },
  { id: 'mco', market: 'Orlando, FL', region: 'Southeast', stores: 38, contributionMarginPct: 24.6, contributionMarginChangePp: -0.9, onePSharePct: 38.1, status: 'watch' },
  { id: 'bna', market: 'Nashville, TN', region: 'Southeast', stores: 33, contributionMarginPct: 25.0, contributionMarginChangePp: -0.7, onePSharePct: 42.6, status: 'on_track' },
  { id: 'mia', market: 'Miami, FL', region: 'Southeast', stores: 47, contributionMarginPct: 26.4, contributionMarginChangePp: 0.5, onePSharePct: 51.2, status: 'on_track' },
  { id: 'dfw', market: 'Dallas, TX', region: 'Southwest', stores: 71, contributionMarginPct: 25.8, contributionMarginChangePp: 0.4, onePSharePct: 48.7, status: 'on_track' },
  { id: 'hou', market: 'Houston, TX', region: 'Southwest', stores: 64, contributionMarginPct: 25.2, contributionMarginChangePp: 0.2, onePSharePct: 46.4, status: 'on_track' },
  { id: 'phx', market: 'Phoenix, AZ', region: 'Southwest', stores: 49, contributionMarginPct: 24.9, contributionMarginChangePp: -0.3, onePSharePct: 41.2, status: 'watch' },
  { id: 'lax', market: 'Los Angeles, CA', region: 'West', stores: 92, contributionMarginPct: 23.1, contributionMarginChangePp: -1.4, onePSharePct: 36.4, status: 'watch' },
  { id: 'sfo', market: 'San Francisco, CA', region: 'West', stores: 31, contributionMarginPct: 22.7, contributionMarginChangePp: -0.6, onePSharePct: 39.8, status: 'watch' },
  { id: 'sea', market: 'Seattle, WA', region: 'West', stores: 28, contributionMarginPct: 26.2, contributionMarginChangePp: 0.7, onePSharePct: 56.1, status: 'on_track' },
  { id: 'chi', market: 'Chicago, IL', region: 'Midwest', stores: 67, contributionMarginPct: 25.4, contributionMarginChangePp: 0.3, onePSharePct: 47.0, status: 'on_track' },
  { id: 'msp', market: 'Minneapolis, MN', region: 'Midwest', stores: 24, contributionMarginPct: 27.1, contributionMarginChangePp: 1.1, onePSharePct: 61.3, status: 'on_track' },
  { id: 'nyc', market: 'New York, NY', region: 'Northeast', stores: 86, contributionMarginPct: 22.8, contributionMarginChangePp: -1.2, onePSharePct: 33.7, status: 'watch' },
  { id: 'bos', market: 'Boston, MA', region: 'Northeast', stores: 32, contributionMarginPct: 25.7, contributionMarginChangePp: 0.4, onePSharePct: 49.4, status: 'on_track' },
];

/**
 * "Brands" in the c-store world maps to merchandise categories. The shape
 * keeps the legacy field names (stores, revenueDollars) but they now carry
 * SKU counts and TTM revenue per category.
 */
export type Brand = {
  id: string;
  name: string;
  segment: string;
  stores: number;
  revenueDollars: number;
  contributionMarginPct: number;
  marginTrend: Trend;
  notes: string;
};

export const BRANDS: Brand[] = [
  { id: 'hot_food', name: 'Hot prepared food', segment: 'Foodservice', stores: 412, revenueDollars: 184_300_000, contributionMarginPct: 32.4, marginTrend: 'up', notes: 'Highest 1P-vs-3P margin spread; hero category for app-only promos.' },
  { id: 'fountain_coffee', name: 'Fountain & coffee', segment: 'Foodservice', stores: 318, revenueDollars: 96_400_000, contributionMarginPct: 41.2, marginTrend: 'up', notes: 'AM-daypart workhorse; loyalty refill program +12% YoY.' },
  { id: 'snacks_grocery', name: 'Snacks & grocery', segment: 'Center-store', stores: 264, revenueDollars: 142_900_000, contributionMarginPct: 27.6, marginTrend: 'down', notes: '3P single-pack SKUs lose money after commission - throttle list ready.' },
  { id: 'tobacco_lottery', name: 'Tobacco & lottery', segment: 'Center-store', stores: 188, revenueDollars: 63_200_000, contributionMarginPct: 14.1, marginTrend: 'flat', notes: 'Removed from DoorDash menus in 4 markets; pickup-only pilot.' },
  { id: 'fuel_attached', name: 'Fuel-attached basket', segment: 'Forecourt', stores: 156, revenueDollars: 41_800_000, contributionMarginPct: 38.7, marginTrend: 'up', notes: 'Loyalty fuel discount tied to 1P checkout drives basket attach.' },
];

export type Store = {
  id: string;
  storeName: string;
  market: string;
  brand: string;
  contributionMarginPct: number;
  contributionMarginChangePp: number;
  variancePct: number;
  status: 'top_performer' | 'on_track' | 'watch' | 'escalation';
};

export const STORES: Store[] = [
  { id: 'st-1', storeName: 'ATL-2147 Buckhead', market: 'Atlanta, GA', brand: 'Urban Pantry', contributionMarginPct: 18.2, contributionMarginChangePp: -4.6, variancePct: -3.8, status: 'escalation' },
  { id: 'st-2', storeName: 'ATL-2092 Midtown', market: 'Atlanta, GA', brand: 'Urban Pantry', contributionMarginPct: 19.4, contributionMarginChangePp: -3.9, variancePct: -3.1, status: 'escalation' },
  { id: 'st-3', storeName: 'TPA-1408 Westshore', market: 'Tampa, FL', brand: 'Bayside Mart', contributionMarginPct: 20.1, contributionMarginChangePp: -3.2, variancePct: -2.7, status: 'watch' },
  { id: 'st-4', storeName: 'CLT-3318 SouthPark', market: 'Charlotte, NC', brand: 'Pinewood Pantry', contributionMarginPct: 21.6, contributionMarginChangePp: -2.4, variancePct: -2.0, status: 'watch' },
  { id: 'st-5', storeName: 'MCO-2210 Lake Nona', market: 'Orlando, FL', brand: 'Urban Pantry', contributionMarginPct: 22.0, contributionMarginChangePp: -1.8, variancePct: -1.5, status: 'watch' },
  { id: 'st-6', storeName: 'BNA-1701 Gulch', market: 'Nashville, TN', brand: 'Harbor Stop & Go', contributionMarginPct: 30.8, contributionMarginChangePp: 1.4, variancePct: 1.1, status: 'top_performer' },
  { id: 'st-7', storeName: 'MIA-2840 Brickell', market: 'Miami, FL', brand: 'Pinewood Pantry', contributionMarginPct: 31.2, contributionMarginChangePp: 1.7, variancePct: 1.4, status: 'top_performer' },
  { id: 'st-8', storeName: 'SEA-1102 Capitol Hill', market: 'Seattle, WA', brand: 'Harbor Stop & Go', contributionMarginPct: 32.4, contributionMarginChangePp: 2.1, variancePct: 1.8, status: 'top_performer' },
  { id: 'st-9', storeName: 'MSP-0908 Uptown', market: 'Minneapolis, MN', brand: 'Urban Pantry', contributionMarginPct: 29.6, contributionMarginChangePp: 1.6, variancePct: 1.3, status: 'top_performer' },
  { id: 'st-10', storeName: 'CHI-3401 West Loop', market: 'Chicago, IL', brand: 'Pinewood Pantry', contributionMarginPct: 27.8, contributionMarginChangePp: 0.9, variancePct: 0.7, status: 'on_track' },
];

export type ChannelMix = {
  id: string;
  channel: string;
  sharePct: number;
  contributionPerOrder: number;
  changePp: number;
  trend: Trend;
};

/**
 * Order channel mix expressed as share of *all* checkouts (in-store, forecourt
 * pay-at-pump, native app, third-party marketplaces). Keeps in-store-heavy
 * c-store reality: digital is small but the margin spread between 1P and 3P
 * is enormous.
 */
export const CHANNELS: ChannelMix[] = [
  { id: 'in_store', channel: 'In-store checkout', sharePct: 58.4, contributionPerOrder: 4.92, changePp: -0.6, trend: 'down' },
  { id: 'pay_at_pump', channel: 'Pay-at-pump', sharePct: 21.8, contributionPerOrder: 2.41, changePp: 0.2, trend: 'up' },
  { id: 'pickup_curbside', channel: 'In-app pickup / curbside', sharePct: 7.1, contributionPerOrder: 4.18, changePp: 1.0, trend: 'up' },
  { id: 'delivery_1p', channel: '1P delivery (native app)', sharePct: 5.4, contributionPerOrder: 4.18, changePp: 0.7, trend: 'up' },
  { id: 'delivery_3p', channel: '3P delivery (DoorDash, Uber Eats)', sharePct: 7.3, contributionPerOrder: 1.34, changePp: 3.4, trend: 'down' },
];

export type LineItem = {
  label: string;
  amount: number;
  delta: number;
  isSubtotal?: boolean;
  isNegative?: boolean;
};

export const PNL: LineItem[] = [
  { label: 'Revenue (foodservice + center-store + fuel)', amount: 528_700_000, delta: 3.1 },
  { label: 'Cost of goods sold', amount: -178_400_000, delta: -2.6, isNegative: true },
  { label: 'Gross profit', amount: 350_300_000, delta: 3.4, isSubtotal: true },
  { label: 'Store labor', amount: -148_700_000, delta: -4.2, isNegative: true },
  { label: 'Occupancy', amount: -42_100_000, delta: -1.1, isNegative: true },
  { label: '3P marketplace commissions & fees', amount: -27_900_000, delta: -8.6, isNegative: true },
  { label: '1P delivery cost (drivers + tech)', amount: -6_400_000, delta: -1.4, isNegative: true },
  { label: 'Marketing & promos (1P + 3P)', amount: -19_400_000, delta: 0.3 },
  { label: 'Contribution margin', amount: 130_500_000, delta: -1.8, isSubtotal: true },
  { label: 'G&A', amount: -36_200_000, delta: -0.4, isNegative: true },
  { label: 'Operating income', amount: 94_300_000, delta: -2.4, isSubtotal: true },
];

export type Workflow = {
  id: string;
  name: string;
  description: string;
  cadence: string;
  enabled: boolean;
  lastRunRelative: string;
  status: 'success' | 'running' | 'failed';
};

export const WORKFLOWS: Workflow[] = [
  { id: 'wf-1', name: 'Daily KPI Refresh', description: 'Recomputes KPI snapshots from POS, fuel TLS, and digital order systems.', cadence: 'Every day at 04:00 UTC', enabled: true, lastRunRelative: '4 hours ago', status: 'success' },
  { id: 'wf-2', name: '3P marketplace reconciliation', description: 'Joins DoorDash, Uber Eats, and GrubHub statements with 1P order log to compute true take rate.', cadence: 'Every Monday at 06:00 UTC', enabled: true, lastRunRelative: '2 days ago', status: 'success' },
  { id: 'wf-3', name: 'Margin Anomaly Detector', description: 'Lakeflow pipeline flagging stores where 3P share moves > 300 bps week-over-week.', cadence: 'Every 6 hours', enabled: true, lastRunRelative: '23 minutes ago', status: 'running' },
  { id: 'wf-4', name: '1P promo ROI scorer', description: 'Scores every promo with a 1P-vs-3P incrementality lift using the matched receipt log.', cadence: 'Every day at 02:00 UTC', enabled: true, lastRunRelative: '6 hours ago', status: 'success' },
  { id: 'wf-5', name: 'Loyalty enrollment forecast', description: 'Foundation Model API forecast of weekly loyalty sign-ups by store and daypart.', cadence: 'Every Sunday at 23:00 UTC', enabled: false, lastRunRelative: '8 days ago', status: 'failed' },
];

export type Alert = {
  id: string;
  title: string;
  body: string;
  severity: 'critical' | 'warning' | 'info';
  triggeredRelative: string;
  source: string;
};

export const ALERTS: Alert[] = [
  { id: 'al-1', title: 'Atlanta 1P share dropped to 28.4%', body: '3P delivery mix up 340 bps, contribution margin -2.8 pp. Modeled $18.4K / store / wk lift if 1P recovers 10 pp.', severity: 'critical', triggeredRelative: '12 minutes ago', source: 'Margin Anomaly Detector' },
  { id: 'al-2', title: '18 stores below plan by >300 bps', body: 'Concentrated in Southeast Urban Pantry banner; root cause is 3P promo dilution on tobacco + lottery SKUs.', severity: 'critical', triggeredRelative: '38 minutes ago', source: 'Store-Level Variance' },
  { id: 'al-3', title: 'Tampa 3P take rate spiked to 24%', body: 'Marketplace ad spend pushed effective rate up 110 bps. 1P promo ROAS now 4.1x ahead of 3P.', severity: 'warning', triggeredRelative: '1 hour ago', source: 'Channel Mix' },
  { id: 'al-4', title: 'Loyalty enrollment forecast pipeline failed', body: 'Sunday backfill failed at write step. Retry queued.', severity: 'warning', triggeredRelative: '5 hours ago', source: 'Lakeflow' },
  { id: 'al-5', title: 'Seattle Harbor Stop & Go top performer', body: 'Capitol Hill store +210 bps vs plan, sustained 4 weeks; 1P share now 56%.', severity: 'info', triggeredRelative: '8 hours ago', source: 'Store-Level Variance' },
];

export type Report = {
  id: string;
  name: string;
  description: string;
  cadence: string;
  owner: string;
  format: 'Lakeview' | 'PDF' | 'Email Digest';
};

export const REPORTS: Report[] = [
  { id: 'rep-1', name: 'Weekly Operating Review', description: 'Tuesday review with KPI snapshot, 1P share movements, and exceptions.', cadence: 'Weekly', owner: 'Alex Morgan', format: 'PDF' },
  { id: 'rep-2', name: '1P share watchlist', description: 'Markets where 1P share fell more than 100 bps week-over-week.', cadence: 'Daily', owner: 'Field Ops', format: 'Email Digest' },
  { id: 'rep-3', name: '1P vs 3P channel margin', description: 'Per-category contribution per order on 1P vs 3P, by market.', cadence: 'Weekly', owner: 'Channel Strategy', format: 'Lakeview' },
  { id: 'rep-4', name: 'Promo ROAS by channel', description: 'Promo ROAS rollup split between 1P and 3P spend, by daypart and market.', cadence: 'Bi-weekly', owner: 'Marketing', format: 'Lakeview' },
  { id: 'rep-5', name: 'Loyalty cohort retention', description: 'Loyalty cohort retention curves by enrollment touchpoint (fuel, hot food, in-app).', cadence: 'Weekly', owner: 'Loyalty', format: 'Lakeview' },
];

export type DataAsset = {
  id: string;
  table: string;
  catalog: string;
  schema: string;
  rowCount: string;
  freshnessRelative: string;
  owner: string;
};

export const DATA_ASSETS: DataAsset[] = [
  { id: 'da-1', table: 'fact_orders', catalog: 'unit_economics', schema: 'silver', rowCount: '1.42 B', freshnessRelative: '12 minutes ago', owner: 'Data Platform' },
  { id: 'da-2', table: 'fact_labor_shifts', catalog: 'unit_economics', schema: 'silver', rowCount: '184 M', freshnessRelative: '34 minutes ago', owner: 'People Ops' },
  { id: 'da-3', table: 'dim_store', catalog: 'unit_economics', schema: 'gold', rowCount: '1,318', freshnessRelative: '2 hours ago', owner: 'Data Platform' },
  { id: 'da-4', table: 'dim_category', catalog: 'unit_economics', schema: 'gold', rowCount: '64', freshnessRelative: '2 hours ago', owner: 'Merchandising' },
  { id: 'da-5', table: 'agg_store_daily_kpi', catalog: 'unit_economics', schema: 'gold', rowCount: '4.8 M', freshnessRelative: '15 minutes ago', owner: 'Data Platform' },
  { id: 'da-6', table: 'agg_market_weekly_kpi', catalog: 'unit_economics', schema: 'gold', rowCount: '684 K', freshnessRelative: '1 hour ago', owner: 'Data Platform' },
  { id: 'da-7', table: 'fact_3p_delivery_settlements', catalog: 'unit_economics', schema: 'silver', rowCount: '92 M', freshnessRelative: '1 day ago', owner: 'Finance Ops' },
  { id: 'da-8', table: 'fact_loyalty_events', catalog: 'unit_economics', schema: 'silver', rowCount: '312 M', freshnessRelative: '40 minutes ago', owner: 'Loyalty' },
];

export type SettingsToggle = {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
};

export type SettingsGroup = {
  id: string;
  title: string;
  description: string;
  toggles: SettingsToggle[];
};

export const SETTINGS_GROUPS: SettingsGroup[] = [
  {
    id: 'data',
    title: 'Data sources',
    description: 'Connections feeding the command center.',
    toggles: [
      { id: 'pos', label: 'Point of Sale (Verifone, NCR)', description: 'In-store and pay-at-pump tender stream.', enabled: true },
      { id: 'native', label: 'Native app + web checkout', description: 'First-party order, basket, and loyalty events.', enabled: true },
      { id: 'three_p', label: '3P delivery (DoorDash, Uber Eats, GrubHub)', description: 'Marketplace orders and settlement statements.', enabled: true },
      { id: 'loyalty', label: 'Loyalty CRM (Punchh)', description: 'Member profile, tier, and redemption history.', enabled: true },
      { id: 'erp', label: 'ERP (NetSuite)', description: 'GL postings and invoices.', enabled: false },
    ],
  },
  {
    id: 'alerts',
    title: 'Alerting',
    description: 'When automated alerts fire.',
    toggles: [
      { id: 'one_p_drop', label: '1P share drop > 100 bps WoW', description: 'Page on-call channel strategy lead.', enabled: true },
      { id: 'three_p_take', label: '3P take rate > 25%', description: 'Notify finance + marketplace partner manager.', enabled: true },
      { id: 'margin', label: 'Contribution margin compression > 100 bps', description: 'Notify regional manager.', enabled: true },
      { id: 'fraud', label: 'Refund anomaly', description: 'Slack + email digest.', enabled: false },
    ],
  },
];
