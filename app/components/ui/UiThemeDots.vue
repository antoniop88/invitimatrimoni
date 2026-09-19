<script setup lang="ts">
import type { ThemeId } from '~/composables/useTheme'

const { theme, themes, labels, applyTheme } = useTheme()

const swatches: Record<ThemeId, string> = {
  'theme-mediterraneo': '#793E49',
  'theme-botanico': '#5D6F64',
  'theme-classico': '#7A4A32',
}
</script>

<template>
  <div
    class="theme-dots"
    role="group"
    aria-label="Atmosfera visiva"
  >
    <button
      v-for="id in themes"
      :key="id"
      class="theme-dots__btn"
      type="button"
      :class="{ 'theme-dots__btn--active': theme === id }"
      :aria-label="labels[id]"
      :aria-pressed="theme === id"
      :style="{ '--swatch': swatches[id] }"
      @click="applyTheme(id)"
    />
  </div>
</template>

<style scoped>
.theme-dots {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.55rem 0.7rem;
  background: color-mix(in srgb, var(--color-bg) 92%, transparent);
  border: var(--stroke-thin) solid var(--color-separator);
  border-radius: var(--radius-soft);
}

.theme-dots__btn {
  width: 2.75rem;
  height: 2.75rem;
  padding: 0;
  border: var(--stroke-thin) solid var(--color-separator);
  border-radius: 50%;
  background: var(--swatch);
  cursor: pointer;
  position: relative;
}

.theme-dots__btn::after {
  content: '';
  position: absolute;
  inset: 0.85rem;
  border-radius: 50%;
  background: var(--swatch);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--color-bg) 35%, transparent);
}

.theme-dots__btn--active {
  outline: 2px solid var(--color-text);
  outline-offset: 2px;
}
</style>
