import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts, postUrl, summaryOf, SITE } from '../lib/posts';

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site!,
    trailingSlash: true,
    items: posts.map((p) => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: summaryOf(p),
      link: postUrl(p),
      categories: [...p.data.categories, ...p.data.tags],
    })),
  });
}
