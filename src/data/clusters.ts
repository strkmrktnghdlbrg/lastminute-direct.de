/**
 * The 5 content clusters. Each is a hub page that aggregates articles
 * carrying its key in frontmatter `clusters`. Legacy WP categories are
 * mapped into these clusters during migration.
 */
export interface Cluster {
  key: string;
  slug: string;
  title: string;
  short: string;
  intro: string;
  heroTheme: string;
  legacyCategories: string[];
}

export const CLUSTERS: Cluster[] = [
  {
    key: 'deals',
    slug: 'deals',
    title: 'Last-Minute Deals',
    short: 'Spontane Schnäppchen für diese und nächste Woche.',
    intro:
      'Die besten kurzfristigen Reiseangebote für Strand, Stadt und Sonne. Hier sammeln wir Tipps und Ratgeber rund ums günstige, spontane Buchen.',
    heroTheme: 'strand',
    legacyCategories: [],
  },
  {
    key: 'reiseziele',
    slug: 'reiseziele',
    title: 'Reiseziele',
    short: 'Strand, Inseln, Städte und Fernreisen im Überblick.',
    intro:
      'Von der Karibik bis Kreta, von Barcelona bis Bangkok. Finde dein nächstes Reiseziel nach Region und Typ, mit ehrlichen Tipps und Inspiration.',
    heroTheme: 'insel',
    legacyCategories: ['reiseziele'],
  },
  {
    key: 'reisearten',
    slug: 'reisearten',
    title: 'Reisearten',
    short: 'Die passende Reise für jede Konstellation.',
    intro:
      'Ob mit Familie, allein oder zu zweit, ob aktiv oder genussvoll. Hier findest du Reisen, die zu deinem Reisestil passen.',
    heroTheme: 'familie',
    legacyCategories: ['familie', 'abenteurer', 'feinschmecker'],
  },
  {
    key: 'staedtereisen',
    slug: 'staedtereisen',
    title: 'Städtereisen',
    short: 'Kultur, Shopping und Nachtleben in Europas Metropolen.',
    intro:
      'Kurztrips in die spannendsten Städte. Geheimtipps, Packlisten, Verkehrsmittel und die besten Jahreszeiten für deine nächste Städtereise.',
    heroTheme: 'stadt',
    legacyCategories: ['stadtreisen'],
  },
  {
    key: 'ratgeber',
    slug: 'ratgeber',
    title: 'Reise-Ratgeber',
    short: 'Buchungstipps, Packlisten und Sicherheit.',
    intro:
      'Cleverer reisen: Last-Minute-Strategien, Sparen bei Flug und Hotel, Packlisten und Sicherheit. Alles für deine spontane Reise.',
    heroTheme: 'ratgeber',
    legacyCategories: ['tipps-und-tricks', 'reisetipps-fuer-anfaenger'],
  },
];

export const clusterByKey = (key: string) => CLUSTERS.find((c) => c.key === key);

/**
 * Primary cluster for display (breadcrumb, card label). `deals` is a
 * cross-cutting promotional tag, so we prefer a topical cluster over it.
 */
export function primaryCluster(keys: string[]): Cluster | undefined {
  const topical = CLUSTERS.filter((c) => c.key !== 'deals');
  return topical.find((c) => keys.includes(c.key)) ?? clusterByKey('deals');
}
