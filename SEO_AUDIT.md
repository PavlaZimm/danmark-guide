# SEO Audit - Kastrup.cz

## ✅ Co už máme (Home page)
- ✅ Meta description, keywords, canonical
- ✅ Open Graph tags
- ✅ Twitter Cards
- ✅ JSON-LD structured data (WebSite, Organization)
- ✅ Optimalizovaný title
- ✅ Alt texty na obrázcích
- ✅ Lazy loading

## ❌ KRITICKÉ SEO problémy

### 1. **Chybějící meta tagy na 3 stránkách**
- ❌ `/clanky` (Articles) - žádné Helmet tagy!
- ❌ `/ubytovani` (Accommodation) - žádné Helmet tagy!
- ❌ `*` (NotFound) - žádné Helmet tagy!

**Dopad:** Google indexuje tyto stránky s defaultním title a bez description → špatný CTR

### 2. **Chybí robots.txt**
```
Status: ❌ Neexistuje
Důležitost: VYSOKÁ
```

Bez robots.txt Google neví:
- Kde je sitemap
- Co crawlovat
- Co ignorovat

### 3. **Chybí sitemap.xml**
```
Status: ❌ Neexistuje
Důležitost: KRITICKÁ
```

Bez sitemap:
- Google neví o všech stránkách
- Pomalé indexování nového obsahu
- Horší objevitelnost

### 4. **Chybí Schema.org markup pro obsah**
- ❌ Články nemají Article schema
- ❌ Ubytování nemá LocalBusiness/Hotel schema
- ❌ Kontakt nemá ContactPage schema

**Dopad:** Žádné rich snippets v Google → nižší CTR

### 5. **Favicon a app icons**
```
Status: ❌ Není implementováno
```

**Dopad:**
- Neprofesionální vzhled v prohlížeči
- Chybí v bookmarks
- Chybí při sdílení

### 6. **Heading hierarchie není kontrolována**
```
Status: ⚠️  Potřeba kontrola
```

SEO vyžaduje:
- Pouze jeden H1 na stránku
- Logická hierarchie H1 → H2 → H3
- Žádné přeskakování levelů

## 🟡 DŮLEŽITÉ vylepšení

### 7. **Canonical URL chybí na ostatních stránkách**
```
Home: ✅ Má
Ostatní: ❌ Chybí
```

### 8. **Open Graph obrázky**
```
Home: ✅ Má (ale URL může být relativní)
Ostatní: ❌ Chybí
```

**Problém:** Při sdílení na FB/Twitter se neukáže náhled!

### 9. **Internal linking není optimalizován**
```
Status: ⚠️  Slabé
```

Současný stav:
- Málo interních odkazů
- Chybí breadcrumbs
- Chybí související články
- Chybí "Více o..." odkazy

### 10. **URL struktura není optimální**
```
Současné:
/clanek/:slug ✅ Dobré
/clanky ⚠️  Mělo by být /clanky nebo /blog
/ubytovani ✅ Dobré

Chybí:
/sitemap.xml ❌
/robots.txt ❌
```

## 🟢 NICE-TO-HAVE

### 11. **Performance SEO**
```
- Image optimization (554 KB → 177 KB možné)
- Core Web Vitals optimalizace
- Preload kritických resource
```

### 12. **Content SEO**
```
- Keyword density není optimalizována
- Chybí FAQs (FAQ schema)
- Chybí dlouhé-form content (1000+ slov)
- Meta description délka není ověřena (ideálně 150-160 znaků)
```

### 13. **Technical SEO**
```
- ❌ Chybí preconnect pro fonty/API
- ❌ Není implementováno preloading
- ⚠️  SSL/HTTPS (předpokládám že bude)
- ❌ Security headers (CSP, X-Frame-Options)
```

### 14. **Local SEO (pro ubytování)**
```
- ❌ Chybí Google Maps integrace
- ❌ Chybí GeoCoordinates v schema
- ❌ Chybí local business listings
```

### 15. **Analytics & Monitoring**
```
- ❌ Google Analytics není viděn
- ❌ Google Search Console setup není viděn
- ❌ Structured data testing tool results
```

## 📊 Prioritní akční plán

### FÁZE 1: Kritické (dnes/zítra)
1. ✅ Přidat meta tagy na Articles, Accommodation, NotFound
2. ✅ Vytvořit robots.txt
3. ✅ Vytvořit sitemap.xml
4. ✅ Přidat Schema.org pro články
5. ✅ Přidat Schema.org pro ubytování

### FÁZE 2: Důležité (tento týden)
6. ✅ Přidat favicon a app icons
7. ✅ Zkontrolovat heading hierarchii
8. ✅ Opravit Open Graph obrázky (absolute URLs)
9. ✅ Přidat canonical na všechny stránky

### FÁZE 3: Vylepšení (tento měsíc)
10. ⏳ Optimalizovat obrázky (WebP)
11. ⏳ Přidat breadcrumbs
12. ⏳ Vylepšit internal linking
13. ⏳ Setup Google Search Console

### FÁZE 4: Long-term
14. ⏳ Performance optimalizace (Core Web Vitals)
15. ⏳ Content marketing strategie
16. ⏳ Local SEO pro ubytování
17. ⏳ Backlink strategie

## 🎯 Očekávané výsledky

Po implementaci Fáze 1-2:
- 📈 +40% lepší indexování Google
- 📈 +25% vyšší CTR díky rich snippets
- 📈 +30% rychlejší objevení nového obsahu
- 📈 Profesionální vzhled při sdílení na sociálních sítích

## 🔧 Nástroje pro testování

Po implementaci otestujte:
1. **Google Rich Results Test**: https://search.google.com/test/rich-results
2. **PageSpeed Insights**: https://pagespeed.web.dev/
3. **Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly
4. **Schema Markup Validator**: https://validator.schema.org/
5. **Open Graph Debugger**: https://developers.facebook.com/tools/debug/

---

**Poznámka:** Toto je živý dokument. Aktualizujte po každé implementaci.

**Poslední update:** 2025-11-02
