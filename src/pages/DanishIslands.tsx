import { Link } from "react-router-dom";
import { ArrowRight, Bike, ExternalLink, MapPinned, Mountain, Ship, Waves } from "lucide-react";
import { Helmet } from "react-helmet-async";
import Breadcrumbs from "@/components/Breadcrumbs";
import ArticleMap from "@/components/ArticleMap";
import { Button } from "@/components/ui/button";

const PAGE_URL = "https://kastrup.cz/danske-ostrovy";
const PAGE_TITLE = "Dánské ostrovy: kam jet a co vidět | Kastrup.cz";
const PAGE_DESCRIPTION =
  "Dánské ostrovy přehledně: Sjælland, Fyn, Møn, Bornholm, Samsø, Ærø, Fanø a Rømø. Mapa, doprava a výběr ostrova podle typu cesty.";
const PUBLISHED_DATE = "2026-09-13";
const HERO_IMAGE = "https://kastrup.cz/images/20240811_202640.jpg";

const islands = [
  { name: "Sjælland", lat: 55.55, lng: 11.75, area: "Kodaň, hrady a pobřeží" },
  { name: "Fyn", lat: 55.31, lng: 10.36, area: "Odense a ostrovní jih" },
  { name: "Møn", lat: 54.98, lng: 12.35, area: "Křídové útesy" },
  { name: "Bornholm", lat: 55.13, lng: 14.91, area: "Skály, pláže a cyklistika" },
  { name: "Samsø", lat: 55.86, lng: 10.59, area: "Klid a kolo" },
  { name: "Ærø", lat: 54.87, lng: 10.35, area: "Přístavní městečka" },
  { name: "Fanø", lat: 55.41, lng: 8.41, area: "Wattové moře" },
  { name: "Rømø", lat: 55.14, lng: 8.52, area: "Široké pláže" },
];

const faqs = [
  {
    question: "Kolik má Dánsko ostrovů?",
    answer:
      "Národní turistická organizace VisitDenmark uvádí 444 pojmenovaných ostrovů. Počet se může v různých statistikách lišit podle minimální velikosti a způsobu počítání. Pro cestovatele je důležité, že velké ostrovy spojují mosty a menší obsluhují trajekty.",
  },
  {
    question: "Který dánský ostrov je nejlepší na první cestu?",
    answer:
      "Pro městskou cestu zvolte Sjælland s Kodaní, pro kombinaci Odense, hradů a venkova Fyn. Møn je nejlepší na krátký výlet za útesy, Bornholm na delší aktivní dovolenou a Ærø nebo Samsø na pomalé ostrovní tempo.",
  },
  {
    question: "Jaký je největší ostrov Dánska?",
    answer:
      "Největším ostrovem vlastního Dánska je Sjælland, na němž leží Kodaň. Grónsko je autonomní součást Dánského království, ale není součástí vlastního Dánska a do tohoto srovnání se nezapočítává.",
  },
  {
    question: "Potřebuji na dánské ostrovy auto?",
    answer:
      "Na Sjælland a Fyn se snadno dostanete vlakem a veřejná doprava obslouží hlavní města. Na malých ostrovech se hodí kolo. Auto dává smysl při cestě na více odlehlých míst, ale na řadě trajektů znamená dražší rezervaci a menší flexibilitu.",
  },
];

