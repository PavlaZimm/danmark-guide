# Polská verze kastrup.pl

Jeden projekt Vercel, jedna databáze, jedna administrace, dvě domény.

| | kastrup.cz | kastrup.pl |
|---|---|---|
| Jazyk | čeština | polština |
| Pevné stránky | `src/pages/*.tsx` | `src/pages/pl/*.tsx` |
| SEO data pro build | `vite-plugin-routes-html.js` | `seo/pl-routes.js` |
| Články | `/clanek/:slug`, `articles.lang = 'cs'` | `/artykul/:slug`, `articles.lang = 'pl'` |
| Sitemap / robots | `/sitemap.xml` (cs) | `/sitemap.xml` (pl, přes middleware) |

## Jak to funguje
- `middleware.js` (Vercel Routing Middleware) podle domény přepíše kastrup.pl na polský build
  `dist/pl/…`, polské články na `api/article.js?lang=pl`, sitemapu a 404. Na kastrup.cz je adresa
  `/pl/…` vždy 404, aby polské soubory nebyly duplicitně na české doméně.
- `api/_lib/sites.js` je jediný seznam stránek obou jazyků (klíč → česká a polská cesta). Používá ho
  React, build, funkce i middleware. Novou stránku přidávej tam.
- React zjistí jazyk z domény (`src/lib/site.ts`). Texty rozhraní jsou v `src/lib/i18n.ts`.
- Článek je překladem, když má `translation_of` = id českého originálu. Z toho vzniká hreflang.
- **hreflang je vypnutý** (`HREFLANG_LIVE = false` v `api/_lib/sites.js`) dokud kastrup.pl skutečně
  neběží. Jinak by česká stránka odkazovala na neexistující doménu.

## Náhled bez domény
Na náhledu Vercelu (a lokálně) přidej `?lang=pl` — nastaví se cookie `kastrup_site=pl` a web se
chová jako kastrup.pl. `?lang=cs` přepne zpět. Na produkčních doménách parametr nefunguje.

## Pořadí spuštění (nesmí se přehodit)
1. Migrace `supabase/migrations/20260928120000_article_languages.sql` v produkční DB.
   **Před ní se nesmí nasadit kód** — každý dotaz na články filtruje `lang`, bez sloupce by
   český web přestal načítat články.
2. `content/articles-pl/insert-pl-articles.sql` — 6 polských článků (generuje
   `node scripts/pl-articles-sql.mjs`). Lze pustit opakovaně. Vkládá je **nezveřejněné**:
   starý kód na kastrup.cz ještě nefiltruje jazyk a zveřejněné polské články by ukázal
   v české sitemapě a u shodných adres (`ribe`, `mons-klint`) by rozbil české články.
3. Sloučit PR → nasazení. kastrup.cz se viditelně nezmění.
4. Teprve teď zveřejnit: `update public.articles set published = true where lang = 'pl';`
5. Vercel → Settings → Domains → přidat `kastrup.pl` a `www.kastrup.pl` (www → přesměrovat).
   U Forpsi nastavit DNS přesně podle Vercelu. **Ne dřív než bod 4**, jinak by kastrup.pl
   ukazovala český web.
6. Ověřit kastrup.pl, pak `HREFLANG_LIVE = true`, nasadit, přidat kastrup.pl do Search Console
   a odeslat sitemapu.

## Právo
Podklady: `Vyzkum/polska-verze/PRAVNI-POZADAVKY.md` (v celé pracovní složce). Shrnutí: polské
zásady ochrany soukromí (`src/pages/pl/Privacy.tsx`), cookie lišta s rovnocennými tlačítky,
mapa Stay22 se načítá až po kliknutí a je označená „[reklama]“, identifikace provozovatele podle
českého práva (země původu). Regulamin není potřeba.

## Nový polský článek v administraci
Pole „Jazyk a web“ = Polština, „Překlad českého článku“ = originál (nebo samostatný článek).
Adresa se generuje i z polských znaků (ł → l). Pozor: editor při uložení odstraňuje tabulky —
články s tabulkami (letiště) needitovat v administraci, jen přes SQL.
