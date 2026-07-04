# Improvement-Plan: lastminute-direct.de

> Automatisches Audit vom 2026-07-04. Abarbeitbar von jeder Claude-Session. Vor Deploy: Hosting laut ClickUp-Task prüfen.

## 1. Status (Live?, Hosting/Deploy, Build-Stand)

- **Live**: Ja (LiteSpeed-Server, MyTrueHost). Apex UND www liefern beide 200 (siehe §2).
- **Hosting/Deploy**: Auto-Deploy via FTPS zu MyTrueHost (`.github/workflows/deploy.yml`, Secrets FTP_SERVER/USERNAME/PASSWORD/SERVER_DIR).
- **Build-Stand**: Repo aktuell (letzter Commit 2026-07-01 "SEO: www/Apex-Canonical 301", gepusht). ABER: Live-Server liefert last-modified 2026-06-23 - der Canonical-Fix ist NICHT deployed. Deploy-Workflow prüfen/erneut anstoßen.
- **Umfang**: 64 Magazin-Artikel unter `/magazin/<slug>/`, 5-Cluster-IA (deals, reiseziele, reisearten, staedtereisen, ratgeber) via `src/pages/[cluster]/index.astro`, Silo-Verlinkung fertig, Suche, Web3Forms-Kontakt.

## 2. Kritische Findings (Sicherheit, kaputte Links, Canonical)

1. **CANONICAL-PROBLEM (Pflicht-Finding)**: `https://lastminute-direct.de/` = 200 UND `https://www.lastminute-direct.de/` = 200, kein Redirect. Der Fix existiert bereits in `public/.htaccess` (WWW-CANONICAL-Block, Apex→www 301, Commit 1a33f1c vom 2026-07-01), ist aber nicht live (Server-Stand 2026-06-23). Aktion: GitHub-Actions-Lauf prüfen (fehlgeschlagen?) bzw. Deploy re-runnen.
2. **robots.txt fehlt komplett** (404 live, keine Datei in `public/`). Anlegen mit Sitemap-Verweis auf `https://www.lastminute-direct.de/sitemap-index.xml`.
3. **Sicherheit: sauber**. `stay22ApiKey` korrekt aus `import.meta.env.STAY22_API_KEY` (`src/data/site.ts` Zeile 12), keine hartkodierten Secrets, keine .env im Git.
4. Legacy-WP-Redirects funktionieren live (Stichprobe `/stadtreisen/solo-staedtereisen/` → 301 nach `/magazin/solo-staedtereisen/`) - allerdings redirecten sie aktuell auf die Apex-Variante; nach Deploy des Canonical-Fixes entsteht daraus eine 301-Kette (Apex→www). Optional: `.htaccess`-Redirect-Ziele auf `https://www.` absolut setzen.

## 3. Vollendung (was zum Fertigstellen fehlt)

- **Deploy des aktuellen Stands** (Canonical-Fix, siehe §2.1).
- **AWIN-Aktivierung**: Infrastruktur komplett (`src/data/site.ts` `AWIN.affid` leer, `src/data/affiliates.ts` Merchant-Registry ohne `mid`s, `AffiliateButton/AffiliateBox.astro` rendern Fallback). Sobald AWIN-Programme freigeschaltet: affid + mids eintragen (Programm-Liste in `AFFILIATE-AWIN.md`).
- **robots.txt** (§2.2).
- `dist/` ist im Git committet (`dist/.htaccess` in ls-files) - Build-Artefakte gehören in .gitignore, aufräumen.

## 4. Monetarisierung (vorhanden / fehlend / kaputt)

- **Vorhanden**:
  - GTM `GTM-PNRHQ2T3` + AdSense `ca-pub-3946820918041547` (Loader in `src/layouts/BaseLayout.astro`, `public/ads.txt` korrekt).
  - Stay22 letmeallez lmaID `68793a2a7a91cb5fc4b5dbf4` global - monetarisiert ausgehende Buchungslinks (GetYourGuide-, Booking-Kontextlinks in den 64 Artikeln) automatisch.
  - Web3Forms Kontaktformular.
- **Fehlend**:
  - AWIN (affid leer, alle Boxen inaktiv) - größter Hebel: CHECK24 Pauschalreise, HolidayCheck, ab-in-den-urlaub für echte Lastminute-Deals.
  - Keine dedizierten Deal-/Buchungsseiten mit Widgets (Cluster `deals` ist reiner Artikel-Hub).
  - Amazon-Packlisten-Potenzial (packliste-staedtereisen existiert als Artikel) ohne Amazon-Tag.
