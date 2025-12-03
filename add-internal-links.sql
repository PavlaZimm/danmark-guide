-- ========================================
-- PROLINKOVÁNÍ ČLÁNKU "KASTRUP" → "O DÁNSKU"
-- ========================================
-- Tento skript přidá odkazy z článku Kastrup na stránku O Dánsku
-- Spusť v Supabase SQL Editor
-- ========================================

-- KROK 1: Zobraz aktuální článek (pro kontrolu)
SELECT id, title, slug, LEFT(content, 200) as content_preview
FROM articles
WHERE slug = 'kastrup-kodansky-poklad-moderni-architektury-more-a-volnosti';

-- ========================================
-- KROK 2: PŘIDEJ ODKAZY do článku
-- ========================================
-- Tento update přidá odkazy na stránku "O Dánsku" tam, kde se hodí

-- VARIANTA A: Pokud článek obsahuje zmínky o Dánsku obecně
-- Nahradí první zmínku "Dánsko" odkazem na O Dánsku

UPDATE articles
SET content = REPLACE(
  content,
  'Dánsko',
  '<a href="/o-dansku">Dánsko</a>'
)
WHERE slug = 'kastrup-kodansky-poklad-moderni-architektury-more-a-volnosti'
AND content LIKE '%Dánsko%'
AND content NOT LIKE '%<a href="/o-dansku">Dánsko</a>%';  -- Nepřidávat duplicitně

-- VARIANTA B: Přidat odkaz na konkrétní frázi
-- Například: "dánská kultura", "dánský design", "hygge", atd.

UPDATE articles
SET content = REPLACE(
  content,
  'dánská kultura',
  '<a href="/o-dansku">dánská kultura</a>'
)
WHERE slug = 'kastrup-kodansky-poklad-moderni-architektury-more-a-volnosti'
AND content LIKE '%dánská kultura%'
AND content NOT LIKE '%<a href="/o-dansku">dánská kultura</a>%';

UPDATE articles
SET content = REPLACE(
  content,
  'hygge',
  '<a href="/o-dansku">hygge</a>'
)
WHERE slug = 'kastrup-kodansky-poklad-moderni-architektury-more-a-volnosti'
AND content LIKE '%hygge%'
AND content NOT LIKE '%<a href="/o-dansku">hygge</a>%';

-- ========================================
-- NEBO RUČNÍ ÚPRAVA:
-- ========================================
-- Pokud chcete přidat odkaz na konkrétní místo v textu,
-- můžete článek upravit přímo v admin panelu:
--
-- 1. Jděte na: kastrup.cz/tajnedvere/articles
-- 2. Najděte článek "Kastrup - Kodaňský poklad..."
-- 3. Klikněte na ikonu tužky (Upravit)
-- 4. Označte text, který chcete linkovat
-- 5. Klikněte na ikonu 🔗 (Link)
-- 6. Zadejte: /o-dansku
-- 7. Klikněte "Uložit změny"

-- ========================================
-- KROK 3: OVĚŘENÍ
-- ========================================
-- Zkontroluj, že odkazy byly přidány:
SELECT id, title,
  (content LIKE '%<a href="/o-dansku">%') as has_link,
  LENGTH(content) as content_length
FROM articles
WHERE slug = 'kastrup-kodansky-poklad-moderni-architektury-more-a-volnosti';

-- Pokud has_link = true, odkazy byly přidány! ✅

-- ========================================
-- TIPY PRO PROLINKOVÁNÍ:
-- ========================================
--
-- DOBRÉ MÍSTA PRO ODKAZY:
-- - První zmínka o Dánsku v článku
-- - Zmínky o dánské kultuře, designu, hygge
-- - Odkazy na další informace o Dánsku
-- - Kontext: "Chcete vědět více o Dánsku?"
--
-- ŠPATNÉ MÍSTA:
-- - Každé slovo "Dánsko" (přehnanost)
-- - V nadpisech (rušivé)
-- - Uprostřed důležité věty
--
-- DOPORUČENÍ:
-- - Max 2-3 odkazy na jednu stránku v článku
-- - Odkazy by měly dávat smysl v kontextu
-- - Používejte anchor text, který má význam
--
-- ========================================

-- PŘÍKLAD DOBRÉHO PROLINKOVÁNÍ:
--
-- "Kastrup leží na východním pobřeží Dánska, jen
--  20 minut jízdy vlakem od centra Kodaně. Pokud
--  plánujete cestu do Dánska, určitě si přečtěte
--  náš <a href="/o-dansku">kompletní průvodce po Dánsku</a>
--  s praktickými tipy."
--
-- ========================================
