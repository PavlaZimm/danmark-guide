# Rules for translating kastrup.cz pages into Polish (kastrup.pl)

Reference implementation: `src/pages/pl/Copenhagen.tsx` (translated from `src/pages/Copenhagen.tsx`). Follow it.

## Output
- Create `src/pages/pl/<SameName>.tsx`, a Polish copy of the Czech component `src/pages/<SameName>.tsx`.
  Keep the same structure, components, classes, images, maps and icons. Only texts, links and metadata change.
- Do not edit any other file.

## Language and voice
- Natural, idiomatic Polish as a Polish travel writer would write it. Informal second person singular
  ("zobaczysz", "sprawdź", "Twój") — same as the reference page. Correct Polish diacritics and declension
  (w Kopenhadze, do Kopenhagi, w Danii, na Bornholmie…).
- No AI clichés ("odkryj magię", "niezapomniane wrażenia", "w dzisiejszym artykule", "podsumowując").
  Keep the plain, practical tone of the Czech original.
- Proper names of places stay in Danish (Nyhavn, Rosenborg, Møn, Sjælland…). Use the established Polish
  exonym only where one is common: Kopenhaga, Dania, Szwecja, Mała Syrenka, Jutlandia, Zelandia, Fionia,
  Bornholm, Sund (Øresund may stay as Øresund).

## Facts — the most important rule
- Translate facts exactly. Never add a new fact, number, price, opening hour, distance or claim that is not in
  the Czech source. Never "localise" by inventing Polish-specific details (ferry times, PLN prices, routes from Poland).
- If a sentence only makes sense for Czech readers (e.g. Czech pronunciation transcriptions, driving from Czechia,
  Czech-language resources), adapt it to Polish readers ONLY when the adapted statement is obviously true
  (e.g. "Polish transcriptions are only approximate"). Otherwise drop the sentence. List every such adaptation
  or removal in your final report.
- Keep source links (external URLs) as they are; if the link label says the source is English, add " (EN)".

## Links (Czech path → Polish path)
| Czech | Polish |
|---|---|
| / | / |
| /clanky, /cestovani | /artykuly (label "Przewodniki" / "Artykuły") |
| /o-dansku | /co-zobaczyc-w-danii |
| /ubytovani | /noclegi |
| /kultura | /kultura-dunska |
| /hygge | /hygge |
| /kodan | /kopenhaga |
| /danstina | /jezyk-dunski |
| /danske-ostrovy | /wyspy-dunskie |
| /kontakt | /kontakt |
| /autorka | /o-autorce |
| /ochrana-soukromi | /polityka-prywatnosci |
| /clanek/dansky-design | /artykul/dunski-design-kopenhaga |
| /clanek/ribe | /artykul/ribe |
| /clanek/mons-klint | /artykul/mons-klint |
| /clanek/mosty-v-dansku | /artykul/mosty-w-danii |
| /clanek/letiste-kodan-kastrup-doprava-do-centra | /artykul/lotnisko-kopenhaga-dojazd-do-centrum |
| /clanek/kastrup-kodansky-poklad-moderni-architektury-more-a-volnosti | /artykul/kastrup |

## Metadata
- Absolute URLs `https://kastrup.cz/<czech path>` → `https://kastrup.pl/<polish path>`; absolute image URLs
  `https://kastrup.cz/images/...` → `https://kastrup.pl/images/...`. Relative `/images/...` stay unchanged.
- `og:locale` → `pl_PL`, `og:site_name` / publisher name → `Kastrup.pl`, schema `inLanguage` → `pl-PL`,
  author url → `https://kastrup.pl/o-autorce`, "| Kastrup.cz" in titles → "| Kastrup.pl".
- Breadcrumbs: home label is handled by the component; a "Cestování" crumb becomes `{ label: "Przewodniki", href: "/artykuly" }`.
  Breadcrumb schema: position 1 name "Start" item "https://kastrup.pl/".
- Dates in Polish ("13 września 2026"), "X minut czytania", "Autorka:".
- `<title>` 45–62 characters, meta description 120–155 characters, use the target keywords given in your task
  naturally (Polish search phrases, declension allowed). H1 contains the main keyword.

## Final report (return this, it is used to build the no-JavaScript HTML for crawlers)
1. File created.
2. For `seo/pl-routes.js`: `title`, `description`, `heading` (= H1) exactly as used in the component, and a short
   `fallbackHtml` snippet in Polish (an `<article style="margin-top: 2rem; max-width: 800px;">` with the key
   answer paragraph and 2–4 H2 sections summarised in 1–2 sentences each, plus 2–4 internal links using the
   Polish paths) — same idea as the Czech `fallbackHtml` of that page in `vite-plugin-routes-html.js`.
   If the Czech page route there has `type: 'article'` with an `article` object, give the Polish article object too.
3. List of adaptations/removals of Czech-specific sentences.
