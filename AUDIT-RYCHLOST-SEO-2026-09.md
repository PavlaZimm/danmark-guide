# Audit rychlosti a SEO – kastrup.cz (23. 9. 2026)

**Jak se měřilo:** produkční build (`npm run build`) spuštěný lokálně přes `vite preview` a změřený Lighthouse 12 (mobil, simulované 4G). Živý web kastrup.cz nebyl z auditního prostředí dostupný, takže čísla jsou z lokálního buildu. Na Vercelu s CDN budou podobná, spíš o něco lepší. Stránky, které načítají data ze Supabase (`/clanky`, `/clanek/*`), běžely bez přístupu k databázi, takže jejich výkon je jen orientační.

## Souhrn skóre

| Stránka | Výkon | Přístupnost | Best practices | SEO | LCP | FCP | TBT | CLS |
|---|---|---|---|---|---|---|---|---|
| `/` (homepage) | **97** | 100 | 96 | 100 | 2,4 s | 1,8 s | 60 ms | 0 |
| `/hygge` | **98** | 100 | 96 | 100 | 2,1 s | 1,8 s | 20 ms | 0 |
| `/clanky` | 89* | 89 | 96 | 100 | 3,4 s* | 2,1 s | 20 ms | 0 |
| `/kodan` | **85** | 96 | 96 | 100 | **4,1 s** ❌ | 2,0 s | 110 ms | 0 |

\* bez dat ze Supabase

**Celkově:** web je v dobrém stavu. Technické SEO je nastavené správně (předgenerované HTML pro každou trasu, canonical, OG, JSON-LD, sitemap, robots.txt, 404 s `noindex`). Hlavní slabiny jsou **LCP na stránce Kodaň** a to, že **se hero obrázky načítají až po JavaScriptu**.

---

## 🔴 Priorita 1 – dopad na pozice a Core Web Vitals

### 1. Stránka `/kodan`: LCP 4,1 s (limit „dobré“ je 2,5 s)
- LCP prvek je `/images/20240813_130726.webp` (1400×1050, **213 kB**). Obrázek nemá `srcset`, takže mobil stahuje plnou velikost (Lighthouse odhaduje úsporu 174–191 kB).
- Stránka staticky importuje `ArticleMap` (Leaflet, **154 kB JS + 15 kB CSS**) i přesto, že mapa je až pod ohybem. Na Kodani je tak 25 kB nevyužitého JS.
- **Oprava:**
  - Vygenerovat varianty 640/960/1400 px a přidat `srcSet` + `sizes="100vw"`.
  - Přidat `fetchPriority="high"`.
  - Načítat `ArticleMap` přes `lazy()` a vykreslit ji až při přiblížení do viewportu (IntersectionObserver).
  - Stejný postup použít na `DanishIslands` a články s mapou.

### 2. Hero obrázek se objeví až po JS (všechny stránky s hero fotkou)
- Lighthouse hlásí `lcp-discovery` a `prioritize-lcp-image`. Obrázek je až v lazy chunku stránky (`Home-*.js`), takže prohlížeč o něm neví, dokud se nestáhne a nespustí `index.js` → `Home.js`.
- **Oprava:** v `vite-plugin-routes-html.js` vložit do `<head>` každé předgenerované stránky
  `<link rel="preload" as="image" href="…-768.webp" imagesrcset="…" imagesizes="100vw" fetchpriority="high">`.
  U homepage to ušetří cca 300 ms až 0,5 s LCP.

### 3. Nové články jsou do dalšího buildu 404
- Předgenerují se jen články existující při buildu (`dist/clanek/<slug>/index.html`). `vercel.json` nemá SPA rewrite pro `/clanek/:slug`, takže článek publikovaný v adminu vrací Vercelu **404.html s `noindex`**, dokud neproběhne nový deploy. Sitemap ho přitom už obsahuje, takže Google dostane 404 nebo noindex.
- V repozitáři není žádný deploy hook.
- **Oprava (zvolit jednu):**
  - (a) Po publikaci v adminu zavolat Vercel Deploy Hook (nejjednodušší, zachová předgenerované meta).
  - (b) Přidat rewrite `/clanek/:slug` → serverless funkci, která vrátí HTML s meta tagy ze Supabase.

