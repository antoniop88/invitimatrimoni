<script setup lang="ts">
</script>

<template>
  <svg
    class="illu-masseria"
    viewBox="0 0 420 260"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Disegno al tratto di una masseria tra gli ulivi"
  >
    <!-- Ground -->
    <path
      d="M12 198C86 186 150 204 210 192C286 176 348 198 408 188"
      stroke="currentColor"
      stroke-width="1.15"
      stroke-linecap="round"
    />

    <!-- Olive tree left -->
    <g transform="translate(28 86)">
      <path
        d="M42 112V56"
        stroke="currentColor"
        stroke-width="1.2"
        stroke-linecap="round"
      />
      <ellipse
        cx="42"
        cy="40"
        rx="32"
        ry="28"
        fill="var(--color-blush)"
        fill-opacity="0.45"
        stroke="currentColor"
        stroke-width="1.05"
      />
      <ellipse
        cx="22"
        cy="52"
        rx="16"
        ry="14"
        fill="var(--color-sand)"
        fill-opacity="0.5"
        stroke="currentColor"
        stroke-width="0.9"
      />
      <ellipse
        cx="62"
        cy="50"
        rx="14"
        ry="12"
        fill="var(--color-sand)"
        fill-opacity="0.4"
        stroke="currentColor"
        stroke-width="0.9"
      />
    </g>

    <!-- Cypress -->
    <path
      d="M112 198C112 198 102 150 112 118C122 150 112 198 112 198Z"
      fill="var(--color-blush)"
      fill-opacity="0.35"
      stroke="currentColor"
      stroke-width="1"
    />

    <!-- Masseria body -->
    <g transform="translate(128 78)">
      <rect
        x="8"
        y="48"
        width="176"
        height="86"
        fill="var(--color-paper)"
        stroke="currentColor"
        stroke-width="1.2"
      />
      <path
        d="M4 48H188L176 28H16L4 48Z"
        fill="var(--color-sand)"
        fill-opacity="0.55"
        stroke="currentColor"
        stroke-width="1.2"
        stroke-linejoin="round"
      />
      <!-- chimney -->
      <rect
        x="142"
        y="12"
        width="16"
        height="22"
        fill="var(--color-paper)"
        stroke="currentColor"
        stroke-width="1"
      />
      <!-- door arch -->
      <path
        d="M84 134V96C84 82 96 72 110 72C124 72 136 82 136 96V134"
        fill="var(--color-blush)"
        fill-opacity="0.55"
        stroke="currentColor"
        stroke-width="1.15"
      />
      <!-- windows -->
      <rect
        x="28"
        y="72"
        width="22"
        height="28"
        stroke="currentColor"
        stroke-width="1"
      />
      <rect
        x="162"
        y="72"
        width="22"
        height="28"
        stroke="currentColor"
        stroke-width="1"
      />
      <path
        d="M39 72V100M28 86H50M173 72V100M162 86H184"
        stroke="currentColor"
        stroke-width="0.7"
      />
      <!-- small side wing -->
      <rect
        x="184"
        y="78"
        width="36"
        height="56"
        fill="var(--color-paper)"
        stroke="currentColor"
        stroke-width="1.1"
      />
      <path
        d="M182 78H222L210 64H194L182 78Z"
        stroke="currentColor"
        stroke-width="1.05"
        stroke-linejoin="round"
      />
    </g>

    <!-- Trullo hint -->
    <g transform="translate(318 118)">
      <path
        d="M36 80L8 80L22 18Z"
        fill="var(--color-blush)"
        fill-opacity="0.4"
        stroke="currentColor"
        stroke-width="1.1"
        stroke-linejoin="round"
      />
      <circle
        cx="22"
        cy="16"
        r="3"
        fill="var(--color-bordeaux)"
      />
    </g>

    <!-- Olive tree right -->
    <g transform="translate(338 92)">
      <path
        d="M28 106V62"
        stroke="currentColor"
        stroke-width="1.15"
        stroke-linecap="round"
      />
      <ellipse
        cx="28"
        cy="48"
        rx="26"
        ry="24"
        fill="var(--color-blush)"
        fill-opacity="0.4"
        stroke="currentColor"
        stroke-width="1"
      />
    </g>
  </svg>
</template>

<style scoped>
.illu-masseria {
  width: min(100%, 26rem);
  height: auto;
  margin-inline: auto;
  color: var(--color-forest);
}
</style>
