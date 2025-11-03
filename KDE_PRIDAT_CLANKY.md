# 🎯 Kde a jak přidávat články - Kompletní průvodce

## 🤔 Aktuální stav

**ADMINISTRACE ZATÍM NENÍ** - články se přidávají přes **Supabase Dashboard**.

Ale! Mám pro tebe **2 možnosti**:

---

## 📝 MOŽNOST 1: Přidávání přes Supabase Dashboard (HNED)

### Kde to je:
1. Jdi na https://supabase.com
2. Přihlaš se → Vyber projekt
3. Klikni na **Table Editor** v levém menu
4. Vyber tabulku **articles**
5. Klikni **Insert row** (zelené tlačítko)

### Co vyplnit:

| Pole | Co to je | Příklad |
|------|----------|---------|
| **title** ⭐ | Titulek článku | "10 nejlepších restaurací v Kodani" |
| **slug** ⭐ | URL adresa | "10-nejlepsich-restauraci-v-kodani" |
| **perex** ⭐ | Krátký úvod (150-200 znaků) | "Objevte nejlepší místa, kde si..." |
| **content** ⭐ | **Obsah v HTML!** | `<h2>Úvod</h2><p>Text...</p>` |
| **category_id** ⭐ | UUID kategorie | Vyber z: cestovani, kultura, historie... |
| **author_id** ⭐ | UUID tvého admin profilu | Najdeš v tabulce `profiles` |
| **published** ⭐ | Publikovat? | `true` (zobrazí se) nebo `false` (koncept) |
| **image_url** | Hlavní obrázek | `https://images.unsplash.com/photo-...` |
| **meta_title** | SEO titulek | "10 nejlepších restaurací v Kodani \| Kastrup.cz" |
| **meta_description** | SEO popis | "Kompletní průvodce po nejlepších..." |
| **focus_keyword** | Klíčové slovo | "restaurace Kodaň" |
| **og_image** | Obrázek pro Facebook | URL obrázku (1200x630px) |

⭐ = **Povinné pole**

### ✅ ANO, jsou tam meta tagy!
- `meta_title` - Title tag pro Google
- `meta_description` - Popis pro výsledky vyhledávání
- `focus_keyword` - Hlavní klíčové slovo
- `og_image` - Obrázek pro social media

### ✅ ANO, content je v HTML!
Můžeš psát normální HTML:
```html
<h2>Nadpis sekce</h2>
<p>Odstavec textu s <strong>tučným</strong> a <em>kurzívou</em>.</p>

<ul>
  <li>První položka</li>
  <li>Druhá položka</li>
</ul>

<p>Další odstavec...</p>
```

### 📋 Jak najít UUID:

**category_id:**
1. Table Editor → **categories**
2. Zkopíruj ID kategorie (např. "cestovani")

**author_id:**
1. Table Editor → **profiles**
2. Najdi svůj email
3. Zkopíruj `id` (dlouhý řetězec)

---

## 🚀 MOŽNOST 2: Admin panel (můžu vytvořit)

Chceš vlastní administraci? Můžu ti vytvořit **admin panel** s:

✨ **Funkce:**
- 📝 Vizuální editor článků (WYSIWYG nebo Markdown)
- 🖼️ Upload obrázků
- 🏷️ Výběr kategorie z dropdownu
- 📊 SEO pole (meta title, description, keywords)
- 👁️ Náhled před publikováním
- ✅ Publikovat / Koncept
- 📅 Plánované publikování
- 📈 Seznam všech článků
- ✏️ Editace a mazání

**Co potřebuji vědět:**
1. Chceš WYSIWYG editor (jako Word)? Nebo Markdown?
2. Chceš upload obrázků do Supabase Storage?
3. Má být admin na `/admin` nebo samostatná aplikace?

---

## 🎨 Jak formátovat HTML obsah

### Základní struktura:
```html
<h2>Hlavní nadpis sekce</h2>
<p>Odstavec textu.</p>

<h3>Podnadpis</h3>
<p>Další text s <strong>tučným</strong> zvýrazněním.</p>

<ul>
  <li>Odrážka 1</li>
  <li>Odrážka 2</li>
</ul>

<p>Odkaz na <a href="https://example.com">jinou stránku</a>.</p>
```

### Tipy:
- ✅ **Používej**: `<h2>`, `<h3>`, `<p>`, `<ul>`, `<li>`, `<strong>`, `<em>`, `<a>`
- ❌ **Nepoužívej**: `<script>`, inline CSS, `<style>`
- 💡 Pro obrázky v textu: `<img src="URL" alt="Popis" />`

---

## 📊 Dostupné kategorie

| Název | Slug | Popis |
|-------|------|-------|
| Cestování | `cestovani` | Turistické destinace, tipy |
| Kultura | `kultura` | Kultura, tradice, hygge |
| Historie | `historie` | Dánská historie, vikingové |
| Gastronomie | `gastronomie` | Jídlo, restaurace |
| Lifestyle | `lifestyle` | Život v Dánsku |
| Ubytování | `ubytovani` | Hotely, apartmány |

---

## 🔍 Ověření článku

Po přidání článku:

1. **V Supabase:**
   - Table Editor → articles
   - Měl bys vidět nový řádek

2. **Na webu:**
   - Jdi na `/clanky`
   - Měl bys vidět článek (pokud `published = true`)
   - Klikni na něj → zobrazí se detail

3. **URL článku:**
   - `https://kastrup.cz/clanek/TVUJ-SLUG`
   - Např: `/clanek/10-nejlepsich-restauraci-v-kodani`

---

## ⚡ Rychlý postup:

1. ✅ Napiš článek v HTML (můžeš použít online editor)
2. ✅ Najdi UUID kategorie a author_id
3. ✅ Table Editor → articles → Insert row
4. ✅ Vyplň všechna pole
5. ✅ `published = true`
6. ✅ Save
7. ✅ Ověř na webu `/clanky`

---

## ❓ Nejčastější otázky

**Q: Musím psát HTML ručně?**
A: Ne! Můžeš použít online WYSIWYG editor (např. TinyMCE demo) a zkopírovat HTML.

**Q: Kde vzít obrázky?**
A: Unsplash.com, Pexels.com (zdarma) - zkopíruj URL

**Q: Jak změnit článek?**
A: Table Editor → articles → Najdi článek → Klikni na řádek → Edit

**Q: Jak smazat článek?**
A: Table Editor → articles → Zaškrtni článek → Delete

**Q: Můžu mít koncept?**
A: Ano! Nastav `published = false` - neuvidí ho návštevníci

---

## 🎁 BONUS: Chceš admin panel?

Řekni a udělám ti:
- ✨ Profesionální admin rozhraní
- 📝 Vizuální editor
- 🖼️ Upload obrázků
- 📊 Statistiky článků
- 🚀 Rychlejší přidávání obsahu

**Co říkáš?** 😊
