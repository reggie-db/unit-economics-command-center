// Static mockup payload powering the Overview page. Replace with AppKit
// queries once a SQL warehouse / Lakebase plugin is wired in.
//
// The dashboard is framed for a convenience-store CFO/COO who needs to
// understand where to shift promotional spend and ops investment from
// third-party delivery marketplaces (DoorDash, Uber Eats, GrubHub) toward
// the chain's own first-party app to defend contribution margin.

export type Trend = 'up' | 'down' | 'flat';

export type KpiCard = {
  id: string;
  label: string;
  value: string;
  deltaLabel: string;
  deltaTrend: Trend;
  subLabel?: string;
  sparkline: number[];
  iconKey: string;
};

export type InsightBanner = {
  title: string;
  body: string;
  severity: 'warning' | 'info' | 'critical';
};

export type DriverItem = {
  id: string;
  label: string;
  unit: string;
  deltaValue: number;
  deltaLabel: string;
  rangeMin: number;
  rangeMax: number;
  description: string;
  iconKey: string;
};

export type DriverAnalysis = {
  regionLabel: string;
  periodLabel: string;
  drivers: DriverItem[];
};

export type MapBucket = 'positive_strong' | 'positive_mild' | 'negative_mild' | 'negative_strong';

export type MapBubble = {
  marketId: string;
  label: string;
  lat: number;
  lon: number;
  radius: number;
  bucket: MapBucket;
};

export type RegionalMap = {
  title: string;
  legend: { label: string; bucket: MapBucket }[];
  bubbles: MapBubble[];
};

export type MarketRow = {
  rank: number;
  market: string;
  /** First-party delivery share of all delivery orders (0-100). */
  onePSharePct: number;
  /** Last 8 weeks of 1P share so the sparkline trends. */
  onePShareSparkline: number[];
  /** Estimated incremental contribution per store per week if 1P share rises by +10pp. */
  marginLiftAtPlus10: number;
  /** The single most useful lever a regional manager should pull next. */
  recommendedLever: string;
};

export type RecommendedAction = {
  id: string;
  title: string;
  description: string;
  iconKey: string;
  accent: 'emerald' | 'amber' | 'sky' | 'violet';
};

/** One row of the per-category 1P vs 3P contribution-per-order chart. */
export type ChannelMarginCategory = {
  id: string;
  category: string;
  iconKey: string;
  /** Contribution per order, dollars. */
  oneP: number;
  threeP: number;
  /** Effective marketplace take rate (commission + delivery + ad fees) as % of ticket. */
  threePTakeRatePct: number;
};

export type ChannelMarginCompare = {
  title: string;
  subtitle: string;
  categories: ChannelMarginCategory[];
};

/** Current vs recommended split of the monthly promo budget between channels. */
export type PromoAllocation = {
  title: string;
  subtitle: string;
  monthlyBudgetUsd: number;
  current: { onePPct: number; threePPct: number };
  recommended: { onePPct: number; threePPct: number };
  /** Forecast incremental annual contribution if the recommended split is adopted. */
  estAnnualLiftUsd: number;
  rationale: string;
};

export type Overview = {
  periodLabel: string;
  comparisonLabel: string;
  kpis: KpiCard[];
  insight: InsightBanner;
  driverAnalysis: DriverAnalysis;
  regionalMap: RegionalMap;
  channelMargin: ChannelMarginCompare;
  promoAllocation: PromoAllocation;
  markets: MarketRow[];
  recommendedActions: RecommendedAction[];
};

