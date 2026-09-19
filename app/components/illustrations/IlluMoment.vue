<script setup lang="ts">
import type { InvitationScheduleItem } from '~/types/invitation'

defineProps<{
  moment: InvitationScheduleItem['moment']
}>()
</script>

<template>
  <svg
    class="illu-moment"
    viewBox="0 0 88 88"
    width="88"
    height="88"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <circle
      cx="44"
      cy="44"
      r="42"
      stroke="currentColor"
      stroke-width="0.8"
      opacity="0.28"
    />

    <g v-if="moment === 'ceremony'">
      <path
        d="M22 62V38C22 24 32 16 44 16C56 16 66 24 66 38V62"
        stroke="currentColor"
        stroke-width="1.2"
        stroke-linecap="round"
      />
      <circle
        cx="38"
        cy="50"
        r="8"
        stroke="var(--color-bordeaux)"
        stroke-width="1.3"
      />
      <circle
        cx="50"
        cy="50"
        r="8"
        stroke="var(--color-bordeaux)"
        stroke-width="1.3"
      />
      <ellipse
        cx="44"
        cy="26"
        rx="5"
        ry="9"
        fill="var(--color-blush)"
        stroke="currentColor"
        stroke-width="0.85"
      />
    </g>

    <g v-else-if="moment === 'toast'">
      <path
        d="M28 24H42L40 46C40 54 34 58 28 52C22 46 24 36 28 24Z"
        fill="var(--color-blush)"
        stroke="currentColor"
        stroke-width="1.15"
        stroke-linejoin="round"
      />
      <path
        d="M46 28H60L58 50C58 58 52 62 46 56C40 50 42 40 46 28Z"
        fill="var(--color-sand)"
        fill-opacity="0.7"
        stroke="currentColor"
        stroke-width="1.15"
        stroke-linejoin="round"
      />
      <path
        d="M35 58V68M53 62V70M28 68H42M46 70H60"
        stroke="currentColor"
        stroke-width="1.1"
        stroke-linecap="round"
      />
    </g>

    <g v-else-if="moment === 'dinner'">
      <ellipse
        cx="44"
        cy="52"
        rx="22"
        ry="10"
        fill="var(--color-blush)"
        stroke="currentColor"
        stroke-width="1.1"
      />
      <ellipse
        cx="44"
        cy="50"
        rx="12"
        ry="5.5"
        stroke="currentColor"
        stroke-width="0.9"
      />
      <path
        d="M28 24l4 8M44 18v10M60 24l-4 8"
        stroke="var(--color-bordeaux)"
        stroke-width="1.15"
        stroke-linecap="round"
      />
      <circle
        cx="28"
        cy="22"
        r="1.6"
        fill="var(--color-bordeaux)"
      />
      <circle
        cx="44"
        cy="16"
        r="1.8"
        fill="var(--color-bordeaux)"
      />
      <circle
        cx="60"
        cy="22"
        r="1.6"
        fill="var(--color-bordeaux)"
      />
    </g>

    <g v-else>
      <path
        d="M30 30v28M58 28v30"
        stroke="currentColor"
        stroke-width="1.2"
        stroke-linecap="round"
      />
      <circle
        cx="30"
        cy="22"
        r="6"
        fill="var(--color-blush)"
        stroke="currentColor"
        stroke-width="1"
      />
      <circle
        cx="58"
        cy="20"
        r="6"
        fill="var(--color-sand)"
        stroke="currentColor"
        stroke-width="1"
      />
      <path
        d="M30 42c8 10 20 10 28 0"
        stroke="var(--color-bordeaux)"
        stroke-width="1.2"
        stroke-linecap="round"
      />
      <path
        d="M24 58l6 10M36 58l-6 10M52 58l6 10M64 56l-6 12"
        stroke="currentColor"
        stroke-width="1.1"
        stroke-linecap="round"
      />
    </g>
  </svg>
</template>

<style scoped>
.illu-moment {
  color: var(--color-forest);
  width: 4.6rem;
  height: 4.6rem;
  margin-inline: auto;
}
</style>
