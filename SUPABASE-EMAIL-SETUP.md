# Supabase Email Configuration Check

## Problém
Reset hesla nefunguje - email se nepošle.

## Možné příčiny:

### 1. Email provider není nakonfigurovaný v Supabase

**Zkontroluj:**
1. Jdi na: https://supabase.com/dashboard/project/bhwrnvvfymyastwdutpf/auth/templates
2. Zkontroluj, jestli je nastaven email provider

**Default Supabase email:**
- Supabase má default email službu
- Měla by fungovat i bez vlastního SMTP
- POKUD nechodí emaily, je to pravděpodobně kvůli rate limitům na dev projektech

### 2. Email template není správně nakonfigurovaný

**Zkontroluj template:**
1. Jdi na: https://supabase.com/dashboard/project/bhwrnvvfymyastwdutpf/auth/templates
2. Najdi "Reset Password" template
3. Zkontroluj, že obsahuje `{{ .ConfirmationURL }}`

### 3. Redirect URL není whitelistovaný

**Zkontroluj:**
1. Jdi na: https://supabase.com/dashboard/project/bhwrnvvfymyastwdutpf/auth/url-configuration
2. Přidej do "Redirect URLs":
   - `https://kastrup.cz/**`
   - `http://localhost:8080/**`

## Řešení:

### A) Použij Supabase Dashboard (NEJRYCHLEJŠÍ)
1. Jdi na: https://supabase.com/dashboard/project/bhwrnvvfymyastwdutpf/auth/users
2. Najdi svůj účet
3. Klikni na ... → "Send password recovery"
4. Email přijde přímo z Supabase (obejde naši funkci)

### B) Zkontroluj browser console
1. Otevři browser console (F12)
2. Klikni na "Zapomenuté heslo?"
3. Zadej email a odešli
4. Podívej se na chyby v console

### C) Testuj API přímo
```javascript
// V browser console na /tajnedvere
await supabase.auth.resetPasswordForEmail('tvuj@email.cz', {
  redirectTo: 'https://kastrup.cz/tajnedvere'
})
```

## Quick Fix - Přidej debug výstup

V `src/pages/admin/AdminLogin.tsx` změň:

```tsx
const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
  redirectTo: `${window.location.origin}/tajnedvere`,
});

// Přidej debug:
console.log('Reset password called for:', resetEmail);
console.log('Redirect URL:', `${window.location.origin}/tajnedvere`);

if (error) {
  console.error('Supabase error:', error);
  throw error;
}

console.log('✅ Email sent successfully');
```

## Poznámky:

- Supabase FREE tier má limit 3 emaily/hodinu
- Produkční projekty mají vyšší limity
- Default Supabase emaily můžou skončit ve SPAMu
