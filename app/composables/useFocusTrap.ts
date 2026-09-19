import { getDocument, isClient } from '~/composables/useBrowser'

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

function getFocusable(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
    .filter(el => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true')
}

/**
 * Lightweight focus trap for the mobile navigation drawer.
 */
export function useFocusTrap(containerRef: Ref<HTMLElement | null>) {
  function onKeydown(event: KeyboardEvent) {
    if (event.key !== 'Tab') return
    const container = containerRef.value
    if (!container) return

    const focusable = getFocusable(container)
    if (focusable.length === 0) {
      event.preventDefault()
      return
    }

    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (!first || !last) return

    const doc = getDocument()
    const active = doc?.activeElement as HTMLElement | null

    if (event.shiftKey && active === first) {
      event.preventDefault()
      last.focus()
      return
    }

    if (!event.shiftKey && active === last) {
      event.preventDefault()
      first.focus()
    }
  }

  function activate() {
    if (!isClient()) return
    const doc = getDocument()
    doc?.addEventListener('keydown', onKeydown)
  }

  function deactivate() {
    if (!isClient()) return
    const doc = getDocument()
    doc?.removeEventListener('keydown', onKeydown)
  }

  function focusFirst() {
    const container = containerRef.value
    if (!container) return
    const focusable = getFocusable(container)
    focusable[0]?.focus()
  }

  return {
    activate,
    deactivate,
    focusFirst,
  }
}
