-- Drop policies that depend on status column
DROP POLICY IF EXISTS "Lawyers can view open cases" ON cases;

-- Add congressional_district to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS congressional_district TEXT;

-- Add state and congressional district to cases, add violation arrays
ALTER TABLE cases DROP COLUMN IF EXISTS abuse_category CASCADE;
ALTER TABLE cases DROP COLUMN IF EXISTS abuse_details CASCADE;
ALTER TABLE cases ADD COLUMN IF NOT EXISTS state TEXT NOT NULL DEFAULT '';
ALTER TABLE cases ADD COLUMN IF NOT EXISTS constitution_violations TEXT[] DEFAULT '{}';
ALTER TABLE cases ADD COLUMN IF NOT EXISTS udhr_violations TEXT[] DEFAULT '{}';
ALTER TABLE cases ADD COLUMN IF NOT EXISTS closure_initiated_by UUID REFERENCES auth.users(id);

-- Add lawyer specialties and success tracking to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS specialties_constitution TEXT[] DEFAULT '{}';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS specialties_udhr TEXT[] DEFAULT '{}';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS successfully_closed_count INTEGER DEFAULT 0;

-- Update case_status enum to include closure tracking
ALTER TABLE cases ALTER COLUMN status DROP DEFAULT;
ALTER TABLE cases ALTER COLUMN status TYPE TEXT;
UPDATE cases SET status = 'open' WHERE status NOT IN ('open', 'closed', 'pending_closure', 'successfully_closed');
DROP TYPE IF EXISTS case_status CASCADE;
CREATE TYPE case_status AS ENUM ('open', 'pending_closure', 'successfully_closed', 'closed');
ALTER TABLE cases ALTER COLUMN status TYPE case_status USING status::case_status;
ALTER TABLE cases ALTER COLUMN status SET DEFAULT 'open'::case_status;

-- Recreate the policy with updated logic
CREATE POLICY "Lawyers can view open cases"
ON cases
FOR SELECT
TO authenticated
USING (
  status = 'open'::case_status 
  AND EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'lawyer'::user_role
    AND (
      -- Match if lawyer has at least one violation specialty that overlaps with case
      (profiles.specialties_constitution && cases.constitution_violations)
      OR (profiles.specialties_udhr && cases.udhr_violations)
    )
    AND profiles.state = cases.state
    AND profiles.congressional_district = cases.congressional_district
  )
);

-- Drop and recreate the abuse_category enum type if it exists
DROP TYPE IF EXISTS abuse_category CASCADE;