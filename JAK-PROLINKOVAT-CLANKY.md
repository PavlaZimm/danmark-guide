# 🔗 JAK PROLINKOVAT ČLÁNKY - INTERNÍ ODKAZY

**Proč je důležité prolinkování:**
- ✅ Lepší SEO (Google vidí souvislosti mezi stránkami)
- ✅ Uživatelé zůstanou déle na webu
- ✅ Víc page views
- ✅ Lepší user experience

---

## 📝 ZPŮSOB 1: PŘES ADMIN PANEL (DOPORUČENO)

### **Krok za krokem:**

1. **Přihlaste se:** https://kastrup.cz/tajnedvere

2. **Jděte na:** Správa článků

3. **Najděte článek** "Kastrup - Kodaňský poklad..."

4. **Klikněte na ikonu** ✏️ (Upravit)

5. **V editoru najděte text**, který chcete linkovat
   - Např: "Dánsko", "dánská kultura", "hygge", "Kodaň"

6. **Označte ten text** (myší)

7. **Klikněte na ikonu** 🔗 v toolbaru

8. **Zadejte URL:** `/o-dansku`

9. **Klikněte "Vložit"**

10. **Uložte článek**

✅ **HOTOVO!** Odkaz je přidán!

---

## 🎯 KDE PŘIDAT ODKAZY?

### **V ČLÁNKU "KASTRUP":**

**Dobrá místa pro odkazy:**

1. **První zmínka o Dánsku** v úvodu
   ```
   "Kastrup leží na východním pobřeží [Dánska](/o-dansku)..."
   ```

2. **Zmínka o dánské kultuře**
   ```
   "...odráží typickou [dánskou architekturu a design](/o-dansku)..."
   ```

3. **Zmínka o hygge**
   ```
   "...atmosféra plná [dánského hygge](/o-dansku)..."
   ```

4. **Call to action na konci článku**
   ```html
   <div class="cta-box">
     <h3>Chcete vědět víc o Dánsku?</h3>
     <p>Přečtěte si náš <a href="/o-dansku">kompletní průvodce po Dánsku</a>
     s praktickými tipy, dopravou a itineráři!</p>
   </div>
   ```

---

## ✅ DOPORUČENÉ PRAKTIKY:

### **KOLIK ODKAZŮ?**
- ✅ **2-4 odkazy na článek** - ideální
- ⚠️ Víc než 5 - může působit spamově
- ❌ Každé slovo "Dánsko" - přehnanost!

### **JAK LINKOVAT?**
- ✅ **První zmínka** klíčového slova
- ✅ **V přirozeném kontextu**
- ✅ **Tam, kde to dává smysl**
- ❌ Uprostřed důležité věty
- ❌ V nadpisech (rušivé)

### **ANCHOR TEXT (text odkazu):**
- ✅ **"Průvodce po Dánsku"** - popisný
- ✅ **"dánská kultura"** - relevantní
- ✅ **"více o Dánsku"** - kontext
- ❌ **"klikněte zde"** - nepopisný
- ❌ **"tady"** - zbytečný

---

## 🎨 PŘÍKLADY DOBRÉHO PROLINKOVÁNÍ:

### **PŘÍKLAD 1: V úvodu**
```
Kastrup je malé město na pobřeží Dánska, které mnozí
znají jen kvůli letišti. Ale stojí za to poznat i samotné
město! Pokud plánujete cestu, přečtěte si náš
kompletní průvodce po Dánsku s praktickými tipy.
```

**Linkované:**
```
Kastrup je malé město na pobřeží <a href="/o-dansku">Dánska</a>,
které mnozí znají jen kvůli letišti. Ale stojí za to poznat
i samotné město! Pokud plánujete cestu, přečtěte si náš
<a href="/o-dansku">kompletní průvodce po Dánsku</a>
s praktickými tipy.
```

---

### **PŘÍKLAD 2: V kontextu**
```
Místní architektura odráží typický skandinávský design
- minimalistický, funkční a plný světla. To je to, co
dělá dánská města tak příjemná.
```

**Linkované:**
```
Místní architektura odráží typický
<a href="/o-dansku">skandinávský design</a> -
minimalistický, funkční a plný světla. To je to, co
dělá <a href="/o-dansku">dánská města</a> tak příjemná.
```

---

### **PŘÍKLAD 3: CTA box na konci**
```html
<div class="cta-box">
  <h3>Plánujete cestu do Dánska?</h3>
  <p>Přečtěte si náš <a href="/o-dansku">kompletní průvodce
  po Dánsku 2025</a> s praktickými informacemi o dopravě,
  ubytování, počasí a itineráři. Dozvíte se vše, co potřebujete
  vědět před cestou!</p>
</div>
```

---

## 🚀 ZPŮSOB 2: PŘES SQL (POKROČILÉ)

**Pouze pokud umíte SQL!**

```sql
-- Aktualizace článku v databázi
UPDATE articles
SET content = REPLACE(
  content,
  'text-k-nahrazení',
  '<a href="/o-dansku">text-k-nahrazení</a>'
)
WHERE slug = 'kastrup-kodansky-poklad-moderni-architektury-more-a-volnosti';
```

**⚠️ POZOR:**
- Vždy nejdřív zálohujte článek!
- Testujte na kopii
- Může nahradit text na špatném místě

**→ DOPORUČUJI ZPŮSOB 1 (přes admin panel)!**

---

## 📊 DALŠÍ ČLÁNKY K PROLINKOVÁNÍ:

Když napíšete další články, můžete je prolinkovat:

**Z článku O:**
- Kodaň → Kastrup ("...a navštivte i nedaleký [Kastrup](/clanek/kastrup-kodansky-poklad)")
- Letiště → Kastrup článek
- Design → Kastrup architektura

**Z článku Kastrup:**
- Dánsko → O Dánsku (už máte!)
- Kodaň → Článek o Kodani (až bude)
- Letiště → Praktické info (až bude)

---

## 💡 PRO TIPY:

### **Internal Linking Strategy:**

1. **Hub pages** (hlavní stránky):
   - O Dánsku = hub o Dánsku obecně
   - Linkujte Z článků NA hub

2. **Related articles** (podobné články):
   - Kastrup ↔ Kodaň
   - Kodaň ↔ Tivoli
   - Letiště ↔ Doprava

3. **Content clusters** (tématické skupiny):
   - Města: Kodaň, Aarhus, Odense...
   - Památky: Hrady, muzea, parky...
   - Praktické: Doprava, ubytování, jídlo...

### **SEO Benefit:**
- Google lépe chápe strukturu webu
- Rozpozná hlavní témata
- Rankne vás výš pro relevantní keywords!

---

## ✅ CHECKLIST:

- [ ] Přečetl jsem článek Kastrup
- [ ] Přečetl jsem stránku O Dánsku
- [ ] Našel jsem 2-4 vhodná místa pro odkazy
- [ ] Přidal odkazy přes admin panel
- [ ] Zkontroloval jsem, že odkazy fungují
- [ ] Uložil jsem článek

---

**Teď už víte, jak prolinkovat články! Jděte na to!** 🚀

**Pro kontrolu:**
Otevřete článek na webu a klikněte na odkazy - měly by vás
přesměrovat na stránku O Dánsku.

---

**Máte otázky? Napiš mi!** 😊
