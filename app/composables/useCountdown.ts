export interface CountdownParts {
  days: number
  hours: number
  minutes: number
}

export type CountdownStatus = 'pending' | 'running' | 'complete'

/**
 * Ceremony countdown with SSR-safe first paint.
 * Static/SSR markup stays neutral; real values start after mount.
 */
export function useCountdown(targetIso: string) {
  const status = ref<CountdownStatus>('pending')
  const parts = ref<CountdownParts>({ days: 0, hours: 0, minutes: 0 })
  let timer: ReturnType<typeof setInterval> | null = null

  function compute(now = Date.now()): { status: CountdownStatus, parts: CountdownParts } {
    const target = Date.parse(targetIso)
    if (Number.isNaN(target)) {
      return { status: 'complete', parts: { days: 0, hours: 0, minutes: 0 } }
    }

    const diff = target - now
    if (diff <= 0) {
      return { status: 'complete', parts: { days: 0, hours: 0, minutes: 0 } }
    }

    const totalMinutes = Math.floor(diff / 60_000)
    const days = Math.floor(totalMinutes / (60 * 24))
    const hours = Math.floor((totalMinutes % (60 * 24)) / 60)
    const minutes = totalMinutes % 60

    return {
      status: 'running',
      parts: { days, hours, minutes },
    }
  }

  function tick() {
    const next = compute()
    status.value = next.status
    parts.value = next.parts
    if (next.status === 'complete' && timer) {
      clearInterval(timer)
      timer = null
    }
  }

  function start() {
    tick()
    if (status.value === 'complete') return
    timer = setInterval(tick, 1000)
  }

  function stop() {
    if (!timer) return
    clearInterval(timer)
    timer = null
  }

  onMounted(() => {
    start()
  })

  onUnmounted(() => {
    stop()
  })

  return {
    status,
    parts,
  }
}

export function padCountdown(value: number): string {
  return String(value).padStart(2, '0')
}
