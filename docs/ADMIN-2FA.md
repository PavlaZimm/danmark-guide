# Dvoufaktorové ověření administrace

Administrace na `/tajnedvere` vyžaduje heslo, roli admin a ověřenou relaci AAL2. Po prvním přihlášení správce nastaví TOTP aplikaci, naskenuje QR kód a potvrdí šestimístný kód. QR kód a tajný klíč zůstávají pouze v paměti zobrazeného formuláře; neposílat je do chatu ani ukládat do repozitáře.

Před potvrzením nastavení si správce zajistí zálohu ověřovací aplikace nebo bezpečně uloží klíč do správce hesel. Aplikace nevydává vlastní obnovovací kódy. Při dalších přihlášeních vyžaduje aktuální TOTP kód. Stávající ověřená relace může zůstat přihlášená do odhlášení nebo vypršení relace.

## Ochrana dat

Migrace `20260918140433_require_admin_mfa.sql` přidává restriktivní RLS pravidla. Zápis článků, profilů a obrázků vyžaduje současně admin roli a AAL2. Zpřísňuje také případný zápis kategorií, pro který nadále musí existovat příslušné povolující pravidlo. Koncepty jsou dostupné až po MFA. Vlastní profil zůstává čitelný před MFA, aby klient mohl zjistit roli. Veřejné publikované články, kategorie a obrázky zůstávají čitelné návštěvníkům. Zálohy článků jsou dostupné pouze databázovému správci / service role.

Produkční Supabase projekt: `bhwrnvvfymyastwdutpf`. Před každým vzdáleným příkazem ověřit cílový projekt; historický lokální config může odkazovat jinam. Service role záměrně obchází RLS a nikdy nesmí být v klientovi.

## Ztracený telefon

Nejprve obnovit aplikaci ze zálohy. Bez zálohy musí vlastník Supabase projektu nezávisle ověřit totožnost správce a přes správu Authentication provést reset jeho MFA faktorů a odvolat relace. Použít podporovanou správu Auth, neupravovat ručně auth tabulky a nevypínat RLS ani požadavek AAL2. Při dalším přihlášení uživatel spáruje novou aplikaci. Reset hesla sám o sobě MFA neodstraňuje; uživatel s existujícím faktorem je při obnově hesla vyzván také k MFA.

## Ověření změn

`node --test tests/admin-access.test.mjs`, `npm run typecheck`, `npm run lint`, `npm run build`. Databázové scénáře testovat v transakci s `ROLLBACK`: anonym, admin AAL1, admin AAL2 a neadmin AAL2; zvlášť čtení konceptů a zápis článků i obrázků. Osobní párování aplikace a skutečný kód zadává pouze uživatel.
