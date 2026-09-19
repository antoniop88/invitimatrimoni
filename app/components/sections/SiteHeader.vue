<script setup lang="ts">
import { getDocument, getWindow } from '~/composables/useBrowser'
import { prefersReducedMotion } from '~/composables/usePrefersReducedMotion'

const invitation = useInvitation()
const navRef = ref<HTMLElement | null>(null)
const listRef = ref<HTMLElement | null>(null)
const linkRefs = new Map<string, HTMLAnchorElement>()
const stuck = ref(false)
const activeHref = ref('')
const ink = reactive({ x: 0, y: 0, w: 0, visible: false })

const sectionIds = invitation.nav.map(item => item.href.replace('#', ''))

function updateInk() {
  const list = listRef.value
  const link = linkRefs.get(activeHref.value)
  if (!list || !link || prefersReducedMotion()) {
    ink.visible = false
    return
  }
  const lr = link.getBoundingClientRect()
  const pr = list.getBoundingClientRect()
  ink.x = lr.left - pr.left
  ink.y = lr.bottom - pr.top - 3
  ink.w = lr.width
  ink.visible = ink.w > 0
}

function setLinkRef(href: string, el: unknown) {
  if (el instanceof HTMLAnchorElement) {
    linkRefs.set(href, el)
    return
  }
  linkRefs.delete(href)
}

function setActive(href: string) {
  if (activeHref.value === href) {
    updateInk()
    return
  }
  activeHref.value = href
  nextTick(updateInk)
}

function sectionFromHash(): string {
  const hash = getWindow()?.location.hash ?? ''
  if (invitation.nav.some(item => item.href === hash)) return hash
  return ''
}

function hrefFromScroll(): string {
  const doc = getDocument()
  const win = getWindow()
  const nav = navRef.value
  if (!doc || !win || !nav) return ''

  const navBottom = nav.getBoundingClientRect().bottom
  const pad = Number.parseFloat(getComputedStyle(doc.documentElement).scrollPaddingTop) || 0
  const line = Math.max(navBottom + 16, pad + 12)
  let current = ''
  for (const id of sectionIds) {
    const el = doc.getElementById(id)
    if (!el) continue
    if (el.getBoundingClientRect().top <= line) current = `#${id}`
  }

  const atBottom = win.scrollY + win.innerHeight >= doc.documentElement.scrollHeight - 8
  if (atBottom) {
    const last = sectionIds[sectionIds.length - 1]
    if (last) current = `#${last}`
  }

  return current
}

let stickyObserver: IntersectionObserver | null = null
let resizeObserver: ResizeObserver | null = null
let clickLock: string | null = null
let pinnedHref: string | null = null
let pinY: number | null = null
let unlockTimer: ReturnType<typeof setTimeout> | null = null
let settleTimer: ReturnType<typeof setTimeout> | null = null
let ticking = false

function clearLockTimers() {
  if (unlockTimer) {
    clearTimeout(unlockTimer)
    unlockTimer = null
  }
  if (settleTimer) {
    clearTimeout(settleTimer)
    settleTimer = null
  }
}

function unlockSpy() {
  clickLock = null
  pinY = getWindow()?.scrollY ?? 0
  clearLockTimers()
}

function armSettleUnlock() {
  if (settleTimer) clearTimeout(settleTimer)
  settleTimer = setTimeout(() => {
    settleTimer = null
    unlockSpy()
  }, 220)
}

function onNavClick(href: string) {
  clickLock = href
  pinnedHref = href
  pinY = null
  setActive(href)
  clearLockTimers()
  unlockTimer = setTimeout(unlockSpy, 1800)
}

function onScroll() {
  const win = getWindow()
  if (clickLock) {
    armSettleUnlock()
    return
  }
  if (pinnedHref && pinY != null && win && Math.abs(win.scrollY - pinY) < 120) {
    return
  }
  pinnedHref = null
  pinY = null
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    ticking = false
    if (clickLock || pinnedHref) return
    const href = hrefFromScroll()
    if (href) setActive(href)
  })
}

function onHashChange() {
  const href = sectionFromHash()
  if (!href) return
  if (clickLock && clickLock !== href) return
  setActive(href)
}

