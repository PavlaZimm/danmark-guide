import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, ExternalLink, Languages, MessageCircle, Volume2 } from "lucide-react";
import { Helmet } from "react-helmet-async";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";

const PAGE_URL = "https://kastrup.cz/danstina";
const PAGE_TITLE = "Dánština: jazyk, výslovnost a fráze | Kastrup.cz";
const PAGE_DESCRIPTION =
  "Jak se mluví v Dánsku? Poznejte dánštinu, její výslovnost, abecedu a praktické fráze na cestu bez zavádějícího fonetického přepisu.";
const PUBLISHED_DATE = "2026-09-13";
const HERO_IMAGE = "https://kastrup.cz/images/IMG_20230712_091836.webp";

const phrases = [
  ["Hej", "Ahoj"],
  ["Godmorgen", "Dobré ráno"],
  ["Tak", "Děkuji"],
  ["Mange tak", "Moc děkuji"],
  ["Undskyld", "Promiňte / omlouvám se"],
  ["Ja / nej", "Ano / ne"],
  ["Taler du engelsk?", "Mluvíte anglicky?"],
  ["Jeg taler ikke dansk", "Nemluvím dánsky"],
  ["Hvad koster det?", "Kolik to stojí?"],
  ["Hvor er …?", "Kde je …?"],
];

const faqs = [
  {
    question: "Jak se mluví v Dánsku?",
    answer:
      "Úředním a běžným jazykem je dánština. Patří mezi severogermánské jazyky a mluví jí přibližně šest milionů lidí. V turistických službách se obvykle snadno domluvíte také anglicky.",
  },
  {
    question: "Je dánština těžká?",
    answer:
      "Základní gramatika bývá pro začátečníka přehlednější než výslovnost. Obtížné je hlavně rozpoznávání mluvených slov, redukce hlásek a zvuk zvaný stød. Psané fráze proto nenahrazují poslech rodilých mluvčích.",
  },
  {
    question: "Jak se řekne dánsky ahoj a děkuji?",
    answer:
      "Ahoj je hej a děkuji je tak. Zdvořilé poděkování můžete zesílit spojením mange tak, tedy moc děkuji.",
  },
  {
    question: "Má dánština zvláštní písmena?",
    answer:
      "Ano. Za písmenem Z následují v dánské abecedě ještě Æ, Ø a Å. Jsou to samostatná písmena, nikoli jen ozdobné varianty A a O.",
  },
];

