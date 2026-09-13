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
import { DEFAULT_SOCIAL_IMAGE } from "@/lib/seo-helpers";
import hyggeImage from "@/assets/hygge.jpg";
import hyggeImageWebP from "@/assets/hygge.webp";
import hyggeImage640WebP from "@/assets/hygge-640.webp";
import hyggeImage768WebP from "@/assets/hygge-768.webp";

const PAGE_URL = "https://kastrup.cz/hygge";
const PAGE_TITLE = "Hygge: co znamená a jak ho zažít v Dánsku | Kastrup.cz";
const PAGE_DESCRIPTION =
  "Co je hygge, jak se vyslovuje a proč není jen o svíčkách? Poznejte skutečný význam hygge i konkrétní způsoby, jak ho zažít v Dánsku.";
const PUBLISHED_DATE = "2026-09-13";

const faqs = [
  {
    question: "Co přesně znamená hygge?",
    answer:
      "Hygge označuje příjemnou, bezpečnou a uvolněnou atmosféru, ve které člověk na chvíli zpomalí a užívá si obyčejný okamžik. Může vzniknout s rodinou či přáteli, ale také o samotě. Nejde o konkrétní výrobek ani pouze o styl bydlení.",
  },
  {
    question: "Jak se vyslovuje hygge?",
    answer:
      "Dánský slovník uvádí výslovnost [ˈhygə]. České přepisy jako „hü-ge“ jsou jen orientační, protože dánské hlásky nemají přesný český protějšek.",
  },
  {
    question: "Je hygge pouze zimní záležitost?",
    answer:
      "Není. Zima a Vánoce jsou jeho nejsilnější sezónou, ale Dánové používají slovo hygge po celý rok. Letní hygge může být piknik, grilování, projížďka na kole, společná večeře venku nebo klidný den u moře.",
  },
  {
    question: "Potřebuji k hygge svíčky a skandinávský nábytek?",
    answer:
      "Ne. Tlumené světlo může vytvořit příjemnou atmosféru, ale podstatou hygge nejsou dekorace. Důležitější je klid, pocit bezpečí, přítomnost a čas, který není řízený výkonem nebo spěchem.",
  },
  {
    question: "Dělá hygge z Dánů nejšťastnější národ?",
    answer:
      "Tak jednoduchá souvislost není prokázaná. Dánská životní spokojenost se spojuje také s důvěrou, rovností, bezpečím, komunitou a možností rozhodovat o vlastním životě. Hygge je jedním z kulturních projevů tohoto prostředí, ne jeho jedinou příčinou.",
  },
];

