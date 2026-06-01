import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Cluster taxonomy (navigation layer, decoupled from URL):
 *   deals · reiseziele · reisearten · staedtereisen · ratgeber
 *
 * heroTheme drives the curated Unsplash image pool (see src/data/images.ts):
 *   strand · stadt · insel · fernreise · familie · abenteuer · genuss · ratgeber
 */
const artikel = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/artikel' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    legacyUrl: z.string(),
    legacyCategory: z.string(),
    clusters: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    heroTheme: z.string().default('strand'),
    publishDate: z.coerce.date().default(new Date('2024-06-01')),
    readingTime: z.number().default(6),
    featured: z.boolean().default(false),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  }),
});

export const collections = { artikel };
