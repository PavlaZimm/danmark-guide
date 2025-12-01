-- ========================================
-- VYTVOŘENÍ ADMIN ÚČTU - JEDNODUCHÝ NÁVOD
-- ========================================
-- Spusť tento skript POTÉ, co jsi vytvořil uživatele v Authentication
-- ========================================

-- ⚠️ ZMĚŇ EMAIL NA SVŮJ!
-- ========================================

-- KROK 1: Zkontroluj, jestli existují uživatelé v auth.users
SELECT id, email, created_at
FROM auth.users
ORDER BY created_at DESC
LIMIT 5;

-- KROK 2: Zkontroluj profily
SELECT id, email, role, created_at
FROM public.profiles
ORDER BY created_at DESC
LIMIT 5;

-- KROK 3: Nastav admin roli pro svůj účet
-- ⚠️ ZMĚŇ EMAIL!
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'tvuj@email.cz';  -- ⬅️ ZMĚŇ TADY!

-- KROK 4: Ověř, že máš admin práva
SELECT id, email, role
FROM public.profiles
WHERE email = 'tvuj@email.cz';  -- ⬅️ ZMĚŇ TADY!
-- Mělo by vrátit: role = 'admin' ✅

-- ========================================
-- POKUD PROFIL NEEXISTUJE
-- ========================================
-- To znamená, že trigger nefungoval nebo jsi nevytvořil uživatele
-- Použij tento SQL pro vytvoření profilu ručně:

-- Najdi svoje user ID
SELECT id, email FROM auth.users WHERE email = 'tvuj@email.cz';  -- ⬅️ ZMĚŇ!

-- Vytvoř profil (nahraď UUID)
INSERT INTO public.profiles (id, email, role, created_at)
VALUES (
  'TVOJE-USER-ID-TADY',  -- ⬅️ UUID z předchozího SELECT
  'tvuj@email.cz',       -- ⬅️ Tvůj email
  'admin',
  NOW()
)
ON CONFLICT (id) DO UPDATE SET role = 'admin';

-- ========================================
-- HOTOVO! Můžeš se přihlásit na:
-- kastrup.cz/tajnedvere
-- ========================================
