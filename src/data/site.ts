export const SITE = {
  name: 'Lastminute Direct',
  domain: 'lastminute-direct.de',
  url: 'https://www.lastminute-direct.de',
  tagline: 'Spontan weg. Jetzt fliegen.',
  description:
    'Dein Magazin für spontane Kurzurlaube und die besten Last-Minute-Reisen. Strand, Stadt und Sonne, ohne langes Suchen.',
  // Affiliate / tracking — aktiv, sobald die jeweilige ID gesetzt ist
  gtmId: 'GTM-PNRHQ2T3',
  adsenseClient: 'ca-pub-3946820918041547',
  stay22LmaId: '68793a2a7a91cb5fc4b5dbf4', // letmeallez.js -> Auto-Affiliate auf ausgehende Buchungslinks
  stay22ApiKey: 'stay22_4fbdd198-447d-4c05-ac17-16ead18e87e1', // M3-Map-/Embed-API (für Widget-Einbettungen)
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
