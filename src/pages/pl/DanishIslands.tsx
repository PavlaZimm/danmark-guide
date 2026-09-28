import { Link } from "react-router-dom";
import { ArrowRight, Bike, ExternalLink, MapPinned, Mountain, Ship, Waves } from "lucide-react";
import { Helmet } from "react-helmet-async";
import Breadcrumbs from "@/components/Breadcrumbs";
import ArticleMap from "@/components/LazyArticleMap";
import { Button } from "@/components/ui/button";

const PAGE_URL = "https://kastrup.pl/wyspy-dunskie";
const PAGE_TITLE = "Wyspy duńskie: którą wybrać i co zobaczyć | Kastrup.pl";
const PAGE_DESCRIPTION =
  "Duńskie wyspy w pigułce: Zelandia, Fionia, Møn, Bornholm, Samsø, Ærø, Fanø i Rømø. Mapa, dojazd i wybór wyspy dopasowany do rodzaju podróży.";
const HEADLINE = "Wyspy duńskie: którą wybrać, co zobaczyć i jak tam dotrzeć";
const PUBLISHED_DATE = "2026-09-13";
const HERO_IMAGE = "https://kastrup.pl/images/20240811_202640.jpg";

const islands = [
  { name: "Zelandia (Sjælland)", lat: 55.55, lng: 11.75, area: "Kopenhaga, zamki i wybrzeże" },
  { name: "Fionia (Fyn)", lat: 55.31, lng: 10.36, area: "Odense i wyspiarskie południe" },
  { name: "Møn", lat: 54.98, lng: 12.35, area: "Kredowe klify" },
  { name: "Bornholm", lat: 55.13, lng: 14.91, area: "Skały, plaże i rower" },
  { name: "Samsø", lat: 55.86, lng: 10.59, area: "Spokój i rower" },
  { name: "Ærø", lat: 54.87, lng: 10.35, area: "Portowe miasteczka" },
  { name: "Fanø", lat: 55.41, lng: 8.41, area: "Morze Wattowe" },
  { name: "Rømø", lat: 55.14, lng: 8.52, area: "Szerokie plaże" },
];

const faqs = [
  {
    question: "Ile wysp ma Dania?",
    answer:
      "Narodowa organizacja turystyczna VisitDenmark podaje 444 nazwane wyspy. W różnych statystykach liczba może się różnić, zależnie od minimalnej wielkości i sposobu liczenia. Dla podróżnika ważne jest to, że duże wyspy łączą mosty, a mniejsze obsługują promy.",
  },
  {
    question: "Która duńska wyspa jest najlepsza na pierwszy wyjazd?",
    answer:
      "Na wyjazd do miasta wybierz Zelandię z Kopenhagą, a na połączenie Odense, zamków i wsi Fionię. Møn najlepiej sprawdzi się na krótki wypad do klifów, Bornholm na dłuższy aktywny urlop, a Ærø albo Samsø na powolne, wyspiarskie tempo.",
  },
  {
    question: "Jaka jest największa wyspa Danii?",
    answer:
      "Największą wyspą Danii właściwej jest Zelandia (Sjælland), na której leży Kopenhaga. Grenlandia jest autonomiczną częścią Królestwa Danii, ale nie należy do Danii właściwej i nie wlicza się jej do tego porównania.",
  },
  {
    question: "Czy na duńskie wyspy potrzebny jest samochód?",
    answer:
      "Na Zelandię i Fionię łatwo dojedziesz pociągiem, a komunikacja publiczna obsługuje główne miasta. Na małych wyspach przyda się rower. Samochód ma sens, jeśli jedziesz w bardziej odludne miejsca, ale na wielu promach oznacza droższą rezerwację i mniejszą elastyczność.",
  },
];

