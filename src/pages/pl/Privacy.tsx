import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Check, Cookie, Shield } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import {
  CONSENT_CHANGED_EVENT,
  getAnalyticsConsent,
  setAnalyticsConsent,
  type AnalyticsConsent,
} from "@/lib/analytics";

// Content follows Vyzkum/polska-verze/PRAVNI-POZADAVKY.md (GDPR art. 13, PKE art. 399, UODO on language).
const IMAGE = "https://kastrup.pl/images/og-kastrup.jpg";

const cookies = [
  ["cookie-consent", "Kastrup.pl (pamięć przeglądarki)", "Zapamiętuje Twój wybór dotyczący analityki", "do usunięcia przez Ciebie", "nie", "niezbędne"],
  ["vite-ui-theme", "Kastrup.pl (pamięć przeglądarki)", "Zapamiętuje jasny lub ciemny motyw", "do usunięcia przez Ciebie", "nie", "niezbędne"],
  ["_ga, _ga_*", "Google", "Statystyki odwiedzin Google Analytics 4", "do 2 lat", "tak (Google)", "tylko za zgodą"],
  ["pliki Stay22", "Stay22", "Działanie mapy noclegów i przypisanie prowizji partnerskiej", "zgodnie z zasadami Stay22", "tak (Stay22)", "wczytywane dopiero po kliknięciu mapy"],
];

const recipients = [
  ["Vercel Inc. (USA)", "hosting strony i logi serwera"],
  ["Supabase (dane w UE, Irlandia)", "baza danych z treścią artykułów"],
  ["Google LLC (USA)", "Google Analytics 4 – tylko za Twoją zgodą"],
  ["Stay22 Technologies Inc. (Kanada)", "mapa noclegów i linki partnerskie – po kliknięciu mapy"],
  ["OpenStreetMap Foundation", "podkłady map w artykułach"],
  ["Cloudflare, Inc. (USA, cdnjs)", "ikony znaczników na mapach"],
];

