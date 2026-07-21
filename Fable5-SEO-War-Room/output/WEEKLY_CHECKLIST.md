# WEEKLY CHECKLIST – lastminute-direct.de (12 Wochen, Start KW ab 2026-07-21)

Jede Woche max. 5h. Tags: [Sonnet] = kann ein Modell ausführen, [Manual] = Mensch nötig (Zugänge, Freigaben, Publishing-Entscheidungen). Alle Pfade beziehen sich auf den Projektordner `Hotel, Reiseportale/lastminute-direct-astro`.

## Woche 1 – Deploy (Bet 0)
- [ ] [Manual] MyTrueHost-FTP-Zugangsdaten beschaffen und als GitHub-Secrets setzen (FTP_SERVER, FTP_USERNAME, FTP_PASSWORD, FTP_SERVER_DIR); Referenz: Playbook `reference_mytruehost_cpanel_deploy`. Falls in 1 Woche nicht beschaffbar: `npm run build` lokal, dist/ per cPanel-Dateimanager hochladen.
- [ ] [Manual] Deploy-Workflow (.github/workflows/deploy.yml) auslösen und Log prüfen (Signatur "failure nach 4s" = Billing-Problem, siehe Playbook).
- [ ] [Sonnet] Nach Live-Gang Redirects verifizieren: curl -I auf die 10 rankenden Alt-URLs (u.a. /reiseziele/strandurlaub-und-yoga/, /reiseziele/strandcamping/, /abenteurer/lohnt-sich-last-minute/, /stadtreisen/kunstfestivals-in-staedtereisen/) -> müssen 301 auf /magazin/<slug>/ liefern; Startseite, Cluster-Hubs, /magazin/ stichprobenartig auf 200 prüfen.
- [ ] [Manual] AWIN-Publisher-ID in src/data/site.ts eintragen; bei l'tur (9139), ab-in-den-urlaub (9369), TravelScout24 (9130), Lidl Reisen (11773), Urlaubsguru (99653) bewerben.

## Woche 2 – Indexierung + Messbarkeit (Bet 0/5)
- [ ] [Manual] GSC-Property anlegen, Sitemap einreichen; Bing-Webmaster-Tools verifizieren + Sitemap (Playbook-Pflicht "Fertig = Bing verifiziert").
- [ ] [Sonnet] IndexNow/RalfyIndex-Submit für alle neuen /magazin/-URLs + Startseite + Cluster-Hubs (Skill `ralfyindex`, vorher Projektname/Modus bestätigen lassen).
- [ ] [Sonnet] Baseline-Datei anlegen: die 26 Keywords aus BRIEF Abschnitt 2 mit Datum/Position in `Fable5-SEO-War-Room/output/RANK_BASELINE.md` festhalten (Vergleichsgrundlage für Woche 6 und 12).

## Woche 3 – Yoga-Guide Recherche (Bet 1)
- [ ] [Sonnet] SERP-/Wettbewerbs-Analyse der Top 10 für "yoga retreat last minute" und "yoga retreats am meer" (Struktur, Wortzahl, welche Retreats genannt werden; Quellen: yogaescapes.de, reisevergnuegen.com/yoga-retreats-meer-wasser, wainando.de) -> Gliederungsvorschlag als Notiz.
- [ ] [Sonnet] Recherche-Liste: 10-15 real existierende, kurzfristig buchbare Yoga-Retreats am Meer (DE/EU) mit Ort, Saison, Preisspanne, Veranstalter-Link; nur verifizierbare Fakten, keine erfundenen Angebote oder Bewertungen.
- [ ] [Manual] Liste gegenprüfen (Stichprobe 3-4 Anbieter live aufrufen) und freigeben.

