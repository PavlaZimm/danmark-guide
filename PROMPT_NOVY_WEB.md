# 🚀 PROMPT PRO NOVÝ SEO-OPTIMALIZOVANÝ WEB (Styl: kastrup.cz)

## 📋 ZÁKLADNÍ POŽADAVKY

Chci vytvořit nový web podobný kastrup.cz s těmito parametry:

### Téma a zaměření:
- **Název webu**: [DOPLŇ - např. "berlín.cz", "toskana.cz"]
- **Téma**: [DOPLŇ - např. "Průvodce po Berlíně", "Toskánsko pro cestovatele"]
- **Cílová skupina**: [DOPLŇ - např. "Čeští cestovatelé 25-45 let"]
- **Hlavní obsah**: Články/průvodce, ubytování, praktické tipy

---

## 🎯 KLÍČOVÉ SEO POŽADAVKY (od začátku!)

### 1. **Architektura - ŽÁDNÝ čistý React SPA**

**✅ SPRÁVNĚ:**
- Použij **React + Vite** ALE s SSR/SSG optimalizací
- NEBO **Next.js 14+** s App Router (doporučeno pro SEO)
- Server-side rendering pro všechny veřejné stránky
- Pre-rendering statických stránek při buildu

**❌ ŠPATNĚ:**
- Čistý React SPA bez SSR (jako jsme měli původně na kastrup.cz)
- Prázdný `<div id="root">` v HTML - crawlery to nevidí!

### 2. **Sitemap - POUZE DYNAMICKÝ**

**✅ SPRÁVNĚ:**
- Serverless funkce `/api/sitemap` (Vercel, Netlify)
- Automaticky načítá články z databáze
- Aktualizuje se při každém požadavku
- Obsahuje: statické stránky + všechny články + všechny kategorie

**❌ ŠPATNĚ:**
- Statický `public/sitemap.xml` generovaný při buildu
- Ruční přidávání URL do sitemapu
- Build script generující sitemap (bude zastaralý)

**Příklad konfigurace:**
```json
// vercel.json
{
  "rewrites": [
    {
      "source": "/sitemap.xml",
      "destination": "/api/sitemap"
    }
  ]
}
```

### 3. **Structured Data (JSON-LD) - OD ZAČÁTKU**

**Povinné schéma pro každou stránku:**

- **Homepage**: `WebSite` schema
- **Články**: `Article` schema (headline, author, datePublished, image)
- **Seznam článků**: `ItemList` schema
- **Kontakt**: `LocalBusiness` schema (pokud relevantní)
- **Breadcrumbs**: `BreadcrumbList` schema na VŠECH stránkách

**✅ TIP:** Použij knihovnu `react-helmet-async` pro dynamické meta tagy a schemas

### 4. **Meta tagy a Open Graph - DYNAMICKÉ**

Každá stránka musí mít:

```html
<title>{dynamický titulek} | {název webu}</title>
<meta name="description" content="{dynamický popis}" />
<link rel="canonical" href="{aktuální URL}" />

<!-- OG tags -->
<meta property="og:title" content="{dynamický titulek}" />
<meta property="og:description" content="{dynamický popis}" />
<meta property="og:image" content="{relevantní obrázek}" />
<meta property="og:url" content="{aktuální URL}" />
<meta property="og:type" content="article" /> <!-- pro články -->

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
```

**❌ CHYBA:** Stejné meta tagy na všech stránkách!

### 5. **Obrázky - ALT texty od začátku**

**✅ SPRÁVNĚ:**
```jsx
<img
  src={imageUrl}
  alt="Berlín - Braniborská brána za západu slunce, hlavní turistická atrakce"
  loading="lazy"
/>
```

**❌ ŠPATNĚ:**
```jsx
<img src={imageUrl} alt="obrázek" /> // příliš obecné
<img src={imageUrl} alt={title} /> // stejné jako titulek
```

**Pravidlo:** Alt text = popis co je NA obrázku + kontext + klíčová slova

### 6. **URL struktura - SEO friendly**

**✅ SPRÁVNĚ:**
```
/clanek/berlinska-braniborska-brana-historie-a-tipy
/ubytovani/hotel-adlon-luxury-berlin
/kategorie/kultura
```

**❌ ŠPATNĚ:**
```
/article/123
/accommodation?id=abc
/cat?name=culture
```

---

## 🎨 UX/UI POŽADAVKY (Klíčové pro úspěch!)

### 1. **Typografie a čitelnost**