onMounted(() => {
  const nav = navRef.value
  const win = getWindow()
  const doc = getDocument()
  if (!nav || !win || !doc) return

  const initial = sectionFromHash() || hrefFromScroll()
  if (initial) setActive(initial)

  stickyObserver = new IntersectionObserver(
    ([entry]) => {
      stuck.value = !!entry && entry.intersectionRatio < 1
    },
    { threshold: [1], rootMargin: '-1px 0px 0px 0px' },
  )
  stickyObserver.observe(nav)

  resizeObserver = new ResizeObserver(() => updateInk())
  if (listRef.value) resizeObserver.observe(listRef.value)

  win.addEventListener('scroll', onScroll, { passive: true })
  win.addEventListener('hashchange', onHashChange)
})

onUnmounted(() => {
  stickyObserver?.disconnect()
  resizeObserver?.disconnect()
  clearLockTimers()
  const win = getWindow()
  win?.removeEventListener('scroll', onScroll)
  win?.removeEventListener('hashchange', onHashChange)
})

watch(activeHref, () => nextTick(updateInk))
</script>

<template>
  <nav
    ref="navRef"
    class="site-header"
    :class="{ 'site-header--stuck': stuck }"
    :aria-label="`Sezioni dell'invito`"
  >
    <div
      ref="listRef"
      class="site-header__track"
    >
      <ul class="site-header__list">
        <li
          v-for="item in invitation.nav"
          :key="item.id"
        >
          <a
            :ref="(el) => setLinkRef(item.href, el)"
            class="site-header__link"
            :href="item.href"
            :aria-current="activeHref === item.href ? 'page' : undefined"
            @click="onNavClick(item.href)"
          >{{ item.label }}</a>
        </li>
      </ul>
      <span
        class="site-header__ink"
        :class="{ 'site-header__ink--on': ink.visible }"
        :style="{
          transform: `translate3d(${ink.x}px, ${ink.y}px, 0)`,
          width: `${ink.w}px`,
        }"
        aria-hidden="true"
      />
    </div>
  </nav>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 40;
  background: color-mix(in srgb, var(--color-paper) 72%, transparent);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid transparent;
  transition: background-color 220ms ease, border-color 220ms ease, box-shadow 220ms ease;
}

.site-header--stuck {
  background: color-mix(in srgb, var(--color-paper) 94%, transparent);
  border-bottom-color: color-mix(in srgb, var(--color-sand) 80%, transparent);
  box-shadow: 0 1px 0 color-mix(in srgb, var(--color-sand) 35%, transparent);
}

.site-header__track {
  position: relative;
  max-width: 48rem;
  margin-inline: auto;
}

.site-header__list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.1rem 0.15rem;
  list-style: none;
  margin: 0;
  padding: 0.15rem var(--space-page-x);
}

.site-header__list li {
  display: flex;
  align-items: center;
}

.site-header__list li:not(:last-of-type)::after {
  content: '·';
  margin-inline: 0.45rem;
  color: var(--color-sand);
  pointer-events: none;
}

.site-header__link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.75rem;
  min-width: 2.75rem;
  padding: 0.45rem 0.55rem;
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.03em;
  line-height: 1.2;
  text-decoration: none;
  color: var(--color-muted);
  border-radius: 2px;
}

.site-header__link:hover {
  color: var(--color-forest);
}

.site-header__link:focus-visible {
  color: var(--color-forest);
  outline: 2px solid var(--color-bordeaux);
  outline-offset: 2px;
}

.site-header__link[aria-current='page'] {
  color: var(--color-forest);
  text-decoration: underline;
  text-decoration-color: var(--color-bordeaux);
  text-decoration-thickness: 1.5px;
  text-underline-offset: 0.42em;
}

.site-header__ink {
  position: absolute;
  top: 0;
  left: 0;
  height: 1.5px;
  background: var(--color-bordeaux);
  transform-origin: left center;
  opacity: 0;
  pointer-events: none;
  transition: transform 240ms ease, width 240ms ease, opacity 200ms ease;
}

.site-header__ink--on {
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .site-header,
  .site-header__ink {
    transition: none;
  }

  .site-header__ink {
    display: none;
  }
}

@media (prefers-reduced-motion: no-preference) {
  html.js .site-header__link[aria-current='page'] {
    text-decoration: none;
  }
}

@media (max-width: 639px) {
  .site-header__list {
    display: grid;
    grid-template-columns: repeat(2, minmax(8.5rem, auto));
    justify-content: center;
    column-gap: 0.35rem;
    row-gap: 0;
    padding-inline: 0.6rem;
  }

  .site-header__list li:not(:last-of-type)::after {
    content: none;
    margin: 0;
  }

  .site-header__link {
    width: 100%;
    font-size: 0.8125rem;
    padding-inline: 0.7rem;
  }
}
</style>
