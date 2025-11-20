# 🗺️ Návod: Jak přidávat interaktivní mapy do článků

## 🎯 Co jsou Leaflet mapy

Leaflet je nejpopulárnější open-source knihovna pro interaktivní mapy. Mapy v článcích umožňují:
- ✅ Zobrazit přesnou polohu míst
- ✅ Přidat markery (špendlíky) s popisky
- ✅ Interaktivní ovládání (zoom, posuv)
- ✅ Profesionální vzhled stejný jako na velkých webech
- ✅ Lepší uživatelská zkušenost

---

## 📝 Jak přidat mapu do článku

### Krok 1: Najdi souřadnice

1. Jdi na [Google Maps](https://maps.google.com) nebo [OpenStreetMap](https://www.openstreetmap.org)
2. Najdi místo (např. Kodaň)
3. Klikni pravým tlačítkem → "Co je zde?" (na Google Maps)
4. Zkopíruj souřadnice (např: `55.6761, 12.5683`)

**Formát:**
- První číslo = **latitude** (zeměpisná šířka)
- Druhé číslo = **longitude** (zeměpisná délka)

### Krok 2: Vlož do článku

V admin panelu, v **HTML módu**, vložte tento kód:

```html
<div data-map lat="55.6761" lng="12.5683" zoom="13"></div>
```

**Hotovo!** Mapa se automaticky zobrazí na webu. 🎉

---

## 🎨 Příklady použití

### 1. Základní mapa (jedno místo)

```html
<div data-map lat="55.6761" lng="12.5683" zoom="13"></div>
```

**Výsledek:** Mapa centroví na Kodaň se zoomem 13.

---

### 2. Mapa s popiskem

```html
<div
  data-map
  lat="55.6761"
  lng="12.5683"
  zoom="13"
  caption="Mapa centra Kodaně"
></div>
```

**Výsledek:** Mapa s popiskem pod ní.

---

### 3. Mapa s více markery

```html
<div
  data-map
  lat="55.6761"
  lng="12.5683"
  zoom="12"
  markers='[
    {"lat": 55.6761, "lng": 12.5683, "title": "Kodaň", "description": "Hlavní město Dánska"},
    {"lat": 55.6867, "lng": 12.5700, "title": "Nyhavn", "description": "Ikonický přístav"},
    {"lat": 55.6759, "lng": 12.5655, "title": "Tivoli", "description": "Zábavní park"}
  ]'
  caption="Hlavní atrakce v Kodani"
></div>
```

**Výsledek:** Mapa s 3 markery. Kliknutím na marker se zobrazí popisek.

---

### 4. Větší mapa

```html
<div
  data-map
  lat="55.6761"
  lng="12.5683"
  zoom="13"
  height="600px"
></div>
```

**Výsledek:** Mapa vysoká 600px (místo standardních 400px).

---

## 🔧 Všechny parametry

| Parametr | Povinný | Výchozí | Popis | Příklad |
|----------|---------|---------|-------|---------|
| `lat` | ✅ Ano | - | Zeměpisná šířka | `55.6761` |
| `lng` | ✅ Ano | - | Zeměpisná délka | `12.5683` |
| `zoom` | ❌ Ne | `13` | Úroveň přiblížení (1-18) | `15` |
| `markers` | ❌ Ne | Jeden marker uprostřed | JSON pole markerů | Viz příklad |
| `caption` | ❌ Ne | Žádný | Popisek pod mapou | `"Mapa Kodaně"` |
| `height` | ❌ Ne | `400px` | Výška mapy | `"600px"` |

---

## 📍 Práce s markery

Markery jsou "špendlíky" na mapě. Každý marker má:

```json
{
  "lat": 55.6761,           // Zeměpisná šířka (povinné)
  "lng": 12.5683,           // Zeměpisná délka (povinné)
  "title": "Název místa",   // Titulek v popup (volitelné)
  "description": "Popis"    // Popis v popup (volitelné)
}
```

### Příklad: Vytvořit mapu s 5 restauracemi

```html
<div
  data-map
  lat="55.6761"
  lng="12.5683"
  zoom="14"
  markers='[
    {"lat": 55.6761, "lng": 12.5683, "title": "Noma", "description": "Michelinská hvězda"},
    {"lat": 55.6780, "lng": 12.5700, "title": "Geranium", "description": "3 Michelinské hvězdy"},
    {"lat": 55.6750, "lng": 12.5650, "title": "Restaurant Krebsegaarden"},
    {"lat": 55.6800, "lng": 12.5720, "title": "Kadeau"},
    {"lat": 55.6740, "lng": 12.5680, "title": "AOC", "description": "Skvělá kuchyně"}
  ]'
  caption="Top 5 restaurací v Kodani"
></div>
```

---

## 🎯 Zoom levels (úrovně přiblížení)

| Zoom | Co vidíte | Použití |
|------|-----------|---------|
| 1-3 | Celá země | Mapa celého Dánska |
| 4-6 | Region | Jihozápadní Dánsko |
| 7-10 | Město | Kodaň celá |
| 11-13 | Čtvrť | Centrum Kodaně |
| 14-16 | Ulice | Konkrétní ulice |
| 17-18 | Budovy | Detail budov |

**Doporučené:**
- Jeden marker: `zoom="13-15"`
- Více markerů: `zoom="12"` (mapa se automaticky přizpůsobí)
- Celé město: `zoom="11-12"`

---

## 💡 Tipy a triky

### 1. Jak najít správné souřadnice

**Google Maps:**
1. Najdi místo
2. Pravé tlačítko → "Co je zde?"
3. Souřadnice se zobrazí dole

**OpenStreetMap:**
1. Najdi místo
2. Pravé tlačítko → "Zobrazit adresu"
3. URL obsahuje souřadnice

### 2. Formátování JSON pro markery

❌ **Špatně:**
```html
markers="[{"lat": 55.6761, "lng": 12.5683}]"  <!-- Chybí apostrofy -->
```

✅ **Správně:**
```html
markers='[{"lat": 55.6761, "lng": 12.5683}]'  <!-- Apostrofy kolem -->
```

**Důležité:**
- Použijte **apostrofy** `'` kolem JSON
- Uvnitř JSON používejte **uvozovky** `"`
- Nezapomeňte čárky mezi objekty

### 3. Kontrola JSON validity

Pokud mapa nefunguje, zkontrolujte JSON:
1. Jděte na [jsonlint.com](https://jsonlint.com)
2. Vložte váš JSON (pouze obsah markers)
3. Klikněte "Validate"

### 4. Více map v jednom článku

Můžete přidat kolik map chcete:

```html
<h2>Kodaň</h2>
<div data-map lat="55.6761" lng="12.5683" zoom="13"></div>

<h2>Aarhus</h2>
<div data-map lat="56.1629" lng="10.2039" zoom="13"></div>

<h2>Odense</h2>
<div data-map lat="55.4038" lng="10.4024" zoom="13"></div>
```

---

## 🎨 Stylování

Mapa má automaticky:
- ✅ Zaoblené rohy (border-radius: 12px)
- ✅ Stín (box-shadow)
- ✅ Responsivní šířka (100%)
- ✅ Marginy (30px nahoře/dole)

**Stejný vzhled jako obrázky na stránce "O Dánsku"!**

---

## 📊 Příklady pro různé typy článků

### Článek o městě

```html
<h2>Kde se v Kodani nachází</h2>
<div
  data-map
  lat="55.6761"
  lng="12.5683"
  zoom="11"
  caption="Kodaň na mapě Dánska"
></div>
```

### Článek s itinerárem

```html
<h2>Den 1: Centrum</h2>
<div
  data-map
  lat="55.6761"
  lng="12.5683"
  zoom="14"
  markers='[
    {"lat": 55.6761, "lng": 12.5683, "title": "Start: Hlavní nádraží"},
    {"lat": 55.6867, "lng": 12.5700, "title": "1. Nyhavn"},
    {"lat": 55.6759, "lng": 12.5655, "title": "2. Tivoli"},
    {"lat": 55.6841, "lng": 12.5934, "title": "3. Malá mořská víla"}
  ]'
  caption="Itinerář prvního dne v Kodani"
></div>
```

### Článek o regionu

```html
<h2>Nejkrásnější místa v severním Sjællandu</h2>
<div
  data-map
  lat="56.0"
  lng="12.4"
  zoom="9"
  markers='[
    {"lat": 56.1167, "lng": 12.3667, "title": "Helsingør - Hamlet's Castle"},
    {"lat": 55.9186, "lng": 12.0831, "title": "Frederiksborg"},
    {"lat": 55.9408, "lng": 12.3081, "title": "Louisiana Museum"}
  ]'
></div>
```

---

## ⚠️ Řešení problémů

### Mapa se nezobrazuje

1. **Zkontrolujte souřadnice**
   - Jsou ve formátu `lat="55.6761"` (ne `lat=55.6761` bez uvozovek)
   - Čísla jsou oddělená tečkou (ne čárkou)

2. **Zkontrolujte JSON markerů**
   - Použili jste apostrofy kolem?
   - JSON je platný? (zkuste jsonlint.com)

3. **Zkontrolujte atributy**
   - `data-map` je přítomen
   - `lat` a `lng` jsou vyplněné

### Mapa je rozbitá / divně vypadá

1. **Vyčistěte cache**
   - Stiskněte Ctrl+F5 (Windows) nebo Cmd+Shift+R (Mac)

2. **Zkontrolujte výšku**
   - Přidejte `height="500px"` pokud je mapa malá

### Markery se nezobrazují

1. **Zkontrolujte JSON formát**
   ```html
   markers='[{"lat": 55.6761, "lng": 12.5683}]'
   ```

2. **Zkontrolujte čárky**
   - Mezi markery musí být čárky
   - Za posledním markerem NE

---

## 📚 Užitečné odkazy

- **Najít souřadnice:** [Google Maps](https://maps.google.com)
- **Validovat JSON:** [JSONLint](https://jsonlint.com)
- **Leaflet dokumentace:** [leafletjs.com](https://leafletjs.com)

---

## 🚀 Rychlý start

**1. Základní mapa (copy-paste ready):**
```html
<div data-map lat="55.6761" lng="12.5683" zoom="13"></div>
```

**2. S popiskem:**
```html
<div data-map lat="55.6761" lng="12.5683" zoom="13" caption="Mapa Kodaně"></div>
```

**3. S markery:**
```html
<div
  data-map
  lat="55.6761"
  lng="12.5683"
  markers='[
    {"lat": 55.6761, "lng": 12.5683, "title": "Kodaň"},
    {"lat": 55.6867, "lng": 12.5700, "title": "Nyhavn"}
  ]'
></div>
```

---

**Máte dotazy?** Kontakt: zimmermannovap@gmail.com

**Vytvořeno:** 2025-01-20
**Aktualizováno:** 2025-01-20
