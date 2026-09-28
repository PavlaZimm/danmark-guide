import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Coffee,
  ExternalLink,
  Leaf,
  Quote,
  Users,
  Volume2,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import hyggeImage from "@/assets/hygge.jpg";
import hyggeImageWebP from "@/assets/hygge.webp";
import hyggeImage640WebP from "@/assets/hygge-640.webp";
import hyggeImage768WebP from "@/assets/hygge-768.webp";

const PAGE_URL = "https://kastrup.pl/hygge";
const PAGE_TITLE = "Hygge – co to znaczy i jak je przeżyć w Danii | Kastrup.pl";
const PAGE_DESCRIPTION =
  "Co znaczy hygge po polsku, jak się je wymawia i dlaczego to nie tylko świeczki? Poznaj prawdziwe znaczenie hygge i sposoby, jak przeżyć je w Danii.";
const HEADLINE = "Hygge bez stereotypów: co naprawdę znaczy i jak je przeżyć";
const SOCIAL_TITLE = "Hygge po polsku: co naprawdę znaczy to duńskie słowo";
const PUBLISHED_DATE = "2026-09-13";
const IMAGE = "https://kastrup.pl/images/og-kastrup.jpg";

const faqs = [
  {
    question: "Co dokładnie znaczy hygge?",
    answer:
      "Hygge oznacza przyjemną, bezpieczną i swobodną atmosferę, w której człowiek na chwilę zwalnia i cieszy się zwykłym momentem. Może powstać w gronie rodziny albo przyjaciół, ale też w samotności. Nie chodzi o konkretny produkt ani wyłącznie o styl urządzania wnętrz.",
  },
  {
    question: "Jak się wymawia hygge?",
    answer:
      "Duński słownik podaje wymowę [ˈhygə]. Uproszczone zapisy, na przykład polskimi literami, są tylko orientacyjne, bo duńskie głoski nie mają dokładnych odpowiedników w polszczyźnie.",
  },
  {
    question: "Czy hygge to tylko sprawa zimy?",
    answer:
      "Nie. Zima i Boże Narodzenie to jego najmocniejszy sezon, ale Duńczycy używają słowa hygge przez cały rok. Letnie hygge to może być piknik, grill, przejażdżka rowerem, wspólna kolacja na zewnątrz albo spokojny dzień nad morzem.",
  },
  {
    question: "Czy do hygge potrzebuję świeczek i skandynawskich mebli?",
    answer:
      "Nie. Przygaszone światło może stworzyć przyjemny nastrój, ale istotą hygge nie są dekoracje. Ważniejsze są spokój, poczucie bezpieczeństwa, bycie tu i teraz oraz czas, którym nie rządzą wydajność ani pośpiech.",
  },
  {
    question: "Czy to hygge czyni Duńczyków najszczęśliwszym narodem?",
    answer:
      "Tak prostego związku nie udowodniono. Zadowolenie Duńczyków z życia łączy się także z zaufaniem, równością, bezpieczeństwem, wspólnotą i możliwością decydowania o własnym życiu. Hygge jest jednym z kulturowych przejawów tego środowiska, a nie jego jedyną przyczyną.",
  },
];

