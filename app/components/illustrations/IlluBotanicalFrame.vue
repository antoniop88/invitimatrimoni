<script setup lang="ts">
/**
 * Botanical frame for the opening invitation card.
 * Asymmetric florals + double rounded rule. Decorative only.
 */
</script>

<template>
  <svg
    class="illu-frame"
    viewBox="0 0 660 980"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <rect
      x="36"
      y="36"
      width="588"
      height="908"
      rx="34"
      stroke="currentColor"
      stroke-width="1.15"
      opacity="0.55"
    />
    <rect
      class="illu-frame__draw"
      x="48"
      y="48"
      width="564"
      height="884"
      rx="26"
      stroke="currentColor"
      stroke-width="0.7"
      opacity="0.38"
    />

    <!-- Top-left bouquet -->
    <g transform="translate(18 22)">
      <path
        d="M92 176C70 128 36 108 22 128C8 148 28 176 62 178"
        stroke="currentColor"
        stroke-width="1.1"
        stroke-linecap="round"
      />
      <path
        d="M90 174C112 120 158 92 176 122C192 146 162 174 124 176"
        stroke="currentColor"
        stroke-width="1.1"
        stroke-linecap="round"
      />
      <path
        d="M38 118C28 86 18 62 32 48C46 62 48 88 38 118Z"
        fill="var(--color-blush)"
        stroke="currentColor"
        stroke-width="0.9"
      />
      <path
        d="M58 108C52 72 48 46 68 36C84 52 76 84 58 108Z"
        fill="var(--color-sand)"
        stroke="currentColor"
        stroke-width="0.9"
      />
      <path
        d="M86 96C90 62 102 38 118 42C122 64 108 88 86 96Z"
        fill="var(--color-blush)"
        stroke="currentColor"
        stroke-width="0.9"
      />
      <path
        d="M132 86c12-22 36-26 46-8 8 14-2 30-20 34-16 4-28-6-26-26z"
        fill="var(--color-blush)"
        stroke="currentColor"
        stroke-width="0.95"
      />
      <path
        d="M146 92c6-10 16-12 22-4"
        stroke="currentColor"
        stroke-width="0.7"
        stroke-linecap="round"
      />
      <circle
        cx="118"
        cy="108"
        r="6"
        fill="var(--color-bordeaux)"
        opacity="0.85"
      />
      <path
        d="M70 148C52 164 38 186 54 196C74 206 90 180 70 148Z"
        fill="var(--color-sand)"
        fill-opacity="0.55"
        stroke="currentColor"
        stroke-width="0.85"
      />
    </g>

    <!-- Top-right sprig -->
    <g transform="translate(430 18)">
      <path
        d="M96 36C72 58 48 96 62 128C74 154 112 148 118 118"
        stroke="currentColor"
        stroke-width="1.05"
        stroke-linecap="round"
      />
      <ellipse
        cx="128"
        cy="58"
        rx="9"
        ry="18"
        transform="rotate(42 128 58)"
        fill="var(--color-blush)"
        stroke="currentColor"
        stroke-width="0.85"
      />
      <ellipse
        cx="148"
        cy="86"
        rx="8"
        ry="16"
        transform="rotate(58 148 86)"
        fill="var(--color-sand)"
        stroke="currentColor"
        stroke-width="0.85"
      />
      <ellipse
        cx="86"
        cy="48"
        rx="7"
        ry="15"
        transform="rotate(-28 86 48)"
        fill="var(--color-blush)"
        stroke="currentColor"
        stroke-width="0.85"
      />
      <circle
        cx="108"
        cy="92"
        r="5"
        fill="var(--color-bordeaux)"
        opacity="0.7"
      />
    </g>

    <!-- Bottom-right bouquet -->
    <g transform="translate(430 760)">
      <path
        d="M48 28C78 48 118 42 148 18"
        stroke="currentColor"
        stroke-width="1.1"
        stroke-linecap="round"
      />
      <path
        d="M58 40C72 78 108 108 142 92C168 80 164 46 132 42"
        stroke="currentColor"
        stroke-width="1.05"
        stroke-linecap="round"
      />
      <ellipse
        cx="168"
        cy="48"
        rx="11"
        ry="22"
        transform="rotate(48 168 48)"
        fill="var(--color-blush)"
        stroke="currentColor"
        stroke-width="0.9"
      />
      <ellipse
        cx="154"
        cy="86"
        rx="10"
        ry="19"
        transform="rotate(22 154 86)"
        fill="var(--color-sand)"
        stroke="currentColor"
        stroke-width="0.9"
      />
      <path
        d="M108 96c14 18 8 42-10 48-18 6-34-12-28-30 6-16 24-22 38-18z"
        fill="var(--color-blush)"
        stroke="currentColor"
        stroke-width="0.95"
      />
      <path
        d="M98 112c-6 8-16 10-22 4"
        stroke="currentColor"
        stroke-width="0.7"
        stroke-linecap="round"
      />
      <circle
        cx="124"
        cy="64"
        r="6.5"
        fill="var(--color-bordeaux)"
        opacity="0.85"
      />
      <path
        d="M72 22c-16-10-38 2-36 18"
        stroke="currentColor"
        stroke-width="0.9"
        stroke-linecap="round"
      />
    </g>

    <!-- Bottom-left sprig -->
    <g transform="translate(16 790)">
      <path
        d="M28 88C48 64 86 48 118 62"
        stroke="currentColor"
        stroke-width="1"
        stroke-linecap="round"
      />
      <ellipse
        cx="42"
        cy="54"
        rx="8"
        ry="16"
        transform="rotate(-48 42 54)"
        fill="var(--color-blush)"
        stroke="currentColor"
        stroke-width="0.85"
      />
      <ellipse
        cx="68"
        cy="36"
        rx="7"
        ry="14"
        transform="rotate(-18 68 36)"
        fill="var(--color-sand)"
        stroke="currentColor"
        stroke-width="0.85"
      />
      <circle
        cx="88"
        cy="58"
        r="4.5"
        fill="var(--color-bordeaux)"
        opacity="0.65"
      />
    </g>
  </svg>
</template>

<style scoped>
.illu-frame {
  width: 100%;
  height: 100%;
  color: var(--color-forest);
  pointer-events: none;
}
</style>
