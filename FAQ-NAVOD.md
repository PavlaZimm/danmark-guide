# 📋 Návod: Jak přidat FAQ do článků

## 🎯 Co je FAQ a proč ho používat

FAQ (Frequently Asked Questions - Často kladené otázky) jsou důležité pro:
- ✅ **SEO** - Google zobrazuje FAQ přímo ve výsledcích vyhledávání
- ✅ **Uživatelská zkušenost** - návštěvníci rychle najdou odpovědi
- ✅ **Struktura** - přehledné zobrazení otázek a odpovědí

## 🔧 Jak přidat FAQ do článku

### Způsob 1: V admin panelu (doporučeno)

1. **Přihlaste se** do admin panelu: `https://kastrup.cz/tajnedvere`
2. **Otevřete článek** ke editaci
3. **Přepněte do HTML módu** (tlačítko "HTML" v editoru)
4. **Vložte FAQ sekci** na konec článku (před závěrečný text/footer):

```html
<section id="faq" class="faq-section">
  <h2>Často kladené otázky</h2>

  <details class="group mb-4 rounded-lg border bg-card p-4 transition-all hover:shadow-md">
    <summary class="cursor-pointer font-semibold text-lg list-none flex items-center justify-between">
      <span>Zde napište otázku</span>
      <span class="text-primary transition-transform group-open:rotate-180">▼</span>
    </summary>
    <p class="mt-4 text-muted-foreground">Zde napište odpověď na otázku. Může být delší, s více odstavci.</p>
  </details>

  <details class="group mb-4 rounded-lg border bg-card p-4 transition-all hover:shadow-md">
    <summary class="cursor-pointer font-semibold text-lg list-none flex items-center justify-between">
      <span>Další otázka</span>
      <span class="text-primary transition-transform group-open:rotate-180">▼</span>
    </summary>
    <p class="mt-4 text-muted-foreground">Odpověď na druhou otázku.</p>
  </details>

  <!-- Přidejte další otázky podle potřeby -->

</section>
```

5. **Uložte článek**
6. **Zkontrolujte výsledek** na webu

### Způsob 2: Přes Supabase SQL Editor

Pokud chcete přidat FAQ do existujícího článku přes databázi:

1. Otevřete Supabase Dashboard
2. Jděte do **SQL Editor**
3. Použijte migraci: `supabase/migrations/20250120_add_faq_copenhagen.sql`

## 📝 Ukázkové FAQ pro různé typy článků

### FAQ pro článek o městě (Kodaň, Aarhus...)

```html
<section id="faq">
  <h2>Často kladené otázky o [Název města]</h2>

  <details class="group mb-4 rounded-lg border bg-card p-4 transition-all hover:shadow-md">
    <summary class="cursor-pointer font-semibold text-lg list-none flex items-center justify-between">
      <span>Jak se dostat z letiště do centra?</span>
      <span class="text-primary transition-transform group-open:rotate-180">▼</span>
    </summary>
    <p class="mt-4 text-muted-foreground">Odpověď s praktickými informacemi o dopravě...</p>
  </details>

  <details class="group mb-4 rounded-lg border bg-card p-4 transition-all hover:shadow-md">
    <summary class="cursor-pointer font-semibold text-lg list-none flex items-center justify-between">
      <span>Kolik stojí vstupné do [hlavní atrakce]?</span>
      <span class="text-primary transition-transform group-open:rotate-180">▼</span>
    </summary>
    <p class="mt-4 text-muted-foreground">Cenové informace a tipy...</p>
  </details>

  <details class="group mb-4 rounded-lg border bg-card p-4 transition-all hover:shadow-md">
    <summary class="cursor-pointer font-semibold text-lg list-none flex items-center justify-between">
      <span>Kdy je nejlepší čas navštívit [město]?</span>
      <span class="text-primary transition-transform group-open:rotate-180">▼</span>
    </summary>
    <p class="mt-4 text-muted-foreground">Informace o ročních obdobích a turistické sezóně...</p>
  </details>
</section>
```

### FAQ pro kulturní téma

