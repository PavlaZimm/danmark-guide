import { Link } from "react-router-dom";
import { ArrowRight, List, Plane, Train, Bus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import Breadcrumbs from "@/components/Breadcrumbs";
import ArticleMap from "@/components/ArticleMap";
import { DEFAULT_SOCIAL_IMAGE } from "@/lib/seo-helpers";

const About = () => {
  return (
    <>
      <Helmet>
        <title>Dánsko: Kompletní průvodce | Kastrup.cz</title>
        <meta
          name="description"
          content="Kompletní průvodce po Dánsku: příroda, hrady, design, hygge. Praktické informace, itineráře, doprava a tipy kdy jet."
        />
        <link rel="canonical" href="https://kastrup.cz/o-dansku" />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://kastrup.cz/o-dansku" />
        <meta property="og:title" content="Dánsko: Kompletní průvodce" />
        <meta
          property="og:description"
          content="Kompletní průvodce po Dánsku: příroda, hrady, design, hygge. Praktické informace, itineráře a tipy."
        />
        <meta property="og:image" content={DEFAULT_SOCIAL_IMAGE} />
        <meta property="og:locale" content="cs_CZ" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dánsko: Kompletní průvodce" />
        <meta
          name="twitter:description"
          content="Kompletní průvodce po Dánsku: příroda, hrady, design, hygge."
        />
        <meta name="twitter:image" content={DEFAULT_SOCIAL_IMAGE} />

        {/* JSON-LD Schema - Article */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Dánsko: Kompletní průvodce",
            "description": "Kompletní průvodce po Dánsku: příroda, hrady, design, hygge. Praktické informace, itineráře a tipy.",
            "datePublished": "2025-10-23",
            "dateModified": "2026-09-13",
            "author": {
              "@type": "Person",
              "name": "Pavla Zimmermannová",
              "url": "https://kastrup.cz/autorka",
              "email": "zimmermannovap@gmail.com"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Kastrup.cz",
              "url": "https://kastrup.cz",
              "logo": {
                "@type": "ImageObject",
                "url": "https://kastrup.cz/icon-512.svg"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://kastrup.cz/o-dansku"
            },
            "image": DEFAULT_SOCIAL_IMAGE,
            "inLanguage": "cs-CZ",
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
                "name": "Domů",
                "item": "https://kastrup.cz"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "O Dánsku",
                "item": "https://kastrup.cz/o-dansku"
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
                "name": "Kdy je nejlepší doba na návštěvu Dánska?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Léto (červen-srpen) má nejvíce akcí a nejstabilnější počasí s průměrnými teplotami 15-18°C. Jaro a podzim jsou klidnější s menším počtem turistů. Zima láká na advent a hygge atmosféru, zejména v prosinci s vánočními trhy."
                }
              },
              {
                "@type": "Question",
                "name": "Jak se pohybovat po Dánsku?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Využijte vlaky DSB pro delší přesuny mezi městy. Ve městech funguje kvalitní síť metra, vlaků a autobusů. Jízdenky můžete koupit online nebo v automatech. Dánsko má také vynikající cyklistickou infrastrukturu."
                }
              },
              {
                "@type": "Question",
                "name": "Je Dánsko drahé?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ano, Dánsko má celkově vyšší cenovou hladinu než střední Evropa. Šetřit lze volbou ubytování mimo špičku, vlastním vařením, nákupem jízdenek na MHD a kombinací veřejné dopravy s kolem."
                }
              },
              {
                "@type": "Question",
                "name": "Potřebuji vízum do Dánska?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ne, občané EU a Schengenu necestují do Dánska s vízy. Stačí platný doklad totožnosti (občanský průkaz nebo pas)."
                }
              },
              {
                "@type": "Question",
                "name": "Jak se dostat z letiště Copenhagen Airport (CPH) do centra?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Z letiště jezdí metro M2 a vlaky velmi často (každých 10 minut). Cesta do centra Kodaně trvá 15-20 minut. Spojení je rychlé, pohodlné a dobře značené. Jízdenky lze koupit v automatech nebo online."
                }
              },
              {
                "@type": "Question",
                "name": "Jaká je nejvyšší hora Dánska?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Nejvyšším přirozeným bodem vlastního Dánska je Møllehøj s nadmořskou výškou 170,86 metru. Yding Skovhøj dosahuje 172,54 metru jen při započtení pravěké mohyly; jeho přirozený terén je nižší než Møllehøj."
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
            "url": "https://kastrup.cz/autorka",
            "email": "zimmermannovap@gmail.com",
            "description": "Dánsko mám ráda a vracím se sem pro kombinaci klidu, přírody, designu a laskavé atmosféry. S láskou k severské kultuře a hygge filosofii přináším praktické tipy a inspiraci pro cesty po Dánsku.",
            "knowsAbout": ["Dánsko", "Cestování", "Severská kultura", "Hygge", "Kodaň", "Cestovatelské průvodce"],
            "sameAs": [
              "https://linklady.cz"
            ]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 md:px-6">
          <article className="mx-auto max-w-4xl">
            <Breadcrumbs items={[{ label: "O Dánsku" }]} />

            {/* Header */}
            <header className="mb-12">
              <h1 className="mb-6 text-4xl font-bold md:text-5xl">
                Dánsko: Kompletní průvodce
              </h1>
              <p className="mb-6 text-xl leading-relaxed text-muted-foreground">
                Dánsko je kompaktní severská země, kde se setkává krása pobřeží, historické hrady,
                moderní design a příjemná filozofie hygge. Plánování je snadné, doprava spolehlivá
                a atmosféra přívětivá jak pro solo cestovatelky, tak pro rodiny.
              </p>
              <div className="rounded-lg border bg-muted/50 p-6">
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Klíčové body
                </h2>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>Proč jet:</strong> příroda, hrady, design, hygge, rodinné atrakce</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>Kdy jet:</strong> jaro–léto pro venek; advent pro zimní pohodu</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>Prakticky:</strong> skvělé vlaky DSB, bezkontaktní platby, výborná angličtina</span>
                  </li>
                </ul>
              </div>
            </header>

            {/* Table of Contents */}
            <nav className="mb-12 rounded-lg border bg-card p-6 shadow-sm" aria-label="Obsah článku">
              <div className="mb-4 flex items-center gap-2">
                <List className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">Obsah článku</h2>
              </div>
              <ul className="grid gap-2 md:grid-cols-2">
                <li>
                  <a href="#fakta" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    → Základní fakta o Dánsku
                  </a>
                </li>
                <li>
                  <a href="#nejvyssi-hora" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    → Nejvyšší hora Dánska
                  </a>
                </li>
                <li>
                  <a href="#proc-jet" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    → Proč navštívit Dánsko
                  </a>
                </li>
                <li>
                  <a href="#kdy-jet" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    → Kdy jet do Dánska
                  </a>
                </li>
                <li>
                  <a href="#doprava" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    → Jak se dostat do Dánska
                  </a>
                </li>
                <li>
                  <a href="#prakticke" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    → Praktické informace
                  </a>
                </li>
                <li>
                  <a href="#kodan" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    → Kodaň jako výchozí bod
                  </a>
                </li>
                <li>
                  <a href="#co-videt" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    → Co vidět v Dánsku
                  </a>
                </li>
                <li>
                  <a href="#kultura" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    → Dánská kultura a jídlo
                  </a>
                </li>
                <li>
                  <a href="#itinerare" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    → Itineráře: jak si poskládat cestu
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    → Často kladené otázky (FAQ)
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
                  alt="Nyhavn - ikonické barevné domky a kanál v Kodani, Dánsko"
                  className="h-auto w-full object-cover"
                  loading="eager"
                />
              </picture>
              <p className="mt-2 text-center text-sm text-muted-foreground">
                Nyhavn, Kodaň - jedno z nejikoničtějších míst Dánska
              </p>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <section id="fakta" className="mb-12">
                <h2 className="mb-4 text-2xl font-bold">Základní fakta o Dánsku</h2>
                <p className="mb-4">
                  Dánsko leží v severní Evropě, je součástí Skandinávie a tvoří ho Jutský poloostrov
                  a více než 400 ostrovů (např. Fyn a Sjælland). Hlavní město je Kodaň, oficiální
                  jazyk dánština, měna dánská koruna (DKK). Samostatně jsme připravili přehled
                  <Link to="/danske-ostrovy"> dánských ostrovů s mapou</Link> a průvodce
                  <Link to="/danstina"> dánštinou a frázemi na cestu</Link>.
                </p>
                <p className="mb-4">
                  Oficiální turistický portál nabízí přehled regionů, inspiraci na itineráře
                  a praktické informace pro plánování.
                </p>
                <p>
                  Hygge, dánský styl pohody a blízkosti, prostupuje kavárnami, interiéry i komunitním
                  životem a je skvělou esencí zdejšího cestování.
                </p>

                <section id="nejvyssi-hora" className="my-8 rounded-2xl border bg-card p-6 shadow-sm">
                  <h2 className="mb-4 text-2xl font-bold">Jaká je nejvyšší hora Dánska?</h2>
                  <p className="mb-4">
                    Nejvyšším <strong>přirozeným bodem vlastního Dánska je Møllehøj</strong> v oblasti
                    Ejer Bjerge ve středním Jutsku. Dosahuje 170,86 metru nad mořem. Spíš než o horu
                    v českém smyslu jde o nenápadný travnatý vrch v zemědělské krajině.
                  </p>
                  <p className="mb-4">
                    Často uváděný Yding Skovhøj měří 172,54 metru pouze se započtením pravěké mohyly
                    na vrcholu. Samotný přirozený terén má 170,77 metru, takže je o devět centimetrů
                    nižší než Møllehøj. Ejer Bavnehøj, známější díky vyhlídkové věži, má 170,35 metru.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Grónsko a Faerské ostrovy jsou autonomní části Dánského království, nikoli území
                    vlastního Dánska. Jejich hory se proto do tohoto srovnání nezapočítávají. Údaje
                    ověřujeme podle VisitDenmark a regionální turistické organizace VisitAarhus.
                  </p>
                </section>

                {/* Mapa Dánska */}
                <ArticleMap
                  lat={56.2639}
                  lng={9.5018}
                  zoom={7}
                  markers={[
                    {
                      lat: 55.6761,
                      lng: 12.5683,
                      title: "Kodaň",
                      description: "Hlavní město Dánska - design, historie, hygge"
                    },
                    {
                      lat: 56.1629,
                      lng: 10.2039,
                      title: "Aarhus",
                      description: "Druhé největší město - kultura a mladá energie"
                    },
                    {
                      lat: 55.4038,
                      lng: 10.4024,
                      title: "Odense",
                      description: "Rodiště H.C. Andersena"
                    },
                    {
                      lat: 55.3282,
                      lng: 8.7640,
                      title: "Ribe",
                      description: "Nejstarší město v Dánsku (rok 705)"
                    },
                    {
                      lat: 57.7209,
                      lng: 10.5797,
                      title: "Skagen",
                      description: "Severní cíp - místo kde se potkávají dvě moře"
                    }
                  ]}
                  caption="Mapa Dánska s hlavními městy a zajímavostmi"
                  height="500px"
                />
              </section>

              <section id="proc-jet" className="mb-12">
                <h2 className="mb-4 text-2xl font-bold">Proč navštívit Dánsko</h2>
                <p className="mb-4">
                  Kombinace bezpečí, udržitelné dopravy, gastronomické scény a rodinných atrakcí
                  dělá z Dánska ideální destinaci na krátké city‑breaky i týdenní roadtrip.
                </p>
                <p className="mb-6">
                  Čekají vás křídové útesy, široké pláže, ikonické hrady, moderní muzea i živá
                  města – to vše dostupné vlakem a veřejnou dopravou.
                </p>

                {/* Image - Møns Klint */}
                <div className="my-8 overflow-hidden rounded-xl shadow-md">
                  <picture>
                    <source srcSet="/images/atterseebook.webp" type="image/webp" />
                    <img
                      src="/images/atterseebook.jpg"
                      alt="Møns Klint - nádherné bílé křídové útesy na ostrově Møn, Dánsko"
                      className="h-auto w-full object-cover"
                      loading="lazy"
                    />
                  </picture>
                  <p className="mt-2 text-center text-sm text-muted-foreground">
                    Møns Klint - breathtaking křídové útesy na ostrově Møn
                  </p>
                </div>
              </section>

              <section id="kdy-jet" className="mb-12">
                <h2 className="mb-4 text-2xl font-bold">Kdy jet do Dánska</h2>
                <p className="mb-4">
                  <strong>Jaro (březen–květen)</strong> je mírné a klidnější,
                  <strong> léto (červen–srpen)</strong> nejživější a ideální pro pobřeží a festivaly,
                  <strong> podzim (září–listopad)</strong> nabízí barevné krajiny a méně davů,
                  <strong> zima (prosinec–únor)</strong> má silnou sváteční atmosféru a hygge interiéry.
                </p>
                <p className="mb-6">
                  Pro outdoor a rodinné parky volte pozdní jaro až léto; pro adventní atmosféru
                  zvažte prosinec s trhy a muzei.
                </p>

                {/* Tabulka počasí */}
                <div className="my-8 overflow-x-auto rounded-lg border bg-card shadow-sm">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-3 text-left font-semibold">Měsíc</th>
                        <th className="p-3 text-center font-semibold">Průměr</th>
                        <th className="p-3 text-center font-semibold">Min–Max</th>
                        <th className="p-3 text-center font-semibold">Srážky</th>
                        <th className="p-3 text-center font-semibold">Slunce</th>
                        <th className="p-3 text-center font-semibold">Období</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:bg-muted/20 transition-colors">
                        <td className="p-3 font-medium">Leden</td>
                        <td className="p-3 text-center font-semibold text-blue-600 dark:text-blue-400">1°C</td>
                        <td className="p-3 text-center text-muted-foreground">-2 až 4°C</td>
                        <td className="p-3 text-center">60 mm</td>
                        <td className="p-3 text-center">1 h</td>
                        <td className="p-3 text-center text-sm">Zima ❄️</td>
                      </tr>
                      <tr className="border-b hover:bg-muted/20 transition-colors">
                        <td className="p-3 font-medium">Únor</td>
                        <td className="p-3 text-center font-semibold text-blue-600 dark:text-blue-400">1°C</td>
                        <td className="p-3 text-center text-muted-foreground">-2 až 4°C</td>
                        <td className="p-3 text-center">48 mm</td>
                        <td className="p-3 text-center">2 h</td>
                        <td className="p-3 text-center text-sm">Zima 🌨️</td>
                      </tr>
                      <tr className="border-b hover:bg-muted/20 transition-colors">
                        <td className="p-3 font-medium">Březen</td>
                        <td className="p-3 text-center font-semibold text-cyan-600 dark:text-cyan-400">3°C</td>
                        <td className="p-3 text-center text-muted-foreground">-1 až 8°C</td>
                        <td className="p-3 text-center">58 mm</td>
                        <td className="p-3 text-center">4 h</td>
                        <td className="p-3 text-center text-sm">Jaro 🌱</td>
                      </tr>
                      <tr className="border-b hover:bg-muted/20 transition-colors">
                        <td className="p-3 font-medium">Duben</td>
                        <td className="p-3 text-center font-semibold text-teal-600 dark:text-teal-400">7°C</td>
                        <td className="p-3 text-center text-muted-foreground">2 až 13°C</td>
                        <td className="p-3 text-center">56 mm</td>
                        <td className="p-3 text-center">6 h</td>
                        <td className="p-3 text-center text-sm">Jaro 🌸</td>
                      </tr>
                      <tr className="border-b bg-green-50/50 dark:bg-green-950/20 hover:bg-green-100/50 dark:hover:bg-green-900/30 transition-colors">
                        <td className="p-3 font-medium">Květen</td>
                        <td className="p-3 text-center font-bold text-green-700 dark:text-green-400">12°C</td>
                        <td className="p-3 text-center text-muted-foreground">7 až 18°C</td>
                        <td className="p-3 text-center">56 mm</td>
                        <td className="p-3 text-center">8 h</td>
                        <td className="p-3 text-center text-sm font-semibold text-green-700 dark:text-green-400">Ideální ✨</td>
                      </tr>
                      <tr className="border-b bg-green-50/50 dark:bg-green-950/20 hover:bg-green-100/50 dark:hover:bg-green-900/30 transition-colors">
                        <td className="p-3 font-medium">Červen</td>
                        <td className="p-3 text-center font-bold text-green-700 dark:text-green-400">15°C</td>
                        <td className="p-3 text-center text-muted-foreground">10 až 21°C</td>
                        <td className="p-3 text-center">64 mm</td>
                        <td className="p-3 text-center">9 h</td>
                        <td className="p-3 text-center text-sm font-semibold text-green-700 dark:text-green-400">Ideální ☀️</td>
                      </tr>
                      <tr className="border-b bg-green-50/50 dark:bg-green-950/20 hover:bg-green-100/50 dark:hover:bg-green-900/30 transition-colors">
                        <td className="p-3 font-medium">Červenec</td>
                        <td className="p-3 text-center font-bold text-green-700 dark:text-green-400">18°C</td>
                        <td className="p-3 text-center text-muted-foreground">13 až 23°C</td>
                        <td className="p-3 text-center">74 mm</td>
                        <td className="p-3 text-center">9 h</td>
                        <td className="p-3 text-center text-sm font-semibold text-green-700 dark:text-green-400">Léto 🏖️</td>
                      </tr>
                      <tr className="border-b bg-green-50/50 dark:bg-green-950/20 hover:bg-green-100/50 dark:hover:bg-green-900/30 transition-colors">
                        <td className="p-3 font-medium">Srpen</td>
                        <td className="p-3 text-center font-bold text-green-700 dark:text-green-400">17°C</td>
                        <td className="p-3 text-center text-muted-foreground">12 až 22°C</td>
                        <td className="p-3 text-center">68 mm</td>
                        <td className="p-3 text-center">8 h</td>
                        <td className="p-3 text-center text-sm font-semibold text-green-700 dark:text-green-400">Léto 🌊</td>
                      </tr>
                      <tr className="border-b hover:bg-muted/20 transition-colors">
                        <td className="p-3 font-medium">Září</td>
                        <td className="p-3 text-center font-semibold text-amber-600 dark:text-amber-400">14°C</td>
                        <td className="p-3 text-center text-muted-foreground">9 až 19°C</td>
                        <td className="p-3 text-center">64 mm</td>
                        <td className="p-3 text-center">6 h</td>
                        <td className="p-3 text-center text-sm">Podzim 🍂</td>
                      </tr>
                      <tr className="border-b hover:bg-muted/20 transition-colors">
                        <td className="p-3 font-medium">Říjen</td>
                        <td className="p-3 text-center font-semibold text-orange-600 dark:text-orange-400">10°C</td>
                        <td className="p-3 text-center text-muted-foreground">5 až 15°C</td>
                        <td className="p-3 text-center">72 mm</td>
                        <td className="p-3 text-center">3 h</td>
                        <td className="p-3 text-center text-sm">Podzim 🍁</td>
                      </tr>
                      <tr className="border-b hover:bg-muted/20 transition-colors">
                        <td className="p-3 font-medium">Listopad</td>
                        <td className="p-3 text-center font-semibold text-slate-600 dark:text-slate-400">5°C</td>
                        <td className="p-3 text-center text-muted-foreground">1 až 10°C</td>
                        <td className="p-3 text-center">71 mm</td>
                        <td className="p-3 text-center">1 h</td>
                        <td className="p-3 text-center text-sm">Zima 🌧️</td>
                      </tr>
                      <tr className="hover:bg-muted/20 transition-colors">
                        <td className="p-3 font-medium">Prosinec</td>
                        <td className="p-3 text-center font-semibold text-blue-600 dark:text-blue-400">2°C</td>
                        <td className="p-3 text-center text-muted-foreground">-2 až 6°C</td>
                        <td className="p-3 text-center">60 mm</td>
                        <td className="p-3 text-center">1 h</td>
                        <td className="p-3 text-center text-sm">Advent 🎄</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="mt-4 text-sm text-muted-foreground italic">
                  💡 <strong>Nejlepší období:</strong> Květen až srpen (12–18°C průměrně, až 8–9 hodin slunce denně).
                  Pro zimní atmosféru a adventní trhy navštivte prosinec.
                </p>
              </section>

              <section id="doprava" className="mb-12">
                <h2 className="mb-6 text-2xl font-bold">Jak se dostat do Dánska</h2>
                <p className="mb-6">
                  Z České republiky se do Dánska dostanete třemi hlavními způsoby: letadlem (nejrychlejší),
                  vlakem (nejpohodlnější) nebo autobusem (nejlevnější). Každá varianta má své výhody.
                </p>

                <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                  <Plane className="h-6 w-6 text-primary" />
                  Letadlem (nejrychlejší)
                </h3>
                <div className="mb-8 rounded-lg border bg-card p-6">
                  <h4 className="mb-3 font-semibold">Praha → Kodaň (Kastrup - CPH)</h4>
                  <ul className="mb-4 space-y-2">
                    <li><strong>Doba letu:</strong> 1 hodina 20 minut</li>
                    <li><strong>Frekvence:</strong> 5× denně</li>
                    <li><strong>Cena:</strong> 210–1100 Kč (levněji při předem objednávce)</li>
                    <li><strong>Společnosti:</strong> SAS, Norwegian Air, Lufthansa, Wizz Air</li>
                  </ul>
                  <p className="mb-6 text-sm text-muted-foreground">
                    Po příletu pokračujte podle našeho přehledu{" "}
                    <Link to="/clanek/letiste-kodan-kastrup-doprava-do-centra">
                      dopravy z letiště Kodaň do centra
                    </Link>.
                  </p>

                  <h4 className="mb-3 font-semibold">Praha → Aalborg (severní Dánsko)</h4>
                  <ul className="mb-4 space-y-2">
                    <li><strong>Doba letu:</strong> 1 hodina 25 minut (přímý let)</li>
                    <li><strong>Cena:</strong> 650–1900 Kč</li>
                    <li><strong>Výhoda:</strong> Ideální pro severní Jutsko (Skagen, Rubjerg Knude)</li>
                  </ul>

                  <h4 className="mb-3 font-semibold">Praha → Billund (LEGO Land)</h4>
                  <ul className="space-y-2">
                    <li><strong>Doba:</strong> 2 hodiny 15 minut (obvykle s přestupy)</li>
                    <li><strong>Cena:</strong> 800–1500 Kč</li>
                    <li><strong>Výhoda:</strong> Přímo k LEGO Landu a LEGO House</li>
                  </ul>
                </div>

                <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                  <Train className="h-6 w-6 text-primary" />
                  Vlakem (nejpohodlnější)
                </h3>
                <div className="mb-8 rounded-lg border bg-card p-6">
                  <h4 className="mb-3 font-semibold">Praha → Kodaň (přes Hamburg)</h4>
                  <ul className="mb-4 space-y-2">
                    <li><strong>Doba jízdy:</strong> 15–16 hodin (1 přestup v Hamburku)</li>
                    <li><strong>Cena:</strong> 600–1200 Kč (Early Bird na ČD e-shopu)</li>
                    <li><strong>Odjezd:</strong> Praha hlavní nádraží</li>
                    <li><strong>Příjezd:</strong> København H (centrální nádraží)</li>
                    <li><strong>Trasa:</strong> Praha → Hamburg (cca 6h) → Kodaň (cca 5–6h)</li>
                  </ul>
                  <p className="text-sm text-muted-foreground">
                    <strong>Výhody:</strong> Pohodlné EuroCity vlaky, možnost spánku, prostor na batožinu,
                    výhledy krajinou. <strong>Kde koupit:</strong> České dráhy e-shop, ÖBB, Omio, Trainline.
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground">
                    <strong>Alternativa přes Berlín:</strong> Praha → Berlín → Hamburg → Kodaň (15 hodin, 2 přestupy)
                  </p>
                </div>

                <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                  <Bus className="h-6 w-6 text-primary" />
                  Autobusem (nejlevnější)
                </h3>
                <div className="rounded-lg border bg-card p-6">
                  <p className="mb-4">
                    Autobus je nejlevnější varianta, ale nejdelší. Společnosti jako FlixBus nabízejí
                    spojení Praha → Kodaň s přestupy, obvykle přes Německo.
                  </p>
                  <ul className="space-y-2">
                    <li><strong>Doba jízdy:</strong> 16–20 hodin (dle přestupů)</li>
                    <li><strong>Cena:</strong> 300–800 Kč (výrazně levnější než letadlo)</li>
                    <li><strong>Výhoda:</strong> Nízká cena, přímá linka nebo s jedním přestupem</li>
                  </ul>
                </div>
              </section>

              <section id="prakticke" className="mb-12">
                <h2 className="mb-6 text-2xl font-bold">Praktické informace</h2>

                <h3 className="mb-3 text-xl font-semibold">Vstup, bezpečnost, zdraví</h3>
                <p className="mb-6">
                  Dánsko je v EU/Schengenu; cestování z ČR je bezvízové s platným dokladem.
                  Země patří k bezpečným, zdravotní péče je na vysoké úrovni.
                </p>

                <h3 className="mb-3 text-xl font-semibold">Peníze a platby</h3>
                <p className="mb-6">
                  Měna je DKK; bezkontaktní karty jsou široce přijímány. Počítejte s vyšší
                  cenovou hladinou než ve střední Evropě.
                </p>

                <h3 className="mb-3 text-xl font-semibold">Jazyk a komunikace</h3>
                <p className="mb-6">
                  Dominuje dánština, ale angličtina je běžně výborná – domluva je snadná
                  v dopravě, ubytování i gastronomii. Základní fráze, abecedu a výslovnost najdete
                  v průvodci <Link to="/danstina">jak se mluví v Dánsku</Link>.
                </p>

                <h3 className="mb-3 text-xl font-semibold">Doprava po zemi</h3>
                <p className="mb-4">
                  Vnitrostátní železnice DSB spolehlivě propojuje města a regiony; jízdní
                  řády a nákup jízdenek online.
                </p>
                <p className="mb-6">
                  Ve městech funguje kombinace metra, vlaků a autobusů; cyklistika je
                  populární a infrastruktura kvalitní.
                </p>

                {/* Image - Train Station */}
                <div className="my-8 overflow-hidden rounded-xl shadow-md">
                  <picture>
                    <source srcSet="/images/IMG_20230712_091836.webp" type="image/webp" />
                    <img
                      src="/images/IMG_20230712_091836.jpg"
                      alt="Hlavní vlakové nádraží v Kodani - historická architektura"
                      className="h-auto w-full object-cover"
                      loading="lazy"
                    />
                  </picture>
                  <p className="mt-2 text-center text-sm text-muted-foreground">
                    Historické vlakové nádraží v Kodani - krásná architektura a skvělé spojení
                  </p>
                </div>

                <h3 className="mb-3 text-xl font-semibold">Příjezd letecky</h3>
                <p>
                  Hlavní bránou je Copenhagen Airport (CPH); do centra jezdí metro i vlaky
                  v krátkých intervalech, s jasným značením.
                </p>
              </section>

              <section id="kodan" className="mb-12">
                <h2 className="mb-4 text-2xl font-bold">Kodaň jako hlavní výchozí bod</h2>
                <p className="mb-4">
                  Kodaň je moderní, udržitelná metropole s přátelskou atmosférou, excelentní
                  gastronomií a královskými památkami; z hlediska logistiky je nejlepším
                  startem/koncem cesty po Dánsku.
                </p>

                {/* Image - Little Mermaid */}
                <div className="my-8 overflow-hidden rounded-xl shadow-md">
                  <picture>
                    <source srcSet="/images/IMG_20230711_085341.webp" type="image/webp" />
                    <img
                      src="/images/IMG_20230711_085341.jpg"
                      alt="Malá mořská víla - ikonická socha v Kodani, Dánsko"
                      className="h-auto w-full object-cover"
                      loading="lazy"
                    />
                  </picture>
                  <p className="mt-2 text-center text-sm text-muted-foreground">
                    Malá mořská víla - symbol Kodaně
                  </p>
                </div>

                <p>
                  Mezi největší „must‑see" patří Nyhavn, Tivoli, Amalienborg, Christiansborg,
                  Rosenborg, Rundetårn a kulturní čtvrti s kavárnami a designem. Jednotlivá místa
                  jsme seskupili do navazujících tras v průvodci{" "}
                  <Link to="/kodan">co vidět v Kodani při první návštěvě</Link>.
                </p>
              </section>

              <section id="co-videt" className="mb-12">
                <h2 className="mb-6 text-2xl font-bold">Co vidět v Dánsku (mimo Kodaň)</h2>

                <h3 className="mb-4 text-xl font-semibold">Přírodní krásy</h3>
                <ul className="mb-6 space-y-2">
                  <li><strong>Møns Klint</strong> – křídové útesy s vyhlídkami a stezkami po pobřeží</li>
                  <li><strong>Stevns Klint</strong> – dramatické útesy a geologická lokalita s příběhem doby ledové</li>
                  <li><strong>Rubjerg Knude</strong> – putující duna a maják vysoko nad mořem</li>
                  <li><strong>Severozápadní Jutsko</strong> – duny, pláže, setkání moří u Skagenu</li>
                </ul>
                <p className="mb-6">
                  Pokud chcete pobřeží spojit do delší trasy, využijte náš přehled
                  <Link to="/danske-ostrovy"> dánských ostrovů, mapy a dopravy</Link>.
                </p>

                {/* Image - Troll */}
                <div className="my-8 overflow-hidden rounded-xl shadow-md">
                  <picture>
                    <source srcSet="/images/20240811_160639.webp" type="image/webp" />
                    <img
                      src="/images/20240811_160639.jpg"
                      alt="Dřevěný troll - kouzelná zahradní socha v Dánsku"
                      className="h-auto w-full object-cover"
                      loading="lazy"
                    />
                  </picture>
                  <p className="mt-2 text-center text-sm text-muted-foreground">
                    Magický dřevěný troll - unikátní dánská zahradní umění
                  </p>
                </div>

                <h3 className="mb-4 text-xl font-semibold">Historie a památky</h3>
                <ul className="mb-6 space-y-2">
                  <li><strong>Frederiksborg</strong> – renesanční zámek se zahradami v Hillerødu</li>
                  <li><strong>Kronborg</strong> – „Hamletův hrad" v Helsingoøru, pevnost UNESCO</li>
                  <li><strong>Egeskov</strong> – vodní hrad na Fynu, ideální i pro rodiny</li>
                  <li><strong>Ribe</strong> – nejstarší město v Dánsku s vikingským dědictvím</li>
                </ul>

                <h3 className="mb-4 text-xl font-semibold">Rodina a zábava</h3>
                <ul className="mb-6 space-y-2">
                  <li><strong>LEGOLAND Billund</strong> – tematický park pro všechny věkové kategorie</li>
                  <li><strong>LEGO House</strong> – interaktivní centrum kreativity v Billundu</li>
                  <li><strong>Lalandia Billund</strong> – aquapark a rekreační areál</li>
                </ul>

                {/* Image - LEGO */}
                <div className="my-8 overflow-hidden rounded-xl shadow-md">
                  <picture>
                    <source srcSet="/images/IMG_20230711_114209.webp" type="image/webp" />
                    <img
                      src="/images/IMG_20230711_114209.jpg"
                      alt="LEGO Friends postavičky v LEGO House, Billund, Dánsko"
                      className="h-auto w-full object-cover"
                      loading="lazy"
                    />
                  </picture>
                  <p className="mt-2 text-center text-sm text-muted-foreground">
                    LEGO Friends v LEGO House - interaktivní zážitek v Billundu
                  </p>
                </div>
              </section>

              <section id="kultura" className="mb-12">
                <h2 className="mb-4 text-2xl font-bold">Dánská kultura, hygge a jídlo</h2>
                <p className="mb-4">
                  Hygge vystihuje pohodlí, klid a blízkost – často u stolu s přáteli nebo při
                  obyčejném zastavení. Podrobně vysvětlujeme,{" "}
                  <Link to="/hygge">co je hygge, co znamená a jak se vyslovuje</Link>.
                </p>
                <p>
                  Ochutnejte smørrebrød (otevřené sendviče), frikadeller (karbanátky)
                  a wienerbrød; kavárny a pekárny jsou tu radostný rituál.
                </p>
              </section>

              <section id="itinerare" className="mb-12">
                <h2 className="mb-6 text-2xl font-bold">Itineráře: jak si poskládat cestu</h2>

                <h3 className="mb-3 text-xl font-semibold">3–4 dny s Kodaní jako základem</h3>
                <p className="mb-6">
                  Den 1–2 Kodaň, poté Billund (LEGOLAND/LEGO House) a jeden přírodní highlight
                  (Møns či Stevns Klint) – vyvážený mix města, rodinné zábavy a přírody.
                </p>

                <h3 className="mb-3 text-xl font-semibold">Týden v Dánsku</h3>
                <p>
                  Okruh: Kodaň → severní Sjælland (Kronborg/Frederiksborg) → Fyn (Egeskov, Odense)
                  → západní Jutsko (duny, pláže, Skagen) → návrat; kombinace hradů, přírody a měst.
                </p>
              </section>

              <section id="faq" className="mb-12">
                <h2 className="mb-6 text-2xl font-bold">Často kladené otázky (FAQ)</h2>

                <details className="group mb-4 rounded-lg border bg-card p-4 transition-all hover:shadow-md">
                  <summary className="cursor-pointer font-semibold text-lg list-none flex items-center justify-between">
                    <span>Kdy je nejlepší doba na návštěvu?</span>
                    <span className="text-primary transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <p className="mt-4 text-muted-foreground">
                    Léto má nejvíce akcí a nejstabilnější počasí, jaro a podzim jsou klidnější,
                    zima láká na advent a hygge.
                  </p>
                </details>

                <details className="group mb-4 rounded-lg border bg-card p-4 transition-all hover:shadow-md">
                  <summary className="cursor-pointer font-semibold text-lg list-none flex items-center justify-between">
                    <span>Jaká je nejvyšší hora Dánska?</span>
                    <span className="text-primary transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <p className="mt-4 text-muted-foreground">
                    Nejvyšším přirozeným bodem je Møllehøj s výškou 170,86 metru. Yding Skovhøj je
                    vyšší pouze se započtením pravěké mohyly na vrcholu.
                  </p>
                </details>

                <details className="group mb-4 rounded-lg border bg-card p-4 transition-all hover:shadow-md">
                  <summary className="cursor-pointer font-semibold text-lg list-none flex items-center justify-between">
                    <span>Jak se pohybovat po Dánsku?</span>
                    <span className="text-primary transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <p className="mt-4 text-muted-foreground">
                    Využijte vlaky DSB pro delší přesuny, ve městech metro/busy/vlaky; jízdenky
                    pořídíte online a v automatech.
                  </p>
                </details>

                <details className="group mb-4 rounded-lg border bg-card p-4 transition-all hover:shadow-md">
                  <summary className="cursor-pointer font-semibold text-lg list-none flex items-center justify-between">
                    <span>Je Dánsko drahé?</span>
                    <span className="text-primary transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <p className="mt-4 text-muted-foreground">
                    Celkově vyšší cenová hladina; šetřit lze volbou mimo špičku, vařením,
                    kartami na MHD a kombinací vlak+kolo.
                  </p>
                </details>

                <details className="group mb-4 rounded-lg border bg-card p-4 transition-all hover:shadow-md">
                  <summary className="cursor-pointer font-semibold text-lg list-none flex items-center justify-between">
                    <span>Potřebuji vízum?</span>
                    <span className="text-primary transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <p className="mt-4 text-muted-foreground">
                    Občané EU/Schengenu necestují do Dánska s vízy, stačí platný doklad totožnosti.
                  </p>
                </details>

                <details className="group mb-4 rounded-lg border bg-card p-4 transition-all hover:shadow-md">
                  <summary className="cursor-pointer font-semibold text-lg list-none flex items-center justify-between">
                    <span>Jak z letiště CPH do centra?</span>
                    <span className="text-primary transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <p className="mt-4 text-muted-foreground">
                    Metro M2 a vlaky jezdí často, cesta je rychlá a dobře značená; jízdenky
                    v automatech i online.
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
                      aria-label="Iniciály Pavly Zimmermannové"
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
                      Dánsko mám ráda a vracím se sem pro kombinaci klidu, přírody, designu a laskavé atmosféry.
                      S láskou k severské kultuře a hygge filosofii vám přináším praktické tipy a inspiraci
                      pro vaše cesty po Dánsku.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3 md:justify-start">
                      <a
                        href="mailto:zimmermannovap@gmail.com"
                        className="inline-flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
                      >
                        📧 Kontakt
                      </a>
                      <Link
                        to="/clanky"
                        className="inline-flex items-center gap-2 rounded-lg bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/80"
                      >
                        📝 Další články
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-16 grid gap-6 md:grid-cols-2">
              <div className="rounded-lg bg-gradient-card p-8">
                <h3 className="mb-4 text-2xl font-bold">Přečtěte si naše články</h3>
                <p className="mb-6 text-muted-foreground">
                  Objevte zajímavé články o dánské kultuře, cestování a životním stylu hygge.
                </p>
                <Link to="/clanky">
                  <Button>
                    Prohlédnout články
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>

              <div className="rounded-lg bg-gradient-card p-8">
                <h3 className="mb-4 text-2xl font-bold">Najděte ubytování</h3>
                <p className="mb-6 text-muted-foreground">
                  Hledáte místo k pobytu? Prozkoumejte naši nabídku hotelů, apartmánů a hostelů.
                </p>
                <Link to="/ubytovani">
                  <Button variant="outline">
                    Zobrazit ubytování
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