---

## 🟠 Priorita 2 – rychlost

| # | Nález | Oprava |
|---|---|---|
| 4 | **Chybí dlouhé cachování** hashovaných assetů. `vercel.json` nemá hlavičku pro `/assets/*` a opakované návštěvy tak revalidují JS, CSS i obrázky. | Přidat `{"source":"/assets/(.*)","headers":[{"key":"Cache-Control","value":"public, max-age=31536000, immutable"}]}` a pro `/images/(.*)` např. `max-age=604800`. |
| 5 | **Render-blocking CSS** (`index-*.css`, 101 kB / 17 kB gzip), úspora cca 300 ms. Nevyužitých je 14 kB. | Zkontrolovat `content` v `tailwind.config.ts` a odebrat nepoužívané shadcn komponenty z `src/components/ui`. Volitelně inlinovat kritické CSS. |
| 6 | **Zbytečný preconnect** na `fonts.googleapis.com` / `fonts.gstatic.com` a dns-prefetch na Unsplash. Font Inter se nikde nenačítá (web padá na systémové písmo). | Buď preconnecty smazat, nebo Inter opravdu načíst, ideálně self-hosted `woff2` s `font-display: swap`. |
| 7 | **Obrázky v `public/images`** mají 7,1 MB. JPG originály leží vedle WebP, fotky mají 150–300 kB a nemají responzivní varianty. | Spustit `optimize-images.cjs` s výstupem 640/960/1400 px a zvážit AVIF. Obrázky článků servírovat přes `srcset`. |
| 8 | Homepage: dlouhá úloha 160 ms (max potential FID). Hero `h1` má `animate-fade-in`, což může posouvat vykreslení LCP textu. | Animaci na hero nadpisu zrušit nebo zkrátit. |

**Co je už v pořádku:** lazy loading všech stránek (code-splitting), vstupní JS jen cca 83 kB gzip, `width`/`height` na obrázcích (CLS = 0), WebP s `<picture>`, lazy loading obrázků pod ohybem, terser bez `console.log`.

---

## 🟡 Priorita 3 – SEO a obsah

| # | Nález | Oprava |
|---|---|---|
| 9 | **Výchozí OG obrázek `atterseebook.jpg`** – fotka ve skutečnosti ukazuje Møns Klint, jen měla zavádějící název souboru. Měla ale rozměr 1600×1200 místo doporučených 1200×630. | ✅ Opraveno: přejmenováno na `mons-klint-utesy.*`, nový obrázek pro sdílení `og-kastrup.jpg` (1200×630). |
| 10 | **Nesoulad H1** na homepage: předgenerované HTML má „Kastrup.cz – průvodce po Dánsku“, React „Objevte krásy Dánska“. Obecné H1 nenese žádné klíčové slovo. | Sjednotit na jedno H1 s klíčovým slovem, např. „Průvodce po Dánsku: Kodaň, hygge a cestování“. |
| 11 | **Sitemap:** statické stránky nemají `<lastmod>` a `/cestovani` renderuje stejnou komponentu jako `/clanky` (`<Articles />`), takže hrozí duplicitní obsah. | Doplnit `lastmod`. `/cestovani` buď dát vlastní obsah a filtr kategorie, nebo nastavit canonical na `/clanky`. |
| 12 | **Organization schema na homepage** obsahuje osobní e-mail a město. Konkrétní autor (Person) u článků chybí nebo ho nelze ověřit. | Pro E-E-A-T propojit `Article.author` → `Person` (`/autorka`, `sameAs` na sociální sítě). E-mail ve schématu je volitelný. |
| 13 | **Apple touch icon a favicony jsou SVG.** iOS SVG pro `apple-touch-icon` nepodporuje. Manifest uvádí `favicon.ico` se `sizes:"any"`, což hází chybu v konzoli. | Přidat PNG 180×180 (apple-touch-icon), 192 a 512. Z manifestu odebrat `.ico` a opravit `<link rel="icon" type="image/png">`, který ukazuje na SVG. |
| 14 | **Skrytý fallback obsah** (`display:none`) se liší od vykreslené stránky. Google to zatím toleruje, ale je dobré, aby text odpovídal (Seznam JS vykresluje omezeně a indexuje hlavně tento fallback). | Udržovat fallback texty synchronní s obsahem stránek, hlavně H1 a úvodní odstavec. |

