-- Articles in more languages: kastrup.cz (cs) and kastrup.pl (pl).
-- Additive: existing rows become Czech, the current code keeps working unchanged.
-- A slug is unique per language, so /clanek/ribe and /artykul/ribe can both exist.
-- translation_of points a translation to its Czech original (for hreflang).

alter table public.articles
  add column if not exists lang text not null default 'cs';

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'articles_lang_check') then
    alter table public.articles add constraint articles_lang_check check (lang in ('cs', 'pl'));
  end if;
end $$;

alter table public.articles
  add column if not exists translation_of uuid references public.articles(id) on delete set null;

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'articles_translation_not_self') then
    alter table public.articles add constraint articles_translation_not_self check (translation_of is null or translation_of <> id);
  end if;
end $$;

-- Replace the global slug uniqueness by uniqueness per language
do $$
begin
  if exists (select 1 from pg_constraint where conname = 'articles_slug_key') then
    alter table public.articles drop constraint articles_slug_key;
  end if;
  if not exists (select 1 from pg_constraint where conname = 'articles_lang_slug_key') then
    alter table public.articles add constraint articles_lang_slug_key unique (lang, slug);
  end if;
end $$;

-- One translation per language of each original
create unique index if not exists articles_translation_lang_key
  on public.articles (translation_of, lang) where translation_of is not null;

create index if not exists articles_lang_published_idx
  on public.articles (lang, published, created_at desc);
