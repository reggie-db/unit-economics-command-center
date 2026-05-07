# Unit Economics Command Center

An executive control plane for a national **convenience-store chain** that needs to defend contribution margin as third-party (3P) delivery marketplaces (DoorDash, Uber Eats, GrubHub) chip away at unit economics. The dashboard answers a single executive question:

> **Where do we shift promotional dollars and operational investment from third-party marketplaces back to our own first-party (1P) app to maximize contribution margin?**

Built as a [Databricks App](https://docs.databricks.com/aws/en/dev-tools/databricks-apps/) with [AppKit](https://databricks.github.io/appkit/), React, TypeScript, and Tailwind CSS. All data is static demo content; swap in AppKit SQL warehouse / Lakebase queries to wire it to a real workspace.

## What it shows

The Overview page tells the 1P-vs-3P margin story end to end.

- **KPI strip** — Contribution Margin, **1P Margin / Order**, **3P Margin / Order**, **1P Share of Delivery**, **Promo ROAS (1P : 3P)**, and **Monthly Lift Available** if the under-target region recovers 10pp of 1P share.
- **Insight banner** — quantifies the dollars at risk in the worst region and the recommended reallocation that would offset it.
- **Driver analysis** — five drivers behind the margin move: 3P share, 3P effective take rate, loyalty sign-ups, 1P basket premium vs. 3P, and 3P promo dilution.
- **Regional map** — bubbles colored by **1P share of delivery** so an exec can see at a glance which markets are above the 60% target vs. ceding share to marketplaces.
- **Channel margin by category** — per-category bar pair (hot food, fountain & coffee, snacks & grocery, fuel-attached basket, tobacco & lottery) showing the **1P-vs-3P contribution per order spread**, plus the marketplace effective take rate. Hot food and fuel-attached baskets carry the largest spread, so they should be the hero of every 1P promo.
- **Promo budget reallocation** — visualizes the **current vs. recommended split** of the monthly promo budget between 1P and 3P, with the modeled annual contribution lift if the recommendation is adopted.
- **Markets table** — markets ranked by **modeled $ margin lift / store / week if 1P share rises 10pp**, with the single best lever for each (loyalty push, throttle 3P SKUs, route morning coffee promo to in-app, in-house delivery pilot).
- **Recommended actions** — concrete operating moves the executive can hand to field ops, marketing, and channel strategy.

The sub-pages (Markets, Categories, Stores, **1P vs 3P**, Financials, Workflows, Alerts, Reports, Data Explorer) carry the same framing so the demo holds together when you click around.

## URL-driven branding

Logo and colors are encoded in the query string so a shared link opens with custom branding — useful for executive demos to a specific account.

```
?logo=<short-hash>&primary=ff6b35&secondary=1f2937&accent=fbbf24
```

Open **Settings** to upload a logo (it gets cropped to a transparent square), pick colors with the pickers, and copy the share link. Every change updates the URL and the live UI immediately. **Undo branding** restores whatever the URL had on first load.

## Quick start

```bash
git clone https://github.com/reggie-db/unit-economics-command-center.git
cd unit-economics-command-center
npm install
npm run dev
```

Then open http://localhost:8000.

**Enabled plugins:**
- **Server** -- Express HTTP server with static file serving and Vite dev mode

## Prerequisites

- Node.js v22+ and npm
- Databricks CLI (for deployment)
- Access to a Databricks workspace

## Databricks Authentication

### Local Development

For local development, configure your environment variables by creating a `.env` file:

```bash
cp .env.example .env
```

Edit `.env` and set the environment variables you need:

```env
DATABRICKS_HOST=https://your-workspace.cloud.databricks.com
DATABRICKS_APP_PORT=8000
# ... other environment variables, depending on the plugins you use
```
