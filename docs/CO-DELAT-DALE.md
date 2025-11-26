# Co dělat dál - SEO Akční plán

## ✅ CO BYLO HOTOVO

### 1. **SEO Technická implementace**
- ✅ Sitemap generator (ES modules) - automaticky se spustí při buildu
- ✅ SEO helper funkce (`src/lib/seo-helpers.ts`)
- ✅ Canonical tagy na VŠECH stránkách
- ✅ Meta tags optimalizace v ArticleDetail
- ✅ robots.txt správně nakonfigurován
- ✅ Dokumentace (`docs/SEO-IMPLEMENTATION.md`)

### 2. **Git - Branch stav**
- Branch: `claude/improve-seo-indexing-01JmpEXyFNWCFQYGiMkZuJdX`
- Commity pushnuté na origin
- Připraveno k merge do main

---

## 🎯 CO MUSÍŠ UDĚLAT TEĎ (PRIORITA)

### **KROK 1: Vytvoř Pull Request**
```bash
# Přejdi do Github repozitáře:
# https://github.com/PavlaZimm/danmark-guide

# Vytvoř PR:
# - Base: main (nebo master)
# - Compare: claude/improve-seo-indexing-01JmpEXyFNWCFQYGiMkZuJdX
# - Title: "SEO: Improve indexing with sitemap, meta tags, and canonical URLs"
```

**Co zahrnout do PR popisu:**
```markdown
## Změny
- ✅ Sitemap generator (automaticky generuje sitemap při buildu)
- ✅ SEO helper funkce pro validaci title/description
- ✅ Canonical tagy na všech stránkách
- ✅ Optimalizované meta tagy v ArticleDetail
- ✅ Aktualizovaný robots.txt

## Test plan
1. Merge do main
2. Deploy na Vercel
3. Zkontrolovat https://kastrup.cz/sitemap.xml (měl by obsahovat články)
4. Testovat v Google Search Console

## Dokumentace
- `docs/SEO-IMPLEMENTATION.md` - kompletní návod
```

---

### **KROK 2: Po merge - Ověř sitemap**

Po nasazení na Vercel:

```bash
# 1. Zkontroluj sitemap
curl https://kastrup.cz/sitemap.xml | grep "clanek" | wc -l
# Mělo by vrátit počet všech článků

# 2. Zkontroluj robots.txt
curl https://kastrup.cz/robots.txt
# Měl by obsahovat: Sitemap: https://kastrup.cz/sitemap.xml
```

---

### **KROK 3: Google Search Console**

**Důležité:** Toto musíš udělat RUČNĚ v Search Console!

1. **Přidej sitemap:**
   ```
   https://search.google.com/search-console

   → Sitemaps (levý panel)
   → "Add a new sitemap"
   → Zadej: sitemap.xml
   → Submit
   ```

2. **Požádej o přeindexování:**
   ```
   → URL Inspection (levý panel)
   → Zadej hlavní stránky:
     - https://kastrup.cz/
     - https://kastrup.cz/clanky
     - https://kastrup.cz/ubytovani
   → Klikni "Request Indexing" pro každou
   ```

3. **Sleduj pokrok (7-14 dní):**
   ```
   → Coverage (levý panel)
   → Měl by růst počet "Valid" stránek
   ```

---

## 📊 CO OČEKÁVAT (Timeline)

| Čas | Co se stane |
|-----|-------------|
| **Okamžitě** | Sitemap dostupný na kastrup.cz/sitemap.xml |
| **24-48 hodin** | Google začne číst sitemap |
| **3-7 dní** | První články se objeví v indexu |
| **14 dní** | Většina stránek indexována |
| **30 dní** | Plný efekt SEO zlepšení |

---

## 🔍 JAK OVĚŘIT, ŽE TO FUNGUJE

### **1. Sitemap test (okamžitě)**
```
https://www.xml-sitemaps.com/validate-xml-sitemap.html
→ Zadej: https://kastrup.cz/sitemap.xml
→ Mělo by projít validací
```