## Woche 4 – Yoga-Guide Umsetzung (Bet 1)
- [ ] [Sonnet] /magazin/strandurlaub-und-yoga/ (src/content/artikel/strandurlaub-und-yoga.md bzw. vorhandener Slug) ausbauen: neue H2 "Last minute buchbare Yoga-Retreats", Retreat-Liste aus Woche 3, Preisspannen, FAQ erweitern (u.a. "Lohnt sich ein Yoga Retreat last minute?"); Keyword-Varianten (am meer / last minute / urlaub) natürlich in H2/H3; keine Em-Dashes, echte Umlaute.
- [ ] [Sonnet] Interne Links AUF den Yoga-Artikel aus mind. 6 thematisch passenden Artikeln (strandurlaub-wellness, entspannende-rueckzugsorte, romantische-strandurlaube, aktivurlaub-am-strand, strandurlaube-nebensaison, luxus-strandresorts) mit variierenden Ankertexten setzen.
- [ ] [Manual] Build + Deploy + RalfyIndex-Submit der geänderten URLs.

## Woche 5 – Yoga-Flanke verbreitern (Bet 1)
- [ ] [Sonnet] Ergänzungsartikel anlegen: "Yoga Retreats in Deutschland: Auszeit ohne Flug" (Ziel-Keywords "yoga meditation retreat deutschland" 1.000 SV, wainando Pos 4; "kloster urlaub"-Winkel optional) als /magazin/yoga-retreats-deutschland/; verlinkt vom Haupt-Guide und zurück.
- [ ] [Sonnet] Stay22-/Affiliate-Kontextlinks im Yoga-Cluster prüfen: jede genannte Region mit sinnvollem Buchungs-Kontextlink (Content-Pass-Muster), AWIN-Deeplinks nur für freigeschaltete Programme.
- [ ] [Manual] Deploy + Index-Submit.

## Woche 6 – Anbieter-Silo Teil 1 (Bet 2) + Zwischenmessung
- [ ] [Sonnet] Template-Entscheidung dokumentieren: Anbieter-Seiten als /magazin/<anbieter>-im-check/ oder eigene Route; Inhalte je Seite: Sortiment, Veranstalter dahinter, Zahlungsarten, Storno/Umbuchung, Gutschein-Hinweise, FAQ; faktenbasiert, KEINE erfundenen Erfahrungsberichte, Affiliate-Disclosure dezent.
- [ ] [Sonnet] Seite 1: l'tur (AWIN 9139), Fokus-Longtail "ltur last minute erfahrungen", "ltur seriös". Seite 2: ab-in-den-urlaub.de (9369), analog.
- [ ] [Manual] GSC-Check (erste Impressions nach Deploy?) + Positionen der 26 Baseline-Keywords notieren (DataForSEO oder manuell); Kannibalisierung prüfen: rankt nur noch die /magazin/-URL fürs Yoga-Cluster?

## Woche 7 – Anbieter-Silo Teil 2 (Bet 2)
- [ ] [Sonnet] Seite 3: TravelScout24 (9130). Seite 4: Lidl Reisen (11773); Vorsicht: urlaubspiraten rankt "lidl reisen" Pos 3 bei 135.000 SV, unser Ziel ist Longtail ("lidl reisen erfahrungen pauschalreise" etc.), das im Text klar bedienen.
- [ ] [Sonnet] Anbieter-Seiten untereinander + mit Deals-Hub und passenden Magazin-Artikeln verlinken; Breadcrumb-/FAQ-Schema ergänzen.
- [ ] [Manual] Deploy + Index-Submit; AWIN-Bewerbungsstatus prüfen, freigeschaltete mids in src/data/affiliates.ts eintragen.