const Hygge = () => {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${PAGE_URL}#article`,
    headline: HEADLINE,
    alternativeHeadline: "Co to jest hygge, jak się je wymawia i jak wygląda w codziennym duńskim życiu",
    description: PAGE_DESCRIPTION,
    image: IMAGE,
    datePublished: PUBLISHED_DATE,
    dateModified: PUBLISHED_DATE,
    inLanguage: "pl-PL",
    articleSection: "Kultura duńska",
    keywords: [
      "hygge",
      "hygge po polsku",
      "co to jest hygge",
      "hygge wymowa",
      "styl hygge",
      "duński styl życia",
    ],
    author: {
      "@type": "Person",
      name: "Pavla Zimmermannová",
      url: "https://kastrup.pl/o-autorce",
    },
    publisher: {
      "@type": "Organization",
      name: "Kastrup.pl",
      url: "https://kastrup.pl",
      logo: {
        "@type": "ImageObject",
        url: "https://kastrup.pl/icon-512.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": PAGE_URL,
    },
    about: {
      "@type": "Thing",
      name: "Hygge",
      description: "Duńskie pojęcie kulturowe oznaczające przyjemną, bezpieczną i swobodną atmosferę.",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Start",
        item: "https://kastrup.pl/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Hygge i kultura",
        item: "https://kastrup.pl/kultura-dunska",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Hygge",
        item: PAGE_URL,
      },
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
        <meta property="og:title" content={SOCIAL_TITLE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:image" content={IMAGE} />
        <meta property="og:locale" content="pl_PL" />
        <meta property="og:site_name" content="Kastrup.pl" />
        <meta property="article:published_time" content={PUBLISHED_DATE} />
        <meta property="article:modified_time" content={PUBLISHED_DATE} />
        <meta property="article:section" content="Kultura duńska" />
        <meta property="article:author" content="Pavla Zimmermannová" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SOCIAL_TITLE} />
        <meta name="twitter:description" content={PAGE_DESCRIPTION} />
        <meta name="twitter:image" content={IMAGE} />

        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <div className="min-h-screen py-10 md:py-12">
        <article className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-5xl">
            <Breadcrumbs
              items={[
                { label: "Hygge i kultura", href: "/kultura-dunska" },
                { label: "Hygge" },
              ]}
            />

            <header className="mx-auto mb-10 max-w-4xl text-center">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Kultura duńska bez reklamowych klisz
              </p>
              <h1 className="mb-6 text-4xl font-bold md:text-6xl">{HEADLINE}</h1>
              <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                To nie styl mebli ani obowiązkowy zestaw: koc, świeczka i kakao. Hygge jest
                zwyczajniejszą, bardziej towarzyską i ciekawszą częścią duńskiego życia.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                <span>
                  Autorka: <Link to="/o-autorce" className="font-medium text-foreground hover:text-primary">Pavla Zimmermannová</Link>
                </span>
                <span aria-hidden="true">•</span>
                <time dateTime={PUBLISHED_DATE}>13 września 2026</time>
                <span aria-hidden="true">•</span>
                <span>12 minut czytania</span>
              </div>
            </header>

            <figure className="mb-10 overflow-hidden rounded-3xl border bg-card shadow-large">
              <picture>
                <source
                  srcSet={`${hyggeImage640WebP} 640w, ${hyggeImage768WebP} 768w, ${hyggeImageWebP} 1024w`}
                  sizes="(min-width: 1024px) 1024px, 100vw"
                  type="image/webp"
                />
                <img
                  src={hyggeImage}
                  alt="Spokojna atmosfera hygge z ciepłym napojem i przygaszonym światłem"
                  width="1024"
                  height="576"
                  className="aspect-[16/9] w-full object-cover"
                />
              </picture>
              <figcaption className="px-5 py-3 text-sm text-muted-foreground">
                Świeczka może pomóc stworzyć nastrój. Sama w sobie hygge jednak nie gwarantuje.
              </figcaption>
            </figure>

            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
              <div className="min-w-0">
                <section id="co-je-hygge" className="scroll-mt-24" aria-labelledby="co-je-hygge-title">
                  <div className="mb-10 rounded-2xl border-l-4 border-primary bg-primary/5 p-6 md:p-8">
                    <h2 id="co-je-hygge-title" className="mb-4 text-2xl font-bold md:text-3xl">Co to jest hygge?</h2>
                    <p className="text-lg leading-relaxed md:text-xl">
                      <strong>Hygge to duńskie określenie przyjemnej, bezpiecznej i swobodnej atmosfery,</strong>{" "}
                      w której człowiek na chwilę zwalnia i cieszy się zwykłym momentem. Może się pojawić przy
                      wspólnym posiłku, rozmowie albo wycieczce, ale także w samotności. To nie produkt ani
                      wyłącznie styl urządzania wnętrz.
                    </p>
                  </div>

                  <p className="mb-6 text-lg leading-8 text-muted-foreground">
                    Hygge po polsku nie da się dokładnie oddać jednym słowem. „Błogość” oddaje spokój,
                    „przytulność” otoczenie, a „bycie razem” wspólną chwilę. Hygge może zawierać wszystkie
                    trzy elementy, ale żaden z nich nie jest obowiązkowy. Nie liczy się dekoracja; ważne jest,
                    żeby wszyscy obecni czuli się dobrze, bezpiecznie i nie musieli się nigdzie spieszyć.
                  </p>
                  <p className="mb-8 text-lg leading-8 text-muted-foreground">
                    Duńczycy traktują to słowo zresztą bardzo praktycznie. Hygge jest rzeczownikiem, ale
                    istnieje też czasownik <em>at hygge sig</em> — miło spędzać czas — i przymiotnik{" "}
                    <em>hyggelig</em>. Hygge nie jest więc uroczystą filozofią zarezerwowaną na wyjątkowe
                    okazje. To zwykłe słowo, którym opisuje się jakość chwili.
                  </p>
                </section>

                <section id="vyslovnost" className="scroll-mt-24 py-8" aria-labelledby="vyslovnost-title">
                  <div className="mb-5 flex items-center gap-3">
                    <Volume2 className="h-7 w-7 text-primary" aria-hidden="true" />
                    <h2 id="vyslovnost-title" className="text-3xl font-bold md:text-4xl">Hygge: wymowa i pochodzenie słowa</h2>
                  </div>
                  <p className="mb-5 text-lg leading-8 text-muted-foreground">
                    Oficjalny słownik duński podaje wymowę <strong className="text-foreground">[ˈhygə]</strong>.
                    Źródła anglojęzyczne zapisują ją czasem jako „hoo-gah”. Taki zapis, podobnie jak każda
                    próba oddania jej polskimi literami, jest tylko przybliżoną pomocą, bo duńska wymowa nie
                    ma dokładnego polskiego odpowiednika.
                  </p>
                  <p className="text-lg leading-8 text-muted-foreground">
                    Słowo jest spokrewnione ze staronordyjskim <em>hyggja</em>, a jego dzisiejsze znaczenie
                    trafiło do duńskiego z norweskiego. W duńskich tekstach pojawia się w tym sensie mniej
                    więcej od końca XVIII wieku. Szczegóły i nagranie wymowy znajdziesz w słowniku{" "}
                    <a
                      href="https://ordnet.dk/ddo/ordbog/hygge"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-primary underline-offset-4 hover:underline"
                    >
                      Den Danske Ordbog
                      <ExternalLink className="ml-1 inline h-3.5 w-3.5" aria-hidden="true" />
                    </a>.
                  </p>
                </section>

                <section id="neni" className="scroll-mt-24 py-8" aria-labelledby="neni-title">
                  <h2 id="neni-title" className="mb-6 text-3xl font-bold md:text-4xl">Czym hygge nie jest</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      ["To nie lista zakupów", "Koc, kubek czy designerska lampa mogą być przyjemne, ale poczucia bliskości i spokoju nie da się kupić."],
                      ["Nie tylko na zimę", "Długie, ciemne wieczory uwydatniają hygge, ale to samo słowo pasuje też do pikniku, ogrodu czy dnia nad morzem."],
                      ["To nie to samo co samotność", "Hygge można przeżyć w pojedynkę, ale jego ważną formą jest wspólny czas bez sztywnego planu."],
                      ["To nie klucz do szczęścia", "Zadowolenie Duńczyków z życia ma podłoże społeczne i ekonomiczne. Jedno słowo z kultury samo tego nie wyjaśnia."],
                    ].map(([title, text]) => (
                      <article key={title} className="rounded-2xl border bg-card p-5 shadow-sm">
                        <h3 className="mb-2 text-lg font-semibold">{title}</h3>
                        <p className="text-muted-foreground">{text}</p>
                      </article>
                    ))}
                  </div>
                </section>

                <section id="dansko" className="scroll-mt-24 py-8" aria-labelledby="dansko-title">
                  <div className="mb-5 flex items-center gap-3">
                    <Users className="h-7 w-7 text-primary" aria-hidden="true" />
                    <h2 id="dansko-title" className="text-3xl font-bold md:text-4xl">Dlaczego hygge jest tak bardzo duńskie</h2>
                  </div>
                  <p className="mb-5 text-lg leading-8 text-muted-foreground">
                    Pogoda daje prostą część odpowiedzi. Duńska jesień i zima są długie, wietrzne i ciemne,
                    więc ludzie spędzają więcej czasu w środku. Ciepłe światło, wspólny posiłek i spokojny
                    wieczór pomagają stworzyć miejsce, w którym chce się zostać. Na pogodzie ta historia
                    się jednak nie kończy.
                  </p>
                  <p className="mb-5 text-lg leading-8 text-muted-foreground">
                    Oficjalne duńskie źródła łączą hygge także z równością i staraniem, żeby każdy przy stole
                    czuł się częścią grupy. Duńskie społeczeństwo w ogóle opiera się na wysokim poziomie
                    zaufania: ludzie zwykle zakładają, że inni i instytucje będą postępować rzetelnie. To
                    właśnie bezpieczeństwo, brak ostentacji i mniejszy nacisk na hierarchię tworzą warunki,
                    w których można się na chwilę wyłączyć.
                  </p>
                  <blockquote className="my-8 rounded-2xl bg-secondary p-6 md:p-8">
                    <Quote className="mb-4 h-8 w-8 text-primary" aria-hidden="true" />
                    <p className="text-xl font-medium leading-relaxed">
                      Hygge to nie konkurs na najpiękniejszy wieczór. Kiedy atmosferę trzeba udowadniać,
                      fotografować i oceniać, jej istota zaczyna się ulatniać.
                    </p>
                  </blockquote>
                  <p className="text-lg leading-8 text-muted-foreground">
                    Byłoby jednak dużym uproszczeniem nazywać hygge duńską sztuką szczęścia, która
                    „uszczęśliwia Duńczyków”. Międzynarodowe rankingi zadowolenia z życia wiążą się także
                    z zabezpieczeniem socjalnym, równością, zaufaniem, wolnością osobistą i możliwością
                    wpływu na własne życie. Hygge jest widoczną częścią kultury, a nie magicznym
                    wyjaśnieniem całego społeczeństwa.
                  </p>
                </section>

                <section id="rocni-obdobi" className="scroll-mt-24 py-8" aria-labelledby="obdobi-title">
                  <div className="mb-5 flex items-center gap-3">
                    <CalendarDays className="h-7 w-7 text-primary" aria-hidden="true" />
                    <h2 id="obdobi-title" className="text-3xl font-bold md:text-4xl">Hygge przez cały rok</h2>
                  </div>
                  <p className="mb-7 text-lg leading-8 text-muted-foreground">
                    Wyobrażenie, że hygge zaczyna się od pierwszej świeczki w październiku i kończy wiosną,
                    to głównie obrazek na eksport. Duńczycy nazywają <em>hyggelig</em> sytuacje o każdej
                    porze roku.
                  </p>
                  <div className="grid gap-5 md:grid-cols-2">
                    <article className="rounded-2xl border bg-card p-6">
                      <Coffee className="mb-4 h-8 w-8 text-primary" aria-hidden="true" />
                      <h3 className="mb-3 text-xl font-semibold">Jesień i zima</h3>
                      <p className="text-muted-foreground">
                        Wspólna kolacja, pieczenie, gra planszowa, odwiedziny u przyjaciół, przygaszone
                        światło albo gorący napój po spacerze na wietrze. W grudniu dochodzi{" "}
                        <em>julehygge</em>: spotkania adwentowe, gløgg, æbleskiver i czas z rodziną albo
                        z kolegami z pracy.
                      </p>
                    </article>
                    <article className="rounded-2xl border bg-card p-6">
                      <Leaf className="mb-4 h-8 w-8 text-primary" aria-hidden="true" />
                      <h3 className="mb-3 text-xl font-semibold">Wiosna i lato</h3>
                      <p className="text-muted-foreground">
                        Piknik w parku, długa kolacja na świeżym powietrzu, grill z przyjaciółmi, przejażdżka
                        rowerem, dzień w prostym domku letniskowym albo przystanek nad morzem. Sceneria się
                        zmienia, a wolne tempo i wspólny czas zostają.
                      </p>
                    </article>
                  </div>
                </section>

                <section id="jak-zazit" className="scroll-mt-24 py-8" aria-labelledby="zazit-title">
                  <h2 id="zazit-title" className="mb-5 text-3xl font-bold md:text-4xl">Jak przeżyć hygge podczas podróży do Danii</h2>
                  <p className="mb-7 text-lg leading-8 text-muted-foreground">
                    Turysta nie odtworzy w jedno popołudnie przyjaźni budowanych latami. Może jednak
                    podróżować tak, żeby zostawić hygge trochę miejsca. Poniższe wskazówki to nie lista
                    atrakcji, tylko drobne zmiany tempa.
                  </p>
                  <ol className="space-y-5">
                    {[
                      ["Nie planuj dnia bez ani jednej przerwy.", "Wybierz mniej miejsc i zostaw sobie czas, żeby posiedzieć tam, gdzie dobrze się czujesz. Hygge zwykle nie powstaje między dwoma odhaczonymi zabytkami."],
                      ["Idź do kawiarni, ale nie rozkładaj na stole pracy.", "Zamów kawę i jakiś wypiek, odłóż telefon i przyglądaj się zwykłemu rytmowi miasta. Liczy się spokój, nie nazwa lokalu."],
                      ["Dziel się jedzeniem.", "Wspólny obiad albo kolacja to naturalna okazja do rozmowy. Duńskie smørrebrød jest zresztą częścią tutejszej codziennej kultury."],
                      ["Wychodź na zewnątrz także przy gorszej pogodzie.", "Krótki spacer nad wodą albo przez park sprawi, że powrót do ciepła będzie przyjemniejszy. Hygge to nie ucieczka przed tym, co na zewnątrz, tylko kontrast i rytm."],
                      ["Latem korzystaj z przestrzeni publicznej.", "Piknik, kąpiel w porcie, park albo spokojna przejażdżka rowerem pokazują, że hygge nie potrzebuje ciemności ani kominka."],
                      ["Postaw na prostotę.", "Nie musisz szukać lokalu, który ma hygge wypisane na szyldzie. Często bardziej autentyczna jest zwykła chwila bez turystycznego scenariusza."],
                    ].map(([title, text], index) => (
                      <li key={title} className="flex gap-4 rounded-2xl border bg-card p-5">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
                          {index + 1}
                        </span>
                        <div>
                          <h3 className="mb-1 text-lg font-semibold">{title}</h3>
                          <p className="text-muted-foreground">{text}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link to="/kopenhaga">
                      <Button>
                        Co zobaczyć w Kopenhadze
                        <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                      </Button>
                    </Link>
                    <Link to="/noclegi">
                      <Button variant="outline">Znajdź nocleg</Button>
                    </Link>
                  </div>
                </section>

                <section id="odvracena-strana" className="scroll-mt-24 py-8" aria-labelledby="odvracena-title">
                  <h2 id="odvracena-title" className="mb-5 text-3xl font-bold md:text-4xl">Czy hygge ma też ciemną stronę?</h2>
                  <p className="mb-5 text-lg leading-8 text-muted-foreground">
                    Tak. Przyjemna atmosfera w grupie może jednocześnie wyznaczać granicę dla tych, którzy do
                    niej nie należą. Ktoś nowy nie musi znać niepisanych zasad, wspólnych wspomnień ani
                    poczucia humoru tej grupy. Hygge nie jest wtedy automatycznie otwarte dla każdego, choć
                    z zewnątrz tak właśnie się je przedstawia.
                  </p>
                  <p className="mb-5 text-lg leading-8 text-muted-foreground">
                    Unikanie konfliktu też ma dwie strony. Pomaga chronić spokojny wieczór, ale ważny albo
                    niewygodny temat może zostać niewypowiedziany. Nawet oficjalna strona Denmark.dk zwraca
                    uwagę, że hygge może zostawić przybysza „na zewnątrz”, bo często toczy się w już
                    istniejącym kręgu.
                  </p>
                  <p className="text-lg leading-8 text-muted-foreground">
                    Ten szczegół nie psuje hygge. Przeciwnie, przenosi je z reklamowego obrazka do
                    prawdziwej kultury, która jak każda inna ma swoje zalety, granice i sprzeczności.
                  </p>
                </section>

                <section id="doma" className="scroll-mt-24 py-8" aria-labelledby="doma-title">
                  <h2 id="doma-title" className="mb-5 text-3xl font-bold md:text-4xl">Jak przenieść hygge do domu bez zakupów</h2>
                  <p className="mb-6 text-lg leading-8 text-muted-foreground">
                    Styl hygge nie wymaga wymiany mebli ani idealnie dopasowanego wnętrza. Bardziej przydaje
                    się zmiana warunków, w jakich spędzamy razem czas.
                  </p>
                  <ul className="space-y-4">
                    {[
                      "Umów się na wieczór bez obowiązkowego programu i bez pośpiechu na kolejną aktywność.",
                      "Przygotujcie razem proste jedzenie, zamiast starać się zaimponować gościom.",
                      "Odłóżcie telefony poza stół, żeby nikt nie musiał konkurować z powiadomieniami.",
                      "Wybierz miejsce, w którym wszyscy czują się wygodnie — nie tylko takie, które dobrze wygląda.",
                      "Zostaw chwilę na ciszę. Hygge nie musi być nieprzerwaną rozrywką.",
                      "Zaproś kogoś, kto inaczej zostałby poza grupą. Otwartość też może być hyggelig.",
                    ].map((item) => (
                      <li key={item} className="flex gap-3 text-lg leading-8 text-muted-foreground">
                        <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section id="faq" className="scroll-mt-24 py-8" aria-labelledby="faq-title">
                  <h2 id="faq-title" className="mb-7 text-3xl font-bold md:text-4xl">Najczęstsze pytania o hygge</h2>
                  <div className="space-y-4">
                    {faqs.map((faq) => (
                      <article key={faq.question} className="rounded-2xl border bg-card p-6">
                        <h3 className="mb-3 text-xl font-semibold">{faq.question}</h3>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </article>
                    ))}
                  </div>
                </section>

                <section id="zdroje" className="scroll-mt-24 py-8" aria-labelledby="zdroje-title">
                  <div className="mb-5 flex items-center gap-3">
                    <BookOpen className="h-7 w-7 text-primary" aria-hidden="true" />
                    <h2 id="zdroje-title" className="text-3xl font-bold md:text-4xl">Źródła i weryfikacja</h2>
                  </div>
                  <p className="mb-5 text-muted-foreground">
                    Tekst opiera się przede wszystkim na duńskich źródłach językowych i oficjalnych źródłach
                    o kulturze. Ostatnia merytoryczna weryfikacja: 13 września 2026.
                  </p>
                  <ul className="space-y-3 text-sm">
                    {[
                      ["Den Danske Ordbog: hygge", "https://ordnet.dk/ddo/ordbog/hygge"],
                      ["Denmark.dk: czym jest hygge (EN)", "https://denmark.dk/people-and-culture/hygge"],
                      ["Denmark.dk: dlaczego Duńczycy są tacy szczęśliwi? (EN)", "https://denmark.dk/people-and-culture/happiness"],
                      ["Denmark.dk: zaufanie jako fundament duńskiej kultury (EN)", "https://denmark.dk/people-and-culture/trust"],
                      ["VisitDenmark: czym jest hygge? (EN)", "https://www.visitdenmark.com/denmark/things-do/traditions-lifestyle/hygge"],
                    ].map(([label, href]) => (
                      <li key={href}>
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center font-medium text-primary underline-offset-4 hover:underline"
                        >
                          {label}
                          <ExternalLink className="ml-1.5 h-3.5 w-3.5" aria-hidden="true" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="mt-8 rounded-3xl bg-gradient-card p-7 text-center md:p-10">
                  <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">Czytaj dalej</p>
                  <h2 className="mb-4 text-3xl font-bold">Poznaj Danię poza widokówkami</h2>
                  <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
                    W dziale o kulturze stopniowo przybywa tekstów o jedzeniu, tradycjach, języku, designie
                    i codziennym życiu.
                  </p>
                  <Link to="/kultura-dunska">
                    <Button size="lg">
                      Hygge i kultura duńska
                      <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Button>
                  </Link>
                </section>
              </div>

              <aside className="order-first lg:order-none lg:sticky lg:top-24" aria-label="Spis treści">
                <nav className="rounded-2xl border bg-card p-5 shadow-sm">
                  <p className="mb-4 font-semibold">W artykule znajdziesz</p>
                  <ol className="space-y-3 text-sm text-muted-foreground">
                    {[
                      ["Co to jest hygge", "#co-je-hygge"],
                      ["Wymowa i pochodzenie", "#vyslovnost"],
                      ["Czym hygge nie jest", "#neni"],
                      ["Dlaczego jest tak duńskie", "#dansko"],
                      ["Hygge przez cały rok", "#rocni-obdobi"],
                      ["Jak je przeżyć", "#jak-zazit"],
                      ["Ciemna strona", "#odvracena-strana"],
                      ["Hygge w domu", "#doma"],
                      ["Najczęstsze pytania", "#faq"],
                    ].map(([label, href]) => (
                      <li key={href}>
                        <a href={href} className="transition-colors hover:text-primary">{label}</a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </aside>
            </div>
          </div>
        </article>
      </div>
    </>
  );
};

export default Hygge;
