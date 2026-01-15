# 🔒 Oprava SSL certifikátu pro www.kastrup.cz

## Problém:
- SSL certifikát pokrývá pouze `kastrup.cz`
- Když někdo přistoupí na `www.kastrup.cz`, dostane chybu certifikátu
- Přesměrování z www na bez-www je nastavené, ale nefunguje bez platného SSL

## Řešení: Přidat www.kastrup.cz do Vercel (5 minut)

---

## KROK 1: Přihlášení do Vercel

1. Jdi na **https://vercel.com**
2. Přihlaš se (přes GitHub)
3. Vyber projekt **danmark-guide**

---

## KROK 2: Přidání www domény

1. V projektu klikni na **Settings** (horní menu)
2. V levém menu vyber **Domains**
3. Uvidíš tam pravděpodobně jen `kastrup.cz`
4. Klikni na tlačítko **Add** (nebo **Add Domain**)
5. Do pole zadej: `www.kastrup.cz`
6. Klikni **Add**

---

## KROK 3: DNS ověření (už by mělo být hotové)

Vercel ti ukáže požadované DNS záznamy. **POZOR:** DNS záznamy pro `www` už by měly být nastavené ve Wedos (podle původního návodu):

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**Pokud tento záznam máte ve Wedos** → není potřeba nic měnit!

**Pokud tento záznam nemáte:**

### Ve Wedos:
1. Přihlaš se na **https://admin.wedos.cz**
2. Jdi na **Domény** → **kastrup.cz**
3. Klikni **DNS záznamy**
4. Zkontroluj, jestli tam je CNAME záznam pro `www`
5. **Pokud není**, přidej ho:
   - Typ: `CNAME`
   - Jméno: `www`
   - Hodnota: `cname.vercel-dns.com`
   - TTL: `3600`
6. Klikni **Uložit**

---

## KROK 4: Čekání na SSL certifikát (1-2 minuty)

Po přidání `www.kastrup.cz` do Vercel:

1. Vercel **automaticky** vygeneruje SSL certifikát
2. Trvá to **30 sekund až 2 minuty**
3. Ve Vercel Domains uvidíš status:
   - ⏳ **Configuring...** → čeká se
   - ✅ **Valid** → hotovo!

---

## KROK 5: Testování

Otevři v prohlížeči:

1. **https://www.kastrup.cz**
2. **https://kastrup.cz**

### Co by mělo fungovat:

✅ **Obě URL se načtou bez chyby certifikátu**
✅ **www.kastrup.cz automaticky přesměruje na kastrup.cz**
✅ **Zelený zámek v prohlížeči** (platný SSL)

---

## ✅ HOTOVO!

Teď máš:
- 🔒 **SSL certifikát pro kastrup.cz**
- 🔒 **SSL certifikát pro www.kastrup.cz**
- ↪️ **Automatické přesměrování z www na bez-www**

---

## 🔍 Jak ověřit SSL certifikát

### Metoda 1: V prohlížeči
1. Jdi na https://www.kastrup.cz
2. Klikni na **zámek** v adresním řádku
3. Klikni **Certifikát**
4. Mělo by tam být: `kastrup.cz` a `www.kastrup.cz`

### Metoda 2: Online nástroj
1. Jdi na **https://www.ssllabs.com/ssltest/**
2. Zadej: `www.kastrup.cz`
3. Klikni **Submit**
4. Počkej na výsledek (1-2 minuty)
5. Měl by ukazovat **A nebo A+** rating

---

## 🆘 Troubleshooting

### "Stále vidím chybu certifikátu"
→ Vymažte cache prohlížeče a zkuste znovu:
- **Chrome/Edge:** `Ctrl + Shift + Delete`
- **Firefox:** `Ctrl + Shift + Delete`
- Nebo zkuste **incognito/private mode**

### "DNS_PROBE_FINISHED_NXDOMAIN"
→ DNS záznamy ještě nejsou propagované. Počkej 15-30 minut.

### Ve Vercel vidím "Invalid Configuration"
→ Zkontroluj DNS záznamy ve Wedos. Měl by tam být CNAME pro `www`.

### "Certificate Error: Domain not found"
→ Počkej 2-3 minuty. Vercel generuje certifikát na pozadí.

---

## 📋 Shrnutí

**Co se stalo:**
- Původně byl SSL certifikát jen pro `kastrup.cz`
- Přidáním `www.kastrup.cz` do Vercel se vygeneroval nový certifikát
- Nový certifikát pokrývá **obě domény**
- Přesměrování z www na bez-www už bylo nastavené v `vercel.json`

**Nyní funguje:**
- ✅ Někdo zadá `www.kastrup.cz`
- ✅ SSL se validuje (certifikát je OK)
- ✅ Přesměruje se na `kastrup.cz`
- ✅ Žádná chyba certifikátu!

---

## 🎉 Super práce!

Tvůj web je teď správně zabezpečený a dostupný na obou verzích domény!

**Potřebuješ pomoct?**
- Vercel Support: https://vercel.com/support
- Nebo se ozvi! 🤝
