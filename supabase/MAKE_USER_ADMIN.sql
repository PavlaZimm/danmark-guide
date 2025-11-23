-- ========================================
-- HELPER SCRIPT: Nastavení uživatele jako admin
-- ========================================
--
-- Tento skript použij v Supabase SQL Editor pro přidání admin role uživateli
-- https://supabase.com/dashboard/project/acgrypwfevndvqcwhcld/sql/new
--
-- POSTUP:
-- 1. Jdi do Supabase Dashboard → SQL Editor
-- 2. Zkopíruj tento příkaz níže
-- 3. Nahraď 'email@example.com' skutečným emailem uživatele
-- 4. Klikni "Run"
--
-- ========================================

-- VARIANTA 1: Pokud znáš email uživatele
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'NAHRAD_TOTO@example.com';

-- ========================================
-- VARIANTA 2: Pokud znáš UUID uživatele
-- ========================================
-- UPDATE public.profiles
-- SET role = 'admin'
-- WHERE id = 'NAHRAD_TOTO_UUID';

-- ========================================
-- OVĚŘENÍ: Zobrazit všechny adminy
-- ========================================
-- SELECT id, email, role, created_at
-- FROM public.profiles
-- WHERE role = 'admin';

-- ========================================
-- DEBUG: Zobrazit všechny uživatele a jejich role
-- ========================================
-- SELECT id, email, role, created_at
-- FROM public.profiles
-- ORDER BY created_at DESC;
