import { useEffect, useState } from "react";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import { ArrowRight, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ArticleCard from "@/components/ArticleCard";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";
import Breadcrumbs from "@/components/Breadcrumbs";
import { DEFAULT_SOCIAL_IMAGE } from "@/lib/seo-helpers";
import { LANG, SITE, absoluteUrl, articlePath, categoryName, pathTo } from "@/lib/site";

const TEXT = {
  cs: {
    title: "Články o Dánsku | Cestování, Kultura, Tipy | Kastrup.cz",
    description: "Čtěte zajímavé články o Dánsku, dánské kultuře, cestování, hygge a životě v severní Evropě. Praktické tipy a inspirace pro vaši cestu do Dánska.",
    ogTitle: "Články o Dánsku - Kastrup.cz",
    heading: "Články o Dánsku",
    lead: "Prozkoumejte naše články o Dánsku",
    loadError: "Nepodařilo se načíst články. Zkontrolujte prosím připojení k internetu.",
    loadErrorShort: "Nepodařilo se načíst články",
    search: "Hledat články...",
    filterLabel: "Filtrovat články podle kategorie",
    choose: "Vyberte kategorii",
    allCategories: "Všechny kategorie",
    activeFilters: "Aktivní filtry:",
    searching: "Hledání",
    cancelSearch: "Zrušit vyhledávání",
    category: "Kategorie",
    cancelCategory: "Zrušit filtr kategorie",
    clearAll: "Vymazat vše",
    retry: "Zkusit znovu",
    noCategory: "Bez kategorie",
    emptyTitle: "Zatím zde nejsou žádné články",
    emptyText: "Pracujeme na skvělém obsahu o Dánsku. Brzy zde najdete zajímavé články o kultuře, cestování a životě v Dánsku.",
    moreAbout: "Více o Dánsku",
    browseAccommodation: "Prohlédnout ubytování",
    noMatch: "Nenalezeny žádné články odpovídající vašemu hledání.",
    clearFilters: "Vymazat filtry",
  },
  pl: {
    title: "Artykuły o Danii: podróże, kultura, praktyczne porady | Kastrup.pl",
    description: "Artykuły o Danii: Kopenhaga, duńskie wyspy, hygge, mosty i promy. Sprawdzone ceny i praktyczne wskazówki na podróż do Danii.",
    ogTitle: "Artykuły o Danii - Kastrup.pl",
    heading: "Artykuły o Danii",
    lead: "Przewodniki i praktyczne porady na podróż do Danii",
    loadError: "Nie udało się wczytać artykułów. Sprawdź połączenie z internetem.",
    loadErrorShort: "Nie udało się wczytać artykułów",
    search: "Szukaj artykułów...",
    filterLabel: "Filtruj artykuły według kategorii",
    choose: "Wybierz kategorię",
    allCategories: "Wszystkie kategorie",
    activeFilters: "Aktywne filtry:",
    searching: "Szukasz",
    cancelSearch: "Wyczyść wyszukiwanie",
    category: "Kategoria",
    cancelCategory: "Wyczyść filtr kategorii",
    clearAll: "Wyczyść wszystko",
    retry: "Spróbuj ponownie",
    noCategory: "Bez kategorii",
    emptyTitle: "Nie ma tu jeszcze artykułów",
    emptyText: "Przygotowujemy artykuły o Danii. Wkrótce znajdziesz tu przewodniki o kulturze, podróżach i codziennym życiu w Danii.",
    moreAbout: "Więcej o Danii",
    browseAccommodation: "Zobacz noclegi",
    noMatch: "Nie znaleziono artykułów pasujących do wyszukiwania.",
    clearFilters: "Wyczyść filtry",
  },
}[LANG];
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Article {
  id: string;
  title: string;
  slug: string;
  perex: string;
  image_url: string | null;
  created_at: string;
  categories: {
    name: string;
    slug: string;
  };
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

const Articles = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get("category") || "all"
  );
  const routeCategory =
    location.pathname === "/cestovani"
        ? "cestovani"
        : null;
  const activeCategory = routeCategory || selectedCategory;

  // Dynamic meta tags based on current path
  const getPageMeta = () => {
    const path = location.pathname;

    if (path === "/cestovani") {
      return {
        title: "Cestování po Dánsku | Tipy a průvodce | Kastrup.cz",
        description: "Praktické tipy pro cestování po Dánsku. Kam jet, co vidět, kde spát a jíst. Itineráře, doprava a rady pro vaši cestu do Dánska.",
        canonical: "https://kastrup.cz/cestovani",
        ogTitle: "Cestování po Dánsku - Kastrup.cz",
        heading: "Cestování po Dánsku"
      };
    } else {
      return {
        title: TEXT.title,
        description: TEXT.description,
        canonical: absoluteUrl(pathTo("articles")),
        ogTitle: TEXT.ogTitle,
        heading: TEXT.heading
      };
    }
  };

  const pageMeta = getPageMeta();

  useEffect(() => {
    fetchCategories();
    fetchArticles();
  }, []);

  // Update URL parameters when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    if (!routeCategory && selectedCategory && selectedCategory !== "all") {
      params.set("category", selectedCategory);
    }
    setSearchParams(params, { replace: true });
  }, [routeCategory, searchTerm, selectedCategory, setSearchParams]);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name");

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchArticles = async () => {
    try {
      setError(null);
      const query = supabase
        .from("articles")
        .select(`
          id,
          title,
          slug,
          perex,
          image_url,
          created_at,
          categories (
            name,
            slug
          )
        `)
        .eq("lang", LANG)
        .eq("published", true)
        .order("created_at", { ascending: false });

      const { data, error } = await query;

      if (error) throw error;
      setArticles(data || []);

      // If no articles, set a friendly message but don't treat as error
      if (!data || data.length === 0) {
        console.info("No articles found in database");
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
      setError(TEXT.loadError);
      toast.error(TEXT.loadErrorShort);
    } finally {
      setLoading(false);
    }
  };

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.perex.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "all" ||
      article.categories?.slug === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Helmet>
        <title>{pageMeta.title}</title>
        <meta name="description" content={pageMeta.description} />
        <link rel="canonical" href={pageMeta.canonical} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageMeta.canonical} />
        <meta property="og:title" content={pageMeta.ogTitle} />
        <meta property="og:description" content={pageMeta.description} />
        <meta property="og:image" content={DEFAULT_SOCIAL_IMAGE} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageMeta.ogTitle} />
        <meta name="twitter:description" content={pageMeta.description} />

        {/* JSON-LD - CollectionPage */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": pageMeta.heading,
            "description": pageMeta.description,
            "url": pageMeta.canonical,
            "isPartOf": {
              "@type": "WebSite",
              "name": SITE.name,
              "url": SITE.origin
            }
          })}
        </script>

        {/* JSON-LD - ItemList for article listings */}
        {filteredArticles.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "itemListElement": filteredArticles.slice(0, 20).map((article, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "Article",
                  "@id": absoluteUrl(articlePath(article.slug)),
                  "headline": article.title,
                  "description": article.perex,
                  "image": article.image_url || DEFAULT_SOCIAL_IMAGE,
                  "url": absoluteUrl(articlePath(article.slug))
                }
              }))
            })}
          </script>
        )}
      </Helmet>

      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 md:px-6">
        <Breadcrumbs items={[{ label: pageMeta.heading }]} />

        {/* Header */}
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">{pageMeta.heading}</h1>
          <p className="text-lg text-muted-foreground">
            {location.pathname === "/cestovani"
              ? "Praktické tipy a inspirace pro vaši cestu do Dánska"
              : TEXT.lead}
          </p>
        </div>

        {location.pathname === "/cestovani" && (
          <section className="mb-10 overflow-hidden rounded-3xl border bg-card shadow-sm">
            <div className="grid md:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)]">
              <picture className="block min-h-64">
                <source srcSet="/images/20240813_130726.webp" type="image/webp" />
                <img
                  src="/images/20240813_130726.jpg"
                  alt="Barevné domy a lodě v kodaňském přístavu Nyhavn"
                  width="1400"
                  height="1050"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </picture>
              <div className="flex flex-col justify-center p-7 md:p-9">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                  Hlavní průvodce
                </p>
                <h2 className="mb-3 text-2xl font-bold md:text-3xl">Co vidět v Kodani</h2>
                <p className="mb-6 leading-relaxed text-muted-foreground">
                  Vlastní fotografie, mapa památek a trasy poskládané tak, aby na sebe místa navazovala.
                </p>
                <Link to="/kodan" className="inline-flex items-center font-semibold text-primary hover:underline">
                  Naplánovat první návštěvu <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Filters */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder={TEXT.search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          {!routeCategory && (
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[200px]" aria-label={TEXT.filterLabel}>
                <SelectValue placeholder={TEXT.choose} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{TEXT.allCategories}</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.slug}>
                    {categoryName(category)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Active Filters */}
        {(searchTerm || (!routeCategory && selectedCategory !== "all")) && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">{TEXT.activeFilters}</span>
            {searchTerm && (
              <Badge variant="secondary" className="gap-1">
                {TEXT.searching}: "{searchTerm}"
                <button
                  onClick={() => setSearchTerm("")}
                  className="ml-1 rounded-full hover:bg-muted"
                  aria-label={TEXT.cancelSearch}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {selectedCategory !== "all" && (
              <Badge variant="secondary" className="gap-1">
                {TEXT.category}: {categoryName(categories.find((c) => c.slug === selectedCategory))}
                <button
                  onClick={() => setSelectedCategory("all")}
                  className="ml-1 rounded-full hover:bg-muted"
                  aria-label={TEXT.cancelCategory}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              className="h-7 text-xs"
            >
              {TEXT.clearAll}
            </Button>
          </div>
        )}

        {/* Articles Grid */}
        {loading ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="h-96 animate-pulse rounded-lg bg-muted"></div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-lg border-2 border-destructive/20 bg-destructive/5 p-12 text-center">
            <p className="mb-4 text-lg font-semibold text-red-700 dark:text-red-300">
              {error}
            </p>
            <Button onClick={fetchArticles} variant="outline">
              {TEXT.retry}
            </Button>
          </div>
        ) : filteredArticles.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article) => (
              <ArticleCard
                key={article.id}
                id={article.id}
                title={article.title}
                slug={article.slug}
                perex={article.perex}
                imageUrl={article.image_url || undefined}
                category={categoryName(article.categories) || TEXT.noCategory}
                createdAt={article.created_at}
              />
            ))}
          </div>
        ) : articles.length === 0 ? (
          <div className="rounded-lg bg-gradient-card p-12 text-center">
            <h2 className="mb-4 text-2xl font-bold">{TEXT.emptyTitle}</h2>
            <p className="mb-6 text-lg text-muted-foreground">
              {TEXT.emptyText}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to={pathTo("about")}>
                <Button variant="default">
                  {TEXT.moreAbout}
                </Button>
              </Link>
              <Link to={pathTo("accommodation")}>
                <Button variant="outline">
                  {TEXT.browseAccommodation}
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="rounded-lg bg-muted p-12 text-center">
            <p className="mb-4 text-lg text-muted-foreground">
              {TEXT.noMatch}
            </p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              variant="outline"
            >
              {TEXT.clearFilters}
            </Button>
          </div>
        )}
        </div>
      </div>
    </>
  );
};

export default Articles;
