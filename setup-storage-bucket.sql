-- ========================================
-- NASTAVENÍ SUPABASE STORAGE PRO OBRÁZKY
-- ========================================
-- Tento skript vytvoří bucket pro nahrávání obrázků článků
-- Spusť v Supabase SQL Editor
-- ========================================

-- Vytvoř bucket pro obrázky článků (pokud neexistuje)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'article-images',
  'article-images',
  true,  -- veřejný bucket
  10485760,  -- 10MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO UPDATE
SET
  public = true,
  file_size_limit = 10485760,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

-- ========================================
-- NASTAVENÍ OPRÁVNĚNÍ (RLS POLICIES)
-- ========================================

-- Policy 1: Všichni můžou ČÍST obrázky (veřejný přístup)
DROP POLICY IF EXISTS "Public can view article images" ON storage.objects;
CREATE POLICY "Public can view article images"
ON storage.objects FOR SELECT
USING (bucket_id = 'article-images');

-- Policy 2: Pouze admini můžou NAHRÁVAT obrázky
DROP POLICY IF EXISTS "Admins can upload article images" ON storage.objects;
CREATE POLICY "Admins can upload article images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'article-images' AND
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  )
);

-- Policy 3: Pouze admini můžou AKTUALIZOVAT obrázky
DROP POLICY IF EXISTS "Admins can update article images" ON storage.objects;
CREATE POLICY "Admins can update article images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'article-images' AND
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  )
);

-- Policy 4: Pouze admini můžou MAZAT obrázky
DROP POLICY IF EXISTS "Admins can delete article images" ON storage.objects;
CREATE POLICY "Admins can delete article images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'article-images' AND
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  )
);

-- ========================================
-- OVĚŘENÍ
-- ========================================

-- Zkontroluj, že bucket existuje:
SELECT id, name, public, file_size_limit
FROM storage.buckets
WHERE id = 'article-images';

-- Mělo by vrátit:
-- id: article-images
-- name: article-images
-- public: true
-- file_size_limit: 10485760 (10MB)

-- ========================================
-- HOTOVO! Teď můžete nahrávat obrázky
-- přímo v admin panelu!
-- ========================================
