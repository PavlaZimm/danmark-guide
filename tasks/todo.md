# Security Review — kastrup.cz
_Provedeno: 2026-04-14_

---

## Security Review

### ✅ OPRAVENO

- [x] **Secrets & ENV** — `.env` je v `.gitignore`, žádné hardcoded klíče v kódu
- [x] **Debug soubor** — smazán `AdminLogin-DEBUG.tsx` s console.log citlivých dat
- [x] **Console.log** — odstraněny debug logy z `ResetPassword.tsx`
- [x] **URL validace** — `ArticleEditor.tsx` blokuje `javascript:` XSS vektory
- [x] **DOMPurify při zápisu** — HTML se sanitizuje při ukládání článku, nejen při čtení
- [x] **robots.txt** — odstraněna cesta `/tajnedvere/` (prozrazování admin URL)
- [x] **HSTS header** — přidán `Strict-Transport-Security: max-age=63072000` do `vercel.json`
- [x] **CSP header** — přidán `Content-Security-Policy` do `vercel.json`
- [x] **error: any** — opraveno na `error: unknown` v catch blocích (AdminLogin, ArticleEditor, ImageUploadDialog, ResetPassword)
- [x] **npm audit** — opraveno 20 → 8 zranitelností (`npm audit fix`)
- [x] **noindex na admin** — všechny admin stránky mají `<meta name="robots" content="noindex, nofollow">`

---

### ⚠️ ZBÝVAJÍCÍ ZRANITELNOSTI (nelze opravit bez breaking changes)

| Balíček | Závažnost | Důvod | Dopad |
|---------|-----------|-------|-------|
| `esbuild` | moderate | No fix available | Pouze dev server, ne produkce |
| `serialize-javascript` | high | Fix = breaking change ve `vite-plugin-pwa` | Pouze build-time, ne runtime |
| `brace-expansion` | moderate | Transitivní závislost | Build-time only |

---

### 📋 DOPORUČENÍ (vyžaduje větší změny)

- [ ] **TypeScript strict mode** — `tsconfig.app.json` má `"strict": false`. Zapnout `"strict": true` vyžaduje refaktoring celého projektu
- [ ] **Google Analytics opt-in** — GA se načítá bez ohledu na cookie consent (GDPR)
- [ ] **2FA/MFA pro admin** — Supabase Auth podporuje TOTP, doporučeno zapnout
- [ ] **Audit log** — žádné logování admin operací (kdo, co, kdy upravil)
- [ ] **Rate limiting server-side** — existuje pouze na frontendu; doporučen Vercel Edge Middleware
- [ ] **HttpOnly cookies** — auth tokeny jsou v `localStorage`; bezpečnější = HttpOnly cookie (vyžaduje backend)
- [ ] **Supabase RLS** — ověřit manuálně v dashboardu, že jsou RLS policies na všech tabulkách a žádná nemá `USING (true)` bez podmínky

---

### 🔒 STAV SECURITY HEADERS (vercel.json)

| Header | Stav |
|--------|------|
| `X-Frame-Options: DENY` | ✅ |
| `X-Content-Type-Options: nosniff` | ✅ |
| `X-XSS-Protection: 1; mode=block` | ✅ |
| `Referrer-Policy: strict-origin-when-cross-origin` | ✅ |
| `Permissions-Policy` | ✅ |
| `Strict-Transport-Security` | ✅ přidáno |
| `Content-Security-Policy` | ✅ přidáno |
