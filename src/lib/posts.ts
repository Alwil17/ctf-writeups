import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

export const SITE = {
  title: 'FireSkull',
  description:
    'CTF writeups by FireSkull: reproducible solves from reconnaissance to root, with the root cause and the fix for every bug.',
  author: 'FireSkull',
  github: 'https://github.com/alwil17',
  portfolio: 'https://alwil17.github.io/Alwil17',
  avatar: 'https://github.com/alwil17.png?size=96',
};

export const DIFFICULTIES = ['easy', 'medium', 'hard', 'insane', 'unknown'] as const;

/** Join a path onto the configured base (`/ctf-writeups`). */
export function url(path = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
}

export function slugOf(post: Post): string {
  return post.id.replace(/^\d{4}-\d{2}-\d{2}-/, '');
}

export function postUrl(post: Post): string {
  return url(`/posts/${slugOf(post)}/`);
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function eventOf(post: Post): string {
  return post.data.ctf ?? post.data.categories[0] ?? 'Other';
}

export function categoryOf(post: Post): string {
  return post.data.categories[1] ?? post.data.category_label ?? 'Misc';
}

/** Strip the inline Markdown we use in TL;DRs down to plain text. */
function plain(md: string): string {
  return md
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

/** The TL;DR blockquote, or the first paragraph when a post has none. */
export function summaryOf(post: Post): string {
  const body = post.body ?? '';
  const lines = body.split('\n');
  const start = lines.findIndex((l) => /^>\s*\*\*TL;DR\*\*/.test(l));
  if (start !== -1) {
    const quote: string[] = [];
    for (let i = start; i < lines.length && lines[i].startsWith('>'); i++) {
      quote.push(lines[i].replace(/^>\s?/, ''));
    }
    return plain(quote.join(' ').replace(/^\*\*TL;DR\*\*\s*[—–:-]\s*/, ''));
  }
  const para = body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .find((p) => p && !p.startsWith('#') && !p.startsWith('>') && !p.startsWith('```') && !p.startsWith('|'));
  return plain(para ?? '');
}

export function readingMinutes(post: Post): number {
  const words = (post.body ?? '').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function formatDate(d: Date, lang: string = 'en'): string {
  return d.toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/** All posts, newest first. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('posts');
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** Writeups only (excludes pinned meta posts such as the style guide). */
export async function getWriteups(): Promise<Post[]> {
  return (await getPosts()).filter((p) => !p.data.pin);
}

export function countBy<T>(items: T[], key: (t: T) => string | string[]): Map<string, number> {
  const m = new Map<string, number>();
  for (const it of items) {
    const ks = key(it);
    for (const k of Array.isArray(ks) ? ks : [ks]) m.set(k, (m.get(k) ?? 0) + 1);
  }
  return m;
}
