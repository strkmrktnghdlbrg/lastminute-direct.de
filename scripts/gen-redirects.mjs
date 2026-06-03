// Generates public/_redirects (Cloudflare/Netlify) and public/.htaccess (Apache)
// from the legacy WP URL structure. Articles -> /magazin/<slug>/, archives -> cluster hubs.
import { writeFileSync, mkdirSync } from 'node:fs';

const PATHS = [
  'stadtreisen/nachhaltige-staedtereisen','stadtreisen/budgetfreundliche-staedtereisen','reiseziele/strandcamping',
  'reiseziele/strandurlaub-und-yoga','reiseziele/straende-in-karibik','reiseziele/strandrestaurants','reiseziele/strandmode',
  'reiseziele/strandurlaub-in-asien','reiseziele/luxus-strandresorts','reiseziele/besten-inseln','abenteurer/straende-fuer-wassersport',
  'reiseziele/strandhopping','abenteurer/beachvolleyball','reiseziele/straende-nordamerikas','reiseziele/last-minute-strandurlaube',
  'reiseziele/strandurlaub-wellness','reiseziele/strandhochzeiten','reiseziele/straende-fuer-schnorchler','tipps-und-tricks/strandsicherheit',
  'reiseziele/strandurlaube-nebensaison','familie/strandurlaub-senioren','reiseziele/romantische-strandurlaube','reiseziele/nachhaltige-strandurlaube',
  'familie/hundestraende','abenteurer/aktivurlaub-am-strand','reiseziele/straende-europas','tipps-und-tricks/guenstige-strandurlaube',
  'reiseziele/unentdeckte-straende','familie/strandurlaub-der-familie','stadtreisen/musik-und-konzerte','stadtreisen/entspannende-rueckzugsorte',
  'stadtreisen/kunstfestivals-in-staedtereisen','stadtreisen/sicherheitstipps','stadtreisen/kulinarische-entdeckungen','stadtreisen/drehorte-in-staedten',
  'stadtreisen/dynamischsten-staedte','stadtreisen/besten-europaeischen-staedte','stadtreisen/shopping-guide','stadtreisen/historische-staedte',
  'stadtreisen/packliste-staedtereisen','stadtreisen/oeffentlicher-verkehr','stadtreisen/luxurioese-staedtereisen','stadtreisen/solo-staedtereisen',
  'stadtreisen/street-art-staedtereisen','stadtreisen/guenstige-flugtipps','stadtreisen/architektonische-wunder','stadtreisen/kultur-pur',
  'stadtreisen/besten-jahreszeiten-staedtereisen','stadtreisen/geheimtipps-staedtereisen','stadtreisen/staedtereisen-per-fahrrad',
  'stadtreisen/staedtereisen-mit-kindern','stadtreisen/staedtereisen-fuer-senioren','stadtreisen/staedtereisen-yoga-kombination',
  'stadtreisen/virtuelle-staedtereisen','stadtreisen/innovative-unterkuenfte','stadtreisen/nachtleben-entertainment','stadtreisen/wochenend-staedtereisen',
  'tipps-und-tricks/last-minute-schnaeppchen','reisetipps-fuer-anfaenger/last-minute-schnaeppchenpreis','reisetipps-fuer-anfaenger/lohnt-sich-last-minute',
  'reiseziele/urlaubsziele-familie','reiseziele/strandurlaube-alleinreisende','reiseziele/strandurlaub-wohnmobil','reiseziele/all-inclusive-strandresorts',
];

// Zusätzliche Legacy-Redirects (per Semrush-Ranking + Live-Check 2026-06 gefunden):
// - abenteurer-Dublette desselben Artikels
// - alte root-level Permalinks (WP leitete intern bereits weiter; hier direkt aufs Ziel)
const EXTRA = {
  '/abenteurer/lohnt-sich-last-minute/': '/magazin/lohnt-sich-last-minute/',
  '/lohnt-sich-last-minute-urlaub/': '/magazin/lohnt-sich-last-minute/',
  '/staedtereisen-mit-kindern-eine-familienanleitung/': '/magazin/staedtereisen-mit-kindern/',
  '/solo-staedtereisen-ein-leitfaden/': '/magazin/solo-staedtereisen/',
};

// Archive (category root) -> new cluster hub. /reiseziele/ stays (reused as cluster hub).
const ARCHIVES = {
  '/stadtreisen/': '/staedtereisen/',
  '/abenteurer/': '/reisearten/',
  '/familie/': '/reisearten/',
  '/feinschmecker/': '/reisearten/',
  '/tipps-und-tricks/': '/ratgeber/',
  '/reisetipps-fuer-anfaenger/': '/ratgeber/',
};

const seen = {};
const articles = PATHS.map((p) => {
  let slug = p.split('/')[1];
  if (seen[slug]) slug = `${slug}-${p.split('/')[0].split('-')[0]}`;
  seen[slug] = true;
  return { from: `/${p}/`, to: `/magazin/${slug}/` };
});

mkdirSync(new URL('../public', import.meta.url), { recursive: true });

// ---- _redirects (Cloudflare Pages / Netlify) ----
let r = '# Auto-generated. Legacy WP URLs -> new Astro structure. 301 permanent.\n';
r += '# --- Article archives -> cluster hubs ---\n';
for (const [from, to] of Object.entries(ARCHIVES)) r += `${from} ${to} 301\n`;
r += '# --- Articles -> /magazin/<slug>/ ---\n';
for (const a of articles) r += `${a.from} ${a.to} 301\n`;
r += '# --- Legacy-Permalinks & Dubletten ---\n';
for (const [from, to] of Object.entries(EXTRA)) r += `${from} ${to} 301\n`;
writeFileSync(new URL('../public/_redirects', import.meta.url), r);

// ---- .htaccess (Apache / All-Inkl, Hostinger) ----
let h = '# Auto-generated 301 redirects: legacy WP URLs -> new Astro structure\n';
h += '<IfModule mod_rewrite.c>\n  RewriteEngine On\n\n';
h += '  # Article archives -> cluster hubs\n';
for (const [from, to] of Object.entries(ARCHIVES)) {
  const f = from.replace(/^\//, '').replace(/\/$/, '');
  h += `  RewriteRule ^${f}/?$ ${to} [R=301,L]\n`;
}
h += '\n  # Articles -> /magazin/<slug>/\n';
for (const a of articles) {
  const f = a.from.replace(/^\//, '').replace(/\/$/, '');
  h += `  RewriteRule ^${f}/?$ ${a.to} [R=301,L]\n`;
}
h += '\n  # Legacy-Permalinks & Dubletten\n';
for (const [from, to] of Object.entries(EXTRA)) {
  const f = from.replace(/^\//, '').replace(/\/$/, '');
  h += `  RewriteRule ^${f}/?$ ${to} [R=301,L]\n`;
}
h += '</IfModule>\n';
writeFileSync(new URL('../public/.htaccess', import.meta.url), h);

console.log(`Wrote ${articles.length} article redirects + ${Object.keys(ARCHIVES).length} archive redirects to public/_redirects and public/.htaccess`);
