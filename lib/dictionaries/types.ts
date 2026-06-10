export type PainId =
  | "missing_supplier_documents"
  | "fda_aphis_readiness"
  | "email_followups"
  | "hts_classification_uncertainty"
  | "shipment_blocker_visibility"
  | "customer_intake_chaos"
  | "importability_questions"

export type DashboardTabId =
  | "extracted_fields"
  | "blockers"
  | "followup_email"
  | "historical_patterns"
  | "customer_qa"

export type Tone = "blocking" | "warning" | "ready" | "neutral"

export type DemoLine = {
  label: string
  value?: string
  tone?: Tone
}

export type PainCard = {
  id: PainId
  title: string
  description: string
  demo: {
    title: string
    lines: DemoLine[]
    note?: string
  }
}

export type FeatureId =
  | "ai_shipment_intake"
  | "blocker_ownership_tracking"
  | "supplier_followup_drafting"
  | "filing_readiness_review"
  | "operational_memory"
  | "import_question_context_layer"
  | "human_in_the_loop_review"

export type FeatureCard = {
  id: FeatureId
  title: string
  description: string
  details?: string[]
}

export type Persona = {
  id: string
  title: string
  copy: string
}

export type BlockerRow = {
  item: string
  owner: string
  severity: "blocking" | "warning"
  severityLabel: string
}

export type Dictionary = {
  metadata: {
    title: string
    description: string
  }
  navbar: {
    links: { label: string; id: string }[]
    requestPilot: string
  }
  hero: {
    badge: string
    headline: string
    subheadline: string
    primaryCta: string
    secondaryCta: string
    card: {
      header: string
      status: string
      importerLabel: string
      importerValue: string
      supplierLabel: string
      supplierValue: string
      filingReadinessLabel: string
      filingReadinessValue: string
      ownerLabel: string
      ownerValue: string
      blockerLabel: string
      blockerValue: string
      lastFollowUpLabel: string
      lastFollowUpValue: string
      riskLabel: string
      riskValue: string
    }
    actions: string[]
  }
  painSection: {
    title: string
    subtitle: string
    cards: PainCard[]
    previewLabel: string
    question: string
    validateCta: string
    toneFallback: Record<Tone, string>
  }
  workflow: {
    title: string
    subtitle: string
    beforeTitle: string
    afterTitle: string
    before: string[]
    after: string[]
    cta: string
  }
  features: {
    title: string
    subtitle: string
    cards: FeatureCard[]
  }
  dashboard: {
    title: string
    subtitle: string
    headerShipment: string
    headerParties: string
    reason: string
    statusPill: string
    readinessPill: string
    tabs: { id: DashboardTabId; label: string }[]
    extractedFields: DemoLine[]
    blockers: {
      itemHeader: string
      ownerHeader: string
      severityHeader: string
      rows: BlockerRow[]
    }
    followUp: {
      email: string
      copy: string
      copied: string
      regenerate: string
      note: string
    }
    patterns: {
      items: string[]
      note: string
    }
    qa: {
      customerAsksLabel: string
      question: string
      draftLabel: string
      draft: string
      status: string
    }
  }
  personas: {
    title: string
    cards: Persona[]
  }
  adoption: {
    title: string
    bullets: string[]
    artifacts: string[]
  }
  pilot: {
    title: string
    copy: string
    especially: string
    focusAreas: string[]
    form: {
      emailLabel: string
      emailPlaceholder: string
      companyLabel: string
      companyPlaceholder: string
      roleLabel: string
      rolePlaceholder: string
      bottleneckLabel: string
      bottleneckPlaceholder: string
      messageLabel: string
      messagePlaceholder: string
      submit: string
      submitting: string
      submitError: string
      errors: {
        email: string
        company: string
        role: string
      }
      success: string
      successBookingPrompt: string
    }
    booking: {
      prompt: string
      cta: string
    }
  }
  footer: {
    tagline: string
    copy: string
    rights: string
  }
}
