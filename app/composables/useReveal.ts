import { prefersReducedMotion } from '~/composables/usePrefersReducedMotion'

const FAILSAFE_MS = 2800

/**
 * One-shot viewport reveals via IntersectionObserver.
 * Content stays visible without JS: pending/hidden classes are added only on the client.
 */
export function useReveal(root: Ref<HTMLElement | null>) {
  let io: IntersectionObserver | null = null
  let failsafe: ReturnType<typeof setTimeout> | null = null
  const observed = new Set<Element>()

  function reveal(el: Element) {
    el.classList.add('is-in')
    io?.unobserve(el)
    observed.delete(el)
  }

  function revealAll() {
    for (const el of [...observed]) reveal(el)
  }

  function teardown() {
    if (failsafe) {
      clearTimeout(failsafe)
      failsafe = null
    }
    io?.disconnect()
    io = null
    observed.clear()
  }

  function setup() {
    teardown()
    const el = root.value
    if (!el || prefersReducedMotion()) return
    if (typeof IntersectionObserver === 'undefined') return

    const nodes = el.querySelectorAll<HTMLElement>('[data-reveal], [data-reveal-line]')
    if (!nodes.length) return

    io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        reveal(entry.target)
      }
      if (observed.size === 0 && failsafe) {
        clearTimeout(failsafe)
        failsafe = null
      }
    }, {
      threshold: 0.16,
      rootMargin: '0px 0px -10% 0px',
    })

    for (const node of nodes) {
      node.classList.add('is-pending')
      observed.add(node)
      io.observe(node)
    }

    failsafe = setTimeout(() => {
      if (observed.size === nodes.length) revealAll()
      failsafe = null
    }, FAILSAFE_MS)
  }

  onMounted(() => {
    setup()
  })

  onUnmounted(() => {
    teardown()
  })
}
