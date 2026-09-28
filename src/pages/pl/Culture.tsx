import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Coffee, Landmark, Languages, Utensils } from "lucide-react";
import { Helmet } from "react-helmet-async";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import hyggeImage from "@/assets/hygge.jpg";
import hyggeImageWebP from "@/assets/hygge.webp";
import hyggeImage640WebP from "@/assets/hygge-640.webp";
import hyggeImage768WebP from "@/assets/hygge-768.webp";
import designImage from "@/assets/design.jpg";
import designImageWebP from "@/assets/design.webp";

const PAGE_URL = "https://kastrup.pl/kultura-dunska";
const PAGE_TITLE = "Kultura duńska i hygge bez stereotypów | Kastrup.pl";
const HEADLINE = "Kultura duńska i hygge bez stereotypów";
const PAGE_DESCRIPTION =
  "Hygge i duńska kultura bez stereotypów. Sprawdzone artykuły o codziennym życiu, jedzeniu, tradycjach, języku, designie i podróżach po Danii.";
const IMAGE = "https://kastrup.pl/images/og-kastrup.jpg";

const Culture = () => (
  <>
    <Helmet>
      <title>{PAGE_TITLE}</title>
      <meta name="description" content={PAGE_DESCRIPTION} />
      <link rel="canonical" href={PAGE_URL} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={PAGE_URL} />
      <meta property="og:title" content={HEADLINE} />
      <meta property="og:description" content={PAGE_DESCRIPTION} />
      <meta property="og:image" content={IMAGE} />
      <meta property="og:locale" content="pl_PL" />
      <meta property="og:site_name" content="Kastrup.pl" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={HEADLINE} />
      <meta name="twitter:description" content={PAGE_DESCRIPTION} />
      <meta name="twitter:image" content={IMAGE} />

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Kultura duńska i hygge",
          description: PAGE_DESCRIPTION,
          url: PAGE_URL,
          inLanguage: "pl-PL",
          isPartOf: {
            "@type": "WebSite",
            name: "Kastrup.pl",
            url: "https://kastrup.pl",
          },
          mainEntity: {
            "@type": "ItemList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Hygge bez stereotypów",
                url: "https://kastrup.pl/hygge",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Język duński: wymowa i przydatne zwroty",
                url: "https://kastrup.pl/jezyk-dunski",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Kastrup: nowoczesna architektura, morze i swoboda",
                url: "https://kastrup.pl/artykul/kastrup",
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
            { "@type": "ListItem", position: 1, name: "Start", item: "https://kastrup.pl/" },
            { "@type": "ListItem", position: 2, name: "Kultura duńska i hygge", item: PAGE_URL },
          ],
        })}
      </script>
    </Helmet>

    <div className="min-h-screen py-10 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        <Breadcrumbs items={[{ label: "Kultura duńska i hygge" }]} />

        <header className="mx-auto mb-12 max-w-4xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary">Życie w Danii</p>
          <h1 className="mb-6 text-4xl font-bold md:text-6xl">{HEADLINE}</h1>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Dania to nie tylko kolorowe domy, designerskie krzesła i rankingi szczęścia. Poznaj język,
            jedzenie, tradycje i codzienne zwyczaje, które pomagają zrozumieć, jak naprawdę żyje się w tym kraju.
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
                alt="Ciepły napój i przygaszone światło jako jedna z odsłon duńskiego hygge"
                width="1024"
                height="576"
                className="h-full min-h-[320px] w-full object-cover"
              />
            </picture>
            <div className="flex flex-col justify-center p-7 md:p-10 lg:p-12">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">Główny przewodnik</p>
              <h2 id="hygge-feature-title" className="mb-5 text-3xl font-bold md:text-4xl">Czym naprawdę jest hygge?</h2>
              <p className="mb-4 text-lg text-muted-foreground">
                Hygge to przyjemna, bezpieczna i swobodna atmosfera, w której człowiek zwalnia i
                zwraca uwagę na zwykłą chwilę. Może być wspólne, ale też ciche i prywatne.
              </p>
              <p className="mb-7 text-muted-foreground">
                Wyjaśniamy wymowę, pochodzenie słowa, letnią i zimową odsłonę hygge, jego związek z duńskim
                zaufaniem, a także to, dlaczego dla nowo przybyłych hygge bywa zaskakująco zamknięte.
              </p>
              <Link to="/hygge">
                <Button size="lg">
                  Przeczytaj przewodnik po hygge
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl py-8" aria-labelledby="kultura-pomaha-title">
          <div className="mb-9 text-center">
            <h2 id="kultura-pomaha-title" className="mb-4 text-3xl font-bold md:text-5xl">Co pomaga zrozumieć Danię</h2>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
              Poszczególne zwyczaje mają więcej sensu, kiedy nie oddzielamy ich od środowiska,
              w którym powstały.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              [Coffee, "Codzienność zamiast dekoracji", "Hygge to nie produkt. To sposób, żeby dać zwykłemu spotkaniu dość czasu, spokoju i poczucia bezpieczeństwa."],
              [Landmark, "Zaufanie i równość", "Duńska nieformalność wiąże się z wysokim zaufaniem społecznym, mniejszym dystansem i oczekiwaniem, że ludzie są rzetelni."],
              [BookOpen, "Tradycje, które się zmieniają", "Od świątecznego julehygge po nowoczesną gastronomię: kultura to nie muzeum, tylko żywa część teraźniejszości."],
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
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">Co czytać dalej</p>
              <h2 id="temata-title" className="text-3xl font-bold md:text-5xl">Nowe przewodniki i kolejne tematy</h2>
            </div>
            <p className="max-w-xl text-muted-foreground">
              Każdy temat sprawdzamy w duńskich źródłach i piszemy bez turystycznych frazesów.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Languages,
                title: "Duński dla podróżnych",
                text: "Jak się mówi w Danii, dlaczego wymowa jest trudna i które zwroty naprawdę Ci się przydadzą.",
                href: "/jezyk-dunski",
                status: "Nowość",
              },
              {
                icon: Utensils,
                title: "Smørrebrød i duńskie jedzenie",
                text: "Co oznaczają słynne otwarte kanapki, jak je jeść i jakie mają miejsce w zwykłym duńskim dniu.",
                status: "W przygotowaniu",
              },
              {
                icon: Landmark,
                title: "Duński design w Kopenhadze",
                text: "Słynne krzesła i lampy, muzeum designu i współczesne sklepy. Sprawdzone ceny i adresy na wizytę.",
                href: "/artykul/dunski-design-kopenhaga",
                status: "Nowość",
              },
            ].map(({ icon: Icon, title, text, href, status }) => (
              <article key={title} className="rounded-2xl bg-muted/50 p-6">
                <Icon className="mb-5 h-8 w-8 text-primary" aria-hidden="true" />
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">{status}</p>
                <h3 className="mb-3 text-xl font-semibold">{title}</h3>
                <p className="text-muted-foreground">{text}</p>
                {href && (
                  <Link to={href} className="mt-5 inline-flex items-center font-semibold text-primary hover:underline">
                    Przeczytaj przewodnik <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Link>
                )}
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
                alt="Czyste linie nowoczesnego duńskiego designu i architektury"
                width="1024"
                height="576"
                loading="lazy"
                className="h-full min-h-[300px] w-full object-cover"
              />
            </picture>
            <div className="flex flex-col justify-center p-7 md:p-10 lg:p-12">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">Do poczytania</p>
              <h2 id="architektura-title" className="mb-4 text-3xl font-bold">Kastrup: architektura, morze i swoboda</h2>
              <p className="mb-7 text-muted-foreground">
                Poznaj dzielnicę przy kopenhaskim lotnisku jako prawdziwe miejsce do życia — z nowoczesną architekturą,
                wybrzeżem i spokojem, który podróżni przejeżdżający tędy w pośpiechu często przeoczają.
              </p>
              <Link to="/artykul/kastrup">
                <Button variant="outline">
                  Przeczytaj artykuł
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-16 max-w-4xl rounded-3xl bg-gradient-card p-7 text-center md:p-10">
          <h2 className="mb-4 text-3xl font-bold">Chcesz zobaczyć Danię na własne oczy?</h2>
          <p className="mx-auto mb-7 max-w-2xl text-muted-foreground">
            Połącz kontekst kulturowy z praktycznym planowaniem i wybierz miejsca, transport i noclegi we własnym tempie.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/kopenhaga"><Button>Co zobaczyć w Kopenhadze</Button></Link>
            <Link to="/wyspy-dunskie"><Button variant="outline">Wyspy duńskie</Button></Link>
          </div>
        </section>
      </div>
    </div>
  </>
);

export default Culture;
