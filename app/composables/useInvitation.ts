import { invitation } from '~/data/invitation'
import type { InvitationConfig } from '~/types/invitation'

/** Shared access to the typed invitation config. */
export function useInvitation(): InvitationConfig {
  return invitation
}