const Privacy = () => {
  const [consent, setConsent] = useState<AnalyticsConsent | null>(() => getAnalyticsConsent());

  useEffect(() => {
    const syncConsent = (event: Event) => {
      setConsent((event as CustomEvent<AnalyticsConsent>).detail);
    };
    window.addEventListener(CONSENT_CHANGED_EVENT, syncConsent);
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, syncConsent);
  }, []);

  const updateConsent = (nextConsent: AnalyticsConsent) => {
    setAnalyticsConsent(nextConsent);
    setConsent(nextConsent);
  };

  return (
    <>
      <Helmet>
        <title>Polityka prywatności i cookies | Kastrup.pl</title>
        <meta
          name="description"
          content="Jak Kastrup.pl przetwarza dane osobowe, jakich plików cookie używa, komu przekazuje dane i jak zmienić zgodę na Google Analytics."
        />
        <link rel="canonical" href="https://kastrup.pl/polityka-prywatnosci" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kastrup.pl/polityka-prywatnosci" />
        <meta property="og:title" content="Polityka prywatności i cookies | Kastrup.pl" />
        <meta property="og:description" content="Jak Kastrup.pl korzysta z plików cookie i danych odwiedzających." />
        <meta property="og:image" content={IMAGE} />
        <meta property="og:locale" content="pl_PL" />
      </Helmet>

      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 md:px-6">
          <article className="mx-auto max-w-3xl">
            <Breadcrumbs items={[{ label: "Polityka prywatności i cookies" }]} />

            <header className="mb-10">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                <Shield className="h-7 w-7 text-primary" />
              </div>
              <h1 className="mb-4 text-4xl font-bold md:text-5xl">Polityka prywatności i cookies</h1>
              <p className="text-lg text-muted-foreground">Obowiązuje od dnia uruchomienia Kastrup.pl</p>
            </header>

            <div className="prose prose-lg max-w-none dark:prose-invert">
              <h2>Kto jest administratorem danych</h2>
              <p>
                Administratorem Twoich danych osobowych jest Pavla Zimmermannová, przedsiębiorca
                wpisany do czeskiego rejestru działalności gospodarczej, numer identyfikacyjny (IČO)
                04352041, Bílina, Republika Czeska. W sprawach prywatności napisz na{" "}
                <a href="mailto:zimmermannovap@gmail.com">zimmermannovap@gmail.com</a>. Administrator
                nie wyznaczył inspektora ochrony danych, bo nie ma takiego obowiązku.
              </p>

              <h2>Jakie dane przetwarzamy, w jakim celu i na jakiej podstawie</h2>
              <ul>
                <li>
                  <strong>Działanie i bezpieczeństwo strony.</strong> Przy każdym wejściu serwer
                  przetwarza dane techniczne: adres IP, czas żądania, typ przeglądarki i adres
                  odwiedzanej strony. Podstawa: prawnie uzasadniony interes administratora, czyli
                  bezpieczne i niezawodne działanie strony (art. 6 ust. 1 lit. f RODO).
                </li>
                <li>
                  <strong>Korespondencja e-mail.</strong> Jeśli do nas napiszesz, przetwarzamy Twój
                  adres, treść wiadomości i dane, które sam podasz, wyłącznie po to, żeby odpowiedzieć.
                  Podstawa: prawnie uzasadniony interes, czyli odpowiedź na Twoje pytanie
                  (art. 6 ust. 1 lit. f RODO).
                </li>
                <li>
                  <strong>Statystyki odwiedzin (Google Analytics 4).</strong> Tylko jeśli się zgodzisz.
                  Google przekazuje nam zbiorcze informacje o ruchu na stronie. Może przy tym
                  przetwarzać dane o urządzeniu, przeglądarce, odwiedzanych stronach i przybliżonej
                  lokalizacji ustalonej na podstawie połączenia sieciowego. Nie wysyłamy do
                  Analytics świadomie danych osobowych ani treści e-maili.
                  Podstawa: Twoja zgoda (art. 6 ust. 1 lit. a RODO).
                </li>
                <li>
                  <strong>Mapa noclegów Stay22.</strong> Mapa wczytuje się dopiero, gdy klikniesz
                  „Pokaż mapę noclegów”. Wtedy Stay22 może przetwarzać dane techniczne o urządzeniu
                  i korzystaniu z mapy zgodnie ze swoimi{" "}
                  <a href="https://www.stay22.com/privacy" target="_blank" rel="noopener noreferrer">
                    zasadami prywatności
                  </a>. Podstawa: Twoja zgoda wyrażona kliknięciem (art. 6 ust. 1 lit. a RODO).
                </li>
              </ul>
              <p>
                Podanie danych jest dobrowolne. Do czytania strony nie potrzebujesz konta ani
                rejestracji. Nie podejmujemy decyzji w sposób zautomatyzowany ani nie profilujemy
                odwiedzających.
              </p>

              <h2>Linki partnerskie i reklama</h2>
              <p>
                Kastrup.pl utrzymuje się między innymi z prowizji partnerskich. Linki i oferty
                w mapie Stay22 są reklamą: jeśli dokończysz przez nie rezerwację, możemy otrzymać
                prowizję. Cenę, dostępność i warunki rezerwacji zawsze ustala konkretny partner
                rezerwacyjny. Artykuły z linkami partnerskimi oznaczamy słowem „Reklama”.
              </p>

              <h2 id="cookies">Pliki cookie i pamięć przeglądarki</h2>
              <p>
                Bez Twojej zgody zapisujemy w przeglądarce tylko to, co jest niezbędne do działania
                strony i zapamiętania Twoich wyborów. Pliki cookie możesz też ograniczyć albo usunąć
                w ustawieniach swojej przeglądarki.
              </p>
            </div>

            <div className="not-prose my-6 overflow-x-auto rounded-xl border bg-card">
              <table className="w-full text-left text-sm">
                <thead className="border-b bg-muted/50">
                  <tr>
                    {["Nazwa", "Kto zapisuje", "Cel", "Czas przechowywania", "Dostęp stron trzecich", "Rodzaj"].map((head) => (
                      <th key={head} className="px-4 py-3 font-semibold">{head}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {cookies.map((row) => (
                    <tr key={row[0]} className="border-b last:border-0 align-top">
                      {row.map((cell, index) => (
                        <td key={index} className={`px-4 py-3 ${index === 0 ? "font-medium" : "text-muted-foreground"}`}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="prose prose-lg max-w-none dark:prose-invert">
              <h2>Komu przekazujemy dane</h2>
              <p>Dane mogą trafić do dostawców, z których usług korzysta strona:</p>
              <ul>
                {recipients.map(([name, purpose]) => (
                  <li key={name}><strong>{name}</strong> – {purpose}</li>
                ))}
              </ul>
              <p>
                Niektórzy odbiorcy (Google LLC, Vercel Inc., Cloudflare, Inc.) mają siedzibę w USA.
                Przekazanie odbywa się na podstawie decyzji wykonawczej Komisji Europejskiej (UE) 2023/1795
                stwierdzającej odpowiedni stopień ochrony w ramach EU-U.S. Data Privacy Framework,
                do którego ci odbiorcy przystąpili. Stay22 ma siedzibę w Kanadzie, dla której Komisja
                wydała decyzję 2002/2/WE o odpowiednim stopniu ochrony. Szczegóły przetwarzania przez
                Google opisują{" "}
                <a href="https://policies.google.com/privacy?hl=pl" target="_blank" rel="noopener noreferrer">
                  zasady prywatności Google
                </a>.
              </p>

              <h2>Jak długo przechowujemy dane</h2>
              <ul>
                <li>Logi serwera – przez czas przechowywania ustawiony przez dostawcę hostingu (Vercel).</li>
                <li>Korespondencja e-mail – przez czas potrzebny do załatwienia sprawy i wypełnienia ewentualnych obowiązków prawnych.</li>
                <li>Dane Google Analytics – zgodnie z ustawieniem retencji w Google Analytics, pliki cookie do 2 lat.</li>
              </ul>

              <h2>Twoje prawa</h2>
              <p>
                Masz prawo dostępu do swoich danych, ich sprostowania, usunięcia, ograniczenia
                przetwarzania, przenoszenia danych oraz sprzeciwu wobec przetwarzania opartego na
                prawnie uzasadnionym interesie. Zgodę na analitykę możesz w każdej chwili wycofać
                poniżej, równie łatwo, jak ją wyraziłeś; nie wpływa to na zgodność z prawem
                przetwarzania sprzed wycofania.
              </p>
              <p>
                Możesz też złożyć skargę do organu nadzorczego: w Polsce do{" "}
                <a href="https://uodo.gov.pl" target="_blank" rel="noopener noreferrer">
                  Prezesa Urzędu Ochrony Danych Osobowych (UODO)
                </a>{" "}
                albo w Czechach, gdzie działa administrator, do{" "}
                <a href="https://uoou.gov.cz" target="_blank" rel="noopener noreferrer">
                  Úřad pro ochranu osobních údajů (ÚOOÚ)
                </a>.
              </p>
            </div>

            <section className="mt-10 rounded-xl border bg-card p-6 shadow-sm" aria-labelledby="cookie-settings-title">
              <div className="mb-4 flex items-center gap-3">
                <Cookie className="h-6 w-6 text-primary" />
                <h2 id="cookie-settings-title" className="text-2xl font-bold">Ustawienia analityki</h2>
              </div>
              <p className="mb-5 text-muted-foreground">
                Twój obecny wybór: <strong>{consent === "accepted" ? "zgoda" : consent === "declined" ? "brak zgody" : "jeszcze nie wybrano"}</strong>.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button onClick={() => updateConsent("accepted")}>
                  {consent === "accepted" && <Check className="mr-2 h-4 w-4" />}
                  Zgadzam się na analitykę
                </Button>
                <Button variant="outline" onClick={() => updateConsent("declined")}>
                  {consent === "declined" && <Check className="mr-2 h-4 w-4" />}
                  Nie zgadzam się
                </Button>
              </div>
            </section>
          </article>
        </div>
      </div>
    </>
  );
};

export default Privacy;
