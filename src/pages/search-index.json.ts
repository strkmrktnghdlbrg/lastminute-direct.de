import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { primaryCluster } from '../data/clusters';

export const GET: APIRoute = async () => {
  const articles = await getCollection('artikel');
  const index = articles.map((a) => ({
    slug: a.id,
    title: a.data.title,
    description: a.data.description,
    cluster: primaryCluster(a.data.clusters)?.title ?? 'Magazin',
    tags: a.data.tags,
    url: `/magazin/${a.id}/`,
  }));
  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json' },
  });
};
