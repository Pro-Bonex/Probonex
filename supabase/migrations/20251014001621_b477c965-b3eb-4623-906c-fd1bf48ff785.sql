-- Tighten RLS and fix security issues

-- 1) profiles: restrict public access to authenticated users only
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Profiles are viewable by authenticated users"
ON public.profiles
FOR SELECT
TO authenticated
USING (true);

-- 2) past_cases: restrict public access to authenticated users only
DROP POLICY IF EXISTS "Past cases are viewable by everyone" ON public.past_cases;
CREATE POLICY "Past cases are viewable by authenticated users"
ON public.past_cases
FOR SELECT
TO authenticated
USING (true);

-- 3) contact_information: allow victims to update their own records
CREATE POLICY "Victims can update their own contact info"
ON public.contact_information
FOR UPDATE
TO authenticated
USING (auth.uid() = victim_id);