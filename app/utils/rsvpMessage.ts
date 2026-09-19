export type RsvpAttendance = 'yes' | 'no'

export interface RsvpDraft {
  fullName: string
  attendance: RsvpAttendance | ''
  guestCount: number | null
  companionNames: string
  personalMessage: string
}

export interface RsvpMessageContext {
  partnerOne: string
  partnerTwo: string
  dateLabel: string
}

function greeting(ctx: RsvpMessageContext, emoji: string): string {
  return `Ciao ${ctx.partnerOne} e ${ctx.partnerTwo}! ${emoji}`
}

function withPersonal(body: string, personal: string): string {
  return personal ? `${body}\n\n${personal}` : body
}

/**
 * Natural WhatsApp copy. Omits empty sections, hidden-field data, and placeholders.
 * Names and the wedding date always come from `ctx`, never from hardcoded strings.
 */
export function buildRsvpMessage(draft: RsvpDraft, ctx: RsvpMessageContext): string {
  const name = draft.fullName.trim()
  if (!name || (draft.attendance !== 'yes' && draft.attendance !== 'no')) {
    return ''
  }

  const personal = draft.personalMessage.trim()

  if (draft.attendance === 'no') {
    return withPersonal(
      [
        greeting(ctx, '🤍'),
        `Sono ${name}. Purtroppo non potrò esserci al vostro matrimonio del ${ctx.dateLabel}.`,
        'Vi auguro una giornata meravigliosa e vi mando un grande abbraccio!',
      ].join('\n'),
      personal,
    )
  }

  const count = Number.isInteger(draft.guestCount) ? Number(draft.guestCount) : 1

  if (count <= 1) {
    return withPersonal(
      [
        greeting(ctx, '🎉'),
        `Sono ${name} e ci sarò al vostro matrimonio del ${ctx.dateLabel}!`,
        'Non vedo l’ora di festeggiare con voi. 🥂',
      ].join('\n'),
      personal,
    )
  }

  const companions = draft.companionNames.trim()
  const blocks = [
    [
      greeting(ctx, '🎉'),
      `Sono ${name} e confermo che saremo in ${count} al vostro matrimonio del ${ctx.dateLabel}.`,
    ].join('\n'),
  ]
  if (companions) blocks.push(`Con me: ${companions}.`)
  blocks.push('Non vediamo l’ora di festeggiare con voi! 🥂')

  return withPersonal(blocks.join('\n\n'), personal)
}
