-- Pilot request submissions from the public landing page form.
CREATE TABLE pilot_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL CHECK (email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$'),
  company text NOT NULL CHECK (length(trim(company)) > 0),
  role text NOT NULL CHECK (length(trim(role)) > 0),
  selected_pain text NOT NULL CHECK (
    selected_pain IN (
      'missing_supplier_documents',
      'fda_aphis_readiness',
      'email_followups',
      'hts_classification_uncertainty',
      'shipment_blocker_visibility',
      'customer_intake_chaos',
      'importability_questions'
    )
  ),
  message text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE pilot_requests ENABLE ROW LEVEL SECURITY;

-- The landing page form is public: anyone may submit, nobody may read,
-- update, or delete through the public API (admin key bypasses RLS).
CREATE POLICY pilot_requests_public_insert ON pilot_requests
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE INDEX pilot_requests_created_at_idx ON pilot_requests (created_at DESC);
CREATE INDEX pilot_requests_selected_pain_idx ON pilot_requests (selected_pain);
