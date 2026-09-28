// Polish static pages of kastrup.pl for the build plugin (vite-plugin-routes-html.js).
// Titles, descriptions and H1 must match the React pages in src/pages/pl/.
// Keyword research: Vyzkum/polska-verze/KLICOVA-SLOVA-PL.md

const OG = 'https://kastrup.pl/images/og-kastrup.jpg';

// No-JS navigation of the Polish fallback HTML: [href, label]
export const PL_FALLBACK_LINKS = [
  ['/artykuly', 'Artykuły'],
  ['/kopenhaga', 'Kopenhaga'],
  ['/co-zobaczyc-w-danii', 'Co zobaczyć w Danii'],
  ['/wyspy-dunskie', 'Wyspy duńskie'],
  ['/hygge', 'Hygge'],
  ['/kultura-dunska', 'Kultura duńska'],
  ['/noclegi', 'Noclegi'],
  ['/kontakt', 'Kontakt'],
  ['/o-autorce', 'O autorce'],
  ['/polityka-prywatnosci', 'Prywatność'],
];

export const PL_ROUTES = [
  {
    path: '',
    isHomepage: true,
    title: 'Dania – przewodnik: Kopenhaga, atrakcje i noclegi | Kastrup.pl',
    description: 'Przewodnik po Danii: co zobaczyć w Kopenhadze, duńskie wyspy, hygge, mosty i dojazd z lotniska. Sprawdzone ceny i praktyczne porady przed podróżą.',
    canonical: 'https://kastrup.pl/',
    heading: 'Przewodnik po Danii: Kopenhaga, hygge i podróże',
    image: OG,
    preloadImage: {
      assets: [
        { pattern: /^hero-denmark-768-[\w-]{8}\.webp$/, width: 768 },
        { pattern: /^hero-denmark-1280-[\w-]{8}\.webp$/, width: 1280 },
        { pattern: /^hero-denmark-[\w-]{8}\.webp$/, width: 1920 },
      ],
      sizes: '100vw',
    },
    fallbackHtml: `
          <section style="margin-top: 2rem;">
            <h2>Od czego zacząć</h2>
            <p>Na pierwszą podróż wybierz <a href="/kopenhaga">co zobaczyć w Kopenhadze</a>, sprawdź <a href="/artykul/lotnisko-kopenhaga-dojazd-do-centrum">dojazd z lotniska do centrum</a> i przeczytaj, <a href="/hygge">czym naprawdę jest hygge</a>.</p>
            <p><a href="/artykul/mosty-w-danii">Mosty w Danii i opłaty</a> · <a href="/artykul/mons-klint">Møns Klint samochodem</a> · <a href="/artykul/ribe">Ribe: parking i spacer</a></p>
          </section>`,
  },
  {
    path: 'artykuly',
    title: 'Artykuły o Danii: podróże, kultura, praktyczne porady | Kastrup.pl',
    description: 'Artykuły o Danii: Kopenhaga, duńskie wyspy, hygge, mosty i promy. Sprawdzone ceny i praktyczne wskazówki na podróż do Danii.',
    canonical: 'https://kastrup.pl/artykuly',
    heading: 'Artykuły o Danii',
    image: OG,
  },
  {
    path: 'kopenhaga',
    title: 'Kopenhaga: atrakcje i co zobaczyć – mapa i plan | Kastrup.pl',
    description: 'Co zobaczyć w Kopenhadze przy pierwszej wizycie? Najważniejsze atrakcje na mapie, plan zwiedzania na 2–3 dni, dojazd z lotniska i praktyczne porady.',
    canonical: 'https://kastrup.pl/kopenhaga',
    heading: 'Co zobaczyć w Kopenhadze: atrakcje, które mają sens przy pierwszej wizycie',
    image: 'https://kastrup.pl/images/20240813_130726.jpg',
    type: 'article',
    article: {
      title: 'Co zobaczyć w Kopenhadze: atrakcje, które mają sens przy pierwszej wizycie',
      perex: 'Co zobaczyć w Kopenhadze przy pierwszej wizycie? Najważniejsze atrakcje na mapie, plan zwiedzania na 2–3 dni, dojazd z lotniska i praktyczne porady.',
      meta_description: 'Co zobaczyć w Kopenhadze przy pierwszej wizycie? Najważniejsze atrakcje na mapie, plan zwiedzania na 2–3 dni, dojazd z lotniska i praktyczne porady.',
      image_url: 'https://kastrup.pl/images/20240813_130726.jpg',
      og_image: 'https://kastrup.pl/images/20240813_130726.jpg',
      created_at: '2026-09-13T00:00:00+02:00',
      updated_at: '2026-09-13T00:00:00+02:00',
      focus_keyword: 'Kopenhaga, Kopenhaga atrakcje, co zobaczyć w Kopenhadze, Kopenhaga mapa',
      categories: { name: 'Podróże', slug: 'cestovani' },
    },
    fallbackHtml: `
          <article style="margin-top: 2rem; max-width: 800px;">
            <p>Przy pierwszej wizycie połącz <strong>Nyhavn, Amalienborg, Kastellet i Małą Syrenkę</strong> w jedną trasę pieszą. Drugiego dnia przejdź przez Rosenborg, Rundetårn, Christiansborg i Tivoli. Resztę czasu poświęć na Christianshavn, Nørrebro albo portową wyspę Refshaleøen.</p>
            <h2>Kopenhaga – atrakcje na pierwszą wizytę</h2>
            <p>Kopenhaga jest zwarta, ale atrakcje najlepiej grupować według dzielnic. Nyhavn połącz z królewskim Amalienborgiem i spacerem przez Kastellet. Historyczne centrum przejdź od Rosenborga przez Rundetårn do Christiansborga.</p>
            <p><a href="/artykul/dunski-design-kopenhaga">Duński design w Kopenhadze: ceny muzeum i sklepy</a></p>
            <h2>Kopenhaga – mapa i praktyczne trasy</h2>
            <p>Dwa dni wystarczą na główne zabytki. Trzeciego dnia dodaj Nørrebro, Christianshavn i Refshaleøen. Centrum zwiedzisz pieszo; do dalszych dzielnic jedź metrem, autobusem, tramwajem wodnym albo rowerem.</p>
            <h2>Lotnisko w Kopenhadze i dojazd do centrum</h2>
            <p>Z terminalu 3 do centrum jeździ metro i pociąg. Bilet kup przed wejściem, a aktualne połączenie sprawdź w Rejseplanen.</p>
            <p><a href="/artykul/lotnisko-kopenhaga-dojazd-do-centrum">Dojazd z lotniska w Kopenhadze do centrum</a> · <a href="/artykul/mosty-w-danii">Samochodem do Danii: ceny mostów</a> · <a href="/artykul/mons-klint">Møns Klint samochodem</a></p>
          </article>`,
  },
  {
    path: 'co-zobaczyc-w-danii',
    title: 'Dania – atrakcje i co warto zobaczyć: przewodnik | Kastrup.pl',
    description: 'Co warto zobaczyć w Danii? Kopenhaga, Jutlandia, wyspy, zamki i przyroda. Przewodnik z planami podróży, transportem i poradami, kiedy jechać.',
    canonical: 'https://kastrup.pl/co-zobaczyc-w-danii',
    heading: 'Co zobaczyć w Danii: atrakcje i kompletny przewodnik',
    image: OG,
    fallbackHtml: `
          <article style="margin-top: 2rem; max-width: 800px;">
            <p>Dania to zwarty skandynawski kraj: Półwysep Jutlandzki i ponad 400 wysp, piękne wybrzeża, historyczne zamki, nowoczesny design i hygge. Najlepiej jechać od maja do sierpnia, a po zimowy klimat i jarmarki adwentowe w grudniu.</p>
            <h2>Kopenhaga jako baza wypadowa</h2>
            <p>Nyhavn, Tivoli, Amalienborg, Christiansborg, Rosenborg i Rundetårn połączyliśmy w trasy w przewodniku <a href="/kopenhaga">co zobaczyć w Kopenhadze</a>. Dojazd z lotniska opisujemy w artykule <a href="/artykul/lotnisko-kopenhaga-dojazd-do-centrum">lotnisko Kopenhaga – dojazd do centrum</a>.</p>
            <h2>Co warto zobaczyć w Danii poza Kopenhagą</h2>
            <p>Kredowe klify Møns Klint i Stevns Klint, wędrująca wydma Rubjerg Knude i Skagen, zamki Kronborg, Frederiksborg i Egeskov, najstarsze miasto Ribe oraz LEGOLAND i LEGO House w Billund.</p>
            <h2>Plany podróży</h2>
            <p>Na 3–4 dni: Kopenhaga, Billund i jeden klif. Na tydzień: pętla Kopenhaga → północna Zelandia → Fionia → zachodnia Jutlandia.</p>
            <p><a href="/wyspy-dunskie">Wyspy duńskie z mapą</a> · <a href="/artykul/mosty-w-danii">Mosty w Danii i opłaty</a> · <a href="/artykul/mons-klint">Møns Klint: parking i schody</a> · <a href="/hygge">Czym jest hygge</a></p>
          </article>`,
  },
  {
    path: 'noclegi',
    title: 'Noclegi w Kopenhadze i Danii – mapa hoteli | Kastrup.pl',
    description: 'Porównaj noclegi w Kopenhadze i całej Danii na interaktywnej mapie. Porady, jak wybrać hotel w Kopenhadze, przy lotnisku Kastrup i w innych miastach.',
    canonical: 'https://kastrup.pl/noclegi',
    heading: 'Noclegi w Kopenhadze i Danii bez zbędnego szukania',
    image: OG,
    fallbackHtml: `
          <article style="margin-top: 2rem; max-width: 800px;">
            <p>Porównaj dostępne hotele i apartamenty w Kopenhadze i całej Danii bezpośrednio na mapie. Przed rezerwacją sprawdź cenę końcową, warunki anulowania i dojazd do miejsc, które chcesz odwiedzić.</p>
            <h2>Jak wybrać dobrą lokalizację</h2>
            <p>Przy zwiedzaniu Kopenhagi szukaj noclegu z dobrym połączeniem metrem albo pociągiem – nocleg poza samym centrum może być praktyczny, jeśli jest blisko przystanku. Przy dłuższej trasie po Danii sprawdzaj parking albo połączenia komunikacją publiczną.</p>
            <h2>Czy warto nocować przy lotnisku Kastrup?</h2>
            <p>Nocleg przy lotnisku ma sens głównie przy bardzo wczesnym wylocie, późnym przylocie albo krótkiej przesiadce. Na zwiedzanie porównaj łączny czas dojazdów z noclegiem bliżej centrum.</p>
            <h2>Szybka kontrola rezerwacji</h2>
            <p>Porównuj ten sam typ pokoju, termin i warunki: cenę końcową z opłatami, anulowanie, lokalizację z rzeczywistym czasem dojazdu i aktualne oceny gości.</p>
            <p>Zaplanuj pobyt: <a href="/kopenhaga">co zobaczyć w Kopenhadze</a> · <a href="/artykul/lotnisko-kopenhaga-dojazd-do-centrum">dojazd z lotniska w Kopenhadze do centrum</a> · <a href="/co-zobaczyc-w-danii">co zobaczyć w Danii</a></p>
          </article>`,
  },
  {
    path: 'kultura-dunska',
    title: 'Kultura duńska i hygge bez stereotypów | Kastrup.pl',
    description: 'Hygge i duńska kultura bez stereotypów. Sprawdzone artykuły o codziennym życiu, jedzeniu, tradycjach, języku, designie i podróżach po Danii.',
    canonical: 'https://kastrup.pl/kultura-dunska',
    heading: 'Kultura duńska i hygge bez stereotypów',
    image: OG,
    fallbackHtml: `
          <article style="margin-top: 2rem; max-width: 800px;">
            <p><strong>Dania to nie tylko kolorowe domy, designerskie krzesła i rankingi szczęścia.</strong> Poznaj język, jedzenie, tradycje i codzienne zwyczaje, które pomagają zrozumieć, jak naprawdę żyje się w tym kraju.</p>
            <h2>Czym naprawdę jest hygge?</h2>
            <p>Hygge to przyjemna, bezpieczna i swobodna atmosfera, w której człowiek zwalnia i zwraca uwagę na zwykłą chwilę. To nie produkt ani tylko styl urządzania wnętrz.</p>
            <p><a href="/hygge">Przeczytaj przewodnik po hygge</a></p>
            <h2>Co pomaga zrozumieć Danię</h2>
            <p>Duńska nieformalność wiąże się z wysokim zaufaniem społecznym i mniejszym dystansem, a tradycje, od julehygge po nowoczesną gastronomię, wciąż się zmieniają.</p>
            <p><a href="/jezyk-dunski">Duński dla podróżnych</a> · <a href="/artykul/dunski-design-kopenhaga">Duński design w Kopenhadze</a> · <a href="/kopenhaga">Co zobaczyć w Kopenhadze</a></p>
          </article>`,
  },
  {
    path: 'hygge',
    title: 'Hygge – co to znaczy i jak je przeżyć w Danii | Kastrup.pl',
    description: 'Co znaczy hygge po polsku, jak się je wymawia i dlaczego to nie tylko świeczki? Poznaj prawdziwe znaczenie hygge i sposoby, jak przeżyć je w Danii.',
    canonical: 'https://kastrup.pl/hygge',
    heading: 'Hygge bez stereotypów: co naprawdę znaczy i jak je przeżyć',
    image: OG,
    type: 'article',
    article: {
      title: 'Hygge bez stereotypów: co naprawdę znaczy i jak je przeżyć',
      perex: 'Co znaczy hygge po polsku, jak się je wymawia i dlaczego to nie tylko świeczki? Poznaj prawdziwe znaczenie hygge i sposoby, jak przeżyć je w Danii.',
      meta_description: 'Co znaczy hygge po polsku, jak się je wymawia i dlaczego to nie tylko świeczki? Poznaj prawdziwe znaczenie hygge i sposoby, jak przeżyć je w Danii.',
      image_url: OG,
      og_image: OG,
      created_at: '2026-09-13T00:00:00+02:00',
      updated_at: '2026-09-13T00:00:00+02:00',
      focus_keyword: 'hygge, hygge po polsku, co to jest hygge, hygge wymowa, styl hygge',
      categories: { name: 'Kultura duńska', slug: 'kultura' },
    },
    fallbackHtml: `
          <article style="margin-top: 2rem; max-width: 800px;">
            <p><strong>Hygge to duńskie określenie przyjemnej, bezpiecznej i swobodnej atmosfery,</strong> w której człowiek na chwilę zwalnia i cieszy się zwykłym momentem. Może się pojawić przy wspólnym posiłku, rozmowie albo wycieczce, ale także w samotności. To nie produkt ani wyłącznie styl urządzania wnętrz.</p>
            <h2>Hygge: wymowa i pochodzenie słowa</h2>
            <p>Duński słownik podaje wymowę [ˈhygə]. Uproszczone zapisy, na przykład polskimi literami, są tylko orientacyjne, bo duńskie głoski nie mają dokładnych odpowiedników w polszczyźnie.</p>
            <h2>Hygge przez cały rok</h2>
            <p>Zimą to może być wspólna kolacja, pieczenie albo gra planszowa. Latem hygge to piknik, przejażdżka rowerem, długa kolacja na świeżym powietrzu albo spokojny dzień nad morzem.</p>
            <h2>Jak przeżyć hygge podczas podróży do Danii</h2>
            <p>Zostaw w planie wolne miejsce, dziel się jedzeniem, odłóż telefon i nie szukaj lokalu, który ma hygge wypisane na szyldzie. Często pojawia się w zwykłej chwili bez turystycznego scenariusza.</p>
            <p><a href="/kopenhaga">Co zobaczyć w Kopenhadze</a> · <a href="/kultura-dunska">Więcej o kulturze duńskiej</a></p>
          </article>`,
  },
  {
    path: 'jezyk-dunski',
    title: 'Język duński: wymowa, alfabet i podstawowe zwroty | Kastrup.pl',
    description: 'Jak się mówi w Danii? Język duński od podstaw: wymowa, alfabet z Æ, Ø i Å oraz podstawowe zwroty na podróż bez mylącej transkrypcji fonetycznej.',
    canonical: 'https://kastrup.pl/jezyk-dunski',
    heading: 'Język duński: jak się mówi w Danii i co warto wiedzieć',
    image: 'https://kastrup.pl/images/IMG_20230712_091836.webp',
    type: 'article',
    article: {
      title: 'Język duński: jak się mówi w Danii i co warto wiedzieć',
      perex: 'Na papierze duński wygląda przystępniej, niż brzmi. Poznaj jego alfabet, wymowę i praktyczne zwroty na podróż.',
      meta_description: 'Jak się mówi w Danii? Język duński od podstaw: wymowa, alfabet z Æ, Ø i Å oraz podstawowe zwroty na podróż bez mylącej transkrypcji fonetycznej.',
      image_url: 'https://kastrup.pl/images/IMG_20230712_091836.webp',
      og_image: 'https://kastrup.pl/images/IMG_20230712_091836.webp',
      created_at: '2026-09-13T00:00:00+02:00',
      updated_at: '2026-09-13T00:00:00+02:00',
      focus_keyword: 'język duński, język duński podstawy, język duński wymowa, duński alfabet',
      categories: { name: 'Kultura duńska', slug: 'kultura' },
    },
    fallbackHtml: `
          <article style="margin-top: 2rem; max-width: 800px;">
            <p>W Danii mówi się <strong>po duńsku</strong>. Język duński należy do języków północnogermańskich i posługuje się nim około sześciu milionów ludzi. Jest spokrewniony z norweskim i szwedzkim, ale jego mówiona odmiana bywa dla obcokrajowców trudniejsza niż tekst pisany.</p>
            <h2>Dlaczego duńska wymowa jest myląca</h2>
            <p>Duński alfabet ma po literze Z jeszcze Æ, Ø i Å. Wymowę utrudniają redukcja głosek i zjawisko zwane stød, dlatego zapisane zwroty najlepiej łączyć ze słuchaniem rodzimych użytkowników języka.</p>
            <h2>Podstawowe zwroty po duńsku</h2>
            <p>Hej znaczy cześć, tak – dziękuję, undskyld – przepraszam, a Taler du engelsk? – czy mówisz po angielsku? Uwaga: duńskie „tak” to „dziękuję”, a zgodę wyrażasz słowem „ja”.</p>
            <h2>Czy w Danii wystarczy angielski?</h2>
            <p>W transporcie, hotelu, restauracji i w miejscach turystycznych zwykle dogadasz się po angielsku, ale duński pomaga przy czytaniu nazw, rozkładów jazdy i tablic.</p>
            <p><a href="/kultura-dunska">Więcej o kulturze duńskiej</a> · <a href="/hygge">Hygge i jego prawdziwe znaczenie</a> · <a href="/co-zobaczyc-w-danii">Przewodnik po Danii</a></p>
          </article>`,
  },
  {
    path: 'wyspy-dunskie',
    title: 'Wyspy duńskie: którą wybrać i co zobaczyć | Kastrup.pl',
    description: 'Duńskie wyspy w pigułce: Zelandia, Fionia, Møn, Bornholm, Samsø, Ærø, Fanø i Rømø. Mapa, dojazd i wybór wyspy dopasowany do rodzaju podróży.',
    canonical: 'https://kastrup.pl/wyspy-dunskie',
    heading: 'Wyspy duńskie: którą wybrać, co zobaczyć i jak tam dotrzeć',
    image: 'https://kastrup.pl/images/20240811_202640.jpg',
    type: 'article',
    article: {
      title: 'Wyspy duńskie: którą wybrać, co zobaczyć i jak tam dotrzeć',
      perex: 'Dania to Jutlandia i setki wysp. Wybierz Zelandię, Fionię, Møn, Bornholm albo mniejszą wyspę według tego, jak chcesz podróżować.',
      meta_description: 'Duńskie wyspy w pigułce: Zelandia, Fionia, Møn, Bornholm, Samsø, Ærø, Fanø i Rømø. Mapa, dojazd i wybór wyspy dopasowany do rodzaju podróży.',
      image_url: 'https://kastrup.pl/images/20240811_202640.jpg',
      og_image: 'https://kastrup.pl/images/20240811_202640.jpg',
      created_at: '2026-09-13T00:00:00+02:00',
      updated_at: '2026-09-13T00:00:00+02:00',
      focus_keyword: 'wyspy duńskie, duńskie wyspy, duńska wyspa, Fionia, Bornholm',
      categories: { name: 'Podróże', slug: 'cestovani' },
    },
    fallbackHtml: `
          <article style="margin-top: 2rem; max-width: 800px;">
            <p>VisitDenmark podaje 444 nazwane wyspy. Na pierwszy wyjazd do miasta wybierz <strong>Zelandię</strong> z Kopenhagą, a na Odense i spokojniejszą wieś <strong>Fionię</strong>.</p>
            <h2>Którą duńską wyspę wybrać</h2>
            <p>Møn przyciąga kredowymi klifami, Bornholm skalistym wybrzeżem i dłuższym aktywnym urlopem. Samsø i Ærø nadają się na rower i wolniejsze tempo, Fanø i Rømø na plaże Morza Wattowego.</p>
            <h2>Jak dotrzeć na duńskie wyspy</h2>
            <p>Zelandię i Fionię łączą mosty i pociągi. Na mniejsze wyspy kursują promy; z samochodem warto zarezerwować miejsce z wyprzedzeniem.</p>
            <p><a href="/co-zobaczyc-w-danii">Pełny przewodnik po Danii</a></p>
            <p><a href="/artykul/mons-klint">Møns Klint: parking i schody</a> · <a href="/artykul/mosty-w-danii">Ceny mostów Storebælt i Øresund</a> · <a href="/artykul/ribe">Ribe po drodze przez Jutlandię</a></p>
          </article>`,
  },
  {
    path: 'kontakt',
    title: 'Kontakt | Kastrup.pl',
    description: 'Kontakt w sprawie podróży do Danii. Pavla Zimmermannová, autorka Kastrup.pl – przewodnika po Kopenhadze, kulturze duńskiej i noclegach.',
    canonical: 'https://kastrup.pl/kontakt',
    heading: 'Kontakt',
    image: OG,
  },
  {
    path: 'o-autorce',
    title: 'Pavla Zimmermannová – autorka Kastrup.pl',
    description: 'Poznaj Pavlę Zimmermannovą, autorkę Kastrup.pl. Dzieli się praktycznymi wskazówkami, własnym doświadczeniem i inspiracjami na podróże po Danii.',
    canonical: 'https://kastrup.pl/o-autorce',
    heading: 'Pavla Zimmermannová – autorka Kastrup.pl',
    image: OG,
    type: 'profile',
  },
  {
    path: 'polityka-prywatnosci',
    title: 'Polityka prywatności i cookies | Kastrup.pl',
    description: 'Jak Kastrup.pl przetwarza dane osobowe, jakich plików cookie używa, komu przekazuje dane i jak zmienić zgodę na Google Analytics.',
    canonical: 'https://kastrup.pl/polityka-prywatnosci',
    heading: 'Polityka prywatności i cookies',
    image: OG,
  },
];
