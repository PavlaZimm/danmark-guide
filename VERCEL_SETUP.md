# Vercel Deployment Setup

## Problém: www.kastrup.cz zobrazuje "Načítání stránky..."

Toto se děje, když Vercel nespouští production build a místo toho nahrává development `index.html`.

## Řešení: Správné nastavení Vercel projektu

### 1. Zkontrolujte Build & Development Settings v Vercel Dashboard

1. Otevřete váš projekt na Vercelu: https://vercel.com/dashboard
2. Klikněte na **Settings** → **General**
3. Zkontrolujte sekci **Build & Development Settings**:

**KRITICKÉ NASTAVENÍ:**

```
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### 2. Environment Variables

V **Settings** → **Environment Variables** zkontrolujte, že máte nastavené:

```
VITE_SUPABASE_URL=https://acgrypwfevndvqcwhcld.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<váš klíč>
```

Pro všechna prostředí: **Production**, **Preview**, **Development**

### 3. Redeploy

Po změně nastavení:
1. Jděte do **Deployments**
2. Klikněte na **... (tři tečky)** u posledního deploymentu
3. Klikněte **Redeploy**
4. Zaškrtněte **Use existing build cache** (vypnout!)
5. Klikněte **Redeploy**

### 4. Ověření

Po nasazení zkontrolujte:
- ✅ kastrup.cz se načítá správně (React app běží)
- ✅ www.kastrup.cz přesměrovává na kastrup.cz
- ✅ V HTML source je `<script type="module" src="/assets/index-[hash].js">` (PRODUCTION)
- ❌ V HTML source NENÍ `<script type="module" src="/src/main.tsx">` (DEVELOPMENT)

## Debugging

Pokud problém přetrvává:

1. **Zkontrolujte Build Logs** v Vercel:
   - Mělo by být `vite build`
   - Mělo být `✓ 1946 modules transformed`
   - Mělo být `dist/index.html` vygenerováno

2. **Zkontrolujte výstup buildu**:
   ```bash
   npm run build
   cat dist/index.html | grep "script"
   ```
   Měli byste vidět: `<script type="module" crossorigin src="/assets/index-[hash].js">`

3. **Zkontrolujte cache**: V Vercel Settings → General → Clear Build Cache

## Soubory v tomto repozitáři

- `vercel.json` - Routing konfigurace (redirects, rewrites)
- `.vercelignore` - Soubory, které se nemají nahrávat na Vercel
- `package.json` - Build skripty
- `vite.config.ts` - Vite build konfigurace
