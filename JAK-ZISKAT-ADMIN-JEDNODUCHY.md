# 🚀 JAK ZÍSKAT ADMIN PŘÍSTUP - JEDNODUCHÝ NÁVOD

**Cíl:** Přihlásit se na `kastrup.cz/tajnedvere` a začít psát články

---

## 📍 CO POTŘEBUJEŠ:

1. ✅ Přístup do Supabase (https://supabase.com/dashboard)
2. ✅ Email, který chceš jako admin
3. ✅ 5-10 minut času

---

## 🔧 KROK 1: Nastav databázi (JEDNOU)

### 1.1 Přihlas se do Supabase

1. Jdi na: **https://supabase.com/dashboard**
2. Přihlas se
3. Otevři projekt **"kastrup"** (nebo projekt s ID: `acgrypwfevndvqcwhcld`)

### 1.2 Spusť setup databáze

1. V levém menu klikni na **"SQL Editor"**
2. Klikni **"New query"**
3. Otevři soubor **`setup-database.sql`** z projektu
4. **Zkopíruj celý obsah** a vlož do SQL Editoru
5. Klikni **"Run"** (nebo Ctrl+Enter)
6. Počkej, než se dokončí (může to trvat pár vteřin)

✅ **Hotovo!** Databáze je připravená.

---

## 👤 KROK 2: Vytvoř admin účet

### 2.1 Vytvoř uživatele

**Máš 2 možnosti - vyber jednu:**

#### 🅰️ MOŽNOST A: Přes "Invite user" (JEDNODUŠŠÍ)

1. V levém menu klikni na **"Authentication"**
2. Klikni na záložku **"Users"**
3. Klikni **"Invite user"** (vpravo nahoře, zelené tlačítko)
4. Zadej **email** (např. `tvuj@email.cz`)
5. Klikni **"Send invite"**
6. **Zkontroluj email** (i SPAM!)
7. Klikni na odkaz v emailu
8. **Nastav si heslo** (minimálně 12 znaků!)
9. Dokončit registraci

#### 🅱️ MOŽNOST B: Ručně přes SQL Editor

Pokud invite nefunguje:

1. V levém menu klikni na **"SQL Editor"**
2. Klikni **"New query"**
3. Vlož tento kód (**ZMĚŇ EMAIL A HESLO!**):

```sql
-- Vytvoř uživatele přímo v auth.users
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'tvuj@email.cz',  -- ⬅️ ZMĚŇ TADY!
  crypt('TvéSilnéHeslo123!', gen_salt('bf')),  -- ⬅️ ZMĚŇ HESLO!
  NOW(),
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}'::jsonb,
  '{}'::jsonb
);
```

4. Klikni **"Run"**

### 2.2 Nastav admin roli

1. V levém menu klikni na **"SQL Editor"**
2. Klikni **"New query"**
3. Vlož tento kód (**ZMĚŇ EMAIL!**):

```sql
-- Nastav admin roli
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'tvuj@email.cz';  -- ⬅️ ZMĚŇ!
```

4. Klikni **"Run"**
5. Mělo by vrátit: **"Success. 1 rows affected"** ✅

### 2.3 Ověř, že to funguje

Spusť toto:

```sql
SELECT id, email, role FROM public.profiles WHERE email = 'tvuj@email.cz';
```

**Mělo by vrátit:**
- email: tvuj@email.cz
- role: **admin** ✅

---

## 🎯 KROK 3: Přihlas se na web

### Lokální testování (volitelné)

Pokud chceš nejdřív vyzkoušet lokálně:

```bash
npm install
npm run dev
```

Pak otevři: **http://localhost:5173/tajnedvere**

### Přihlášení na produkci

1. Otevři: **https://kastrup.cz/tajnedvere**
2. Zadej:
   - **Email:** tvuj@email.cz (ten, co jsi vytvořil)
   - **Heslo:** TvéSilnéHeslo123! (to, co jsi nastavil)
3. Klikni **"Přihlásit se"**
4. Měl bys vidět **Dashboard** ✨

---

## ✅ JE TO HOTOVO?

Pokud vidíš Dashboard s:
- 📊 Statistiky (články, publikované, koncepty)
- 🎯 Tlačítko "Nový článek"
- 🔼 Menu "Zpět na web" a "Odhlásit se"

**→ GRATULUJEME! Máš admin přístup!** 🎉

---

## 🆘 NĚCO NEFUNGUJE?

### ❌ "Nemáte oprávnění k přístupu do administrace"

**Řešení:**
```sql
-- Zkontroluj roli v profiles
SELECT email, role FROM public.profiles WHERE email = 'tvuj@email.cz';

-- Pokud není admin, nastav to:
UPDATE public.profiles SET role = 'admin' WHERE email = 'tvuj@email.cz';
```

### ❌ "Invalid login credentials"

**Řešení:**
- Zkontroluj, že email a heslo jsou správné
- Zkus kliknout na **"Zapomenuté heslo?"** a resetovat heslo

### ❌ Profil neexistuje v `profiles`

**Řešení:**
```sql
-- Najdi user ID
SELECT id, email FROM auth.users WHERE email = 'tvuj@email.cz';

-- Vytvoř profil (nahraď UUID)
INSERT INTO public.profiles (id, email, role, created_at)
VALUES (
  'UUID-Z-PREDCHOZIHO-SELECTU',
  'tvuj@email.cz',
  'admin',
  NOW()
);
```

### ❌ "Too many login attempts"

**Řešení:**
- Počkej **5 minut** (ochrana proti brute-force)
- Pak zkus znovu

### ❌ Vercel environment variables chybí

**Řešení:**
1. Jdi na https://vercel.com/dashboard
2. Vyber projekt
3. **Settings** → **Environment Variables**
4. Přidej:
   - `VITE_SUPABASE_URL` = `https://acgrypwfevndvqcwhcld.supabase.co`
   - `VITE_SUPABASE_PUBLISHABLE_KEY` = najdeš v Supabase → Settings → API
   - `VITE_SUPABASE_PROJECT_ID` = `acgrypwfevndvqcwhcld`
5. **Redeploy** aplikaci

---

## 🎓 DALŠÍ KROKY

Po úspěšném přihlášení:

1. **Přečti si:** [POUZIVANI_ADMIN_PANELU.md](POUZIVANI_ADMIN_PANELU.md)
   - Jak používat editor
   - Jak psát články
   - Jak publikovat

2. **Zkus vytvořit první článek:**
   - Klikni "Nový článek"
   - Vyplň název, perex, obsah
   - Ulož koncept nebo publikuj

3. **Optimalizuj SEO:**
   - Vyplň Meta Title
   - Vyplň Meta Description
   - Zadej Focus Keyword

---

## 📚 UŽITEČNÉ ODKAZY

- **Supabase Dashboard:** https://supabase.com/dashboard
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Admin panel:** https://kastrup.cz/tajnedvere
- **Dokumentace:** [README.md](README.md)

---

**Všechno funguje? Tak hurá do psaní! 🚀**
