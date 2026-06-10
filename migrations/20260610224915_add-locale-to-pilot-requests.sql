-- Track which language version of the landing page each pilot request came from.
ALTER TABLE pilot_requests
  ADD COLUMN locale text NOT NULL DEFAULT 'en'
  CHECK (locale IN ('en', 'zh'));
