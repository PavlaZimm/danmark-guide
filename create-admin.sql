-- ========================================
-- VYTVOŘENÍ ADMIN ÚČTU - RYCHLÝ SKRIPT
-- ========================================
-- Tento skript spusť v Supabase SQL Editor
-- https://supabase.com/dashboard → SQL Editor → New query
--
-- ⚠️ ZMĚŇ EMAIL A HESLO NA SVOJE!
-- ========================================

-- KROK 1: Najdi svůj účet (pokud už existuje)
SELECT id, email, role FROM profiles WHERE email = 'tvuj@email.cz';

-- Pokud existuje, přeskoč na KROK 3

-- KROK 2: Pokud profil NEEXISTUJE, najdi user ID a vytvoř profil
-- 2a) Najdi user ID
SELECT id, email FROM auth.users WHERE email = 'tvuj@email.cz';

-- 2b) Vytvoř profil (nahraď UUID za svoje z výsledku výše)
INSERT INTO profiles (id, email, role, created_at)
VALUES (
  'TVOJE-USER-ID-ZDE',  -- ⬅️ UUID z předchozího SELECT
  'tvuj@email.cz',      -- ⬅️ Tvůj email
  'admin',
  NOW()
);

-- KROK 3: Nastav admin roli (pokud profil existuje, ale není admin)
UPDATE profiles
SET role = 'admin'
WHERE email = 'tvuj@email.cz';

-- KROK 4: Ověř, že máš admin práva
SELECT id, email, role FROM profiles WHERE email = 'tvuj@email.cz';
-- Mělo by vrátit: role = 'admin' ✅

-- ========================================
-- HOTOVO! Teď se můžeš přihlásit na:
-- kastrup.cz/tajnedvere
-- ========================================
