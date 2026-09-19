import { getWindow, isClient } from '~/composables/useBrowser'

/** One-shot check. Defaults to reduced on the server so prerender stays still. */
export function prefersReducedMotion(): boolean {
  if (!isClient()) return true
  return getWindow()?.matchMedia('(prefers-reduced-motion: reduce)').matches ?? true
}

/** Reactive match for components that must tear down motion on preference change. */
export function usePrefersReducedMotion() {
  const reduced = ref(true)
  let media: MediaQueryList | null = null

  function sync() {
    reduced.value = media ? media.matches : prefersReducedMotion()
  }

  function onChange() {
    sync()
  }

  onMounted(() => {
    media = getWindow()?.matchMedia('(prefers-reduced-motion: reduce)') ?? null
    sync()
    media?.addEventListener('change', onChange)
  })

  onUnmounted(() => {
    media?.removeEventListener('change', onChange)
    media = null
  })

  return reduced
}
