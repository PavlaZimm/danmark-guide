# 🔒 Admin Zabezpečení - Kastrup.cz

## Jak přidat nového admina

Protože registrace je **zakázaná** pro veřejnost, nové adminy musíš přidat manuálně přes Supabase.

### Postup:

1. **Jdi do Supabase Dashboard**: https://supabase.com/dashboard
2. **Vyber projekt: danmark-guide**
3. **Jdi na "Authentication" → "Users"**
4. **Klikni "Invite user"**
5. **Zadej email** nového admina
6. **Pošli pozvánku**
7. **Po registraci uživatele:**
   - Jdi na "Table Editor" → "profiles"
   - Najdi nového uživatele (podle email)
   - Změň `role` z `user` na `admin`
   - Klikni "Save"

Hotovo! Nový admin se může přihlásit na `kastrup.cz/tajnedvere`

---

## 🛡️ Bezpečnostní opatření

### Ochrana přihlášení:
- ✅ **Rate limiting**: Max 5 pokusů, pak 5 minut block
- ✅ **Veřejná registrace zakázána**: Nikdo nemůže být admin bez tvého povolení
- ✅ **Role check**: I kdyby někdo prošel auth, musí mít role="admin"
- ✅ **Protected routes**: Všechny admin stránky vyžadují ověření

### Co nedělat:
- ❌ Nesdílet admin účet s nikým
- ❌ Nepoužívat slabá hesla (minimálně 12 znaků!)
- ❌ Nepřihlašovat se na veřejných sítích
- ❌ Nepouštět nikoho do Supabase dashboardu

---

## Doporučení pro silné heslo:

**Minimálně 12 znaků, obsahující:**
- Velká písmena (A-Z)
- Malá písmena (a-z)
- Čísla (0-9)
- Speciální znaky (!@#$%^&*)

**Příklad dobrého hesla:**
`Kastrup2025!DanskoWeb#Secure`

**Špatné heslo:**
`heslo123` ❌
`admin` ❌
`kastrup` ❌

---

## Co kdyby někdo získal přístup?

1. **Okamžitě změň heslo** v Supabase
2. **Smaž podezřelé uživatele** z "profiles" tabulky
3. **Zkontroluj logs** v Supabase → "Logs"
4. **Rotuj Supabase API klíče** (pokud byly kompromitovány)

---

## Supabase Row Level Security (RLS)

**DŮLEŽITÉ**: Ujisti se, že máš nastavené RLS policies pro:

### `profiles` tabulka:
- Jen admini můžou měnit role
- Uživatelé můžou číst jen svůj profil

### `articles` tabulka:
- Veřejnost: pouze čtení publikovaných článků
- Admini: plný přístup

### `contact_messages` tabulka:
- Veřejnost: pouze INSERT (vytvoření zprávy)
- Admini: SELECT, DELETE

---

**Pro pomoc kontaktuj:** Claude 😊
