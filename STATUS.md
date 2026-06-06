# Lastminute Direct — Astro Relaunch · STATUS

**Domain:** lastminute-direct.de
**Stack:** Astro 5 + Tailwind 4 (@tailwindcss/vite), Content Collections, statisches SSG
**Design:** Joby Aviation „Skyward Glide" (Skybound Blue #007ae5, Cloud Whisper #f5f4df, Sunset Orange #eb6110 als CTA)

## Architektur

- **5 Cluster-Taxonomie** (Navigation, von URL entkoppelt): `deals · reiseziele · reisearten · staedtereisen · ratgeber`
  - Dynamische Hub-Route: `src/pages/[cluster]/index.astro`
- **Artikel** konsolidiert unter `/magazin/<slug>/` (`src/pages/magazin/[slug].astro`)
  - Content Collection `artikel` (glob loader), Schema in `src/content.config.ts`
  - Frontmatter: title, description, legacyUrl, legacyCategory, clusters[], tags[], heroTheme, readingTime, faq[]
- **Bilder:** kuratierter Unsplash-Pool `src/data/images.ts` (heroTheme -> Bild, deterministisch per Slug-Hash), Credit + UTM via `ContentImage.astro`
- **Templates fertig:** Startseite, Cluster-Hubs, Magazin-Index, Artikel, Reiseplanung-Hub, Über-uns, Kontakt (Web3Forms), Suche (client-side über `/search-index.json`), 404, Impressum, Datenschutz (Platzhalter)

## Migration

- 64 WP-Artikel via Workflow `lmd-article-migration` neu geschrieben (DE, echte Umlaute, keine Em-Dashes, GEO-Struktur mit Frage-H2s + FAQ)
- **Redirects** generiert: `public/_redirects` (Cloudflare/Netlify) + `public/.htaccess` (Apache) via `scripts/gen-redirects.mjs`
  - 64 Artikel: `/<kategorie>/<slug>/` -> `/magazin/<slug>/`
  - 6 Archive: stadtreisen->staedtereisen, abenteurer/familie/feinschmecker->reisearten, tipps-und-tricks/reisetipps-fuer-anfaenger->ratgeber
  - `/reiseziele/` bleibt (wird als Cluster-Hub wiederverwendet)

## Affiliate (AWIN)

- Infrastruktur fertig und getestet: `src/data/site.ts` (`AWIN.affid`, Disclosure) + `src/data/affiliates.ts` (Merchant-Registry + Helper `affiliateLink`/`awinDeeplink`/`merchantsForTheme`/`merchantsForCluster`).
- Komponenten: `AffiliateButton.astro`, `AffiliateBox.astro` (auto-platziert im Artikel-Template nach heroTheme).
- **Aktivierung in 2 Schritten:** (1) `AWIN.affid` in site.ts setzen, (2) pro freigeschaltetem Programm `mid` in affiliates.ts füllen (Referenz-ID steht im Kommentar). Bis dahin: graceful Fallback auf Direkt-Links, Boxen rendern leer.
- Deeplink verifiziert: `awin1.com/cread.php?awinmid=..&awinaffid=..&ued=..&clickref=lmd-<slug>`.
- Programm-Auswahl + IDs siehe `AFFILIATE-AWIN.md`.

## Tracking / Monetarisierung (eingerichtet)

- **GTM** `GTM-PNRHQ2T3`, **AdSense** `ca-pub-3946820918041547`, **Stay22 lmaID** `68793a2a7a91cb5fc4b5dbf4` + API-Key in `src/data/site.ts`.
- Scripts in `BaseLayout.astro` conditional eingebunden (GTM head+noscript, AdSense-Loader, Stay22 letmeallez). `public/ads.txt` angelegt.
- **Stay22 letmeallez** monetarisiert ausgehende Buchungslinks automatisch -> In-Body-Affiliate laeuft ueber redaktionelle Kontextlinks (Content-Pass), unabhaengig von AWIN.
- Externe Links in Artikeln bekommen via `rehype-external-links` automatisch `rel="nofollow noopener" target="_blank"`.

## Content-Pass (64 Artikel, Workflow `lmd-content-pass`)

- Fan-out (1 Agent/Artikel): interne Verlinkung + Korrektheits-Check + Stay22-Kontextlinks, direkte Edits in den .md-Dateien. Review per Git-Diff.

## Deploy

- Auto-Deploy via **FTPS zu MyTrueHost** (`.github/workflows/deploy.yml`). Benoetigte Secrets: `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`, `FTP_SERVER_DIR`.

## Offene To-Dos (vor Go-Live)

- [ ] **AWIN:** Publisher-ID + freigeschaltete Merchant-IDs eintragen (Sidebar-AffiliateBox aktiviert sich dann automatisch)
- [ ] **Impressum:** HE-Registernummer (Zypern), USt-IdNr. (oder „nicht vorhanden"), Name Director/Vertretungsberechtigte/r ergaenzen (Platzhalter in `src/pages/impressum.astro`)
- [ ] **Deploy-Secrets** in GitHub setzen (FTP_*), dann Deploy ausloesen
- [ ] AdSense-Anzeigen-Slots final platzieren (Loader + ads.txt stehen)
- [ ] Stay22-Map-/Embed-Widget (M3) optional zusaetzlich einbauen (API-Key liegt in site.ts)
- [ ] Echte Deal-Daten / Affiliate-Feed statt Beispiel-Deals (`src/data/deals.ts`)
- [ ] Logo-SVG final (aktuell Inline-Paper-Plane)

## Dev

```
npm install
npm run dev      # http://localhost:4321
npm run build
```
