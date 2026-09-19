# Invito digitale — Giulia & Andrea

Landing one-page per l’invito di matrimonio di Giulia e Andrea (Valle d’Itria, 19 giugno 2027).
La pagina si legge come una partecipazione illustrata: riferimenti di anteprima restano nel `<title>`, nel README e nel codice, con una nota visibile sul cartoncino RSVP (in modalità demo) e un disclaimer nel footer.

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
| Modalità RSVP e numero WhatsApp | `app/data/invitation.ts` → `rsvpChannel` |
| Tipi TypeScript | `app/types/invitation.ts` |
| Colori / font / spaziature dei temi | `app/assets/css/themes.css` |
| Stili globali, focus, reduced-motion, stampa | `app/assets/css/main.css`, `print.css` |
| Illustrazioni SVG | `app/components/illustrations/` |
| Immagini | `public/images/` (+ note in `public/images/ATTRIBUTIONS.md`) |

## RSVP via WhatsApp

Le conferme non passano da un backend: il sito apre WhatsApp (o, in demo, copia il messaggio) con il testo già pronto. **WhatsApp raccoglie le risposte in chat e non aggiorna automaticamente un elenco invitati.** Chi riceve i messaggi deve registrarli a mano.

Configurazione in `app/data/invitation.ts`:

```ts
rsvpChannel: {
  mode: 'whatsapp',          // oppure 'demo'
  whatsappNumber: '393331234567', // solo cifre, con prefisso internazionale
  maxGuests: 12,
}
```

Regole:

- `whatsappNumber` deve contenere il prefisso internazionale e **sole cifre** (es. `393331234567`). Non viene aggiunto `+39` in automatico.
- Se il numero manca, è vuoto o non è utilizzabile, il sito resta in **modalità demo** anche se `mode` è `'whatsapp'`.
- In demo: anteprima e copia del messaggio, nessuna chat verso numeri fittizi.
- In WhatsApp: dopo «Continua su WhatsApp» si apre `https://wa.me/NUMERO?text=MESSAGGIO`. L’invio effettivo avviene solo quando l’invitato preme Invia nella chat.

Non salvare le risposte in `localStorage`, analytics o log.

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
La condivisione dal browser usa l’origine reale della pagina, senza hash né dati del modulo.

## File statici generati

- `public/evento.ics` — calendario (`Europe/Rome`, inizio 16:30, fine 00:30 come da `datetime.endsAt`)
- `public/qr-invito.svg` — QR verso `siteUrl`
- `public/og-image.png` — 1200×630 per WhatsApp / Open Graph
- `public/favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`

## Location

In demo resta il link di esplorazione della Valle d’Itria.
«Come arrivare» compare solo se in configurazione ci sono `location.address` o `location.directionsUrl` reali. Non inventare l’indirizzo della masseria.

## Asset e licenze

Vedi `public/images/ATTRIBUTIONS.md` (Unsplash License per le fotografie; illustrazioni originali).

## Limiti noti

- `siteUrl` e QR puntano al placeholder finché non li aggiornate.
- Le fotografie sono dettagli nuziali (bouquet, mani, fedi), non ritratti di Giulia e Andrea.
- Le risposte RSVP arrivano in chat WhatsApp: non c’è un database invitati sul sito.
- `npm run generate` può mostrare un WARN Nitro/H3 su import inutilizzati (upstream Nuxt), senza bloccare la build.
