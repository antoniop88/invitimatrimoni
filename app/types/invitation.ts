/**
 * Typed configuration for the wedding invitation landing page.
 */

export interface InvitationCouple {
  partnerOne: string
  partnerTwo: string
  /** Combined display name, e.g. "Giulia & Andrea" */
  displayName: string
  /** Short monogram, e.g. "G&A" */
  monogram: string
}

export interface InvitationDateTime {
  /** ISO date string (YYYY-MM-DD) */
  date: string
  /** Human-readable date for display */
  dateLabel: string
  ceremonyTime: string
  aperitivoTime: string
  dinnerTime: string
  partyTime: string
  /**
   * Absolute ceremony instant with offset for Europe/Rome in June (CEST, UTC+2).
   * Example: 2027-06-19T16:30:00+02:00
   */
  ceremonyAt: string
  /** IANA timezone, e.g. Europe/Rome */
  timezone: string
}

export interface InvitationLocation {
  name: string
  /** Optional real address — empty in the demo */
  address: string
  city: string
  territory: string
  /** Map search / directions URL (territory-level, not a fake precise address) */
  mapUrl: string
  mapLabel: string
  notes: string
}

export interface InvitationScheduleItem {
  time: string
  title: string
  description: string
  /** Illustration key for the day programme */
  moment: 'ceremony' | 'toast' | 'dinner' | 'dance'
}

export interface InvitationImage {
  src: string
  alt: string
  width?: number
  height?: number
  caption?: string
}

export interface InvitationLinks {
  rsvp: string
  registry: string
  accommodations: string
  shuttle: string
}

export interface InvitationNavItem {
  id: string
  label: string
  href: string
}

export interface InvitationInfoItem {
  title: string
  body: string
}

export interface InvitationFaqItem {
  question: string
  answer: string
}

export interface InvitationStay {
  name: string
  distance: string
  notes: string
}

export interface InvitationShuttleLeg {
  label: string
  time: string
  place: string
}

export interface InvitationRegistry {
  title: string
  body: string
  iban: string
  ibanHolder: string
}

export interface InvitationClosing {
  line: string
  credit: string
  disclaimer: string
}

export interface InvitationSections {
  opening: {
    kicker: string
    closingLine: string
    scrollLabel: string
  }
  moment: {
    caption: string
  }
  invitation: {
    lines: string[]
    body: string
  }
  countdown: {
    label: string
    completedMessage: string
  }
  story: {
    title: string
    body: string
  }
  place: {
    title: string
    atmosphere: string[]
    ceremonyNote: string
    celebrationNote: string
  }
  details: {
    title: string
    items: InvitationInfoItem[]
  }
  schedule: {
    title: string
    intro: string
    ceremonyTitle: string
    ceremonyBody: string
    receptionTitle: string
    receptionBody: string
  }
  rsvp: {
    title: string
    body: string
    ctaLabel: string
    demoNote: string
    closedMessage: string
    successAttending: string
    successDeclined: string
    previewLabel: string
  }
  registry: InvitationRegistry
  faq: {
    title: string
    items: InvitationFaqItem[]
  }
  accommodations: {
    title: string
    intro: string
    stays: InvitationStay[]
  }
  shuttle: {
    title: string
    intro: string
    legs: InvitationShuttleLeg[]
  }
  gallery: {
    title: string
    caption: string
  }
  qr: {
    title: string
    caption: string
  }
  closing: InvitationClosing
  share: {
    buttonLabel: string
    copiedLabel: string
    text: string
  }
  calendar: {
    icsLabel: string
    googleLabel: string
    /** Absolute or root-relative path to static .ics */
    icsHref: string
    googleHref: string
    monthLabel: string
    weekdays: string[]
    highlightedDay: number
  }
}

/**
 * Optional sections toggled per invitation.
 * Kept false until explicitly enabled.
 */
export interface InvitationFeatures {
  /** Gift list / lista nozze — never render above RSVP */
  listaNozze: boolean
  faq: boolean
  accommodations: boolean
  shuttle: boolean
  gallery: boolean
  qrCode: boolean
}

export interface InvitationConfig {
  /**
   * Absolute site origin used for OG image, QR, and share links.
   * DEV PLACEHOLDER — replace with the real public URL before sharing.
   */
  siteUrl: string
  couple: InvitationCouple
  datetime: InvitationDateTime
  location: InvitationLocation
  schedule: InvitationScheduleItem[]
  images: {
    moment: InvitationImage
    story: InvitationImage[]
    gallery: InvitationImage[]
    qrCode: InvitationImage
  }
  links: InvitationLinks
  nav: InvitationNavItem[]
  /** RSVP deadline as ISO date (YYYY-MM-DD) */
  rsvpDeadline: string
  rsvpDeadlineLabel: string
  sections: InvitationSections
  features: InvitationFeatures
}
