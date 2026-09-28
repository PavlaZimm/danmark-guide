import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BedDouble,
  CalendarCheck,
  CheckCircle2,
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

const STAY22_EMBED_URL = "https://www.stay22.com/embed/697516b7db0fdbba11cc0c2d";

const PAGE_URL = "https://kastrup.pl/noclegi";
const PAGE_TITLE = "Noclegi w Kopenhadze i Danii – mapa hoteli | Kastrup.pl";
const PAGE_DESCRIPTION =
  "Porównaj noclegi w Kopenhadze i całej Danii na interaktywnej mapie. Porady, jak wybrać hotel w Kopenhadze, przy lotnisku Kastrup i w innych miastach.";
const HEADLINE = "Noclegi w Kopenhadze i Danii bez zbędnego szukania";
const SOCIAL_IMAGE = "https://kastrup.pl/images/og-kastrup.jpg";

const faqs = [
  {
    question: "Gdzie szukać noclegu w Kopenhadze?",
    answer:
      "Przy pierwszej wizycie zwykle najpraktyczniejszy jest nocleg z szybkim dojazdem metrem albo pociągiem. Na mapie zawsze sprawdź odległość od przystanku i od miejsc, które chcesz zobaczyć.",
  },
  {
    question: "Czy warto nocować przy lotnisku Kastrup?",
    answer:
      "Nocleg przy lotnisku ma sens głównie przy bardzo wczesnym wylocie, późnym przylocie albo krótkiej przesiadce. Jeśli chcesz po prostu zwiedzać Kopenhagę, porównaj łączny czas dojazdów z noclegiem bliżej centrum.",
  },
  {
    question: "Na co uważać przed rezerwacją?",
    answer:
      "Sprawdź cenę końcową razem z opłatami, warunki anulowania, typ pokoju, godzinę przyjazdu i oceny gości. Rozstrzygające są zawsze informacje podane bezpośrednio u partnera rezerwacyjnego.",
  },
  {
    question: "Czy wyszukiwanie na Kastrup.pl jest płatne?",
    answer:
      "Korzystanie z mapy jest bezpłatne. Jeśli dokończysz rezerwację przez link partnerski, Kastrup.pl może otrzymać prowizję. Konkretną cenę i warunki ustala partner rezerwacyjny.",
  },
];