const DanishIslands = () => {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${PAGE_URL}#article`,
    headline: "Dánské ostrovy: které vybrat, co vidět a jak se tam dostat",
    description: PAGE_DESCRIPTION,
    image: HERO_IMAGE,
    datePublished: PUBLISHED_DATE,
    dateModified: PUBLISHED_DATE,
    inLanguage: "cs-CZ",
    articleSection: "Cestování",
    keywords: ["dánské ostrovy", "Dánsko ostrovy", "dánský ostrov", "Fyn"],
    author: {
      "@type": "Person",
      name: "Pavla Zimmermannová",
      url: "https://kastrup.cz/autorka",
    },
    publisher: {
      "@type": "Organization",
      name: "Kastrup.cz",
      url: "https://kastrup.cz",
      logo: { "@type": "ImageObject", url: "https://kastrup.cz/icon-512.svg" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Domů", item: "https://kastrup.cz/" },
      { "@type": "ListItem", position: 2, name: "O Dánsku", item: "https://kastrup.cz/o-dansku" },
      { "@type": "ListItem", position: 3, name: "Dánské ostrovy", item: PAGE_URL },
    ],
  };

  return (
    <>
      <Helmet>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:title" content="Dánské ostrovy: který vybrat pro svou cestu" />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:image" content={HERO_IMAGE} />
        <meta property="og:locale" content="cs_CZ" />
        <meta property="og:site_name" content="Kastrup.cz" />
        <meta property="article:published_time" content={PUBLISHED_DATE} />
        <meta property="article:modified_time" content={PUBLISHED_DATE} />
        <meta property="article:section" content="Cestování" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dánské ostrovy: kam jet a co vidět" />
        <meta name="twitter:description" content={PAGE_DESCRIPTION} />
        <meta name="twitter:image" content={HERO_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <div className="min-h-screen py-10 md:py-12">
        <article className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-5xl">
            <Breadcrumbs items={[{ label: "O Dánsku", href: "/o-dansku" }, { label: "Dánské ostrovy" }]} />

            <header className="mx-auto mb-10 max-w-4xl text-center">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Ostrovní průvodce s mapou
              </p>
              <h1 className="mb-6 text-4xl font-bold md:text-6xl">
                Dánské ostrovy: které vybrat, co vidět a jak se tam dostat
              </h1>
              <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                Dánsko není jeden kus pevniny obklopený mořem. Je to Jutsko a stovky ostrovů,
                které se liší krajinou, tempem i způsobem dopravy. Vyberte si podle typu cesty.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                <span>Autor: <Link to="/autorka" className="font-medium text-foreground hover:text-primary">Pavla Zimmermannová</Link></span>
                <span aria-hidden="true">•</span>
                <time dateTime={PUBLISHED_DATE}>13. září 2026</time>
                <span aria-hidden="true">•</span>
                <span>9 minut čtení</span>
              </div>
            </header>

            <figure className="mb-10 overflow-hidden rounded-3xl border bg-card shadow-large">
              <img
                src="/images/20240811_202640.jpg"
                alt="Dánské pobřeží při západu slunce"
                width="1400"
                height="1050"
                className="aspect-[16/9] w-full object-cover"
              />
              <figcaption className="px-5 py-3 text-sm text-muted-foreground">
                Moře není v Dánsku kulisa. Určuje dopravu, krajinu i rytmus jednotlivých ostrovů.
              </figcaption>
            </figure>

            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
              <div className="prose prose-lg max-w-none prose-headings:scroll-mt-24">
                <section className="not-prose mb-10 rounded-2xl border-l-4 border-primary bg-primary/5 p-6 md:p-7">
                  <h2 className="mb-3 text-xl font-bold">Dánské ostrovy v kostce</h2>
                  <p className="leading-relaxed text-foreground">
                    Na první městskou cestu zvolte <strong>Sjælland</strong> s Kodaní. Pro Odense, zámky a
                    klidnější venkov se hodí <strong>Fyn</strong>. Na přírodu vyberte <strong>Møn</strong>,
                    Bornholm nebo ostrovy Wattového moře. Na pomalou cyklistickou dovolenou jsou výborné
                    <strong> Samsø a Ærø</strong>.
                  </p>
                </section>

                <h2 id="kolik-ostrovu">Kolik má Dánsko ostrovů?</h2>
                <p>
                  VisitDenmark uvádí <strong>444 pojmenovaných ostrovů</strong>. V různých geografických
                  statistikách se můžete setkat s jiným číslem, protože záleží na minimální ploše a metodě
                  počítání. Pro plánování cesty je podstatnější, že velké ostrovy propojují mosty a vlaky,
                  zatímco malé ostrovy mají trajekty s jízdním řádem přizpůsobeným místním obyvatelům.
                </p>
                <p>
                  Grónsko a Faerské ostrovy jsou autonomní části Dánského království. Nejsou však součástí
                  vlastního Dánska, a proto je do tohoto cestovatelského přehledu nemícháme.
                </p>

                <h2 id="mapa">Mapa dánských ostrovů pro první cestu</h2>
                <p>
                  Mapa neukazuje všech 444 ostrovů. Zvýrazňuje místa, která dávají smysl při první nebo
                  druhé cestě a lze je spojit s městem, pobřežím nebo cyklistikou.
                </p>
                <div className="not-prose my-8">
                  <ArticleMap
                    lat={55.65}
                    lng={10.7}
                    zoom={6}
                    markers={islands.map((island) => ({
                      lat: island.lat,
                      lng: island.lng,
                      title: island.name,
                      description: island.area,
                    }))}
                    caption="Mapa vybraných dánských ostrovů"
                    height="520px"
                  />
                </div>

                <h2 id="prehled">Který dánský ostrov vybrat?</h2>
                <div className="not-prose my-7 grid gap-4 sm:grid-cols-2">
                  {[
                    [MapPinned, "Sjælland", "Kodaň, Kronborg, severní pobřeží a jednodenní výlety bez auta."],
                    [Bike, "Fyn", "Odense, Egeskov, vesnice a dobrý výchozí bod pro jižní souostroví."],
                    [Mountain, "Møn", "Møns Klint, lesy, pobřežní stezky a tmavá noční obloha."],
                    [Waves, "Bornholm", "Skalnaté pobřeží, písečné pláže, kruhové kostely a delší pobyt."],
                    [Bike, "Samsø a Ærø", "Menší ostrovy pro kolo, přístavní městečka a pomalejší cestu."],
                    [Ship, "Fanø a Rømø", "Široké pláže, duny a krajina Wattového moře."],
                  ].map(([Icon, title, text]) => (
                    <section key={title as string} className="rounded-2xl border bg-card p-5">
                      <Icon className="mb-3 h-7 w-7 text-primary" aria-hidden="true" />
                      <h3 className="mb-2 text-lg font-semibold">{title as string}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">{text as string}</p>
                    </section>
                  ))}
                </div>

                <h2 id="sjaelland">Sjælland: nejlepší začátek s Kodaní</h2>
                <p>
                  Sjælland je největší ostrov vlastního Dánska a přirozená volba při prvním příletu.
                  Kromě <Link to="/kodan">Kodaně a jejích památek</Link> nabízí severní pobřeží, hrady
                  Kronborg a Frederiksborg, muzeum Louisiana a útesy Stevns Klint. Z letiště i hlavního
                  nádraží lze velkou část těchto míst navštívit vlakem.
                </p>

                <h2 id="fyn">Fyn: dánský ostrov pro města, zámky i kolo</h2>
                <p>
                  Fyn leží mezi Sjællandem a Jutskem a přes Velký Belt je spojen se Sjællandem železničním
                  a silničním mostem. Hlavním bodem je Odense, rodiště H. C. Andersena. Na jihu ostrova
                  navazuje souostroví s menšími přístavy, trajekty a trasami vhodnými pro kolo.
                </p>
                <p>
                  Pro první pobyt spojte Odense, zámek Egeskov a jeden den u moře. Nesnažte se během
                  víkendu objet zároveň Fyn, Ærø a Langeland — jízdní řády trajektů určují tempo víc než mapa.
                </p>

                <h2 id="mon">Møn: křídové útesy a krátký přírodní výlet</h2>
                <p>
                  Møn je známý především útesy Møns Klint. Hodí se na jednodenní výlet nebo jednu noc,
                  ale bez auta vyžaduje pečlivější plánování. V hlavní sezoně kontrolujte návaznost autobusů
                  a mimo sezonu počítejte s řidší dopravou.
                </p>

                <p>
                  Ceny parkování, schodiště na pláž a provoz GeoCenteru najdete v článku{" "}
                  <Link to="/clanek/mons-klint">Møns Klint autem</Link>.
                </p>

                <h2 id="bornholm">Bornholm: ostrov na samostatnou dovolenou</h2>
                <p>
                  Bornholm neleží „kousek vedle Kodaně“ — v Baltském moři je blíž jižnímu Švédsku.
                  Nabízí skalnatý sever, písečný jih, cyklotrasy, kruhové kostely a zříceninu Hammershus.
                  Dává smysl alespoň na tři až čtyři dny. Cestuje se sem letecky nebo přes trajekt do Rønne;
                  konkrétní spojení je nutné ověřit pro zvolený termín.
                </p>

                <h2 id="mensi">Samsø, Ærø, Fanø a Rømø: méně programu, více ostrova</h2>
                <p>
                  Samsø je vhodné pro cyklistiku a venkovskou krajinu. Ærø spojuje malé přístavy, barevné
                  domy a jižní Fyn. Fanø a Rømø leží u západního pobřeží Jutska v oblasti Wattového moře,
                  kde je nutné respektovat příliv, vítr a místní pravidla pohybu v chráněné krajině.
                </p>

                <h2 id="doprava">Most, trajekt, vlak nebo kolo?</h2>
                <p>
                  Při cestě autem porovnejte <Link to="/clanek/mosty-v-dansku">ceny mostů Storebælt a Øresund</Link>.
                  Pokud do itineráře přidáváte i jihozápadní Jutsko, využijte průvodce{" "}
                  <Link to="/clanek/ribe">parkováním a procházkou v Ribe</Link>.
                </p>
                <ul>
                  <li><strong>Sjælland a Fyn:</strong> nejjednodušší je vlak; spojení vede přes most přes Velký Belt.</li>
                  <li><strong>Møn:</strong> největší flexibilitu dává auto; veřejná doprava vyžaduje plán.</li>
                  <li><strong>Bornholm:</strong> let nebo trajekt, často přes švédský Ystad.</li>
                  <li><strong>Malé ostrovy:</strong> trajekt rezervujte předem hlavně s autem; pěší a cyklisté mají více možností.</li>
                  <li><strong>Aktuální časy:</strong> kontrolujte u konkrétního dopravce, protože sezonní řády se mění.</li>
                </ul>

                <h2 id="faq">Časté otázky o dánských ostrovech</h2>
                {faqs.map((faq) => (
                  <details key={faq.question} className="not-prose group mb-4 rounded-2xl border bg-card p-5">
                    <summary className="cursor-pointer list-none font-semibold">{faq.question}</summary>
                    <p className="mt-3 leading-relaxed text-muted-foreground">{faq.answer}</p>
                  </details>
                ))}

                <h2 id="zdroje">Ověřené zdroje</h2>
                <ul>
                  <li>
                    <a href="https://www.visitdenmark.com/denmark/destinations/danish-islands" target="_blank" rel="noreferrer">
                      VisitDenmark: Danish islands <ExternalLink className="inline h-4 w-4" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.visitdenmark.com/faq/geography" target="_blank" rel="noreferrer">
                      VisitDenmark: Geography <ExternalLink className="inline h-4 w-4" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.dst.dk/en" target="_blank" rel="noreferrer">
                      Statistics Denmark <ExternalLink className="inline h-4 w-4" aria-hidden="true" />
                    </a>
                  </li>
                </ul>
              </div>

              <aside className="space-y-5 lg:sticky lg:top-24">
                <nav className="rounded-2xl border bg-card p-5" aria-label="Obsah stránky">
                  <p className="mb-3 font-semibold">V článku</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><a href="#kolik-ostrovu" className="hover:text-primary">Kolik má Dánsko ostrovů</a></li>
                    <li><a href="#mapa" className="hover:text-primary">Mapa ostrovů</a></li>
                    <li><a href="#prehled" className="hover:text-primary">Který ostrov vybrat</a></li>
                    <li><a href="#fyn" className="hover:text-primary">Fyn</a></li>
                    <li><a href="#bornholm" className="hover:text-primary">Bornholm</a></li>
                    <li><a href="#doprava" className="hover:text-primary">Doprava</a></li>
                    <li><a href="#faq" className="hover:text-primary">Časté otázky</a></li>
                  </ul>
                </nav>
                <div className="rounded-2xl bg-primary p-5 text-primary-foreground">
                  <p className="mb-2 text-sm font-semibold uppercase tracking-wider opacity-80">Začněte v hlavním městě</p>
                  <h2 className="mb-3 text-xl font-bold">Co vidět v Kodani</h2>
                  <p className="mb-5 text-sm opacity-90">Mapa, čtvrti a trasy pro první dny na Sjællandu.</p>
                  <Link to="/kodan">
                    <Button variant="secondary" className="w-full">
                      Průvodce Kodaní <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Button>
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </article>
      </div>
    </>
  );
};

export default DanishIslands;
