/**
 * Sample Last-Minute deals. In production these would come from an affiliate
 * feed (Stay22 / flight + hotel partners). Prices are illustrative.
 */
export interface Deal {
  destination: string;
  region: string;
  type: string;
  theme: string;
  imageId: string;
  nights: number;
  board: string;
  stars: number;
  priceFrom: number;
  priceNote: string;
  featured?: boolean;
}

export const DEALS: Deal[] = [
  {
    destination: 'Costa del Sol',
    region: 'Spanien',
    type: 'Strand',
    theme: 'strand',
    imageId: 'photo-1505881502353-a1986add3762',
    nights: 5,
    board: 'All-Inclusive',
    stars: 4,
    priceFrom: 329,
    priceNote: 'p. P. inkl. Flug',
  },
  {
    destination: 'Paris Städtetrip',
    region: 'Frankreich',
    type: 'Stadt',
    theme: 'stadt',
    imageId: 'photo-1502602898657-3e91760cbb34',
    nights: 3,
    board: 'Frühstück',
    stars: 4,
    priceFrom: 219,
    priceNote: 'p. P. inkl. Bahn',
  },
  {
    destination: 'Kreta Strandwoche',
    region: 'Griechenland',
    type: 'Insel',
    theme: 'insel',
    imageId: 'photo-1533105079780-92b9be482077',
    nights: 7,
    board: 'Halbpension',
    stars: 4,
    priceFrom: 449,
    priceNote: 'p. P. inkl. Flug',
  },
  {
    destination: 'Dubai Luxus',
    region: 'VAE',
    type: 'Fernreise',
    theme: 'fernreise',
    imageId: 'photo-1518684079-3c830dcef090',
    nights: 5,
    board: '5 Sterne',
    stars: 5,
    priceFrom: 699,
    priceNote: 'p. P. inkl. Flug',
  },
];

export const FEATURED_DEAL: Deal = {
  destination: '7 Nächte Mallorca, All-Inclusive',
  region: 'Spanien',
  type: 'Strand',
  theme: 'strand',
  imageId: 'photo-1507525428034-b723cf961d3e',
  nights: 7,
  board: 'All-Inclusive',
  stars: 4,
  priceFrom: 389,
  priceNote: '/ Person inkl. Flug',
  featured: true,
};

export interface Destination {
  name: string;
  kind: string;
  imageId: string;
  tall?: boolean;
}

export const DESTINATIONS: Destination[] = [
  { name: 'Karibik', kind: 'Fernreise', imageId: 'photo-1533105079780-92b9be482077', tall: true },
  { name: 'Mallorca', kind: 'Strand', imageId: 'photo-1503152394-c571994fd383' },
  { name: 'Barcelona', kind: 'Stadt', imageId: 'photo-1467269204594-9661b134dd2b' },
  { name: 'Santorini', kind: 'Insel', imageId: 'photo-1530841377377-3ff06c0ca713' },
  { name: 'Dubai', kind: 'Fernreise', imageId: 'photo-1512453979798-5ea266f8880c' },
];
