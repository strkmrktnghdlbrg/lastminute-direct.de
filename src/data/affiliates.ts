import { AWIN, isAwinReady } from './site';

/**
 * AWIN Affiliate-Registry + Deeplink-Helper.
 *
 * EINRICHTUNG (in 2 Schritten, sobald angenommen):
 *   1. AWIN-Publisher-ID in src/data/site.ts -> AWIN.affid eintragen.
 *   2. Pro freigeschaltetem Programm unten die `mid` füllen (Referenz-ID steht
 *      jeweils im Kommentar). Nicht freigeschaltete Merchants einfach leer lassen.
 *
 * Verhalten:
 *   - Ein Merchant ist "aktiv", wenn AWIN.affid gesetzt UND merchant.mid gesetzt ist.
 *   - affiliateLink() liefert für aktive Merchants den AWIN-Deeplink, sonst die
 *     direkte Fallback-URL (ohne Provision). Buttons funktionieren also immer.
 *   - Die Auto-Selektoren (forCluster / forTheme) liefern NUR aktive Merchants,
 *     damit vor dem Setup keine unprovisionierten CTAs erscheinen.
 */

export type AffiliateCategory =
  | 'pauschal' // Last-Minute / Pauschalreisen
  | 'hotel'
  | 'mietwagen'
  | 'versicherung'
  | 'aktivitaeten'
  | 'ferienhaus'
  | 'camping';

export interface Merchant {
  key: string;
  name: string;
  mid: string; // AWIN Merchant-ID, leer = noch nicht freigeschaltet
  category: AffiliateCategory;
  fallbackUrl: string; // Direkt-Link bis zur Freischaltung (Fallback-URLs vor Aktivierung kurz prüfen)
  cta: string; // Button-Text
  clusters: string[]; // passende Content-Cluster
  themes: string[]; // passende heroThemes ('*' = überall)
}

export const MERCHANTS: Merchant[] = [
  // --- Tier 1: Pauschal / Last-Minute (Kern-Fit) ---
  { key: 'ltur', name: "l'tur", mid: '' /* AWIN 9139 */, category: 'pauschal',
    fallbackUrl: 'https://www.ltur.com/', cta: 'Last-Minute-Deals bei l’tur',
    clusters: ['deals', 'reiseziele', 'staedtereisen'], themes: ['*'] },
  { key: 'ab-in-den-urlaub', name: 'ab-in-den-urlaub.de', mid: '' /* AWIN 9369 */, category: 'pauschal',
    fallbackUrl: 'https://www.ab-in-den-urlaub.de/', cta: 'Pauschalreisen vergleichen',
    clusters: ['deals', 'reiseziele', 'reisearten'], themes: ['*'] },
  { key: 'travelscout24', name: 'TravelScout24', mid: '' /* AWIN 9130 */, category: 'pauschal',
    fallbackUrl: 'https://www.travelscout24.de/', cta: 'Angebote bei TravelScout24',
    clusters: ['deals', 'reiseziele'], themes: ['strand', 'insel', 'fernreise', 'familie'] },
  { key: 'lidl-reisen', name: 'Lidl Reisen', mid: '' /* AWIN 11773 */, category: 'pauschal',
    fallbackUrl: 'https://www.lidl-reisen.de/', cta: 'Lidl Reisen Angebote',
    clusters: ['deals', 'reisearten'], themes: ['strand', 'insel', 'familie'] },
  { key: 'urlaubsguru', name: 'Urlaubsguru', mid: '' /* AWIN 99653 */, category: 'pauschal',
    fallbackUrl: 'https://www.urlaubsguru.de/', cta: 'Schnäppchen bei Urlaubsguru',
    clusters: ['deals'], themes: ['*'] },
  { key: 'lastminute-de', name: 'lastminute.de', mid: '' /* AWIN: Merchant-Profil */, category: 'pauschal',
    fallbackUrl: 'https://www.lastminute.de/', cta: 'Bei lastminute.de buchen',
    clusters: ['deals', 'staedtereisen', 'reiseziele'], themes: ['*'] },

  // --- Tier 2: Querschnitt (Mietwagen / Versicherung) ---
  { key: 'sunny-cars', name: 'Sunny Cars', mid: '' /* AWIN 13830 */, category: 'mietwagen',
    fallbackUrl: 'https://www.sunnycars.de/', cta: 'Mietwagen bei Sunny Cars',
    clusters: ['reiseziele', 'reisearten', 'ratgeber'], themes: ['*'] },
  { key: 'billiger-mietwagen', name: 'billiger-mietwagen.de', mid: '' /* AWIN (CHECK24) */, category: 'mietwagen',
    fallbackUrl: 'https://www.billiger-mietwagen.de/', cta: 'Mietwagen vergleichen',
    clusters: ['reiseziele', 'ratgeber'], themes: ['*'] },
  { key: 'mietwagencheck', name: 'MietwagenCheck', mid: '' /* AWIN 14051 */, category: 'mietwagen',
    fallbackUrl: 'https://www.mietwagencheck.de/', cta: 'Mietwagen-Vergleich',
    clusters: ['reiseziele', 'ratgeber'], themes: ['*'] },
  { key: 'sixt', name: 'Sixt', mid: '' /* AWIN 14761 */, category: 'mietwagen',
    fallbackUrl: 'https://www.sixt.de/', cta: 'Mietwagen bei Sixt',
    clusters: ['reiseziele', 'ratgeber'], themes: ['*'] },
  { key: 'hansemerkur', name: 'HanseMerkur Reiseversicherung', mid: '' /* AWIN 11705 */, category: 'versicherung',
    fallbackUrl: 'https://www.hansemerkur.de/reiseversicherung', cta: 'Reiseversicherung sichern',
    clusters: ['ratgeber', 'deals'], themes: ['*'] },
  { key: 'travelsecure', name: 'TravelSecure', mid: '' /* AWIN: eigenes Profil */, category: 'versicherung',
    fallbackUrl: 'https://www.travelsecure.de/', cta: 'Reiseschutz bei TravelSecure',
    clusters: ['ratgeber'], themes: ['*'] },

  // --- Tier 3: Themen-spezifisch ---
  { key: 'tiqets', name: 'Tiqets', mid: '' /* AWIN 8616 */, category: 'aktivitaeten',
    fallbackUrl: 'https://www.tiqets.com/de/', cta: 'Tickets & Touren bei Tiqets',
    clusters: ['staedtereisen', 'reisearten'], themes: ['stadt'] },
  { key: 'getyourguide', name: 'GetYourGuide', mid: '' /* AWIN 18925 -- Hinweis: Direktpartner 1UPZQQB vorhanden */, category: 'aktivitaeten',
    fallbackUrl: 'https://www.getyourguide.de/', cta: 'Aktivitäten bei GetYourGuide',
    clusters: ['staedtereisen', 'reisearten'], themes: ['stadt', 'abenteuer'] },
  { key: 'hometogo', name: 'HomeToGo', mid: '' /* AWIN 27944 */, category: 'ferienhaus',
    fallbackUrl: 'https://www.hometogo.de/', cta: 'Ferienhäuser bei HomeToGo',
    clusters: ['reiseziele', 'reisearten'], themes: ['insel', 'strand', 'familie'] },
  { key: 'e-domizil', name: 'e-domizil', mid: '' /* AWIN 9160 */, category: 'ferienhaus',
    fallbackUrl: 'https://www.e-domizil.de/', cta: 'Ferienwohnung finden',
    clusters: ['reiseziele', 'reisearten'], themes: ['insel', 'strand', 'familie'] },
  { key: 'camping-info', name: 'camping.info', mid: '' /* AWIN 44063 */, category: 'camping',
    fallbackUrl: 'https://www.camping.info/', cta: 'Campingplätze finden',
    clusters: ['reiseziele', 'reisearten'], themes: ['strand', 'abenteuer'] },
  { key: 'camping-4-you', name: 'Camping-4-you', mid: '' /* AWIN 51479 */, category: 'camping',
    fallbackUrl: 'https://www.camping-4-you.de/', cta: 'Camping-Angebote',
    clusters: ['reiseziele', 'reisearten'], themes: ['strand', 'abenteuer'] },
];