## Woche 8 – Strandcamping-Guide (Bet 3)
- [ ] [Sonnet] Recherche: 15 real existierende Strandcampingplätze in Europa (DE Ostsee/Nordsee, NL, DK, HR, IT, ES) mit Lage, Preisniveau, Saison, Besonderheit; nur belegbare Fakten mit Quelle.
- [ ] [Sonnet] /magazin/strandcamping/ zu "Die 15 schönsten Strandcampingplätze in Europa" ausbauen: je Platz ein Abschnitt, ItemList- + FAQ-Schema, interne Links von strandurlaub-wohnmobil, aktivurlaub-am-strand, hundestraende; Ziel-Keywords "strandcamping" (720 SV) + "strand camping" (480 SV) in Title/H1 abdecken.
- [ ] [Manual] Faktencheck-Stichprobe, Deploy, Index-Submit.

## Woche 9 – Anbieter-Silo Teil 3 + Deals-Hub (Bet 2)
- [ ] [Sonnet] Seite 5: Urlaubsguru (99653) und/oder lastminute.de; danach Silo-Übersichtsseite "Lastminute-Anbieter im Vergleich" als Hub, der alle 5-6 Anbieter-Seiten bündelt.
- [ ] [Manual] src/data/deals.ts: Platzhalter-Deals durch reale, manuell gepflegte Angebote der freigeschalteten AWIN-Partner ersetzen (Minimum: 6 echte Deals mit Ablaufdatum) oder Deals-Sektion vorerst auf Anbieter-Hub umleiten, statt Fake-Deals zu zeigen.
- [ ] [Manual] Deploy + Index-Submit.

## Woche 10 – Listicle-Refresh (Bet 4)
- [ ] [Sonnet] /magazin/besten-inseln/ überarbeiten: konkrete Inseln mit Fakten (Anreise, beste Reisezeit, Preisniveau), Ziel "schöne inseln" (880 SV) + "die schönsten inseln der welt" (320 SV); Struktur-Vorbild reisevergnuegen /inseln-in-europa (Pos 3-5 bei 4x 1.600 SV).
- [ ] [Sonnet] /magazin/strandurlaub-in-asien/ nachschärfen auf "inseln in asien" (70 SV, Einzelblog julitasjourney rankt Pos 3): Insel-Liste mit H3 je Insel, FAQ.
- [ ] [Manual] Deploy + Index-Submit.

## Woche 11 – Städte + interne Verlinkung (Bet 4)
- [ ] [Sonnet] /magazin/geheimtipps-staedtereisen/ (Pos 50, 70 SV) refreshen: konkrete Städte, Saison-Winkel 2026/2027, interne Links zu staedtereisen-Cluster-Artikeln.
- [ ] [Sonnet] Site-weiter interner Link-Audit: jede der 5 Fokus-URLs (Yoga-Guide, Yoga-Deutschland, Strandcamping, Anbieter-Hub, besten-inseln) hat mind. 5 eingehende interne Links mit sinnvollen Ankern; Lücken direkt fixen.
- [ ] [Manual] Deploy + Index-Submit.

## Woche 12 – Messung + Übergabe (Bet 5)
- [ ] [Sonnet] Ranking-Vergleich gegen RANK_BASELINE.md (Woche 2): alle 26 Alt-Keywords + neue Ziel-Keywords (yoga retreat last minute, strandcamping, "<anbieter> erfahrungen"-Set); Ergebnis als RANK_REVIEW_W12.md.
- [ ] [Manual] GSC-Auswertung: Impressions-Trend seit Deploy, Top-Queries, Seiten mit Impressions ohne Klicks (= nächste Title/Meta-Kandidaten).
- [ ] [Manual] AWIN-Dashboard: Klicks/Sales je Anbieter-Seite prüfen; Stay22-Report ziehen; daraus Prioritäten für Q4 notieren.
- [ ] [Sonnet] Kurzes Fazit-Memo: welche Bets geliefert haben, welche nicht, Empfehlung für die nächsten 90 Tage.

**Dauerregeln:** keine Em-Dashes, echte Umlaute, keine erfundenen Personen/Erfahrungen, Affiliate dezent + Disclosure, nach jedem Deploy Index-Submit, Impressum/Datenschutz noindex.
