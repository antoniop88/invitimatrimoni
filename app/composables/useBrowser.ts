/**
 * Safe access to browser APIs under SSR / prerender.
 * Prefer these helpers over direct `window` / `localStorage` / `navigator` use.
 */

export function isClient(): boolean {
  return import.meta.client
}

export function getWindow(): Window | undefined {
  if (!import.meta.client) return undefined
  return window
}

export function getDocument(): Document | undefined {
  if (!import.meta.client) return undefined
  return document
}

export function getNavigator(): Navigator | undefined {
  if (!import.meta.client) return undefined
  return navigator
}

export function getLocalStorage(): Storage | undefined {
  if (!import.meta.client) return undefined
  try {
    return window.localStorage
  }
  catch {
    return undefined
  }
}

export function getSessionStorage(): Storage | undefined {
  if (!import.meta.client) return undefined
  try {
    return window.sessionStorage
  }
  catch {
    return undefined
  }
}
