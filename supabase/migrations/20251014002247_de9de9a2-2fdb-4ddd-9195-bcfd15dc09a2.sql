-- Fix user_roles RLS to allow users to insert their own role during onboarding
CREATE POLICY "Users can insert their own role"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);