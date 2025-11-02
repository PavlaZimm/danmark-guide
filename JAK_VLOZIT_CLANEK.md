# 🚀 Jak vložit článek do databáze - 3 JEDNODUCHÉ KROKY

## KROK 1: Otevři Supabase Dashboard

1. Jdi na https://supabase.com
2. Přihlaš se
3. Vyber svůj projekt "danmark-guide"

## KROK 2: Vytvoř admin účet (pokud ještě nemáš)

### Nejdřív zkontroluj, jestli admin účet máš:

1. V Supabase jdi do **Table Editor**
2. Klikni na tabulku **profiles**
3. Podívej se, jestli má někdo v sloupci `role` hodnotu **"admin"**

### Pokud NEMÁŠ admin:

1. Jdi do **Authentication** → **Users**
2. Klikni **Add user** → **Create new user**
3. Zadej email a heslo (například: `admin@test.com` / `password123`)
4. Klikni **Create user**

5. Pak jdi do **SQL Editor** → **New query**
6. Vlož tento SQL a klikni **RUN**:

```sql
UPDATE profiles
SET role = 'admin'
WHERE email = 'admin@test.com';  -- POZOR: změň na svůj email
```

## KROK 3: Vlož článek

1. Jdi do **SQL Editor** → **New query**
2. Otevři soubor **INSERT_ARTICLE_HERE.sql** z projektu
3. Zkopíruj CELÝ obsah souboru
4. Vlož do SQL Editoru
5. Klikni **RUN** (nebo Ctrl+Enter)

✅ Hotovo!

## Ověření

1. Jdi na web: `http://localhost:8080/clanky`
2. Měl bys vidět článek **"Co vidět v Dánsku - Top 10 destinací"**
3. Klikni na něj - zobrazí se celý obsah

---

## ❓ Problémy?

### "Žádný admin profil nenalezen"
→ Vytvoř admin účet podle KROK 2

### "Kategorie Cestování neexistuje"
→ Spusť základní migrace:
- Jdi do **SQL Editor**
- Otevři `supabase/migrations/20251023070817_9a4c244b-b5a6-43eb-aa24-0b477a81d540.sql`
- Zkopíruj a spusť

### "Článek s tímto slugem již existuje"
→ Článek už máš v databázi! 🎉

---

## 📍 Důležité soubory

- **INSERT_ARTICLE_HERE.sql** - SQL pro vložení článku (TOHLE POTŘEBUJEŠ)
- **SAMPLE_ARTICLE_SETUP.md** - Detailní dokumentace
- **supabase/migrations/** - Databázové migrace

---

**⏱️ Celý proces: 2-5 minut**
