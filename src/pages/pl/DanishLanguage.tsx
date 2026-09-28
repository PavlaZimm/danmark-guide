import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, ExternalLink, Languages, MessageCircle, Volume2 } from "lucide-react";
import { Helmet } from "react-helmet-async";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";

const PAGE_URL = "https://kastrup.pl/jezyk-dunski";
const PAGE_TITLE = "Język duński: wymowa, alfabet i podstawowe zwroty | Kastrup.pl";
const PAGE_DESCRIPTION =
  "Jak się mówi w Danii? Język duński od podstaw: wymowa, alfabet z Æ, Ø i Å oraz podstawowe zwroty na podróż bez mylącej transkrypcji fonetycznej.";
const HEADLINE = "Język duński: jak się mówi w Danii i co warto wiedzieć";
const PUBLISHED_DATE = "2026-09-13";
const HERO_IMAGE = "https://kastrup.pl/images/IMG_20230712_091836.webp";

const phrases = [
  ["Hej", "Cześć"],
  ["Godmorgen", "Dzień dobry (rano)"],
  ["Tak", "Dziękuję"],
  ["Mange tak", "Dziękuję bardzo"],
  ["Undskyld", "Przepraszam"],
  ["Ja / nej", "Tak / nie"],
  ["Taler du engelsk?", "Czy mówisz po angielsku?"],
  ["Jeg taler ikke dansk", "Nie mówię po duńsku"],
  ["Hvad koster det?", "Ile to kosztuje?"],
  ["Hvor er …?", "Gdzie jest …?"],
];

const faqs = [
  {
    question: "Jak się mówi w Danii?",
    answer:
      "Językiem urzędowym i codziennym jest duński. Należy do języków północnogermańskich i posługuje się nim około sześciu milionów ludzi. W usługach turystycznych zwykle bez trudu dogadasz się też po angielsku.",
  },
  {
    question: "Czy język duński jest trudny?",
    answer:
      "Podstawowa gramatyka bywa dla początkującego bardziej przejrzysta niż wymowa. Trudne jest przede wszystkim rozpoznawanie słów w mowie, redukcja głosek i zjawisko zwane stød. Zapisane zwroty nie zastąpią więc słuchania rodzimych użytkowników języka.",
  },
  {
    question: "Jak powiedzieć po duńsku cześć i dziękuję?",
    answer:
      "Cześć to hej, a dziękuję to tak. Uprzejme podziękowanie możesz wzmocnić zwrotem mange tak, czyli dziękuję bardzo.",
  },
  {
    question: "Czy duński ma specjalne litery?",
    answer:
      "Tak. Po literze Z w duńskim alfabecie są jeszcze Æ, Ø i Å. To osobne litery, a nie tylko ozdobne warianty A i O.",
  },
];

