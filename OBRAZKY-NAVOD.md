# 🖼️ Návod: Jak přidávat obrázky do článků

## 🎯 Proč je důležité optimalizovat obrázky

- ✅ **Rychlejší načítání** - menší soubory = rychlejší stránka
- ✅ **Lepší SEO** - Google preferuje rychlé stránky
- ✅ **Lepší UX** - návštěvníci nečekají
- ✅ **Nižší spotřeba dat** - důležité na mobilech

---

## 📤 Jak nahrát obrázek v admin panelu

### Krok 1: Příprava obrázku

**Před nahráním doporučujeme optimalizovat:**

1. **Jděte na [squoosh.app](https://squoosh.app)**
2. **Nahrajte svůj obrázek**
3. **Vyberte formát: WebP**
4. **Nastavte kvalitu: 75-85%**
5. **Změňte velikost** (doporučeno max 1920px šířka)
6. **Stáhněte optimalizovaný obrázek**

### Krok 2: Nahrání v editoru

1. **Přihlaste se** do admin panelu: `/tajnedvere`
2. **Otevřete článek** ke editaci
3. **Klikněte na tlačítko "Upload" (📤)** v toolbaru editoru
4. **Vyberte soubor** nebo přetáhněte obrázek
5. **Vyplňte ALT text** (popis pro SEO - velmi důležité!)
6. **Přidejte popisek** (volitelné - zobrazí se pod obrázkem)
7. **Klikněte "Vložit do článku"**

**Hotovo!** Obrázek je automaticky optimalizovaný s:
- ✅ WebP formátem
- ✅ Lazy loading
- ✅ Responsivním designem
- ✅ Správným alt textem

---

## 🎨 Ukázka výsledku

Když nahrajete obrázek, vygeneruje se tento HTML kód:

```html
<figure style="margin: 30px 0; text-align: center;">
  <picture>
    <source srcset="URL_OBRAZKU.webp" type="image/webp" />
    <img
      src="URL_OBRAZKU.jpg"
      alt="Váš popis obrázku"
      loading="lazy"
      style="width: 100%; max-width: 800px; height: auto; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);"
    />
  </picture>
  <figcaption style="color: #666; font-size: 14px; margin-top: 12px; font-style: italic;">
    Popisek obrázku
  </figcaption>
</figure>
```

To je **úplně stejný formát** jako na stránce "O Dánsku"! 🎉

---

## 💡 Best practices pro ALT text

### ✅ Dobré příklady:

- "Barevné domky v Nyhavnu, Kodaň, Dánsko"
- "Tivoli Gardens v noci s rozsvícenými světly"
- "Amalienborg palác - sídlo dánské královské rodiny"
- "Typické dánské smørrebrød s lososem"

### ❌ Špatné příklady:

- "IMG_1234" (nejsou to informace)
- "obrázek" (příliš obecné)
- "Kodaň" (nedostatečný popis)
- "" (prázdné - velmi špatné pro SEO!)

**Pravidla:**
1. **Popište co je na obrázku vidět**
2. **Zahrňte klíčová slova** (ale přirozeně!)
3. **Nepište "obrázek" nebo "fotka"** - už to je jasné
4. **Buďte specifičtí** - místo "budova" napište "Amalienborg palác"

---

## 🛠️ Pokročilé možnosti

### Dva obrázky vedle sebe

V HTML módu vložte:

```html
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 30px 0;">
  <figure>
    <img src="URL1" alt="Popis 1" loading="lazy" style="width: 100%; border-radius: 8px;" />
    <figcaption style="text-align: center; font-size: 13px; color: #666; margin-top: 8px;">Popisek 1</figcaption>
  </figure>

  <figure>
    <img src="URL2" alt="Popis 2" loading="lazy" style="width: 100%; border-radius: 8px;" />
    <figcaption style="text-align: center; font-size: 13px; color: #666; margin-top: 8px;">Popisek 2</figcaption>
  </figure>
</div>
```

### Galerie (3 obrázky)

```html
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin: 30px 0;">
  <img src="URL1" alt="Popis 1" loading="lazy" style="width: 100%; border-radius: 8px;" />
  <img src="URL2" alt="Popis 2" loading="lazy" style="width: 100%; border-radius: 8px;" />
  <img src="URL3" alt="Popis 3" loading="lazy" style="width: 100%; border-radius: 8px;" />
</div>
```

### Responsivní galerie (2 sloupce na mobilu, 3 na desktopu)

```html
<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 15px; margin: 30px 0;">
  <img src="URL1" alt="Popis 1" loading="lazy" style="width: 100%; border-radius: 8px;" />
  <img src="URL2" alt="Popis 2" loading="lazy" style="width: 100%; border-radius: 8px;" />
  <img src="URL3" alt="Popis 3" loading="lazy" style="width: 100%; border-radius: 8px;" />
</div>
```

---

## 📊 Optimalizace obrázků - kompletní průvodce

### 1. Ideální rozměry

| Typ obrázku | Šířka | Poznámka |
|-------------|--------|----------|
| Hlavní článkový obrázek | 1920px | Hero image |
| Normální obrázek v textu | 1200px | Standardní |
| Thumbnaily | 600px | Náhledy |
| Mobilní | 800px | Pro mobilní zařízení |

### 2. Formáty

| Formát | Kdy použít | Výhody |
|--------|-----------|--------|
| **WebP** | Vždy pokud možno | Nejmenší velikost, skvělá kvalita |
| JPEG | Fallback pro WebP | Dobrá kompatibilita |
| PNG | Loga, grafika s průhledností | Bezeztrátové |
| GIF | Animace (raritně) | Animované obrázky |

### 3. Komprese

- **WebP:** 75-85% kvalita
- **JPEG:** 80-90% kvalita
- **PNG:** Použijte TinyPNG nebo squoosh.app

### 4. Nástroje pro optimalizaci

1. **[Squoosh.app](https://squoosh.app)** ⭐ (doporučeno)
   - Zdarma
   - Funguje v prohlížeči
   - Podporuje všechny formáty
   - Vidíte náhled před/po

2. **[TinyPNG](https://tinypng.com)**
   - Skvělé pro PNG
   - Batch processing
   - Zdarma do 20 obrázků

3. **[ImageOptim](https://imageoptim.com)** (Mac)
   - Lokální aplikace
   - Velmi rychlá
   - Zdarma

4. **[JPEG-Optimizer](http://www.jpeg-optimizer.com)**
   - Online nástroj
   - Pouze JPEG
   - Zdarma

---

## 🔍 SEO tipy pro obrázky

### 1. Názvy souborů

✅ **Dobré:**
- `kodan-nyhavn-barevne-domky.webp`
- `tivoli-gardens-noc.jpg`
- `amalienborg-palac.webp`

❌ **Špatné:**
- `IMG_1234.jpg`
- `DSC00045.jpg`
- `obrazek1.png`

### 2. ALT text strategie

- **Používejte klíčová slova** (ale přirozeně)
- **Popište kontext** - ne jen "dům", ale "tradiční dánský dům v Nørrebru"
- **Délka: 5-15 slov** ideálně
- **Nezapomeňte na polohu** - "Kodaň", "Dánsko"

### 3. Strukturované data

Upload automaticky vytváří správný HTML s:
- `<figure>` element pro strukturu
- `<picture>` pro responsivní obrázky
- `<figcaption>` pro popisky
- `loading="lazy"` pro výkon

---

## ⚠️ Časté chyby a jak se jim vyhnout

### Problém: Obrázek je příliš velký (>1MB)

**Řešení:**
1. Použijte squoosh.app
2. Změňte velikost na max 1920px
3. Použijte WebP s kvalitou 75-80%

### Problém: Obrázek se nenačte

**Řešení:**
1. Zkontrolujte URL obrázku
2. Ujistěte se, že je nahraný v Supabase Storage
3. Zkontrolujte network tab v Developer Tools

### Problém: Obrázek není responsivní

**Řešení:**
- Použijte upload tlačítko (📤) - automaticky generuje responsivní kód
- Nebo přidejte `style="width: 100%; height: auto;"`

### Problém: Špatná kvalita po uploadu

**Řešení:**
- Nahrávejte větší obrázky (min 1200px šířka)
- Nepoužívejte obrázky menší než 800px
- Pre-optimalizujte pomocí squoosh.app

---

## 📝 Checklist před publikací článku

- [ ] Všechny obrázky mají ALT text
- [ ] Obrázky jsou optimalizované (WebP nebo <200KB)
- [ ] Obrázky mají popisky (pokud je to relevantní)
- [ ] Obrázky jsou relevantní k obsahu
- [ ] Názvy souborů obsahují klíčová slova
- [ ] První obrázek má `loading="eager"` (ostatní "lazy")
- [ ] Obrázky jsou responsivní

---

## 🆘 Potřebujete pomoc?

Pokud máte problémy s obrázky:
1. Zkontrolujte tento návod
2. Podívejte se na stránku "O Dánsku" - tam vidíte ideální příklad
3. Kontaktujte: zimmermannovap@gmail.com

---

**Vytvořeno:** 2025-01-20
**Aktualizováno:** 2025-01-20
