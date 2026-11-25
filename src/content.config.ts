import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    // Jekyll-era dates look like "2026-11-19 19:00:00 +0000".
    date: z.preprocess(
      (v) => (typeof v === 'string' ? v.replace(' ', 'T').replace(/ ?\+0000$/, 'Z') : v),
      z.coerce.date(),
    ),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    lang: z.enum(['en', 'fr']).default('en'),
    ctf: z.string().optional(),
    category_label: z.string().optional(),
    difficulty: z.enum(['easy', 'medium', 'hard', 'insane', 'unknown']).optional(),
    points: z.number().optional(),
    flag_format: z.string().optional(),
    solves: z.number().nullish(),
    author: z.string().optional(),
    toc: z.boolean().default(true),
    pin: z.boolean().default(false),
  }),
});

export const collections = { posts };
