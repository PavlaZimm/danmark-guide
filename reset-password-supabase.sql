-- ========================================
-- RESET HESLA V SUPABASE
-- ========================================
-- Spusť v Supabase SQL Editor
-- https://supabase.com/dashboard → SQL Editor → New query
-- ========================================

-- ⚠️ ZMĚŇ EMAIL A NOVÉ HESLO!

-- Nastavit nové heslo pro uživatele
UPDATE auth.users
SET
  encrypted_password = crypt('NOVE-SILNE-HESLO-123', gen_salt('bf')),
  updated_at = NOW()
WHERE email = 'vas@email.cz';  -- ⬅️ ZMĚŇ EMAIL!

-- Ověř, že se to změnilo
SELECT id, email, created_at, updated_at
FROM auth.users
WHERE email = 'vas@email.cz';  -- ⬅️ ZMĚŇ EMAIL!

-- ========================================
-- HOTOVO! Teď se přihlas na:
-- kastrup.cz/tajnedvere
-- s emailem: vas@email.cz
-- a novým heslem: NOVE-SILNE-HESLO-123
-- ========================================
