// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import { hastCallouts } from './src/lib/hast-callouts.ts';

export default defineConfig({
  site: 'https://alwil17.github.io',
  base: '/ctf-writeups',
  trailingSlash: 'always',
  integrations: [sitemap()],
  markdown: {
    processor: satteri({ hastPlugins: [hastCallouts] }),
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: false,
      wrap: false,
    },
  },
});
