-- Fix malformed article slugs
-- This migration sanitizes all article slugs to be URL-friendly
-- Created: 2025-01-20

DO $$
DECLARE
  article_record RECORD;
  new_slug TEXT;
BEGIN
  -- Iterate through all articles
  FOR article_record IN
    SELECT id, title, slug FROM public.articles
  LOOP
    -- Generate URL-friendly slug from title
    -- Logic matches ArticleEditor.tsx generateSlug() function:
    -- 1. Lowercase
    -- 2. Remove diacritics
    -- 3. Replace non-alphanumeric with hyphens
    -- 4. Remove leading/trailing hyphens

    new_slug := lower(article_record.title);

    -- Remove common Czech/European diacritics
    new_slug := translate(
      new_slug,
      'áàäâãåăąćčďđéèëêěęğíìïîłńňñóòöôõøřśšşťúùüûůýÿžźżæœß',
      'aaaaaaaaaccddeeeeeegiiiiilnnnoooooorsssstuuuuuyyzzzzaob'
    );

    -- Replace non-alphanumeric characters with hyphens
    new_slug := regexp_replace(new_slug, '[^a-z0-9]+', '-', 'g');

    -- Remove leading and trailing hyphens
    new_slug := trim(both '-' from new_slug);

    -- Update article if slug changed
    IF article_record.slug != new_slug THEN
      UPDATE public.articles
      SET slug = new_slug,
          updated_at = NOW()
      WHERE id = article_record.id;

      RAISE NOTICE 'Updated article "%" slug from "%" to "%"',
        article_record.title,
        article_record.slug,
        new_slug;
    END IF;
  END LOOP;

  RAISE NOTICE 'Slug sanitization complete!';
END $$;
