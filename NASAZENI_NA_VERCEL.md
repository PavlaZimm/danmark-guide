# 🚀 Nasazení Kastrup.cz na Vercel

## Co budeš potřebovat:
✅ GitHub účet (už máš - tam je repo)
✅ Wedos přístup (pro DNS nastavení)
✅ Email (pro Vercel registraci)

**Čas: 10-15 minut**

---

## KROK 1: Registrace na Vercel (2 minuty)

1. Jdi na **https://vercel.com**
2. Klikni **Sign Up**
3. Vyber **Continue with GitHub**
4. Autorizuj Vercel přístup k GitHubu
5. ✅ Hotovo - jsi přihlášený!

---

## KROK 2: Import projektu (3 minuty)

1. V Vercel dashboardu klikni **Add New** → **Project**
2. Najdi **danmark-guide** v seznamu repozitářů
3. Klikni **Import**

### Nastavení buildu:

**Framework Preset:** Vite
**Root Directory:** `./` (nech výchozí)
**Build Command:** `npm run build`
**Output Directory:** `dist`
**Install Command:** `npm install`

### Environment Variables (DŮLEŽITÉ!):

Přidej tyto 3 proměnné:

| Name | Value |
|------|-------|
| `VITE_SUPABASE_URL` | `https://acgrypwfevndvqcwhcld.supabase.co` |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjZ3J5cHdmZXZuZHZxY3doY2xkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExODI3NDQsImV4cCI6MjA3Njc1ODc0NH0.FDZIKb3islCOpg_lyeMOtyEpBT-gVXS0jL1lB3iZN2o` |
| `VITE_SUPABASE_PROJECT_ID` | `acgrypwfevndvqcwhcld` |

4. Klikni **Deploy**
5. Počkej 1-2 minuty...
6. ✅ **Deployment Complete!** 🎉

**Temporary URL:** Dostaneš něco jako `danmark-guide-xyz.vercel.app`

---

## KROK 3: Otestuj temporary URL (2 minuty)

1. Klikni na **Visit** nebo na URL
2. Zkontroluj:
   - ✅ Hlavní stránka se načte
   - ✅ Články se zobrazí
   - ✅ Ubytování funguje
   - ✅ Dark mode přepíná
3. Zkus admin panel:
   - Jdi na `/tajnedvere`
   - Přihlaš se (tvým admin účtem)
   - Vytvoř testovací článek

**Pokud vše funguje → pokračuj ke KROK 4**

---

## KROK 4: Připojení vlastní domény kastrup.cz (5 minut)

### V Vercel:

1. V projektu klikni na **Settings**
2. V levém menu **Domains**
3. Klikni **Add**
4. Zadej: `kastrup.cz`
5. Klikni **Add**
6. Také přidej: `www.kastrup.cz`

Vercel ti ukáže **DNS záznamy** které musíš přidat:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**NEZAVÍREJ tuto stránku!** Budeš potřebovat tyto hodnoty.

### Ve Wedos:

1. Přihlaš se na **https://admin.wedos.cz**
2. Jdi na **Domény** → Vyber **kastrup.cz**
3. Klikni **DNS záznamy**
4. **Smaž staré záznamy** (pokud nějaké jsou)
5. **Přidej nové:**

**Záznam 1 (A):**
- Typ: `A`
- Jméno: `@` (nebo prázdné)
- Hodnota: `76.76.21.21`
- TTL: `3600`

**Záznam 2 (CNAME):**
- Typ: `CNAME`
- Jméno: `www`
- Hodnota: `cname.vercel-dns.com`
- TTL: `3600`

6. Klikni **Uložit**
7. ✅ Hotovo!

---

## KROK 5: Čekání na DNS propagaci (5-60 minut)

DNS změny se rozšíří po internetu:
- ⚡ **Rychle:** 5-15 minut
- 🐌 **Pomalu:** až 60 minut (vzácné)

### Ověření:

Jdi na **https://kastrup.cz**

**Funguje?** 🎉 Gratulace!
**Nefunguje?** Počkej 15 minut a zkus znovu.

---

## ✅ HOTOVO! Co máš teď:

✨ **Live web na kastrup.cz**
✨ **SSL certifikát** (https:// automaticky)
✨ **CDN** po celém světě (super rychlý)
✨ **Auto-deploy** z GitHubu
✨ **Admin panel** na `/tajnedvere`
✨ **Zdarma hosting** (Vercel Free tier)

---

## 🔄 Jak to funguje do budoucna:

### Změny na webu:

1. Lokálně upravíš kód
2. `git push` na GitHub
3. Vercel **automaticky** buildne a nasadí
4. Za **30-60 sekund** live na kastrup.cz ✨

### Přidání článku:

1. Jdi na `kastrup.cz/tajnedvere`
2. Přihlaš se
3. Dashboard → Nový článek
4. Napiš v editoru (jako Word)
5. Publikovat
6. Ihned live na webu! 🚀

---

## 🎛️ Vercel Dashboard

**Co tam najdeš:**

- **Deployments** - Historie všech nasazení
- **Analytics** - Počet návštěvníků (zdarma)
- **Domains** - Správa domény
- **Settings** - Nastavení projektu
- **Logs** - Logy pro debugging

---

## 🆘 Troubleshooting

### "Stránka nenalezena" (404)
→ DNS ještě není propagované. Počkej 15-30 minut.

### "Build failed"
→ Zkontroluj Environment Variables ve Vercel Settings.

### "Články se nenačítají"
→ Zkontroluj Supabase URL a API key ve Vercel Environment Variables.

### "Změny se nezobrazí"
→ Hard refresh: `Ctrl + Shift + R` (Windows) nebo `Cmd + Shift + R` (Mac)

### "Admin panel nefunguje"
→ Zkontroluj, že máš admin účet v Supabase s `role = 'admin'`

---

## 📊 Co dál?

### Doporučené kroky:

1. ✅ **Nastav vlastní 404 stránku** (už máš)
2. ✅ **Přidej Google Analytics** (volitelné)
3. ✅ **Nastav email notifikace** ve Vercel
4. ✅ **Přidej OG obrázky** pro social media
5. ✅ **Optimize images** (převeď na WebP)

### Vercel funkce zdarma:

- ✨ Unlimited bandwidth
- ✨ Automatic SSL
- ✨ Edge Network (CDN)
- ✨ Preview deployments
- ✨ Analytics
- ✨ Web Vitals monitoring

---

## 🎉 Gratulace!

Tvůj web je nyní LIVE na **kastrup.cz**! 🚀

Máš:
- ⚡ Super rychlý web
- 🔒 Bezpečný (HTTPS)
- 📝 Admin panel pro články
- 🌍 Dostupný po celém světě
- 🆓 Zdarma hosting

**Enjoy!** 😊

---

## 📞 Potřebuješ pomoct?

Vercel Support: https://vercel.com/support
Wedos Support: https://www.wedos.cz/podpora/

**Nebo se ozvi mně v další session!** 🤝
