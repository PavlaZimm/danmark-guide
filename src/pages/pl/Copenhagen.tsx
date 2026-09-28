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
import ArticleMap from "@/components/LazyArticleMap";
import { Button } from "@/components/ui/button";

const PAGE_URL = "https://kastrup.pl/kopenhaga";
const PAGE_TITLE = "Kopenhaga: atrakcje i co zobaczyć – mapa i plan | Kastrup.pl";
const PAGE_DESCRIPTION =
  "Co zobaczyć w Kopenhadze przy pierwszej wizycie? Najważniejsze atrakcje na mapie, plan zwiedzania na 2–3 dni, dojazd z lotniska i praktyczne porady.";
const HEADLINE = "Co zobaczyć w Kopenhadze: atrakcje, które mają sens przy pierwszej wizycie";
const PUBLISHED_DATE = "2026-09-13";
const IMAGE = "https://kastrup.pl/images/20240813_130726.jpg";

const places = [
  { name: "Nyhavn", lat: 55.6798, lng: 12.5918, area: "Centrum historyczne" },
  { name: "Amalienborg", lat: 55.684, lng: 12.593, area: "Frederiksstaden" },
  { name: "Kastellet", lat: 55.6914, lng: 12.5942, area: "Østerbro" },
  { name: "Mała Syrenka", lat: 55.6929, lng: 12.5993, area: "Langelinie" },
  { name: "Rosenborg", lat: 55.6854, lng: 12.5776, area: "Kongens Have" },
  { name: "Rundetårn", lat: 55.6814, lng: 12.5758, area: "Centrum historyczne" },
  { name: "Christiansborg", lat: 55.6763, lng: 12.5801, area: "Slotsholmen" },
  { name: "Tivoli", lat: 55.6737, lng: 12.5681, area: "Centrum" },
  { name: "Torvehallerne", lat: 55.6836, lng: 12.5715, area: "Nørreport" },
  { name: "Superkilen", lat: 55.6995, lng: 12.5429, area: "Nørrebro" },
  { name: "Christianshavn", lat: 55.6738, lng: 12.5945, area: "Christianshavn" },
  { name: "Reffen", lat: 55.6936, lng: 12.6105, area: "Refshaleøen" },
];

const faqs = [
  {
    question: "Co zobaczyć w Kopenhadze przy pierwszej wizycie?",
    answer:
      "Zacznij w Nyhavn, przejdź przez Amalienborg i Kastellet do Małej Syrenki. Drugiego dnia połącz Rosenborg, Rundetårn, Christiansborg i Tivoli. Jeśli masz więcej czasu, wybierz się na Christianshavn, Nørrebro albo Refshaleøen.",
  },
  {
    question: "Ile dni potrzeba na Kopenhagę?",
    answer:
      "Na główne atrakcje wystarczą dwa pełne dni. Trzy dni pozwolą dodać dzielnice poza centrum, muzeum albo dłuższe przystanki nad wodą. Czwarty dzień przyda się na Kastrup, Helsingør, Louisiana Museum albo inną wycieczkę za miasto.",
  },
  {
    question: "Jak dojechać z lotniska w Kopenhadze do centrum?",
    answer:
      "Z terminalu 3 do centrum jeździ metro i pociąg. Metro jest wygodne na Kongens Nytorv i Nørreport, pociąg na dworzec główny. Bilet trzeba kupić przed wejściem do pociągu; konkretne połączenie sprawdź w Rejseplanen.",
  },
  {
    question: "Czy Kopenhagę da się zwiedzić pieszo?",
    answer:
      "Historyczne centrum najlepiej zwiedzać pieszo. Na Nørrebro, Frederiksberg, Refshaleøen albo na lotnisko wygodniej dojechać metrem, autobusem, tramwajem wodnym albo rowerem. Poszczególne dni najlepiej planować według sąsiednich dzielnic.",
  },
  {
    question: "Co w Kopenhadze można zobaczyć za darmo?",
    answer:
      "Bez biletu obejrzysz Nyhavn, Kastellet, Ogród Królewski, Superkilen, dzielnice wzdłuż kanałów i nabrzeża. Za darmo jest też taras widokowy na wieży Christiansborga, jeśli jest otwarty i nie został wyczerpany limit miejsc.",
  },
];

