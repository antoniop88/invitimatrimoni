<script setup lang="ts">
import { prefersReducedMotion } from '~/composables/usePrefersReducedMotion'

const props = defineProps<{
  active: boolean
}>()

interface Speck {
  id: number
  x: number
  delay: number
  duration: number
  drift: number
  rotate: number
  color: string
  size: number
}

const COLORS = ['#faf6ef', '#ebdad5', '#793e49', '#d8c8b7']
const specks = ref<Speck[]>([])
let hideTimer: ReturnType<typeof setTimeout> | null = null

watch(() => props.active, (active) => {
  if (!active || prefersReducedMotion()) {
    specks.value = []
    return
  }

  specks.value = Array.from({ length: 13 }, (_, id) => ({
    id,
    x: 8 + Math.random() * 84,
    delay: Math.random() * 80,
    duration: 520 + Math.random() * 160,
    drift: (Math.random() - 0.5) * 46,
    rotate: (Math.random() - 0.5) * 220,
    color: COLORS[id % COLORS.length] ?? '#793e49',
    size: 5 + Math.random() * 5,
  }))

  if (hideTimer) clearTimeout(hideTimer)
  hideTimer = setTimeout(() => {
    specks.value = []
    hideTimer = null
  }, 700)
})

onUnmounted(() => {
  if (hideTimer) clearTimeout(hideTimer)
})
</script>

<template>
  <span
    class="confetti"
    aria-hidden="true"
  >
    <span
      v-for="speck in specks"
      :key="speck.id"
      class="confetti__speck"
      :style="{
        left: `${speck.x}%`,
        width: `${speck.size}px`,
        height: `${speck.size * 0.55}px`,
        background: speck.color,
        animationDelay: `${speck.delay}ms`,
        animationDuration: `${speck.duration}ms`,
        '--drift': `${speck.drift}px`,
        '--rot': `${speck.rotate}deg`,
      }"
    />
  </span>
</template>

<style scoped>
.confetti {
  position: absolute;
  inset: -0.4rem 0 0;
  overflow: hidden;
  pointer-events: none;
}

.confetti__speck {
  position: absolute;
  top: 42%;
  border-radius: 1px;
  opacity: 0;
  animation: confetti-burst ease-out forwards;
}

@keyframes confetti-burst {
  0% {
    opacity: 0.95;
    transform: translate3d(0, 0, 0) rotate(0deg);
  }

  100% {
    opacity: 0;
    transform: translate3d(var(--drift), -42px, 0) rotate(var(--rot));
  }
}

@media (prefers-reduced-motion: reduce) {
  .confetti {
    display: none;
  }
}
</style>
