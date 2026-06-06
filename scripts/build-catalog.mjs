// Baut einen schlanken Artikel-Katalog (Slug, Titel, Description, Cluster, Tags, heroTheme)
// als JSON fuer den Content-Pass-Workflow. Liest die Frontmatter aller Artikel.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const dir = 'src/content/artikel';
const files = readdirSync(dir).filter((f) => f.endsWith('.md'));

const oneLine = (fm, key) => {
  const m = fm.match(new RegExp(`^${key}:\\s*"?(.*?)"?\\s*$`, 'm'));
  return m ? m[1] : '';
};
const arr = (fm, key) => {
  const m = fm.match(new RegExp(`^${key}:\\s*\\[(.*?)\\]\\s*$`, 'm'));
  if (!m) return [];
  return m[1]
    .split(',')
    .map((s) => s.trim().replace(/^["']|["']$/g, ''))
    .filter(Boolean);
};

const catalog = files.map((f) => {
  const slug = f.replace(/\.md$/, '');
  const raw = readFileSync(join(dir, f), 'utf8');
  const fm = raw.split('---')[1] || '';
  return {
    slug,
    title: oneLine(fm, 'title'),
    description: oneLine(fm, 'description'),
    clusters: arr(fm, 'clusters'),
    tags: arr(fm, 'tags'),
    heroTheme: oneLine(fm, 'heroTheme'),
  };
});

writeFileSync('scripts/article-catalog.json', JSON.stringify(catalog, null, 2));
console.log(`Catalog: ${catalog.length} Artikel -> scripts/article-catalog.json`);