const DanishLanguage = () => {
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
    articleSection: "Kultura duńska",
    keywords: ["język duński", "język duński podstawy", "język duński wymowa", "duński alfabet", "duńskie zwroty"],
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
      { "@type": "ListItem", position: 2, name: "Kultura duńska", item: "https://kastrup.pl/kultura-dunska" },
      { "@type": "ListItem", position: 3, name: "Język duński", item: PAGE_URL },
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
        <meta property="og:title" content={HEADLINE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:image" content={HERO_IMAGE} />
        <meta property="og:locale" content="pl_PL" />
        <meta property="og:site_name" content="Kastrup.pl" />
        <meta property="article:published_time" content={PUBLISHED_DATE} />
        <meta property="article:modified_time" content={PUBLISHED_DATE} />
        <meta property="article:section" content="Kultura duńska" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Język duński: wymowa, alfabet i zwroty" />
        <meta name="twitter:description" content={PAGE_DESCRIPTION} />
        <meta name="twitter:image" content={HERO_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <div className="min-h-screen py-10 md:py-12">
        <article className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-5xl">
            <Breadcrumbs items={[{ label: "Kultura duńska", href: "/kultura-dunska" }, { label: "Język duński" }]} />

            <header className="mx-auto mb-10 max-w-4xl text-center">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Język i praktyczne zwroty
              </p>
              <h1 className="mb-6 text-4xl font-bold md:text-6xl">{HEADLINE}</h1>
              <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                Na papierze duński wygląda przystępniej, niż brzmi. Wyjaśniamy, skąd się wziął, jak wygląda
                jego alfabet, gdzie kryją się największe pułapki wymowy i które zwroty naprawdę przydadzą
                się w podróży.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                <span>Autorka: <Link to="/o-autorce" className="font-medium text-foreground hover:text-primary">Pavla Zimmermannová</Link></span>
                <span aria-hidden="true">•</span>
                <time dateTime={PUBLISHED_DATE}>13 września 2026</time>
                <span aria-hidden="true">•</span>
                <span>7 minut czytania</span>
              </div>
            </header>

            <figure className="mb-10 overflow-hidden rounded-3xl border bg-card shadow-large">
              <picture>
                <source srcSet="/images/IMG_20230712_091836.webp" type="image/webp" />
                <img
                  src="/images/IMG_20230712_091836.jpg"
                  alt="Duńska flaga w hali dworca głównego w Kopenhadze"
                  width="1400"
                  height="1050"
                  className="aspect-[16/9] w-full object-cover"
                />
              </picture>
              <figcaption className="px-5 py-3 text-sm text-muted-foreground">
                Nawet kilka duńskich słów otwiera drogę do miejscowej kultury, choć w Danii na co dzień dogadasz się po angielsku.
              </figcaption>
            </figure>

            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
              <div className="prose prose-lg max-w-none prose-headings:scroll-mt-24">
                <section className="not-prose mb-10 rounded-2xl border-l-4 border-primary bg-primary/5 p-6 md:p-7">
                  <h2 className="mb-3 text-xl font-bold">Jak się mówi w Danii?</h2>
                  <p className="leading-relaxed text-foreground">
                    W Danii mówi się <strong>po duńsku</strong>. Język duński należy do języków
                    północnogermańskich i posługuje się nim około sześciu milionów ludzi. Jest spokrewniony
                    z norweskim i szwedzkim, ale jego mówiona odmiana bywa dla obcokrajowców trudniejsza
                    niż tekst pisany.
                  </p>
                </section>

                <h2 id="zakladni-fakta">Język duński w pięciu punktach</h2>
                <div className="not-prose my-7 grid gap-4 sm:grid-cols-2">
                  {[
                    [Languages, "Język północnogermański", "Ma wspólne historyczne korzenie ze szwedzkim i norweskim."],
                    [BookOpen, "29 liter", "Po Z następują osobne litery Æ, Ø i Å."],
                    [Volume2, "Wymowa decyduje", "Redukcja głosek i stød utrudniają rozumienie mowy."],
                    [MessageCircle, "Prostsze formy", "Czasowniki nie odmieniają się przez osoby, inaczej niż w polskim."],
                  ].map(([Icon, title, text]) => (
                    <div key={title as string} className="rounded-2xl border bg-card p-5">
                      <Icon className="mb-3 h-7 w-7 text-primary" aria-hidden="true" />
                      <h3 className="mb-2 font-semibold">{title as string}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">{text as string}</p>
                    </div>
                  ))}
                </div>

                <h2 id="vyslovnost">Dlaczego duńska wymowa jest myląca</h2>
                <p>
                  Pisany i mówiony duński nie odpowiadają sobie tak bezpośrednio jak w polskim. W codziennej
                  mowie niektóre głoski słabną albo się zlewają, a na znaczenie może wpływać także{" "}
                  <em>stød</em> — krótkie zaciśnięcie strun głosowych, dla którego polski nie ma prostego
                  odpowiednika.
                </p>
                <p>
                  Dlatego celowo nie podajemy tu rzekomo „dokładnej” polskiej transkrypcji każdego zdania.
                  Taki zapis często uczy złego nawyku. Najpierw przeczytaj zwrot, a potem posłuchaj go
                  w wiarygodnym słowniku wymowy, na przykład w Den Danske Ordbog.
                </p>

                <h2 id="abeceda">Duński alfabet: Æ, Ø i Å to nie ozdoba</h2>
                <p>
                  Duński alfabet opiera się na podstawowym alfabecie łacińskim, a na jego końcu stoją litery{" "}
                  <strong>Æ, Ø i Å</strong>. Mają własne miejsce w kolejności i mogą zmieniać znaczenie słowa.
                  Kiedy szukasz adresu albo nazwy stacji, najlepiej więc przepisać nazwę dokładnie, na przykład{" "}
                  <em>København</em> zamiast angielskiego Copenhagen.
                </p>

                <h2 id="fraze">Podstawowe zwroty po duńsku na podróż</h2>
                <p>
                  Poniższy wybór opiera się na oficjalnym duńskim portalu informacyjnym. W zwykłej podróży
                  nie potrzebujesz długiego słownika; ważniejsze jest, żeby umieć się przywitać, podziękować
                  i poprosić o pomoc.
                </p>
                <div className="not-prose my-7 overflow-x-auto rounded-2xl border bg-card">
                  <table className="w-full text-left text-sm">
                    <thead className="border-b bg-muted/50">
                      <tr>
                        <th className="px-5 py-3 font-semibold">Po duńsku</th>
                        <th className="px-5 py-3 font-semibold">Po polsku</th>
                      </tr>
                    </thead>
                    <tbody>
                      {phrases.map(([danish, polish]) => (
                        <tr key={danish} className="border-b last:border-0">
                          <td className="px-5 py-3 font-medium" lang="da">{danish}</td>
                          <td className="px-5 py-3 text-muted-foreground">{polish}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <aside className="not-prose my-7 rounded-2xl border-l-4 border-primary bg-primary/5 p-5">
                  <p className="mb-1 font-semibold">Uwaga na „tak”</p>
                  <p className="leading-relaxed text-foreground">
                    Duńskie <span lang="da">tak</span> znaczy „dziękuję”, a nie „tak”. Kiedy chcesz się zgodzić,
                    powiedz <span lang="da">ja</span>. Polskie „tak” zabrzmi dla Duńczyka jak podziękowanie.
                  </p>
                </aside>

                <h2 id="gramatika">Co w duńskiej gramatyce jest przyjemniejsze niż w polskiej</h2>
                <p>
                  Duńskie czasowniki nie zmieniają końcówki w zależności od osoby: tej samej formy używa się
                  dla ja, ty i oni. Rzeczowniki mają dwa rodzaje, oznaczane rodzajnikami <em>en</em> i <em>et</em>.
                  Określoność często dołącza się na końcu słowa. Dla Polaka nietypowy jest też sztywniejszy
                  szyk zdania, ale do podstawowych zdań w podróży nie trzeba opanować całej gramatyki.
                </p>

                <h2 id="anglictina">Czy w Danii wystarczy angielski?</h2>
                <p>
                  W transporcie, hotelu, restauracji i w miejscach turystycznych zwykle dogadasz się
                  po angielsku. Duński przyda się jednak przy czytaniu nazw, rozkładów jazdy i tablic,
                  a kilka słów po duńsku brzmi uprzejmiej niż automatyczne przejście na angielski.
                </p>
                <p>
                  Język wyjaśnia też wyrażenia, które trudno przetłumaczyć. Najbardziej znane jest
                  oczywiście{" "}<Link to="/hygge">hygge i jego prawdziwe znaczenie</Link>.
                </p>

                <h2 id="faq">Najczęstsze pytania o język duński</h2>
                {faqs.map((faq) => (
                  <details key={faq.question} className="not-prose group mb-4 rounded-2xl border bg-card p-5">
                    <summary className="cursor-pointer list-none font-semibold">{faq.question}</summary>
                    <p className="mt-3 leading-relaxed text-muted-foreground">{faq.answer}</p>
                  </details>
                ))}

                <h2 id="zdroje">Sprawdzone źródła</h2>
                <ul>
                  <li>
                    <a href="https://denmark.dk/people-and-culture/danish-language/" target="_blank" rel="noreferrer">
                      Denmark.dk: The Danish language (EN) <ExternalLink className="inline h-4 w-4" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="https://dsn.dk/" target="_blank" rel="noreferrer">
                      Dansk Sprognævn — Duńska Rada Językowa <ExternalLink className="inline h-4 w-4" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="https://ordnet.dk/ddo" target="_blank" rel="noreferrer">
                      Den Danske Ordbog — słownik z wymową <ExternalLink className="inline h-4 w-4" aria-hidden="true" />
                    </a>
                  </li>
                </ul>
              </div>

              <aside className="space-y-5 lg:sticky lg:top-24">
                <nav className="rounded-2xl border bg-card p-5" aria-label="Spis treści">
                  <p className="mb-3 font-semibold">W artykule</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><a href="#zakladni-fakta" className="hover:text-primary">Język duński w pięciu punktach</a></li>
                    <li><a href="#vyslovnost" className="hover:text-primary">Wymowa</a></li>
                    <li><a href="#abeceda" className="hover:text-primary">Alfabet</a></li>
                    <li><a href="#fraze" className="hover:text-primary">Zwroty na podróż</a></li>
                    <li><a href="#gramatika" className="hover:text-primary">Gramatyka</a></li>
                    <li><a href="#faq" className="hover:text-primary">Najczęstsze pytania</a></li>
                  </ul>
                </nav>
                <div className="rounded-2xl bg-primary p-5 text-primary-foreground">
                  <p className="mb-2 text-sm font-semibold uppercase tracking-wider opacity-80">Dalsza lektura</p>
                  <h2 className="mb-3 text-xl font-bold">Poznaj Danię w szerszym kontekście</h2>
                  <p className="mb-5 text-sm opacity-90">Język, kultura i podróże mają największy sens razem.</p>
                  <Link to="/co-zobaczyc-w-danii">
                    <Button variant="secondary" className="w-full">
                      Przewodnik po Danii <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
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

export default DanishLanguage;
