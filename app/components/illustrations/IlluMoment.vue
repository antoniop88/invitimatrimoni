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
      r="41"
      stroke="currentColor"
      stroke-width="1.05"
      opacity="0.42"
    />

    <!-- Cerimonia: arco e fedi -->
    <g v-if="moment === 'ceremony'">
      <path
        d="M20 58V40C20 24 31 16 44 16C57 16 68 24 68 40V58"
        stroke="currentColor"
        stroke-width="1.45"
        stroke-linecap="round"
      />
      <path
        d="M20 58h10M68 58H58"
        stroke="currentColor"
        stroke-width="1.45"
        stroke-linecap="round"
      />
      <circle
        cx="38"
        cy="54"
        r="9"
        stroke="var(--color-bordeaux)"
        stroke-width="1.55"
      />
      <circle
        cx="50"
        cy="54"
        r="9"
        stroke="var(--color-bordeaux)"
        stroke-width="1.55"
      />
    </g>

    <!-- Aperitivo: due calici -->
    <g v-else-if="moment === 'toast'">
      <path
        d="M27 22h16l-2.2 22c-.6 8-6.2 12-12.2 7.2C23 46.6 25 36 27 22Z"
        fill="var(--color-blush)"
        stroke="currentColor"
        stroke-width="1.4"
        stroke-linejoin="round"
      />
      <path
        d="M45 26h16l-2.2 22c-.6 8-6.2 12-12.2 7.2C41 50.6 43 40 45 26Z"
        fill="var(--color-sand)"
        fill-opacity="0.85"
        stroke="currentColor"
        stroke-width="1.4"
        stroke-linejoin="round"
      />
      <path
        d="M33 56v14M54 60v12M26 70h16M46 72h16"
        stroke="currentColor"
        stroke-width="1.4"
        stroke-linecap="round"
      />
    </g>

    <!-- Cena: piatto e posate -->
    <g v-else-if="moment === 'dinner'">
      <ellipse
        cx="46"
        cy="48"
        rx="18"
        ry="18"
        fill="var(--color-blush)"
        stroke="currentColor"
        stroke-width="1.4"
      />
      <ellipse
        cx="46"
        cy="48"
        rx="11"
        ry="11"
        stroke="currentColor"
        stroke-width="1.15"
      />
      <path
        d="M20 24v28M16.5 24v11M23.5 24v11M20 52v12"
        stroke="currentColor"
        stroke-width="1.4"
        stroke-linecap="round"
      />
      <path
        d="M70 24c4 8 4 16 0 22M70 46v18"
        stroke="currentColor"
        stroke-width="1.4"
        stroke-linecap="round"
      />
      <path
        d="M66 24h8"
        stroke="var(--color-bordeaux)"
        stroke-width="1.35"
        stroke-linecap="round"
      />
    </g>

    <!-- Festa: note musicali -->
    <g v-else>
      <ellipse
        cx="30"
        cy="58"
        rx="8"
        ry="5.5"
        fill="var(--color-blush)"
        stroke="currentColor"
        stroke-width="1.35"
      />
      <path
        d="M38 58V26"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <ellipse
        cx="56"
        cy="64"
        rx="8"
        ry="5.5"
        fill="var(--color-sand)"
        stroke="currentColor"
        stroke-width="1.35"
      />
      <path
        d="M64 64V32"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M38 26c8-6 18-6 26 0"
        stroke="var(--color-bordeaux)"
        stroke-width="1.55"
        stroke-linecap="round"
      />
      <circle
        cx="44"
        cy="22"
        r="2.2"
        fill="var(--color-bordeaux)"
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
