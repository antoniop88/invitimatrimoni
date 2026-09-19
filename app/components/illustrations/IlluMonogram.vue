<script setup lang="ts">
defineProps<{
  mark: string
}>()
</script>

<template>
  <span
    class="illu-monogram"
    aria-hidden="true"
  >
    <svg
      class="illu-monogram__ribbon"
      viewBox="0 0 180 36"
      width="180"
      height="36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 20C36 8 54 28 90 16C126 4 148 26 172 14"
        stroke="var(--color-bordeaux)"
        stroke-width="1.35"
        stroke-linecap="round"
      />
      <path
        d="M78 16c-8 10-4 18 4 18 6 0 8-6 8-6s2 6 8 6c8 0 12-8 4-18"
        fill="var(--color-blush)"
        stroke="var(--color-bordeaux)"
        stroke-width="1.1"
        stroke-linejoin="round"
      />
      <circle
        cx="90"
        cy="16"
        r="3.2"
        fill="var(--color-bordeaux)"
      />
    </svg>
    <span class="illu-monogram__seal">
      <span class="illu-monogram__mark">{{ mark }}</span>
    </span>
  </span>
</template>

<style scoped>
.illu-monogram {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.15rem;
  color: var(--color-forest);
  line-height: 1;
}

.illu-monogram__ribbon {
  width: 8.5rem;
  height: auto;
}

.illu-monogram__seal {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3.1rem;
  height: 3.1rem;
  border: 1px solid color-mix(in srgb, var(--color-bordeaux) 55%, transparent);
  border-radius: 50%;
  box-shadow: inset 0 0 0 3px color-mix(in srgb, var(--color-blush) 80%, transparent);
}

.illu-monogram__mark {
  font-family: var(--font-display);
  font-size: 0.95rem;
  letter-spacing: 0.04em;
  color: var(--color-bordeaux);
}
</style>
