-- Fix profiles table RLS policies to prevent users from changing their own role
-- This migration closes a security hole where any user could make themselves an admin

-- Drop the old insecure policy
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

-- Create new secure policies

-- Policy 1: Users can update their own email (but NOT role)
CREATE POLICY "Users can update own email"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id AND
    -- Prevent users from changing their role
    role = (SELECT role FROM public.profiles WHERE id = auth.uid())
  );

-- Policy 2: Only admins can change roles
CREATE POLICY "Only admins can change roles"
  ON public.profiles FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );
