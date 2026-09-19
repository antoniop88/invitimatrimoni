<script setup lang="ts">
const invitation = useInvitation()
const content = invitation.sections.invitation
const calendar = invitation.sections.calendar

const JUNE_2027_LEAD = 1
const JUNE_DAYS = 30

const cells = Array.from({ length: JUNE_2027_LEAD + JUNE_DAYS }, (_, index) => {
  if (index < JUNE_2027_LEAD) return null
  return index - JUNE_2027_LEAD + 1
})
</script>

<template>
  <section
    id="si"
    class="section-invitation"
  >
    <div class="section-invitation__inner">
      <IlluSprig />

      <div class="section-invitation__lines">
        <p
          v-for="(line, index) in content.lines"
          :key="index"
          class="section-invitation__line"
          data-reveal
          :style="{ '--reveal-delay': `${index * 80}ms` }"
        >
          {{ line }}
        </p>
      </div>

      <p
        class="section-invitation__body"
        data-reveal
        style="--reveal-delay: 160ms"
      >
        {{ content.body }}
      </p>

      <div class="section-invitation__cal">
        <p class="section-invitation__month">
          {{ calendar.monthLabel }}
        </p>
        <table class="june-cal">
          <caption class="sr-only">
            Calendario di giugno 2027, con il 19 cerchiato
          </caption>
          <thead>
            <tr>
              <th
                v-for="(day, index) in calendar.weekdays"
                :key="`${day}-${index}`"
                scope="col"
              >
                {{ day }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in 5"
              :key="row"
            >
              <td
                v-for="col in 7"
                :key="col"
              >
                <span
                  v-if="cells[(row - 1) * 7 + (col - 1)]"
                  class="june-cal__day"
                  :class="{
                    'june-cal__day--mark': cells[(row - 1) * 7 + (col - 1)] === calendar.highlightedDay,
                  }"
                >
                  {{ cells[(row - 1) * 7 + (col - 1)] }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <SectionCountdown />

      <UiCalendarActions />
    </div>
  </section>
</template>

<style scoped>
.section-invitation {
  padding: var(--space-section) var(--space-page-x);
}

.section-invitation__inner {
  max-width: var(--measure);
  margin-inline: auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
}

.section-invitation__lines {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.section-invitation__line {
  font-family: var(--font-display);
  font-size: clamp(1.55rem, 1.2rem + 1.3vw, 2.2rem);
  line-height: 1.28;
  letter-spacing: var(--tracking-display);
}

.section-invitation__body {
  font-size: var(--text-body);
  line-height: var(--leading-body);
  color: var(--color-muted);
  max-width: 34rem;
}

.section-invitation__cal {
  margin-top: var(--space-sm);
  width: min(19rem, 100%);
}

.section-invitation__month {
  font-family: var(--font-display);
  font-size: 1.2rem;
  margin-bottom: 0.65rem;
}

.june-cal {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.june-cal th {
  font-family: var(--font-body);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  color: var(--color-muted);
  padding-bottom: 0.4rem;
}

.june-cal td {
  height: 2.05rem;
  text-align: center;
  vertical-align: middle;
}

.june-cal__day {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.85rem;
  height: 1.85rem;
  font-family: var(--font-display);
  font-size: 1.05rem;
  line-height: 1;
}

.june-cal__day--mark {
  position: relative;
  color: var(--color-bordeaux);
}

.june-cal__day--mark::before {
  content: '';
  position: absolute;
  inset: 0;
  border: 1.4px solid var(--color-bordeaux);
  border-radius: 50%;
  transform: rotate(-8deg);
}
</style>
