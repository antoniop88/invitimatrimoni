/**
 * Build-time static assets: OG image, QR code SVG, calendar ICS.
 * Run via: node scripts/generate-static-assets.mjs
 */
import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import QRCode from 'qrcode'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const publicDir = join(root, 'public')

/** Must match invitation.siteUrl — replace before real sharing. */
const SITE_URL = 'https://invito.example.com'

mkdirSync(join(publicDir, 'images'), { recursive: true })
mkdirSync(join(publicDir, 'icons'), { recursive: true })

// ——— ICS ———
const ics = [
  'BEGIN:VCALENDAR',
  'VERSION:2.0',
  'PRODID:-//upstudio//Invito Giulia Andrea//IT',
  'CALSCALE:GREGORIAN',
  'METHOD:PUBLISH',
  'BEGIN:VEVENT',
  'UID:giulia-andrea-20270619@upstudio',
  'DTSTAMP:20260101T120000Z',
  'DTSTART;TZID=Europe/Rome:20270619T163000',
  'DTEND;TZID=Europe/Rome:20270620T003000',
  'SUMMARY:Matrimonio Giulia & Andrea',
  'DESCRIPTION:Cerimonia e festeggiamenti — Masseria degli Ulivi\\, Valle d\'Itria.',
  'LOCATION:Valle d\'Itria\\, Puglia',
  'END:VEVENT',
  'END:VCALENDAR',
  '',
].join('\r\n')

writeFileSync(join(publicDir, 'evento.ics'), ics, 'utf8')
console.log('Wrote public/evento.ics')

// ——— QR ———
const qrSvg = await QRCode.toString(SITE_URL, {
  type: 'svg',
  margin: 1,
  width: 256,
  color: { dark: '#34473E', light: '#FAF6EF' },
  errorCorrectionLevel: 'M',
})
writeFileSync(join(publicDir, 'qr-invito.svg'), qrSvg, 'utf8')
console.log('Wrote public/qr-invito.svg')

// ——— OG 1200×630 ———
const ogSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#FAF6EF"/>
  <rect x="56" y="48" width="1088" height="534" rx="28" fill="none" stroke="#34473E" stroke-width="1.4" opacity="0.45"/>
  <rect x="72" y="64" width="1056" height="502" rx="22" fill="none" stroke="#34473E" stroke-width="0.8" opacity="0.28"/>
  <path d="M160 150c40-48 96-36 110 8" fill="none" stroke="#34473E" stroke-width="1.6" stroke-linecap="round"/>
  <ellipse cx="148" cy="118" rx="16" ry="28" transform="rotate(-32 148 118)" fill="#EBDAD5" stroke="#34473E" stroke-width="1.2"/>
  <ellipse cx="188" cy="96" rx="14" ry="24" transform="rotate(12 188 96)" fill="#D8C8B7" stroke="#34473E" stroke-width="1.2"/>
  <circle cx="210" cy="132" r="8" fill="#793E49"/>
  <path d="M1000 470c48 28 92 8 108-28" fill="none" stroke="#34473E" stroke-width="1.6" stroke-linecap="round"/>
  <ellipse cx="1068" cy="508" rx="16" ry="26" transform="rotate(38 1068 508)" fill="#EBDAD5" stroke="#34473E" stroke-width="1.2"/>
  <text x="600" y="210" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="28" fill="#5A6B63" letter-spacing="6">G &amp; A</text>
  <text x="600" y="320" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="78" fill="#34473E">Giulia &amp; Andrea</text>
  <text x="600" y="390" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="30" fill="#34473E">19 giugno 2027</text>
  <text x="600" y="448" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="22" fill="#5A6B63">Masseria degli Ulivi · Valle d'Itria</text>
</svg>`

const ogPng = await sharp(Buffer.from(ogSvg)).png().toBuffer()
writeFileSync(join(publicDir, 'og-image.png'), ogPng)
console.log('Wrote public/og-image.png')

// ——— Favicons from monogram SVG ———
const iconSvg = (size) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 128 128">
  <rect width="128" height="128" fill="#FAF6EF"/>
  <circle cx="64" cy="64" r="46" fill="none" stroke="#793E49" stroke-width="2"/>
  <text x="64" y="76" text-anchor="middle" font-family="Georgia, serif" font-size="36" fill="#34473E">G&amp;A</text>
</svg>`

await sharp(Buffer.from(iconSvg(32))).png().toFile(join(publicDir, 'favicon-32.png'))
await sharp(Buffer.from(iconSvg(180))).png().toFile(join(publicDir, 'apple-touch-icon.png'))
await sharp(Buffer.from(iconSvg(192))).png().toFile(join(publicDir, 'icons/icon-192.png'))
await sharp(Buffer.from(iconSvg(512))).png().toFile(join(publicDir, 'icons/icon-512.png'))

// Simple favicon.ico as 32png copy for modern browsers (also keep svg)
writeFileSync(join(publicDir, 'favicon.svg'), iconSvg(128), 'utf8')
console.log('Wrote public favicons')

console.log('siteUrl used:', SITE_URL)