const Accommodation = () => {
  // Stay22 loads only after a click: it may store tracking data (PKE art. 399, see privacy policy)
  const [showMap, setShowMap] = useState(false);
  return (
    <>
      <Helmet>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:title" content="Noclegi w Kopenhadze i Danii | Kastrup.pl" />
        <meta
          property="og:description"
          content="Mapa noclegów i praktyczny poradnik, jak wybrać hotel albo apartament w Danii."
        />
        <meta property="og:image" content={SOCIAL_IMAGE} />
        <meta property="og:locale" content="pl_PL" />
        <meta property="og:site_name" content="Kastrup.pl" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Noclegi w Kopenhadze i Danii | Kastrup.pl" />
        <meta
          name="twitter:description"
          content="Mapa noclegów i praktyczne porady przed podróżą do Danii."
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Noclegi w Kopenhadze i Danii",
            description:
              "Mapa noclegów i praktyczny poradnik, jak wybrać hotel albo apartament w Danii.",
            url: PAGE_URL,
            inLanguage: "pl-PL",
            isPartOf: {
              "@type": "WebSite",
              name: "Kastrup.pl",
              url: "https://kastrup.pl",
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
          <Breadcrumbs items={[{ label: "Noclegi" }]} />

          <header className="mx-auto mb-12 max-w-4xl text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <BedDouble className="h-7 w-7 text-primary" />
            </div>
            <h1 className="mb-5 text-4xl font-bold md:text-6xl">{HEADLINE}</h1>
            <p className="mx-auto mb-7 max-w-3xl text-lg text-muted-foreground md:text-xl">
              Porównaj dostępne hotele i apartamenty bezpośrednio na mapie. Przed rezerwacją
              sprawdź cenę końcową, warunki anulowania i dojazd do miejsc, które chcesz odwiedzić.
            </p>
            <a href="#mapa-noclegow">
              <Button size="lg">
                <Map className="mr-2 h-5 w-5" />
                Otwórz mapę noclegów
              </Button>
            </a>
          </header>

          <section
            id="mapa-noclegow"
            className="scroll-mt-24 rounded-2xl border bg-card p-5 shadow-sm md:p-8"
            aria-labelledby="mapa-title"
          >
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">Interaktywne porównanie</p>
                <h2 id="mapa-title" className="text-3xl font-bold">Mapa noclegów</h2>
                <p className="mt-3 max-w-2xl text-muted-foreground">
                  Przybliż wybrany obszar, ustaw termin i porównaj oferty partnerów rezerwacyjnych.
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Mapa partnerska Stay22
              </div>
            </div>

            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              [reklama] Mapa noclegów Stay22 – linki partnerskie
            </p>
            <div className="overflow-hidden rounded-xl border bg-muted">
              {showMap ? (
                <iframe
                  id="stay22-widget"
                  width="100%"
                  height="520"
                  src={STAY22_EMBED_URL}
                  frameBorder="0"
                  title="Interaktywna mapa noclegów w Danii od Stay22"
                  loading="eager"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              ) : (
                <div className="flex h-[520px] flex-col items-center justify-center gap-4 p-6 text-center">
                  <Map className="h-10 w-10 text-primary" />
                  <p className="max-w-md text-sm text-muted-foreground">
                    Mapa pochodzi od partnera Stay22 i po wczytaniu może zapisywać w przeglądarce własne dane.
                    Szczegóły znajdziesz w <Link to="/polityka-prywatnosci#cookies" className="underline hover:text-primary">polityce prywatności</Link>.
                  </p>
                  <Button size="lg" onClick={() => setShowMap(true)}>
                    Pokaż mapę noclegów
                  </Button>
                </div>
              )}
            </div>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              Informacja o współpracy partnerskiej: jeśli dokończysz rezerwację przez mapę, Kastrup.pl może
              otrzymać prowizję. Cenę i warunki ustala partner rezerwacyjny.
            </p>
          </section>

          <section className="py-16" aria-labelledby="vyber-title">
            <div className="mb-9 text-center">
              <h2 id="vyber-title" className="mb-3 text-3xl font-bold md:text-4xl">Jak wybrać dobrą lokalizację</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Najpierw wybierz okolicę pod plan podróży. Dopiero potem porównuj ceny poszczególnych pobytów.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              <article className="rounded-2xl border bg-card p-6 shadow-sm">
                <Train className="mb-5 h-8 w-8 text-primary" />
                <h3 className="mb-3 text-xl font-semibold">Zwiedzanie Kopenhagi</h3>
                <p className="text-muted-foreground">
                  Szukaj dobrego połączenia metrem albo pociągiem. Nocleg poza samym centrum może być praktyczny,
                  jeśli jest blisko przystanku. Przy wyborze dzielnicy pomoże przegląd{" "}
                  <Link to="/kopenhaga">co zobaczyć w Kopenhadze</Link>.
                </p>
              </article>
              <article className="rounded-2xl border bg-card p-6 shadow-sm">
                <Plane className="mb-5 h-8 w-8 text-primary" />
                <h3 className="mb-3 text-xl font-semibold">Wczesny wylot albo przesiadka</h3>
                <p className="text-muted-foreground">
                  Przy krótkim pobycie rozważ okolice lotniska Kastrup. Porównaj wygodę z czasem potrzebnym
                  na dojazd do centrum i wcześniej sprawdź{" "}
                  <Link to="/artykul/lotnisko-kopenhaga-dojazd-do-centrum">
                    dojazd z lotniska w Kopenhadze
                  </Link>.
                </p>
              </article>
              <article className="rounded-2xl border bg-card p-6 shadow-sm">
                <MapPin className="mb-5 h-8 w-8 text-primary" />
                <h3 className="mb-3 text-xl font-semibold">Podróż po Danii</h3>
                <p className="text-muted-foreground">
                  Przy dłuższej trasie sprawdzaj parking albo połączenia komunikacją publiczną.
                  Najtańszy pokój nie musi oznaczać najtańszego pobytu jako całości.
                </p>
              </article>
            </div>
          </section>

          <section className="rounded-2xl bg-gradient-card p-7 md:p-10" aria-labelledby="kontrola-title">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">Zanim zapłacisz</p>
                <h2 id="kontrola-title" className="mb-4 text-3xl font-bold">Szybka kontrola rezerwacji</h2>
                <p className="text-muted-foreground">
                  Oferty mogą się różnić nie tylko ceną. Porównuj ten sam typ pokoju, ten sam termin i te same warunki.
                </p>
              </div>
              <ul className="grid gap-4 sm:grid-cols-2">
                {[
                  [WalletCards, "Cena końcowa razem z opłatami"],
                  [CalendarCheck, "Anulowanie i możliwość zmiany terminu"],
                  [MapPin, "Lokalizacja i rzeczywisty czas dojazdu"],
                  [CheckCircle2, "Aktualne oceny gości"],
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
            <h2 id="faq-title" className="mb-8 text-center text-3xl font-bold md:text-4xl">Najczęstsze pytania</h2>
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
            <h2 className="mb-3 text-2xl font-bold">Najpierw zaplanuj podróż</h2>
            <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
              Zajrzyj do praktycznych przewodników po Danii i wybierz okolicę, która pasuje do Twojego planu.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/kopenhaga">
                <Button>Co zobaczyć w Kopenhadze</Button>
              </Link>
              <Link to="/co-zobaczyc-w-danii">
                <Button variant="outline">Praktycznie o Danii</Button>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Accommodation;
