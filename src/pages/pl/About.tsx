import { Link } from "react-router-dom";
import { ArrowRight, List, Plane, Train, Bus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import Breadcrumbs from "@/components/Breadcrumbs";
import ArticleMap from "@/components/LazyArticleMap";

const PAGE_URL = "https://kastrup.pl/co-zobaczyc-w-danii";
const PAGE_TITLE = "Dania – atrakcje i co warto zobaczyć: przewodnik | Kastrup.pl";
const PAGE_DESCRIPTION =
  "Co warto zobaczyć w Danii? Kopenhaga, Jutlandia, wyspy, zamki i przyroda. Przewodnik z planami podróży, transportem i poradami, kiedy jechać.";
const HEADLINE = "Co zobaczyć w Danii: atrakcje i kompletny przewodnik";
const IMAGE = "https://kastrup.pl/images/og-kastrup.jpg";

const About = () => {
  return (
    <>
      <Helmet>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <link rel="canonical" href={PAGE_URL} />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:title" content="Co zobaczyć w Danii: atrakcje i kompletny przewodnik" />
        <meta
          property="og:description"
          content="Atrakcje Danii: Kopenhaga, Jutlandia, wyspy, zamki i przyroda. Plany podróży, transport i porady, kiedy jechać."
        />
        <meta property="og:image" content={IMAGE} />
        <meta property="og:locale" content="pl_PL" />
        <meta property="og:site_name" content="Kastrup.pl" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Co zobaczyć w Danii: atrakcje i kompletny przewodnik" />
        <meta
          name="twitter:description"
          content="Atrakcje Danii: Kopenhaga, Jutlandia, wyspy, zamki i przyroda."
        />
        <meta name="twitter:image" content={IMAGE} />

        {/* JSON-LD Schema - Article */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": HEADLINE,
            "description": "Co zobaczyć w Danii i co warto odwiedzić: Kopenhaga, Jutlandia, wyspy, zamki i przyroda. Plany podróży, transport i porady, kiedy jechać.",
            "datePublished": "2025-10-23",
            "dateModified": "2026-09-13",
            "author": {
              "@type": "Person",
              "name": "Pavla Zimmermannová",
              "url": "https://kastrup.pl/o-autorce",
              "email": "zimmermannovap@gmail.com"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Kastrup.pl",
              "url": "https://kastrup.pl",
              "logo": {
                "@type": "ImageObject",
                "url": "https://kastrup.pl/icon-512.png"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": PAGE_URL
            },
            "image": IMAGE,
            "inLanguage": "pl-PL",
            "wordCount": 2500
          })}
        </script>

        {/* JSON-LD Schema - BreadcrumbList */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Start",
                "item": "https://kastrup.pl/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Co zobaczyć w Danii",
                "item": PAGE_URL
              }
            ]
          })}
        </script>

        {/* JSON-LD Schema - FAQPage */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Kiedy najlepiej pojechać do Danii?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Latem (czerwiec–sierpień) jest najwięcej wydarzeń i najstabilniejsza pogoda, ze średnimi temperaturami 15–18°C. Wiosna i jesień są spokojniejsze, z mniejszą liczbą turystów. Zima kusi adwentem i atmosferą hygge, zwłaszcza w grudniu, kiedy działają jarmarki bożonarodzeniowe."
                }
              },
              {
                "@type": "Question",
                "name": "Jak poruszać się po Danii?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Na dłuższe trasy między miastami korzystaj z pociągów DSB. W miastach działa dobra sieć metra, pociągów i autobusów. Bilety kupisz online albo w automatach. Dania ma też świetną infrastrukturę rowerową."
                }
              },
              {
                "@type": "Question",
                "name": "Czy Dania jest droga?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Tak, ceny w Danii są ogólnie wyższe niż w Europie Środkowej. Oszczędzisz, wybierając nocleg poza szczytem sezonu, gotując samodzielnie, kupując bilety na komunikację miejską i łącząc transport publiczny z rowerem."
                }
              },
              {
                "@type": "Question",
                "name": "Czy potrzebuję wizy do Danii?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Nie, obywatele UE i strefy Schengen nie potrzebują wizy do Danii. Wystarczy ważny dokument tożsamości (dowód osobisty albo paszport)."
                }
              },
              {
                "@type": "Question",
                "name": "Jak dojechać z lotniska Copenhagen Airport (CPH) do centrum?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Z lotniska bardzo często (co 10 minut) kursują metro M2 i pociągi. Dojazd do centrum Kopenhagi trwa 15–20 minut. Połączenie jest szybkie, wygodne i dobrze oznakowane. Bilety kupisz w automatach albo online."
                }
              },
              {
                "@type": "Question",
                "name": "Jaka jest najwyższa góra Danii?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Najwyższym naturalnym punktem właściwej Danii jest Møllehøj o wysokości 170,86 m n.p.m. Yding Skovhøj osiąga 172,54 m tylko wtedy, gdy wliczy się prehistoryczny kurhan; jego naturalny teren jest niższy niż Møllehøj."
                }
              }
            ]
          })}
        </script>

        {/* JSON-LD Schema - Person (Author) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Pavla Zimmermannová",
            "url": "https://kastrup.pl/o-autorce",
            "email": "zimmermannovap@gmail.com",
            "description": "Lubię Danię i wracam tu dla połączenia spokoju, przyrody, designu i życzliwej atmosfery. Bliska jest mi kultura skandynawska i filozofia hygge, dlatego dzielę się praktycznymi poradami i inspiracjami na podróże po Danii.",
            "knowsAbout": ["Dania", "Podróże", "Kultura skandynawska", "Hygge", "Kopenhaga", "Przewodniki turystyczne"],
            "sameAs": [
              "https://linklady.cz"
            ]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 md:px-6">
          <article className="mx-auto max-w-4xl">
            <Breadcrumbs items={[{ label: "Co zobaczyć w Danii" }]} />

            {/* Header */}
            <header className="mb-12">
              <h1 className="mb-6 text-4xl font-bold md:text-5xl">{HEADLINE}</h1>
              <p className="mb-6 text-xl leading-relaxed text-muted-foreground">
                Dania to zwarty skandynawski kraj, w którym spotykają się piękne wybrzeża, historyczne
                zamki, nowoczesny design i przyjemna filozofia hygge. Planowanie jest proste, transport
                niezawodny, a atmosfera przyjazna zarówno dla osób podróżujących solo, jak i dla rodzin.
              </p>
              <div className="rounded-lg border bg-muted/50 p-6">
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Najważniejsze w skrócie
                </h2>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>Po co jechać:</strong> przyroda, zamki, design, hygge, atrakcje dla rodzin</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>Kiedy jechać:</strong> wiosna–lato na wypady w plener; adwent na zimowy klimat</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>Praktycznie:</strong> świetne pociągi DSB, płatności zbliżeniowe, bardzo dobry angielski</span>
                  </li>
                </ul>
              </div>
            </header>

            {/* Table of Contents */}
            <nav className="mb-12 rounded-lg border bg-card p-6 shadow-sm" aria-label="Spis treści">
              <div className="mb-4 flex items-center gap-2">
                <List className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">Spis treści</h2>
              </div>
              <ul className="grid gap-2 md:grid-cols-2">
                <li>
                  <a href="#fakta" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    → Podstawowe fakty o Danii
                  </a>
                </li>
                <li>
                  <a href="#nejvyssi-hora" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    → Najwyższa góra Danii
                  </a>
                </li>
                <li>
                  <a href="#proc-jet" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    → Dlaczego warto pojechać do Danii
                  </a>
                </li>
                <li>
                  <a href="#kdy-jet" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    → Kiedy jechać do Danii
                  </a>
                </li>
                <li>
                  <a href="#doprava" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    → Jak dostać się do Danii
                  </a>
                </li>
                <li>
                  <a href="#prakticke" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    → Informacje praktyczne
                  </a>
                </li>
                <li>
                  <a href="#kodan" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    → Kopenhaga jako baza wypadowa
                  </a>
                </li>
                <li>
                  <a href="#co-videt" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    → Co warto zobaczyć w Danii
                  </a>
                </li>
                <li>
                  <a href="#kultura" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    → Duńska kultura i jedzenie
                  </a>
                </li>
                <li>
                  <a href="#itinerare" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    → Plany podróży: jak ułożyć trasę
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    → Najczęstsze pytania (FAQ)
                  </a>
                </li>
              </ul>
            </nav>

            {/* Hero Image - Nyhavn */}
            <div className="mb-12 overflow-hidden rounded-xl shadow-lg">
              <picture>
                <source srcSet="/images/20240813_130726.webp" type="image/webp" />
                <img
                  src="/images/20240813_130726.jpg"
                  alt="Nyhavn – kolorowe kamienice i kanał w Kopenhadze, Dania"
                  className="h-auto w-full object-cover"
                  loading="eager"
                />
              </picture>
              <p className="mt-2 text-center text-sm text-muted-foreground">
                Nyhavn w Kopenhadze – jedno z najbardziej rozpoznawalnych miejsc w Danii
              </p>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <section id="fakta" className="mb-12">
                <h2 className="mb-4 text-2xl font-bold">Podstawowe fakty o Danii</h2>
                <p className="mb-4">
                  Dania leży w północnej Europie, należy do Skandynawii i składa się z Półwyspu
                  Jutlandzkiego oraz ponad 400 wysp (np. Fionii i Zelandii). Stolicą jest Kopenhaga,
                  językiem urzędowym duński, a walutą korona duńska (DKK). Osobno przygotowaliśmy
                  przegląd <Link to="/wyspy-dunskie">wysp duńskich z mapą</Link> i przewodnik
                  po <Link to="/jezyk-dunski">języku duńskim i zwrotach na drogę</Link>.
                </p>
                <p className="mb-4">
                  Oficjalny portal turystyczny oferuje przegląd regionów, inspiracje na plany podróży
                  i praktyczne informacje do planowania.
                </p>
                <p>
                  Hygge, duński styl dobrego samopoczucia i bliskości, przenika kawiarnie, wnętrza
                  i życie lokalnych społeczności. To świetny klucz do podróżowania po tym kraju.
                </p>

                <section id="nejvyssi-hora" className="my-8 rounded-2xl border bg-card p-6 shadow-sm">
                  <h2 className="mb-4 text-2xl font-bold">Jaka jest najwyższa góra Danii?</h2>
                  <p className="mb-4">
                    Najwyższym <strong>naturalnym punktem właściwej Danii jest Møllehøj</strong> w rejonie
                    Ejer Bjerge w środkowej Jutlandii. Wznosi się na 170,86 m n.p.m. To raczej niepozorne,
                    trawiaste wzniesienie wśród pól niż góra w polskim rozumieniu.
                  </p>
                  <p className="mb-4">
                    Często podawany Yding Skovhøj mierzy 172,54 m tylko wtedy, gdy wliczy się prehistoryczny
                    kurhan na szczycie. Sam naturalny teren ma 170,77 m, jest więc o dziewięć centymetrów
                    niższy niż Møllehøj. Ejer Bavnehøj, lepiej znany dzięki wieży widokowej, ma 170,35 m.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Grenlandia i Wyspy Owcze są autonomicznymi częściami Królestwa Danii, a nie terytorium
                    właściwej Danii. Ich gór nie uwzględniamy więc w tym porównaniu. Dane sprawdzamy według
                    VisitDenmark i regionalnej organizacji turystycznej VisitAarhus.
                  </p>
                </section>

                {/* Mapa Danii */}
                <ArticleMap
                  lat={56.2639}
                  lng={9.5018}
                  zoom={7}
                  markers={[
                    {
                      lat: 55.6761,
                      lng: 12.5683,
                      title: "Kopenhaga",
                      description: "Stolica Danii – design, historia, hygge"
                    },
                    {
                      lat: 56.1629,
                      lng: 10.2039,
                      title: "Aarhus",
                      description: "Drugie co do wielkości miasto – kultura i młoda energia"
                    },
                    {
                      lat: 55.4038,
                      lng: 10.4024,
                      title: "Odense",
                      description: "Miejsce urodzenia H.C. Andersena"
                    },
                    {
                      lat: 55.3282,
                      lng: 8.7640,
                      title: "Ribe",
                      description: "Najstarsze miasto w Danii (rok 705)"
                    },
                    {
                      lat: 57.7209,
                      lng: 10.5797,
                      title: "Skagen",
                      description: "Północny cypel – miejsce, gdzie spotykają się dwa morza"
                    }
                  ]}
                  caption="Mapa Danii z najważniejszymi miastami i atrakcjami"
                  height="500px"
                />
              </section>

              <section id="proc-jet" className="mb-12">
                <h2 className="mb-4 text-2xl font-bold">Dlaczego warto pojechać do Danii</h2>
                <p className="mb-4">
                  Bezpieczeństwo, ekologiczny transport, dobra scena kulinarna i atrakcje dla rodzin
                  sprawiają, że Dania świetnie nadaje się zarówno na krótki city break, jak i na tygodniowy
                  road trip.
                </p>
                <p className="mb-6">
                  Czekają na Ciebie kredowe klify, szerokie plaże, słynne zamki, nowoczesne muzea i tętniące
                  życiem miasta – a wszystko to dostępne pociągiem i transportem publicznym.
                </p>

                {/* Image - Møns Klint */}
                <div className="my-8 overflow-hidden rounded-xl shadow-md">
                  <picture>
                    <source srcSet="/images/mons-klint-utesy.webp" type="image/webp" />
                    <img
                      src="/images/mons-klint-utesy.jpg"
                      alt="Møns Klint – białe kredowe klify na wyspie Møn, Dania"
                      className="h-auto w-full object-cover"
                      loading="lazy"
                    />
                  </picture>
                  <p className="mt-2 text-center text-sm text-muted-foreground">
                    Møns Klint – kredowe klify na wyspie Møn
                  </p>
                </div>
              </section>

              <section id="kdy-jet" className="mb-12">
                <h2 className="mb-4 text-2xl font-bold">Kiedy jechać do Danii</h2>
                <p className="mb-4">
                  <strong>Wiosna (marzec–maj)</strong> jest łagodna i spokojniejsza,
                  <strong> lato (czerwiec–sierpień)</strong> najbardziej ożywione i idealne na wybrzeże i festiwale,
                  <strong> jesień (wrzesień–listopad)</strong> to kolorowe krajobrazy i mniejsze tłumy,
                  a <strong> zima (grudzień–luty)</strong> ma mocno świąteczny klimat i przytulne wnętrza w duchu hygge.
                </p>
                <p className="mb-6">
                  Na wypady w plener i do parków rodzinnych wybierz późną wiosnę albo lato; jeśli zależy
                  Ci na adwentowej atmosferze, rozważ grudzień z jarmarkami i muzeami.
                </p>

                {/* Tabela pogody */}
                <div className="my-8 overflow-x-auto rounded-lg border bg-card shadow-sm">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-3 text-left font-semibold">Miesiąc</th>
                        <th className="p-3 text-center font-semibold">Średnio</th>
                        <th className="p-3 text-center font-semibold">Min–maks</th>
                        <th className="p-3 text-center font-semibold">Opady</th>
                        <th className="p-3 text-center font-semibold">Słońce</th>
                        <th className="p-3 text-center font-semibold">Pora roku</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:bg-muted/20 transition-colors">
                        <td className="p-3 font-medium">Styczeń</td>
                        <td className="p-3 text-center font-semibold text-blue-600 dark:text-blue-400">1°C</td>
                        <td className="p-3 text-center text-muted-foreground">-2 do 4°C</td>
                        <td className="p-3 text-center">60 mm</td>
                        <td className="p-3 text-center">1 h</td>
                        <td className="p-3 text-center text-sm">Zima ❄️</td>
                      </tr>
                      <tr className="border-b hover:bg-muted/20 transition-colors">
                        <td className="p-3 font-medium">Luty</td>
                        <td className="p-3 text-center font-semibold text-blue-600 dark:text-blue-400">1°C</td>
                        <td className="p-3 text-center text-muted-foreground">-2 do 4°C</td>
                        <td className="p-3 text-center">48 mm</td>
                        <td className="p-3 text-center">2 h</td>
                        <td className="p-3 text-center text-sm">Zima 🌨️</td>
                      </tr>
                      <tr className="border-b hover:bg-muted/20 transition-colors">
                        <td className="p-3 font-medium">Marzec</td>
                        <td className="p-3 text-center font-semibold text-cyan-600 dark:text-cyan-400">3°C</td>
                        <td className="p-3 text-center text-muted-foreground">-1 do 8°C</td>
                        <td className="p-3 text-center">58 mm</td>
                        <td className="p-3 text-center">4 h</td>
                        <td className="p-3 text-center text-sm">Wiosna 🌱</td>
                      </tr>
                      <tr className="border-b hover:bg-muted/20 transition-colors">
                        <td className="p-3 font-medium">Kwiecień</td>
                        <td className="p-3 text-center font-semibold text-teal-600 dark:text-teal-400">7°C</td>
                        <td className="p-3 text-center text-muted-foreground">2 do 13°C</td>
                        <td className="p-3 text-center">56 mm</td>
                        <td className="p-3 text-center">6 h</td>
                        <td className="p-3 text-center text-sm">Wiosna 🌸</td>
                      </tr>
                      <tr className="border-b bg-green-50/50 dark:bg-green-950/20 hover:bg-green-100/50 dark:hover:bg-green-900/30 transition-colors">
                        <td className="p-3 font-medium">Maj</td>
                        <td className="p-3 text-center font-bold text-green-700 dark:text-green-400">12°C</td>
                        <td className="p-3 text-center text-muted-foreground">7 do 18°C</td>
                        <td className="p-3 text-center">56 mm</td>
                        <td className="p-3 text-center">8 h</td>
                        <td className="p-3 text-center text-sm font-semibold text-green-700 dark:text-green-400">Idealnie ✨</td>
                      </tr>
                      <tr className="border-b bg-green-50/50 dark:bg-green-950/20 hover:bg-green-100/50 dark:hover:bg-green-900/30 transition-colors">
                        <td className="p-3 font-medium">Czerwiec</td>
                        <td className="p-3 text-center font-bold text-green-700 dark:text-green-400">15°C</td>
                        <td className="p-3 text-center text-muted-foreground">10 do 21°C</td>
                        <td className="p-3 text-center">64 mm</td>
                        <td className="p-3 text-center">9 h</td>
                        <td className="p-3 text-center text-sm font-semibold text-green-700 dark:text-green-400">Idealnie ☀️</td>
                      </tr>
                      <tr className="border-b bg-green-50/50 dark:bg-green-950/20 hover:bg-green-100/50 dark:hover:bg-green-900/30 transition-colors">
                        <td className="p-3 font-medium">Lipiec</td>
                        <td className="p-3 text-center font-bold text-green-700 dark:text-green-400">18°C</td>
                        <td className="p-3 text-center text-muted-foreground">13 do 23°C</td>
                        <td className="p-3 text-center">74 mm</td>
                        <td className="p-3 text-center">9 h</td>
                        <td className="p-3 text-center text-sm font-semibold text-green-700 dark:text-green-400">Lato 🏖️</td>
                      </tr>
                      <tr className="border-b bg-green-50/50 dark:bg-green-950/20 hover:bg-green-100/50 dark:hover:bg-green-900/30 transition-colors">
                        <td className="p-3 font-medium">Sierpień</td>
                        <td className="p-3 text-center font-bold text-green-700 dark:text-green-400">17°C</td>
                        <td className="p-3 text-center text-muted-foreground">12 do 22°C</td>
                        <td className="p-3 text-center">68 mm</td>
                        <td className="p-3 text-center">8 h</td>
                        <td className="p-3 text-center text-sm font-semibold text-green-700 dark:text-green-400">Lato 🌊</td>
                      </tr>
                      <tr className="border-b hover:bg-muted/20 transition-colors">
                        <td className="p-3 font-medium">Wrzesień</td>
                        <td className="p-3 text-center font-semibold text-amber-600 dark:text-amber-400">14°C</td>
                        <td className="p-3 text-center text-muted-foreground">9 do 19°C</td>
                        <td className="p-3 text-center">64 mm</td>
                        <td className="p-3 text-center">6 h</td>
                        <td className="p-3 text-center text-sm">Jesień 🍂</td>
                      </tr>
                      <tr className="border-b hover:bg-muted/20 transition-colors">
                        <td className="p-3 font-medium">Październik</td>
                        <td className="p-3 text-center font-semibold text-orange-600 dark:text-orange-400">10°C</td>
                        <td className="p-3 text-center text-muted-foreground">5 do 15°C</td>
                        <td className="p-3 text-center">72 mm</td>
                        <td className="p-3 text-center">3 h</td>
                        <td className="p-3 text-center text-sm">Jesień 🍁</td>
                      </tr>
                      <tr className="border-b hover:bg-muted/20 transition-colors">
                        <td className="p-3 font-medium">Listopad</td>
                        <td className="p-3 text-center font-semibold text-slate-600 dark:text-slate-400">5°C</td>
                        <td className="p-3 text-center text-muted-foreground">1 do 10°C</td>
                        <td className="p-3 text-center">71 mm</td>
                        <td className="p-3 text-center">1 h</td>
                        <td className="p-3 text-center text-sm">Zima 🌧️</td>
                      </tr>
                      <tr className="hover:bg-muted/20 transition-colors">
                        <td className="p-3 font-medium">Grudzień</td>
                        <td className="p-3 text-center font-semibold text-blue-600 dark:text-blue-400">2°C</td>
                        <td className="p-3 text-center text-muted-foreground">-2 do 6°C</td>
                        <td className="p-3 text-center">60 mm</td>
                        <td className="p-3 text-center">1 h</td>
                        <td className="p-3 text-center text-sm">Adwent 🎄</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="mt-4 text-sm text-muted-foreground italic">
                  💡 <strong>Najlepszy czas:</strong> od maja do sierpnia (średnio 12–18°C, do 8–9 godzin słońca dziennie).
                  Po zimowy klimat i jarmarki adwentowe przyjedź w grudniu.
                </p>
              </section>

              <section id="doprava" className="mb-12">
                <h2 className="mb-6 text-2xl font-bold">Jak dostać się do Danii</h2>
                <p className="mb-6">
                  Do Danii dostaniesz się samolotem (najszybciej), pociągiem (najwygodniej) albo autobusem
                  (zwykle najtaniej). Każda z tych opcji ma swoje zalety; konkretne połączenia i ceny
                  ze swojego miasta sprawdź bezpośrednio u przewoźników.
                </p>

                <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                  <Plane className="h-6 w-6 text-primary" />
                  Samolotem (najszybciej)
                </h3>
                <div className="mb-8 rounded-lg border bg-card p-6">
                  <h4 className="mb-3 font-semibold">Kopenhaga (Kastrup – CPH)</h4>
                  <ul className="mb-4 space-y-2">
                    <li><strong>Dla kogo:</strong> główna brama do Danii i najlepszy start zwiedzania Kopenhagi</li>
                  </ul>
                  <p className="mb-6 text-sm text-muted-foreground">
                    Po wylądowaniu skorzystaj z naszego przewodnika{" "}
                    <Link to="/artykul/lotnisko-kopenhaga-dojazd-do-centrum">
                      lotnisko Kopenhaga – dojazd do centrum
                    </Link>.
                  </p>

                  <h4 className="mb-3 font-semibold">Aalborg (północna Dania)</h4>
                  <ul className="mb-4 space-y-2">
                    <li><strong>Zaleta:</strong> idealne lotnisko dla północnej Jutlandii (Skagen, Rubjerg Knude)</li>
                  </ul>

                  <h4 className="mb-3 font-semibold">Billund (LEGOLAND)</h4>
                  <ul className="space-y-2">
                    <li><strong>Zaleta:</strong> prosto do LEGOLAND i LEGO House</li>
                  </ul>
                </div>

                <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                  <Train className="h-6 w-6 text-primary" />
                  Pociągiem (najwygodniej)
                </h3>
                <div className="mb-8 rounded-lg border bg-card p-6">
                  <h4 className="mb-3 font-semibold">Przez Hamburg do Kopenhagi</h4>
                  <ul className="mb-4 space-y-2">
                    <li><strong>Odcinek Hamburg → Kopenhaga:</strong> ok. 5–6 godzin</li>
                    <li><strong>Przyjazd:</strong> København H (dworzec główny)</li>
                  </ul>
                  <p className="text-sm text-muted-foreground">
                    <strong>Zalety:</strong> wygodne pociągi EuroCity, miejsce na bagaż, widoki za oknem.{" "}
                    <strong>Gdzie kupić bilet:</strong> ÖBB, Omio, Trainline.
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground">
                    <strong>Wariant przez Berlin:</strong> Berlin → Hamburg → Kopenhaga
                  </p>
                </div>

                <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                  <Bus className="h-6 w-6 text-primary" />
                  Autobusem (zwykle najtaniej)
                </h3>
                <div className="rounded-lg border bg-card p-6">
                  <p className="mb-4">
                    Autobus to zwykle najtańsza, ale też najdłuższa opcja. Połączenia do Kopenhagi
                    oferują przewoźnicy tacy jak FlixBus.
                  </p>
                  <ul className="space-y-2">
                    <li><strong>Czas podróży:</strong> zależy od miejsca startu i liczby przesiadek</li>
                    <li><strong>Zaleta:</strong> niska cena</li>
                  </ul>
                </div>
              </section>

              <section id="prakticke" className="mb-12">
                <h2 className="mb-6 text-2xl font-bold">Informacje praktyczne</h2>

                <h3 className="mb-3 text-xl font-semibold">Wjazd, bezpieczeństwo, zdrowie</h3>
                <p className="mb-6">
                  Dania należy do UE i strefy Schengen; z Polski podróżujesz bez wizy, z ważnym dokumentem.
                  To bezpieczny kraj, a opieka zdrowotna stoi na wysokim poziomie.
                </p>

                <h3 className="mb-3 text-xl font-semibold">Pieniądze i płatności</h3>
                <p className="mb-6">
                  Walutą jest korona duńska (DKK); karty zbliżeniowe są powszechnie akceptowane. Licz się
                  z wyższymi cenami niż w Europie Środkowej.
                </p>

                <h3 className="mb-3 text-xl font-semibold">Język i komunikacja</h3>
                <p className="mb-6">
                  Dominuje duński, ale angielski jest zwykle na bardzo dobrym poziomie, więc łatwo
                  dogadasz się w transporcie, w noclegach i w restauracjach. Podstawowe zwroty, alfabet
                  i wymowę znajdziesz w przewodniku <Link to="/jezyk-dunski">jak mówi się w Danii</Link>.
                </p>

                <h3 className="mb-3 text-xl font-semibold">Transport w kraju</h3>
                <p className="mb-4">
                  Krajowe koleje DSB niezawodnie łączą miasta i regiony; rozkłady jazdy i bilety
                  znajdziesz online.
                </p>
                <p className="mb-6">
                  W miastach działa połączenie metra, pociągów i autobusów; rower jest bardzo popularny,
                  a infrastruktura rowerowa – dobra.
                </p>

                {/* Image - Train Station */}
                <div className="my-8 overflow-hidden rounded-xl shadow-md">
                  <picture>
                    <source srcSet="/images/IMG_20230712_091836.webp" type="image/webp" />
                    <img
                      src="/images/IMG_20230712_091836.jpg"
                      alt="Dworzec główny w Kopenhadze – historyczna architektura"
                      className="h-auto w-full object-cover"
                      loading="lazy"
                    />
                  </picture>
                  <p className="mt-2 text-center text-sm text-muted-foreground">
                    Historyczny dworzec kolejowy w Kopenhadze – piękna architektura i dobre połączenia
                  </p>
                </div>

                <h3 className="mb-3 text-xl font-semibold">Przylot samolotem</h3>
                <p>
                  Główną bramą jest Copenhagen Airport (CPH); do centrum w krótkich odstępach kursują
                  metro i pociągi, a oznakowanie jest czytelne.
                </p>
              </section>

              <section id="kodan" className="mb-12">
                <h2 className="mb-4 text-2xl font-bold">Kopenhaga jako główna baza wypadowa</h2>
                <p className="mb-4">
                  Kopenhaga to nowoczesna, ekologiczna metropolia o przyjaznej atmosferze, ze świetną
                  kuchnią i królewskimi zabytkami. Logistycznie to najlepszy początek albo koniec
                  podróży po Danii.
                </p>

                {/* Image - Little Mermaid */}
                <div className="my-8 overflow-hidden rounded-xl shadow-md">
                  <picture>
                    <source srcSet="/images/IMG_20230711_085341.webp" type="image/webp" />
                    <img
                      src="/images/IMG_20230711_085341.jpg"
                      alt="Mała Syrenka – słynny pomnik w Kopenhadze, Dania"
                      className="h-auto w-full object-cover"
                      loading="lazy"
                    />
                  </picture>
                  <p className="mt-2 text-center text-sm text-muted-foreground">
                    Mała Syrenka – symbol Kopenhagi
                  </p>
                </div>

                <p>
                  Do największych atrakcji, które trzeba zobaczyć, należą Nyhavn, Tivoli, Amalienborg,
                  Christiansborg, Rosenborg, Rundetårn i kulturalne dzielnice z kawiarniami i designem.
                  Poszczególne miejsca połączyliśmy w trasy w przewodniku{" "}
                  <Link to="/kopenhaga">co zobaczyć w Kopenhadze przy pierwszej wizycie</Link>.
                </p>
              </section>

              <section id="co-videt" className="mb-12">
                <h2 className="mb-6 text-2xl font-bold">Co warto zobaczyć w Danii poza Kopenhagą</h2>

                <h3 className="mb-4 text-xl font-semibold">Przyroda</h3>
                <ul className="mb-6 space-y-2">
                  <li><strong>Møns Klint</strong> – kredowe klify z punktami widokowymi i ścieżkami wzdłuż wybrzeża</li>
                  <li><strong>Stevns Klint</strong> – dramatyczne klify i stanowisko geologiczne z historią epoki lodowcowej</li>
                  <li><strong>Rubjerg Knude</strong> – wędrująca wydma i latarnia morska wysoko nad morzem</li>
                  <li><strong>Północno-zachodnia Jutlandia</strong> – wydmy, plaże i miejsce, gdzie spotykają się morza przy Skagen</li>
                </ul>
                <p className="mb-6">
                  Jeśli chcesz połączyć wybrzeże w dłuższą trasę, skorzystaj z naszego przeglądu{" "}
                  <Link to="/wyspy-dunskie">wysp duńskich z mapami i transportem</Link>.
                </p>

                <p>
                  Na podróż samochodem przyda się przegląd <Link to="/artykul/mosty-w-danii">mostów w Danii i opłat za przejazd</Link>.
                  Konkretne przystanki zaplanujesz z przewodnikami{" "}
                  <Link to="/artykul/mons-klint">Møns Klint: parking i schody na plażę</Link> oraz{" "}
                  <Link to="/artykul/ribe">Ribe: parking i spacer po mieście</Link>.
                </p>

                {/* Image - Troll */}
                <div className="my-8 overflow-hidden rounded-xl shadow-md">
                  <picture>
                    <source srcSet="/images/20240811_160639.webp" type="image/webp" />
                    <img
                      src="/images/20240811_160639.jpg"
                      alt="Drewniany troll – baśniowa rzeźba ogrodowa w Danii"
                      className="h-auto w-full object-cover"
                      loading="lazy"
                    />
                  </picture>
                  <p className="mt-2 text-center text-sm text-muted-foreground">
                    Drewniany troll – nietypowa duńska sztuka ogrodowa
                  </p>
                </div>

                <h3 className="mb-4 text-xl font-semibold">Historia i zabytki</h3>
                <ul className="mb-6 space-y-2">
                  <li><strong>Frederiksborg</strong> – renesansowy zamek z ogrodami w Hillerød</li>
                  <li><strong>Kronborg</strong> – „zamek Hamleta” w Helsingør, twierdza z listy UNESCO</li>
                  <li><strong>Egeskov</strong> – zamek na wodzie na Fionii, dobry także dla rodzin</li>
                  <li><strong>Ribe</strong> – najstarsze miasto w Danii z wikińskim dziedzictwem</li>
                </ul>

                <h3 className="mb-4 text-xl font-semibold">Rodzina i rozrywka</h3>
                <ul className="mb-6 space-y-2">
                  <li><strong>LEGOLAND Billund</strong> – park tematyczny dla każdego wieku</li>
                  <li><strong>LEGO House</strong> – interaktywne centrum kreatywności w Billund</li>
                  <li><strong>Lalandia Billund</strong> – aquapark i kompleks wypoczynkowy</li>
                </ul>

                {/* Image - LEGO */}
                <div className="my-8 overflow-hidden rounded-xl shadow-md">
                  <picture>
                    <source srcSet="/images/IMG_20230711_114209.webp" type="image/webp" />
                    <img
                      src="/images/IMG_20230711_114209.jpg"
                      alt="Figurki LEGO Friends w LEGO House, Billund, Dania"
                      className="h-auto w-full object-cover"
                      loading="lazy"
                    />
                  </picture>
                  <p className="mt-2 text-center text-sm text-muted-foreground">
                    LEGO Friends w LEGO House – interaktywna atrakcja w Billund
                  </p>
                </div>
              </section>

              <section id="kultura" className="mb-12">
                <h2 className="mb-4 text-2xl font-bold">Duńska kultura, hygge i jedzenie</h2>
                <p className="mb-4">
                  Hygge oznacza wygodę, spokój i bliskość – często przy stole z przyjaciółmi albo
                  w zwykłej chwili zatrzymania. Szczegółowo wyjaśniamy,{" "}
                  <Link to="/hygge">czym jest hygge, co oznacza i jak się je wymawia</Link>.
                </p>
                <p>
                  Spróbuj smørrebrød (otwartych kanapek), frikadeller (duńskich kotletów mielonych)
                  i wienerbrød; kawiarnie i piekarnie to tutaj radosny rytuał.
                </p>
              </section>

              <section id="itinerare" className="mb-12">
                <h2 className="mb-6 text-2xl font-bold">Plany podróży: jak ułożyć trasę</h2>

                <h3 className="mb-3 text-xl font-semibold">3–4 dni z bazą w Kopenhadze</h3>
                <p className="mb-6">
                  Dzień 1–2 Kopenhaga, potem Billund (LEGOLAND/LEGO House) i jedna perełka przyrody
                  (Møns albo Stevns Klint) – zrównoważone połączenie miasta, rodzinnej rozrywki i natury.
                </p>

                <h3 className="mb-3 text-xl font-semibold">Tydzień w Danii</h3>
                <p>
                  Pętla: Kopenhaga → północna Zelandia (Kronborg/Frederiksborg) → Fionia (Egeskov, Odense)
                  → zachodnia Jutlandia (wydmy, plaże, Skagen) → powrót; zamki, przyroda i miasta w jednej trasie.
                </p>
              </section>

              <section id="faq" className="mb-12">
                <h2 className="mb-6 text-2xl font-bold">Najczęstsze pytania (FAQ)</h2>

                <details className="group mb-4 rounded-lg border bg-card p-4 transition-all hover:shadow-md">
                  <summary className="cursor-pointer font-semibold text-lg list-none flex items-center justify-between">
                    <span>Kiedy najlepiej pojechać do Danii?</span>
                    <span className="text-primary transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <p className="mt-4 text-muted-foreground">
                    Latem jest najwięcej wydarzeń i najstabilniejsza pogoda, wiosna i jesień są spokojniejsze,
                    a zima kusi adwentem i hygge.
                  </p>
                </details>

                <details className="group mb-4 rounded-lg border bg-card p-4 transition-all hover:shadow-md">
                  <summary className="cursor-pointer font-semibold text-lg list-none flex items-center justify-between">
                    <span>Jaka jest najwyższa góra Danii?</span>
                    <span className="text-primary transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <p className="mt-4 text-muted-foreground">
                    Najwyższym naturalnym punktem jest Møllehøj o wysokości 170,86 m. Yding Skovhøj jest
                    wyższy tylko wtedy, gdy wliczy się prehistoryczny kurhan na szczycie.
                  </p>
                </details>

                <details className="group mb-4 rounded-lg border bg-card p-4 transition-all hover:shadow-md">
                  <summary className="cursor-pointer font-semibold text-lg list-none flex items-center justify-between">
                    <span>Jak poruszać się po Danii?</span>
                    <span className="text-primary transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <p className="mt-4 text-muted-foreground">
                    Na dłuższe trasy wybierz pociągi DSB, w miastach metro, autobusy i pociągi; bilety
                    kupisz online i w automatach.
                  </p>
                </details>

                <details className="group mb-4 rounded-lg border bg-card p-4 transition-all hover:shadow-md">
                  <summary className="cursor-pointer font-semibold text-lg list-none flex items-center justify-between">
                    <span>Czy Dania jest droga?</span>
                    <span className="text-primary transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <p className="mt-4 text-muted-foreground">
                    Ceny są ogólnie wyższe; oszczędzisz, jadąc poza szczytem sezonu, gotując samodzielnie,
                    korzystając z kart na komunikację miejską i łącząc pociąg z rowerem.
                  </p>
                </details>

                <details className="group mb-4 rounded-lg border bg-card p-4 transition-all hover:shadow-md">
                  <summary className="cursor-pointer font-semibold text-lg list-none flex items-center justify-between">
                    <span>Czy potrzebuję wizy?</span>
                    <span className="text-primary transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <p className="mt-4 text-muted-foreground">
                    Obywatele UE i strefy Schengen nie potrzebują wizy do Danii, wystarczy ważny dokument tożsamości.
                  </p>
                </details>

                <details className="group mb-4 rounded-lg border bg-card p-4 transition-all hover:shadow-md">
                  <summary className="cursor-pointer font-semibold text-lg list-none flex items-center justify-between">
                    <span>Jak dojechać z lotniska CPH do centrum?</span>
                    <span className="text-primary transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <p className="mt-4 text-muted-foreground">
                    Metro M2 i pociągi kursują często, dojazd jest szybki i dobrze oznakowany; bilety
                    kupisz w automatach i online.
                  </p>
                </details>
              </section>

              {/* Author Bio */}
              <div className="mt-12 rounded-xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-background p-8 shadow-lg">
                <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
                  {/* Author Photo */}
                  <div className="flex-shrink-0">
                    <div
                      role="img"
                      aria-label="Inicjały Pavli Zimmermannovej"
                      className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-primary/20 bg-primary text-3xl font-bold text-primary-foreground shadow-xl"
                    >
                      PZ
                    </div>
                  </div>

                  {/* Author Info */}
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="mb-2 text-2xl font-bold">Pavla Zimmermannová</h3>
                    <div className="mb-4 h-1 w-16 bg-primary/30 mx-auto md:mx-0"></div>
                    <p className="mb-4 leading-relaxed text-muted-foreground">
                      Lubię Danię i wracam tu dla połączenia spokoju, przyrody, designu i życzliwej atmosfery.
                      Bliska jest mi kultura skandynawska i filozofia hygge, dlatego dzielę się praktycznymi
                      poradami i inspiracjami na Twoje podróże po Danii.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3 md:justify-start">
                      <a
                        href="mailto:zimmermannovap@gmail.com"
                        className="inline-flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
                      >
                        📧 Kontakt
                      </a>
                      <Link
                        to="/artykuly"
                        className="inline-flex items-center gap-2 rounded-lg bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/80"
                      >
                        📝 Więcej artykułów
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-16 grid gap-6 md:grid-cols-2">
              <div className="rounded-lg bg-gradient-card p-8">
                <h3 className="mb-4 text-2xl font-bold">Przeczytaj nasze artykuły</h3>
                <p className="mb-6 text-muted-foreground">
                  Artykuły o duńskiej kulturze, podróżach i stylu życia hygge.
                </p>
                <Link to="/artykuly">
                  <Button>
                    Zobacz artykuły
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>

              <div className="rounded-lg bg-gradient-card p-8">
                <h3 className="mb-4 text-2xl font-bold">Znajdź nocleg</h3>
                <p className="mb-6 text-muted-foreground">
                  Szukasz miejsca na pobyt? Sprawdź naszą ofertę hoteli, apartamentów i hosteli.
                </p>
                <Link to="/noclegi">
                  <Button variant="outline">
                    Pokaż noclegi
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </>
  );
};

export default About;
