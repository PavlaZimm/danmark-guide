# Ověření 2FA, 18. 9. 2026

Nasazená implementace: commit `7d2019e68c35abe56c98496ec22d479b54e278ad`; Vercel ohlásil úspěšné nasazení. Migrace `require_admin_mfa` byla aplikována na produkční Supabase projekt `bhwrnvvfymyastwdutpf`.

Prošlo pět testů rozhodování o přístupu, TypeScript, ESLint a produkční sestavení. SQL integrační test `tests/admin-mfa-rls.sql` ověřil roli anon, admin AAL1, admin AAL2 a neadmin AAL2. Ověřil koncepty, zápis článků, ochranu profilů a obrázků a uzavření záloh. Celý test skončil ROLLBACK; kontrola potvrdila nula testovacích článků a objektů a původních šest článků.

Na ostrém webu ověřeno přesměrování anonymního vstupu do dashboardu na přihlášení a nový text o povinném druhém faktoru. Osobní párování telefonu a přihlášení se skutečným TOTP nebylo provedeno za uživatele. V okamžiku ověření neměl účet žádný ověřený faktor; první nastavení dokončí vlastník účtu.

## Automatický bezpečnostní poradce

Po migraci nebyla nalezena tabulka bez RLS. Zbývající hlášení:

- [RLS bez povolující policy](https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy) u záloh je záměrné: webový klient nemá přístup ani granty, spravuje je databázový vlastník / service role.
- [SECURITY DEFINER pro přihlášené](https://supabase.com/docs/guides/database/database-linter?lint=0029_authenticated_security_definer_function_executable) a [anonymní role](https://supabase.com/docs/guides/database/database-linter?lint=0028_anon_security_definer_function_executable) upozorňuje na existující `is_admin` a `handle_new_user`. První slouží RLS a vrací pouze ověření role volajícího; druhá je triggerová funkce. Jejich granty nebyly v rámci MFA upravovány.
- Existující [kontrola kompromitovaných hesel](https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection) je vypnutá. Tato změna zavádí MFA; nejde o kompletní audit všech nastavení Supabase Auth.
