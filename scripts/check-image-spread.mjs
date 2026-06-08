import { readFileSync } from 'node:fs';
const c = JSON.parse(readFileSync('scripts/article-catalog.json', 'utf8'));
const src = readFileSync('src/data/images.ts', 'utf8');
const pools = {};
for (const m of src.matchAll(/(\w+):\s*\[([\s\S]*?)\],\n/g)) {
  pools[m[1]] = [...m[2].matchAll(/id: '([^']+)'/g)].map((x) => x[1]);
}
function pick(theme, seed) {
  const p = pools[theme] || pools.strand;
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return p[h % p.length];
}
const byTheme = {};
for (const a of c) (byTheme[a.heroTheme] = byTheme[a.heroTheme] || []).push(pick(a.heroTheme, a.slug));
for (const t of Object.keys(byTheme)) {
  const imgs = byTheme[t];
  const uniq = [...new Set(imgs)];
  const maxRepeat = Math.max(...uniq.map((u) => imgs.filter((x) => x === u).length));
  console.log(`${t}: ${imgs.length} Artikel -> ${uniq.size} verschiedene Bilder (Pool ${pools[t] ? pools[t].length : 'fallback'}), max. ${maxRepeat}x dasselbe`);
}