**✅ SPRÁVNĚ:**
- **Font size**: Minimálně 16px pro tělo textu (18px ideální)
- **Line height**: 1.6-1.8 pro čitelnost dlouhých textů
- **Line length**: Max 70-80 znaků na řádek (900px max-width pro obsah)
- **Font weight**: 400 pro text, 600-700 pro nadpisy
- **Font**: System fonts nebo Google Fonts (Inter, Roboto, Open Sans)

**❌ ŠPATNĚ:**
- Text menší než 14px
- Příliš dlouhé řádky (celá šířka obrazovky)
- Nízký kontrast mezi textem a pozadím

**Příklad:**
```css
.article-content {
  font-size: 18px;
  line-height: 1.7;
  max-width: 800px;
  margin: 0 auto;
}
```

### 2. **Barvy a kontrast (Accessibility)**

**✅ WCAG 2.1 AA standardy:**
- **Kontrast textu**: Minimálně 4.5:1 pro normální text
- **Kontrast nadpisů**: Minimálně 3:1 pro velké nadpisy
- **Call-to-action tlačítka**: Výrazná barva odlišná od pozadí
- **Error messages**: Červená + ikona (nejen barva!)

**Testuj kontrast:**
- https://webaim.org/resources/contrastchecker/

**Paleta barev (jako kastrup.cz):**
```css
:root {
  /* Primary - hlavní barva (odkazy, CTA) */
  --primary: 220 70% 50%; /* Modrá */

  /* Secondary - doplňková barva */
  --secondary: 210 40% 96%; /* Světle šedá */

  /* Accent - zvýraznění */
  --accent: 16 82% 57%; /* Oranžová/červená */

  /* Text */
  --foreground: 222 47% 11%; /* Tmavě šedá */
  --muted-foreground: 215 16% 47%; /* Světlejší šedá */

  /* Background */
  --background: 0 0% 100%; /* Bílá */
}
```

### 3. **Navigace - Intuitivní a dostupná**

**✅ Header navigace:**
- Logo vlevo (odkaz na homepage)
- Hlavní menu uprostřed nebo vpravo
- Sticky header (zůstává viditelný při scrollování)
- Mobile hamburger menu (≤ 768px)
- Search (volitelné, ale užitečné)

**✅ Breadcrumbs (důležité pro UX i SEO):**
```
Domů > Průvodce > Název článku
```
- Na každé stránce kromě homepage
- Klikací, funkční
- Stylizované ale nenápadné

**✅ Footer:**
- Rychlé odkazy (kategorie, stránky)
- Kontakt (email, social media)
- Copyright
- Legal (pokud potřeba)

**✅ Skiplink (accessibility):**
```html
<a href="#main-content" class="skip-link">
  Přeskočit na hlavní obsah
</a>
```

### 4. **Mobile-First Design (60%+ traffic je z mobilů!)**

**✅ Breakpoints:**
```css
/* Mobile first */
.container {
  padding: 1rem;
}

/* Tablet (≥768px) */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}

/* Desktop (≥1024px) */
@media (min-width: 1024px) {
  .container {
    padding: 3rem;
  }
}
```

**✅ Touch targets:**
- Tlačítka minimálně 44x44px (Apple guidelines)
- Odkazy dostatečně velké a s paddingem
- Žádné hover-only interactions

**✅ Mobile menu:**
- Hamburger ikona (☰)
- Slide-in menu z pravé/levé strany
- Overlay přes obsah (s možností zavřít kliknutím mimo)

### 5. **Performance UX - Rychlost = User Experience**

**✅ Core Web Vitals:**
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

**Jak dosáhnout:**
```html
<!-- Lazy loading obrázků -->
<img src="image.jpg" loading="lazy" alt="..." />

<!-- Preload kritických zdrojů -->
<link rel="preload" href="/fonts/inter.woff2" as="font" crossorigin />

<!-- Optimalizované obrázky -->
<picture>
  <source srcset="image.webp" type="image/webp" />
  <img src="image.jpg" alt="..." />
</picture>
```

**✅ Loading states:**
```jsx
// Skeleton loader místo prázdného prostoru
{loading ? (
  <div className="skeleton h-64 w-full animate-pulse" />
) : (
  <ArticleCard article={article} />
)}
```

### 6. **Formuláře - Jednoduché a přívětivé**

**✅ Input fields:**
```html
<!-- Správně označené -->
<label for="email">Email</label>
<input
  type="email"
  id="email"
  name="email"
  placeholder="vas@email.cz"
  required
  aria-describedby="email-error"
/>
<span id="email-error" class="error" role="alert">
  <!-- Error message zde -->
</span>
```

