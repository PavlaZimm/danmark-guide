// Prepares article tables for the phone layout: tables with 3+ columns get the class "mtab" and
// every body cell gets data-label = text of its column header. The CSS in src/index.css turns such
// tables into cards below 640 px. Tables with colspan/rowspan, without a header row, with fewer
// than 3 columns or already labelled are left alone.
const stripTags = (html) =>
  html
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const escapeAttr = (text) => text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

// Not /<th/ alone: that would also match <thead>
const HEAD_CELL = /<th(?:\s[^>]*)?>([\s\S]*?)<\/th>/gi;
const ROW = /<tr(?:\s[^>]*)?>([\s\S]*?)<\/tr>/gi;
const BODY_CELL = /<td((?:\s[^>]*)?)>([\s\S]*?)<\/td>/gi;

export function withTableLabels(html = '') {
  return String(html).replace(/<table((?:\s[^>]*)?)>([\s\S]*?)<\/table>/gi, (whole, tableAttrs, inner) => {
    if (/<table\b/i.test(inner) || /\b(colspan|rowspan|data-label)\s*=/i.test(inner)) return whole;
    if (/\bclass\s*=\s*"[^"]*\b(mtab|no-mtab)\b/i.test(tableAttrs)) return whole;

    const thead = inner.match(/<thead(?:\s[^>]*)?>([\s\S]*?)<\/thead>/i);
    if (!thead) return whole;
    const labels = [...thead[1].matchAll(HEAD_CELL)].map((m) => stripTags(m[1]));
    if (labels.length < 3) return whole;

    const tbodyStart = inner.search(/<tbody(?:\s[^>]*)?>/i);
    if (tbodyStart < 0) return whole;
    const head = inner.slice(0, tbodyStart);
    const body = inner.slice(tbodyStart).replace(ROW, (row, cells) => {
      let index = 0;
      const labelled = cells.replace(BODY_CELL, (cell, attrs, content) => {
        const label = labels[index++];
        return label ? `<td${attrs} data-label="${escapeAttr(label)}">${content}</td>` : cell;
      });
      return row.replace(cells, () => labelled);
    });

    const classMatch = tableAttrs.match(/\bclass\s*=\s*"([^"]*)"/i);
    const attrs = classMatch
      ? tableAttrs.replace(classMatch[0], `class="${classMatch[1]} mtab"`)
      : `${tableAttrs} class="mtab"`;
    return `<table${attrs}>${head}${body}</table>`;
  });
}
