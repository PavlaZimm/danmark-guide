# ⚠️ URGENTNÍ: Oprava Supabase URL Settings

## Problém
Recovery email funguje, ale redirect ukazuje na `localhost:3000` místo správné URL.

## Řešení - Oprav v Supabase Dashboard:

### 1. Jdi na Authentication Settings:
```
https://supabase.com/dashboard/project/bhwrnvvfymyastwdutpf/auth/url-configuration
```

### 2. Nastav Site URL:
**Production:**
```
https://kastrup.cz
```

**Development (volitelné):**
```
http://localhost:8080
```

### 3. Přidej Redirect URLs (všechny tyto):
```
https://kastrup.cz/**
https://kastrup.cz/tajnedvere**
http://localhost:8080/**
http://localhost:8080/tajnedvere**
```

### 4. Klikni **Save**

---

## Jak to použít TEĎ:

Máš už recovery token v URL. Udělej toto:

1. **Otevři svou aplikaci** na správné URL:
   - Local: http://localhost:8080/tajnedvere
   - Produkce: https://kastrup.cz/tajnedvere

2. **Otevři browser console** (F12)

3. **Zkopíruj tento kód** do console a spusť:

```javascript
// Vezmi token z URL kterou jsi dostal v emailu
const hash = '#access_token=eyJhbGciOiJIUzI1NiIsImtpZCI6ImoxN01NL2g3VUtVM3hxbloiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2Jod3JudnZmeW15YXN0d2R1dHBmLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiI0MTVjMjAxMi05ZDg4LTQyNjctOWIyMS02M2I5M2FiMzg0YWQiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzY0MTkzODgxLCJpYXQiOjE3NjQxOTAyODEsImVtYWlsIjoiemltbWVybWFubm92YXBAZ21haWwuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6eyJlbWFpbF92ZXJpZmllZCI6dHJ1ZX0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoib3RwIiwidGltZXN0YW1wIjoxNzY0MTkwMjgxfV0sInNlc3Npb25faWQiOiJmYzZkZjk3MC05ZTNhLTRhNGEtYjgyZC0wMDI3ODhjN2NhMDgiLCJpc19hbm9ueW1vdXMiOmZhbHNlfQ.aa9wX-wewPT4_6JC7oBBQSA0R8C7VAlKcqst9VK_lC4&expires_at=1764193881&expires_in=3600&refresh_token=rnj5qzyvugo6&token_type=bearer&type=recovery';

// Nastav nové heslo (změň "TvojeNoveHeslo123" na své heslo!)
const newPassword = 'TvojeNoveHeslo123';

// Spusť reset
window.location.hash = hash;
await new Promise(resolve => setTimeout(resolve, 1000)); // počkej než se token načte

const { data, error } = await supabase.auth.updateUser({
  password: newPassword
});

if (error) {
  console.error('❌ Chyba:', error);
} else {
  console.log('✅ Heslo úspěšně změněno!');
  alert('Heslo bylo změněno! Můžeš se přihlásit.');
}
```

---

## Po úspěšné změně hesla:

1. Odhlásit se: `await supabase.auth.signOut()`
2. Přihlásit se s novým heslem na `/tajnedvere`

---

## Token expiruje za 1 hodinu!

Pokud uplyne více než hodina od kliknutí na email link, budeš muset požádat o nový recovery email.
