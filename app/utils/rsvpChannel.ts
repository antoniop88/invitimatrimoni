import type { InvitationConfig, RsvpMode } from '~/types/invitation'
import { isUsableWhatsappNumber, whatsappDigits } from '~/utils/whatsapp'

export interface ResolvedRsvpChannel {
  mode: RsvpMode
  whatsappNumber: string
  maxGuests: number
}

/**
 * WhatsApp requires an explicit destination number in config.
 * Missing or unusable numbers always fall back to demo — never guess +39.
 */
export function resolveRsvpChannel(invitation: InvitationConfig): ResolvedRsvpChannel {
  const channel = invitation.rsvpChannel
  const maxGuests = Number.isInteger(channel.maxGuests) && channel.maxGuests > 0
    ? channel.maxGuests
    : 12

  if (channel.mode === 'whatsapp' && isUsableWhatsappNumber(channel.whatsappNumber)) {
    return {
      mode: 'whatsapp',
      whatsappNumber: whatsappDigits(channel.whatsappNumber),
      maxGuests,
    }
  }

  return {
    mode: 'demo',
    whatsappNumber: '',
    maxGuests,
  }
}
