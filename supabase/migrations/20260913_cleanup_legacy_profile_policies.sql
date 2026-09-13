-- Remove legacy permissive UPDATE policies left by an earlier hardening pass.
-- The canonical "Admins can update profiles" policy is the only UPDATE policy
-- that should remain on public.profiles.

DROP POLICY IF EXISTS "Only admins can change roles" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own email" ON public.profiles;
