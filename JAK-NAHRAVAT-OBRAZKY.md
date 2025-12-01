# 📸 JAK NAHRÁVAT OBRÁZKY V ADMIN PANELU

**Super zpráva: Už NEMUSÍTE hledat URL obrázků! Můžete je nahrát přímo z počítače!** 🎉

---

## 🔧 KROK 1: Nastavení Supabase Storage (JEDNOU)

Tohle uděláte jen **JEDNOU** na začátku:

1. **Otevřete Supabase:** https://supabase.com/dashboard
2. **Projekt:** "kastrup"
3. **SQL Editor** → **"+ New query"**
4. **Zkopírujte a vložte tento kód:**

```sql
-- Vytvoř bucket pro obrázky
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'article-images',
  'article-images',
  true,
  10485760,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO UPDATE
SET public = true, file_size_limit = 10485760;

-- Nastavit oprávnění - veřejný přístup ke čtení
DROP POLICY IF EXISTS "Public can view article images" ON storage.objects;
CREATE POLICY "Public can view article images"
ON storage.objects FOR SELECT
USING (bucket_id = 'article-images');

-- Admini můžou nahrávat
DROP POLICY IF EXISTS "Admins can upload article images" ON storage.objects;
CREATE POLICY "Admins can upload article images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'article-images' AND
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  )
);

-- Admini můžou mazat
DROP POLICY IF EXISTS "Admins can delete article images" ON storage.objects;
CREATE POLICY "Admins can delete article images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'article-images' AND
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  )
);
```

5. **Klikněte "Run"**
6. Mělo vrátit: **"Success"** ✅

✅ **HOTOVO! Tohle už nikdy nemusíte dělat.**

---

## 📸 KROK 2: Jak nahrát obrázek v článku

### Varianta A: Hlavní obrázek článku 🖼️

1. **V editoru článku** najděte pole: **"URL obrázku"**
2. **Klikněte na tlačítko** **"📤 Nahrát"** (vedle pole)
3. **Dialog se otevře** - klikněte na upload area nebo přetáhněte obrázek
4. **Vyberte obrázek** z počítače (JPG, PNG, WebP, GIF - max 10MB)
5. **Počkejte na upload** (pár vteřin)
6. **Vyplňte Alt text** (povinné! - popis pro SEO, např. "Nyhavn přístav v Kodani")
7. **Volitelně přidejte popisek** (zobrazí se pod obrázkem)
8. **Klikněte "Vložit"** - URL se automaticky vyplní!

### Varianta B: Obrázky uvnitř článku 📝

1. **V editoru článku** umístěte kurzor tam, kde chcete obrázek
2. **V toolbaru klikněte na ikonu** **🖼️** (Image icon)
3. **Dialog se otevře** - stejný postup jako výše
4. **Vyplňte Alt text** a popisek
5. **Klikněte "Vložit do článku"** - obrázek se vloží na místo kurzoru!

---

## 💡 TIPY PRO NEJLEPŠÍ VÝSLEDKY:

### ✅ DOPORUČUJEME:
- **Formát:** WebP (nejmenší velikost, nejrychlejší načítání)
- **Maximální šířka:** 1920px
- **Velikost souboru:** Ideálně pod 500KB
- **Alt text:** Vždy vyplňte! Důležité pro SEO a přístupnost

### 🛠️ NÁSTROJE PRO OPTIMALIZACI:
- **Squoosh.app** - https://squoosh.app (zdarma, v prohlížeči)
  - Nahrajte obrázek
  - Vyberte WebP
  - Nastavte kvalitu 80-85%
  - Stáhněte optimalizovaný obrázek

---

## 🎯 PŘÍKLAD WORKFLOW:

1. **Máte článek** "Nejlepší káva v Kodani"
2. **Vyfotíte/najdete** obrázek kavárny
3. **Optimalizujete** na squoosh.app (konvertujete na WebP, zmenšíte)
4. **V admin panelu** kliknete na "📤 Nahrát"
5. **Vyberete** optimalizovaný obrázek
6. **Vyplníte Alt text:** "Útulná kavárna v Kodani s espresso šálkem"
7. **Kliknete "Vložit"**
8. **HOTOVO!** Obrázek je nahrán a automaticky vložen

---

## 🆘 TROUBLESHOOTING:

### ❌ "Nepodařilo se nahrát obrázek"
→ Zkontrolujte, že jste spustili SQL skript z KROKU 1

### ❌ "File too large"
→ Obrázek je větší než 10MB. Zmenšete ho pomocí squoosh.app

### ❌ Tlačítko "Nahrát" není vidět
→ Obnovte stránku (Ctrl+F5) nebo se odhlaste a znovu přihlaste

### ❌ Alt text nelze přeskočit
→ To je záměr! Alt text je důležitý pro SEO a přístupnost. Vždy ho vyplňte.

---

## 📊 CO SE STANE S OBRÁZKY?

- ✅ **Nahrají se do Supabase Storage** (bucket: article-images)
- ✅ **Dostanou unikátní URL** (automaticky)
- ✅ **Jsou veřejně přístupné** (kdokoliv je může vidět)
- ✅ **Zůstanou tam navždy** (dokud je ručně nesmažete)
- ✅ **Rychlé načítání** (Supabase má CDN)

---

## 🎉 VÝHODY UPLOAD FUNKCE:

- ✅ **Žádné hledání URL** - nahrát přímo z počítače
- ✅ **Automatické vkládání** - kliknutím do článku
- ✅ **SEO optimalizace** - povinný Alt text
- ✅ **Náhled** - vidíte, co nahráváte
- ✅ **Bezpečnost** - jen admini můžou nahrávat

---

**Teď už jen pište články a nahrávejte krásné fotky z Dánska!** 🇩🇰✨
