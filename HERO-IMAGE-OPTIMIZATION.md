# Optimalizace Hero Obrázku

## Aktuální stav
- **Soubor:** `src/assets/hero-denmark.webp`
- **Velikost:** 260 KB
- **Cíl:** ~100-120 KB (60% úspora)

## Proč optimalizovat?
- Rychlejší načítání homepage
- Lepší Core Web Vitals (LCP - Largest Contentful Paint)
- Lepší SEO ranking
- Nižší data usage pro mobilní uživatele

---

## ✅ RYCHLÁ METODA (Doporučená) - Online nástroj

### 1. Použijte Squoosh.app (Google)

1. Jděte na **https://squoosh.app/**
2. Přetáhněte soubor: `src/assets/hero-denmark.webp`
3. Nastavte:
   - **Format:** WebP
   - **Quality:** 75-80 (experimentujte)
   - **Resize:** Zkontrolujte rozměry (max 1920px široký)
4. Porovnejte:
   - Vlevo: Originál (260 KB)
   - Vpravo: Optimalizovaný (~100-120 KB)
5. Pokud vypadá dobře → **Download**
6. Nahraďte soubor v `src/assets/hero-denmark.webp`

---

## 🔧 POKROČILÁ METODA - Pomocí Sharp (npm)

### Pokud máte Node.js nainstalovaný:

```bash
# V root složce projektu
cd /home/user/danmark-guide

# Vytvořte optimalizační script
cat > optimize-hero.js << 'EOF'
const sharp = require('sharp');

sharp('src/assets/hero-denmark.webp')
  .webp({ quality: 78, effort: 6 })
  .toFile('src/assets/hero-denmark-optimized.webp')
  .then(info => {
    console.log('✅ Optimalizováno!');
    console.log('Původní: 260 KB');
    console.log('Nová velikost:', Math.round(info.size / 1024), 'KB');
    console.log('Úspora:', Math.round((1 - info.size/260000) * 100), '%');
  });
EOF

# Nainstalujte Sharp (pokud není)
npm install sharp --save-dev

# Spusťte optimalizaci
node optimize-hero.js

# Nahraďte soubor
mv src/assets/hero-denmark-optimized.webp src/assets/hero-denmark.webp

# Commitněte
git add src/assets/hero-denmark.webp
git commit -m "PERF: Optimalizace hero obrázku (260 KB → ~100 KB)"
git push
```

---

## 📊 Očekávané výsledky

| Metrika | Před | Po | Zlepšení |
|---------|------|----|---------|
| **Velikost** | 260 KB | ~100-120 KB | -55% |
| **LCP** | ~2.5s | ~1.5s | -40% |
| **PageSpeed Score** | 85 | 92+ | +7 |

---

## ✅ Ověření po optimalizaci

1. **Lokálně:**
   ```bash
   ls -lh src/assets/hero-denmark.webp
   # Mělo by být ~100-120 KB
   ```

2. **Vizuálně:**
   - Otevřete homepage
   - Hero obrázek by měl vypadat stejně ostrý
   - Žádné artefakty komprese

3. **PageSpeed:**
   - Jděte na https://pagespeed.web.dev/
   - Testujte https://kastrup.cz
   - LCP by mělo být < 2.5s (ideálně < 1.5s)

---

## 🎯 Doporučené nastavení komprese

| Kvalita | Velikost | Použití |
|---------|----------|---------|
| 70-75 | ~90 KB | Maximální komprese (pro velmi pomalé sítě) |
| **75-80** | **~100-120 KB** | **✅ Doporučené (sweet spot)** |
| 80-85 | ~140-160 KB | Vyšší kvalita (pro retina displaye) |
| 85-90 | ~180-200 KB | Minimální komprese |

---

## 📝 Poznámky

- **Kvalita 78** je obvykle nejlepší kompromis mezi kvalitou a velikostí
- Hero obrázek se zobrazuje na celé šířce obrazovky → vyšší kvalita je důležitá
- WebP formát už používáte ✅ (lepší než JPEG)
- Po optimalizaci vždy zkontrolujte vizuálně na různých zařízeních

---

## 🆘 Potřebujete pomoct?

Pokud máte problém s optimalizací:
1. Pošlete mi obrázek a já ho optimalizuji
2. Nebo použijte online nástroj Squoosh.app (nejjednodušší)

**Happy optimizing!** 🚀
