-- Ukázkový článek: "Co vidět v Dánsku - Top 10 destinací"
-- POZNÁMKA: Tento script vyžaduje existenci alespoň jednoho admin uživatele
-- Pokud nemáte admin účet, vytvořte ho nejdřív v Supabase Auth

DO $$
DECLARE
  v_category_id UUID;
  v_author_id UUID;
  v_article_id UUID;
BEGIN
  -- Získat category_id pro "Cestování"
  SELECT id INTO v_category_id FROM public.categories WHERE slug = 'cestovani' LIMIT 1;

  -- Získat první admin profil
  SELECT id INTO v_author_id FROM public.profiles WHERE role = 'admin' LIMIT 1;

  -- Kontrola, zda máme potřebné údaje
  IF v_category_id IS NULL THEN
    RAISE EXCEPTION 'Kategorie "Cestování" neexistuje. Ujistěte se, že základní migrace proběhla správně.';
  END IF;

  IF v_author_id IS NULL THEN
    RAISE NOTICE 'Žádný admin profil nenalezen. Článek nebude vytvořen. Vytvořte nejprve admin účet.';
    RETURN;
  END IF;

  -- Vložit ukázkový článek
  INSERT INTO public.articles (
    title,
    slug,
    perex,
    content,
    category_id,
    image_url,
    published,
    author_id,
    meta_title,
    meta_description,
    focus_keyword
  ) VALUES (
    'Co vidět v Dánsku - Top 10 destinací',
    'co-videt-v-dansku-top-10-destinaci',
    'Objevte nejkrásnější místa Dánska! Od barevné Kodaně přes malebné Skagen až po historický Ribe. Kompletní průvodce po nejlepších destinacích, které musíte navštívit.',
    E'<h2>Úvod do dánských krás</h2>\n\n<p>Dánsko je malá, ale nesmírně rozmanitá země, která nabízí turistům jedinečnou kombinaci moderní architektury, bohaté historie a nádherné přírody. Ať už jste milovníci městského ruchu, historických památek nebo klidných pobřežních městeček, v Dánsku si určitě přijdete na své.</p>\n\n<h2>1. Kodaň - Hlavní město plné života</h2>\n\n<p>Kodaň je bezesporu must-see destinací. Navštivte:</p>\n\n<ul>\n<li><strong>Nyhavn</strong> - ikonický kanál s barevnými domy a restauracemi</li>\n<li><strong>Malá mořská víla</strong> - nejznámější dánská socha</li>\n<li><strong>Tivoli Gardens</strong> - jeden z nejstarších zábavních parků na světě</li>\n<li><strong>Christiansborg</strong> - sídlo dánského parlamentu</li>\n<li><strong>Freetown Christiania</strong> - alternativní komunita v srdci města</li>\n</ul>\n\n<h2>2. Skagen - Místo, kde se moře potkávají</h2>\n\n<p>Skagen, nejsevernější město Dánska, je proslulé svým jedinečným světlem, které přitahovalo umělce už v 19. století. Hlavní atrakcí je Grenen, místo kde se setkává Severní a Baltské moře. Můžete zde doslova stát s jednou nohou v každém moři!</p>\n\n<h2>3. Aarhus - Kulturní metropole</h2>\n\n<p>Druhé největší dánské město nabízí:</p>\n\n<ul>\n<li><strong>ARoS</strong> - jedno z největších uměleckých muzeí v severní Evropě</li>\n<li><strong>Den Gamle By</strong> - muzeum na otevřeném prostranství s historickými budovami</li>\n<li><strong>Латинская čtvrť</strong> - oblast plná kaváren, barů a obchůdků</li>\n</ul>\n\n<h2>4. Ribe - Nejstarší město Dánska</h2>\n\n<p>Ribe, založené ve 8. století, je jako živé muzeum. Procházka dlážděnými uličkami mezi domy s doškovými střechami vás přenese zpět v čase. Nezapomeňte navštívit katedrálu Ribe a vyšlápnout si na její věž pro úchvatný výhled.</p>\n\n<h2>5. Bornholm - Slunečný ostrov</h2>\n\n<p>Ostrov Bornholm v Baltském moři je ideální pro ty, kdo hledají kombinaci pláží, skal a přírody. Známý je také svou keramikou a tradičním udírným lososem.</p>\n\n<h2>6. Roskilde - Město vikingů</h2>\n\n<p>Historické město Roskilde je domovem:</p>\n\n<ul>\n<li><strong>Muzeum vikingských lodí</strong> - s autentickými vikingovými plavidly</li>\n<li><strong>Katedrála v Roskilde</strong> - UNESCO památka a pohřebiště dánských králů</li>\n<li><strong>Roskilde Festival</strong> - jeden z největších hudebních festivalů v Evropě</li>\n</ul>\n\n<h2>7. Kronborg - Hamletův hrad</h2>\n\n<p>Renesanční hrad Kronborg v Helsingøru je známý jako místo děje Shakespearova Hamleta. UNESCO památka nabízí fascinující pohled do dánské královské historie.</p>\n\n<h2>8. Legoland - Zábava pro celou rodinu</h2>\n\n<p>V Billundu najdete původní Legoland, zábavní park postavený z miliónů kostek LEGO. Ideální výlet pro rodiny s dětmi!</p>\n\n<h2>9. Møns Klint - Bílé útesy</h2>\n\n<p>Tyto dramatické křídové útesy dosahují výšky až 128 metrů a jsou jedním z nejkrásnějších přírodních divů Dánska. Výhled z vrcholu na tyrkysové moře je nezapomenutelný.</p>\n\n<h2>10. Odense - Město H.C. Andersena</h2>\n\n<p>Rodné město slavného pohádkáře nabízí:</p>\n\n<ul>\n<li><strong>H.C. Andersen Museum</strong> - věnované životu a dílu spisovatele</li>\n<li><strong>Fünen Village</strong> - muzeum na otevřeném prostranství</li>\n<li><strong>Egeskov Castle</strong> - nejlépe zachovalý vodní hrad v Evropě</li>\n</ul>\n\n<h2>Praktické tipy pro cestování</h2>\n\n<p><strong>Nejlepší doba návštěvy:</strong> Květen až září, kdy je nejpříjemnější počasí a nejdelší dny.</p>\n\n<p><strong>Doprava:</strong> Dánsko má vynikající vlakové spojení. Copenhagen Card nabízí neomezené cestování a vstupy do mnoha atrakcí.</p>\n\n<p><strong>Cykloturistika:</strong> Dánsko je ráj pro cyklisty s tisíci kilometrů značených cyklostezek.</p>\n\n<p><strong>Jazyk:</strong> Většina Dánů výborně mluví anglicky, takže se domluvíte bez problémů.</p>\n\n<h2>Závěr</h2>\n\n<p>Dánsko je destinace, která překvapí svou rozmanitostí. Ať už vás láká historie vikingů, moderní design, nádherná příroda nebo proslulé dánské hygge, v této skandinávské zemi najdete vše. Každé z těchto deseti míst nabízí unikátní zážitek a společně tvoří nezapomenutelný obraz této kouzelné země.</p>\n\n<p>Nezapomeňte si užít místní speciality jako smørrebrød, flæskesteg nebo tradiční dánské pečivo. A hlavně - užijte si atmosféru hygge, tu dánskou pohodu a útulnost, která dělá z Dánska jednu z nejšťastnějších zemí světa!</p>',
    v_category_id,
    'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=1200&h=630&fit=crop',
    true,
    v_author_id,
    'Co vidět v Dánsku - Top 10 nejkrásnějších destinací | Kastrup.cz',
    'Objevte 10 nejlepších míst v Dánsku! Kodaň, Skagen, Aarhus, Ribe a další nádherné destinace. Praktický průvodce s tipy pro vaši cestu.',
    'co vidět v Dánsku'
  ) RETURNING id INTO v_article_id;

  RAISE NOTICE 'Ukázkový článek byl úspěšně vytvořen s ID: %', v_article_id;

END $$;
