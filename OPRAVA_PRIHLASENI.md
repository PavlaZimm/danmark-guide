# 🔧 Oprava přihlášení do admin panelu

## Problém

Nemůžete se přihlásit do admin panelu na `/tajnedvere`? Tento návod vám pomůže problém vyřešit.

---

## Možné příčiny

1. **Nemáte admin účet** - Váš uživatel nemá nastavenou roli `admin`
2. **Bezpečnostní díra** - Stará RLS policy umožňovala komukoliv změnit si roli na admin (OPRAVENO v této aktualizaci)
3. **Neexistující profil** - Profil nebyl vytvořen při registraci

---

## Řešení krok za krokem

### KROK 1: Spusťte novou migraci v Supabase (DŮLEŽITÉ!)

**Tato migrace opravuje bezpečnostní díru!**

1. Jděte do **Supabase Dashboard**: https://supabase.com/dashboard
2. Vyberte projekt: **danmark-guide** (ID: `acgrypwfevndvqcwhcld`)
3. V levém menu klikněte na **SQL Editor**
4. Klikněte **New query**
5. Zkopírujte a vložte obsah souboru: `supabase/migrations/20251123_fix_profiles_rls_security.sql`
6. Klikněte **Run** (F5)
7. Měli byste vidět: ✅ **Success. No rows returned**

**Co tato migrace dělá:**
- ❌ Odstraní nebezpečnou policy, která dovolovala uživatelům měnit si roli
- ✅ Přidá novou policy, která umožní uživatelům měnit jen email (ne roli)
- ✅ Přidá policy, která umožní pouze adminům měnit role

---

### KROK 2: Vytvořte svůj první admin účet

#### Možnost A: Pokud už máte uživatelský účet

1. V Supabase Dashboard jděte na **SQL Editor**
2. Zkopírujte tento SQL příkaz:

```sql
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'VÁŠ_EMAIL@example.com';
```

3. **NAHRAĎTE** `'VÁŠ_EMAIL@example.com'` svým skutečným emailem
4. Klikněte **Run**
5. Měli byste vidět: ✅ **Success. 1 row updated**

#### Možnost B: Pokud ještě nemáte účet

1. V Supabase Dashboard jděte na **Authentication** → **Users**
2. Klikněte **Add user** → **Create new user**
3. Zadejte:
   - **Email**: Váš email
   - **Password**: Silné heslo (min. 12 znaků)
   - **Auto Confirm User**: ✅ zaškrtněte
4. Klikněte **Create user**
5. Poté v **SQL Editor** spusťte:

```sql
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'VÁŠ_EMAIL@example.com';
```

---

### KROK 3: Ověřte, že máte admin přístup

1. V Supabase SQL Editor spusťte:

```sql
SELECT id, email, role, created_at
FROM public.profiles
WHERE role = 'admin';
```

2. Měli byste vidět svůj email v seznamu adminů

---

### KROK 4: Přihlaste se na web

1. Jděte na: **https://kastrup.cz/tajnedvere** (nebo `localhost:8080/tajnedvere` lokálně)
2. Zadejte svůj **email** a **heslo**
3. Klikněte **Přihlásit se**
4. ✅ Měli byste být přesměrováni na `/tajnedvere/dashboard`

---

## 🆘 Troubleshooting

### "Špatné přihlašovací údaje"

**Příčina:** Špatný email nebo heslo

**Řešení:**
1. Zkontrolujte, že píšete správný email
2. Pokud jste zapomněli heslo, v Supabase → Authentication → Users → najděte uživatele → Send Magic Link
3. Nebo resetujte heslo přes **Send Password Recovery**

---

### "Nemáte oprávnění k přístupu do administrace"

**Příčina:** Váš profil nemá `role = 'admin'`

**Řešení:**
1. Zkontrolujte v Supabase SQL Editor:

```sql
SELECT email, role FROM public.profiles WHERE email = 'VÁŠ_EMAIL@example.com';
```

2. Pokud vidíte `role = 'user'`, spusťte:

```sql
UPDATE public.profiles SET role = 'admin' WHERE email = 'VÁŠ_EMAIL@example.com';
```

---

### "Error checking user" nebo profil neexistuje

**Příčina:** Profil nebyl vytvořen při registraci

**Řešení:**
1. Zjistěte své UUID v Supabase → Authentication → Users → zkopírujte ID uživatele
2. V SQL Editor spusťte:

```sql
INSERT INTO public.profiles (id, email, role)
VALUES ('VÁŠ_UUID', 'VÁŠ_EMAIL@example.com', 'admin');
```

---

### "Příliš mnoho neúspěšných pokusů"

**Příčina:** Rate limiting po 5 neúspěšných pokusech

**Řešení:**
- Počkejte **5 minut**
- Nebo restartujte prohlížeč a vymažte localStorage
- Nebo použijte inkognito režim

---

## 🔒 Bezpečnostní tipy

Po úspěšném přihlášení:

1. ✅ **Změňte heslo na silné** (min. 12 znaků, písmena + čísla + speciální znaky)
2. ✅ **Nepoužívejte stejné heslo** jako na jiných službách
3. ✅ **Nepřihlašujte se na veřejných WiFi**
4. ✅ **Nesdílejte admin účet** s nikým
5. ✅ **Pravidelně kontrolujte uživatele** v Supabase → Authentication

---

## 📊 Jak přidat dalšího admina

1. V Supabase Dashboard → **Authentication** → **Users** → **Add user**
2. Vytvořte uživatele
3. V SQL Editor:

```sql
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'NOVY_ADMIN@example.com';
```

4. ✅ Hotovo!

---

## 🎉 Hotovo!

Po provedení těchto kroků byste měli mít:

- ✅ Opravenou bezpečnostní díru v RLS policies
- ✅ Funkční admin účet
- ✅ Přístup do admin panelu na `/tajnedvere`

---

## Potřebujete pomoct?

- Supabase dokumentace: https://supabase.com/docs
- GitHub Issues: https://github.com/PavlaZimm/danmark-guide/issues
- Nebo se ozvěte v další session! 😊
