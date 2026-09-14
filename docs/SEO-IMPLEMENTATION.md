# SEO Implementace - Dokumentace

## ✅ Co bylo implementováno

### 1. **SEO Helper funkce** (`src/lib/seo-helpers.ts`)

Vytvořeny pomocné funkce pro validaci a optimalizaci meta tagů:

- `optimizeTitle()` - Validuje a zkracuje title na max 60 znaků
- `optimizeDescription()` - Validuje description (120-160 znaků)
- `generateSlug()` - Generuje SEO-friendly URL slugy
- `validateMetaTags()` - Vrací varování o problémech s meta tagy
- `calculateReadingTime()` - Počítá čas čtení článku
- `extractFirstImage()` - Extrahuje první obrázek z HTML

### 2. **Implementace v ArticleDetail.tsx**

SEO helper funkce jsou integrovány do `ArticleDetail.tsx`:

```tsx
// Import
import { optimizeTitle, optimizeDescription, calculateReadingTime } from "@/lib/seo-helpers";

// Použití před return
const pageTitle = optimizeTitle(article.meta_title || article.title);
const pageDescription = optimizeDescription(article.meta_description || article.perex);
const readingTime = calculateReadingTime(article.content);

// V Helmet
<Helmet>
  <title>{pageTitle}</title>
  <meta name="description" content={pageDescription} />
  {/* Konzistentní napříč OG a Twitter tagy */}
</Helmet>
```

### 3. **Canonical tagy na všech stránkách**

Všechny veřejné stránky již mají canonical tagy:

| Stránka | Canonical URL | Soubor | Řádek |
|---------|---------------|--------|-------|
| Homepage | `https://kastrup.cz/` | Home.tsx | 23 |
| Blog list | `https://kastrup.cz/clanky` | Articles.tsx | 166 |
| Kultura | `https://kastrup.cz/kultura` | Articles.tsx | 166 |
| Cestování | `https://kastrup.cz/cestovani` | Articles.tsx | 166 |
| Článek | `https://kastrup.cz/clanek/{slug}` | ArticleDetail.tsx | 364 |
| Ubytování list | `https://kastrup.cz/ubytovani` | Accommodation.tsx | 107 |
| Ubytování detail | `https://kastrup.cz/ubytovani/{slug}` | AccommodationDetail.tsx | 133 |
| O Dánsku | `https://kastrup.cz/o-dansku` | About.tsx | 17 |
| Kontakt | `https://kastrup.cz/kontakt` | Contact.tsx | 16 |

---

## 📊 Příklady použití

### **Příklad 1: Title optimalizace**

**Vstup:**
```tsx
const title = "Kompletní průvodce Kodaní: 50 tipů, doporučení a praktických rad pro cestovatele";
const optimized = optimizeTitle(title);
```

**Výstup:**
```
⚠️ Title truncated: "Kompletní průvodce Kodaní: 50 tipů, doporučení a praktických rad pro cestovatele" → "Kompletní průvodce Kodaní: 50 tipů, doporuč..."
"Kompletní průvodce Kodaní: 50 tipů, doporuč... | Kastrup.cz"
// Celková délka: 60 znaků (optimálně!)
```

### **Příklad 2: Description optimalizace**

**Vstup:**
```tsx
const shortDesc = "Kodaň je hlavní město."; // 23 znaků
const optimized = optimizeDescription(shortDesc);
```

**Výstup:**
```
⚠️ Description too short (23 chars, recommended min 120)
"Kodaň je hlavní město."
```

**Dobrý příklad:**
```tsx
const goodDesc = "Objevte Kodaň s naším průvodcem 2025: nejlepší památky, restaurace, doprava a ubytování. Ušetřete čas i peníze s našimi tipy od místních znalců."; // 146 znaků ✅
const optimized = optimizeDescription(goodDesc);
```

### **Příklad 3: Čas čtení článku**

```tsx
const content = "<p>Lorem ipsum dolor sit amet...</p>"; // 1500 slov
const readingTime = calculateReadingTime(content);
console.log(`Čtení: ${readingTime} minut`); // "Čtení: 8 minut"
```

Toto můžeš zobrazit v článku:
```tsx
<span className="text-sm text-muted-foreground">
  📖 Čtení: {readingTime} {readingTime === 1 ? 'minuta' : readingTime < 5 ? 'minuty' : 'minut'}
</span>
```

---

