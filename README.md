# Invito digitale — Giulia & Andrea

Landing one-page per l’invito di matrimonio di Giulia e Andrea (Valle d’Itria, 19 giugno 2027).
La pagina si legge come una partecipazione illustrata: riferimenti di anteprima restano nel `<title>`, nel README e nel codice (transport RSVP), con una nota visibile solo sul cartoncino RSVP e un disclaimer nel footer.

## Comandi

```bash
npm install
npm run assets      # ICS, QR, OG, favicon
npm run dev         # sviluppo (porta 3000 se libera)
npm run typecheck
npm run generate    # esegue anche `assets`, output in `.output/public`
npm run preview     # anteprima della build statica
# oppure: npx serve .output/public -l 4173
```

Output statico da pubblicare: **`.output/public`**.

## Dove modificare contenuti

| Cosa | Dove |
|---|---|
| Testi, orari, feature flags, `siteUrl` | `app/data/invitation.ts` |
| Tipi TypeScript | `app/types/invitation.ts` |
| Colori / font / spaziature dei temi | `app/assets/css/themes.css` |
| Stili globali, focus, reduced-motion, stampa | `app/assets/css/main.css`, `print.css` |
| Illustrazioni SVG | `app/components/illustrations/` |
| Immagini | `public/images/` (+ note in `public/images/ATTRIBUTIONS.md`) |

## Identità visiva

Una sola direzione: carta avorio, verde bosco, rosa cipria, bordeaux e illustrazioni botaniche.
Classi su `<html>`: `theme-mediterraneo` (default), `theme-botanico`, `theme-classico` — variazioni di palette sulla stessa composizione.

Selettore definitivo (tre pallini in basso a destra): visibile **solo** con `?demo=1`. Senza parametro non è nel DOM. Con `?demo=1` la scelta si salva in `localStorage`.

## Sezioni opzionali

In `invitation.features` (tutte `false` di default):

- `listaNozze`, `faq`, `accommodations`, `shuttle`, `gallery`, `qrCode`

Attivarle cambia solo i flag: i componenti sono già pronti. La lista nozze resta **sotto** l’RSVP.

## siteUrl

`invitation.siteUrl` è un placeholder (`https://invito.example.com`).
Aggiornarlo **prima** di condividere il link reale (serve per `og:image`, QR e testo di condivisione).
Allineare anche la costante in `scripts/generate-static-assets.mjs` e rigenerare gli asset (`npm run assets`).

## RSVP

Interfaccia `RsvpTransport` in `app/utils/rsvpTransport.ts`.

- Attivo: `createDemoTransport()` (ritardo simulato, nessuna rete, nessun salvataggio).
- Futuro: in `createRsvpTransport()` restituire `createFormspreeTransport('https://formspree.io/f/…')`.

Senza JavaScript il modulo è nascosto e compare un messaggio in `<noscript>`.

## File statici generati

- `public/evento.ics` — calendario
- `public/qr-invito.svg` — QR verso `siteUrl`
- `public/og-image.png` — 1200×630 per WhatsApp / Open Graph
- `public/favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`

## Asset e licenze

Vedi `public/images/ATTRIBUTIONS.md` (Unsplash License per le fotografie; illustrazioni originali).

## Limiti noti

- `siteUrl` e QR puntano al placeholder finché non li aggiornate.
- Le fotografie sono dettagli nuziali (bouquet, mani, fedi), non ritratti di Giulia e Andrea.
- `npm run generate` può mostrare un WARN Nitro/H3 su import inutilizzati (upstream Nuxt), senza bloccare la build.
