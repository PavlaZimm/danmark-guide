# 🖼️ Optimalizace obrázků - TODO

## Aktuální stav
Obrázky v `src/assets/` jsou ve formátu JPG a mají následující velikosti:
- `hero-denmark.jpg` - **315KB** (největší problém)
- `hygge.jpg` - 92KB
- `countryside.jpg` - 72KB
- `design.jpg` - 64KB

**Celkem: 543KB**

## Cíl
Převést na WebP a snížit velikost na **~150KB celkem** (70% úspora).

## Jak optimalizovat

### Možnost 1: Online nástroje
1. Navštivte https://squoosh.app/
2. Nahrajte každý obrázek
3. Zvolte WebP formát
4. Nastavte kvalitu na 75-80%
5. Stáhněte a přejmenujte:
   - `hero-denmark.webp`
   - `hygge.webp`
   - `countryside.webp`
   - `design.webp`
6. Nahraďte v `src/assets/`

### Možnost 2: ImageMagick (lokálně)
```bash
cd src/assets
for file in *.jpg; do
  convert "$file" -quality 80 "${file%.jpg}.webp"
done
```

### Možnost 3: NPM balíček
```bash
npm install -D imagemin imagemin-webp
```

Vytvořte `scripts/optimize-images.js`:
```javascript
import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';

await imagemin(['src/assets/*.jpg'], {
  destination: 'src/assets',
  plugins: [
    imageminWebp({quality: 80})
  ]
});
```

## Po konverzi

### 1. Aktualizujte importy v `src/pages/Home.tsx`:
```typescript
// Před:
import heroImage from "@/assets/hero-denmark.jpg";
import countrysideImage from "@/assets/countryside.jpg";
import hyggeImage from "@/assets/hygge.jpg";
import designImage from "@/assets/design.jpg";

// Po:
import heroImage from "@/assets/hero-denmark.webp";
import countrysideImage from "@/assets/countryside.webp";
import hyggeImage from "@/assets/hygge.webp";
import designImage from "@/assets/design.webp";
```

### 2. Případně použijte fallback pro starší prohlížeče:
```tsx
<picture>
  <source srcSet={heroImage} type="image/webp" />
  <img src={heroImageJpg} alt="..." />
</picture>
```

## Očekávané výsledky
- ⚡ Rychlejší načítání stránky (2-3x)
- 📉 Snížení bandwidth o ~70%
- 🎯 Lepší Lighthouse score (+10-15 bodů)
- 🚀 Menší bundle size v production buildu

## Priorita
🔴 **VYSOKÁ** - Největší dopad na výkon webu
