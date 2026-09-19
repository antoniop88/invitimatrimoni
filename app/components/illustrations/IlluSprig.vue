<script setup lang="ts">
</script>

<template>
  <svg
    class="illu-sprig"
    viewBox="0 0 120 36"
    width="120"
    height="36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M8 22C32 10 52 28 60 18C68 8 88 26 112 14"
      stroke="currentColor"
      stroke-width="1.1"
      stroke-linecap="round"
    />
    <ellipse
      cx="32"
      cy="12"
      rx="6"
      ry="11"
      transform="rotate(-32 32 12)"
      fill="var(--color-blush)"
      stroke="currentColor"
      stroke-width="0.85"
    />
    <ellipse
      cx="88"
      cy="12"
      rx="6"
      ry="11"
      transform="rotate(28 88 12)"
      fill="var(--color-sand)"
      stroke="currentColor"
      stroke-width="0.85"
    />
    <circle
      cx="60"
      cy="18"
      r="3.2"
      fill="var(--color-bordeaux)"
    />
  </svg>
</template>

<style scoped>
.illu-sprig {
  color: var(--color-forest);
  margin-inline: auto;
}
</style>