## 🔧 Jak testovat

### **1. Lokálně - Browser DevTools**

```bash
# Spusť dev server
npm run dev

# Otevři článek v prohlížeči
# http://localhost:8080/clanek/[slug]

# F12 → Elements → <head>
# Zkontroluj:
# - <title> má správnou délku (50-60 znaků)
# - <meta name="description"> má 120-160 znaků
# - <link rel="canonical"> je přítomný
```

### **2. Konzole - Varování**

Při vývoji uvidíš v konzoli varování:
```
⚠️ Title truncated from 75 to 47 chars
⚠️ Description too short (85 chars, recommended min 120)
```

### **3. Po nasazení - Online nástroje**

**Meta Tags Preview:**
```
https://metatags.io/
Zadej: https://kastrup.cz/clanek/[slug]
```

**Lighthouse:**
```
F12 → Lighthouse
Run analysis → SEO score
Hledej: "Document has a meta description"
```

---

## 📝 Checklist pro nové články

Před publikací KAŽDÉHO článku:

- [ ] **Title:** 50-60 znaků (včetně " | Kastrup.cz")
- [ ] **Description:** 120-160 znaků
- [ ] **URL slug:** Krátký, obsahuje klíčové slovo
- [ ] **H1:** Pouze 1x na stránku (= title článku)
- [ ] **H2-H3:** Logická hierarchie
- [ ] **Canonical tag:** Automatický (kontrola v DevTools)
- [ ] **OG image:** Nahrán, 1200x630px
- [ ] **Schema markup:** Automatic (Article + FAQ pokud existuje)

---

## 🚀 Následující kroky (doporučené)

### **1. Přidat čas čtení do UI**

V `ArticleDetail.tsx` přidej nad článek:

```tsx
{/* Metadata bar */}
<div className="mb-6 flex items-center gap-4 text-sm text-muted-foreground">
  <time dateTime={article.created_at}>
    {formatDate(article.created_at)}
  </time>
  <span>•</span>
  <span>📖 Čtení: {readingTime} minut</span>
  <span>•</span>
  <span>👤 Pavla Zimmermannová</span>
</div>
```

### **2. Validace meta tagů v admin editoru**

Přidej do `ArticleEditor.tsx` náhled meta tagů:

```tsx
import { validateMetaTags } from '@/lib/seo-helpers';

// V komponentě
const warnings = validateMetaTags(formData.meta_title, formData.meta_description);

// V UI
{warnings.length > 0 && (
  <div className="rounded border-l-4 border-yellow-500 bg-yellow-50 p-4">
    <h4 className="font-semibold">⚠️ SEO varování:</h4>
    <ul className="mt-2 list-disc pl-5">
      {warnings.map((w, i) => <li key={i}>{w}</li>)}
    </ul>
  </div>
)}
```

### **3. Ověř dynamickou sitemapu**

Sitemapu generuje endpoint `api/sitemap.js` přímo z publikovaných článků v Supabase.
Po nasazení zkontroluj výstup:
```bash
curl https://kastrup.cz/sitemap.xml | grep "clanek" | wc -l
# Mělo by vrátit počet všech publikovaných článků
```

---

## 📚 Další zdroje

- **Google Search Central:** https://developers.google.com/search/docs
- **Meta Tags Checker:** https://metatags.io/
- **Rich Results Test:** https://search.google.com/test/rich-results
- **PageSpeed Insights:** https://pagespeed.web.dev/

---

## ✅ Status implementace

| Feature | Status | Poznámka |
|---------|--------|----------|
| SEO helper funkce | ✅ Hotovo | `src/lib/seo-helpers.ts` |
| ArticleDetail optimalizace | ✅ Hotovo | Title + description validace |
| Canonical tagy | ✅ Hotovo | Všechny stránky |
| Robots.txt | ✅ Hotovo | Opravena admin cesta |
| Sitemap generator | ✅ Hotovo | Čeká na Supabase credentials |
| Image optimization | ✅ Hotovo | Script připraven |
| Schema markup | ✅ Hotovo | Article + FAQ + Breadcrumb |
| Core Web Vitals | ⏳ Pending | Test po nasazení |
| Next.js migrace | ⏳ Pending | Nejvyšší priorita! |

---

**Vytvořeno:** 26. 11. 2025
**Poslední update:** 26. 11. 2025
**Autor:** Claude (SEO audit & implementace)
