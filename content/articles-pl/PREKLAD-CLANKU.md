# Translating kastrup.cz articles (database rows) into Polish

Also read `seo/PREKLAD-PRAVIDLA.md` — voice, facts and link rules apply here too
(informal "Ty", no new facts, no invented Polish-specific details, place names in Danish, link table).

## Input
`content/articles-pl/zdroj/<czech-slug>.json` — the published Czech article: title, perex, content (HTML),
meta_title, meta_description, focus_keyword, image_url, og_image.

## Output
`content/articles-pl/<polish-slug>.json`, UTF-8, pretty-printed:
```json
{
  "source_slug": "<czech slug>",
  "slug": "<polish slug from your task>",
  "title": "…H1 in Polish…",
  "perex": "…",
  "meta_title": "… | Kastrup.pl   (45–62 chars, main keyword at the start)",
  "meta_description": "…120–155 chars…",
  "focus_keyword": "…",
  "content": "…full article HTML in Polish…",
  "adaptations": ["every Czech-specific sentence you adapted or removed, and why"]
}
```

## Content HTML
- Translate the WHOLE article; never shorten or summarise. Keep the exact HTML structure and tags
  (headings, lists, tables, figure/figcaption, details/summary, ids and classes).
- Images: keep every `src` exactly; translate `alt` and `<figcaption>` (keep licence/credit text and
  photographer names unchanged, translate only words like "Foto"/"Zdroj" → "Fot."/"Źródło").
- Internal links: map Czech paths with the table in `seo/PREKLAD-PRAVIDLA.md` (absolute
  `https://kastrup.cz/...` links too → `https://kastrup.pl/<polish path>` or relative Polish path).
- External links: keep the URL; add " (EN)" / " (DA)" to the link text only if the visible text names the source language.
- Prices, dates, opening hours, distances: copy exactly as in the source (DKK/EUR, dates "září 2026" → "wrzesień 2026").
  Do not convert currencies. Keep phrases like "ověřeno v září 2026" as "sprawdzone we wrześniu 2026".
- If the article speaks to Czech drivers/travellers (routes from Czechia, Czech prices in CZK, Czech sources),
  drop or neutralise those sentences only; never replace them with invented Polish routes, times or prices.

## Check before finishing
- Validate the JSON (`python3 -m json.tool <file> > /dev/null`).
- Count headings (`<h2`) and `<img` in source and translation — they must match.
- Report: file path, meta_title/description lengths, heading/image counts, the adaptations list.