```html
<section id="faq">
  <h2>Často kladené otázky o [téma]</h2>

  <details class="group mb-4 rounded-lg border bg-card p-4 transition-all hover:shadow-md">
    <summary class="cursor-pointer font-semibold text-lg list-none flex items-center justify-between">
      <span>Co přesně znamená [pojem]?</span>
      <span class="text-primary transition-transform group-open:rotate-180">▼</span>
    </summary>
    <p class="mt-4 text-muted-foreground">Vysvětlení pojmu...</p>
  </details>

  <details class="group mb-4 rounded-lg border bg-card p-4 transition-all hover:shadow-md">
    <summary class="cursor-pointer font-semibold text-lg list-none flex items-center justify-between">
      <span>Jak se to praktikuje v Dánsku?</span>
      <span class="text-primary transition-transform group-open:rotate-180">▼</span>
    </summary>
    <p class="mt-4 text-muted-foreground">Praktické příklady...</p>
  </details>
</section>
```

### FAQ pro praktický průvodce

```html
<section id="faq">
  <h2>Často kladené otázky</h2>

  <details class="group mb-4 rounded-lg border bg-card p-4 transition-all hover:shadow-md">
    <summary class="cursor-pointer font-semibold text-lg list-none flex items-center justify-between">
      <span>Potřebuji vízum do Dánska?</span>
      <span class="text-primary transition-transform group-open:rotate-180">▼</span>
    </summary>
    <p class="mt-4 text-muted-foreground">Informace o vízové politice...</p>
  </details>

  <details class="group mb-4 rounded-lg border bg-card p-4 transition-all hover:shadow-md">
    <summary class="cursor-pointer font-semibold text-lg list-none flex items-center justify-between">
      <span>Jaká je průměrná cena [služby/produktu]?</span>
      <span class="text-primary transition-transform group-open:rotate-180">▼</span>
    </summary>
    <p class="mt-4 text-muted-foreground">Cenové informace...</p>
  </details>
</section>
```

## 🎨 Jak FAQ vypadá na webu

FAQ sekce má profesionální design stejně jako stránka "O Dánsku":
- ✅ Klikací otázky (tmavý text, tučný) s flexbox layoutem
- ✅ Rozklikávací odpovědi se světlým textem
- ✅ Animovaná šipka (▼) která se otáčí při otevření (pomocí `group-open:rotate-180`)
- ✅ Světlé pozadí s rámečkem (`bg-card`, `border`, `rounded-lg`)
- ✅ Hover efekt (stín při najetí myší - `hover:shadow-md`)
- ✅ Kompletní responsivní design

**Důležité:** Vždy používejte kompletní strukturu včetně všech tříd (`class="..."`), aby FAQ vypadaly **identicky** jako na stránce "O Dánsku"!

## 🔍 SEO tipy pro FAQ

1. **Používejte přirozené otázky** - pište tak, jak se lidé ptají
2. **Specifické odpovědi** - buďte konkrétní (ceny, časy, místa)
3. **5-10 otázek** - optimální počet pro jeden článek
4. **Klíčová slova** - zahrňte důležitá slova z článku
5. **Aktuální informace** - udržujte FAQ aktuální

## ❓ Příklady dobrých otázek

✅ **Dobře:**
- "Kolik stojí vstupné do Tivoli?"
- "Jak dlouho trvá cesta z letiště?"
- "Je Copenhagen Card opravdu výhodná?"

❌ **Špatně:**
- "Vstupné" (není to otázka)
- "Něco o dopravě" (není specifické)
- "Ano/Ne" otázky bez kontextu

## 🛠️ Řešení problémů

### FAQ se nezobrazuje

1. Zkontrolujte, že používáte správnou strukturu: `<details>` a `<summary>`
2. Ujistěte se, že jste v HTML módu správně vložili kód
3. Zkontrolujte, že nejsou překlepy v tazích

### FAQ nemá správný styl

1. Ujistěte se, že používáte **úplně stejnou strukturu** jako v příkladech výše
2. Zkontrolujte, že máte **všechny třídy** (`class="..."`) správně zkopírované
3. Zkontrolujte, že jste nezapomněli na šipku: `<span class="text-primary transition-transform group-open:rotate-180">▼</span>`
4. Ujistěte se, že otázka je obalená ve `<span>` a šipka je v samostatném `<span>`

### Šipka se neotáčí

1. Zkontrolujte, že šipka má třídu: `class="text-primary transition-transform group-open:rotate-180"`
2. Zkontrolujte, že `<details>` element má třídu `group`
3. Pokud problém přetrvává, zkuste vyčistit cache prohlížeče (Ctrl+F5)

## 📊 Příklad kompletního FAQ

Podívejte se na soubor: `supabase/migrations/20250120_add_faq_copenhagen.sql`

Tento soubor obsahuje 7 FAQ otázek pro článek o Kodani.

---

**Máte dotazy?** Kontaktujte mě na zimmermannovap@gmail.com
