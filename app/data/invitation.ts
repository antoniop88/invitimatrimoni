import type { InvitationConfig } from '~/types/invitation'

/**
 * Central invitation content for Giulia & Andrea.
 * Preview wording must never appear in visible page body text,
 * except the RSVP demo note and the footer disclaimer.
 *
 * RSVP transport: see `app/utils/rsvpTransport.ts` (demo mode in code/README only).
 */
export const invitation: InvitationConfig = {
  // DEV PLACEHOLDER — replace with the real public URL before sharing the link.
  siteUrl: 'https://invito.example.com',
  couple: {
    partnerOne: 'Giulia',
    partnerTwo: 'Andrea',
    displayName: 'Giulia & Andrea',
    monogram: 'G&A',
  },
  datetime: {
    date: '2027-06-19',
    dateLabel: '19 giugno 2027',
    ceremonyTime: '16:30',
    aperitivoTime: '18:00',
    dinnerTime: '20:00',
    partyTime: '22:00',
    ceremonyAt: '2027-06-19T16:30:00+02:00',
    timezone: 'Europe/Rome',
  },
  location: {
    name: 'Masseria degli Ulivi',
    address: '',
    city: '',
    territory: 'Valle d\'Itria, Puglia',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Valle+d%27Itria',
    mapLabel: 'Esplora la Valle d\'Itria',
    notes: '',
  },
  schedule: [
    {
      time: '16:30',
      title: 'Il nostro sì',
      description: 'Cerimonia simbolica nel giardino, tra gli ulivi.',
      moment: 'ceremony',
    },
    {
      time: '18:00',
      title: 'Un brindisi insieme',
      description: 'Bicchieri alzati, luce bassa e chiacchiere leggere.',
      moment: 'toast',
    },
    {
      time: '20:00',
      title: 'A tavola sotto le stelle',
      description: 'Cena nel cortile, con i sapori di casa.',
      moment: 'dinner',
    },
    {
      time: '22:00',
      title: 'Si balla!',
      description: 'Musica, risate e la notte che continua quanto vorrete.',
      moment: 'dance',
    },
  ],
  images: {
    moment: {
      src: '/images/moment-insieme.jpg',
      alt: 'Sposi al tramonto, il bouquet tra le mani, i volti fuori campo',
      width: 1600,
      height: 1067,
      caption: 'Il posto più bello è insieme.',
    },
    story: [
      {
        src: '/images/story/mani.jpg',
        alt: 'Due mani con le fedi, poggiate su un bouquet di rose cipria',
        width: 1200,
        height: 800,
        caption: 'Le mani, già una promessa.',
      },
      {
        src: '/images/story/anelli.jpg',
        alt: 'Due fedi d’oro adagiate su rose rosa e fiori di campo',
        width: 1200,
        height: 800,
        caption: 'Due anelli, la stessa luce.',
      },
    ],
    gallery: [
      {
        src: '/images/gallery/01.jpg',
        alt: 'Sentiero nel bosco attraversato dalla luce',
        width: 1000,
        height: 666,
      },
      {
        src: '/images/gallery/02.jpg',
        alt: 'Cime illuminate al mattino',
        width: 1000,
        height: 667,
      },
      {
        src: '/images/gallery/03.jpg',
        alt: 'Orizzonte aperto sulle colline',
        width: 1000,
        height: 667,
      },
    ],
    qrCode: {
      src: '/qr-invito.svg',
      alt: 'Codice QR per aprire l\'invito',
      width: 256,
      height: 256,
    },
  },
  links: {
    rsvp: '#rsvp',
    registry: '#lista-nozze',
    accommodations: '#alloggi',
    shuttle: '#navetta',
  },
  nav: [
    { id: 'si', label: 'Il nostro sì', href: '#si' },
    { id: 'noi', label: 'Noi due', href: '#noi-due' },
    { id: 'giornata', label: 'La giornata', href: '#giornata' },
    { id: 'rsvp', label: 'Ci sarai?', href: '#rsvp' },
  ],
  rsvpDeadline: '2027-05-20',
  rsvpDeadlineLabel: '20 maggio 2027',
  sections: {
    opening: {
      kicker: 'Con gioia vi invitiamo al nostro matrimonio',
      closingLine: 'Il nostro sì, insieme a voi',
      scrollLabel: 'Vi aspettiamo',
    },
    moment: {
      caption: 'Il posto più bello è insieme.',
    },
    invitation: {
      lines: [
        'Ci sono giorni che vuoi ricordare per sempre.',
        'Il nostro vorremmo viverlo con voi.',
      ],
      body: 'Il 19 giugno 2027, alle 16:30, ci scambieremo il sì nel giardino della Masseria degli Ulivi, in Valle d’Itria. Poi restiamo insieme: un brindisi, la cena sotto le stelle e la festa che continua.',
    },
    countdown: {
      label: 'Manca ancora',
      completedMessage: 'Il nostro giorno è arrivato. Grazie di esserci.',
    },
    story: {
      title: 'Noi due',
      body: 'Ci siamo conosciuti a una cena tra amici, a Bari. Andrea aveva portato troppo pane, Giulia aveva riso troppo. Da quelle risate sono nate passeggiate lunghe, telefonate tarde e la quiete di voler costruire una casa comune. Oggi scegliamo di dirlo tra gli ulivi della Valle d’Itria, con voi accanto.',
    },
    place: {
      title: 'Il luogo del nostro sì',
      atmosphere: [
        'Una masseria tra gli ulivi, pietra chiara e aria di giugno.',
        'Tutto nello stesso giardino: il sì, la tavola, la festa.',
      ],
      ceremonyNote: 'Cerimonia alle 16:30',
      celebrationNote: 'Festeggiamenti a seguire',
    },
    details: {
      title: 'Piccole cose da sapere',
      items: [
        {
          title: 'Arrivo',
          body: 'Arrivate circa 30 minuti prima.',
        },
        {
          title: 'Abito',
          body: 'Indossate qualcosa di elegante e scarpe comode per il giardino.',
        },
        {
          title: 'Parcheggio',
          body: 'Il parcheggio è previsto presso la location della demo.',
        },
        {
          title: 'Conferma',
          body: 'Fateci sapere se ci sarete entro il 20 maggio 2027.',
        },
      ],
    },
    schedule: {
      title: 'La giornata',
      intro: 'Quattro momenti, un solo giardino.',
      ceremonyTitle: 'Cerimonia',
      ceremonyBody: 'Alle 16:30 ci scambieremo il sì nel giardino della Masseria degli Ulivi.',
      receptionTitle: 'Ricevimento',
      receptionBody: 'Dal brindisi alla cena, fino alla musica: tutto nello stesso luogo.',
    },
    rsvp: {
      title: 'Ci sarai?',
      body: 'Ci farebbe felici averti con noi.',
      ctaLabel: 'Prova la conferma',
      demoNote: 'Questa è una demo: la risposta non verrà inviata.',
      closedMessage: 'Le conferme sono chiuse. Per qualsiasi necessità, scriveteci direttamente.',
      successAttending: 'Se fosse l’invito vero, avremmo ricevuto la tua presenza. Grazie — non vediamo l’ora di festeggiare con voi.',
      successDeclined: 'Se fosse l’invito vero, avremmo ricevuto il tuo messaggio. Grazie per avercelo fatto sapere: vi portiamo con noi lo stesso.',
      previewLabel: 'Anteprima della conferma — nulla è stato inviato.',
    },
    registry: {
      title: 'Un pensiero per noi',
      body: 'La vostra presenza è già il regalo più bello. Se desiderate accompagnarla con un gesto, potete usare queste coordinate.',
      iban: 'IT60X0542811101000000123456',
      ibanHolder: 'Giulia Rossi e Andrea Bianchi',
    },
    faq: {
      title: 'Domande frequenti',
      items: [
        {
          question: 'I bambini sono i benvenuti?',
          answer: 'Sì, i bambini sono i benvenuti. Se avete esigenze particolari, segnalatele nella conferma.',
        },
        {
          question: 'Posso portare un accompagnatore?',
          answer: 'Se l\'invito lo prevede, sì. Indicate il nome nella conferma così potremo organizzarci al meglio.',
        },
        {
          question: 'A che ora è meglio arrivare?',
          answer: 'Consigliamo di arrivare intorno alle 16:00, per sistemarvi con calma prima della cerimonia.',
        },
        {
          question: 'C\'è parcheggio?',
          answer: 'Sì, in loco. Il personale vi indicherà dove lasciare l\'auto all\'arrivo.',
        },
        {
          question: 'Qual è il dress code?',
          answer: 'Elegante, con attenzione alle scarpe: parte della giornata si svolge all\'aperto.',
        },
      ],
    },
    accommodations: {
      title: 'Dove dormire',
      intro: 'Alcune idee vicine alla masseria, per chi desidera restare in zona.',
      stays: [
        {
          name: 'Cascina del Vento',
          distance: 'circa 8 minuti',
          notes: 'Camere semplici con giardino e colazione inclusa.',
        },
        {
          name: 'Corte delle Rose',
          distance: 'circa 12 minuti',
          notes: 'Piccolo hotel di charme nel centro storico più vicino.',
        },
        {
          name: 'Trullo Bianco',
          distance: 'circa 18 minuti',
          notes: 'Due trulli ristrutturati, ideali per chi viaggia in famiglia.',
        },
      ],
    },
    shuttle: {
      title: 'Navetta',
      intro: 'Per chi preferisce non guidare, organizziamo un passaggio condiviso.',
      legs: [
        {
          label: 'Andata',
          time: '15:30',
          place: 'Piazza del Paese — fermata davanti alla chiesa',
        },
        {
          label: 'Ritorno',
          time: '00:30',
          place: 'Partenza dalla masseria, stesso punto di raccolta',
        },
      ],
    },
    gallery: {
      title: 'I nostri scatti',
      caption: 'Qualche momento che amiamo, in attesa di aggiungerne altri con voi.',
    },
    qr: {
      title: 'Salva l\'invito',
      caption: 'Inquadra il codice per riaprire questa pagina.',
    },
    closing: {
      line: 'Vi aspettiamo',
      credit: 'Realizzato con cura da upstudio',
      disclaimer: 'Nomi, luoghi e dettagli di questa pagina sono dimostrativi.',
    },
    share: {
      buttonLabel: 'Condividi l\'invito',
      copiedLabel: 'Link copiato.',
      text: 'Sei invitato al matrimonio di Giulia e Andrea — 19 giugno 2027, Valle d\'Itria.',
    },
    calendar: {
      icsLabel: 'Aggiungi al calendario',
      googleLabel: 'Apri in Google Calendar',
      icsHref: '/evento.ics',
      // 16:30–00:30 Europe/Rome (CEST) → 14:30–22:30 UTC
      googleHref: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Matrimonio%20Giulia%20%26%20Andrea&dates=20270619T143000Z%2F20270619T223000Z&details=Cerimonia%20e%20festeggiamenti%20%E2%80%94%20Masseria%20degli%20Ulivi&location=Valle%20d%27Itria%2C%20Puglia',
      monthLabel: 'Giugno 2027',
      weekdays: ['L', 'M', 'M', 'G', 'V', 'S', 'D'],
      highlightedDay: 19,
    },
  },
  features: {
    listaNozze: false,
    faq: false,
    accommodations: false,
    shuttle: false,
    gallery: false,
    qrCode: false,
  },
}
