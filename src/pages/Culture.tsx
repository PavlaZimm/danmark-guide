import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Coffee, Landmark, Languages, Utensils } from "lucide-react";
import { Helmet } from "react-helmet-async";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { DEFAULT_SOCIAL_IMAGE } from "@/lib/seo-helpers";
import hyggeImage from "@/assets/hygge.jpg";
import hyggeImageWebP from "@/assets/hygge.webp";
import hyggeImage640WebP from "@/assets/hygge-640.webp";
import hyggeImage768WebP from "@/assets/hygge-768.webp";
import designImage from "@/assets/design.jpg";
import designImageWebP from "@/assets/design.webp";

const PAGE_URL = "https://kastrup.cz/kultura";
const PAGE_DESCRIPTION =
  "Poznejte hygge a dánskou kulturu bez klišé. Ověřené články o každodenním životě, jídle, tradicích, jazyce, designu a cestování po Dánsku.";

const Culture = () => (
  <>
    <Helmet>
      <title>Hygge a dánská kultura bez klišé | Kastrup.cz</title>
      <meta name="description" content={PAGE_DESCRIPTION} />
      <link rel="canonical" href={PAGE_URL} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={PAGE_URL} />
      <meta property="og:title" content="Hygge a dánská kultura bez klišé" />
      <meta property="og:description" content={PAGE_DESCRIPTION} />
      <meta property="og:image" content={DEFAULT_SOCIAL_IMAGE} />
      <meta property="og:locale" content="cs_CZ" />
      <meta property="og:site_name" content="Kastrup.cz" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Hygge a dánská kultura bez klišé" />
      <meta name="twitter:description" content={PAGE_DESCRIPTION} />
      <meta name="twitter:image" content={DEFAULT_SOCIAL_IMAGE} />

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Hygge a dánská kultura",
          description: PAGE_DESCRIPTION,
          url: PAGE_URL,
          inLanguage: "cs-CZ",
          isPartOf: {
            "@type": "WebSite",
            name: "Kastrup.cz",
            url: "https://kastrup.cz",
          },
          mainEntity: {
            "@type": "ItemList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Hygge bez klišé",
                url: "https://kastrup.cz/hygge",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Kastrup: moderní architektura, moře a volnost",
                url: "https://kastrup.cz/clanek/kastrup-kodansky-poklad-moderni-architektury-more-a-volnosti",
              },
            ],
          },
        })}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Domů", item: "https://kastrup.cz/" },
            { "@type": "ListItem", position: 2, name: "Hygge a dánská kultura", item: PAGE_URL },
          ],
        })}
      </script>
    </Helmet>

    <div className="min-h-screen py-10 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        <Breadcrumbs items={[{ label: "Hygge a dánská kultura" }]} />

        <header className="mx-auto mb-12 max-w-4xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary">Život v Dánsku</p>
          <h1 className="mb-6 text-4xl font-bold md:text-6xl">Hygge a dánská kultura bez klišé</h1>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Dánsko nejsou jen barevné domy, designové židle a žebříčky štěstí. Poznejte jazyk,
            jídlo, tradice a každodenní zvyky, které pomáhají pochopit, jak se v zemi skutečně žije.
          </p>
        </header>

        <section className="mx-auto mb-16 max-w-6xl overflow-hidden rounded-3xl border bg-card shadow-large" aria-labelledby="hygge-feature-title">
          <div className="grid lg:grid-cols-2">
            <picture className="min-h-[320px] overflow-hidden">
              <source
                srcSet={`${hyggeImage640WebP} 640w, ${hyggeImage768WebP} 768w, ${hyggeImageWebP} 1024w`}
                sizes="(min-width: 1024px) 50vw, 100vw"
                type="image/webp"
              />
              <img
                src={hyggeImage}
                alt="Teplý nápoj a tlumené světlo jako jedna z podob dánského hygge"
                width="1024"
                height="576"
                className="h-full min-h-[320px] w-full object-cover"
              />
            </picture>
            <div className="flex flex-col justify-center p-7 md:p-10 lg:p-12">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">Hlavní průvodce</p>
              <h2 id="hygge-feature-title" className="mb-5 text-3xl font-bold md:text-4xl">Co je hygge doopravdy?</h2>
              <p className="mb-4 text-lg text-muted-foreground">
                Hygge je příjemná, bezpečná a uvolněná atmosféra, ve které člověk zpomalí a
                věnuje pozornost obyčejnému okamžiku. Může být společné i tiché a soukromé.
              </p>
              <p className="mb-7 text-muted-foreground">
                Vysvětlujeme výslovnost, původ slova, letní i zimní podobu, souvislost s dánskou
                důvěrou a také to, proč může být hygge pro nově příchozí někdy překvapivě uzavřené.
              </p>
              <Link to="/hygge">
                <Button size="lg">
                  Přečíst průvodce hygge
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl py-8" aria-labelledby="kultura-pomaha-title">
          <div className="mb-9 text-center">
            <h2 id="kultura-pomaha-title" className="mb-4 text-3xl font-bold md:text-5xl">Co pomáhá Dánsko pochopit</h2>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
              Jednotlivé zvyky dávají větší smysl, když je nevnímáme odděleně od prostředí,
              ve kterém vznikly.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              [Coffee, "Každodennost místo dekorace", "Hygge není výrobek. Je to způsob, jak dát běžnému setkání dost času, klidu a pocitu bezpečí."],
              [Landmark, "Důvěra a rovnost", "Dánská neformálnost souvisí s vysokou společenskou důvěrou, menším odstupem a očekáváním spolehlivosti."],
              [BookOpen, "Tradice, které se proměňují", "Od vánočního julehygge po moderní gastronomii: kultura není muzeum, ale živá součást současnosti."],
            ].map(([Icon, title, text]) => (
              <article key={title as string} className="rounded-2xl border bg-card p-6 shadow-sm">
                <Icon className="mb-5 h-8 w-8 text-primary" aria-hidden="true" />
                <h3 className="mb-3 text-xl font-semibold">{title as string}</h3>
                <p className="text-muted-foreground">{text as string}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl py-16" aria-labelledby="temata-title">
          <div className="mb-9 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">Obsahová cesta</p>
              <h2 id="temata-title" className="text-3xl font-bold md:text-5xl">Témata, která připravujeme</h2>
            </div>
            <p className="max-w-xl text-muted-foreground">
              Každé téma ověřujeme v dánských zdrojích a píšeme pro české čtenáře bez automatických překladů a turistických frází.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              [Utensils, "Smørrebrød a dánské jídlo", "Co slavné obložené chleby znamenají, jak se jedí a kde mají místo v běžném dánském dni."],
              [Languages, "Dánština pro cestovatele", "Výslovnost, užitečné fráze a slova, která prozradí o dánském způsobu života víc než slovník."],
              [Landmark, "Vánoce, design a Janteloven", "Živé tradice, nepsaná pravidla a předměty, které vznikly z konkrétního společenského kontextu."],
            ].map(([Icon, title, text]) => (
              <article key={title as string} className="rounded-2xl bg-muted/50 p-6">
                <Icon className="mb-5 h-8 w-8 text-primary" aria-hidden="true" />
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">Připravujeme</p>
                <h3 className="mb-3 text-xl font-semibold">{title as string}</h3>
                <p className="text-muted-foreground">{text as string}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl overflow-hidden rounded-3xl border bg-card" aria-labelledby="architektura-title">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <picture className="min-h-[300px] overflow-hidden lg:order-2">
              <source srcSet={designImageWebP} type="image/webp" />
              <img
                src={designImage}
                alt="Ukázka čistých linií moderního dánského designu a architektury"
                width="1024"
                height="576"
                loading="lazy"
                className="h-full min-h-[300px] w-full object-cover"
              />
            </picture>
            <div className="flex flex-col justify-center p-7 md:p-10 lg:p-12">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">Další čtení</p>
              <h2 id="architektura-title" className="mb-4 text-3xl font-bold">Kastrup: architektura, moře a volnost</h2>
              <p className="mb-7 text-muted-foreground">
                Poznejte čtvrť u kodaňského letiště jako skutečné místo k životu — s moderní architekturou,
                pobřežím a klidem, který cestující při rychlém přesunu často přehlédnou.
              </p>
              <Link to="/clanek/kastrup-kodansky-poklad-moderni-architektury-more-a-volnosti">
                <Button variant="outline">
                  Přečíst článek
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-16 max-w-4xl rounded-3xl bg-gradient-card p-7 text-center md:p-10">
          <h2 className="mb-4 text-3xl font-bold">Dánsko chcete také zažít?</h2>
          <p className="mx-auto mb-7 max-w-2xl text-muted-foreground">
            Spojte kulturní kontext s praktickým plánováním a vyberte si místa, dopravu i ubytování podle vlastního tempa.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/kodan"><Button>Co vidět v Kodani</Button></Link>
            <Link to="/ubytovani"><Button variant="outline">Ubytování v Dánsku</Button></Link>
          </div>
        </section>
      </div>
    </div>
  </>
);

export default Culture;
