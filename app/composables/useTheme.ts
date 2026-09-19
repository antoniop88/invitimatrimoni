import { getLocalStorage, isClient } from '~/composables/useBrowser'

export const THEME_IDS = [
  'theme-mediterraneo',
  'theme-botanico',
  'theme-classico',
] as const

export type ThemeId = (typeof THEME_IDS)[number]

export const DEFAULT_THEME: ThemeId = 'theme-mediterraneo'
export const THEME_STORAGE_KEY = 'invito-theme'

export const THEME_LABELS: Record<ThemeId, string> = {
  'theme-mediterraneo': 'Mediterraneo',
  'theme-botanico': 'Botanico',
  'theme-classico': 'Classico',
}

function isThemeId(value: string | null | undefined): value is ThemeId {
  return !!value && (THEME_IDS as readonly string[]).includes(value)
}

/**
 * Theme class on <html>, driven via `useHead`.
 * SSR / prerender always start from DEFAULT_THEME.
 * localStorage is applied only when `?demo=1` is present (theme studio mode).
 */
export function useTheme() {
  const theme = useState<ThemeId>('invito-theme', () => DEFAULT_THEME)
  const route = useRoute()

  const isDemoMode = computed(() => String(route.query.demo ?? '') === '1')

  useHead(() => ({
    htmlAttrs: {
      class: theme.value,
    },
  }))

  function applyTheme(next: ThemeId) {
    theme.value = next

    if (!isDemoMode.value) return

    const storage = getLocalStorage()
    if (!storage) return
    try {
      storage.setItem(THEME_STORAGE_KEY, next)
    }
    catch {
      // Quota / private mode — ignore persistence failures.
    }
  }

  function readStoredTheme(): ThemeId | null {
    const storage = getLocalStorage()
    if (!storage) return null
    try {
      const raw = storage.getItem(THEME_STORAGE_KEY)
      return isThemeId(raw) ? raw : null
    }
    catch {
      return null
    }
  }

  /** Call once on the client after mount. */
  function hydrateThemeFromStorage() {
    if (!isClient()) return
    if (isDemoMode.value) {
      applyTheme(readStoredTheme() ?? DEFAULT_THEME)
      return
    }
    applyTheme(DEFAULT_THEME)
  }

  return {
    theme,
    themes: THEME_IDS,
    labels: THEME_LABELS,
    isDemoMode,
    applyTheme,
    hydrateThemeFromStorage,
    readStoredTheme,
  }
}
