import posthog from "posthog-js"

export type AnalyticsEvent =
  | "pain_selected"
  | "cta_clicked"
  | "workflow_example_opened"
  | "demo_tab_clicked"
  | "feature_interest_clicked"
  | "persona_selected"
  | "pilot_requested"
  | "follow_up_email_copied"
  | "follow_up_email_regenerated"

export function captureEvent(
  eventName: AnalyticsEvent,
  properties?: Record<string, unknown>
) {
  if (typeof window === "undefined") return

  if (posthog.__loaded) {
    posthog.capture(eventName, properties)
  } else {
    console.debug(`[analytics] ${eventName}`, properties ?? {})
  }
}