- **Kaputt**: nichts gefunden. GYG-Links in Artikeln sind bewusst rohe Links (Stay22-Content-Pass übernimmt Attribution).

## 5. SEO & Traffic (Struktur, interne Links, GEO/AI-Search)

- Sitemap-Index live (200), aber ohne robots.txt-Verweis.
- Canonical-Tags zeigen konsistent auf www (astro.config `site: https://www.lastminute-direct.de`) - gut, sobald der 301 live ist.
- JSON-LD in `BaseLayout.astro` + `magazin/[slug].astro` (Article + FAQ aus Frontmatter `faq[]`) - GEO-ready, Artikel haben Frage-H2s.
- Interne Silo-Verlinkung (Related-/Sibling-Blöcke + Hub-Spoke) seit Commit 74300ed vorhanden.
- Schwäche: Domain-USP "Last Minute" hat nur 3-4 Artikel (last-minute-schnaeppchen, lohnt-sich-last-minute, last-minute-strandurlaube). Der Deals-Cluster braucht buchungsnahe Seiten (§6), sonst bleibt die Domain ein generisches Reisemagazin.

## 6. Neue Buyer-Intent-Seiten (Tabelle: URL | Keyword-Idee | Monetarisierung)

| URL | Keyword-Idee | Monetarisierung |
|---|---|---|
| /deals/last-minute-tuerkei/ | last minute türkei all inclusive | AWIN CHECK24/ab-in-den-urlaub + Stay22 |
| /deals/last-minute-mallorca/ | last minute mallorca | AWIN Pauschalreise + Stay22 |
| /deals/last-minute-aegypten/ | last minute ägypten hurghada | AWIN + Stay22 |
| /deals/last-minute-griechenland/ | last minute griechenland kreta | AWIN + Stay22 |
| /deals/last-minute-kanaren/ | last minute kanaren winter | AWIN + Stay22 |
| /deals/last-minute-mit-kindern/ | last minute urlaub mit kindern | AWIN Familien-Deals |
| /reiseziele/staedtereise-paris-buchen/ | städtereise paris hotel + aktivitäten | Stay22 embed/gm + GYG-Kontextlinks |
| /ratgeber/reiseversicherung-last-minute/ | reiseversicherung kurzfristig abschließen | AWIN (HanseMerkur/ERGO) |
| /ratgeber/mietwagen-last-minute/ | mietwagen last minute flughafen | AWIN Sunny Cars/CHECK24 Mietwagen |
| /deals/hotel-heute-nacht/ | hotel heute nacht günstig | Stay22 Deeplinks |

Hinweis: Deal-Seiten als statische Evergreen-Landingpages bauen (Reiseziel-Infos + beste Reisezeit + Buchungs-Widgets), keine tagesaktuellen Preise versprechen.

## 7. Priorisierte Tasks (nummerierte [ ]-Checkliste, konkret für eine frische Session, mit Dateipfaden)

1. [ ] Deploy-Status klären: GitHub Actions Run für Commit 1a33f1c in `strkmrktnghdlbrg/lastminute-direct.de` prüfen (`gh run list -R strkmrktnghdlbrg/lastminute-direct.de`), ggf. re-runnen bis www/Apex-301 live ist. Danach `curl -sI https://lastminute-direct.de/` = 301 auf www verifizieren.
2. [x] `public/robots.txt` anlegen (`Sitemap: https://www.lastminute-direct.de/sitemap-index.xml`), committen, pushen.
3. [ ] `dist/` aus Git entfernen: `.gitignore` um `dist/` ergänzen, `git rm -r --cached dist`.
4. [ ] Redirect-Ziele in `public/.htaccess` und `scripts/gen-redirects.mjs` auf absolute `https://www.lastminute-direct.de/...`-URLs umstellen (verhindert 301-Ketten).
5. [ ] AWIN-Publisher-Status prüfen; bei Freischaltung `AWIN.affid` in `src/data/site.ts` und `mid`s in `src/data/affiliates.ts` setzen (IDs siehe `AFFILIATE-AWIN.md`).
6. [ ] Erste 3 Deal-Landingpages bauen (`/deals/last-minute-tuerkei/`, `/deals/last-minute-mallorca/`, `/deals/last-minute-aegypten/`) - neues Template oder Erweiterung von `src/pages/[cluster]/index.astro` um statische Detail-Routen; von Startseite + Deals-Hub verlinken.
7. [ ] Ratgeber-Money-Pages `/ratgeber/reiseversicherung-last-minute/` und `/ratgeber/mietwagen-last-minute/` als Artikel in `src/content/artikel/` mit AffiliateBox anlegen.
