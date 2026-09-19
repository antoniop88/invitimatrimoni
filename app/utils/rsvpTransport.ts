export type RsvpAttendance = 'yes' | 'no'

export interface RsvpPayload {
  firstName: string
  lastName: string
  attendance: RsvpAttendance
  guestCount: number
  /** Companion names for future real integrations */
  companionNames: string[]
  message: string
}

export interface RsvpSubmitResult {
  ok: boolean
  message: string
}

/**
 * Transport abstraction: the RSVP UI depends only on this contract.
 * Switch demo → Formspree/webhook by changing the factory in config, not the form.
 */
export interface RsvpTransport {
  readonly mode: 'demo' | 'formspree' | 'webhook'
  submit(payload: RsvpPayload): Promise<RsvpSubmitResult>
}

export function createDemoTransport(): RsvpTransport {
  return {
    mode: 'demo',
    async submit(_payload: RsvpPayload): Promise<RsvpSubmitResult> {
      // Simulated latency only — no network. Payload intentionally unused.
      await new Promise(resolve => setTimeout(resolve, 600))
      return {
        ok: true,
        message: 'ok',
      }
    },
  }
}

/**
 * Future Formspree integration.
 * Wire by returning this from the RSVP factory with a real endpoint.
 */
export function createFormspreeTransport(endpoint: string): RsvpTransport {
  return {
    mode: 'formspree',
    async submit(payload: RsvpPayload): Promise<RsvpSubmitResult> {
      // TODO: POST payload to Formspree endpoint and map the response.
      void endpoint
      void payload
      throw new Error('Formspree transport is not configured yet.')
    },
  }
}

/** Active transport for this invitation build. Change one line to go live. */
export function createRsvpTransport(): RsvpTransport {
  return createDemoTransport()
  // return createFormspreeTransport('https://formspree.io/f/xxxxxxxx')
}
