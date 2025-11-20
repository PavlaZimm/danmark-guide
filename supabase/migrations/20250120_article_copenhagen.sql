-- Článek: Kodaň: Kompletní průvodce 2025
-- Vytvořeno: 2025-01-20
-- Autor: Pavla Zimmermannová
-- Kategorie: Města (nebo Cestování - lze změnit)

DO $$
DECLARE
  v_category_id UUID;
  v_author_id UUID;
  v_article_id UUID;
  v_category_name TEXT := 'Města'; -- ZMĚŇ NA 'Cestování' pokud nechceš novou kategorii
  v_category_slug TEXT := 'mesta'; -- ZMĚŇ NA 'cestovani' pokud nechceš novou kategorii
BEGIN
  -- Získat nebo vytvořit kategorii
  SELECT id INTO v_category_id FROM public.categories WHERE slug = v_category_slug LIMIT 1;

  IF v_category_id IS NULL THEN
    INSERT INTO public.categories (name, slug, description)
    VALUES (v_category_name, v_category_slug, 'Články o dánských městech a jejich zajímavostech')
    RETURNING id INTO v_category_id;
    RAISE NOTICE 'Kategorie "%" vytvořena s ID: %', v_category_name, v_category_id;
  END IF;

  -- Získat admin autora
  SELECT id INTO v_author_id FROM public.profiles WHERE role = 'admin' LIMIT 1;

  IF v_author_id IS NULL THEN
    RAISE NOTICE 'Žádný admin profil nenalezen. Článek nebude vytvořen.';
    RETURN;
  END IF;

  -- Kontrola existence článku
  SELECT id INTO v_article_id FROM public.articles WHERE slug = 'kodan-kompletni-pruvodce-2025';

  IF v_article_id IS NOT NULL THEN
    RAISE NOTICE 'Článek již existuje s ID: %', v_article_id;
    RETURN;
  END IF;

  -- Vložit článek
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
    focus_keyword,
    created_at,
    updated_at
  ) VALUES (
    'Kodaň: Kompletní průvodce 2025',
    'kodan-kompletni-pruvodce-2025',
    'Kodaň je srdcem Dánska – moderní, zelenou metropolí s přívětivou atmosférou, fantastickou gastronomií, královskými paláci a unikátním duchem hygge. Objevte Nyhavn, Tivoli, Amalienborg, street art v Nørrebru a skrytá místa. 2-3 denní itinerář, praktické tipy a interaktivní mapa.',
    E'<article class="article-content">
  <div class="lead-box" style="background-color: #f5f5f5; padding: 20px; border-left: 4px solid #d4af37; margin: 20px 0;">
    <p><strong>Kodaň</strong> je srdcem Dánska – moderní, zelenou metropolí s přívětivou atmosférou, fantastickou gastronomií, královskými paláci a unikátním duchem hygge. Je to město, kde se setkávají historie a inovace, barevné domky Nyhavnu a futuristický design.</p>

    <h3>🎯 Na první pohled:</h3>
    <ul>
      <li>✈️ <strong>Proč jet:</strong> Ikonické atrakce, street art, kavárny, design, bezpečnost, cyklistika</li>
      <li>📅 <strong>Jak dlouho:</strong> Ideálně 2–3 dny (minimálně 1 den)</li>
      <li>💡 <strong>Doprava:</strong> Metro, bus, jízdní kola všude; velmi bezpečné</li>
      <li>🍽️ <strong>Jídlo:</strong> Smørrebrød, Torvehallerne, restaurace s hvězdičkami i street food</li>
    </ul>
  </div>

  <section id="introduction">
    <h2>Proč navštívit Kodaň</h2>
    <p>Kodaň není jen turistickou destinací – je to zážitek způsobu života, který si vytvořili Dánové. Kombinuje starobylou charm se moderním designem, tradici s inovací a formalitu s přátelskostí.</p>

    <p>Město je kompaktní a snadno se v něm orientuje. Všechno důležité je v pěší vzdálenosti nebo pár minut metrem/busem. Dánové jsou terčem cyklistů – připravte se na dvoustopou infrastrukturu a příležitost si půjčit kolo. Atmosféra je uvolněná, bezpečná a velmi přátelská.</p>
  </section>

  <section id="fundamentalni-info">
    <h2>Základní informace o Kodani</h2>
    <p><strong>Počet obyvatel:</strong> Přibližně 1,3 milionů v Kodani a okolí (velký metropolitan region).</p>
    <p><strong>Poloha:</strong> Na ostrově Sjælland, v severní části Dánska.</p>
    <p><strong>Jazyk:</strong> Dánština je oficiální, ale angličtina je všude běžná – všichni Dánové mluví anglicky výborně.</p>
    <p><strong>Měna:</strong> DKK (dánské koruny). Bezkontaktní karty jsou všude přijímány.</p>
    <p><strong>Bezpečnost:</strong> Kodaň je jedním z nejbezpečnějších měst v Evropě. Krádež a násilí jsou vzácné.</p>
  </section>

  <section id="must-see">
    <h2>TOP 6 MUST-SEE atrakcí v Kodani</h2>

    <h3>1️⃣ Nyhavn – Barevný přístav se životem</h3>
    <p>Nyhavn je nejznámější a nejfotografovanější místo v Kodani. Starobylý přístav z 17. století se nyní hemží kavárnami, restauracemi a místními. Barvy domů – červená, žlutá, oranžová – jsou ikonické.</p>
    <p><strong>Co dělat:</strong> Procházka, fotky, posezení v kavárně s kávou a krendilem, nákupy v galeriích podél přístavu, plavby po kanálech (1–2 hodiny z Nyhavnu).</p>
    <p><strong>Jak dlouho:</strong> 1–2 hodiny (s kávou a procházkou)</p>
    <p><strong>💡 Tip:</strong> Jděte ráno (do 10:00) nebo večer (od 18:00), kdy je méně turistů. Návštěva v noci je také krásná – osvětlení je kouzelné.</p>
    <p><strong>📚 Zajímavost:</strong> H.C. Andersen žil v č. 20 Nyhavnu, kde psal své pohádky. Dům má pamětní desku.</p>

    <h3>2️⃣ Malá mořská víla – Ikonická socha</h3>
    <p>Jedná se o malou sochu (jen 125 cm vysokou), která je středem světové pozornosti. Inspirována je H.C. Andersenskou pohádkou, vytesaná byla Edvardem Eriksenem v roce 1913.</p>
    <p><strong>Umístění:</strong> Na pobřeží Langelinie (pěšky 20 minut od Nyhavnu nebo busem).</p>
    <p><strong>Jak dlouho:</strong> 20–30 minut</p>
    <p><strong>💡 Tip:</strong> Ráno je méně lidí. Socha je malá, ale atmosféra je kouzelná.</p>

    <h3>3️⃣ Tivoli Gardens – Zábavní park ve středu města</h3>
    <p>Druhý nejstarší zábavní park na světě (založen 1843). Nachází se přímo ve středu Kodaně a je volně přístupný z ulice. Park je kouzelný s rozsvícením večer.</p>
    <p><strong>Atrakce:</strong> Horské dráhy, hry, divadelní představení, restaurace a kavárny, nádherné zahrady.</p>
    <p><strong>Jak dlouho:</strong> 2–4 hodiny</p>
    <p><strong>💡 Tip:</strong> Nejhezčí je zde večer, kdy se park rozsvěcuje. Vánoční čas (prosinec) je kouzelný s trhy a zdobením.</p>

    <h3>4️⃣ Amalienborg – Královský palác</h3>
    <p>Oficiální sídlo dánské královny. Palác je tvořen čtyřmi stejnými barokovými budovami kolem čtvercového náměstí. Je to nejkrásnější architektonické místo v Kodani.</p>
    <p><strong>Co vidět:</strong> Střídání královské stráže probíhá ZDARMA každý den v poledne (12:00).</p>
    <p><strong>Jak dlouho:</strong> 45 minut až 1,5 hodiny</p>
    <p><strong>💡 Tip:</strong> Dorazit 5–10 minut před polednem, abyste měli dobré místo na fotky.</p>

    <h3>5️⃣ Rosenborg – Zámek se zahradami a muzeem</h3>
    <p>Renesanční zámek z 17. století, původně letní rezidence. Nyní obsahuje muzeum s královskými poklady a korunovačními klenoty. Zahrady kolem zámku jsou krásné – ideální na piknik.</p>
    <p><strong>Expozice:</strong> Královské šperky, porcelán, obrazy – bohatá historie.</p>
    <p><strong>Jak dlouho:</strong> 1–2 hodiny</p>
    <p><strong>💡 Tip:</strong> Vezměte si piknik a usedněte v zahradě. Dánové zde často posedávají s pivo a sendviči.</p>

    <h3>6️⃣ Christiansborg – Palác s parlamentem</h3>
    <p>Palác sídlícího se dánským parlamentem (Folketing). Je to jedno z nejdůležitějších míst v Dánsku.</p>
    <p><strong>Co vidět:</strong> Návštěvnické pokoje parlamentu jsou otevřené pro veřejnost. Lze si projít reprezentační sály.</p>
    <p><strong>Jak dlouho:</strong> 1–1,5 hodiny</p>
  </section>

  <section id="hidden-gems">
    <h2>Skrytá místa a nenápadné klenoty</h2>

    <h3>🎨 Nørrebro – Alternativní čtvrť se street artem</h3>
    <p>Mladá, trendy čtvrť plná street artu, nezávislých obchodů, kavárů a restaurací. Zde žijí umělci, designéři a mladí Dánové. Atmosféra je uvolněná a tvůrčí.</p>
    <p><strong>Co tam je:</strong> Jægersborggade ulice je plná barevného graffiti, galerií a místních obchodů. Kavárny tu jsou levnější a autentičtější než v centru.</p>

    <h3>🌳 Superkilen – Unikátní urbanistický park</h3>
    <p>Veřejný park navržený jako umělecké dílo. Rozdělený je na tři zóny: Červená (sport), černobílá (relaxace), zelená (hřiště).</p>
    <p><strong>Proč tam:</strong> Neobvyklé fotky, moderní design, fenomén nového urbanismu.</p>

    <h3>🥘 Torvehallerne – Moderní tržnice s jídlem</h3>
    <p>Dvě původní tržnice sloužící jako prostor pro street food, čerstvé produkty a mezinárodní speciality. Skvělé místo na oběd.</p>
    <p><strong>Co koupit:</strong> Smørrebrød, dánské dobroty, arabské kebaby, asijské pokrmy, víno, sýry, pečivo.</p>

    <h3>⛩️ Kastellet – Hvězdová pevnost zdarma</h3>
    <p>Jedna z nejlépe zachovaných hvězdových pevností v Evropě (17. stol.). Nyní je to park s nádhernými hradbami, větrným mlýnem a krásným výhledem.</p>
    <p><strong>Vstup:</strong> Zcela ZDARMA!</p>
  </section>

  <section id="jidlo">
    <h2>Dánská kuchyně a hygge v Kodani</h2>

    <h3>Smørrebrød – Tradiční dánské sendviče</h3>
    <p>Otevřené sendviče na tmavém žitném chlebě s různými pomazánkami. Jsou to malé umělecké díla.</p>
    <p><strong>Klasické kombinace:</strong></p>
    <ul>
      <li>Losos a krevetky</li>
      <li>Vejce a slanina</li>
      <li>Játra a cibule (leverpostej)</li>
      <li>Uzená ryba (herring)</li>
    </ul>
    <p><strong>Kde koupit:</strong> Torvehallerne, Nyhavn hospůdky, místní pekárny</p>

    <h3>Hygge v kavárně</h3>
    <p>Stejně důležité jako jídlo je prostředí. Dánské kavárny jsou místem pro hygge – sezení s kávou, dánským perníčkem (wienerbrød), svíčkami a přáteli.</p>
  </section>

  <section id="praktické">
    <h2>Praktické informace</h2>

    <h3>Doprava v Kodani</h3>
    <p><strong>Metro (M):</strong> Tři linky (M1, M2, M3) pokrývající město. Moderní a spolehlivé.</p>
    <p><strong>Bus:</strong> Husté sítě autobusů.</p>
    <p><strong>Jízdní kolo:</strong> Nejlepší způsob! Půjčovny na každém rohu. Cena: 20–30 CZK/den.</p>

    <h3>Copenhagen Card – Stojí za to?</h3>
    <p><strong>Cena:</strong> ~200–400 CZK za den (24/48/72 hodin)</p>
    <p><strong>Je to výhodné?</strong> Ano, pokud navštívíte 4+ atrakcí nebo se plánujete hodně pohybovat.</p>

    <h3>Kdy jet do Kodaně</h3>
    <p><strong>Léto (červen–srpen):</strong> Nejlepší počasí, ale davy a vysoké ceny</p>
    <p><strong>Jaro/podzim (květen, září):</strong> Ideální – přijemné počasí, méně turistů</p>
    <p><strong>Zima (prosinec–únor):</strong> Krásná advent atmosféra, ale málo slunce</p>
  </section>

  <section id="itinerare">
    <h2>Itinerář: Jak si naplánovat pobyt</h2>

    <h3>🔴 1 den – Essential Kodaň</h3>
    <p><strong>Ráno:</strong> Malá mořská víla → Nyhavn (oběd)</p>
    <p><strong>Odpoledne:</strong> Amalienborg → Rosenborg zahrady</p>
    <p><strong>Večer:</strong> Tivoli (rozsvícení parku)</p>

    <h3>🟠 2 dny – Kodaň Klasika</h3>
    <p><strong>Den 1:</strong> Nyhavn → Malá mořská víla → Amalienborg → Rosenborg → Tivoli</p>
    <p><strong>Den 2:</strong> Christiansborg → Rundetårn → Nørrebro → Superkilen → Torvehallerne</p>

    <h3>🟡 3 dny – Kompletní Kodaň</h3>
    <p><strong>Den 1:</strong> Nyhavn → Malá mořská víla → Amalienborg → Kastellet → Plavba po kanálech → Tivoli</p>
    <p><strong>Den 2:</strong> Rosenborg → Christiansborg → Rundetårn → Strøget → Design Museum</p>
    <p><strong>Den 3:</strong> Nørrebro → Superkilen → Torvehallerne → Assistens hřbitov → Vesterbro</p>
  </section>

  <p style="text-align: center; padding: 20px; background-color: #f0f8ff; margin: 30px 0; border-radius: 8px;"><strong>📸 Fotky budou doplněny brzy!</strong></p>

  <footer style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #ddd;">
    <p><strong>Autorka:</strong> Pavla – Kodaň miluje pro kombinaci designu, hygge, bezpečnosti a autentické atmosféry. Vrací se sem zase a zase.</p>
  </footer>
</article>',
    v_category_id,
    NULL,  -- image_url - bude doplněno s fotkami
    true,  -- published
    v_author_id,
    'Kodaň: Kompletní průvodce 2025 | Co vidět a tipy | Kastrup.cz',
    'Kompletní průvodce Kodaní: Nyhavn, Tivoli, Amalienborg, Rosenborg, Nørrebro, Superkilen. 2–3 denní itinerář, praktické tipy, jídlo a skrytá místa.',
    'kodaň průvodce',
    NOW(),
    NOW()
  ) RETURNING id INTO v_article_id;

  RAISE NOTICE 'Článek "Kodaň: Kompletní průvodce 2025" byl úspěšně vytvořen!';
  RAISE NOTICE 'ID: %', v_article_id;
  RAISE NOTICE 'Slug: kodan-kompletni-pruvodce-2025';
  RAISE NOTICE 'URL: https://kastrup.cz/clanek/kodan-kompletni-pruvodce-2025';

END $$;