**✅ Validace:**
- Real-time validace (ale ne příliš agresivní)
- Jasné error messages
- Success states (zelené checkmarky)

**✅ Submit buttons:**
- Jasně označené ("Odeslat", "Přihlásit se", "Registrovat")
- Loading state když se zpracovává (spinner + "Odesílám...")
- Disable po kliknutí (prevent double-submit)

### 7. **Micro-interactions - Živý web**

**✅ Hover states:**
```css
.button {
  transition: all 0.2s ease;
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
```

**✅ Focus states (keyboard navigation):**
```css
a:focus-visible,
button:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}
```

**✅ Smooth scroll:**
```css
html {
  scroll-behavior: smooth;
}
```

**✅ Page transitions:**
```jsx
// Next.js App Router s Framer Motion
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  {children}
</motion.div>
```

### 8. **Content Layout - Čitelný a přehledný**

**✅ Whitespace (prázdný prostor):**
- Dostatek prostoru mezi sekcemi
- Padding uvnitř karet/boxů
- Margin mezi elementy

**✅ Hierarchie:**
```html
<h1>Hlavní nadpis (jeden na stránku)</h1>
<h2>Sekce</h2>
<h3>Podsekce</h3>
<p>Odstavec textu</p>
```

**✅ Card design (pro články, ubytování):**
```jsx
<article className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
  <img src={image} alt={title} className="aspect-video object-cover" />
  <div className="p-6">
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-muted-foreground mb-4">{excerpt}</p>
    <a href={url} className="text-primary hover:underline">
      Číst více →
    </a>
  </div>
</article>
```

### 9. **Images a Media - Optimalizované a krásné**

**✅ Aspect ratios:**
- Hero images: 16:9 nebo 21:9
- Article cards: 16:9 nebo 4:3
- Thumbnail: 1:1 nebo 4:3

**✅ Placeholders:**
```jsx
// Blur placeholder while loading
<Image
  src={imageUrl}
  alt={alt}
  placeholder="blur"
  blurDataURL={thumbnailBase64}
/>
```

**✅ Responsive images:**
```html
<picture>
  <source media="(min-width: 1024px)" srcset="large.webp" />
  <source media="(min-width: 768px)" srcset="medium.webp" />
  <img src="small.webp" alt="..." />
</picture>
```

### 10. **Error States - Přátelské chybové hlášky**

**✅ 404 stránka:**
```jsx
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-4">Stránka nebyla nalezena</h2>
      <p className="text-muted-foreground mb-8">
        Omlouváme se, ale stránka kterou hledáte neexistuje.
      </p>
      <Link href="/" className="button-primary">
        Zpět na hlavní stránku
      </Link>
    </div>
  );
}
```

**✅ Network errors:**
```jsx
{error && (
  <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
    <AlertCircle className="text-red-500" />
    <div>
      <h4 className="font-semibold text-red-800">Něco se pokazilo</h4>
      <p className="text-red-600 text-sm">{error.message}</p>
    </div>
  </div>
)}
```

### 11. **Accessibility (A11y) - Web pro všechny**

**✅ ARIA labels:**
```html
<button aria-label="Zavřít menu">
  <X /> <!-- Ikona bez textu -->
</button>

<nav aria-label="Hlavní navigace">
  <!-- Menu items -->
</nav>
```

**✅ Keyboard navigation:**
- Tab pro přesun mezi elementy
- Enter/Space pro aktivaci tlačítek
- Escape pro zavření modálů

**✅ Screen reader support:**
```html
<!-- Oznamování změn -->
<div role="status" aria-live="polite" aria-atomic="true">
  {statusMessage}
</div>

<!-- Skip link pro přeskočení navigace -->
<a href="#main-content" className="sr-only focus:not-sr-only">
  Přeskočit na obsah
</a>
```

**✅ Alt texty pro ikony:**
```jsx
<Search aria-label="Hledat" />
<Menu aria-label="Otevřít menu" />
```

### 12. **Dark Mode (volitelné, ale cool)**

**✅ Implementace:**
```jsx
// next-themes library
import { ThemeProvider } from 'next-themes';

<ThemeProvider attribute="class" defaultTheme="light">
  {children}
</ThemeProvider>

// Toggle button
<button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
  {theme === 'dark' ? <Sun /> : <Moon />}
</button>
```

