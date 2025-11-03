# 📝 Používání Admin Panelu - Kompletní návod

## 🔐 Přístup k administraci

**URL:** `kastrup.cz/tajnedvere` (nebo `localhost:5173/tajnedvere` při lokálním vývoji)

---

## 1️⃣ První přihlášení

### Co potřebuješ:
- ✅ Email účtu v Supabase
- ✅ Heslo
- ✅ Roli `admin` v tabulce `profiles`

### Kontrola admin práv v Supabase:

1. Jdi na [supabase.com](https://supabase.com) → Tvůj projekt
2. Klikni na **Table Editor** → **profiles**
3. Najdi svůj účet (podle emailu)
4. Zkontroluj sloupec **`role`** → musí být **`admin`**
5. Pokud není, klikni na buňku a změň na `admin`

### Přihlášení:

1. Jdi na `kastrup.cz/tajnedvere`
2. Zadej **email** a **heslo**
3. Klikni **"Přihlásit se"**
4. Automaticky tě přesměruje na Dashboard ✨

---

## 2️⃣ Dashboard - Přehled

Po přihlášení uvidíš:

### 📊 Statistiky (3 kartičky):
- **Celkem článků** - Všechny články (publikované i koncepty)
- **Publikované** - Články viditelné na webu (zelená)
- **Koncepty** - Rozpracované články (oranžová)

### 🎯 Rychlé akce:
- **Nový článek** - Vytvoř nový článek
- **Správa článků** - Seznam všech článků

### 🔼 Horní menu:
- **Zpět na web** - Vrátí tě na hlavní stránku webu
- **Odhlásit se** - Odhlásí tě z administrace

---

## 3️⃣ Vytvoření nového článku

### Krok za krokem:

1. **Klikni na "Nový článek"** (na Dashboardu nebo v menu)

2. **Vyplň základní informace:**

   - **Název článku** ✏️
     - Například: "Nejlepší káva v Kodani"
     - Automaticky se vygeneruje slug (URL)

   - **Slug** 🔗
     - URL-friendly adresa (např. `nejlepsi-kava-v-kodani`)
     - Můžeš upravit, pokud chceš jiný než automatický
     - **DŮLEŽITÉ**: Slug musí být unikátní!

   - **Perex** 📄
     - Krátký úvodní text (2-3 věty)
     - Zobrazuje se v náhledech článků na hlavní stránce
     - Například: "Objevte 5 nejlepších kaváren v Kodani, kde si užijete skvělou kávu a atmosféru."

3. **Vyber kategorii** 🏷️
   - Dropdown s dostupnými kategoriemi
   - Například: Cestování, Kultura, Tipy, Gastronomie...

4. **Přidej hlavní obrázek** 🖼️
   - Zadej URL obrázku
   - Obrázek se zobrazí v náhledu pod polem
   - Tip: Použij obrázky z [Unsplash](https://unsplash.com) nebo vlastní hosting

5. **Napiš obsah článku** ✍️
   - Použij **WYSIWYG editor** (funguje jako Word)
   - Toolbar s tlačítky pro formátování:

### 🛠️ Toolbar editoru:

| Tlačítko | Funkce | Zkratka |
|----------|--------|---------|
| **H2** | Velký nadpis | - |
| **H3** | Menší nadpis | - |
| **B** | Tučné písmo | Ctrl+B |
| **I** | Kurzíva | Ctrl+I |
| **•** | Odrážkový seznam | - |
| **1.** | Číslovaný seznam | - |
| **🔗** | Vložit odkaz | - |
| **🖼️** | Vložit obrázek | - |

### Tipy pro psaní:

```
✅ DOBŘE:
Nadpis článku → H2
Podnádpisy → H3
Krátké odstavce (3-5 vět)
Použití seznamů pro přehlednost

❌ ŠPATNĚ:
Všechno tučně
Dlouhé odstavce (10+ vět)
Chybějící nadpisy
```

6. **SEO Optimalizace** (volitelné, ale doporučené) 🚀

   - **Meta Title**
     - Title tag pro Google (50-60 znaků)
     - Například: "Nejlepší káva v Kodani - Top 5 kaváren 2024"
     - Ukazatel: 🟢 zelená (ideální), 🟡 žlutá (OK), 🔴 červená (moc dlouhé/krátké)

   - **Meta Description**
     - Popis pro Google (150-160 znaků)
     - Například: "Objevte 5 nejlepších kaváren v Kodani s výbornou kávou, útulnou atmosférou a skvělými cenami. Kompletní průvodce 2024."

   - **Focus Keyword**
     - Hlavní klíčové slovo
     - Například: "káva Kodaň"

7. **Ulož nebo publikuj** 💾

   - **"Uložit koncept"** (šedé tlačítko)
     - Uloží článek, ale NEZOBRAZÍ se na webu
     - Můžeš dokončit později

   - **"Publikovat"** (zelené tlačítko)
     - Článek se IHNED zobrazí na webu
     - URL: `kastrup.cz/clanek/tvuj-slug`

---

## 4️⃣ Správa existujících článků

### Seznam článků (`/tajnedvere/articles`)

Zobrazí tabulku všech článků:

| Sloupec | Co zobrazuje |
|---------|--------------|
| **Název** | Název článku + slug |
| **Kategorie** | Badge s kategorií |
| **Stav** | 🟢 Publikováno / 🟠 Koncept |
| **Vytvořeno** | Datum vytvoření |
| **Akce** | Tlačítka: Zobrazit / Upravit / Smazat |

### 🔍 Akce s články:

#### 👁️ **Zobrazit** (ikona oka)
- Otevře článek na webu v novém tabu
- Můžeš zkontrolovat, jak vypadá publikovaný článek

#### ✏️ **Upravit** (ikona tužky)
- Otevře editor s existujícím obsahem
- Můžeš změnit cokoliv (název, text, SEO...)
- Po úpravě klikni **"Uložit změny"**

#### 🗑️ **Smazat** (ikona koše)
- **POZOR**: Nelze vrátit zpět!
- Zobrazí potvrzovací dialog
- Po potvrzení článek navždy smazán

---

## 5️⃣ Úprava článku

1. Klikni na **ikonu tužky** u článku
2. Editor se načte s obsahem článku
3. Proveď změny
4. Klikni **"Uložit změny"** nebo **"Publikovat"**

### Co můžeš měnit:
- ✅ Název a slug
- ✅ Perex a obsah
- ✅ Kategorii
- ✅ Hlavní obrázek
- ✅ SEO meta tagy
- ✅ Stav publikace (Koncept ↔ Publikováno)

---

## 6️⃣ Tipy a triky

### ✍️ Psaní kvalitního článku:

1. **Začni přitažlivým perexem**
   - První věta musí zaujmout
   - Uveď, co čtenář získá

2. **Strukturuj pomocí nadpisů**
   - H2 pro hlavní sekce
   - H3 pro podsekce
   - Pomůže čtenáři i SEO

3. **Používej seznamy**
   - Odrážky pro výčty
   - Čísla pro postupy
   - Zvyšuje čitelnost

4. **Přidávej obrázky**
   - Minimálně hlavní obrázek
   - V textu použij editor (tlačítko 🖼️)
   - Zadej URL obrázku

5. **Optimalizuj pro SEO**
   - Vyplň Meta Title (50-60 znaků)
   - Vyplň Meta Description (150-160 znaků)
   - Zadej Focus Keyword

### 🔗 Přidání odkazu:

1. Vyber text, který chceš udělat jako odkaz
2. Klikni na **tlačítko 🔗** v toolbaru
3. Zadej URL (např. `https://www.google.com`)
4. Klikni **"Vložit"**

### 🖼️ Přidání obrázku do článku:

1. Umísti kurzor tam, kde chceš obrázek
2. Klikni na **tlačítko 🖼️** v toolbaru
3. Zadej URL obrázku
4. Klikni **"Vložit"**
5. Obrázek se zobrazí v editoru

---

## 7️⃣ Workflow - Jak pracovat

### Doporučený postup:

```
1. Nový článek → Vyplň název, perex, kategorii
2. Napiš obsah → Použij nadpisy, seznamy, formátování
3. Uložit koncept → Zkontroluj si, že vše vypadá dobře
4. Zobrazit náhled → Otevři článek na webu (ikona oka)
5. Případné úpravy → Upravit (ikona tužky)
6. Publikovat → Článek jde live! 🎉
```

### Práce s koncepty:

- Koncepty nejsou viditelné na webu
- Můžeš v klidu pracovat, nikdo to nevidí
- Až budeš spokojený, klikni **"Publikovat"**

### Editace publikovaného článku:

- Publikované články můžeš kdykoliv upravit
- Změny se projeví **ihned** po uložení
- Můžeš i změnit zpět na koncept (zrušit publikaci)

---

## 8️⃣ Časté otázky (FAQ)

### ❓ Jak změním publikovaný článek zpět na koncept?
Uprav článek a vypni přepínač **"Publikováno"**, pak ulož.

### ❓ Co když zapomenu heslo?
Musíš si ho resetovat přes Supabase Auth (zatím není reset na webu).

### ❓ Mohu mít více adminů?
Ano, stačí v Supabase tabulce `profiles` nastavit více účtů s `role = 'admin'`.

### ❓ Jak velké mohou být obrázky?
Doporučeno max 500KB. Ideálně WebP formát pro rychlejší načítání.

### ❓ Mohu smazat kategorii?
Ano, ale nejdříve musíš změnit kategorii všech článků v této kategorii.

### ❓ Co když slug už existuje?
Dostaneš chybu. Musíš zvolit jiný slug (upravit ho ručně).

### ❓ Můžu psát HTML přímo?
Editor generuje HTML automaticky. Pokud chceš vlastní HTML, můžeš ho vložit přímo do Supabase.

### ❓ Jak rychle se článek zobrazí na webu?
**Okamžitě** po publikaci. Refresh stránku a je tam. ✨

---

## 9️⃣ Bezpečnost

### 🔒 Co je chráněno:

- ✅ Přístup jen pro adminy (ověřeno v databázi)
- ✅ Supabase Row Level Security (RLS)
- ✅ Automatické odhlášení po zavření prohlížeče (session)

### ⚠️ Doporučení:

- **Nesdílej** přihlašovací údaje
- **Používej silné heslo** (min. 12 znaků)
- **Odhlásit se** po skončení práce (tlačítko vpravo nahoře)

---

## 🆘 Troubleshooting

### Problém: "Nemáte oprávnění k přístupu"
**Řešení:** Zkontroluj v Supabase tabulce `profiles`, že máš `role = 'admin'`

### Problém: Článek se neuloží
**Řešení:**
- Zkontroluj, že jsi vyplnil všechna povinná pole
- Zkontroluj, že slug je unikátní
- Zkontroluj konzoli prohlížeče (F12) pro chyby

### Problém: Obrázek se nezobrazí
**Řešení:**
- Zkontroluj, že URL je správná (začíná `https://`)
- Zkontroluj, že obrázek existuje (otevři URL v novém tabu)
- Zkontroluj, že obrázek má správnou příponu (.jpg, .png, .webp)

### Problém: Editor nereaguje
**Řešení:**
- Refresh stránku (F5)
- Zkontroluj připojení k internetu
- Vymažte cache prohlížeče (Ctrl+Shift+Delete)

### Problém: Článek není na webu po publikaci
**Řešení:**
- Zkontroluj, že jsi klikl na **"Publikovat"** (ne jen "Uložit koncept")
- Refresh hlavní stránku webu (Ctrl+F5)
- Zkontroluj v seznamu článků, že má zelený badge "Publikováno"

---

## 🎉 Hotovo!

Nyní umíš:
- ✅ Přihlásit se do administrace
- ✅ Vytvářet nové články
- ✅ Upravovat existující články
- ✅ Používat WYSIWYG editor
- ✅ Optimalizovat pro SEO
- ✅ Publikovat a spravovat obsah

**Teď už jen piš a tvoř skvělý obsah pro Kastrup.cz! 🚀**

---

## 📚 Další dokumentace

- **[NASAZENI_NA_VERCEL.md](NASAZENI_NA_VERCEL.md)** - Jak nasadit web na Vercel
- **[README.md](README.md)** - Kompletní projektová dokumentace
- **[KDE_PRIDAT_CLANKY.md](KDE_PRIDAT_CLANKY.md)** - Jak přidávat články přímo v Supabase

---

**Něco nejasné? Mrkni do README.md nebo se ozvi!** 😊
