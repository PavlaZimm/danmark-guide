# 📝 Jak přidat ukázkový článek do databáze

## Ukázkový článek
**Název:** "Co vidět v Dánsku - Top 10 destinací"

**Obsah:** Kompletní průvodce po 10 nejlepších místech v Dánsku včetně:
- Kodaň (Nyhavn, Malá mořská víla, Tivoli)
- Skagen (místo, kde se moře potkávají)
- Aarhus (kulturní metropole)
- Ribe (nejstarší město)
- Bornholm (slunečný ostrov)
- Roskilde (město vikingů)
- Kronborg (Hamletův hrad)
- Legoland
- Møns Klint (bílé útesy)
- Odense (město H.C. Andersena)

## 🚀 Jak vložit článek do Supabase

### Možnost 1: Pomocí Supabase Dashboard (Doporučeno)

1. **Přihlaste se do Supabase**
   - Otevřete https://supabase.com
   - Přihlaste se ke svému projektu

2. **Otevřete SQL Editor**
   - V levém menu klikněte na "SQL Editor"
   - Klikněte na "New query"

3. **Vložte SQL skript**
   - Otevřete soubor `supabase/migrations/20251102_sample_article.sql`
   - Zkopírujte celý obsah
   - Vložte do SQL Editoru

4. **Spusťte skript**
   - Klikněte na tlačítko "Run" nebo stiskněte `Ctrl+Enter`
   - Pokud máte admin účet, článek se vytvoří
   - Pokud nemáte admin účet, nejdřív ho vytvořte (viz níže)

### Možnost 2: Pomocí Supabase CLI

```bash
# Pushnout migraci do databáze
supabase db push

# Nebo spustit konkrétní migraci
supabase migration up 20251102_sample_article
```

## 👤 Vytvoření admin účtu (pokud ještě nemáte)

### V Supabase Dashboard:

1. Jděte do **Authentication** → **Users**
2. Klikněte na **Add user** → **Create new user**
3. Vyplňte email a heslo
4. Vytvořte uživatele

5. Přejděte do **SQL Editor** a spusťte:
```sql
-- Nastavit uživatele jako admina
-- Nahraďte 'vas-email@example.com' vaším emailem
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'vas-email@example.com';
```

6. Nyní můžete spustit migraci s ukázkovým článkem

## ✅ Ověření, že článek byl vytvořen

### V Supabase Dashboard:

1. Jděte do **Table Editor**
2. Vyberte tabulku `articles`
3. Měli byste vidět článek "Co vidět v Dánsku - Top 10 destinací"

### Na webu:

1. Otevřete `https://localhost:8080/clanky` (nebo vaši URL)
2. Měli byste vidět ukázkový článek v seznamu
3. Klikněte na něj pro zobrazení detailu

## 📊 Struktura článku

Článek obsahuje:
- ✅ SEO optimalizovaný titulek a popis
- ✅ Obrázek z Unsplash
- ✅ Kategorie "Cestování"
- ✅ Více než 10 sekcí s užitečným obsahem
- ✅ HTML formátování (h2, p, ul, li, strong)
- ✅ Praktické tipy pro cestovatele
- ✅ Slug pro SEO friendly URL: `co-videt-v-dansku-top-10-destinaci`

## 🎨 Customizace

Pokud chcete článek upravit:

1. **Změnit obrázek:**
   - Najděte jiný obrázek (doporučuji Unsplash nebo Pexels)
   - Upravte `image_url` v SQL skriptu

2. **Změnit obsah:**
   - Upravte `content` v SQL skriptu
   - Používejte HTML tagy: `<h2>`, `<p>`, `<ul>`, `<li>`, `<strong>`

3. **Změnit kategorii:**
   - Dostupné kategorie: cestovani, kultura, historie, gastronomie, lifestyle, ubytovani
   - Změňte `slug = 'cestovani'` na jinou kategorii

## ❓ Troubleshooting

### Chyba: "Žádný admin profil nenalezen"
**Řešení:** Vytvořte admin účet (viz sekce výše)

### Chyba: "Kategorie 'Cestování' neexistuje"
**Řešení:** Spusťte nejdřív hlavní migraci:
```bash
supabase db push
```

### Článek se nezobrazuje na webu
**Řešení:** Zkontrolujte:
1. Je `published = true`?
2. Existuje `category_id`?
3. Máte správnou Supabase konfiguraci v `.env`?

## 🔗 Související soubory

- SQL migrace: `supabase/migrations/20251102_sample_article.sql`
- Articles page: `src/pages/Articles.tsx`
- Article detail: `src/pages/ArticleDetail.tsx`
- Article card: `src/components/ArticleCard.tsx`

---

**Poznámka:** Tento článek je pouze ukázkový. Po otestování můžete vytvořit vlastní články přímo v Supabase nebo vytvořit admin panel pro správu obsahu.
