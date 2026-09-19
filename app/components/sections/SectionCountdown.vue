<script setup lang="ts">
import { padCountdown } from '~/composables/useCountdown'

const invitation = useInvitation()
const { status, parts } = useCountdown(invitation.datetime.ceremonyAt)

const display = computed(() => {
  if (status.value === 'pending') {
    return {
      days: '––',
      hours: '––',
      minutes: '––',
    }
  }

  return {
    days: String(parts.value.days),
    hours: padCountdown(parts.value.hours),
    minutes: padCountdown(parts.value.minutes),
  }
})
</script>

<template>
  <div class="countdown">
    <p class="countdown__label">
      {{ invitation.sections.countdown.label }}
    </p>

    <p
      v-if="status === 'complete'"
      class="countdown__complete"
    >
      {{ invitation.sections.countdown.completedMessage }}
    </p>

    <div
      v-else
      class="countdown__grid"
      aria-hidden="true"
    >
      <div class="countdown__unit">
        <span class="countdown__value">{{ display.days }}</span>
        <span class="countdown__unit-label">giorni</span>
      </div>
      <div class="countdown__unit">
        <span class="countdown__value">{{ display.hours }}</span>
        <span class="countdown__unit-label">ore</span>
      </div>
      <div class="countdown__unit">
        <span class="countdown__value">{{ display.minutes }}</span>
        <span class="countdown__unit-label">minuti</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.countdown {
  width: 100%;
  text-align: center;
  padding-top: var(--space-sm);
}

.countdown__label {
  font-family: var(--font-body);
  font-size: var(--text-small);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-muted);
  margin-bottom: 0.65rem;
}

.countdown__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.35rem;
  max-width: 18rem;
  margin-inline: auto;
}

.countdown__unit {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.countdown__value {
  font-family: var(--font-display);
  font-size: clamp(1.7rem, 1.25rem + 1.4vw, 2.35rem);
  line-height: 1;
  font-variant-numeric: tabular-nums;
}

.countdown__unit-label {
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-muted);
}

.countdown__complete {
  font-family: var(--font-display);
  font-style: italic;
  font-size: clamp(1.2rem, 1rem + 0.6vw, 1.5rem);
  line-height: 1.4;
}
</style>