**CSS variables pro dark mode:**
```css
:root {
  --background: 0 0% 100%;
  --foreground: 222 47% 11%;
}

.dark {
  --background: 222 47% 11%;
  --foreground: 210 40% 98%;
}
```

---

## 🛠️ TECHNICKÝ STACK (Doporučený)

### Backend:
- **Databáze**: Supabase (PostgreSQL) nebo Firebase
- **Storage**: Supabase Storage pro obrázky
- **Autentizace**: Supabase Auth pro admin panel

### Frontend:
- **Framework**:
  - **DOPORUČENO**: Next.js 14+ (App Router, SSR/SSG built-in)
  - **ALTERNATIVA**: React + Vite + SSR plugin
- **Styling**: TailwindCSS + shadcn/ui (jako kastrup.cz)
- **Meta tagy**: react-helmet-async
- **Editor**: TipTap (rich text pro články)

### Deployment:
- **Hosting**: Vercel (podporuje Next.js SSR out-of-the-box)
- **CDN**: Automaticky přes Vercel
- **SSL**: Automaticky (Let's Encrypt)

### Analytics a SEO monitoring:
- **Google Search Console** (od začátku!)
- **Google Analytics 4** (volitelné)
- **Bing Webmaster Tools** (volitelné)

---

## 📁 STRUKTURA PROJEKTU (Next.js příklad)

```
project/
├── app/
│   ├── layout.tsx              # Root layout (header, footer)
│   ├── page.tsx                # Homepage
│   ├── clanek/
│   │   └── [slug]/
│   │       └── page.tsx        # Article detail (SSG)
│   ├── clanky/
│   │   └── page.tsx            # Articles list (SSR)
│   ├── ubytovani/
│   │   ├── page.tsx            # Accommodations list
│   │   └── [slug]/
│   │       └── page.tsx        # Accommodation detail (SSG)
│   ├── kontakt/
│   │   └── page.tsx            # Contact page (static)
│   └── admin/
│       └── [...]/              # Admin panel (client-side)
├── api/
│   └── sitemap/
│       └── route.ts            # Dynamic sitemap endpoint
├── components/
│   ├── ui/                     # shadcn/ui components
│   ├── ArticleCard.tsx
│   ├── Breadcrumbs.tsx
│   └── SEOHead.tsx             # Component pro meta tagy
├── lib/
│   ├── supabase.ts             # Supabase client
│   └── seo.ts                  # SEO helper funkce
└── public/
    ├── robots.txt              # Crawling rules
    └── manifest.json           # PWA manifest
```

---

## ✅ CHECKLIST PŘED SPUŠTĚNÍM

### Před prvním deploymentem:

- [ ] **Google Search Console** - vlastník webu ověřen
- [ ] **robots.txt** - vytvořen a správně nakonfigurovaný
- [ ] **Sitemap** - dynamický, testovaný, submitnutý do GSC
- [ ] **Structured data** - testováno přes Google Rich Results Test
- [ ] **Meta tagy** - všechny stránky mají unikátní title/description
- [ ] **Canonical URLs** - každá stránka má správný canonical
- [ ] **Alt texty** - všechny obrázky mají popisné alt texty
- [ ] **Mobile-friendly** - otestováno přes Google Mobile-Friendly Test
- [ ] **HTTPS** - funguje a je vynucené
- [ ] **Performance** - Core Web Vitals v zelené zóně (PageSpeed Insights)

### Po spuštění (první týden):

- [ ] **Sitemap submitnut** do Google Search Console
- [ ] **Request indexing** pro hlavní stránky (homepage, top články)
- [ ] **Internal linking** - propojení mezi články funguje
- [ ] **Monitoring** - denní kontrola GSC Coverage (pokrytí)
- [ ] **Fix errors** - oprava chyb indexace ihned jak se objeví

---

## 🚫 ČASTÉ CHYBY - VYVARUJ SE

### 1. **Statický sitemap místo dynamického**
❌ **Chyba**: Generování sitemap při buildu → zastaralé URL
✅ **Řešení**: Serverless funkce načítající z DB

### 2. **React SPA bez SSR**
❌ **Chyba**: Prázdný HTML, crawlery nevidí obsah
✅ **Řešení**: Next.js nebo React SSR plugin

### 3. **Stejné meta tagy na všech stránkách**
❌ **Chyba**: Duplicate content issues
✅ **Řešení**: Dynamické meta tagy podle obsahu

### 4. **Chybějící structured data**
❌ **Chyba**: Google nerozumí struktuře stránek
✅ **Řešení**: JSON-LD schemas na každé stránce

### 5. **Obecné alt texty**
❌ **Chyba**: `alt="obrázek"` nebo `alt="foto"`
✅ **Řešení**: Popisné alt texty s kontextem

### 6. **Zapomenutí canonical URLs**
❌ **Chyba**: Duplicate content pokud máš více cest k obsahu
✅ **Řešení**: `<link rel="canonical" href="...">` na všech stránkách

### 7. **Build bez environment variables**
❌ **Chyba**: Build selže kvůli chybějícím Supabase credentials
✅ **Řešení**: Nastavit env vars v Vercel před prvním deploymentem

---

## 📝 PROMPT PRO CLAUDE (přesně jak zadat)

```
Potřebuji vytvořit nový web podobný kastrup.cz s následujícími parametry:

**Téma**: [DOPLŇ téma webu - např. "Průvodce po Toskánsku pro české cestovatele"]
**Název webu**: [DOPLŇ - např. "toskana.cz"]
**Design**: Stejný styl jako kastrup.cz (TailwindCSS + shadcn/ui)

**KLÍČOVÉ SEO POŽADAVKY:**
1. Next.js 14+ s App Router (SSR/SSG) - žádný čistý React SPA
2. Dynamický sitemap serverless funkce /api/sitemap
3. Structured data (JSON-LD) na všech stránkách od začátku
4. Dynamické meta tagy a Open Graph tags pro každou stránku
5. Popisné alt texty pro všechny obrázky
6. SEO-friendly URL struktura

**Tech stack:**
- Frontend: Next.js 14 + TailwindCSS + shadcn/ui + react-helmet-async
- Backend: Supabase (PostgreSQL + Storage + Auth)
- Deployment: Vercel
- Editor: TipTap pro články

**Obsah:**
- Homepage s představením
- Seznam článků/průvodců (s filtrováním podle kategorií)
- Detail článku (dynamický, SSG)
- Seznam ubytování (volitelné)
- Kontakt
- Admin panel (CRUD články, správa obrázků)

**Důležité:**
- Vyhnout se chybám z kastrup.cz (statický sitemap, prázdný HTML pro crawlery)
- Google Search Console připravit OD ZAČÁTKU
- robots.txt a sitemap submitnout ihned po prvním deploymentu

Začni vytvořením struktury projektu a konfigurace Next.js s Supabase.
Postupně projdi setup, UI komponenty, admin panel a SEO optimalizaci.
```

---

## 🎯 TIMELINE PRO NOVÝ WEB

### Týden 1: Setup
- [ ] Next.js projekt + Supabase setup
- [ ] Database schema (articles, accommodations, categories)
- [ ] Základní UI komponenty (Layout, Header, Footer)

### Týden 2: Content Management
- [ ] Admin panel (login, CRUD články)
- [ ] Image upload do Supabase Storage
- [ ] TipTap editor pro články

### Týden 3: Public Pages
- [ ] Homepage
- [ ] Articles list + detail
- [ ] Category pages
- [ ] Contact page

### Týden 4: SEO Optimization
- [ ] Structured data všude
- [ ] Dynamic meta tags
- [ ] Alt texty pro všechny obrázky
- [ ] Dynamic sitemap serverless function
- [ ] robots.txt

### Týden 5: Testing & Launch
- [ ] Google Search Console setup
- [ ] Test na Mobile-Friendly
- [ ] Test structured data (Google Rich Results Test)
- [ ] Performance optimization (PageSpeed Insights)
- [ ] První deployment
- [ ] Submit sitemap do GSC

---

## 📚 UŽITEČNÉ ODKAZY

- **Google Search Console**: https://search.google.com/search-console
- **Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly
- **Rich Results Test**: https://search.google.com/test/rich-results
- **PageSpeed Insights**: https://pagespeed.web.dev/
- **Schema.org dokumentace**: https://schema.org/
- **Next.js SEO docs**: https://nextjs.org/learn/seo/introduction-to-seo

---

## 💡 BONUS TIPY

1. **Internal linking**: Propojuj články mezi sebou (zvyšuje SEO)
2. **Content updates**: Pravidelně aktualizuj starší články (Google to oceňuje)
3. **Mobile-first**: Design od začátku pro mobily (60%+ trafiku je z mobilů)
4. **Performance**: Optimalizuj obrázky (WebP, lazy loading)
5. **Accessibility**: ARIA labels, semantic HTML (pomáhá i SEO)

---

**Vytvořeno na základě zkušeností z kastrup.cz - vyvaruj se našim chybám! 🚀**
