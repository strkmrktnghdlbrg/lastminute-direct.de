export const SITE = {
  name: 'Lastminute Direct',
  domain: 'lastminute-direct.de',
  url: 'https://www.lastminute-direct.de',
  tagline: 'Spontan weg. Jetzt fliegen.',
  description:
    'Dein Magazin für spontane Kurzurlaube und die besten Last-Minute-Reisen. Strand, Stadt und Sonne, ohne langes Suchen.',
  // Affiliate / tracking placeholders (fill before go-live)
  gtmId: '', // e.g. GTM-XXXXXXX
  adsenseClient: '', // e.g. ca-pub-XXXXXXXXXXXXXXXX
  stay22LmaId: '', // individuelle Stay22 lmaID pro Projekt anfragen
  web3formsKey: 'b65f4e95-6ac7-4003-a46a-fe4e08b120e2', // Lead-Forms default
  email: 'kontakt@lastminute-direct.de',
};

/**
 * AWIN Affiliate-Konfiguration.
 * NUR HIER eure Publisher-ID eintragen, sobald der AWIN-Account steht.
 * Die einzelnen Merchant-IDs stehen in src/data/affiliates.ts.
 * Solange `affid` leer ist, fallen alle Affiliate-Buttons automatisch auf
 * Direkt-Links (ohne Provision) zurück, die Seite bleibt also funktionsfähig.
 */
export const AWIN = {
  affid: '', // <-- eure AWIN Publisher-ID (z. B. "123456")
  // SubID-Präfix fürs Reporting (clickref). Pro Seite wird der Slug angehängt.
  clickrefPrefix: 'lmd',
};

export const isAwinReady = () => AWIN.affid.trim().length > 0;

// Pflicht-Werbe-Kennzeichnung für Affiliate-Platzierungen
export const AFFILIATE_DISCLOSURE =
  'Anzeige: Links mit Sternchen sind Affiliate-Links. Buchst du darüber, erhalten wir eine kleine Provision. Für dich bleibt der Preis gleich.';

export const NAV = [
  { label: 'Last-Minute Deals', href: '/deals/' },
  { label: 'Reiseziele', href: '/reiseziele/' },
  { label: 'Reisearten', href: '/reisearten/' },
  { label: 'Städtereisen', href: '/staedtereisen/' },
  { label: 'Reiseplanung', href: '/reiseplanung/' },
  { label: 'Ratgeber', href: '/ratgeber/' },
];
