import { defineHastPlugin } from 'satteri';
import type { Element, ElementContent } from 'hast';

/**
 * Turns GitHub-style alerts into callouts:
 *
 *   > [!WARNING]
 *   > Text
 *
 * becomes <div class="callout callout-warning"><p class="callout-title">Warning</p>…</div>.
 */
const TITLES: Record<'en' | 'fr', Record<string, string>> = {
  en: { note: 'Note', tip: 'Tip', important: 'Important', warning: 'Warning', caution: 'Caution' },
  fr: { note: 'Note', tip: 'Astuce', important: 'Important', warning: 'Attention', caution: 'Prudence' },
};
const MARKER = /^\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*/i;
/** Posts never mix languages, so the callout title follows the post's `lang`. */
function langOf(data: unknown): 'en' | 'fr' {
  const fm = (data as { astro?: { frontmatter?: { lang?: string } } }).astro?.frontmatter;
  return fm?.lang === 'fr' ? 'fr' : 'en';
}

export const hastCallouts = defineHastPlugin({
  name: 'hast-callouts',
  element: {
    filter: ['blockquote'],
    visit(node, ctx) {
      const children = (node.children ?? []) as ElementContent[];
      const firstIdx = children.findIndex((c) => c.type === 'element');
      const first = children[firstIdx] as Element | undefined;
      if (!first || first.tagName !== 'p') return;
      const text = first.children[0];
      if (!text || text.type !== 'text') return;
      const m = text.value.match(MARKER);
      if (!m) return;

      const kind = m[1].toLowerCase();
      const rest = text.value.slice(m[0].length);
      const para: Element = {
        ...first,
        children: [...(rest ? [{ ...text, value: rest }] : []), ...first.children.slice(1)],
      };
      const body = [...children.slice(0, firstIdx), para, ...children.slice(firstIdx + 1)];

      return {
        type: 'element',
        tagName: 'div',
        properties: { className: ['callout', `callout-${kind}`] },
        children: [
          {
            type: 'element',
            tagName: 'p',
            properties: { className: ['callout-title'] },
            children: [{ type: 'text', value: TITLES[langOf(ctx.data)][kind] }],
          },
          ...body,
        ],
      } satisfies Element;
    },
  },
});
