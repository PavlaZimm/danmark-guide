import { Link } from "react-router-dom";
import {
  ArrowRight,
  Clock3,
  ExternalLink,
  Footprints,
  MapPinned,
  Plane,
  TrainFront,
  WalletCards,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import Breadcrumbs from "@/components/Breadcrumbs";
import ArticleMap from "@/components/ArticleMap";
import { Button } from "@/components/ui/button";

const PAGE_URL = "https://kastrup.cz/kodan";
const PAGE_TITLE = "Co vidět v Kodani: mapa, místa a itinerář | Kastrup.cz";
const PAGE_DESCRIPTION =
  "Co vidět v Kodani při první návštěvě? Vlastní fotografie, mapa památek, smysluplný itinerář, doprava z letiště a praktické tipy.";
const PUBLISHED_DATE = "2026-09-13";

const places = [
  { name: "Nyhavn", lat: 55.6798, lng: 12.5918, area: "Historické centrum" },
  { name: "Amalienborg", lat: 55.684, lng: 12.593, area: "Frederiksstaden" },
  { name: "Kastellet", lat: 55.6914, lng: 12.5942, area: "Østerbro" },
  { name: "Malá mořská víla", lat: 55.6929, lng: 12.5993, area: "Langelinie" },
  { name: "Rosenborg", lat: 55.6854, lng: 12.5776, area: "Kongens Have" },
  { name: "Rundetårn", lat: 55.6814, lng: 12.5758, area: "Historické centrum" },
  { name: "Christiansborg", lat: 55.6763, lng: 12.5801, area: "Slotsholmen" },
  { name: "Tivoli", lat: 55.6737, lng: 12.5681, area: "Centrum" },
  { name: "Torvehallerne", lat: 55.6836, lng: 12.5715, area: "Nørreport" },
  { name: "Superkilen", lat: 55.6995, lng: 12.5429, area: "Nørrebro" },
  { name: "Christianshavn", lat: 55.6738, lng: 12.5945, area: "Christianshavn" },
  { name: "Reffen", lat: 55.6936, lng: 12.6105, area: "Refshaleøen" },
];

const faqs = [
  {
    question: "Co vidět v Kodani při první návštěvě?",
    answer:
      "Začněte v Nyhavnu, projděte Amalienborg, Kastellet a Malou mořskou vílu. Další den spojte Rosenborg, Rundetårn, Christiansborg a Tivoli. Pokud máte více času, vydejte se do Christianshavnu, Nørrebra nebo na Refshaleøen.",
  },
  {
    question: "Jak dlouho zůstat v Kodani?",
    answer:
      "Na hlavní památky stačí dva plné dny. Tři dny umožní přidat čtvrti mimo centrum, muzeum nebo delší zastávky u vody. Čtvrtý den se hodí na Kastrup, Helsingør, Louisiana Museum nebo jiný výlet za město.",
  },
  {
    question: "Jak se dostat z letiště Kodaň do centra?",
    answer:
      "Z terminálu 3 jezdí do centra metro i vlak. Metro je praktické pro Kongens Nytorv a Nørreport, vlak pro hlavní nádraží. Jízdenku je nutné koupit před nástupem; konkrétní spojení ověřte v Rejseplanen.",
  },
  {
    question: "Dá se Kodaň poznat pěšky?",
    answer:
      "Historické centrum lze dobře projít pěšky. Pro Nørrebro, Frederiksberg, Refshaleøen nebo letiště je praktičtější metro, autobus, přístavní autobus nebo kolo. Jednotlivé dny je nejlepší plánovat po sousedících čtvrtích.",
  },
  {
    question: "Co lze v Kodani navštívit zdarma?",
    answer:
      "Zdarma si projdete Nyhavn, Kastellet, Královskou zahradu, Superkilen, čtvrti kolem kanálů a nábřeží. Bez vstupného je také vyhlídka z věže Christiansborgu, pokud je otevřená a není naplněná kapacita.",
  },
];

const Copenhagen = () => {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${PAGE_URL}#article`,
    headline: "Co vidět v Kodani: místa, která dávají smysl při první návštěvě",
    description: PAGE_DESCRIPTION,
    image: "https://kastrup.cz/images/20240813_130726.jpg",
    datePublished: PUBLISHED_DATE,
    dateModified: PUBLISHED_DATE,
    inLanguage: "cs-CZ",
    articleSection: "Cestování",
    keywords: ["Kodaň", "co vidět v Kodani", "Kodaň mapa", "Kodaň zajímavosti"],
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
      { "@type": "ListItem", position: 2, name: "Cestování", item: "https://kastrup.cz/cestovani" },
      { "@type": "ListItem", position: 3, name: "Kodaň", item: PAGE_URL },
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
        <meta property="og:title" content="Co vidět v Kodani: mapa a trasa pro první návštěvu" />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:image" content="https://kastrup.cz/images/20240813_130726.jpg" />
        <meta property="og:locale" content="cs_CZ" />
        <meta property="og:site_name" content="Kastrup.cz" />
        <meta property="article:published_time" content={PUBLISHED_DATE} />
        <meta property="article:modified_time" content={PUBLISHED_DATE} />
        <meta property="article:section" content="Cestování" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Co vidět v Kodani: mapa a trasa pro první návštěvu" />
        <meta name="twitter:description" content={PAGE_DESCRIPTION} />
        <meta name="twitter:image" content="https://kastrup.cz/images/20240813_130726.jpg" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <div className="min-h-screen py-10 md:py-12">
        <article className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-5xl">
            <Breadcrumbs items={[{ label: "Cestování", href: "/cestovani" }, { label: "Kodaň" }]} />

            <header className="mx-auto mb-10 max-w-4xl text-center">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Praktický průvodce s vlastními fotografiemi
              </p>
              <h1 className="mb-6 text-4xl font-bold md:text-6xl">
                Co vidět v Kodani: místa, která dávají smysl při první návštěvě
              </h1>
              <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                Ne seznam dvaceti teček, mezi kterými budete celý den přejíždět. Kodaň si rozdělíme
                do navazujících tras, aby zbyl čas na čtvrti, vodu, jídlo i obyčejné zastavení.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                <span>Autor: <Link to="/autorka" className="font-medium text-foreground hover:text-primary">Pavla Zimmermannová</Link></span>
                <span aria-hidden="true">•</span>
                <time dateTime={PUBLISHED_DATE}>13. září 2026</time>
                <span aria-hidden="true">•</span>
                <span>14 minut čtení</span>
              </div>
            </header>

            <figure className="mb-10 overflow-hidden rounded-3xl border bg-card shadow-large">
              <picture>
                <source srcSet="/images/20240813_130726.webp" type="image/webp" />
                <img
                  src="/images/20240813_130726.jpg"
                  alt="Barevné historické domy, lodě a nábřeží Nyhavn v Kodani"
                  width="1400"
                  height="1050"
                  className="aspect-[16/9] w-full object-cover"
                />
              </picture>
              <figcaption className="px-5 py-3 text-sm text-muted-foreground">
                Nyhavn patří na první návštěvu, ale skutečná Kodaň začíná být zajímavá i za jeho barevnou kulisou.
              </figcaption>
            </figure>

            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
              <div className="prose prose-lg max-w-none prose-headings:scroll-mt-24">
                <section className="not-prose mb-10 rounded-2xl border-l-4 border-primary bg-primary/5 p-6 md:p-7">
                  <h2 className="mb-3 text-xl font-bold">Co vidět v Kodani v kostce</h2>
                  <p className="leading-relaxed text-foreground">
                    Při první návštěvě spojte <strong>Nyhavn, Amalienborg, Kastellet a Malou mořskou vílu</strong>
                    do jedné pěší trasy. Druhý den projděte <strong>Rosenborg, Rundetårn, Christiansborg a Tivoli</strong>.
                    Další čas věnujte Christianshavnu, Nørrebru nebo přístavnímu Refshaleøenu.
                  </p>
                </section>

                <p>
                  Kodaň je kompaktní, ale jednotlivé zajímavosti neleží v jedné ulici. Nejvíc času se ztratí,
                  když se itinerář sestaví podle popularity míst a ne podle mapy. Následující rozdělení proto
                  skládá sousedící zastávky do tras, které lze podle tempa zkrátit nebo rozšířit.
                </p>

                <h2 id="centrum">1. Nyhavn, Amalienborg, Kastellet a Malá mořská víla</h2>
                <p>
                  Začněte u stanice Kongens Nytorv a projděte se podél Nyhavnu. Barevné domy a staré lodě
                  jsou ikonické, jen nepočítejte s tím, že tady budete sami. H. C. Andersen v různých obdobích
                  bydlel v domech číslo 20, 67 a 18. Z Nyhavnu pokračujte kolem nábřeží k Amalienborgu.
                </p>
                <p>
                  Od královského paláce vede přirozená trasa k pevnosti Kastellet a dále k Malé mořské
                  víle. Socha je drobná a sama o sobě nezabere mnoho času; smysl dává hlavně jako součást
                  procházky podél vody, nikoli jako samostatná výprava přes celé město.
                </p>

                <figure className="not-prose my-8 overflow-hidden rounded-2xl border bg-card">
                  <picture>
                    <source srcSet="/images/IMG_20230711_085341.webp" type="image/webp" />
                    <img
                      src="/images/IMG_20230711_085341.jpg"
                      alt="Malá mořská víla na pobřeží v Kodani"
                      width="1400"
                      height="1050"
                      loading="lazy"
                      className="aspect-[16/9] w-full object-cover"
                    />
                  </picture>
                  <figcaption className="px-5 py-3 text-sm text-muted-foreground">
                    Malá mořská víla je menší, než na fotografiích působí. Zařaďte ji do procházky přes Kastellet.
                  </figcaption>
                </figure>

                <h2 id="historie">2. Rosenborg, Rundetårn a Christiansborg</h2>
                <p>
                  Druhou trasu začněte v Královské zahradě u Rosenborgu. Pokud chcete dovnitř, počítejte
                  s královskými sbírkami a korunovačními klenoty; pokud ne, samotná zahrada je příjemným
                  bezplatným začátkem dne. Odtud je blízko k Rundetårnu, jehož spirálová rampa vede k výhledu
                  nad historickým centrem.
                </p>
                <p>
                  Přes staré ulice a Strøget dojdete k ostrovu Slotsholmen a paláci Christiansborg, kde sídlí
                  dánský parlament. Věž Christiansborgu nabízí bezplatnou vyhlídku; před cestou ale ověřte
                  otevírací dobu a počítejte s možnou frontou kvůli omezené kapacitě.
                </p>

                <h2 id="ctvrti">3. Co dělat v Kodani mimo historické centrum</h2>
                <p>
                  Nørrebro, Christianshavn a Refshaleøen ukazují tři rozdílné podoby města. Nørrebro je
                  kulturně pestré a živé; rozumným výchozím bodem je park Superkilen nebo ulice Jægersborggade.
                  Christianshavn má kanály, staré domy, hausbóty a klidnější nábřeží. Refshaleøen je
                  bývalá průmyslová oblast proměněná v prostor pro jídlo, umění a experimentální architekturu.
                </p>
                <p>
                  Právě v těchto čtvrtích je lepší nechat program volnější. Místo dalšího odškrtnutého
                  bodu se zastavte u kanálu, projeďte se přístavním autobusem nebo si dejte oběd mimo hlavní
                  turistickou trasu. Takový den má blíž k tomu, co popisujeme v průvodci
                  {" "}<Link to="/hygge">hygge bez klišé</Link>.
                </p>

                <h2 id="mapa">Kodaň mapa: seskupte místa podle čtvrtí</h2>
                <p>
                  Mapa ukazuje výchozí body popsaných tras. Nepoužívejte ji jako povinný checklist. Vyberte si
                  jednu skupinu na dopoledne a druhou na odpoledne; delší přesun do Nørrebra nebo na Refshaleøen
                  nechte na samostatnou část dne.
                </p>
              </div>

              <aside className="space-y-5 lg:sticky lg:top-24">
                <div className="rounded-2xl border bg-card p-5 shadow-sm">
                  <h2 className="mb-4 text-lg font-bold">Rychlá orientace</h2>
                  <ul className="space-y-3 text-sm">
                    <li className="flex gap-3"><Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span>2 dny na klasiku, 3 dny i na čtvrti</span></li>
                    <li className="flex gap-3"><Footprints className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span>Centrum zvládnete pěšky</span></li>
                    <li className="flex gap-3"><TrainFront className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span>Na delší přesuny metro nebo přístavní autobus</span></li>
                    <li className="flex gap-3"><WalletCards className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span>City card se vyplatí jen při více placených atrakcích</span></li>
                  </ul>
                </div>
                <nav aria-label="Obsah článku" className="rounded-2xl border bg-card p-5">
                  <h2 className="mb-3 text-base font-bold">V tomto průvodci</h2>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#centrum">Nyhavn a pobřeží</a></li>
                    <li><a href="#historie">Historické centrum</a></li>
                    <li><a href="#ctvrti">Městské čtvrti</a></li>
                    <li><a href="#mapa">Mapa Kodaně</a></li>
                    <li><a href="#itinerar">Itinerář</a></li>
                    <li><a href="#prakticky">Praktické informace</a></li>
                    <li><a href="#faq">FAQ</a></li>
                  </ul>
                </nav>
              </aside>
            </div>

            <section className="my-10" aria-labelledby="map-title">
              <div className="mb-5 flex items-center gap-3">
                <MapPinned className="h-7 w-7 text-primary" />
                <h2 id="map-title" className="text-2xl font-bold md:text-3xl">Interaktivní mapa Kodaně</h2>
              </div>
              <ArticleMap
                lat={55.681}
                lng={12.579}
                zoom={13}
                height="520px"
                caption="Vybraná místa pro první návštěvu. Kliknutím na bod zobrazíte jeho název a čtvrť."
                markers={places.map((place) => ({
                  lat: place.lat,
                  lng: place.lng,
                  title: place.name,
                  description: place.area,
                }))}
              />
            </section>

            <div className="mx-auto max-w-4xl">
              <div className="prose prose-lg max-w-none prose-headings:scroll-mt-24">
                <h2 id="itinerar">Itinerář na první návštěvu</h2>
                <div className="not-prose my-6 grid gap-5 md:grid-cols-3">
                  {[
                    ["1. den", "Přístav a královská Kodaň", "Nyhavn → Amalienborg → Kastellet → Malá mořská víla. Večer kanály nebo centrum."],
                    ["2. den", "Historie a výhledy", "Rosenborg → Torvehallerne → Rundetårn → Christiansborg. Večer Tivoli nebo Vesterbro."],
                    ["3. den", "Čtvrti a voda", "Nørrebro dopoledne, potom Christianshavn a podle energie Refshaleøen nebo plavba přístavním autobusem."],
                  ].map(([day, title, text]) => (
                    <section key={day} className="rounded-2xl border bg-card p-5 shadow-sm">
                      <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">{day}</p>
                      <h3 className="mb-3 text-lg font-bold">{title}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
                    </section>
                  ))}
                </div>

                <h2 id="prakticky">Praktická Kodaň: letiště, doprava, počasí a rozpočet</h2>

                <p>
                  Pokud přijíždíte autem, podívejte se na <Link to="/clanek/mosty-v-dansku">mosty v Dánsku, ceny a platbu mýtného</Link>.
                  Na delší přírodní výlet mimo město využijte průvodce <Link to="/clanek/mons-klint">Møns Klint autem</Link>.
                </p>

                <h3>Kodaň letiště a cesta do centra</h3>
                <p>
                  Letiště leží na Amageru a je přímo napojené na metro i železnici. Metro se hodí pro
                  Kongens Nytorv a Nørreport, vlak pro hlavní nádraží. Stanice jsou u terminálu 3 a jízdenku je
                  nutné mít před nástupem. Podrobné varianty, aktuální cenu a noční spojení najdete v článku
                  {" "}<Link to="/clanek/letiste-kodan-kastrup-doprava-do-centra">letiště Kodaň – doprava do centra</Link>.
                </p>

                <figure className="not-prose my-8 overflow-hidden rounded-2xl border bg-card">
                  <picture>
                    <source srcSet="/images/IMG_20230712_091836.webp" type="image/webp" />
                    <img
                      src="/images/IMG_20230712_091836.jpg"
                      alt="Interiér kodaňského hlavního nádraží s dánskými vlajkami"
                      width="1400"
                      height="1050"
                      loading="lazy"
                      className="aspect-[16/9] w-full object-cover"
                    />
                  </picture>
                  <figcaption className="px-5 py-3 text-sm text-muted-foreground">
                    Hlavní nádraží leží vedle Tivoli a je praktickým bodem pro vlak z letiště i výlety za město.
                  </figcaption>
                </figure>

                <h3>Kodaň počasí a co si vzít s sebou</h3>
                <p>
                  Počasí u Øresundu se může během dne rychle změnit. I v teplejší části roku se hodí lehká
                  nepromokavá vrstva a něco proti větru. Předpověď kontrolujte těsně před cestou; dlouhodobý
                  průměr nenahradí aktuální situaci. V dešti dejte přednost Rosenborgu, SMK, Glyptotéce,
                  <Link to="/clanek/dansky-design" className="text-primary hover:underline">Designmuseum Danmark a dánský design</Link> nebo Nationalmuseet.
                </p>

                <h3>Kodaň levně: kde lze ubrat z rozpočtu</h3>
                <p>
                  Nejvíc ušetříte chytrým seskupením tras a menším počtem placených atrakcí. Nyhavn,
                  Kastellet, Královská zahrada, Superkilen a dlouhé procházky podél přístavu jsou zdarma.
                  K tomu lze přidat bezplatnou vyhlídku z Christiansborgu. Copenhagen Card porovnávejte podle
                  konkrétního seznamu atrakcí, ne podle slibu obecné slevy.
                </p>

                <h3>Kodaň ubytování: vybírejte podle trasy</h3>
                <p>
                  Pro první krátkou návštěvu je praktické okolí hlavního nádraží, Nørreportu nebo stanice
                  Kongens Nytorv. Nørrebro a Vesterbro nabídnou víc sousedské atmosféry, Amager zase rychlé spojení
                  na letiště. Nabídku lze porovnat na naší stránce <Link to="/ubytovani">ubytování v Dánsku</Link>.
                </p>

                <h2 id="faq">Nejčastější otázky o Kodani</h2>
                <div className="not-prose space-y-4">
                  {faqs.map((faq) => (
                    <details key={faq.question} className="group rounded-2xl border bg-card p-5">
                      <summary className="cursor-pointer list-none pr-8 font-semibold marker:content-none">
                        {faq.question}
                      </summary>
                      <p className="mt-3 leading-relaxed text-muted-foreground">{faq.answer}</p>
                    </details>
                  ))}
                </div>

                <h2>Zdroje a aktuálnost</h2>
                <p>
                  Trasy vycházejí z vlastních fotografií a cestovních podkladů Kastrup.cz. Proměnlivé
                  informace ověřujeme u oficiálních provozovatelů. Před cestou zkontrolujte otevírací dobu,
                  výluky a ceny přímo u nich.
                </p>
                <ul>
                  {[
                    ["VisitCopenhagen: hlavní atrakce", "https://www.visitcopenhagen.com/copenhagen/things-to-do/museums-and-attractions/top-attractions-copenhagen"],
                    ["VisitCopenhagen: průvodce čtvrtěmi", "https://www.visitcopenhagen.com/copenhagen/areas/neighborhoods/the-copenhagen-neighbourhood-guide"],
                    ["VisitCopenhagen: bezplatné aktivity", "https://www.visitcopenhagen.com/copenhagen/planning/inspiration/free-things-copenhagen"],
                    ["Copenhagen Airport: metro", "https://www.cph.dk/en/parking-transport/bus-train-metro-taxi/metro"],
                    ["Copenhagen Airport: vlak", "https://www.cph.dk/en/parking-transport/bus-train-metro-taxi/train"],
                  ].map(([label, href]) => (
                    <li key={href}>
                      <a href={href} target="_blank" rel="noreferrer noopener">
                        {label} <ExternalLink className="ml-1 inline h-3.5 w-3.5" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <section className="mt-10 rounded-3xl bg-gradient-card p-7 text-center md:p-10">
                <Plane className="mx-auto mb-4 h-9 w-9 text-primary" />
                <h2 className="mb-4 text-3xl font-bold">Přilétáte přes Kastrup?</h2>
                <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
                  Letiště není jediný důvod vystoupit v Kastrupu. Kousek od terminálu jsou mořské lázně,
                  akvárium i dlouhá pláž.
                </p>
                <Link to="/clanek/kastrup-kodansky-poklad-moderni-architektury-more-a-volnosti">
                  <Button size="lg">Objevit Kastrup <ArrowRight className="ml-2 h-4 w-4" /></Button>
                </Link>
              </section>
            </div>
          </div>
        </article>
      </div>
    </>
  );
};

export default Copenhagen;
