export type PainId =
  | "missing_supplier_documents"
  | "fda_aphis_readiness"
  | "email_followups"
  | "hts_classification_uncertainty"
  | "shipment_blocker_visibility"
  | "customer_intake_chaos"
  | "importability_questions"

export type DemoLine = {
  label: string
  value?: string
  tone?: "blocking" | "warning" | "ready" | "neutral"
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

export const painCards: PainCard[] = [
  {
    id: "missing_supplier_documents",
    title: "Missing supplier documents",
    description:
      "COO, FDA docs, MSDS, APHIS certificates, or product specs arrive late or incomplete.",
    demo: {
      title: "AI detects what is missing before filing starts.",
      lines: [
        { label: "Missing", value: "FDA Prior Notice", tone: "blocking" },
        {
          label: "Missing",
          value: "Food Facility Registration",
          tone: "blocking",
        },
        { label: "Missing", value: "Certificate of Origin", tone: "warning" },
        { label: "Owner", value: "Supplier" },
        {
          label: "Recommended next action",
          value: "Send supplier follow-up",
          tone: "ready",
        },
      ],
    },
  },
  {
    id: "fda_aphis_readiness",
    title: "FDA / APHIS readiness",
    description:
      "Food, agriculture, supplements, wood, or regulated goods need additional checks before filing.",
    demo: {
      title: "Catch regulated shipment requirements earlier.",
      lines: [
        { label: "Product type", value: "Cereal food product" },
        { label: "Origin", value: "Taiwan" },
        {
          label: "Potential requirement",
          value: "FDA Prior Notice",
          tone: "warning",
        },
        {
          label: "Potential requirement",
          value: "FDA Food Facility Registration",
          tone: "warning",
        },
        { label: "Status", value: "Broker review required", tone: "neutral" },
      ],
    },
  },
  {
    id: "email_followups",
    title: "Endless email follow-ups",
    description:
      "Ops teams spend hours asking the same questions and chasing the same documents.",
    demo: {
      title: "Turn repeated follow-ups into structured next actions.",
      lines: [
        { label: "Supplier has not replied", tone: "warning" },
        { label: "Last follow-up", value: "3h ago" },
        { label: "Missing items", value: "3", tone: "blocking" },
        {
          label: "Suggested action",
          value: "Send follow-up checklist",
          tone: "ready",
        },
      ],
    },
  },
  {
    id: "hts_classification_uncertainty",
    title: "HTS / classification uncertainty",
    description:
      "Teams need more product context before deciding how goods should be classified.",
    demo: {
      title: "Collect the context needed for classification review.",
      lines: [
        { label: "Missing product material", tone: "warning" },
        { label: "Missing intended use", tone: "warning" },
        { label: "Missing composition details", tone: "warning" },
        {
          label: "Suggested action",
          value: "Request product specifications",
          tone: "ready",
        },
      ],
    },
  },
  {
    id: "shipment_blocker_visibility",
    title: "Shipment blocker visibility",
    description:
      "Nobody knows which shipments are blocked, who owns the next step, or what changed.",
    demo: {
      title: "See who owns every blocker.",
      lines: [
        {
          label: "FDA Prior Notice → Supplier",
          value: "Blocking",
          tone: "blocking",
        },
        { label: "COO → Importer", value: "Warning", tone: "warning" },
        {
          label: "Quantity mismatch → Broker review",
          value: "Warning",
          tone: "warning",
        },
        {
          label: "Filing readiness",
          value: "Not ready",
          tone: "blocking",
        },
      ],
    },
  },
  {
    id: "customer_intake_chaos",
    title: "Customer intake chaos",
    description:
      "Importers send messy descriptions, screenshots, PDFs, spreadsheets, and incomplete product details.",
    demo: {
      title: "Turn messy customer intake into a ready-to-review case.",
      lines: [
        { label: "Extracted importer", tone: "ready" },
        { label: "Extracted supplier", tone: "ready" },
        { label: "Detected product category", tone: "ready" },
        { label: "Missing regulated shipment documents", tone: "warning" },
        { label: "Suggested next question generated", tone: "neutral" },
      ],
    },
  },
  {
    id: "importability_questions",
    title: "Customers keep asking if something can be imported.",
    description:
      "Importers ask whether a product can enter, what documents are needed, and whether FDA, APHIS, COO, permits, or other requirements apply.",
    demo: {
      title: "Answer repeated import questions with shipment context.",
      lines: [
        {
          label: "Customer question",
          value: "“Can we import this cereal product from Taiwan to the U.S.?”",
        },
        {
          label: "Collected context",
          value:
            "product category · country of origin · intended use · ingredients · supplier information",
        },
        {
          label: "Possible requirement",
          value: "FDA Prior Notice",
          tone: "warning",
        },
        {
          label: "Possible requirement",
          value: "FDA Food Facility Registration",
          tone: "warning",
        },
        {
          label: "Possible requirement",
          value: "Certificate of Origin",
          tone: "warning",
        },
        { label: "Status", value: "Needs broker review", tone: "neutral" },
        {
          label: "Recommended next action",
          value: "Draft response and request missing product details",
          tone: "ready",
        },
      ],
      note: "AI drafts context-aware answers for broker review.",
    },
  },
]

export const painLabels: Record<PainId, string> = Object.fromEntries(
  painCards.map((p) => [p.id, p.title])
) as Record<PainId, string>

export type FeatureCard = {
  id: string
  title: string
  description: string
  details?: string[]
}

export const featureCards: FeatureCard[] = [
  {
    id: "ai_shipment_intake",
    title: "AI Shipment Intake",
    description:
      "Turn shipment emails, PDFs, invoices, packing lists, and supplier replies into structured cases.",
  },
  {
    id: "blocker_ownership_tracking",
    title: "Blocker & Ownership Tracking",
    description:
      "See what is missing, who owns it, when they were contacted, and what happens next.",
  },
  {
    id: "supplier_followup_drafting",
    title: "Supplier Follow-up Drafting",
    description:
      "Generate context-aware emails requesting missing shipment documents.",
  },
  {
    id: "filing_readiness_review",
    title: "Filing Readiness Review",
    description:
      "Detect whether a shipment is ready for broker review or blocked by missing information.",
  },
  {
    id: "operational_memory",
    title: "Operational Memory",
    description:
      "Learn recurring supplier issues, missing document patterns, and similar past shipment workflows.",
  },
  {
    id: "import_question_context_layer",
    title: "Context Layer for Import Questions",
    description:
      "Answer repeated customer questions with shipment context, similar cases, and required documents — drafted for broker review.",
    details: [
      "“Can this be imported?”",
      "“What documents are needed?”",
      "“Will FDA apply?”",
    ],
  },
  {
    id: "human_in_the_loop_review",
    title: "Human-in-the-loop Review",
    description: "AI prepares the case. Brokers stay in control.",
  },
]

export const workflowBefore = [
  "Shipment documents arrive across PDFs, scans, email threads, and spreadsheets",
  "Teams manually check what is missing",
  "Suppliers must be chased repeatedly",
  "Customer questions interrupt operations constantly",
  "Filing delays happen because blockers are discovered late",
  "Ownership is unclear",
]

export const workflowAfter = [
  "AI intake extracts shipment context",
  "Missing documents and blockers are detected automatically",
  "Every blocker has an owner and next action",
  "Customer questions are answered with operational context",
  "Follow-up emails are drafted automatically",
  "Brokers review structured, ready-to-work cases",
]

export type Persona = {
  id: string
  title: string
  copy: string
}

export const personas: Persona[] = [
  {
    id: "customs_brokers",
    title: "Customs brokers",
    copy: "Reduce missing document chasing and repeated customer clarification before filing.",
  },
  {
    id: "freight_forwarders",
    title: "Freight forwarders",
    copy: "See which shipments are blocked and what needs to happen next.",
  },
  {
    id: "import_compliance_teams",
    title: "Import / compliance teams",
    copy: "Collect the right documentation earlier and reduce pre-shipment delays.",
  },
]

export const adoptionBullets = [
  "No ERP migration required",
  "Works with PDFs, email threads, scanned docs, and spreadsheets",
  "Human-in-the-loop by design",
  "Designed for customs and freight operations teams",
  "Helps prepare shipment cases before filing",
]

export const mockShipment = {
  id: "ENT-49281",
  port: "LAX",
  importer: "Pacific Grain Imports Inc.",
  supplier: "Everlink Foods Co., Ltd.",
  origin: "Taiwan",
  destination: "LAX",
  status: "Review paused",
  filingReadiness: "Not ready",
  blocker: "Waiting on supplier for FDA documents",
  owner: "Supplier",
  lastFollowUp: "3h ago",
  risk: "Filing delay likely",
  reason: "Missing FDA documentation",
}

export type DashboardTabId =
  | "extracted_fields"
  | "blockers"
  | "followup_email"
  | "historical_patterns"
  | "customer_qa"

export const extractedFields: DemoLine[] = [
  { label: "Importer", value: "Matched", tone: "ready" },
  { label: "Supplier", value: "Matched", tone: "ready" },
  { label: "COO", value: "Taiwan" },
  { label: "Total value", value: "USD 78,840" },
  { label: "Currency", value: "USD" },
  { label: "Gross weight", value: "72,140 kg" },
  { label: "Quantity mismatch", value: "Warning", tone: "warning" },
]

export const blockerRows = [
  {
    item: "Missing FDA Prior Notice",
    owner: "Supplier",
    severity: "Blocking" as const,
  },
  {
    item: "Missing FDA Food Facility Registration",
    owner: "Supplier",
    severity: "Blocking" as const,
  },
  { item: "Missing COO", owner: "Importer", severity: "Warning" as const },
  {
    item: "Quantity mismatch",
    owner: "Broker review",
    severity: "Warning" as const,
  },
]

export const followUpEmail = `Subject: ENT-49281 — Missing FDA documents needed before filing

Hi Everlink Foods team,

We're preparing shipment ENT-49281 (cereal food product, Taiwan → LAX) for broker review, and the following documents are still outstanding:

  1. FDA Prior Notice confirmation
  2. FDA Food Facility Registration number
  3. Certificate of Origin

Filing is currently paused until these are received. Could you share them, or an expected date, by end of day tomorrow?

Thank you,
Operations Team
Pacific Grain Imports Inc. (Importer of record)`

export const historicalPatterns = [
  "Similar Taiwan-origin cereal shipments often require FDA documentation before filing",
  "This supplier frequently submits COO late",
  "Quantity mismatches often resolved by requesting regulated shipment docs during intake",
]

export const customerQA = {
  question: "“Can this cereal product from Taiwan be imported into the U.S.?”",
  draft:
    "“Based on the shipment context, this appears to be a food product and may require FDA Prior Notice and Food Facility Registration before filing. We still need broker review and additional product details before confirming requirements.”",
  status: "Needs broker approval before sending.",
}
