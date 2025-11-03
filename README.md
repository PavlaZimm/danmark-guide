# 🇩🇰 Kastrup.cz - Průvodce Dánskem

**Kastrup.cz** je moderní travel guide zaměřený na Dánsko s administračním panelem pro správu obsahu.

## 🌟 Funkce

### Veřejný web
- 📝 **Články** - Blog s články o Dánsku (cestování, kultura, tipy)
- 🏨 **Ubytování** - Katalog ubytování v Dánsku
- 🌓 **Dark Mode** - Přepínání mezi světlým a tmavým tématem
- 📱 **PWA** - Progressive Web App s offline podporou
- 🚀 **SEO Optimalizace** - Meta tagy, Schema.org markup, Open Graph
- ⚡ **Rychlý výkon** - Code splitting, lazy loading (340KB initial bundle)

### Admin Panel (`/tajnedvere`)
- 🔐 **Zabezpečené přihlášení** - Autentizace přes Supabase Auth
- 📊 **Dashboard** - Přehled statistik (články, publikované, koncepty)
- ✍️ **WYSIWYG Editor** - TipTap editor s bohatým formátováním
- 🖼️ **Správa článků** - Vytváření, úprava, mazání článků
- 🏷️ **SEO pole** - Meta title, meta description, focus keyword
- 👁️ **Náhled** - Možnost zobrazit článek před publikací
- 📸 **Obrázky** - Upload URL obrázků s náhledem

## 🛠️ Technologie

- **Frontend**: React 18.3 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Routing**: React Router v6
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Editor**: TipTap (WYSIWYG)
- **SEO**: React Helmet Async
- **Icons**: Lucide React
- **State**: React Hooks (useState, useEffect)

## 📁 Struktur projektu

```
danmark-guide/
├── public/
│   ├── icon-192.svg          # PWA ikona
│   ├── icon-512.svg          # PWA ikona
│   ├── apple-touch-icon.svg  # iOS ikona
│   └── manifest.json         # PWA manifest
├── src/
│   ├── components/
│   │   ├── admin/
│   │   │   └── ProtectedRoute.tsx  # Ochrana admin routes
│   │   ├── ui/                     # shadcn/ui komponenty
│   │   ├── ArticleCard.tsx
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── AdminLogin.tsx      # Přihlášení /tajnedvere
│   │   │   ├── AdminDashboard.tsx  # Dashboard
│   │   │   ├── AdminArticles.tsx   # Seznam článků
│   │   │   └── ArticleEditor.tsx   # WYSIWYG editor
│   │   ├── Home.tsx
│   │   ├── Articles.tsx
│   │   ├── ArticleDetail.tsx
│   │   ├── Accommodation.tsx
│   │   ├── AccommodationDetail.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   └── NotFound.tsx
│   ├── integrations/
│   │   └── supabase/
│   │       └── client.ts           # Supabase client
│   ├── App.tsx                     # Hlavní aplikace + routing
│   ├── main.tsx                    # Entry point
│   └── index.css                   # Globální styly + TipTap
├── supabase/
│   └── migrations/
│       └── 20251102_sample_article.sql
├── scripts/
│   └── insert-sample-article.js
├── NASAZENI_NA_VERCEL.md          # 🚀 Deployment guide
├── KDE_PRIDAT_CLANKY.md           # Návod na přidání článků
├── JAK_VLOZIT_CLANEK.md           # Rychlý návod na vložení článku
├── TEMPLATE_CLANEK.html           # Šablona HTML článku
└── IMAGE_OPTIMIZATION_TODO.md     # Návod na optimalizaci obrázků
```

## 🚀 Lokální vývoj

