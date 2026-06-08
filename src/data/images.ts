/**
 * Curated Unsplash image pool. Keyed by heroTheme. Each entry is a verified,
 * stable Unsplash photo. We append a UTM referral per the Unsplash guidelines.
 * Credit is rendered by the ContentImage component.
 */
export interface PoolImage {
  id: string; // Unsplash photo slug/id
  alt: string;
}

const UTM = '?auto=format&fit=crop&q=70&utm_source=lastminute_direct&utm_medium=referral';

export function unsplash(id: string, w = 1200): string {
  return `https://images.unsplash.com/${id}${UTM}&w=${w}`;
}

export function unsplashCredit(id: string): string {
  return `https://unsplash.com/photos/${id}?utm_source=lastminute_direct&utm_medium=referral`;
}

export const IMAGE_POOL: Record<string, PoolImage[]> = {
  strand: [
    { id: 'photo-1507525428034-b723cf961d3e', alt: 'Türkisfarbenes Meer an einem weißen Sandstrand' },
    { id: 'photo-1505881502353-a1986add3762', alt: 'Holzsteg über kristallklarem Wasser zu einer Insel' },
    { id: 'photo-1512100356356-de1b84283e18', alt: 'Palmen an einem tropischen Strand' },
    { id: 'photo-1722325110558-63a1a50c2f28', alt: 'Bunte Sonnenschirme und Strandtuch an einer Bucht' },
    { id: 'photo-1506953823976-52e1fdc0149a', alt: 'Palme am Ufer eines tropischen Strandes' },
    { id: 'photo-1509233725247-49e657c54213', alt: 'Kokospalme an einem sonnigen Strand' },
    { id: 'photo-1741705877378-124c4c259e30', alt: 'Wellen rollen auf einen feinen Sandstrand' },
    { id: 'photo-1473116763249-2faaef81ccda', alt: 'Weite Küste mit ruhigem Meer' },
    { id: 'photo-1505142468610-359e7d316be0', alt: 'Luftaufnahme einer Küste mit türkisem Wasser' },
    { id: 'photo-1559494007-9f5847c49d94', alt: 'Strand bei Sonnenuntergang' },
    { id: 'photo-1491378630646-3440efa57c3b', alt: 'Sandstrand unter klarem blauem Himmel' },
    { id: 'photo-1520942702018-0862200e6873', alt: 'Feiner Sandstrand mit türkisem Ozean' },
  ],
  insel: [
    { id: 'photo-1533105079780-92b9be482077', alt: 'Weiße Häuser über dem blauen Meer auf einer Insel' },
    { id: 'photo-1559827260-dc66d52bef19', alt: 'Luftaufnahme einer Insel im türkisen Meer' },
    { id: 'photo-1530841377377-3ff06c0ca713', alt: 'Sonnenuntergang über Santorini' },
  ],
  stadt: [
    { id: 'photo-1502602898657-3e91760cbb34', alt: 'Eiffelturm in Paris bei Abenddämmerung' },
    { id: 'photo-1467269204594-9661b134dd2b', alt: 'Bunte Altstadtgasse mit Blumen' },
    { id: 'photo-1473625247510-8ceb1760943f', alt: 'Europäische Großstadt von oben' },
    { id: 'photo-1629802644752-e6421a90c1e7', alt: 'Blick über die Dächer einer Altstadt am Fluss' },
    { id: 'photo-1611182673014-25c50884fa39', alt: 'Skyline einer Großstadt in der Abenddämmerung' },
    { id: 'photo-1502991644659-e8aa151f8389', alt: 'Luftaufnahme einer historischen Altstadt mit roten Dächern' },
    { id: 'photo-1724832644756-9bb57eeeaf07', alt: 'Enge Gasse in einer europäischen Altstadt' },
    { id: 'photo-1708195845961-b811d1390289', alt: 'Schmale Altstadtgasse mit bunten Häusern' },
    { id: 'photo-1552759613-c065c85e710b', alt: 'Enge Straße in der Altstadt' },
    { id: 'photo-1657892479099-24fe3be52490', alt: 'Gepflasterte Gasse zwischen Altstadthäusern' },
    { id: 'photo-1699359104606-5b4b1267b11a', alt: 'Historisches Gebäude mit Uhrturm' },
    { id: 'photo-1635760093663-85c9aafa7750', alt: 'Fluss durch eine Stadt mit hohen Gebäuden' },
  ],
  fernreise: [
    { id: 'photo-1518684079-3c830dcef090', alt: 'Skyline von Dubai bei Sonnenuntergang' },
    { id: 'photo-1512453979798-5ea266f8880c', alt: 'Wolkenkratzer und Stadtautobahn bei Nacht' },
  ],
  familie: [
    { id: 'photo-1502933691298-84fc14542831', alt: 'Entspannter Strandtag mit Blick auf das Meer' },
    { id: 'photo-1468413253725-0d5181091126', alt: 'Ruhige Küste unter weißen Wolken' },
    { id: 'photo-1644333192141-1135d690734f', alt: 'Strand mit Sonnenschirmen und Liegen aus der Vogelperspektive' },
  ],
  abenteuer: [
    { id: 'photo-1502933691298-84fc14542831', alt: 'Wassersport am offenen Meer' },
    { id: 'photo-1530053969600-caed2596d242', alt: 'Aktiver Strandtag mit Wellen' },
  ],
  genuss: [
    { id: 'photo-1414235077428-338989a2e8c0', alt: 'Gedeckter Tisch in einem Restaurant' },
    { id: 'photo-1559339352-11d035aa65de', alt: 'Kulinarisches Gericht mit Meerblick' },
  ],
  ratgeber: [
    { id: 'photo-1488646953014-85cb44e25828', alt: 'Reiseplanung mit Karte und Kompass' },
    { id: 'photo-1436491865332-7a61a109cc05', alt: 'Flugzeugflügel über den Wolken' },
  ],
};

/** Deterministic pick so the same article always gets the same image. */
export function pickImage(theme: string, seed: string): PoolImage {
  const pool = IMAGE_POOL[theme] ?? IMAGE_POOL.strand;
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return pool[h % pool.length];
}
