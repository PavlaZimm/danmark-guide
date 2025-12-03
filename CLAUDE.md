# CLAUDE.md - AI Assistant Guide for danmark-guide

**Last Updated:** 2025-12-03
**Project:** Kastrup.cz - Denmark Travel Guide
**Tech Stack:** React 18 + TypeScript + Vite + Supabase + Tailwind CSS

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture & Tech Stack](#architecture--tech-stack)
3. [Directory Structure](#directory-structure)
4. [Key Conventions & Patterns](#key-conventions--patterns)
5. [Database Schema](#database-schema)
6. [Development Workflows](#development-workflows)
7. [Common Tasks](#common-tasks)
8. [SEO Guidelines](#seo-guidelines)
9. [Testing & Debugging](#testing--debugging)
10. [Deployment](#deployment)
11. [Important Gotchas](#important-gotchas)

---

## 🎯 Project Overview

**kastrup.cz** is a modern travel guide for Denmark with:
- **Public website:** Articles, accommodation listings, dark mode, PWA support
- **Admin panel:** Secured content management system at `/tajnedvere`
- **Language:** Czech (cs_CZ)
- **Focus:** SEO optimization, performance, user experience

### Key Features
- 📝 Blog articles with rich text editor (TipTap)
- 🏨 Accommodation catalog with reviews
- 🔐 Admin authentication via Supabase Auth
- 🌓 Dark/light theme toggle
- 📱 PWA with offline support
- ⚡ Optimized bundle size (~340KB initial)
- 🚀 Code splitting & lazy loading

---

## 🏗️ Architecture & Tech Stack

### Frontend
- **Framework:** React 18.3.1 with TypeScript 5.8+
- **Build Tool:** Vite 5.4+ (SWC for fast refresh)
- **Routing:** React Router v6.30+
- **Styling:** Tailwind CSS 3.4+ with custom design tokens
- **UI Library:** Shadcn/ui (Radix UI primitives)
- **State Management:** React Hooks + TanStack Query (React Query)
- **Forms:** React Hook Form + Zod validation
- **Rich Text:** TipTap (WYSIWYG editor)

### Backend
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth with role-based access
- **Storage:** Supabase Storage for images
- **API:** Serverless functions in `/api` (Netlify Functions)

### SEO & Meta
- **Meta Tags:** react-helmet-async
- **Sitemap:** Dynamic serverless function at `/api/sitemap.js`
- **Structured Data:** JSON-LD Schema.org markup
- **Analytics:** Google Analytics ready

### DevOps
- **Hosting:** Netlify
- **CI/CD:** Git-based deployments
- **Node Version:** 18+ (LTS)

---

## 📁 Directory Structure

```
danmark-guide/
├── api/                           # Serverless functions
│   └── sitemap.js                # Dynamic sitemap generator
│
├── public/                        # Static assets
│   ├── images/                   # Public images
│   ├── manifest.json             # PWA manifest
│   ├── icon-{192,512}.svg        # PWA icons
│   └── apple-touch-icon.svg      # iOS icon
│
├── src/
│   ├── components/
│   │   ├── admin/                # Admin-specific components
│   │   │   ├── ProtectedRoute.tsx      # Auth wrapper for admin routes
│   │   │   └── ImageUploadDialog.tsx   # Image upload to Supabase
│   │   ├── ui/                   # Shadcn UI components (40+ components)
│   │   ├── ArticleCard.tsx       # Article preview card
│   │   ├── AccommodationCard.tsx # Accommodation card
│   │   ├── Header.tsx            # Navigation header
│   │   ├── Footer.tsx            # Footer with links
│   │   ├── ThemeToggle.tsx       # Dark mode toggle
│   │   ├── Breadcrumbs.tsx       # Navigation breadcrumbs
│   │   ├── CookieConsent.tsx     # GDPR cookie consent
│   │   └── ScrollToTop.tsx       # Scroll to top button
│   │
│   ├── pages/
│   │   ├── admin/                # Admin pages (protected)
│   │   │   ├── AdminLogin.tsx           # Login page (/tajnedvere)
│   │   │   ├── ResetPassword.tsx        # Password reset
│   │   │   ├── AdminDashboard.tsx       # Dashboard with stats
│   │   │   ├── AdminArticles.tsx        # Article management
│   │   │   └── ArticleEditor.tsx        # TipTap WYSIWYG editor
│   │   ├── Home.tsx              # Homepage
│   │   ├── Articles.tsx          # Article listing (with search/filter)
│   │   ├── ArticleDetail.tsx     # Single article view
│   │   ├── Accommodation.tsx     # Accommodation listing
│   │   ├── AccommodationDetail.tsx # Single accommodation
│   │   ├── About.tsx             # About page
│   │   ├── Contact.tsx           # Contact page
│   │   └── NotFound.tsx          # 404 page
│   │
│   ├── integrations/
│   │   └── supabase/
│   │       ├── client.ts         # Supabase client config
│   │       └── types.ts          # Auto-generated TypeScript types
│   │
│   ├── hooks/
│   │   └── use-toast.ts          # Toast notifications hook
│   │
│   ├── lib/
│   │   ├── seo-helpers.ts        # SEO utility functions
│   │   └── utils.ts              # General utilities (cn, etc.)
│   │
│   ├── types/                    # TypeScript type definitions
│   ├── assets/                   # Images and static assets
│   ├── content/blog/             # Blog content (JSON)
│   ├── App.tsx                   # Main router with lazy loading
│   ├── main.tsx                  # Entry point
│   └── index.css                 # Global styles + CSS variables
│
├── supabase/
│   └── migrations/               # Database migrations
│
├── scripts/
│   └── generate-sitemap.js       # Sitemap generation script
│
├── .env.example                  # Environment variables template
├── vite.config.ts                # Vite configuration
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
├── components.json               # Shadcn UI configuration
└── package.json                  # Dependencies & scripts
```

---

## 🎨 Key Conventions & Patterns

### 1. Routing Pattern

**Two separate route groups in `App.tsx`:**

```typescript
// Admin Routes (NO Header/Footer)
- /tajnedvere                     → AdminLogin
- /tajnedvere/reset-password      → ResetPassword
- /tajnedvere/dashboard           → AdminDashboard (protected)
- /tajnedvere/articles            → AdminArticles (protected)
- /tajnedvere/articles/new        → ArticleEditor (protected)
- /tajnedvere/articles/edit/:id   → ArticleEditor (protected)

// Public Routes (WITH Header/Footer)
- /                               → Home
- /clanky                         → Articles
- /clanek/:slug                   → ArticleDetail
- /ubytovani                      → Accommodation
- /ubytovani/:slug                → AccommodationDetail
- /o-dansku                       → About
- /kultura                        → Articles (filtered)
- /cestovani                      → Articles (filtered)
- /kontakt                        → Contact
- *                               → NotFound
```

**Important:** Always use `React.lazy()` for page imports and wrap with `Suspense`.

### 2. Component Patterns

**Component File Structure:**
```typescript
// 1. Imports
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

// 2. Interface (if needed)
interface ArticleCardProps {
  id: string;
  title: string;
  slug: string;
  imageUrl?: string;
}

// 3. Component
export default function ArticleCard({ id, title, slug, imageUrl }: ArticleCardProps) {
  // Component logic
  return (
    // JSX
  );
}
```

**Key Principles:**
- Use functional components with hooks
- Export as default for pages, named exports for utilities
- Use TypeScript interfaces for props
- Prefer composition over inheritance
- Keep components under 300 lines (extract sub-components if larger)

### 3. Styling Conventions

**Tailwind CSS Usage:**
```typescript
// ✅ Good: Use cn() utility for conditional classes
import { cn } from "@/lib/utils";

<div className={cn(
  "base-class another-class",
  isActive && "active-class",
  variant === "primary" ? "bg-primary" : "bg-secondary"
)} />

// ❌ Bad: String concatenation
<div className={`base-class ${isActive ? 'active-class' : ''}`} />
```

**Color Scheme:**
- Primary: Red (`#dc2626`) - Denmark flag inspired
- Secondary: Blue (`#2563eb`)
- Dark mode: Uses CSS variables with `class` strategy

**Custom Animations:**
- `animate-fade-in` - Fade in with translateY
- `animate-fade-up` - Fade up animation
- `animate-scale-in` - Scale in animation
- `animate-accordion-down/up` - Accordion animations

### 4. Data Fetching Pattern

**Use Supabase client directly (no custom hooks for queries):**

```typescript
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('id, title, slug, perex, image_url, categories(name)')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (!error) setArticles(data);
      setLoading(false);
    };

    fetchArticles();
  }, []);

  // Render logic...
}
```

**TanStack Query** is available but not widely used. Prefer simple useState/useEffect for now.

### 5. Authentication Pattern

**Protected Routes:**
```typescript
import ProtectedRoute from "@/components/admin/ProtectedRoute";

<Route
  path="/tajnedvere/dashboard"
  element={
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
```

**ProtectedRoute Logic:**
1. Check if user is authenticated via `supabase.auth.getUser()`
2. Query `profiles` table for user's role
3. Verify `role === 'admin'`
4. Show loading spinner during check
5. Redirect to `/tajnedvere` if unauthorized

**Login Flow:**
```typescript
const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password,
});

if (!error) {
  navigate("/tajnedvere/dashboard");
}
```

**Logout:**
```typescript
await supabase.auth.signOut();
navigate("/tajnedvere");
```

### 6. Form Handling

**Use React Hook Form + Zod (when validation needed):**
```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  slug: z.string().min(3),
});

const form = useForm({
  resolver: zodResolver(formSchema),
  defaultValues: { title: "", slug: "" },
});
```

### 7. Toast Notifications

**Use Sonner for user feedback:**
```typescript
import { toast } from "sonner";

// Success
toast.success("Article published successfully!");

// Error
toast.error("Failed to save article");

// Info
toast.info("Draft saved");

// Loading
toast.loading("Publishing...");
```

---

## 🗄️ Database Schema

### Key Tables

#### `articles`
```typescript
{
  id: uuid (PK)
  title: text
  slug: text (unique, URL-friendly)
  perex: text (excerpt)
  content: text (HTML from TipTap)
  image_url: text
  og_image: text
  published: boolean
  category_id: uuid (FK → categories)
  author_id: uuid (FK → profiles)
  meta_title: text
  meta_description: text
  focus_keyword: text
  created_at: timestamp
  updated_at: timestamp
}
```

#### `categories`
```typescript
{
  id: uuid (PK)
  name: text
  slug: text (unique)
  created_at: timestamp
}
```

#### `profiles`
```typescript
{
  id: uuid (PK, FK → auth.users)
  email: text
  role: text ('admin' | 'user')
  created_at: timestamp
}
```

#### `accommodations`
```typescript
{
  id: uuid (PK)
  name: text
  slug: text (unique)
  description: text
  city: text
  address: text
  type: text ('hotel' | 'apartment' | 'hostel')
  price_per_night: numeric
  images: text[] (array of URLs)
  image_url: text (main image)
  contact: text
  website: text
  meta_title: text
  meta_description: text
  focus_keyword: text
  og_image: text
  created_at: timestamp
  updated_at: timestamp
}
```

#### `accommodation_reviews`
```typescript
{
  id: uuid (PK)
  accommodation_id: uuid (FK → accommodations)
  user_id: uuid (FK → profiles)
  rating: integer (1-5)
  comment: text
  created_at: timestamp
}
```

### Row Level Security (RLS)

**Important:** All tables have RLS enabled.

**Common Policies:**
- Public read access: `SELECT` allowed for all authenticated users
- Admin write access: `INSERT`, `UPDATE`, `DELETE` only for `role = 'admin'`
- User-specific: Users can only edit their own content

---

## 🔧 Development Workflows

### Setup & Installation

```bash
# 1. Clone repository
git clone <repo-url>
cd danmark-guide

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env
# Edit .env with your Supabase credentials

# 4. Start development server
npm run dev
# Opens at http://localhost:8080
```

### Environment Variables

**Required in `.env`:**
```env
VITE_SUPABASE_URL=https://acgrypwfevndvqcwhcld.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key_here
VITE_SUPABASE_PROJECT_ID=acgrypwfevndvqcwhcld
```

**Get credentials from:**
https://supabase.com/dashboard/project/acgrypwfevndvqcwhcld/settings/api

### Available Scripts

```bash
npm run dev              # Start dev server (port 8080)
npm run build           # Production build
npm run build:dev       # Development mode build
npm run preview         # Preview production build
npm run lint            # Run ESLint
npm run generate-sitemap # Generate static sitemap (deprecated)
```

### File Path Alias

Use `@/` alias for all imports from `src/`:

```typescript
// ✅ Good
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

// ❌ Bad
import { Button } from "../../components/ui/button";
```

### Adding a New Page

1. **Create page component:**
   ```bash
   # Create in src/pages/
   src/pages/NewPage.tsx
   ```

2. **Add lazy import in App.tsx:**
   ```typescript
   const NewPage = lazy(() => import("./pages/NewPage"));
   ```

3. **Add route:**
   ```typescript
   // In public routes section
   <Route path="/new-page" element={<NewPage />} />
   ```

4. **Update sitemap (api/sitemap.js):**
   ```javascript
   const staticPages = [
     // ...existing pages
     { url: '/new-page', priority: 0.7 },
   ];
   ```

### Adding a Shadcn UI Component

```bash
# List available components
npx shadcn-ui@latest add

# Add specific component
npx shadcn-ui@latest add button
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add form
```

Components are added to `src/components/ui/`.

---

## 📝 Common Tasks

### Task 1: Create a New Article (Admin Panel)

**Manual Steps:**
1. Navigate to `/tajnedvere`
2. Login with admin credentials
3. Go to "Articles" → "New Article"
4. Fill in:
   - Title (auto-generates slug)
   - Slug (URL-safe, lowercase)
   - Perex (excerpt, 150-200 chars)
   - Category selection
   - Image URL
   - Content (use TipTap editor)
   - SEO fields (meta title, description, focus keyword)
5. Click "Save Draft" or "Publish"

**Programmatic Creation:**
```typescript
const { data, error } = await supabase
  .from('articles')
  .insert({
    title: "Article Title",
    slug: "article-title",
    perex: "Short excerpt...",
    content: "<p>HTML content...</p>",
    image_url: "https://...",
    published: true,
    category_id: "uuid-of-category",
    author_id: "uuid-of-author",
    meta_title: "SEO Title",
    meta_description: "SEO description",
    focus_keyword: "denmark travel",
  });
```

### Task 2: Update Database Types

After modifying Supabase schema:

```bash
# 1. Login to Supabase
npx supabase login

# 2. Link project
npx supabase link --project-ref acgrypwfevndvqcwhcld

# 3. Generate types
npx supabase gen types typescript --linked > src/integrations/supabase/types.ts
```

### Task 3: Upload Image to Supabase Storage

**Via ImageUploadDialog component:**
```typescript
// Component handles:
// 1. Drag & drop or file picker
// 2. Upload to 'article-images' bucket
// 3. Generate public URL
// 4. Insert optimized HTML with <picture> element

// Manual upload:
const { data, error } = await supabase.storage
  .from('article-images')
  .upload(`${Date.now()}-${file.name}`, file, {
    cacheControl: '3600',
    upsert: false,
  });

const publicUrl = supabase.storage
  .from('article-images')
  .getPublicUrl(data.path).data.publicUrl;
```

**Bucket Configuration:**
- Name: `article-images`
- Public: Yes
- File size limit: 10MB
- Allowed types: image/*

### Task 4: Add SEO Meta Tags to Page

**Use react-helmet-async:**
```typescript
import { Helmet } from "react-helmet-async";
import { optimizeTitle, optimizeDescription } from "@/lib/seo-helpers";

export default function MyPage() {
  const title = "Page Title";
  const description = "Page description...";
  const ogImage = "https://kastrup.cz/images/og-image.jpg";

  return (
    <>
      <Helmet>
        <title>{optimizeTitle(title)}</title>
        <meta name="description" content={optimizeDescription(description)} />
        <link rel="canonical" href="https://kastrup.cz/page-url" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content="https://kastrup.cz/page-url" />
        <meta property="og:locale" content="cs_CZ" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": title,
            "description": description,
          })}
        </script>
      </Helmet>

      {/* Page content */}
    </>
  );
}
```

### Task 5: Debug Authentication Issues

**Check user session:**
```typescript
const { data: { user } } = await supabase.auth.getUser();
console.log('Current user:', user);
```

**Check user role:**
```typescript
const { data: profile } = await supabase
  .from('profiles')
  .select('role')
  .eq('id', user.id)
  .single();

console.log('User role:', profile?.role);
```

**Reset password flow:**
1. User clicks "Forgot password" on `/tajnedvere`
2. Enter email → sends reset email
3. Click link in email → redirects to `/tajnedvere/reset-password`
4. Enter new password → updates auth.users

**Common Issues:**
- Email not configured in Supabase: Check Auth → Email Templates
- User not in profiles table: Insert manually or trigger on signup
- RLS blocking queries: Check Supabase logs

---

## 🎯 SEO Guidelines

### SEO Helper Functions

**Available in `src/lib/seo-helpers.ts`:**

```typescript
// Truncate text with ellipsis
truncateText(text: string, maxLength: number): string

// Optimize title for ~60 chars
optimizeTitle(title: string, siteName?: string): string

// Optimize description for 120-160 chars
optimizeDescription(description: string): string

// Generate URL-friendly slug (removes Czech diacritics)
generateSlug(title: string): string

// Validate meta tags
validateMetaTags(title: string, description: string): {
  isValid: boolean;
  warnings: string[];
}

// Calculate reading time (200 words per minute)
calculateReadingTime(htmlContent: string): number

// Extract first image URL from HTML
extractFirstImage(htmlContent: string): string | null
```

### SEO Checklist for Articles

**Required Fields:**
- ✅ Meta title (30-60 chars)
- ✅ Meta description (120-160 chars)
- ✅ Focus keyword (1-3 words)
- ✅ OG image (1200x630px recommended)
- ✅ Canonical URL
- ✅ Structured data (Article schema)
- ✅ Image alt text (all images)
- ✅ H1 tag (page title)
- ✅ H2/H3 subheadings
- ✅ Internal links

**Validation:**
```typescript
import { validateMetaTags } from "@/lib/seo-helpers";

const validation = validateMetaTags(metaTitle, metaDescription);
if (!validation.isValid) {
  console.warn('SEO warnings:', validation.warnings);
}
```

### Structured Data Templates

**Article Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Article Title",
  "description": "Article description",
  "image": "https://...",
  "author": {
    "@type": "Person",
    "name": "Author Name"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Kastrup.cz",
    "logo": {
      "@type": "ImageObject",
      "url": "https://kastrup.cz/logo.png"
    }
  },
  "datePublished": "2025-01-01T00:00:00Z",
  "dateModified": "2025-01-02T00:00:00Z"
}
```

**BreadcrumbList Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://kastrup.cz/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Articles",
      "item": "https://kastrup.cz/clanky"
    }
  ]
}
```

---

## 🧪 Testing & Debugging

### Manual Testing Checklist

**Before committing:**
- [ ] Test in Chrome, Firefox, Safari
- [ ] Test mobile responsiveness (320px, 375px, 768px, 1024px)
- [ ] Test dark mode toggle
- [ ] Test all forms (validation, success, error states)
- [ ] Check console for errors
- [ ] Test admin login/logout flow
- [ ] Verify images load correctly
- [ ] Test article CRUD operations

### Debug Tools

**React DevTools:**
- Install Chrome extension
- Inspect component tree
- Check props/state

**Supabase Logs:**
- https://supabase.com/dashboard/project/acgrypwfevndvqcwhcld/logs
- Check query logs, auth logs, storage logs

**Console Logging:**
```typescript
// Temporary debugging (remove before commit)
console.log('Debug:', variable);
console.table(array);
console.error('Error:', error);
```

### Common Errors & Solutions

**Error: "Failed to fetch"**
- Check Supabase URL/key in .env
- Verify network connection
- Check Supabase project status

**Error: "Row Level Security policy violation"**
- Check RLS policies in Supabase
- Verify user has correct role
- Check auth token is valid

**Error: "Cannot read property of undefined"**
- Add optional chaining: `data?.property`
- Check data exists before accessing

**Build Error: "Cannot find module '@/...'"**
- Check path alias in tsconfig.json
- Restart Vite dev server

---

## 🚀 Deployment

### Netlify Deployment

**Automatic Deployment:**
1. Push to `main` branch
2. Netlify detects changes
3. Runs `npm run build`
4. Deploys to production

**Build Settings:**
- Build command: `npm run build`
- Publish directory: `dist`
- Node version: 18

**Environment Variables (Netlify):**
```
VITE_SUPABASE_URL=https://acgrypwfevndvqcwhcld.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_key_here
VITE_SUPABASE_PROJECT_ID=acgrypwfevndvqcwhcld
```

Add at: Netlify Dashboard → Site Settings → Environment Variables

**Custom Domain:**
- Domain: kastrup.cz
- DNS: Configured via DNS provider
- SSL: Automatic (Let's Encrypt)

### Manual Build

```bash
# Production build
npm run build

# Test locally
npm run preview
```

**Build Output:**
- Location: `dist/`
- Size: ~340KB (initial bundle)
- Format: ES modules

### Performance Optimization

**Current Optimizations:**
- ✅ Code splitting (vendor chunks)
- ✅ Lazy loading routes
- ✅ Image lazy loading
- ✅ CSS code splitting
- ✅ Terser minification
- ✅ Drop console.log in production

**TODO Optimizations:**
- ⚠️ Convert images to WebP (543KB → 150KB savings)
- ⚠️ Implement image CDN
- ⚠️ Add service worker caching

---

## ⚠️ Important Gotchas

### 1. Admin Access Requirements

**To access admin panel:**
- User must exist in `profiles` table
- `role` field must be `'admin'`
- User must be authenticated

**Create admin user:**
```sql
-- In Supabase SQL Editor
INSERT INTO profiles (id, email, role)
VALUES ('user-uuid-from-auth-users', 'admin@example.com', 'admin');
```

### 2. Image Upload Limitations

**Supabase Storage:**
- Max file size: 50MB (default)
- Our limit: 10MB (enforced in UI)
- Bucket must be public for public URLs
- Use `article-images` bucket for articles

### 3. Slug Generation

**Use `generateSlug()` helper:**
```typescript
import { generateSlug } from "@/lib/seo-helpers";

// Converts: "Nejlepší místa v Kodani" → "nejlepsi-mista-v-kodani"
const slug = generateSlug(title);
```

**Important:** Removes Czech diacritics (ě → e, š → s, etc.)

### 4. TypeScript Strict Mode

**Project uses lenient TypeScript config:**
```json
{
  "strictNullChecks": false,
  "noImplicitAny": false,
  "noUnusedLocals": false
}
```

**Implications:**
- Optional chaining recommended: `data?.field`
- Type assertions may be needed: `data as ArticleType`
- ESLint rule: `@typescript-eslint/no-unused-vars: off`

### 5. Dark Mode Implementation

**Uses `next-themes` with class strategy:**
```typescript
// In App.tsx
<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
```

**CSS variables in `index.css`:**
```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
}
```

**Toggle theme:**
```typescript
import { useTheme } from "next-themes";

const { theme, setTheme } = useTheme();
setTheme(theme === "dark" ? "light" : "dark");
```

### 6. Vite Environment Variables

**Must prefix with `VITE_`:**
```env
VITE_SUPABASE_URL=...     # ✅ Accessible
SUPABASE_URL=...          # ❌ Not accessible
```

**Access in code:**
```typescript
const url = import.meta.env.VITE_SUPABASE_URL;
```

### 7. Routing Gotchas

**Admin routes have NO Header/Footer:**
```typescript
// Admin routes are rendered outside the main layout
<Route path="/tajnedvere" element={<AdminLogin />} />

// Public routes include Header/Footer
<Route path="/*" element={
  <div className="flex min-h-screen flex-col">
    <Header />
    <main>...</main>
    <Footer />
  </div>
} />
```

### 8. Supabase Client Import

**Always use single client instance:**
```typescript
// ✅ Good
import { supabase } from "@/integrations/supabase/client";

// ❌ Bad - creates new instance
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(...);
```

### 9. TipTap Editor HTML Output

**Editor generates raw HTML:**
- Store as-is in database
- Sanitize when rendering (DOMPurify)
- Use `dangerouslySetInnerHTML` carefully

```typescript
import DOMPurify from "dompurify";

<div dangerouslySetInnerHTML={{
  __html: DOMPurify.sanitize(article.content)
}} />
```

### 10. Lazy Loading Pages

**All pages must be wrapped in Suspense:**
```typescript
// ✅ Good - in App.tsx
<Suspense fallback={<PageLoader />}>
  <Routes>
    <Route path="/" element={<Home />} />
  </Routes>
</Suspense>

// ❌ Bad - no Suspense
<Routes>
  <Route path="/" element={<Home />} />
</Routes>
```

---

## 📚 Additional Documentation

**Project-specific guides:**
- `README.md` - General project overview (Czech)
- `NASAZENI_NA_VERCEL.md` - Deployment guide (Vercel)
- `KDE_PRIDAT_CLANKY.md` - How to add articles via Supabase
- `JAK_VLOZIT_CLANEK.md` - Quick article insertion guide
- `POUZIVANI_ADMIN_PANELU.md` - Admin panel usage
- `IMAGE_OPTIMIZATION.md` - Image optimization guide
- `SEO_AUDIT.md` - SEO audit results
- `docs/SEO-IMPLEMENTATION.md` - SEO implementation details

**External Documentation:**
- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Supabase](https://supabase.com/docs)
- [TipTap](https://tiptap.dev/)
- [React Router](https://reactrouter.com/)

---

## 🤝 Contributing Guidelines for AI Assistants

### Before Making Changes

1. **Read relevant files first** - Never propose changes to code you haven't read
2. **Understand existing patterns** - Follow the conventions used in similar files
3. **Check database schema** - Verify types match Supabase schema
4. **Test locally** - Run `npm run dev` and test changes

### When Writing Code

1. **Follow TypeScript conventions** - Use interfaces for props
2. **Use path aliases** - Always use `@/` for imports
3. **Keep components focused** - Single responsibility principle
4. **Add SEO meta tags** - Use Helmet for all pages
5. **Handle errors gracefully** - Show toast notifications for user feedback
6. **Optimize images** - Use lazy loading and WebP when possible
7. **Write semantic HTML** - Use proper heading hierarchy (H1 → H2 → H3)
8. **Test responsiveness** - Mobile-first approach

### When Modifying Database

1. **Update TypeScript types** - Regenerate from Supabase
2. **Check RLS policies** - Ensure queries will work
3. **Test with real data** - Verify queries return expected results
4. **Update documentation** - Add new fields to CLAUDE.md

### Security Considerations

1. **Never commit credentials** - Use .env for secrets
2. **Sanitize user input** - Use DOMPurify for HTML content
3. **Validate forms** - Use Zod schemas for validation
4. **Check authentication** - Use ProtectedRoute for admin pages
5. **Follow RLS** - Leverage Supabase Row Level Security

### Performance Best Practices

1. **Lazy load routes** - Use React.lazy() for all pages
2. **Optimize images** - Compress before upload, use WebP
3. **Split code** - Keep bundles under 500KB
4. **Cache API calls** - Use React Query when appropriate
5. **Minimize re-renders** - Use useMemo/useCallback when needed

---

## 📞 Need Help?

**Common Issues:**
- Check existing documentation in project root
- Review similar implementations in codebase
- Test in isolated environment first
- Ask user for clarification if requirements unclear

**When Stuck:**
1. Search existing code for similar patterns
2. Check Supabase dashboard for data issues
3. Review browser console for errors
4. Test with minimal reproduction

---

**Last Updated:** 2025-12-03
**Maintained by:** AI assistants working on this project
**Version:** 1.0.0

---

*This document should be updated whenever significant architectural changes are made to the codebase.*
