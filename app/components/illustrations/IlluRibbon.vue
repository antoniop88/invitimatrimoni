<script setup lang="ts">
withDefaults(defineProps<{
  width?: number
}>(), {
  width: 220,
})
</script>

<template>
  <svg
    class="illu-ribbon"
    :width="width"
    :height="Math.round(width * 0.28)"
    viewBox="0 0 220 62"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M12 34C46 18 70 44 110 28C150 12 176 40 208 24"
      stroke="var(--color-bordeaux)"
      stroke-width="1.4"
      stroke-linecap="round"
    />
    <path
      d="M96 28c-12 16-6 28 8 28 8 0 12-8 12-8s4 8 12 8c14 0 20-12 8-28"
      fill="var(--color-blush)"
      stroke="var(--color-bordeaux)"
      stroke-width="1.15"
      stroke-linejoin="round"
    />
    <path
      d="M110 28c-6 10 0 18 8 14"
      stroke="var(--color-bordeaux)"
      stroke-width="0.9"
      stroke-linecap="round"
    />
    <circle
      cx="110"
      cy="28"
      r="3.4"
      fill="var(--color-bordeaux)"
    />
  </svg>
</template>

<style scoped>
.illu-ribbon {
  display: block;
  margin-inline: auto;
}
</style>
