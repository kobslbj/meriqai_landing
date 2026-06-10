# PostHog post-wizard report

The wizard has completed a deep integration of your project. PostHog is now initialized via `instrumentation-client.ts` (the Next.js 15.3+ approach — no provider component needed), with a reverse proxy configured in `next.config.ts` so all analytics traffic routes through `/ingest` rather than directly to PostHog's servers. Environment variables are stored in `.env.local`. Two new events were added to the existing tracking suite, and a PostHog dashboard with five insights was created.

## Changes made

| File | Change |
|------|--------|
| `instrumentation-client.ts` | Updated PostHog init: corrected env var name to `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN`, switched `api_host` to `/ingest` (reverse proxy), added `defaults: "2026-01-30"`, `capture_exceptions: true`, `debug` in dev mode |
| `next.config.ts` | Added reverse proxy rewrites for `/ingest/static/*`, `/ingest/array/*`, and `/ingest/*`; added `skipTrailingSlashRedirect: true` |
| `.env.local` | Created with `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` |
| `lib/analytics.ts` | Added `follow_up_email_copied` and `follow_up_email_regenerated` to the `AnalyticsEvent` type |
| `components/landing/mock-shipment-dashboard.tsx` | Added `follow_up_email_copied` capture in `copyEmail()` and `follow_up_email_regenerated` capture in `regenerate()` |

## Events tracked

| Event | Description | File |
|-------|-------------|------|
| `cta_clicked` | Hero and navbar CTA button clicks, with `cta` property identifying which button | `components/landing/hero.tsx`, `components/landing/navbar.tsx` |
| `pain_selected` | User selects a workflow pain card, with `pain` property | `components/landing/pain-selector.tsx` |
| `workflow_example_opened` | "Show workflow example" button click | `components/landing/workflow-section.tsx` |
| `demo_tab_clicked` | Tab switch in the mock shipment dashboard, with `tab` property | `components/landing/mock-shipment-dashboard.tsx` |
| `feature_interest_clicked` | Feature card or hero action button click, with `feature` property | `components/landing/hero.tsx`, `components/landing/feature-grid.tsx` |
| `persona_selected` | User selects a persona card, with `persona` property | `components/landing/persona-selector.tsx` |
| `pilot_requested` | Pilot form submitted successfully, with `email_domain`, `company`, `role`, `selected_pain`, `message_length` | `components/landing/pilot-form.tsx` |
| `follow_up_email_copied` | User copies the AI-drafted follow-up email to clipboard | `components/landing/mock-shipment-dashboard.tsx` |
| `follow_up_email_regenerated` | User clicks "Regenerate draft" on the follow-up email | `components/landing/mock-shipment-dashboard.tsx` |

## Next steps

We've built a dashboard and five insights to monitor user behavior and conversion:

- [Analytics basics (wizard) — Dashboard](https://us.posthog.com/project/464594/dashboard/1696052)
- [Pilot conversion funnel](https://us.posthog.com/project/464594/insights/yFupx6nR) — CTA click → pain selected → pilot requested
- [Pilot requests over time](https://us.posthog.com/project/464594/insights/Qso5V7FX) — cumulative pilot form submissions
- [Top pain points selected](https://us.posthog.com/project/464594/insights/8AY4depI) — which workflow pains resonate most
- [Demo tab engagement](https://us.posthog.com/project/464594/insights/3TY5XSDC) — which demo tabs visitors explore
- [Feature interest by type](https://us.posthog.com/project/464594/insights/qS9LEA0V) — which product features attract the most clicks

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
