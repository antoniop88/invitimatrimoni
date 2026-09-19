<script setup lang="ts">
const invitation = useInvitation()
const calendar = invitation.sections.calendar
</script>

<template>
  <div class="cal-actions no-print">
    <p class="cal-actions__label">
      {{ calendar.groupLabel }}
    </p>
    <div class="cal-actions__row">
      <a
        class="cal-actions__link"
        :href="calendar.icsHref"
        download
      >
        {{ calendar.icsLabel }}
      </a>
      <a
        class="cal-actions__link"
        :href="calendar.googleHref"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ calendar.googleLabel }}
      </a>
    </div>
  </div>
</template>

<style scoped>
.cal-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  width: min(22rem, 100%);
}

.cal-actions__label {
  font-family: var(--font-body);
  font-size: 0.875rem;
  letter-spacing: 0.04em;
  color: var(--color-forest);
}

.cal-actions__row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.45rem;
  width: 100%;
}

.cal-actions__link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.75rem;
  min-width: 2.75rem;
  padding: 0.4rem 0.95rem;
  border: 1px solid color-mix(in srgb, var(--color-sand) 90%, transparent);
  color: var(--color-forest);
  font-size: 0.875rem;
  text-decoration: none;
  text-underline-offset: 0.22em;
}

.cal-actions__link:hover,
.cal-actions__link:focus-visible {
  border-color: var(--color-bordeaux);
  color: var(--color-bordeaux);
}
</style>