const Hygge = () => {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${PAGE_URL}#article`,
    headline: "Hygge bez klišé: co opravdu znamená a jak ho zažít",
    alternativeHeadline: "Co je hygge, jak se vyslovuje a jak vypadá v běžném dánském životě",
    description: PAGE_DESCRIPTION,
    image: DEFAULT_SOCIAL_IMAGE,
    datePublished: PUBLISHED_DATE,
    dateModified: PUBLISHED_DATE,
    inLanguage: "cs-CZ",
    articleSection: "Dánská kultura",
    keywords: [
      "hygge",
      "co je hygge",
      "hygge význam",
      "hygge výslovnost",
      "dánský životní styl",
    ],
    author: {
      "@type": "Person",
      name: "Pavla Zimmermannová",
      url: "https://kastrup.cz/autorka",
    },
    publisher: {
      "@type": "Organization",
      name: "Kastrup.cz",
      url: "https://kastrup.cz",
      logo: {
        "@type": "ImageObject",
        url: "https://kastrup.cz/icon-512.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": PAGE_URL,
    },
    about: {
      "@type": "Thing",
      name: "Hygge",
      description: "Dánský kulturní pojem pro příjemnou, bezpečnou a uvolněnou atmosféru.",
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
        name: "Domů",
        item: "https://kastrup.cz/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Hygge a kultura",
        item: "https://kastrup.cz/kultura",
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
        <meta property="og:title" content="Hygge bez klišé: skutečný význam dánské pohody" />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:image" content={DEFAULT_SOCIAL_IMAGE} />
        <meta property="og:locale" content="cs_CZ" />
        <meta property="og:site_name" content="Kastrup.cz" />
        <meta property="article:published_time" content={PUBLISHED_DATE} />
        <meta property="article:modified_time" content={PUBLISHED_DATE} />
        <meta property="article:section" content="Dánská kultura" />
        <meta property="article:author" content="Pavla Zimmermannová" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hygge bez klišé: skutečný význam dánské pohody" />
        <meta name="twitter:description" content={PAGE_DESCRIPTION} />
        <meta name="twitter:image" content={DEFAULT_SOCIAL_IMAGE} />

        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <div className="min-h-screen py-10 md:py-12">
        <article className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-5xl">
            <Breadcrumbs
              items={[
                { label: "Hygge a kultura", href: "/kultura" },
                { label: "Hygge" },
              ]}
            />

            <header className="mx-auto mb-10 max-w-4xl text-center">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Dánská kultura bez reklamních klišé
              </p>
              <h1 className="mb-6 text-4xl font-bold md:text-6xl">
                Hygge bez klišé: co opravdu znamená a jak ho zažít
              </h1>
              <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                Není to styl nábytku ani povinná kombinace deky, svíčky a kakaa.
                Hygge je obyčejnější, společenskější a zajímavější část dánského života.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                <span>
                  Autor: <Link to="/autorka" className="font-medium text-foreground hover:text-primary">Pavla Zimmermannová</Link>
                </span>
                <span aria-hidden="true">•</span>
                <time dateTime={PUBLISHED_DATE}>13. září 2026</time>
                <span aria-hidden="true">•</span>
                <span>12 minut čtení</span>
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
                  alt="Klidná hygge atmosféra s teplým nápojem a tlumeným světlem"
                  width="1024"
                  height="576"
                  className="aspect-[16/9] w-full object-cover"
                />
              </picture>
              <figcaption className="px-5 py-3 text-sm text-muted-foreground">
                Svíčka může pomoci vytvořit atmosféru. Sama o sobě ale hygge nezaručí.
              </figcaption>
            </figure>

            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
              <div className="min-w-0">
                <section id="co-je-hygge" className="scroll-mt-24" aria-labelledby="co-je-hygge-title">
                  <div className="mb-10 rounded-2xl border-l-4 border-primary bg-primary/5 p-6 md:p-8">
                    <h2 id="co-je-hygge-title" className="mb-4 text-2xl font-bold md:text-3xl">Co je hygge?</h2>
                    <p className="text-lg leading-relaxed md:text-xl">
                      <strong>Hygge je dánské označení pro příjemnou, bezpečnou a uvolněnou atmosféru,</strong>{" "}
                      ve které člověk na chvíli zpomalí a užívá si obyčejný okamžik. Může vzniknout při
                      společném jídle, rozhovoru nebo výletu, ale také o samotě. Není to výrobek ani pouze styl bydlení.
                    </p>
                  </div>

                  <p className="mb-6 text-lg leading-8 text-muted-foreground">
                    Přeložit hygge jediným českým slovem nejde úplně přesně. „Pohoda“ vystihuje klid,
                    „útulnost“ prostředí a „pospolitost“ společnou chvíli. Hygge může obsahovat všechny
                    tři prvky, ale žádný z nich není povinný. Rozhodující není kulisa; důležité je, že se
                    přítomní cítí dobře, bezpečně a nemusí nikam spěchat.
                  </p>
                  <p className="mb-8 text-lg leading-8 text-muted-foreground">
                    Dánové navíc se slovem zacházejí prakticky. Hygge je podstatné jméno, ale existuje
                    také sloveso <em>at hygge sig</em> — mít se příjemně — a přídavné jméno <em>hyggelig</em>.
                    Hygge tak není slavnostní filozofie vyhrazená pro zvláštní chvíle. Je to běžné slovo
                    pro kvalitu okamžiku.
                  </p>
                </section>

                <section id="vyslovnost" className="scroll-mt-24 py-8" aria-labelledby="vyslovnost-title">
                  <div className="mb-5 flex items-center gap-3">
                    <Volume2 className="h-7 w-7 text-primary" aria-hidden="true" />
                    <h2 id="vyslovnost-title" className="text-3xl font-bold md:text-4xl">Jak se hygge vyslovuje</h2>
                  </div>
                  <p className="mb-5 text-lg leading-8 text-muted-foreground">
                    Oficiální dánský slovník uvádí výslovnost <strong className="text-foreground">[ˈhygə]</strong>.
                    České návody ji někdy přepisují jako „hü-ge“ a anglické zdroje jako „hoo-gah“.
                    Obojí je jen přibližná pomůcka, protože dánská výslovnost nemá přesnou českou kopii.
                  </p>
                  <p className="text-lg leading-8 text-muted-foreground">
                    Slovo souvisí se staroseverským <em>hyggja</em> a jeho dnešní význam přišel do dánštiny
                    z norštiny. V dánských textech se v tomto smyslu objevuje přibližně od konce 18. století.
                    Podrobnosti i zvukovou nahrávku nabízí{" "}
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
                  <h2 id="neni-title" className="mb-6 text-3xl font-bold md:text-4xl">Co hygge není</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      ["Není to nákupní seznam", "Deka, hrnek nebo designová lampa mohou být příjemné, ale pocit blízkosti a klidu se koupit nedá."],
                      ["Není pouze zimní", "Dlouhé tmavé večery hygge zvýrazňují, stejné slovo ale patří i pikniku, zahradě nebo dni u moře."],
                      ["Není totéž co samota", "Hygge lze prožít o samotě, jeho důležitou podobou je však společný čas bez pevného programu."],
                      ["Není záruka štěstí", "Životní spokojenost Dánů má společenské i ekonomické souvislosti. Jedno kulturní slovo ji samo nevysvětluje."],
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
                    <h2 id="dansko-title" className="text-3xl font-bold md:text-4xl">Proč je hygge tak dánské</h2>
                  </div>
                  <p className="mb-5 text-lg leading-8 text-muted-foreground">
                    Počasí nabízí jednoduchou část vysvětlení. Dánský podzim a zima jsou dlouhé, větrné a
                    tmavé, takže lidé tráví více času uvnitř. Teplé světlo, společné jídlo a klidný večer
                    pomáhají vytvořit prostředí, ve kterém je příjemné zůstat. Jenže počasím příběh nekončí.
                  </p>
                  <p className="mb-5 text-lg leading-8 text-muted-foreground">
                    Oficiální dánské zdroje spojují hygge také s rovností a snahou, aby se všichni u stolu
                    cítili jako součást skupiny. Širší dánská společnost stojí na vysoké míře důvěry:
                    lidé obvykle očekávají, že druzí i instituce budou jednat spolehlivě. Právě bezpečí,
                    neokázalost a menší důraz na hierarchii vytvářejí podmínky, ve kterých lze na chvíli vypnout.
                  </p>
                  <blockquote className="my-8 rounded-2xl bg-secondary p-6 md:p-8">
                    <Quote className="mb-4 h-8 w-8 text-primary" aria-hidden="true" />
                    <p className="text-xl font-medium leading-relaxed">
                      Hygge není soutěž o nejkrásnější večer. Ve chvíli, kdy je potřeba atmosféru dokazovat,
                      fotografovat a hodnotit, začíná se její podstata vytrácet.
                    </p>
                  </blockquote>
                  <p className="text-lg leading-8 text-muted-foreground">
                    Bylo by ale zkratkou napsat, že právě hygge „dělá Dány šťastnými“. Mezinárodní hodnocení
                    životní spokojenosti souvisejí také se sociálním zabezpečením, rovností, důvěrou,
                    osobní svobodou a možností ovlivnit vlastní život. Hygge je viditelná kulturní součást,
                    nikoli kouzelné vysvětlení celé společnosti.
                  </p>
                </section>

                <section id="rocni-obdobi" className="scroll-mt-24 py-8" aria-labelledby="obdobi-title">
                  <div className="mb-5 flex items-center gap-3">
                    <CalendarDays className="h-7 w-7 text-primary" aria-hidden="true" />
                    <h2 id="obdobi-title" className="text-3xl font-bold md:text-4xl">Hygge během roku</h2>
                  </div>
                  <p className="mb-7 text-lg leading-8 text-muted-foreground">
                    Představa, že hygge začíná první svíčkou v říjnu a na jaře končí, je hlavně exportní
                    obrázek. Dánové označují jako <em>hyggelig</em> situace v každém ročním období.
                  </p>
                  <div className="grid gap-5 md:grid-cols-2">
                    <article className="rounded-2xl border bg-card p-6">
                      <Coffee className="mb-4 h-8 w-8 text-primary" aria-hidden="true" />
                      <h3 className="mb-3 text-xl font-semibold">Podzim a zima</h3>
                      <p className="text-muted-foreground">
                        Společná večeře, pečení, desková hra, návštěva přátel, tlumené světlo nebo horký
                        nápoj po procházce ve větru. V prosinci se přidává <em>julehygge</em>: adventní
                        setkání, gløgg, æbleskiver a čas s rodinou či kolegy.
                      </p>
                    </article>
                    <article className="rounded-2xl border bg-card p-6">
                      <Leaf className="mb-4 h-8 w-8 text-primary" aria-hidden="true" />
                      <h3 className="mb-3 text-xl font-semibold">Jaro a léto</h3>
                      <p className="text-muted-foreground">
                        Piknik v parku, dlouhá večeře venku, grilování s přáteli, projížďka na kole, den v
                        jednoduchém letním domě nebo zastávka u moře. Kulisa se mění, pomalé tempo a společný
                        čas zůstávají.
                      </p>
                    </article>
                  </div>
                </section>

                <section id="jak-zazit" className="scroll-mt-24 py-8" aria-labelledby="zazit-title">
                  <h2 id="zazit-title" className="mb-5 text-3xl font-bold md:text-4xl">Jak zažít hygge při cestě do Dánska</h2>
                  <p className="mb-7 text-lg leading-8 text-muted-foreground">
                    Turista nemůže během jednoho odpoledne napodobit roky budované přátelství. Může ale
                    cestovat způsobem, který dává hygge prostor. Následující tipy nejsou seznam atrakcí;
                    jsou to malé změny tempa.
                  </p>
                  <ol className="space-y-5">
                    {[
                      ["Nenechte program bez jediné mezery.", "Vyberte méně míst a nechte si čas posedět tam, kde je vám dobře. Hygge obvykle nevzniká mezi dvěma odškrtnutými památkami."],
                      ["Zajděte do kavárny bez práce na stole.", "Dejte si kávu a pečivo, odložte telefon a sledujte běžný rytmus města. Podstatný je klid, ne název podniku."],
                      ["Sdílejte jídlo.", "Společný oběd nebo večeře jsou přirozenou příležitostí ke konverzaci. Dánské smørrebrød je navíc součást místní každodenní kultury."],
                      ["Vyjděte ven i za horšího počasí.", "Krátká procházka u vody nebo parkem může udělat návrat do tepla příjemnější. Hygge není útěk před venkem, ale kontrast a rytmus."],
                      ["V létě využijte veřejný prostor.", "Piknik, koupání v přístavu, park nebo klidná projížďka na kole ukazují, že hygge nepotřebuje tmu ani krb."],
                      ["Přijměte jednoduchost.", "Nemusíte hledat podnik, který má hygge napsané na ceduli. Často je autentičtější obyčejná chvíle bez turistického scénáře."],
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
                    <Link to="/kodan">
                      <Button>
                        Co vidět v Kodani
                        <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                      </Button>
                    </Link>
                    <Link to="/ubytovani">
                      <Button variant="outline">Najít ubytování</Button>
                    </Link>
                  </div>
                </section>

                <section id="odvracena-strana" className="scroll-mt-24 py-8" aria-labelledby="odvracena-title">
                  <h2 id="odvracena-title" className="mb-5 text-3xl font-bold md:text-4xl">Má hygge i odvrácenou stranu?</h2>
                  <p className="mb-5 text-lg leading-8 text-muted-foreground">
                    Ano. Příjemná atmosféra uvnitř skupiny může současně vytvářet hranici pro ty, kteří do ní
                    nepatří. Nově příchozí člověk nemusí znát nepsaná pravidla, společné vzpomínky ani způsob
                    humoru. Hygge potom není automaticky otevřené každému, i když se tak zvenčí prezentuje.
                  </p>
                  <p className="mb-5 text-lg leading-8 text-muted-foreground">
                    Také snaha vyhnout se konfliktu má dvě strany. Pomáhá chránit klidný večer, ale důležité
                    nebo nepříjemné téma může zůstat nevyslovené. Samotný oficiální web Denmark.dk upozorňuje,
                    že hygge může příchozího nechat „venku“, protože se často odehrává v již existujícím kruhu.
                  </p>
                  <p className="text-lg leading-8 text-muted-foreground">
                    Tento detail hygge nekazí. Naopak jej vrací z reklamního obrázku do skutečné kultury,
                    která má stejně jako každá jiná své výhody, hranice a rozpory.
                  </p>
                </section>

                <section id="doma" className="scroll-mt-24 py-8" aria-labelledby="doma-title">
                  <h2 id="doma-title" className="mb-5 text-3xl font-bold md:text-4xl">Jak si vzít hygge domů bez nakupování</h2>
                  <p className="mb-6 text-lg leading-8 text-muted-foreground">
                    Není nutné měnit nábytek ani vytvořit dokonale sladěný interiér. Užitečnější je změnit
                    podmínky, ve kterých spolu trávíme čas.
                  </p>
                  <ul className="space-y-4">
                    {[
                      "Domluvte večer bez povinného programu a bez spěchu na další aktivitu.",
                      "Připravte jednoduché jídlo společně místo snahy hosty ohromit.",
                      "Odložte telefony mimo stůl, aby nikdo nemusel soupeřit s notifikacemi.",
                      "Zvolte prostředí, kde se všichni cítí pohodlně — ne pouze to, které dobře vypadá.",
                      "Nechte chvíli prostor i tichu. Hygge nemusí být nepřetržitá zábava.",
                      "Pozvěte člověka, který by jinak zůstal mimo skupinu. I otevřenost může být hyggelig.",
                    ].map((item) => (
                      <li key={item} className="flex gap-3 text-lg leading-8 text-muted-foreground">
                        <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section id="faq" className="scroll-mt-24 py-8" aria-labelledby="faq-title">
                  <h2 id="faq-title" className="mb-7 text-3xl font-bold md:text-4xl">Časté otázky o hygge</h2>
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
                    <h2 id="zdroje-title" className="text-3xl font-bold md:text-4xl">Zdroje a ověření</h2>
                  </div>
                  <p className="mb-5 text-muted-foreground">
                    Text vychází především z dánských jazykových a oficiálních kulturních zdrojů.
                    Naposledy odborně zkontrolováno 13. září 2026.
                  </p>
                  <ul className="space-y-3 text-sm">
                    {[
                      ["Den Danske Ordbog: hygge", "https://ordnet.dk/ddo/ordbog/hygge"],
                      ["Denmark.dk: What is hygge", "https://denmark.dk/people-and-culture/hygge"],
                      ["Denmark.dk: Why are Danish people so happy?", "https://denmark.dk/people-and-culture/happiness"],
                      ["Denmark.dk: Trust — a cornerstone of Danish culture", "https://denmark.dk/people-and-culture/trust"],
                      ["VisitDenmark: What is hygge?", "https://www.visitdenmark.com/denmark/things-do/traditions-lifestyle/hygge"],
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
                  <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">Pokračujte v objevování</p>
                  <h2 className="mb-4 text-3xl font-bold">Poznejte Dánsko za hranicí pohlednic</h2>
                  <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
                    V sekci kultura postupně přibývají příběhy o jídle, tradicích, jazyce, designu a běžném životě.
                  </p>
                  <Link to="/kultura">
                    <Button size="lg">
                      Hygge a dánská kultura
                      <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Button>
                  </Link>
                </section>
              </div>

              <aside className="order-first lg:order-none lg:sticky lg:top-24" aria-label="Obsah článku">
                <nav className="rounded-2xl border bg-card p-5 shadow-sm">
                  <p className="mb-4 font-semibold">V článku najdete</p>
                  <ol className="space-y-3 text-sm text-muted-foreground">
                    {[
                      ["Co je hygge", "#co-je-hygge"],
                      ["Výslovnost a původ", "#vyslovnost"],
                      ["Co hygge není", "#neni"],
                      ["Proč je tak dánské", "#dansko"],
                      ["Hygge během roku", "#rocni-obdobi"],
                      ["Jak ho zažít", "#jak-zazit"],
                      ["Odvrácená strana", "#odvracena-strana"],
                      ["Hygge doma", "#doma"],
                      ["Časté otázky", "#faq"],
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