const byKey = (key: string) => MERCHANTS.find((m) => m.key === key);

/** Ein Merchant ist aktiv, wenn Publisher-ID UND Merchant-ID gesetzt sind. */
export function isMerchantActive(m: Merchant): boolean {
  return isAwinReady() && m.mid.trim().length > 0;
}

/**
 * Baut einen AWIN-Deeplink (cread.php) mit korrektem URL-Encoding der Ziel-URL
 * und optionaler SubID (clickref) fürs Reporting.
 */
export function awinDeeplink(targetUrl: string, mid: string, subId = ''): string {
  const params = new URLSearchParams({
    awinmid: mid,
    awinaffid: AWIN.affid,
    ued: targetUrl,
  });
  if (subId) params.set('clickref', `${AWIN.clickrefPrefix}-${subId}`);
  return `https://www.awin1.com/cread.php?${params.toString()}`;
}

/**
 * Liefert den finalen Link für einen Merchant.
 * - aktiv  -> AWIN-Deeplink (Provision)
 * - inaktiv -> direkte Fallback-URL (keine Provision, aber funktioniert)
 *
 * @param keyOrMerchant Merchant-Key oder Merchant-Objekt
 * @param opts.target   Optionale konkrete Ziel-URL (z. B. Deep-Link auf ein Angebot);
 *                       Standard ist die fallbackUrl des Merchants.
 * @param opts.subId    SubID fürs Reporting, üblicherweise der Artikel-/Seiten-Slug.
 */
export function affiliateLink(
  keyOrMerchant: string | Merchant,
  opts: { target?: string; subId?: string } = {},
): string {
  const m = typeof keyOrMerchant === 'string' ? byKey(keyOrMerchant) : keyOrMerchant;
  if (!m) return opts.target ?? '#';
  const target = opts.target ?? m.fallbackUrl;
  return isMerchantActive(m) ? awinDeeplink(target, m.mid, opts.subId) : target;
}

/** Ob ein Link für diesen Merchant ein echter (provisionierter) Affiliate-Link ist. */
export function isAffiliate(keyOrMerchant: string | Merchant): boolean {
  const m = typeof keyOrMerchant === 'string' ? byKey(keyOrMerchant) : keyOrMerchant;
  return m ? isMerchantActive(m) : false;
}

/** Aktive Merchants für einen Content-Cluster (für Auto-Platzierung in Hubs/Artikeln). */
export function merchantsForCluster(clusterKey: string, limit = 3): Merchant[] {
  return MERCHANTS.filter((m) => isMerchantActive(m) && m.clusters.includes(clusterKey)).slice(0, limit);
}

/** Aktive Merchants für ein heroTheme (Artikel-Kontext). */
export function merchantsForTheme(theme: string, limit = 3): Merchant[] {
  return MERCHANTS.filter(
    (m) => isMerchantActive(m) && (m.themes.includes('*') || m.themes.includes(theme)),
  ).slice(0, limit);
}

/** Aktive Merchants einer Kategorie (z. B. alle Mietwagen-Programme). */
export function merchantsByCategory(category: AffiliateCategory, limit = 5): Merchant[] {
  return MERCHANTS.filter((m) => isMerchantActive(m) && m.category === category).slice(0, limit);
}
