-- Přidání FAQ sekce do článku o Kodani
-- Vytvořeno: 2025-01-20

DO $$
DECLARE
  v_article_id UUID;
  v_content TEXT;
BEGIN
  -- Najít článek o Kodani
  SELECT id, content INTO v_article_id, v_content
  FROM public.articles
  WHERE slug = 'kodan-kompletni-pruvodce-2025';

  IF v_article_id IS NULL THEN
    RAISE NOTICE 'Článek o Kodani nebyl nalezen.';
    RETURN;
  END IF;

  -- Přidat FAQ sekci před footer
  v_content := REPLACE(
    v_content,
    '<footer style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #ddd;">',
    E'<section id="faq" class="faq-section">
  <h2>Často kladené otázky o Kodani</h2>

  <details class="group mb-4 rounded-lg border bg-card p-4 transition-all hover:shadow-md">
    <summary class="cursor-pointer font-semibold text-lg list-none flex items-center justify-between">
      <span>Kolik stojí vstupné do Tivoli?</span>
      <span class="text-primary transition-transform group-open:rotate-180">▼</span>
    </summary>
    <p class="mt-4 text-muted-foreground">Vstupné do Tivoli stojí přibližně 135 DKK (cca 450 Kč) pro dospělé. Děti do 7 let mají vstup zdarma. Je důležité poznamenat, že vstupné nezahrnuje atrakce - na ty je potřeba koupit lístky zvlášť nebo zakoupit all-inclusive pass.</p>
  </details>

  <details class="group mb-4 rounded-lg border bg-card p-4 transition-all hover:shadow-md">
    <summary class="cursor-pointer font-semibold text-lg list-none flex items-center justify-between">
      <span>Jak se dostat z letiště do centra Kodaně?</span>
      <span class="text-primary transition-transform group-open:rotate-180">▼</span>
    </summary>
    <p class="mt-4 text-muted-foreground">Z letiště Kastrup se dostanete do centra Kodaně metrem (linka M2) za 15 minut. Jízdenka stojí 36 DKK (cca 120 Kč). Alternativně můžete jet vlakem, který jede ještě rychleji - jen 13 minut.</p>
  </details>

  <details class="group mb-4 rounded-lg border bg-card p-4 transition-all hover:shadow-md">
    <summary class="cursor-pointer font-semibold text-lg list-none flex items-center justify-between">
      <span>Je potřeba rezervovat vstup do Amalienborgu?</span>
      <span class="text-primary transition-transform group-open:rotate-180">▼</span>
    </summary>
    <p class="mt-4 text-muted-foreground">Střídání stráží u Amalienborgu je zdarma a nepotřebujete rezervaci. Probíhá každý den v poledne (12:00). Pokud chcete navštívit muzeum uvnitř paláce, doporučujeme koupit vstupenky online předem, zejména v hlavní sezóně.</p>
  </details>

  <details class="group mb-4 rounded-lg border bg-card p-4 transition-all hover:shadow-md">
    <summary class="cursor-pointer font-semibold text-lg list-none flex items-center justify-between">
      <span>Je Copenhagen Card opravdu výhodná?</span>
      <span class="text-primary transition-transform group-open:rotate-180">▼</span>
    </summary>
    <p class="mt-4 text-muted-foreground">Copenhagen Card se vyplatí, pokud plánujete navštívit 3-4 placené atrakce denně a budete se hodně pohybovat metrem/busem. Pro 2denní pobyt s návštěvou Tivoli, Rosenborg a plavbou po kanálech je karta výhodná. Pokud se chcete spíše toulat městem a navštívit jen 1-2 atrakce, není nutná.</p>
  </details>

  <details class="group mb-4 rounded-lg border bg-card p-4 transition-all hover:shadow-md">
    <summary class="cursor-pointer font-semibold text-lg list-none flex items-center justify-between">
      <span>Kde najdu nejlepší smørrebrød v Kodani?</span>
      <span class="text-primary transition-transform group-open:rotate-180">▼</span>
    </summary>
    <p class="mt-4 text-muted-foreground">Nejlepší smørrebrød najdete v tradičních podnicích jako Schønnemann (od 1877), Restaurant Kronborg nebo na tržnici Torvehallerne. Pro autentický zážitek doporučujeme menší lokální pekárny v Nørrebru nebo Vesterbru, kde jsou ceny nižší a kvalita skvělá.</p>
  </details>

  <details class="group mb-4 rounded-lg border bg-card p-4 transition-all hover:shadow-md">
    <summary class="cursor-pointer font-semibold text-lg list-none flex items-center justify-between">
      <span>Kdy je nejlepší čas navštívit Kodaň?</span>
      <span class="text-primary transition-transform group-open:rotate-180">▼</span>
    </summary>
    <p class="mt-4 text-muted-foreground">Ideální čas je květen-září, kdy je příjemné počasí a delší dny. Červenec a srpen jsou nejvytíženější a nejdražší. Pro nejlepší poměr ceny a počasí doporučujeme květen nebo září. Advent (prosinec) je kouzelný díky vánočním trhům, ale počítejte s krátkými dny a chladem.</p>
  </details>

  <details class="group mb-4 rounded-lg border bg-card p-4 transition-all hover:shadow-md">
    <summary class="cursor-pointer font-semibold text-lg list-none flex items-center justify-between">
      <span>Je Kodaň bezpečná pro turisty?</span>
      <span class="text-primary transition-transform group-open:rotate-180">▼</span>
    </summary>
    <p class="mt-4 text-muted-foreground">Ano, Kodaň patří mezi nejbezpečnější města v Evropě. Násilná kriminalita je velmi vzácná. Pozor si dejte pouze na kapesní krádeže v turistických oblastech (Nyhavn, Strøget) a na hlavním nádraží. Jinak je město extrémně bezpečné i v noci.</p>
  </details>

</section>

<footer style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #ddd;">'
  );

  -- Aktualizovat článek
  UPDATE public.articles
  SET content = v_content,
      updated_at = NOW()
  WHERE id = v_article_id;

  RAISE NOTICE 'FAQ sekce byla úspěšně přidána do článku o Kodani!';

END $$;
