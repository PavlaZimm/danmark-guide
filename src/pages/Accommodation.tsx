import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BedDouble,
  CalendarCheck,
  CheckCircle2,
  ExternalLink,
  Map,
  MapPin,
  Plane,
  ShieldCheck,
  Train,
  WalletCards,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { DEFAULT_SOCIAL_IMAGE } from "@/lib/seo-helpers";

const STAY22_EMBED_URL = "https://www.stay22.com/embed/697516b7db0fdbba11cc0c2d";

const faqs = [
  {
    question: "Kde hledat ubytování v Kodani?",
    answer:
      "Pro první návštěvu bývá praktické ubytování s rychlým spojením metrem nebo vlakem. Na mapě si vždy zkontrolujte vzdálenost od zastávky a od míst, která chcete navštívit.",
  },
  {
    question: "Vyplatí se bydlet u letiště Kastrup?",
    answer:
      "Ubytování u letiště dává smysl hlavně při velmi časném odletu, pozdním příletu nebo krátkém přestupu. Pro běžné poznávání Kodaně porovnejte celkový čas cesty s ubytováním blíž centru.",
  },
  {
    question: "Na co si dát pozor před rezervací?",
    answer:
      "Zkontrolujte konečnou cenu včetně poplatků, podmínky zrušení, typ pokoje, čas příjezdu a hodnocení hostů. Rozhodující jsou vždy informace uvedené přímo u rezervačního partnera.",
  },
  {
    question: "Je vyhledávání na Kastrup.cz placené?",
    answer:
      "Použití mapy je zdarma. Pokud přes partnerský odkaz dokončíte rezervaci, Kastrup.cz může získat provizi. Konkrétní cenu a podmínky určuje rezervační partner.",
  },
];