const DanishLanguage = () => {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${PAGE_URL}#article`,
    headline: "Dánština: jak se mluví v Dánsku, výslovnost a fráze",
    description: PAGE_DESCRIPTION,
    image: HERO_IMAGE,
    datePublished: PUBLISHED_DATE,
    dateModified: PUBLISHED_DATE,
    inLanguage: "cs-CZ",
    articleSection: "Dánská kultura",
    keywords: ["dánština", "dánsko jazyk", "jak se mluví v Dánsku", "dánská abeceda"],
    author: {
      "@type": "Person",
      name: "Pavla Zimmermannová",
      url: "https://kastrup.cz/autorka",
    },
    publisher: {
      "@type": "Organization",
      name: "Kastrup.cz",
      url: "https://kastrup.cz",
      logo: { "@type": "ImageObject", url: "https://kastrup.cz/icon-512.png" },
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
      { "@type": "ListItem", position: 2, name: "Dánská kultura", item: "https://kastrup.cz/kultura" },
      { "@type": "ListItem", position: 3, name: "Dánština", item: PAGE_URL },
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
        <meta property="og:title" content="Dánština: jak se mluví v Dánsku a co se hodí znát" />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:image" content={HERO_IMAGE} />
        <meta property="og:locale" content="cs_CZ" />
        <meta property="og:site_name" content="Kastrup.cz" />
        <meta property="article:published_time" content={PUBLISHED_DATE} />
        <meta property="article:modified_time" content={PUBLISHED_DATE} />
        <meta property="article:section" content="Dánská kultura" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dánština: jazyk, výslovnost a fráze" />
        <meta name="twitter:description" content={PAGE_DESCRIPTION} />
        <meta name="twitter:image" content={HERO_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <div className="min-h-screen py-10 md:py-12">
        <article className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-5xl">
            <Breadcrumbs items={[{ label: "Dánská kultura", href: "/kultura" }, { label: "Dánština" }]} />

            <header className="mx-auto mb-10 max-w-4xl text-center">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Jazyk a praktické fráze
              </p>
              <h1 className="mb-6 text-4xl font-bold md:text-6xl">
                Dánština: jak se mluví v Dánsku a co se hodí znát
              </h1>
              <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                Dánština vypadá na papíře přístupněji, než zní. Vysvětlíme její původ, abecedu,
                největší výslovnostní záludnosti a fráze, které opravdu využijete na cestě.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                <span>Autor: <Link to="/autorka" className="font-medium text-foreground hover:text-primary">Pavla Zimmermannová</Link></span>
                <span aria-hidden="true">•</span>
                <time dateTime={PUBLISHED_DATE}>13. září 2026</time>
                <span aria-hidden="true">•</span>
                <span>7 minut čtení</span>
              </div>
            </header>

            <figure className="mb-10 overflow-hidden rounded-3xl border bg-card shadow-large">
              <picture>
                <source srcSet="/images/IMG_20230712_091836.webp" type="image/webp" />
                <img
                  src="/images/IMG_20230712_091836.jpg"
                  alt="Dánská vlajka v hale hlavního nádraží v Kodani"
                  width="1400"
                  height="1050"
                  className="aspect-[16/9] w-full object-cover"
                />
              </picture>
              <figcaption className="px-5 py-3 text-sm text-muted-foreground">
                I pár dánských slov otevírá cestu k místní kultuře, přestože se v Dánsku běžně domluvíte anglicky.
              </figcaption>
            </figure>

            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
              <div className="prose prose-lg max-w-none prose-headings:scroll-mt-24">
                <section className="not-prose mb-10 rounded-2xl border-l-4 border-primary bg-primary/5 p-6 md:p-7">
                  <h2 className="mb-3 text-xl font-bold">Jak se mluví v Dánsku?</h2>
                  <p className="leading-relaxed text-foreground">
                    V Dánsku se mluví <strong>dánsky</strong>. Dánština je severogermánský jazyk s přibližně
                    šesti miliony mluvčích. Je příbuzná norštině a švédštině, ale její mluvená podoba
                    bývá pro cizince obtížnější než psaný text.
                  </p>
                </section>

                <h2 id="zakladni-fakta">Dánština v pěti bodech</h2>
                <div className="not-prose my-7 grid gap-4 sm:grid-cols-2">
                  {[
                    [Languages, "Severogermánský jazyk", "Sdílí historické kořeny se švédštinou a norštinou."],
                    [BookOpen, "29 písmen", "Za Z následují samostatná písmena Æ, Ø a Å."],
                    [Volume2, "Výslovnost rozhoduje", "Redukce hlásek a stød ztěžují porozumění mluvené řeči."],
                    [MessageCircle, "Jednodušší tvary", "Slovesa nemění tvar podle osoby jako v češtině."],
                  ].map(([Icon, title, text]) => (
                    <div key={title as string} className="rounded-2xl border bg-card p-5">
                      <Icon className="mb-3 h-7 w-7 text-primary" aria-hidden="true" />
                      <h3 className="mb-2 font-semibold">{title as string}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">{text as string}</p>
                    </div>
                  ))}
                </div>

                <h2 id="vyslovnost">Proč dánská výslovnost mate</h2>
                <p>
                  Psaná a mluvená dánština si neodpovídají tak přímo jako čeština. V běžné řeči se některé
                  hlásky zeslabují nebo splývají a význam může ovlivnit také <em>stød</em> — krátké sevření
                  hlasivek, pro které čeština nemá jednoduchý ekvivalent.
                </p>
                <p>
                  Proto zde záměrně nepíšeme údajně „přesný“ český přepis každé věty. Takový přepis často
                  naučí špatný návyk. Nejprve si frázi přečtěte a potom si ji poslechněte v důvěryhodném
                  výslovnostním slovníku, například v Den Danske Ordbog.
                </p>

                <h2 id="abeceda">Dánská abeceda: Æ, Ø a Å nejsou ozdoba</h2>
                <p>
                  Dánská abeceda používá základní latinku a na jejím konci písmena <strong>Æ, Ø a Å</strong>.
                  Mají vlastní pořadí a mohou měnit význam slova. Při hledání adresy nebo názvu stanice je
                  proto nejlepší opsat název přesně, například <em>København</em> místo anglického Copenhagen.
                </p>

                <h2 id="fraze">Základní dánské fráze na cestu</h2>
                <p>
                  Následující výběr vychází z oficiálního dánského informačního portálu. K běžné cestě
                  nepotřebujete dlouhý slovník; důležitější je umět pozdravit, poděkovat a zeptat se na pomoc.
                </p>
                <div className="not-prose my-7 overflow-x-auto rounded-2xl border bg-card">
                  <table className="w-full text-left text-sm">
                    <thead className="border-b bg-muted/50">
                      <tr>
                        <th className="px-5 py-3 font-semibold">Dánsky</th>
                        <th className="px-5 py-3 font-semibold">Česky</th>
                      </tr>
                    </thead>
                    <tbody>
                      {phrases.map(([danish, czech]) => (
                        <tr key={danish} className="border-b last:border-0">
                          <td className="px-5 py-3 font-medium" lang="da">{danish}</td>
                          <td className="px-5 py-3 text-muted-foreground">{czech}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <h2 id="gramatika">Co je na dánské gramatice příjemnější než v češtině</h2>
                <p>
                  Dánská slovesa nemění koncovku podle osoby: stejný tvar se používá pro já, ty i oni.
                  Podstatná jména mají dva rody, označované členy <em>en</em> a <em>et</em>. Určitost se často
                  připojí na konec slova. Pro Čecha je nezvyklý také pevnější slovosled, ale na základní
                  cestovatelské věty není nutné zvládnout celou gramatiku.
                </p>

                <h2 id="anglictina">Stačí v Dánsku angličtina?</h2>
                <p>
                  V dopravě, hotelu, restauraci i turistických místech se zpravidla domluvíte anglicky.
                  Dánština však pomůže při čtení názvů, jízdních řádů a cedulí a několik slov působí
                  zdvořileji než automatický přechod do angličtiny.
                </p>
                <p>
                  Jazyk také vysvětluje výrazy, které se překládají obtížně. Nejznámější je samozřejmě
                  <Link to="/hygge"> hygge a jeho skutečný význam</Link>.
                </p>

                <h2 id="faq">Časté otázky o dánštině</h2>
                {faqs.map((faq) => (
                  <details key={faq.question} className="not-prose group mb-4 rounded-2xl border bg-card p-5">
                    <summary className="cursor-pointer list-none font-semibold">{faq.question}</summary>
                    <p className="mt-3 leading-relaxed text-muted-foreground">{faq.answer}</p>
                  </details>
                ))}

                <h2 id="zdroje">Ověřené zdroje</h2>
                <ul>
                  <li>
                    <a href="https://denmark.dk/people-and-culture/danish-language/" target="_blank" rel="noreferrer">
                      Denmark.dk: The Danish language <ExternalLink className="inline h-4 w-4" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="https://dsn.dk/" target="_blank" rel="noreferrer">
                      Dansk Sprognævn — Dánská jazyková rada <ExternalLink className="inline h-4 w-4" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="https://ordnet.dk/ddo" target="_blank" rel="noreferrer">
                      Den Danske Ordbog — slovník s výslovností <ExternalLink className="inline h-4 w-4" aria-hidden="true" />
                    </a>
                  </li>
                </ul>
              </div>

              <aside className="space-y-5 lg:sticky lg:top-24">
                <nav className="rounded-2xl border bg-card p-5" aria-label="Obsah stránky">
                  <p className="mb-3 font-semibold">V článku</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><a href="#zakladni-fakta" className="hover:text-primary">Dánština v pěti bodech</a></li>
                    <li><a href="#vyslovnost" className="hover:text-primary">Výslovnost</a></li>
                    <li><a href="#abeceda" className="hover:text-primary">Abeceda</a></li>
                    <li><a href="#fraze" className="hover:text-primary">Fráze na cestu</a></li>
                    <li><a href="#gramatika" className="hover:text-primary">Gramatika</a></li>
                    <li><a href="#faq" className="hover:text-primary">Časté otázky</a></li>
                  </ul>
                </nav>
                <div className="rounded-2xl bg-primary p-5 text-primary-foreground">
                  <p className="mb-2 text-sm font-semibold uppercase tracking-wider opacity-80">Další čtení</p>
                  <h2 className="mb-3 text-xl font-bold">Poznejte Dánsko v souvislostech</h2>
                  <p className="mb-5 text-sm opacity-90">Jazyk, kultura a cestování dávají největší smysl dohromady.</p>
                  <Link to="/o-dansku">
                    <Button variant="secondary" className="w-full">
                      Průvodce Dánskem <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
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
