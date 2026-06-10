# Meriq AI — Landing Page

**Operational intelligence for trade teams.** Meriq AI turns messy shipment emails, PDFs, supplier replies, and customer questions into ready-to-review shipment cases.

This landing page is both a marketing site and a **workflow-pain validation tool**: every interaction (pain card selection, demo tabs, CTAs, pilot form) is tracked so we can learn which trade-ops workflow pain generates the strongest pilot intent.

## Stack

- **Next.js 16** (App Router, Turbopack) + TypeScript
- **Tailwind CSS v4** + shadcn/ui + hand-written Magic UI-style components (`components/magicui/`)
- **PostHog** — product analytics, proxied through `/ingest` rewrites
- **InsForge** — backend for pilot form submissions (`pilot_requests` table)

## Getting started

```bash
npm install
cp .env.local.example .env.local   # then fill in the keys below
npm run dev                        # http://localhost:3000
```

`.env.local` keys:

| Key | Where to get it |
|---|---|
| `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` | PostHog → org **Meriq AI** → project settings |
| `NEXT_PUBLIC_INSFORGE_ANON_KEY` | `npx @insforge/cli secrets get ANON_KEY` |

## Commands

```bash
npm run dev        # dev server
npm run build      # production build
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
npm run format     # prettier (write)
```

## i18n

Two locales: `/en` (English) and `/zh` (繁體中文, Taiwan market). Visiting `/` redirects by browser `Accept-Language` (`proxy.ts`). ALL copy lives in `lib/dictionaries/en.ts` and `lib/dictionaries/zh.ts` (typed by `lib/dictionaries/types.ts`) — edit copy there, never in components. **Ids (`PainId`, `FeatureId`, event values) must stay identical across locales** — they drive icons, layout, and analytics.

## Project layout

```
app/[lang]/page.tsx       # assembles all landing sections (en + zh statically generated)
proxy.ts                  # Accept-Language redirect at /
components/landing/       # one file per section (hero, pain-selector, pilot-form, …)
components/magicui/       # border-beam, shimmer-button, marquee, animated-beam, grid-pattern
lib/dictionaries/         # ALL copy + mock data, per locale (en.ts / zh.ts)
lib/i18n.ts               # locales, getDictionary()
lib/analytics.ts          # typed captureEvent() wrapper for PostHog
lib/insforge.ts           # InsForge client (anon key)
migrations/               # InsForge database migrations
```

## Analytics (PostHog)

Core validation funnel: `pain_selected` → `demo_tab_clicked` → `cta_clicked` → `pilot_requested`.

All events go through `captureEvent()` in `lib/analytics.ts` (no-ops with `console.debug` when no key is set) and carry a `locale` property (`en` / `zh`) for per-market segmentation. Results live in the [Pain Validation dashboard](https://us.posthog.com/project/464594/dashboard/1696158).

## Backend (InsForge)

Pilot form submissions are stored in `pilot_requests` (RLS: anonymous visitors can only INSERT; reads require the admin key).

```bash
# read submissions
npx @insforge/cli db query "SELECT * FROM pilot_requests ORDER BY created_at DESC"

# schema changes: add a migration, then apply
npx @insforge/cli db migrations new <name>
npx @insforge/cli db migrations up --all
```

## Conventions

- Copy and mock data are centralized in `lib/landing-data.ts` — components stay presentational.
- Mock companies are fake-but-realistic (e.g. Pacific Grain Imports Inc. / Everlink Foods Co., Ltd.). Never use real-sounding company names.
- Positioning guardrail: AI **prepares** cases and **drafts** answers for broker review — never claim autonomous customs clearance or compliance decisions.
- Next.js 16 has breaking changes vs. older docs — check `node_modules/next/dist/docs/` before using unfamiliar APIs.