### **2. Rich Results Test (okamžitě)**
```
https://search.google.com/test/rich-results
→ Zadej URL článku (např. https://kastrup.cz/clanek/kodani-2025)
→ Mělo by detekovat: Article + Breadcrumb schema
```

### **3. PageSpeed Insights (okamžitě)**
```
https://pagespeed.web.dev/
→ Zadej: https://kastrup.cz
→ SEO sekce by měla být 100/100
```

### **4. Site: operátor (po 7 dnech)**
```
Google Search → zadej:
site:kastrup.cz

Mělo by vrátit:
- Hlavní stránku
- Stránku článků
- Jednotlivé články (postupně přibývají)
```

---

## ⚠️ ZNÁMÉ PROBLÉMY A ŘEŠENÍ

### **Problém 1: Sitemap má jen statické stránky**
**Řešení:**
```bash
# Zkontroluj Vercel environment variables:
# VITE_SUPABASE_URL
# VITE_SUPABASE_PUBLISHABLE_KEY

# Musí být nastavené ve Vercel → Settings → Environment Variables
```

### **Problém 2: Články se neindexují**
**Příčiny:**
- ❌ Sitemap nebyl přidán do Search Console
- ❌ Robots.txt blokuje crawlery
- ❌ Meta robots noindex na stránkách

**Kontrola:**
```bash
# Zkontroluj, že článek NEMÁ meta robots noindex
curl -s https://kastrup.cz/clanek/kodani-2025 | grep "noindex"
# Mělo by vrátit prázdný výstup (nic nenalezeno)
```

---

## 🚀 DOPORUČENÉ DALŠÍ KROKY (Volitelné)

### **1. Přidat strukturovaná data pro FAQ**
Pokud máš FAQ sekce v článcích, přidej FAQ schema:
```tsx
// V ArticleDetail.tsx
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
};
```

### **2. Přidat Open Graph obrázky**
Pro každý článek ideálně unique OG image:
```tsx
<meta property="og:image" content={article.og_image || defaultOgImage} />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
```

### **3. Monitoring SEO performance**
- **Google Analytics 4** - sleduj organický traffic
- **Google Search Console** - sleduj impressions & clicks
- **Ahrefs / SEMrush** - sleduj keyword rankings (placené)

---

## 📞 Co dělat, když to nefunguje

**Pokud po 14 dnech stále není nic indexováno:**

1. **Zkontroluj Search Console coverage:**
   - Máš error? → Oprav podle návodu
   - Máš "Discovered - currently not indexed"? → Normální, Google čeká
   - Nic? → Zkontroluj, jestli byl sitemap správně přidán

2. **Manuální request indexing:**
   - URL Inspection → každý článek zvlášť
   - "Request Indexing"
   - Max 10 URLs/den

3. **Backlinky:**
   - Sdílej články na sociálních sítích
   - Přidej odkazy z jiných svých webů
   - Google rychleji najde stránky s backlinky

---

## 📝 Checklist před mergem

Před mergem do main zkontroluj:

- [ ] Všechny testy prošly (`npm run lint`)
- [ ] Build funguje (`npm run build`)
- [ ] `.env` obsahuje správné Supabase credentials
- [ ] Vercel má nastavené ENV proměnné
- [ ] PR description je vyplněný
- [ ] Dokumentace je aktuální

---

**Vytvořeno:** 26. 11. 2025
**Kontext:** SEO indexing improvements
**Branch:** `claude/improve-seo-indexing-01JmpEXyFNWCFQYGiMkZuJdX`
**Status:** ✅ Připraveno k merge

---

## TL;DR (Velmi stručně)

1. **TEĎ:** Vytvoř PR a mergni do main
2. **Po nasazení:** Přidej sitemap do Google Search Console
3. **Počkej 7-14 dní:** Google začne indexovat
4. **Sleduj:** Search Console → Coverage reports

**Hotovo!** 🎉