const DanishIslands = () => {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${PAGE_URL}#article`,
    headline: HEADLINE,
    description: PAGE_DESCRIPTION,
    image: HERO_IMAGE,
    datePublished: PUBLISHED_DATE,
    dateModified: PUBLISHED_DATE,
    inLanguage: "pl-PL",
    articleSection: "Podróże",
    keywords: ["wyspy duńskie", "duńskie wyspy", "duńska wyspa", "Fionia", "Bornholm"],
    author: {
      "@type": "Person",
      name: "Pavla Zimmermannová",
      url: "https://kastrup.pl/o-autorce",
    },
    publisher: {
      "@type": "Organization",
      name: "Kastrup.pl",
      url: "https://kastrup.pl",
      logo: { "@type": "ImageObject", url: "https://kastrup.pl/icon-512.png" },
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
      { "@type": "ListItem", position: 1, name: "Start", item: "https://kastrup.pl/" },
      { "@type": "ListItem", position: 2, name: "Co zobaczyć w Danii", item: "https://kastrup.pl/co-zobaczyc-w-danii" },
      { "@type": "ListItem", position: 3, name: "Wyspy duńskie", item: PAGE_URL },
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
        <meta property="og:title" content="Wyspy duńskie: którą wybrać na swoją podróż" />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:image" content={HERO_IMAGE} />
        <meta property="og:locale" content="pl_PL" />
        <meta property="og:site_name" content="Kastrup.pl" />
        <meta property="article:published_time" content={PUBLISHED_DATE} />
        <meta property="article:modified_time" content={PUBLISHED_DATE} />
        <meta property="article:section" content="Podróże" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Wyspy duńskie: którą wybrać i co zobaczyć" />
        <meta name="twitter:description" content={PAGE_DESCRIPTION} />
        <meta name="twitter:image" content={HERO_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <div className="min-h-screen py-10 md:py-12">
        <article className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-5xl">
            <Breadcrumbs items={[{ label: "Co zobaczyć w Danii", href: "/co-zobaczyc-w-danii" }, { label: "Wyspy duńskie" }]} />

            <header className="mx-auto mb-10 max-w-4xl text-center">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Przewodnik po wyspach z mapą
              </p>
              <h1 className="mb-6 text-4xl font-bold md:text-6xl">{HEADLINE}</h1>
              <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                Dania to nie jeden kawałek lądu otoczony morzem. To Jutlandia i setki wysp, które różnią się
                krajobrazem, tempem i sposobem dojazdu. Wybierz wyspę według tego, jak chcesz podróżować.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                <span>Autorka: <Link to="/o-autorce" className="font-medium text-foreground hover:text-primary">Pavla Zimmermannová</Link></span>
                <span aria-hidden="true">•</span>
                <time dateTime={PUBLISHED_DATE}>13 września 2026</time>
                <span aria-hidden="true">•</span>
                <span>9 minut czytania</span>
              </div>
            </header>

            <figure className="mb-10 overflow-hidden rounded-3xl border bg-card shadow-large">
              <img
                src="/images/20240811_202640.jpg"
                alt="Duńskie wybrzeże o zachodzie słońca"
                width="1400"
                height="1050"
                className="aspect-[16/9] w-full object-cover"
              />
              <figcaption className="px-5 py-3 text-sm text-muted-foreground">
                Morze w Danii to nie dekoracja. Wyznacza transport, krajobraz i rytm poszczególnych wysp.
              </figcaption>
            </figure>

            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
              <div className="prose prose-lg max-w-none prose-headings:scroll-mt-24">
                <section className="not-prose mb-10 rounded-2xl border-l-4 border-primary bg-primary/5 p-6 md:p-7">
                  <h2 className="mb-3 text-xl font-bold">Wyspy duńskie w pigułce</h2>
                  <p className="leading-relaxed text-foreground">
                    Na pierwszy wyjazd do miasta wybierz <strong>Zelandię</strong> z Kopenhagą. Na Odense, zamki
                    i spokojniejszą wieś nadaje się <strong>Fionia</strong>. Jeśli chodzi Ci o przyrodę, postaw
                    na <strong>Møn</strong>, Bornholm albo wyspy Morza Wattowego. Na powolny urlop na rowerze
                    świetnie sprawdzą się{" "}<strong>Samsø i Ærø</strong>.
                  </p>
                </section>

                <h2 id="kolik-ostrovu">Ile wysp ma Dania?</h2>
                <p>
                  VisitDenmark podaje <strong>444 nazwane wyspy</strong>. W różnych statystykach geograficznych
                  trafisz na inną liczbę, bo wszystko zależy od minimalnej powierzchni i metody liczenia. Przy
                  planowaniu podróży ważniejsze jest to, że duże wyspy łączą mosty i pociągi, a na małe kursują
                  promy z rozkładem dopasowanym do mieszkańców.
                </p>
                <p>
                  Grenlandia i Wyspy Owcze są autonomicznymi częściami Królestwa Danii. Nie należą jednak do
                  Danii właściwej, dlatego nie uwzględniamy ich w tym przeglądzie dla podróżników.
                </p>

                <h2 id="mapa">Mapa duńskich wysp na pierwszy wyjazd</h2>
                <p>
                  Mapa nie pokazuje wszystkich 444 wysp. Wyróżnia miejsca, które mają sens przy pierwszym albo
                  drugim wyjeździe i które da się połączyć z miastem, wybrzeżem albo rowerem.
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
                    caption="Mapa wybranych duńskich wysp"
                    height="520px"
                  />
                </div>

                <h2 id="prehled">Którą duńską wyspę wybrać?</h2>
                <div className="not-prose my-7 grid gap-4 sm:grid-cols-2">
                  {[
                    [MapPinned, "Zelandia (Sjælland)", "Kopenhaga, Kronborg, północne wybrzeże i jednodniowe wycieczki bez samochodu."],
                    [Bike, "Fionia (Fyn)", "Odense, Egeskov, wioski i dobry punkt wypadowy na południowy archipelag."],
                    [Mountain, "Møn", "Møns Klint, lasy, ścieżki wzdłuż wybrzeża i ciemne nocne niebo."],
                    [Waves, "Bornholm", "Skaliste wybrzeże, piaszczyste plaże, kościoły rotundowe i dłuższy pobyt."],
                    [Bike, "Samsø i Ærø", "Mniejsze wyspy na rower, portowe miasteczka i wolniejsze tempo podróży."],
                    [Ship, "Fanø i Rømø", "Szerokie plaże, wydmy i krajobraz Morza Wattowego."],
                  ].map(([Icon, title, text]) => (
                    <section key={title as string} className="rounded-2xl border bg-card p-5">
                      <Icon className="mb-3 h-7 w-7 text-primary" aria-hidden="true" />
                      <h3 className="mb-2 text-lg font-semibold">{title as string}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">{text as string}</p>
                    </section>
                  ))}
                </div>

                <h2 id="sjaelland">Zelandia (Sjælland): najlepszy początek z Kopenhagą</h2>
                <p>
                  Zelandia to największa wyspa Danii właściwej i naturalny wybór przy pierwszym przylocie.
                  Oprócz <Link to="/kopenhaga">Kopenhagi i jej zabytków</Link> ma północne wybrzeże, zamki
                  Kronborg i Frederiksborg, muzeum Louisiana i klify Stevns Klint. Z lotniska i z dworca
                  głównego do dużej części tych miejsc dojedziesz pociągiem.
                </p>

                <h2 id="fyn">Fionia (Fyn): duńska wyspa na miasta, zamki i rower</h2>
                <p>
                  Fionia leży między Zelandią a Jutlandią, a z Zelandią łączy ją przez Wielki Bełt most kolejowy
                  i drogowy. Głównym punktem jest Odense, miasto, w którym urodził się Hans Christian Andersen.
                  Na południu wyspy zaczyna się archipelag z mniejszymi portami, promami i trasami w sam raz
                  na rower.
                </p>
                <p>
                  Na pierwszy pobyt połącz Odense, zamek Egeskov i jeden dzień nad morzem. Nie próbuj w jeden
                  weekend objechać naraz Fionii, Ærø i Langeland — tempo wyznaczają tu rozkłady promów,
                  a nie mapa.
                </p>

                <h2 id="mon">Møn: kredowe klify i krótki wypad na łono natury</h2>
                <p>
                  Møn słynie przede wszystkim z klifów Møns Klint. Nadaje się na jednodniową wycieczkę albo
                  jeden nocleg, ale bez samochodu wymaga staranniejszego planowania. W sezonie sprawdzaj
                  przesiadki między autobusami, a poza sezonem licz się z rzadszymi kursami.
                </p>

                <p>
                  Ceny parkingu, schody na plażę i godziny otwarcia GeoCenter znajdziesz w artykule{" "}
                  <Link to="/artykul/mons-klint">Møns Klint samochodem</Link>.
                </p>

                <h2 id="bornholm">Bornholm: wyspa na osobny urlop</h2>
                <p>
                  Bornholm nie leży „tuż obok Kopenhagi” — na Morzu Bałtyckim jest bliżej południowej Szwecji.
                  Ma skalistą północ, piaszczyste południe, trasy rowerowe, kościoły rotundowe i ruiny
                  Hammershus. Warto przeznaczyć na niego co najmniej trzy–cztery dni. Dociera się tu samolotem
                  albo promem do Rønne; konkretne połączenie trzeba sprawdzić na wybrany termin.
                </p>

                <h2 id="mensi">Samsø, Ærø, Fanø i Rømø: mniej programu, więcej wyspy</h2>
                <p>
                  Samsø nadaje się na rower i wiejski krajobraz. Ærø łączy małe porty, kolorowe domy i
                  południową Fionię. Fanø i Rømø leżą przy zachodnim wybrzeżu Jutlandii, w rejonie Morza
                  Wattowego, gdzie trzeba liczyć się z pływami i wiatrem oraz przestrzegać lokalnych zasad
                  poruszania się po chronionym terenie.
                </p>

                <h2 id="doprava">Most, prom, pociąg czy rower?</h2>
                <p>
                  Jeśli jedziesz samochodem, porównaj <Link to="/artykul/mosty-w-danii">ceny mostów Storebælt i Øresund</Link>.
                  Jeżeli do planu dokładasz też południowo-zachodnią Jutlandię, przyda się przewodnik{" "}
                  <Link to="/artykul/ribe">parking i spacer po Ribe</Link>.
                </p>
                <ul>
                  <li><strong>Zelandia i Fionia:</strong> najprościej pociągiem; trasa prowadzi mostem przez Wielki Bełt.</li>
                  <li><strong>Møn:</strong> najwięcej swobody daje samochód; komunikacją publiczną trzeba jechać z planem.</li>
                  <li><strong>Bornholm:</strong> samolot albo prom, często przez szwedzki Ystad.</li>
                  <li><strong>Małe wyspy:</strong> prom rezerwuj z wyprzedzeniem, zwłaszcza z samochodem; piesi i rowerzyści mają więcej możliwości.</li>
                  <li><strong>Aktualne godziny:</strong> sprawdzaj u konkretnego przewoźnika, bo rozkłady sezonowe się zmieniają.</li>
                </ul>

                <h2 id="faq">Najczęstsze pytania o duńskie wyspy</h2>
                {faqs.map((faq) => (
                  <details key={faq.question} className="not-prose group mb-4 rounded-2xl border bg-card p-5">
                    <summary className="cursor-pointer list-none font-semibold">{faq.question}</summary>
                    <p className="mt-3 leading-relaxed text-muted-foreground">{faq.answer}</p>
                  </details>
                ))}

                <h2 id="zdroje">Sprawdzone źródła</h2>
                <ul>
                  <li>
                    <a href="https://www.visitdenmark.com/denmark/destinations/danish-islands" target="_blank" rel="noreferrer">
                      VisitDenmark: duńskie wyspy (EN) <ExternalLink className="inline h-4 w-4" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.visitdenmark.com/faq/geography" target="_blank" rel="noreferrer">
                      VisitDenmark: geografia (EN) <ExternalLink className="inline h-4 w-4" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.dst.dk/en" target="_blank" rel="noreferrer">
                      Statistics Denmark (EN) <ExternalLink className="inline h-4 w-4" aria-hidden="true" />
                    </a>
                  </li>
                </ul>
              </div>

              <aside className="space-y-5 lg:sticky lg:top-24">
                <nav className="rounded-2xl border bg-card p-5" aria-label="Spis treści">
                  <p className="mb-3 font-semibold">W artykule</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><a href="#kolik-ostrovu" className="hover:text-primary">Ile wysp ma Dania</a></li>
                    <li><a href="#mapa" className="hover:text-primary">Mapa wysp</a></li>
                    <li><a href="#prehled" className="hover:text-primary">Którą wyspę wybrać</a></li>
                    <li><a href="#fyn" className="hover:text-primary">Fionia</a></li>
                    <li><a href="#bornholm" className="hover:text-primary">Bornholm</a></li>
                    <li><a href="#doprava" className="hover:text-primary">Dojazd</a></li>
                    <li><a href="#faq" className="hover:text-primary">Najczęstsze pytania</a></li>
                  </ul>
                </nav>
                <div className="rounded-2xl bg-primary p-5 text-primary-foreground">
                  <p className="mb-2 text-sm font-semibold uppercase tracking-wider opacity-80">Zacznij w stolicy</p>
                  <h2 className="mb-3 text-xl font-bold">Co zobaczyć w Kopenhadze</h2>
                  <p className="mb-5 text-sm opacity-90">Mapa, dzielnice i trasy na pierwsze dni na Zelandii.</p>
                  <Link to="/kopenhaga">
                    <Button variant="secondary" className="w-full">
                      Przewodnik po Kopenhadze <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
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
