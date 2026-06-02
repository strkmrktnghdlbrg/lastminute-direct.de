# AWIN-Partnerprogramme für lastminute-direct.de

Recherchiert 2026-06. AWIN-Merchant-IDs in Klammern. Bewerbung jeweils nach AWIN-Login
über das Merchant-Profil (`ui.awin.com/merchant-profile/<ID>`). Eigene AWIN-Publisher-ID
(`awinaffid`) wird für die Deeplinks benötigt (noch eintragen).

## Tier 1 — Kern-Fit (zuerst anmelden)
Passt direkt zur Marken-DNA „Last-Minute / Pauschal".

| Anbieter | AWIN-ID | Provision | Einsatz |
|---|---|---|---|
| **l'tur** (TUI, Last-Minute-Marktführer) | 9139 | Pay-per-Sale | Hero-CTA, Deals-Cluster, Last-Minute-Artikel |
| **ab-in-den-urlaub.de** | 9369 | PPS | Deals, Pauschal/All-Inclusive, Flüge, Kreuzfahrt |
| **TravelScout24** | 9130 | bis 75 € / Sale (Ø Warenkorb ~1.500 €) | Deals, Pauschalreisen |
| **Lidl Reisen** | 11773 | bis 4 % | Deals, Familie/All-Inclusive |
| **Urlaubsguru** | 99653 | PPS (nur Pauschal + Kreuzfahrt commissioniert) | Deals-Cluster, Magazin |
| **lastminute.de** | (Merchant-Profil) | PPS | Hotels, Flüge, Städtetrips |

## Tier 2 — Querschnitt (auf jeder Seite sinnvoll)
Mietwagen + Versicherung konvertieren reise-übergreifend, ideal als Sidebar/Ratgeber-CTA.

| Anbieter | AWIN-ID | Provision | Einsatz |
|---|---|---|---|
| **Sunny Cars** (Mietwagen) | 13830 | 7-8 % (Ø ~500 €, 30 Tage Cookie) | Ratgeber, Roadtrip/Wohnmobil, Reiseziele |
| **billiger-mietwagen.de** | (CHECK24) | 2 % | Mietwagen-Vergleich, Ratgeber |
| **MietwagenCheck** | 14051 | 5 % | Mietwagen-Vergleich |
| **Sixt** | 14761 | PPS | Mietwagen |
| **HanseMerkur Reiseversicherung** | 11705 | 12-15 % CPO (Cap 80 €, 45 Tage Cookie) | Ratgeber, Checkout-nahe CTAs |
| **TravelSecure** (Würzburger) | (eigenes Profil) | PPS | Reiseversicherung, Ratgeber |
| **AMEX Reiseversicherung** | 15988 | PPS | Reiseversicherung |

## Tier 3 — Themen-spezifisch (gezielt in passende Artikel)
| Anbieter | AWIN-ID | Provision | Passt zu (Artikel/Cluster) |
|---|---|---|---|
| **GetYourGuide** | 18925 | 7 % (30 Tage) | Städtereisen, Aktivitäten — *Hinweis: ihr habt bereits GYG-Direktpartner `1UPZQQB`, ggf. direkt statt AWIN* |
| **Tiqets** | 8616 | PPS | Städtereisen, Sehenswürdigkeiten, Tickets |
| **HomeToGo** | 27944 | 4 % (nach Check-in) | Ferienhäuser: Inseln, Familie, Alleinreisende |
| **e-domizil** | 9160 | PPS | Ferienwohnungen |
| **camping.info** | 44063 | PPS | Strandcamping, Wohnmobil |
| **Camping-4-you** | 51479 | 7 % | Strandcamping, Wohnmobil |
| **Camping and Co** | 16438 | PPS | Camping |
| **DERTOUR / MEIERS WELTREISEN** | — | PPS | Pauschal/Fernreise |

## Nicht empfehlen
- **FTI Touristik**: Insolvenz Juni 2024, raus.

## Integration (Vorschlag)
- `src/data/affiliates.ts`: Registry je Merchant (awinmid, Label, Kategorie, Ziel-URL).
- AWIN-Deeplink-Format: `https://www.awin1.com/cread.php?awinmid=<MID>&awinaffid=<DEINE_ID>&clickref=<subid>&ued=<url-encoded Ziel>`.
  - `clickref` = SubID pro Seite/Artikel für Reporting (vgl. Playbook-Gotcha „Adcell vs AWIN clickref").
- Wiederverwendbare Komponente `AffiliateButton.astro` + thematische Auswahl pro Cluster/heroTheme
  (z. B. Camping-Merchants automatisch in `strandcamping`/`strandurlaub-wohnmobil`).
- Pflicht: Affiliate-Hinweis (Werbe-Kennzeichnung) + Ergänzung in Datenschutz.

## Offen
- AWIN-Publisher-Account vorhanden? Falls ja: `awinaffid` nennen.
- Stay22 deckt Hotel/Flug-Aggregation ab (lmaID für dieses Projekt noch offen).
