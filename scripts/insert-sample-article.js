import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://acgrypwfevndvqcwhcld.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjZ3J5cHdmZXZuZHZxY3doY2xkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExODI3NDQsImV4cCI6MjA3Njc1ODc0NH0.FDZIKb3islCOpg_lyeMOtyEpBT-gVXS0jL1lB3iZN2o';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function insertSampleArticle() {
  try {
    console.log('🔍 Hledám kategorii "Cestování"...');

    // Najít kategorii
    const { data: category, error: categoryError } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', 'cestovani')
      .single();

    if (categoryError || !category) {
      console.error('❌ Chyba: Kategorie "Cestování" nebyla nalezena');
      console.error(categoryError);
      return;
    }

    console.log('✅ Kategorie nalezena:', category.id);
    console.log('🔍 Hledám admin profil...');

    // Najít admin profil
    const { data: admin, error: adminError } = await supabase
      .from('profiles')
      .select('id')
      .eq('role', 'admin')
      .limit(1)
      .single();

    if (adminError || !admin) {
      console.error('❌ Chyba: Žádný admin profil nenalezen');
      console.error('💡 Řešení: Vytvořte admin účet v Supabase Dashboard:');
      console.error('   1. Authentication → Users → Add user');
      console.error('   2. Poté spusťte SQL:');
      console.error("      UPDATE profiles SET role = 'admin' WHERE email = 'vas-email@example.com';");
      return;
    }

    console.log('✅ Admin profil nalezen:', admin.id);
    console.log('📝 Vkládám článek...');

    // Vložit článek
    const { data: article, error: articleError } = await supabase
      .from('articles')
      .insert({
        title: 'Co vidět v Dánsku - Top 10 destinací',
        slug: 'co-videt-v-dansku-top-10-destinaci',
        perex: 'Objevte nejkrásnější místa Dánska! Od barevné Kodaně přes malebné Skagen až po historický Ribe. Kompletní průvodce po nejlepších destinacích, které musíte navštívit.',
        content: `<h2>Úvod do dánských krás</h2>

<p>Dánsko je malá, ale nesmírně rozmanitá země, která nabízí turistům jedinečnou kombinaci moderní architektury, bohaté historie a nádherné přírody. Ať už jste milovníci městského ruchu, historických památek nebo klidných pobřežních městeček, v Dánsku si určitě přijdete na své.</p>

<h2>1. Kodaň - Hlavní město plné života</h2>

<p>Kodaň je bezesporu must-see destinací. Navštivte:</p>

<ul>
<li><strong>Nyhavn</strong> - ikonický kanál s barevnými domy a restauracemi</li>
<li><strong>Malá mořská víla</strong> - nejznámější dánská socha</li>
<li><strong>Tivoli Gardens</strong> - jeden z nejstarších zábavních parků na světě</li>
<li><strong>Christiansborg</strong> - sídlo dánského parlamentu</li>
<li><strong>Freetown Christiania</strong> - alternativní komunita v srdci města</li>
</ul>

<h2>2. Skagen - Místo, kde se moře potkávají</h2>

<p>Skagen, nejsevernější město Dánska, je proslulé svým jedinečným světlem, které přitahovalo umělce už v 19. století. Hlavní atrakcí je Grenen, místo kde se setkává Severní a Baltské moře. Můžete zde doslova stát s jednou nohou v každém moři!</p>

<h2>3. Aarhus - Kulturní metropole</h2>

<p>Druhé největší dánské město nabízí:</p>

<ul>
<li><strong>ARoS</strong> - jedno z největších uměleckých muzeí v severní Evropě</li>
<li><strong>Den Gamle By</strong> - muzeum na otevřeném prostranství s historickými budovami</li>
<li><strong>Латинская čtvrť</strong> - oblast plná kaváren, barů a obchůdků</li>
</ul>

<h2>4. Ribe - Nejstarší město Dánska</h2>

<p>Ribe, založené ve 8. století, je jako živé muzeum. Procházka dlážděnými uličkami mezi domy s doškovými střechami vás přenese zpět v čase. Nezapomeňte navštívit katedrálu Ribe a vyšlápnout si na její věž pro úchvatný výhled.</p>

<h2>5. Bornholm - Slunečný ostrov</h2>

<p>Ostrov Bornholm v Baltském moři je ideální pro ty, kdo hledají kombinaci pláží, skal a přírody. Známý je také svou keramikou a tradičním udírným lososem.</p>

<h2>6. Roskilde - Město vikingů</h2>

<p>Historické město Roskilde je domovem:</p>

<ul>
<li><strong>Muzeum vikingských lodí</strong> - s autentickými vikingovými plavidly</li>
<li><strong>Katedrála v Roskilde</strong> - UNESCO památka a pohřebiště dánských králů</li>
<li><strong>Roskilde Festival</strong> - jeden z největších hudebních festivalů v Evropě</li>
</ul>

<h2>7. Kronborg - Hamletův hrad</h2>

<p>Renesanční hrad Kronborg v Helsingøru je známý jako místo děje Shakespearova Hamleta. UNESCO památka nabízí fascinující pohled do dánské královské historie.</p>

<h2>8. Legoland - Zábava pro celou rodinu</h2>

<p>V Billundu najdete původní Legoland, zábavní park postavený z miliónů kostek LEGO. Ideální výlet pro rodiny s dětmi!</p>

<h2>9. Møns Klint - Bílé útesy</h2>

<p>Tyto dramatické křídové útesy dosahují výšky až 128 metrů a jsou jedním z nejkrásnějších přírodních divů Dánska. Výhled z vrcholu na tyrkysové moře je nezapomenutelný.</p>

<h2>10. Odense - Město H.C. Andersena</h2>

<p>Rodné město slavného pohádkáře nabízí:</p>

<ul>
<li><strong>H.C. Andersen Museum</strong> - věnované životu a dílu spisovatele</li>
<li><strong>Fünen Village</strong> - muzeum na otevřeném prostranství</li>
<li><strong>Egeskov Castle</strong> - nejlépe zachovalý vodní hrad v Evropě</li>
</ul>

<h2>Praktické tipy pro cestování</h2>

<p><strong>Nejlepší doba návštěvy:</strong> Květen až září, kdy je nejpříjemnější počasí a nejdelší dny.</p>

<p><strong>Doprava:</strong> Dánsko má vynikající vlakové spojení. Copenhagen Card nabízí neomezené cestování a vstupy do mnoha atrakcí.</p>

<p><strong>Cykloturistika:</strong> Dánsko je ráj pro cyklisty s tisíci kilometrů značených cyklostezek.</p>

<p><strong>Jazyk:</strong> Většina Dánů výborně mluví anglicky, takže se domluvíte bez problémů.</p>

<h2>Závěr</h2>

<p>Dánsko je destinace, která překvapí svou rozmanitostí. Ať už vás láká historie vikingů, moderní design, nádherná příroda nebo proslulé dánské hygge, v této skandinávské zemi najdete vše. Každé z těchto deseti míst nabízí unikátní zážitek a společně tvoří nezapomenutelný obraz této kouzelné země.</p>

<p>Nezapomeňte si užít místní speciality jako smørrebrød, flæskesteg nebo tradiční dánské pečivo. A hlavně - užijte si atmosféru hygge, tu dánskou pohodu a útulnost, která dělá z Dánska jednu z nejšťastnějších zemí světa!</p>`,
        category_id: category.id,
        image_url: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=1200&h=630&fit=crop',
        published: true,
        author_id: admin.id,
        meta_title: 'Co vidět v Dánsku - Top 10 nejkrásnějších destinací | Kastrup.cz',
        meta_description: 'Objevte 10 nejlepších míst v Dánsku! Kodaň, Skagen, Aarhus, Ribe a další nádherné destinace. Praktický průvodce s tipy pro vaši cestu.',
        focus_keyword: 'co vidět v Dánsku'
      })
      .select()
      .single();

    if (articleError) {
      console.error('❌ Chyba při vkládání článku:', articleError);
      return;
    }

    console.log('✅ Článek úspěšně vytvořen!');
    console.log('📊 ID článku:', article.id);
    console.log('🔗 Slug:', article.slug);
    console.log('📝 Titulek:', article.title);
    console.log('\n🎉 Hotovo! Článek je nyní dostupný na: /clanek/co-videt-v-dansku-top-10-destinaci');

  } catch (error) {
    console.error('❌ Neočekávaná chyba:', error);
  }
}

insertSampleArticle();