const Accommodation = () => {
  const [showMap, setShowMap] = useState(false);

  return (
    <>
      <Helmet>
        <title>Ubytování v Dánsku | Mapa hotelů a apartmánů | Kastrup.cz</title>
        <meta
          name="description"
          content="Porovnejte ubytování v Dánsku na interaktivní mapě. Praktické tipy pro výběr hotelu v Kodani, u letiště Kastrup i v dalších dánských městech."
        />
        <link rel="canonical" href="https://kastrup.cz/ubytovani" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kastrup.cz/ubytovani" />
        <meta property="og:title" content="Ubytování v Dánsku | Kastrup.cz" />
        <meta
          property="og:description"
          content="Mapa ubytování a praktický průvodce výběrem hotelu nebo apartmánu v Dánsku."
        />
        <meta property="og:image" content={DEFAULT_SOCIAL_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ubytování v Dánsku | Kastrup.cz" />
        <meta
          name="twitter:description"
          content="Mapa ubytování a praktické tipy pro cestu do Dánska."
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Ubytování v Dánsku",
            description:
              "Mapa ubytování a praktický průvodce výběrem hotelu nebo apartmánu v Dánsku.",
            url: "https://kastrup.cz/ubytovani",
            inLanguage: "cs-CZ",
            isPartOf: {
              "@type": "WebSite",
              name: "Kastrup.cz",
              url: "https://kastrup.cz",
            },
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
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
          })}
        </script>
      </Helmet>

      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 md:px-6">
          <Breadcrumbs items={[{ label: "Ubytování" }]} />

          <header className="mx-auto mb-12 max-w-4xl text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <BedDouble className="h-7 w-7 text-primary" />
            </div>
            <h1 className="mb-5 text-4xl font-bold md:text-6xl">Ubytování v Dánsku bez zbytečného hledání</h1>
            <p className="mx-auto mb-7 max-w-3xl text-lg text-muted-foreground md:text-xl">
              Porovnejte dostupné hotely a apartmány přímo na mapě. Před rezervací si
              ověřte konečnou cenu, podmínky zrušení a spojení na místa, která chcete navštívit.
            </p>
            <a href="#mapa-ubytovani">
              <Button size="lg">
                <Map className="mr-2 h-5 w-5" />
                Otevřít mapu ubytování
              </Button>
            </a>
          </header>

          <section
            id="mapa-ubytovani"
            className="scroll-mt-24 rounded-2xl border bg-card p-5 shadow-sm md:p-8"
            aria-labelledby="mapa-title"
          >
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">Interaktivní porovnání</p>
                <h2 id="mapa-title" className="text-3xl font-bold">Mapa ubytování</h2>
                <p className="mt-3 max-w-2xl text-muted-foreground">
                  Přibližte si konkrétní oblast, upravte termín a porovnejte nabídky rezervačních partnerů.
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Mapa se načte až po vašem kliknutí
              </div>
            </div>

            {showMap ? (
              <div className="overflow-hidden rounded-xl border bg-muted">
                <iframe
                  id="stay22-widget"
                  width="100%"
                  height="520"
                  src={STAY22_EMBED_URL}
                  frameBorder="0"
                  title="Interaktivní mapa ubytování v Dánsku od Stay22"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="flex min-h-[360px] flex-col items-center justify-center rounded-xl border border-dashed bg-muted/40 px-6 text-center">
                <MapPin className="mb-5 h-12 w-12 text-primary" />
                <h3 className="mb-3 text-2xl font-semibold">Vyhledat dostupné ubytování</h3>
                <p className="mb-6 max-w-2xl text-muted-foreground">
                  Po kliknutí se načte externí mapa Stay22. Tím navážete spojení se službou třetí strany,
                  která může zpracovat technické údaje o zařízení podle svých pravidel soukromí.
                </p>
                <Button size="lg" onClick={() => setShowMap(true)}>
                  Načíst mapu Stay22
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
                <p className="mt-4 max-w-xl text-xs text-muted-foreground">
                  Partnerské upozornění: pokud přes mapu dokončíte rezervaci, Kastrup.cz může získat provizi.
                  Cenu a podmínky určuje rezervační partner.
                </p>
              </div>
            )}
          </section>

          <section className="py-16" aria-labelledby="vyber-title">
            <div className="mb-9 text-center">
              <h2 id="vyber-title" className="mb-3 text-3xl font-bold md:text-4xl">Jak vybrat správné místo</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Nejdřív vyberte oblast podle programu cesty. Teprve potom porovnávejte cenu jednotlivých pobytů.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              <article className="rounded-2xl border bg-card p-6 shadow-sm">
                <Train className="mb-5 h-8 w-8 text-primary" />
                <h3 className="mb-3 text-xl font-semibold">Poznávání Kodaně</h3>
                <p className="text-muted-foreground">
                  Hledejte dobré spojení metrem nebo vlakem. Ubytování mimo úplné centrum může být praktické,
                  pokud je blízko zastávky.
                </p>
              </article>
              <article className="rounded-2xl border bg-card p-6 shadow-sm">
                <Plane className="mb-5 h-8 w-8 text-primary" />
                <h3 className="mb-3 text-xl font-semibold">Brzký odlet či přestup</h3>
                <p className="text-muted-foreground">
                  Při krátkém pobytu zvažte okolí letiště Kastrup. Porovnejte pohodlí s časem potřebným
                  na cestu do centra.
                </p>
              </article>
              <article className="rounded-2xl border bg-card p-6 shadow-sm">
                <MapPin className="mb-5 h-8 w-8 text-primary" />
                <h3 className="mb-3 text-xl font-semibold">Cesta po Dánsku</h3>
                <p className="text-muted-foreground">
                  U delšího itineráře kontrolujte parkování nebo návaznost veřejné dopravy.
                  Nejlevnější pokoj nemusí znamenat nejlevnější celý pobyt.
                </p>
              </article>
            </div>
          </section>

          <section className="rounded-2xl bg-gradient-card p-7 md:p-10" aria-labelledby="kontrola-title">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">Před zaplacením</p>
                <h2 id="kontrola-title" className="mb-4 text-3xl font-bold">Krátká kontrola rezervace</h2>
                <p className="text-muted-foreground">
                  Nabídky se mohou lišit nejen cenou. Porovnávejte stejný typ pokoje, stejné datum a stejné podmínky.
                </p>
              </div>
              <ul className="grid gap-4 sm:grid-cols-2">
                {[
                  [WalletCards, "Konečná cena včetně poplatků"],
                  [CalendarCheck, "Storno a možnost změny termínu"],
                  [MapPin, "Poloha a skutečný čas dopravy"],
                  [CheckCircle2, "Aktuální hodnocení hostů"],
                ].map(([Icon, text]) => (
                  <li key={text as string} className="flex items-center gap-3 rounded-xl bg-background/80 p-4">
                    <Icon className="h-5 w-5 shrink-0 text-primary" />
                    <span className="font-medium">{text as string}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="mx-auto max-w-4xl py-16" aria-labelledby="faq-title">
            <h2 id="faq-title" className="mb-8 text-center text-3xl font-bold md:text-4xl">Časté otázky</h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <article key={faq.question} className="rounded-xl border bg-card p-6">
                  <h3 className="mb-2 text-xl font-semibold">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border bg-card p-7 text-center md:p-10">
            <h2 className="mb-3 text-2xl font-bold">Nejdřív si naplánujte cestu</h2>
            <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
              Podívejte se na praktické průvodce po Dánsku a vyberte oblast, která odpovídá vašemu programu.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/clanky">
                <Button>Průvodce a články</Button>
              </Link>
              <Link to="/o-dansku">
                <Button variant="outline">Prakticky o Dánsku</Button>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Accommodation;
