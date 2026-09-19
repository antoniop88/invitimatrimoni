<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: 'button' | 'submit' | 'reset'
    variant?: 'primary' | 'secondary'
    disabled?: boolean
  }>(),
  {
    type: 'button',
    variant: 'primary',
    disabled: false,
  },
)
</script>

<template>
  <button
    class="ui-button"
    :class="`ui-button--${variant}`"
    :type="type"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<style scoped>
.ui-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
  min-height: 2.75rem;
  padding: 0.55rem 1.35rem;
  border: 1px solid var(--color-button);
  border-radius: var(--radius-control);
  background: var(--color-button);
  color: var(--color-button-text);
  font-family: var(--font-body);
  font-size: 0.9375rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition: background-color 160ms ease, color 160ms ease, border-color 160ms ease;
}

.ui-button--secondary {
  background: transparent;
  color: var(--color-forest);
  border-color: var(--color-sand);
}

.ui-button:hover {
  background: color-mix(in srgb, var(--color-button) 88%, black);
}

.ui-button--secondary:hover {
  background: color-mix(in srgb, var(--color-blush) 55%, transparent);
  color: var(--color-forest);
}

.ui-button:active {
  transform: translateY(1px);
}

.ui-button:disabled {
  opacity: 0.65;
  cursor: wait;
  transform: none;
}
</style>
