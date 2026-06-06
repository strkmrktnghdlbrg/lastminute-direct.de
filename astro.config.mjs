import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import rehypeExternalLinks from 'rehype-external-links';

export default defineConfig({
  site: 'https://www.lastminute-direct.de',
  trailingSlash: 'always',
  integrations: [sitemap()],
  markdown: {
    // Externe Links in Artikeln automatisch absichern (rel + target).
    // Interne /magazin/-Links bleiben unberuehrt.
    rehypePlugins: [
      [rehypeExternalLinks, { target: '_blank', rel: ['nofollow', 'noopener'] }],
    ],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
