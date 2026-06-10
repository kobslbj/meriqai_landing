import posthog from "posthog-js"

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN!, {
  api_host: "/ingest",
  ui_host: "https://us.posthog.com",
  defaults: "2026-01-30",
  // These features lazy-load extra scripts (exception-autocapture, surveys,
  // web-vitals, dead-clicks) that adblockers block by filename, spamming
  // "failed to load script" console errors. Core event capture doesn't need
  // them. Re-enable individually if the feature is turned on in PostHog.
  capture_exceptions: false,
  disable_surveys: true,
  capture_dead_clicks: false,
  enable_heatmaps: false,
  capture_performance: { web_vitals: false },
  debug: process.env.NODE_ENV === "development",
})
