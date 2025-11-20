# 🚀 Setup Supabase Storage - Jednorázový krok

## ⚠️ DŮLEŽITÉ: Toto je třeba udělat PŘED prvním nahráváním obrázků!

---

## 📝 Co to je

Supabase Storage je úložiště pro obrázky. Než budeš moct nahrávat obrázky přes admin panel, musíš vytvořit "bucket" (složku) v Supabase.

**Stačí to udělat JEDNOU.** Pak už to funguje navždy.

---

## 🔧 Jak na to (5 minut)

### Krok 1: Otevři Supabase Dashboard

1. Jdi na [https://supabase.com](https://supabase.com)
2. Přihlaš se
3. Vyber projekt **danmark-guide** (nebo jak se jmenuje tvůj projekt)

### Krok 2: Otevři SQL Editor

1. V levém menu klikni na **SQL Editor** (ikona kódu)
2. Klikni na **New query** (Nový dotaz)

### Krok 3: Zkopíruj a spusť migraci

1. Otevři soubor: `supabase/migrations/20250120_create_article_images_storage.sql`
2. **Zkopíruj celý obsah**
3. **Vlož do SQL Editoru**
4. Klikni **Run** (nebo F5)

### Krok 4: Hotovo!

Uvidíš zelenou hlášku "Success" ✅

---

## 🎯 Co to dělá

Tento SQL příkaz vytvoří:
- ✅ Bucket `article-images` pro ukládání obrázků
- ✅ Veřejný přístup pro čtení (aby se obrázky zobrazily na webu)
- ✅ Oprávnění pro přihlášené uživatele nahrávat/upravovat/mazat

---

## 🖼️ Co teď

Po spuštění migrace můžeš:
1. Jít do admin panelu `/tajnedvere`
2. Otevřít článek
3. Kliknout na **Upload** tlačítko (📤)
4. Nahrát obrázek

**A to je vše!** 🎉

---

## ⚠️ Řešení problémů

### Chyba: "Bucket already exists"

To je v pořádku! Znamená to, že bucket už byl vytvořen. Můžeš pokračovat a nahrávat obrázky.

### Chyba: "Permission denied"

Ujisti se, že jsi přihlášená jako vlastník projektu v Supabase.

### Upload nefunguje

1. Zkontroluj, že migrace proběhla úspěšně
2. Zkus se odhlásit a znovu přihlásit v admin panelu
3. Vyčisti cache prohlížeče (Ctrl+F5)

---

## 📚 Co dalšího

Po setupu se podívej na:
- **OBRAZKY-NAVOD.md** - Kompletní návod na práci s obrázky
- **FAQ-NAVOD.md** - Jak přidávat FAQ do článků
- **MAPY-NAVOD.md** - Jak přidávat mapy do článků

---

**Otázky?** Kontakt: zimmermannovap@gmail.com

**Vytvořeno:** 2025-01-20
