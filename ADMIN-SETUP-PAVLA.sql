-- ========================================
-- ADMIN SETUP PRO: zimmermannovap@gmail.com
-- ========================================
-- Zkopíruj a vlož do Supabase SQL Editor
-- https://supabase.com/dashboard → projekt "kastrup" → SQL Editor → New query
-- ========================================

-- KROK 1: Zkontroluj, jestli účet existuje
SELECT id, email, created_at
FROM auth.users
WHERE email = 'zimmermannovap@gmail.com';

-- Pokud vrátí prázdný výsledek, účet NEEXISTUJE
-- → Jdi do Authentication → Users → Invite user → zadej: zimmermannovap@gmail.com

-- ========================================
-- KROK 2: Nastav NOVÉ HESLO
-- ========================================
-- ⚠️ ZMĚŇ "MojeNoveHeslo123!" na svoje!

UPDATE auth.users
SET
  encrypted_password = crypt('MojeNoveHeslo123!', gen_salt('bf')),
  updated_at = NOW()
WHERE email = 'zimmermannovap@gmail.com';

-- Mělo vrátit: "Success. 1 rows affected" ✅

-- ========================================
-- KROK 3: Nastav ADMIN ROLI
-- ========================================

-- Nejdřív zkontroluj, jestli profil existuje:
SELECT id, email, role
FROM public.profiles
WHERE email = 'zimmermannovap@gmail.com';

-- Pokud profil EXISTUJE, nastav admin roli:
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'zimmermannovap@gmail.com';

-- Mělo vrátit: "Success. 1 rows affected" ✅

-- ========================================
-- POKUD PROFIL NEEXISTUJE, vytvoř ho:
-- ========================================

-- Najdi user ID:
SELECT id FROM auth.users WHERE email = 'zimmermannovap@gmail.com';

-- Vytvoř profil (nahraď 'TVOJE-USER-ID' za UUID z výsledku výše):
INSERT INTO public.profiles (id, email, role, created_at)
SELECT
  id,
  'zimmermannovap@gmail.com',
  'admin',
  NOW()
FROM auth.users
WHERE email = 'zimmermannovap@gmail.com'
ON CONFLICT (id) DO UPDATE SET role = 'admin';

-- ========================================
-- KROK 4: OVĚŘENÍ
-- ========================================

-- Zkontroluj, že máš admin práva:
SELECT id, email, role
FROM public.profiles
WHERE email = 'zimmermannovap@gmail.com';

-- Mělo vrátit:
-- email: zimmermannovap@gmail.com
-- role: admin ✅

-- ========================================
-- HOTOVO! TEĎ SE PŘIHLAS:
-- ========================================
-- URL: https://kastrup.cz/tajnedvere
-- Email: zimmermannovap@gmail.com
-- Heslo: MojeNoveHeslo123! (to, co jsi nastavil v KROKU 2)
-- ========================================
