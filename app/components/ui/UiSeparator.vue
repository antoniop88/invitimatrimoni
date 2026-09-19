<script setup lang="ts">
</script>

<template>
  <div
    class="ui-separator"
    role="separator"
    aria-hidden="true"
  >
    <span class="ui-separator__line" />
    <IlluSprig />
    <span class="ui-separator__line" />
  </div>
</template>

<style scoped>
.ui-separator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  width: 100%;
  max-width: var(--measure);
  color: var(--color-accent);
  margin-block: var(--space-lg);
}

.ui-separator__line {
  flex: 1;
  height: var(--stroke-rule);
  background: var(--color-separator);
}
</style>
