<script setup lang="ts">
const invitation = useInvitation()
const schedule = invitation.sections.schedule
</script>

<template>
  <section
    id="giornata"
    class="section-day"
  >
    <div class="section-day__inner">
      <header class="section-day__header">
        <h2 class="section-day__title">
          {{ schedule.title }}
        </h2>
        <p class="section-day__intro">
          {{ schedule.intro }}
        </p>
      </header>

      <div class="section-day__path-wrap">
        <svg
          class="section-day__path"
          viewBox="0 0 960 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M40 78C180 18 300 110 480 52C660 -6 780 98 920 40"
            stroke="currentColor"
            stroke-width="1.15"
            stroke-linecap="round"
          />
        </svg>

        <ol class="section-day__list">
          <li
            v-for="item in invitation.schedule"
            :key="item.time"
            class="section-day__item"
          >
            <IlluMoment :moment="item.moment" />
            <p class="section-day__time">
              {{ item.time }}
            </p>
            <h3 class="section-day__item-title">
              {{ item.title }}
            </h3>
            <p class="section-day__item-desc">
              {{ item.description }}
            </p>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-day {
  padding: var(--space-section) var(--space-page-x);
}

.section-day__inner {
  max-width: 64rem;
  margin-inline: auto;
}

.section-day__header {
  text-align: center;
  margin-bottom: var(--space-xl);
}

.section-day__title {
  font-size: var(--text-title);
  margin-bottom: 0.4rem;
}

.section-day__intro {
  color: var(--color-muted);
}

.section-day__path-wrap {
  position: relative;
}

.section-day__path {
  display: none;
  width: 100%;
  height: auto;
  color: var(--color-sand);
  margin-bottom: -1.5rem;
}

.section-day__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.section-day__item {
  text-align: center;
  max-width: 18rem;
  margin-inline: auto;
}

.section-day__time {
  margin-top: 0.45rem;
  font-family: var(--font-display);
  font-size: 1.45rem;
  letter-spacing: 0.04em;
}

.section-day__item-title {
  font-family: var(--font-display);
  font-size: 1.25rem;
  margin: 0.2rem 0 0.35rem;
}

.section-day__item-desc {
  font-size: var(--text-small);
  line-height: var(--leading-body);
  color: var(--color-muted);
}

@media (min-width: 900px) {
  .section-day__path {
    display: block;
  }

  .section-day__list {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1rem;
    align-items: start;
  }

  .section-day__item {
    max-width: none;
  }

  .section-day__item:nth-child(1) { padding-top: 1.4rem; }
  .section-day__item:nth-child(2) { padding-top: 2.8rem; }
  .section-day__item:nth-child(3) { padding-top: 0.6rem; }
  .section-day__item:nth-child(4) { padding-top: 2.2rem; }
}
</style>