const Copenhagen = () => {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${PAGE_URL}#article`,
    headline: HEADLINE,
    description: PAGE_DESCRIPTION,
    image: IMAGE,
    datePublished: PUBLISHED_DATE,
    dateModified: PUBLISHED_DATE,
    inLanguage: "pl-PL",
    articleSection: "Podróże",
    keywords: ["Kopenhaga", "Kopenhaga atrakcje", "co zobaczyć w Kopenhadze", "Kopenhaga mapa"],
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
      { "@type": "ListItem", position: 2, name: "Przewodniki", item: "https://kastrup.pl/artykuly" },
      { "@type": "ListItem", position: 3, name: "Kopenhaga", item: PAGE_URL },
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
        <meta property="og:title" content="Co zobaczyć w Kopenhadze: mapa i plan na pierwszą wizytę" />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:image" content={IMAGE} />
        <meta property="og:locale" content="pl_PL" />
        <meta property="og:site_name" content="Kastrup.pl" />
        <meta property="article:published_time" content={PUBLISHED_DATE} />
        <meta property="article:modified_time" content={PUBLISHED_DATE} />
        <meta property="article:section" content="Podróże" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Co zobaczyć w Kopenhadze: mapa i plan na pierwszą wizytę" />
        <meta name="twitter:description" content={PAGE_DESCRIPTION} />
        <meta name="twitter:image" content={IMAGE} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <div className="min-h-screen py-10 md:py-12">
        <article className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-5xl">
            <Breadcrumbs items={[{ label: "Przewodniki", href: "/artykuly" }, { label: "Kopenhaga" }]} />

            <header className="mx-auto mb-10 max-w-4xl text-center">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Praktyczny przewodnik z własnymi zdjęciami
              </p>
              <h1 className="mb-6 text-4xl font-bold md:text-6xl">{HEADLINE}</h1>
              <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                To nie jest lista dwudziestu punktów, między którymi przejedziesz cały dzień. Dzielimy
                Kopenhagę na trasy, które się ze sobą łączą, żeby został czas na dzielnice, wodę, jedzenie
                i zwykłe zatrzymanie się.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                <span>Autorka: <Link to="/o-autorce" className="font-medium text-foreground hover:text-primary">Pavla Zimmermannová</Link></span>
                <span aria-hidden="true">•</span>
                <time dateTime={PUBLISHED_DATE}>13 września 2026</time>
                <span aria-hidden="true">•</span>
                <span>14 minut czytania</span>
              </div>
            </header>

            <figure className="mb-10 overflow-hidden rounded-3xl border bg-card shadow-large">
              <picture>
                <source
                  srcSet="/images/20240813_130726-640.webp 640w, /images/20240813_130726-960.webp 960w, /images/20240813_130726.webp 1400w"
                  sizes="(min-width: 1024px) 1024px, 100vw"
                  type="image/webp"
                />
                <img
                  src="/images/20240813_130726.jpg"
                  alt="Kolorowe kamienice, łodzie i nabrzeże Nyhavn w Kopenhadze"
                  width="1400"
                  height="1050"
                  className="aspect-[16/9] w-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                />
              </picture>
              <figcaption className="px-5 py-3 text-sm text-muted-foreground">
                Nyhavn to obowiązkowy punkt pierwszej wizyty, ale prawdziwa Kopenhaga zaczyna się za jego kolorową fasadą.
              </figcaption>
            </figure>

            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
              <div className="prose prose-lg max-w-none prose-headings:scroll-mt-24">
                <section className="not-prose mb-10 rounded-2xl border-l-4 border-primary bg-primary/5 p-6 md:p-7">
                  <h2 className="mb-3 text-xl font-bold">Kopenhaga w pigułce</h2>
                  <p className="leading-relaxed text-foreground">
                    Przy pierwszej wizycie połącz <strong>Nyhavn, Amalienborg, Kastellet i Małą Syrenkę</strong>{" "}
                    w jedną trasę pieszą. Drugiego dnia przejdź przez <strong>Rosenborg, Rundetårn, Christiansborg i Tivoli</strong>.
                    Resztę czasu poświęć na Christianshavn, Nørrebro albo portową wyspę Refshaleøen.
                  </p>
                </section>

                <p>
                  Kopenhaga jest zwarta, ale jej atrakcje nie leżą przy jednej ulicy. Najwięcej czasu traci się,
                  gdy plan układa się według popularności miejsc, a nie według mapy. Dlatego poniżej łączymy
                  sąsiednie przystanki w trasy, które można skrócić albo wydłużyć zależnie od tempa.
                </p>

                <h2 id="centrum">1. Nyhavn, Amalienborg, Kastellet i Mała Syrenka</h2>
                <p>
                  Zacznij przy stacji Kongens Nytorv i przejdź wzdłuż Nyhavn. Kolorowe domy i stare łodzie
                  to ikona miasta, tylko nie licz na to, że będziesz tu sam. Hans Christian Andersen mieszkał
                  w różnych okresach w domach pod numerami 20, 67 i 18. Z Nyhavn idź nabrzeżem do Amalienborga.
                </p>
                <p>
                  Od pałacu królewskiego naturalna trasa prowadzi do twierdzy Kastellet i dalej do Małej
                  Syrenki. Pomnik jest niewielki i sam w sobie nie zajmie dużo czasu; ma sens głównie jako
                  część spaceru wzdłuż wody, a nie jako osobna wyprawa przez całe miasto.
                </p>

                <figure className="not-prose my-8 overflow-hidden rounded-2xl border bg-card">
                  <picture>
                    <source srcSet="/images/IMG_20230711_085341.webp" type="image/webp" />
                    <img
                      src="/images/IMG_20230711_085341.jpg"
                      alt="Pomnik Małej Syrenki na brzegu w Kopenhadze"
                      width="1400"
                      height="1050"
                      loading="lazy"
                      className="aspect-[16/9] w-full object-cover"
                    />
                  </picture>
                  <figcaption className="px-5 py-3 text-sm text-muted-foreground">
                    Mała Syrenka jest mniejsza, niż wygląda na zdjęciach. Najlepiej włączyć ją w spacer przez Kastellet.
                  </figcaption>
                </figure>

                <h2 id="historie">2. Rosenborg, Rundetårn i Christiansborg</h2>
                <p>
                  Drugą trasę zacznij w Ogrodzie Królewskim przy Rosenborgu. Jeśli chcesz wejść do środka,
                  czekają tam zbiory królewskie i klejnoty koronacyjne; jeśli nie, sam ogród jest przyjemnym
                  i bezpłatnym początkiem dnia. Stąd blisko do Rundetårn, okrągłej wieży, której spiralna
                  rampa prowadzi na widok nad historycznym centrum.
                </p>
                <p>
                  Starymi uliczkami i deptakiem Strøget dojdziesz na wyspę Slotsholmen i do pałacu
                  Christiansborg, siedziby duńskiego parlamentu. Wieża Christiansborga oferuje bezpłatny
                  taras widokowy; przed wyjściem sprawdź jednak godziny otwarcia i licz się z kolejką,
                  bo liczba miejsc jest ograniczona.
                </p>

                <h2 id="ctvrti">3. Co robić w Kopenhadze poza historycznym centrum</h2>
                <p>
                  Nørrebro, Christianshavn i Refshaleøen pokazują trzy różne oblicza miasta. Nørrebro jest
                  różnorodne kulturowo i pełne życia; dobrym punktem startu jest park Superkilen albo ulica
                  Jægersborggade. Christianshavn ma kanały, stare domy, łodzie mieszkalne i spokojniejsze
                  nabrzeża. Refshaleøen to dawny teren przemysłowy zamieniony w miejsce na jedzenie, sztukę
                  i eksperymentalną architekturę.
                </p>
                <p>
                  Właśnie w tych dzielnicach warto zostawić sobie luźniejszy plan. Zamiast kolejnego
                  odhaczonego punktu zatrzymaj się nad kanałem, przepłyń tramwajem wodnym albo zjedz obiad
                  z dala od głównej trasy turystycznej. Taki dzień jest bliżej tego, o czym piszemy
                  w przewodniku{" "}<Link to="/hygge">hygge bez stereotypów</Link>.
                </p>

                <h2 id="mapa">Kopenhaga – mapa: grupuj atrakcje według dzielnic</h2>
                <p>
                  Mapa pokazuje punkty startowe opisanych tras. Nie traktuj jej jak obowiązkowej listy.
                  Wybierz jedną grupę na przedpołudnie i drugą na popołudnie; dłuższy przejazd na Nørrebro
                  albo Refshaleøen zostaw na osobną część dnia.
                </p>
              </div>

              <aside className="space-y-5 lg:sticky lg:top-24">
                <div className="rounded-2xl border bg-card p-5 shadow-sm">
                  <h2 className="mb-4 text-lg font-bold">Szybka orientacja</h2>
                  <ul className="space-y-3 text-sm">
                    <li className="flex gap-3"><Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span>2 dni na klasykę, 3 dni także na dzielnice</span></li>
                    <li className="flex gap-3"><Footprints className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span>Centrum zwiedzisz pieszo</span></li>
                    <li className="flex gap-3"><TrainFront className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span>Na dłuższe odcinki metro albo tramwaj wodny</span></li>
                    <li className="flex gap-3"><WalletCards className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span>Karta miejska opłaca się tylko przy kilku płatnych atrakcjach</span></li>
                  </ul>
                </div>
                <nav aria-label="Spis treści" className="rounded-2xl border bg-card p-5">
                  <h2 className="mb-3 text-base font-bold">W tym przewodniku</h2>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#centrum">Nyhavn i nabrzeże</a></li>
                    <li><a href="#historie">Centrum historyczne</a></li>
                    <li><a href="#ctvrti">Dzielnice</a></li>
                    <li><a href="#mapa">Mapa Kopenhagi</a></li>
                    <li><a href="#itinerar">Plan zwiedzania</a></li>
                    <li><a href="#prakticky">Informacje praktyczne</a></li>
                    <li><a href="#faq">FAQ</a></li>
                  </ul>
                </nav>
              </aside>
            </div>

            <section className="my-10" aria-labelledby="map-title">
              <div className="mb-5 flex items-center gap-3">
                <MapPinned className="h-7 w-7 text-primary" />
                <h2 id="map-title" className="text-2xl font-bold md:text-3xl">Interaktywna mapa Kopenhagi</h2>
              </div>
              <ArticleMap
                lat={55.681}
                lng={12.579}
                zoom={13}
                height="520px"
                caption="Wybrane miejsca na pierwszą wizytę. Kliknij punkt, aby zobaczyć nazwę i dzielnicę."
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
                <h2 id="itinerar">Plan zwiedzania na pierwszą wizytę</h2>
                <div className="not-prose my-6 grid gap-5 md:grid-cols-3">
                  {[
                    ["Dzień 1", "Port i królewska Kopenhaga", "Nyhavn → Amalienborg → Kastellet → Mała Syrenka. Wieczorem kanały albo centrum."],
                    ["Dzień 2", "Historia i widoki", "Rosenborg → Torvehallerne → Rundetårn → Christiansborg. Wieczorem Tivoli albo Vesterbro."],
                    ["Dzień 3", "Dzielnice i woda", "Rano Nørrebro, potem Christianshavn, a jeśli starczy sił, Refshaleøen albo rejs tramwajem wodnym."],
                  ].map(([day, title, text]) => (
                    <section key={day} className="rounded-2xl border bg-card p-5 shadow-sm">
                      <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">{day}</p>
                      <h3 className="mb-3 text-lg font-bold">{title}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
                    </section>
                  ))}
                </div>

                <h2 id="prakticky">Kopenhaga praktycznie: lotnisko, transport, pogoda i budżet</h2>

                <p>
                  Jeśli przyjeżdżasz samochodem, sprawdź <Link to="/artykul/mosty-w-danii">mosty w Danii, ceny i opłaty za przejazd</Link>.
                  Na dłuższą wycieczkę za miasto przyda się przewodnik <Link to="/artykul/mons-klint">Møns Klint samochodem</Link>.
                </p>

                <h3>Lotnisko w Kopenhadze i dojazd do centrum</h3>
                <p>
                  Lotnisko leży na wyspie Amager i ma bezpośrednie połączenie z metrem i koleją. Metro jest
                  wygodne na Kongens Nytorv i Nørreport, pociąg na dworzec główny. Stacje są przy terminalu 3,
                  a bilet trzeba mieć przed wejściem. Wszystkie warianty, aktualną cenę i połączenia nocne
                  znajdziesz w artykule{" "}
                  <Link to="/artykul/lotnisko-kopenhaga-dojazd-do-centrum">lotnisko Kopenhaga – dojazd do centrum</Link>.
                </p>

                <figure className="not-prose my-8 overflow-hidden rounded-2xl border bg-card">
                  <picture>
                    <source srcSet="/images/IMG_20230712_091836.webp" type="image/webp" />
                    <img
                      src="/images/IMG_20230712_091836.jpg"
                      alt="Wnętrze dworca głównego w Kopenhadze z duńskimi flagami"
                      width="1400"
                      height="1050"
                      loading="lazy"
                      className="aspect-[16/9] w-full object-cover"
                    />
                  </picture>
                  <figcaption className="px-5 py-3 text-sm text-muted-foreground">
                    Dworzec główny leży obok Tivoli i jest wygodnym punktem dla pociągu z lotniska i wycieczek za miasto.
                  </figcaption>
                </figure>

                <h3>Pogoda w Kopenhadze i co zabrać</h3>
                <p>
                  Pogoda nad Sundem potrafi zmienić się kilka razy w ciągu dnia. Nawet latem przyda się lekka
                  kurtka przeciwdeszczowa i coś od wiatru. Prognozę sprawdzaj tuż przed wyjazdem; średnie
                  wieloletnie nie zastąpią aktualnej sytuacji. W deszczowy dzień wybierz Rosenborg, SMK,
                  Glyptotekę,{" "}
                  <Link to="/artykul/dunski-design-kopenhaga" className="text-primary hover:underline">Designmuseum Danmark i duński design</Link>{" "}
                  albo Nationalmuseet.
                </p>

                <h3>Kopenhaga tanio: gdzie można oszczędzić</h3>
                <p>
                  Najwięcej zaoszczędzisz dzięki rozsądnemu grupowaniu tras i mniejszej liczbie płatnych
                  atrakcji. Nyhavn, Kastellet, Ogród Królewski, Superkilen i długie spacery wzdłuż portu
                  są bezpłatne. Do tego dochodzi darmowy taras widokowy na Christiansborgu. Copenhagen Card
                  porównuj z konkretną listą atrakcji, które chcesz odwiedzić, a nie z obietnicą ogólnej zniżki.
                </p>

                <h3>Noclegi w Kopenhadze: wybieraj według trasy</h3>
                <p>
                  Na pierwszą krótką wizytę praktyczna jest okolica dworca głównego, Nørreport albo stacji
                  Kongens Nytorv. Nørrebro i Vesterbro dają więcej sąsiedzkiej atmosfery, a Amager szybkie
                  połączenie z lotniskiem. Oferty porównasz na naszej stronie{" "}
                  <Link to="/noclegi">noclegi w Kopenhadze i Danii</Link>.
                </p>

                <h2 id="faq">Najczęstsze pytania o Kopenhagę</h2>
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

                <h2>Źródła i aktualność</h2>
                <p>
                  Trasy opierają się na własnych zdjęciach i materiałach podróżniczych Kastrup.pl. Zmienne
                  informacje sprawdzamy u oficjalnych operatorów. Przed wyjazdem zweryfikuj u nich godziny
                  otwarcia, utrudnienia i ceny.
                </p>
                <ul>
                  {[
                    ["VisitCopenhagen: najważniejsze atrakcje (EN)", "https://www.visitcopenhagen.com/copenhagen/things-to-do/museums-and-attractions/top-attractions-copenhagen"],
                    ["VisitCopenhagen: przewodnik po dzielnicach (EN)", "https://www.visitcopenhagen.com/copenhagen/areas/neighborhoods/the-copenhagen-neighbourhood-guide"],
                    ["VisitCopenhagen: darmowe atrakcje (EN)", "https://www.visitcopenhagen.com/copenhagen/planning/inspiration/free-things-copenhagen"],
                    ["Lotnisko w Kopenhadze: metro (EN)", "https://www.cph.dk/en/parking-transport/bus-train-metro-taxi/metro"],
                    ["Lotnisko w Kopenhadze: pociąg (EN)", "https://www.cph.dk/en/parking-transport/bus-train-metro-taxi/train"],
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
                <h2 className="mb-4 text-3xl font-bold">Lądujesz na Kastrup?</h2>
                <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
                  Lotnisko to nie jedyny powód, żeby wysiąść w Kastrup. Niedaleko terminalu są łaźnie
                  morskie, akwarium i długa plaża.
                </p>
                <Link to="/artykul/kastrup">
                  <Button size="lg">Odkryj Kastrup <ArrowRight className="ml-2 h-4 w-4" /></Button>
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
