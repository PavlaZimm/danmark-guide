# 🔍 Google Search Console - Návod na nastavení

## ⚡ Rychlý start (5 minut)

### Krok 1: Přidej web do GSC

1. **Jdi na** [search.google.com/search-console](https://search.google.com/search-console)
2. **Přihlaš se** Google účtem
3. **Klikni "Přidat vlastnost"** (Add Property)
4. **Vyber typ:** "URL prefix" (NIKOLI Domain!)
5. **Zadej:** `https://kastrup.cz`
6. **Klikni "Pokračovat"**

---

### Krok 2: Ověř vlastnictví (už je hotové!)

GSC nabídne několik metod ověření. **Tvůj web už má meta tag v kódu**, takže:

1. **Vyber metodu:** "HTML tag"
2. **Zkontroluj**, že tag je: `aKJkwBrwSzzmO7JmHGnVmXnx-_bAsWSXlEw-mx3beN4`
3. **Klikni "Ověřit"**

✅ **Hotovo!** Web je ověřený.

---

### Krok 3: Přidej Sitemap

1. V levém menu klikni **"Sitemaps"**
2. Do pole "Add a new sitemap" zadej: `sitemap.xml`
3. **Klikni "Submit"**

---

### Krok 4: Požádej o indexování stránky

1. V levém menu klikni **"URL Inspection"** (Kontrola adresy URL)
2. Zadej přesnou URL: `https://kastrup.cz/o-dansku`
3. **Klikni "Request Indexing"** (Požádat o indexování)

**Nebo použij zkratku:**
- Nahoře v GSC je vyhledávací pole
- Zadej tam: `https://kastrup.cz/o-dansku`
- Enter
- Klikni "Request Indexing"

---

## ⚠️ Běžné problémy a řešení

### "Zkontrolujte nějakou adresu URL v aktuálně vybrané službě"

**Příčina:** Zadáváš URL, která nepatří do vybrané vlastnosti.

**Řešení:**
1. Zkontroluj v levém horním rohu název vlastnosti
2. Mělo by tam být: **"kastrup.cz"** nebo **"https://kastrup.cz"**
3. Pokud tam je něco jiného, klikni na dropdown a vyber správnou vlastnost
4. Pokud vlastnost není v seznamu, přidej ji (viz Krok 1 výše)

### "URL není na Google"

**To je normální!** Nový web Google ještě nemá zaindexovaný.

**Řešení:**
1. Klikni "Request Indexing" (Požádat o indexování)
2. Google začne indexovat během **24-48 hodin**
3. Kontroluj stav v GSC pravidelně

### "Stránka s přesměrováním"

**Příčina:** URL má redirect (např. http → https nebo www → non-www)

**Řešení:**
- To je v pořádku! Google to vyřeší automaticky
- Používej vždy **kanonickou URL**: `https://kastrup.cz/o-dansku`

### 403 Forbidden na hlavní stránce

**Příčina:** Možný problém s Vercel konfigurací nebo CSP.

**Řešení:**
1. Zkontroluj Vercel dashboard - je deploy úspěšný?
2. Zkontroluj konzoli prohlížeče (F12) - jsou tam chyby?
3. Zkontroluj CSP hlavičky v `index.html`

---

## 📊 Co sledovat v GSC

Po úspěšném přidání webu sleduj:

### 1. **Coverage (Pokrytí)**
- Kolik stránek je zaindexovaných
- Jsou tam nějaké chyby?

### 2. **Performance (Výkon)**
- Kolik kliknutí dostáváš z Google
- Jaké klíčové slova fungují
- CTR (Click-Through Rate)

### 3. **Enhancements (Vylepšení)**
- Core Web Vitals (rychlost stránky)
- Mobile Usability (mobilní použitelnost)

---

## 🚀 Po nastavení

### Přidej další důležité stránky k indexaci:

```
https://kastrup.cz/
https://kastrup.cz/o-dansku
https://kastrup.cz/clanky
https://kastrup.cz/ubytovani
https://kastrup.cz/kontakt
```

**Tip:** Nemusíš přidávat KAŽDOU stránku ručně. Google automaticky najde stránky ze sitemap a interních odkazů.

---

## 📝 Checklist

- [ ] Přidána vlastnost `https://kastrup.cz` do GSC
- [ ] Ověřeno vlastnictví (HTML meta tag)
- [ ] Přidán sitemap.xml
- [ ] Požádáno o indexování hlavních stránek
- [ ] Zkontrolována Coverage (pokrytí)
- [ ] Nastaveny email notifikace pro chyby

---

## 🆘 Stále to nefunguje?

**Zkontroluj:**

1. **Je web live?** Otevři https://kastrup.cz/o-dansku v anonymním režimu
2. **Je správná URL?** Zkontroluj že používáš `https://` (ne `http://`)
3. **Je vybraná správná vlastnost?** V GSC nahoře vlevo
4. **Čekáš dostatečně dlouho?** Indexace trvá 24-48 hodin

**Pošli screenshot chyby na:** zimmermannovap@gmail.com

---

## 🎯 Důležité poznámky

### URL formáty v GSC:

✅ **Správně:**
- `https://kastrup.cz`
- `https://kastrup.cz/o-dansku`

❌ **Špatně:**
- `kastrup.cz` (chybí https://)
- `www.kastrup.cz` (pokud máš vlastnost bez www)
- `http://kastrup.cz` (HTTP místo HTTPS)

### Vlastnost vs Doména:

- **URL prefix vlastnost:** `https://kastrup.cz` ✅ (používej toto!)
- **Domain vlastnost:** `kastrup.cz` (vyžaduje DNS ověření)

Pro začátek používej **URL prefix** - je to jednodušší!

---

**Vytvořeno:** 2025-11-21
**Autor:** Claude & Pavla
