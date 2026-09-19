/**
 * WhatsApp click-to-chat helpers for a static RSVP (no backend).
 */

const E164_MIN = 10
const E164_MAX = 15

/** Strip everything except digits. Does not invent a country prefix. */
export function whatsappDigits(raw: string): string {
  return raw.replace(/\D/g, '')
}

export function isUsableWhatsappNumber(raw: string): boolean {
  const digits = whatsappDigits(raw)
  return digits.length >= E164_MIN && digits.length <= E164_MAX
}

/**
 * `https://wa.me/NUMBER?text=ENCODED`
 * Encodes the message once. Returns null if the number is unusable.
 */
export function buildWhatsappUrl(rawNumber: string, message: string): string | null {
  if (!isUsableWhatsappNumber(rawNumber)) return null
  const digits = whatsappDigits(rawNumber)
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
}