export const OVERVIEW: Overview = {
  periodLabel: 'May 12 - Jun 8, 2025',
  comparisonLabel: 'vs. Prior 4 Weeks',
  kpis: [
    {
      id: 'contribution_margin',
      label: 'Contribution Margin',
      value: '24.7%',
      deltaLabel: '1.8 pp vs. prior 4 wks',
      deltaTrend: 'down',
      subLabel: '$130.5M / $528.7M revenue',
      sparkline: [26.5, 26.3, 26.0, 25.6, 25.2, 25.0, 24.8, 24.7],
      iconKey: 'dollar',
    },
    {
      id: 'one_p_margin_per_order',
      label: '1P Margin / Order',
      value: '$4.18',
      deltaLabel: '$0.12 vs. prior 4 wks',
      deltaTrend: 'up',
      subLabel: 'native app + web checkout',
      sparkline: [3.92, 3.95, 3.98, 4.02, 4.06, 4.1, 4.14, 4.18],
      iconKey: 'smartphone',
    },
    {
      id: 'three_p_margin_per_order',
      label: '3P Margin / Order',
      value: '$1.34',
      deltaLabel: '$0.31 vs. prior 4 wks',
      deltaTrend: 'down',
      subLabel: 'after 22% blended take rate',
      sparkline: [1.85, 1.78, 1.7, 1.62, 1.55, 1.48, 1.4, 1.34],
      iconKey: 'truck',
    },
    {
      id: 'one_p_share',
      label: '1P Share of Delivery',
      value: '41.6%',
      deltaLabel: '2.4 pp vs. prior 4 wks',
      deltaTrend: 'up',
      subLabel: '1P orders / total delivery',
      sparkline: [37.8, 38.4, 38.9, 39.5, 40.1, 40.6, 41.1, 41.6],
      iconKey: 'percent',
    },
    {
      id: 'promo_roas',
      label: 'Promo ROAS (1P : 3P)',
      value: '3.6x',
      deltaLabel: '0.4x vs. prior 4 wks',
      deltaTrend: 'up',
      subLabel: '1P promo $1.00 -> $3.6 contrib.',
      sparkline: [2.8, 2.9, 3.0, 3.2, 3.3, 3.4, 3.5, 3.6],
      iconKey: 'tag',
    },
    {
      id: 'monthly_lift_at_risk',
      label: 'Monthly Lift Available',
      value: '+$2.4M',
      deltaLabel: 'if Southeast 1P +10pp',
      deltaTrend: 'up',
      subLabel: 'modeled vs. Southeast plan',
      sparkline: [1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.3, 2.4],
      iconKey: 'trendingUp',
    },
  ],
  insight: {
    title: '$2.4M monthly margin upside in Southeast if 1P share rises 10pp',
    body: '3P share up 340 bps in Atlanta and Tampa while 1P promo ROAS runs 3.6x ahead of 3P. Reallocating $1.4M of monthly promo from marketplaces to the native app would offset the compression.',
    severity: 'warning',
  },
  driverAnalysis: {
    regionLabel: 'Southeast Region',
    periodLabel: 'vs. Prior 4 Weeks',
    drivers: [
      {
        id: 'three_p_share',
        label: '3P Share of Delivery',
        unit: '% of delivery orders',
        deltaValue: 3.4,
        deltaLabel: '+3.4pp',
        rangeMin: -5,
        rangeMax: 5,
        description: 'DoorDash + Uber Eats orders displacing native app',
        iconKey: 'truck',
      },
      {
        id: 'three_p_take_rate',
        label: '3P Effective Take Rate',
        unit: 'commission + fees, %',
        deltaValue: 1.1,
        deltaLabel: '+1.1pp',
        rangeMin: -3,
        rangeMax: 3,
        description: 'Marketplace ads pushed blended rate to 22.4%',
        iconKey: 'percent',
      },
      {
        id: 'loyalty_signups',
        label: 'Loyalty Sign-ups / Store',
        unit: 'new members / wk',
        deltaValue: -1.6,
        deltaLabel: '-1.6 / wk',
        rangeMin: -8,
        rangeMax: 8,
        description: 'In-store enrollment down; QR campaigns paused',
        iconKey: 'usersRound',
      },
      {
        id: 'app_basket_lift',
        label: '1P Basket Premium',
        unit: '$ per order vs. 3P',
        deltaValue: 1.85,
        deltaLabel: '+$1.85',
        rangeMin: -3,
        rangeMax: 3,
        description: 'Hot-food + fountain attach 38% higher in 1P',
        iconKey: 'package',
      },
      {
        id: 'promo_dilution',
        label: '3P Promo Dilution',
        unit: 'margin pp / promo $',
        deltaValue: -0.6,
        deltaLabel: '-0.6pp',
        rangeMin: -2,
        rangeMax: 2,
        description: 'BOGO funded on 3P after commission yields no lift',
        iconKey: 'tag',
      },
    ],
  },
  regionalMap: {
    title: '1P share of delivery orders',
    legend: [
      { label: '60%+ (target)', bucket: 'positive_strong' },
      { label: '45 - 60%', bucket: 'positive_mild' },
      { label: '30 - 45%', bucket: 'negative_mild' },
      { label: 'Below 30%', bucket: 'negative_strong' },
    ],
    bubbles: [
      { marketId: 'nashville', label: 'Nashville', lat: 36.1627, lon: -86.7816, radius: 22, bucket: 'negative_mild' },
      { marketId: 'charlotte', label: 'Charlotte', lat: 35.2271, lon: -80.8431, radius: 24, bucket: 'negative_mild' },
      { marketId: 'birmingham', label: 'Birmingham', lat: 33.5186, lon: -86.8104, radius: 20, bucket: 'negative_strong' },
      { marketId: 'atlanta', label: 'Atlanta', lat: 33.749, lon: -84.388, radius: 36, bucket: 'negative_strong' },
      { marketId: 'jacksonville', label: 'Jacksonville', lat: 30.3322, lon: -81.6557, radius: 22, bucket: 'negative_strong' },
      { marketId: 'orlando', label: 'Orlando', lat: 28.5383, lon: -81.3792, radius: 24, bucket: 'negative_mild' },
      { marketId: 'tampa', label: 'Tampa', lat: 27.9506, lon: -82.4572, radius: 22, bucket: 'negative_strong' },
      { marketId: 'miami', label: 'Miami', lat: 25.7617, lon: -80.1918, radius: 20, bucket: 'positive_mild' },
    ],
  },
  channelMargin: {
    title: 'Contribution per order: 1P app vs. 3P marketplace',
    subtitle: 'Hot food and prepared meals carry the largest 1P-vs-3P spread',
    categories: [
      {
        id: 'hot_food',
        category: 'Hot prepared food',
        iconKey: 'flame',
        oneP: 5.2,
        threeP: 1.4,
        threePTakeRatePct: 27,
      },
      {
        id: 'fountain_coffee',
        category: 'Fountain & coffee',
        iconKey: 'coffee',
        oneP: 2.8,
        threeP: 1.1,
        threePTakeRatePct: 24,
      },
      {
        id: 'snacks',
        category: 'Snacks & grocery',
        iconKey: 'cookie',
        oneP: 3.1,
        threeP: 1.5,
        threePTakeRatePct: 22,
      },
      {
        id: 'fuel_attached',
        category: 'Fuel-attached basket',
        iconKey: 'fuel',
        oneP: 4.5,
        threeP: 0.4,
        threePTakeRatePct: 31,
      },
      {
        id: 'tobacco_lottery',
        category: 'Tobacco & lottery',
        iconKey: 'package',
        oneP: 1.1,
        threeP: 0.2,
        threePTakeRatePct: 28,
      },
    ],
  },
  promoAllocation: {
    title: 'Promo budget reallocation',
    subtitle: 'Shifting marketplace spend into the native app should defend $11.4M annual contribution',
    monthlyBudgetUsd: 1_950_000,
    current: { onePPct: 32, threePPct: 68 },
    recommended: { onePPct: 70, threePPct: 30 },
    estAnnualLiftUsd: 11_400_000,
    rationale:
      '1P promo dollar yields $3.60 of contribution vs. $1.00 on 3P after commissions. Capping 3P spend at 30% protects marketplace presence without subsidizing 22%+ take rates.',
  },
  markets: [
    {
      rank: 1,
      market: 'Atlanta, GA',
      onePSharePct: 28.4,
      onePShareSparkline: [33.2, 32.6, 31.8, 31.0, 30.2, 29.5, 28.9, 28.4],
      marginLiftAtPlus10: 18420,
      recommendedLever: 'Geofenced loyalty push + cap DoorDash promo',
    },
    {
      rank: 2,
      market: 'Tampa, FL',
      onePSharePct: 31.0,
      onePShareSparkline: [36.4, 35.7, 34.9, 34.0, 33.1, 32.4, 31.6, 31.0],
      marginLiftAtPlus10: 14210,
      recommendedLever: 'Pilot in-house delivery on hot food daypart',
    },
    {
      rank: 3,
      market: 'Charlotte, NC',
      onePSharePct: 35.8,
      onePShareSparkline: [38.2, 37.6, 37.0, 36.6, 36.2, 36.0, 35.9, 35.8],
      marginLiftAtPlus10: 11860,
      recommendedLever: 'Throttle 3P low-margin SKUs (lottery, single packs)',
    },
    {
      rank: 4,
      market: 'Orlando, FL',
      onePSharePct: 38.1,
      onePShareSparkline: [41.0, 40.6, 40.0, 39.5, 39.0, 38.6, 38.3, 38.1],
      marginLiftAtPlus10: 9780,
      recommendedLever: 'Reroute morning coffee promos to in-app',
    },
    {
      rank: 5,
      market: 'Nashville, TN',
      onePSharePct: 42.6,
      onePShareSparkline: [44.0, 43.7, 43.4, 43.0, 42.9, 42.8, 42.7, 42.6],
      marginLiftAtPlus10: 7220,
      recommendedLever: 'Expand loyalty fuel discount tied to 1P checkout',
    },
  ],
  recommendedActions: [
    {
      id: 'reallocate_promo',
      title: 'Reallocate $1.4M promo from 3P to 1P',
      description:
        'Cap monthly DoorDash + Uber Eats spend at 30% of budget, redirect to in-app loyalty offers in Southeast.',
      iconKey: 'tag',
      accent: 'emerald',
    },
    {
      id: 'loyalty_push',
      title: 'Push loyalty enrollment in low-1P markets',
      description:
        'Atlanta, Tampa, Birmingham: in-store QR + cashier prompt at fuel + hot-food touchpoints.',
      iconKey: 'usersRound',
      accent: 'sky',
    },
    {
      id: 'throttle_3p_skus',
      title: 'Throttle 3P menu of negative-margin SKUs',
      description:
        'Suppress lottery, single-pack tobacco, and < $3 snacks on marketplaces - these lose money after commission.',
      iconKey: 'package',
      accent: 'amber',
    },
    {
      id: 'pilot_inhouse_delivery',
      title: 'Pilot in-house delivery for hot food',
      description:
        'Three-store Tampa pilot of native fulfillment with shift-based drivers; targets +$0.90 / order.',
      iconKey: 'truck',
      accent: 'violet',
    },
  ],
};