### Požadavky
- Node.js 18+ (doporučeno přes [nvm](https://github.com/nvm-sh/nvm))
- npm nebo yarn

### Instalace

```bash
# Klonování repozitáře
git clone <YOUR_GIT_URL>
cd danmark-guide

# Instalace závislostí
npm install

# Vytvoření .env souboru
cp .env.example .env

# Spuštění dev serveru
npm run dev
```

### Environment Variables

Vytvoř `.env` soubor s následujícími proměnnými:

```env
VITE_SUPABASE_URL=https://acgrypwfevndvqcwhcld.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_SUPABASE_PROJECT_ID=acgrypwfevndvqcwhcld
```

## 📊 Databázová struktura

### Tabulky

#### `articles`
- `id` (uuid, PK)
- `title` (text) - Název článku
- `slug` (text, unique) - URL-friendly slug
- `perex` (text) - Krátký úvod
- `content` (text) - HTML obsah článku
- `image_url` (text) - URL hlavního obrázku
- `published` (boolean) - Stav publikace
- `category_id` (uuid, FK) - Kategorie článku
- `author_id` (uuid, FK) - Autor (user ID)
- `meta_title` (text) - SEO title
- `meta_description` (text) - SEO popisek
- `focus_keyword` (text) - Hlavní keyword
- `og_image` (text) - Open Graph obrázek
- `created_at` (timestamp)
- `updated_at` (timestamp)

#### `categories`
- `id` (uuid, PK)
- `name` (text) - Název kategorie
- `slug` (text, unique) - URL slug

#### `profiles`
- `id` (uuid, PK, FK → auth.users)
- `email` (text)
- `role` (text) - 'admin' nebo 'user'
- `created_at` (timestamp)

#### `accommodations`
- `id` (uuid, PK)
- `name` (text)
- `slug` (text, unique)
- `description` (text)
- `image_url` (text)
- `price_from` (numeric)
- `location` (text)
- `amenities` (jsonb)
- `created_at` (timestamp)

## 🔐 Admin Panel

### Přístup
URL: **`kastrup.cz/tajnedvere`**

### Routes
- `/tajnedvere` - Přihlašovací stránka
- `/tajnedvere/dashboard` - Dashboard se statistikami (🔒 protected)
- `/tajnedvere/articles` - Seznam všech článků (🔒 protected)
- `/tajnedvere/articles/new` - Vytvoření nového článku (🔒 protected)
- `/tajnedvere/articles/edit/:id` - Úprava článku (🔒 protected)

### Oprávnění
Pro přístup do administrace musí uživatel mít v tabulce `profiles` hodnotu `role = 'admin'`.

### WYSIWYG Editor funkce
- **Formátování**: Nadpisy (H2, H3), tučné, kurzíva
- **Seznamy**: Odrážkový, číslovaný
- **Odkazy**: Vkládání a úprava odkazů
- **Obrázky**: Vkládání obrázků z URL
- **HTML výstup**: Editor generuje čistý HTML kód
- **Placeholder**: Automatický text pro prázdný editor

## 📝 Správa obsahu

### Vytvoření nového článku

1. Přihlas se na `/tajnedvere`
2. V dashboardu klikni na **"Nový článek"**
3. Vyplň:
   - Název článku (automaticky generuje slug)
   - Slug (URL adresa)
   - Perex (úvodní text)
   - Kategorie
   - URL obrázku (s náhledem)
   - Obsah (WYSIWYG editor)
   - Meta title, meta description, focus keyword (SEO)
4. Klikni **"Uložit koncept"** nebo **"Publikovat"**

### Úprava článku

1. Jdi na `/tajnedvere/articles`
2. V seznamu klikni na ikonu **tužky** u článku
3. Proveď úpravy
4. Ulož změny

### Smazání článku

1. V seznamu článků klikni na ikonu **koše**
2. Potvrď smazání

## 🚀 Deployment

### Vercel (Doporučeno)

Kompletní návod najdeš v souboru **[NASAZENI_NA_VERCEL.md](NASAZENI_NA_VERCEL.md)**.

**Rychlý přehled:**

1. Registrace na [vercel.com](https://vercel.com)
2. Import projektu z GitHubu
3. Nastavení Environment Variables
4. Propojení domény kastrup.cz (DNS konfigurace)

### Build příkazy

```bash
# Production build
npm run build

# Preview buildu
npm run preview
```

## 📚 Dokumentace

- **[NASAZENI_NA_VERCEL.md](NASAZENI_NA_VERCEL.md)** - Kompletní návod na nasazení na Vercel + DNS konfigurace
- **[KDE_PRIDAT_CLANKY.md](KDE_PRIDAT_CLANKY.md)** - Jak přidat články přes Supabase Dashboard
- **[JAK_VLOZIT_CLANEK.md](JAK_VLOZIT_CLANEK.md)** - Rychlý 3-krokový návod
- **[TEMPLATE_CLANEK.html](TEMPLATE_CLANEK.html)** - Šablona pro HTML obsah článku
- **[IMAGE_OPTIMIZATION_TODO.md](IMAGE_OPTIMIZATION_TODO.md)** - Návod na optimalizaci obrázků

## 🎨 Přizpůsobení

### Barvy (Tailwind)
Konfigurace v `tailwind.config.ts`:
- Primary: Červená (`#dc2626`)
- Secondary: Modrá (`#2563eb`)
- Dark mode: Automatické přepínání

### Komponenty (shadcn/ui)
Komponenty v `src/components/ui/` lze upravovat nebo přidávat nové přes:
```bash
npx shadcn-ui@latest add [component-name]
```

## 📈 Optimalizace

### Aktuální výkon
- ✅ Initial bundle: **340KB** (po code splittingu)
- ✅ Lazy loading routes
- ✅ Image lazy loading
- ✅ PWA s offline podporou
- ⚠️ TODO: Konverze obrázků na WebP (543KB → 150KB úspora)

## 🐛 Troubleshooting

### Admin panel nefunguje
- Zkontroluj, že máš v `profiles` tabulce `role = 'admin'`
- Zkontroluj Environment Variables ve Vercel

### Články se nenačítají
- Zkontroluj Supabase URL a API key
- Zkontroluj Row Level Security (RLS) policies

### Build selhává
- Smaž `node_modules` a `package-lock.json`
- Znovu spusť `npm install`
- Zkontroluj Node.js verzi (18+)

## 🤝 Přispívání

1. Fork repozitáře
2. Vytvoř feature branch (`git checkout -b feature/nova-funkcionalita`)
3. Commit změny (`git commit -m 'Přidání nové funkcionality'`)
4. Push do branch (`git push origin feature/nova-funkcionalita`)
5. Otevři Pull Request

## 📄 Licence

Tento projekt je privátní. Všechna práva vyhrazena.

## 📞 Kontakt

Pro otázky nebo podporu kontaktuj majitele repozitáře.

---

**Vytvořeno s ❤️ pro milovníky Dánska**
