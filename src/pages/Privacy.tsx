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
import { DEFAULT_SOCIAL_IMAGE } from "@/lib/seo-helpers";

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
        <title>Ochrana soukromí a cookies | Kastrup.cz</title>
        <meta
          name="description"
          content="Informace o ochraně osobních údajů, používání cookies a službě Google Analytics na webu Kastrup.cz včetně možnosti změnit souhlas."
        />
        <link rel="canonical" href="https://kastrup.cz/ochrana-soukromi" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kastrup.cz/ochrana-soukromi" />
        <meta property="og:title" content="Ochrana soukromí a cookies | Kastrup.cz" />
        <meta property="og:description" content="Jak Kastrup.cz pracuje s cookies a údaji návštěvníků." />
        <meta property="og:image" content={DEFAULT_SOCIAL_IMAGE} />
      </Helmet>

      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 md:px-6">
          <article className="mx-auto max-w-3xl">
            <Breadcrumbs items={[{ label: "Ochrana soukromí a cookies" }]} />

            <header className="mb-10">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                <Shield className="h-7 w-7 text-primary" />
              </div>
              <h1 className="mb-4 text-4xl font-bold md:text-5xl">Ochrana soukromí a cookies</h1>
              <p className="text-lg text-muted-foreground">Platné od 12. září 2026</p>
            </header>

            <div className="prose prose-lg max-w-none dark:prose-invert">
              <h2>Kdo web provozuje</h2>
              <p>
                Správcem osobních údajů je Pavla Zimmermannová, IČO 04352041,
                Bílina, Česká republika. V otázkách soukromí nás můžete kontaktovat
                na <a href="mailto:zimmermannovap@gmail.com">zimmermannovap@gmail.com</a>.
              </p>

              <h2>Jaké údaje web zpracovává</h2>
              <p>
                Běžné prohlížení webu nevyžaduje registraci. Technické systémy mohou
                zpracovat nezbytné síťové údaje, například IP adresu, čas požadavku,
                typ prohlížeče a požadovanou adresu, za účelem bezpečného a spolehlivého
                provozu webu.
              </p>
              <p>
                Pokud nám napíšete e-mail, zpracujeme adresu, obsah zprávy a další údaje,
                které sami uvedete, pouze pro vyřízení komunikace. Údaje uchováváme po dobu
                potřebnou k vyřízení dotazu a splnění případných zákonných povinností.
              </p>

              <h2>Google Analytics</h2>
              <p>
                Pouze po vašem souhlasu načítáme Google Analytics 4. Služba nám poskytuje
                souhrnné informace o návštěvnosti a používání webu. Může zpracovat údaje
                o zařízení, prohlížeči, navštívených stránkách a přibližné poloze odvozené
                ze síťového připojení. Osobní údaje ani obsah e-mailů do Analytics vědomě
                neposíláme.
              </p>

              <h2>Mapa ubytování Stay22</h2>
              <p>
                Na stránce ubytování se automaticky načítá externí mapa služby Stay22.
                Při otevření této stránky proto vznikne spojení se Stay22, které může zpracovat
                technické údaje o zařízení a používání mapy podle svých{' '}
                <a href="https://www.stay22.com/privacy" target="_blank" rel="noopener noreferrer">
                  pravidel ochrany soukromí
                </a>.
              </p>
              <p>
                Odkazy a nabídky v mapě jsou partnerské. Pokud přes ně dokončíte rezervaci,
                můžeme získat provizi. Cenu, dostupnost a podmínky rezervace vždy určuje
                konkrétní rezervační partner.
              </p>

              <h2>Používaná úložiště a cookies</h2>
              <ul>
                <li><strong>cookie-consent</strong> – volba souhlasu uložená v prohlížeči.</li>
                <li><strong>vite-ui-theme</strong> – zvolené světlé nebo tmavé zobrazení.</li>
                <li><strong>_ga a _ga_*</strong> – analytické cookies Google Analytics, nejdéle na 2 roky; vznikají jen po souhlasu.</li>
                <li><strong>Stay22</strong> – externí mapa může při otevření stránky ubytování použít vlastní technická úložiště.</li>
              </ul>

              <h2>Komu mohou být údaje zpřístupněny</h2>
              <p>
                Technický provoz zajišťují poskytovatelé hostingu a databázových služeb.
                Při povolení analytiky je jejím poskytovatelem Google. Tito poskytovatelé
                mohou data zpracovávat podle svých podmínek a pravidel ochrany soukromí.
                Podrobnosti jsou uvedené v{' '}
                <a href="https://policies.google.com/privacy?hl=cs" target="_blank" rel="noopener noreferrer">
                  zásadách ochrany soukromí Google
                </a>.
              </p>

              <h2>Vaše práva</h2>
              <p>
                Můžete požádat o přístup k údajům, opravu, výmaz, omezení zpracování nebo
                vznést námitku, pokud jsou splněny zákonné podmínky. Souhlas s analytikou
                můžete kdykoli změnit níže. Máte také právo obrátit se se stížností na
                {' '}
                <a
                  href="https://uoou.gov.cz/online-formular-pro-podani-stiznosti-na-poruseni-predpisu-na-ochranu-osobnich-udaju"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Úřad pro ochranu osobních údajů
                </a>.
              </p>
            </div>

            <section className="mt-10 rounded-xl border bg-card p-6 shadow-sm" aria-labelledby="cookie-settings-title">
              <div className="mb-4 flex items-center gap-3">
                <Cookie className="h-6 w-6 text-primary" />
                <h2 id="cookie-settings-title" className="text-2xl font-bold">Nastavení analytiky</h2>
              </div>
              <p className="mb-5 text-muted-foreground">
                Aktuální volba: <strong>{consent === "accepted" ? "povoleno" : consent === "declined" ? "odmítnuto" : "zatím nezvoleno"}</strong>.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button onClick={() => updateConsent("accepted")}>
                  {consent === "accepted" && <Check className="mr-2 h-4 w-4" />}
                  Povolit analytiku
                </Button>
                <Button variant="outline" onClick={() => updateConsent("declined")}>
                  {consent === "declined" && <Check className="mr-2 h-4 w-4" />}
                  Odmítnout analytiku
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
