# 🔐 JAK ZÍSKAT ADMIN PŘÍSTUP - Krok za krokem

**Cíl:** Přihlásit se na `kastrup.cz/tajnedvere` a začít psát články

---

## ✅ KROK 1: Vytvoření admin účtu v Supabase

### 1.1 Přihlášení do Supabase Dashboard

1. Jdi na: **https://supabase.com/dashboard**
2. Přihlas se svým účtem (email + heslo)
3. Vyber projekt: **`danmark-guide`** (nebo `acgrypwfevndvqcwhcld`)

### 1.2 Vytvoření nového uživatele (admina)

**Máte 2 možnosti:**

#### 🅰️ MOŽNOST A: Pozvat uživatele (DOPORUČENO)

1. V levém menu klikni na **"Authentication"**
2. Klikni na **"Users"**
3. Klikni na tlačítko **"Invite user"** (vpravo nahoře)
4. Zadej email, který chceš použít jako admin (např. `tvuj@email.cz`)
5. Klikni **"Send invite"**
6. **Zkontroluj email** (i SPAM!) a klikni na odkaz pro dokončení registrace
7. **Nastav si heslo** (minimálně 12 znaků!)

#### 🅱️ MOŽNOST B: Vytvořit uživatele ručně přes SQL

1. V levém menu klikni na **"SQL Editor"**
2. Klikni **"New query"**
3. Vlož tento SQL kód (ZMĚŇ EMAIL A HESLO!):

```sql
-- ZMĚŇ email a heslo na svoje!
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  aud,
  role
) VALUES (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'tvuj@email.cz',  -- ⬅️ ZMĚŇ TADY!
  crypt('TvéSilnéHeslo123!', gen_salt('bf')),  -- ⬅️ ZMĚŇ HESLO!
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  'authenticated',
  'authenticated'
);
```

4. Klikni **"Run"** (Ctrl+Enter)

---

## ✅ KROK 2: Nastavení admin role

**DŮLEŽITÉ:** Uživatel musí mít v tabulce `profiles` roli `admin`!

### 2.1 Nastavení role přes Supabase UI (NEJJEDNODUŠŠÍ)

1. V levém menu klikni na **"Table Editor"**
2. Vyber tabulku **`profiles`**
3. Najdi svůj účet (podle emailu)
   - **Pokud tam NENÍ**, počkej chvíli (trigger ho vytvoří automaticky po registraci)
   - Můžeš zkusit **refresh stránky** (F5)
4. Klikni na buňku ve sloupci **`role`**
5. Změň z `user` na **`admin`**
6. Klikni **"Save"** (nebo Enter)

### 2.2 Nastavení role přes SQL (ALTERNATIVA)

Pokud profil neexistuje nebo chceš to udělat rychle:

1. Jdi na **"SQL Editor"**
2. Vlož tento SQL kód (ZMĚŇ EMAIL!):

```sql
-- ZMĚŇ email na svůj!
UPDATE profiles
SET role = 'admin'
WHERE email = 'tvuj@email.cz';  -- ⬅️ ZMĚŇ TADY!
```

3. Klikni **"Run"**
4. Mělo by vrátit: **"Success. 1 rows affected"**

**POKUD VRÁTÍ "0 rows affected"**, profil ještě neexistuje. Vytvoř ho:

```sql
-- NAJDI SVOJE USER ID
SELECT id, email FROM auth.users WHERE email = 'tvuj@email.cz';

-- VYTVOŘ PROFIL (nahraď UUID za svoje z výsledku výše)
INSERT INTO profiles (id, email, role, created_at)
VALUES (
  'tvoje-user-id-zde',  -- ⬅️ UUID z předchozího SELECT
  'tvuj@email.cz',      -- ⬅️ Tvůj email
  'admin',
  NOW()
);
```

---

## ✅ KROK 3: Ověření, že máš admin přístup

### 3.1 Zkontroluj v Supabase

1. Jdi na **"Table Editor"** → **`profiles`**
2. Najdi svůj účet
3. Zkontroluj, že:
   - **`email`** = tvůj email
   - **`role`** = **`admin`** ✅

---

## ✅ KROK 4: Přihlášení na web

### 4.1 Lokální testování (doporučeno nejdřív)

1. Otevři terminál v projektu
2. Spusť dev server:
   ```bash
   npm run dev
   ```
3. Otevři prohlížeč: **http://localhost:5173/tajnedvere**
4. Přihlas se:
   - **Email:** tvuj@email.cz
   - **Heslo:** TvéSilnéHeslo123!
5. Pokud vše funguje, měl bys vidět **Dashboard** ✨

### 4.2 Přihlášení na produkci (Vercel)

1. Otevři: **https://kastrup.cz/tajnedvere** (nebo tvoje Vercel URL)
2. Přihlas se stejnými údaji jako výše
3. Měl bys vidět **Dashboard**

---

## ✅ KROK 5: Ověření Vercel environment variables

**Pokud přihlášení na produkci NEFUNGUJE**, zkontroluj environment variables:

1. Jdi na **https://vercel.com/dashboard**
2. Vyber projekt **`danmark-guide`**
3. Jdi na **"Settings"** → **"Environment Variables"**
4. Zkontroluj, že máš nastavené:

| Klíč | Hodnota |
|------|---------|
| `VITE_SUPABASE_URL` | `https://acgrypwfevndvqcwhcld.supabase.co` |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjZ3J5cHdmZXZuZHZxY3doY2xkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExODI3NDQsImV4cCI6MjA3Njc1ODc0NH0.FDZIKb3islCOpg_lyeMOtyEpBT-gVXS0jL1lB3iZN2o` |
| `VITE_SUPABASE_PROJECT_ID` | `acgrypwfevndvqcwhcld` |

5. Pokud něco chybí, **přidej to** a klikni **"Save"**
6. **Redeploy aplikaci**: Jdi na **"Deployments"** → klikni na nejnovější → **"Redeploy"**

---

## 🎉 HOTOVO!

Nyní byste měl mít:

- ✅ Účet v Supabase s rolí `admin`
- ✅ Možnost přihlásit se na `/tajnedvere`
- ✅ Přístup k dashboardu a editoru článků

---

## 🆘 TROUBLESHOOTING

### Problém: "Nemáte oprávnění k přístupu do administrace"

**Řešení:**
- Zkontroluj v `profiles` tabulce, že máš **`role = 'admin'`**
- Zkontroluj, že email v `profiles` odpovídá emailu, se kterým se přihlašuješ

### Problém: "Invalid login credentials"

**Řešení:**
- Zkontroluj, že email a heslo jsou správné
- Zkus **reset hesla** přes admin login (tlačítko "Zapomenuté heslo?")

### Problém: Profil neexistuje v tabulce `profiles`

**Řešení:**
- Profil by měl být vytvořen automaticky po registraci (trigger)
- Pokud není, vytvoř ho ručně přes SQL (viz KROK 2.2)

### Problém: Přihlášení funguje lokálně, ale NE na produkci

**Řešení:**
- Zkontroluj Vercel environment variables (viz KROK 5)
- Redeploy aplikaci po nastavení proměnných

### Problém: "Too many unsuccessful attempts"

**Řešení:**
- Počkej **5 minut** (rate limiting)
- Pak zkus znovu

---

## 📚 Další dokumentace

Po úspěšném přihlášení si přečti:

- **[POUZIVANI_ADMIN_PANELU.md](POUZIVANI_ADMIN_PANELU.md)** - Jak používat admin panel
- **[ADMIN_SETUP.md](ADMIN_SETUP.md)** - Bezpečnostní doporučení

---

**Něco nefunguje? Napiš mi!** 😊
