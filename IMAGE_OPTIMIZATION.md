# Optimalizace obrázků

## Současný stav

Obrázky v `src/assets/` nejsou optimalizované:
- `hero-denmark.jpg` - 322 KB
- `countryside.jpg` - 73 KB
- `hygge.jpg` - 94 KB
- `design.jpg` - 65 KB

**Celkem: ~554 KB** (dost velké pro web)

## Doporučení pro optimalizaci

### 1. Použijte WebP formát s JPEG fallbackem

WebP má až o 30% lepší kompresi než JPEG.

```tsx
<picture>
  <source srcSet="/assets/hero-denmark.webp" type="image/webp" />
  <img src="/assets/hero-denmark.jpg" alt="..." />
</picture>
```

### 2. Responsive images (srcset)

Pro různé velikosti obrazovek:

```tsx
<img
  src="/assets/hero-denmark.jpg"
  srcSet="
    /assets/hero-denmark-400.jpg 400w,
    /assets/hero-denmark-800.jpg 800w,
    /assets/hero-denmark-1200.jpg 1200w,
    /assets/hero-denmark-1920.jpg 1920w
  "
  sizes="100vw"
  alt="..."
/>
```

### 3. Nástroje pro optimalizaci

#### Online:
- [TinyPNG](https://tinypng.com/) - jednoduchá komprese
- [Squoosh](https://squoosh.app/) - advanced nástroj od Google

#### CLI nástroje:
```bash
# Instalace sharp-cli
npm install -g sharp-cli

# Konverze do WebP
sharp -i hero-denmark.jpg -o hero-denmark.webp -f webp -q 80

# Resize + optimalizace
sharp -i hero-denmark.jpg -o hero-denmark-800.jpg --resize 800 -q 75
```

#### Automatizace s vite-plugin-imagemin:
```bash
npm install vite-plugin-imagemin --save-dev
```

```ts
// vite.config.ts
import imagemin from 'vite-plugin-imagemin'

export default {
  plugins: [
    imagemin({
      gifsicle: { optimizationLevel: 7 },
      mozjpeg: { quality: 80 },
      pngquant: { quality: [0.8, 0.9] },
      svgo: {
        plugins: [{ name: 'removeViewBox' }, { name: 'removeEmptyAttrs', active: false }]
      },
      webp: { quality: 80 }
    })
  ]
}
```

### 4. Cílové velikosti

| Obrázek | Současná velikost | Cílová velikost | Úspora |
|---------|------------------|----------------|--------|
| hero-denmark.jpg | 322 KB | ~100 KB (WebP) | 69% |
| countryside.jpg | 73 KB | ~25 KB | 66% |
| hygge.jpg | 94 KB | ~30 KB | 68% |
| design.jpg | 65 KB | ~22 KB | 66% |
| **CELKEM** | **554 KB** | **~177 KB** | **68%** |

### 5. Další vylepšení

- ✅ Lazy loading je už implementovaný
- ✅ Alt texty jsou vylepšené
- 🔲 Blur placeholder (LQIP - Low Quality Image Placeholder)
- 🔲 Progressive JPEGs
- 🔲 CDN pro obrázky (např. Cloudinary, Imgix)

## Rychlý quick-fix

Pokud chcete rychle zmenšit velikost bez instalace nástrojů:

1. Jděte na https://squoosh.app/
2. Nahrajte každý obrázek
3. Nastavte:
   - Format: WebP
   - Quality: 75-80
   - Resize: max 1920px široký
4. Stáhněte a nahraďte soubory

---

**Poznámka**: Po optimalizaci nezapomeňte otestovat na různých zařízeních a prohlížečích!