---

## 🟢 Přístupnost (vliv i na SEO skóre)

- `/clanky`: filtr kategorií (Radix `Select`) nemá přístupný název. Doplnit `aria-label="Filtrovat podle kategorie"`.
- `/clanky`: hierarchie nadpisů přeskakuje úroveň (`h3` bez `h2`).
- `/clanky`: červený text chybové hlášky (`text-destructive`) má nedostatečný kontrast.
- `/kodan`: markery Leaflet jsou malé dotykové cíle a mají obecný `alt="Marker"`. Dát jim popisný `title`/`alt` (název místa).

---

## ✅ Stav oprav (23. 9. 2026)

Opraveno v tomto kroku:
- **Kodaň:** menší verze úvodní fotky pro mobil (640/960 px, 62/132 kB místo 213 kB) a mapa se načítá až při doscrollování (i na `/o-dansku`, `/danske-ostrovy` a v článcích). Výkon **85 → 94**, LCP **4,1 → 3,0 s**.
- **Homepage:** přednačtení úvodní fotky v HTML, nový H1 „Průvodce po Dánsku: Kodaň, hygge a cestování“ (stejný v HTML i v Reactu), bez animace nadpisu.
- **Mezipaměť:** `Cache-Control` pro `/assets/*` (1 rok) a `/images/*` (7 dní) ve `vercel.json`.
- **Písma:** odstraněné zbytečné připojení na Google Fonts a Unsplash, z CSS odstraněný nenačítaný font Inter.
- **Ikony:** PNG `apple-touch-icon` (180 px), `icon-192.png`, `icon-512.png`, `favicon-32.png`. Manifest už nehází chybu. Logo ve strukturovaných datech je PNG (Google SVG logo nepodporuje).
- **Obrázek pro sdílení:** `og-kastrup.jpg` 1200×630 (Møns Klint).
- **Přístupnost:** popisek filtru kategorií, footer a prázdný stav článků používají `h2`, kontrast chybové hlášky, popisy značek na mapě. Přístupnost je teď 100 na všech měřených stránkách.

Zkoušeno a vráceno: přednačtení fotky na `/hygge` a `/kodan` v měření zhoršilo LCP, takže zůstává jen na homepage.

Zbývá:
- **Bod 3** (nové články jsou 404 do dalšího nasazení): potřebuje Deploy Hook ve Vercelu.
- `/cestovani` duplikuje `/clanky`, `lastmod` v sitemapě, nepoužívané CSS.

## Doporučené pořadí prací

1. Hlavička `Cache-Control` pro `/assets` a `/images` (5 minut, velký efekt pro vracející se návštěvníky).
2. Preload hero obrázku v předgenerovaném HTML.
3. `/kodan`: responzivní hero + lazy mapa.
4. Deploy hook po publikaci článku (řeší 404 nových článků).
5. Nový OG obrázek a sjednocení H1 na homepage.
6. PNG ikony, drobnosti v přístupnosti, `lastmod` v sitemapě.

Po nasazení ověřit v PageSpeed Insights (pagespeed.web.dev) na živé doméně a v Search Console sledovat přehled „Core Web Vitals“ (data se projeví za cca 28 dní).
