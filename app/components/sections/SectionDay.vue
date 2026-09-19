<script setup lang="ts">
const invitation = useInvitation()
const schedule = invitation.sections.schedule

const stops = [
  { x: 120, y: 62 },
  { x: 360, y: 36 },
  { x: 600, y: 58 },
  { x: 840, y: 44 },
]
</script>

<template>
  <section
    id="giornata"
    class="section-day"
  >
    <div class="section-day__inner">
      <header class="section-day__header">
        <h2
          class="section-day__title"
          data-reveal
        >
          {{ schedule.title }}
        </h2>
        <p
          class="section-day__intro"
          data-reveal
          style="--reveal-delay: 80ms"
        >
          {{ schedule.intro }}
        </p>
      </header>

      <div
        class="section-day__path-wrap"
        data-reveal-line
      >
        <svg
          class="section-day__path"
          viewBox="0 0 960 96"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <path
            class="section-day__stroke"
            d="M120 62C200 18 280 18 360 36C480 62 520 86 600 58C720 22 760 18 840 44"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
          />
          <g
            v-for="(stop, index) in stops"
            :key="invitation.schedule[index]?.moment ?? index"
            class="section-day__stop"
            :style="{ '--i': index }"
          >
            <line
              :x1="stop.x"
              :y1="stop.y"
              :x2="stop.x"
              y2="88"
              stroke="currentColor"
              stroke-width="1.2"
              opacity="0.7"
            />
            <circle
              :cx="stop.x"
              :cy="stop.y"
              r="5"
              fill="var(--color-paper)"
              stroke="var(--color-bordeaux)"
              stroke-width="1.6"
            />
          </g>
        </svg>

        <ol class="section-day__list">
          <li
            v-for="(item, index) in invitation.schedule"
            :key="item.time"
            class="section-day__item"
            :style="{ '--i': index }"
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
  margin-bottom: var(--space-lg);
}

.section-day__title {
  font-size: var(--text-title);
  margin-bottom: 0.4rem;
}

.section-day__intro {
  color: var(--color-muted);
  font-size: var(--text-body);
}

.section-day__path-wrap {
  position: relative;
}

.section-day__path {
  display: none;
  width: 100%;
  height: auto;
  color: var(--color-forest);
  margin-bottom: 0.35rem;
  opacity: 0.72;
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
  position: relative;
  text-align: left;
  max-width: none;
}

.section-day__time {
  margin-top: 0.45rem;
  font-family: var(--font-display);
  font-size: 1.5rem;
  letter-spacing: 0.04em;
  color: var(--color-forest);
}

.section-day__item-title {
  font-family: var(--font-display);
  font-size: 1.3rem;
  margin: 0.2rem 0 0.35rem;
}

.section-day__item-desc {
  font-size: 1rem;
  line-height: var(--leading-body);
  color: var(--color-muted);
}

@media (max-width: 899px) {
  .section-day__list {
    position: relative;
    padding-left: 1.65rem;
    gap: 1.6rem;
  }

  .section-day__list::before {
    content: '';
    position: absolute;
    left: 0.28rem;
    top: 0.35rem;
    bottom: 0.4rem;
    width: 1.5px;
    background: color-mix(in srgb, var(--color-bordeaux) 55%, var(--color-sand));
  }

  .section-day__item {
    display: grid;
    grid-template-columns: 4.4rem minmax(0, 1fr);
    grid-template-areas:
      'icon time'
      'icon title'
      'icon desc';
    column-gap: 0.85rem;
    row-gap: 0.1rem;
    align-items: start;
  }

  .section-day__item::before {
    content: '';
    position: absolute;
    left: -1.52rem;
    top: 1.85rem;
    width: 0.55rem;
    height: 0.55rem;
    border-radius: 50%;
    background: var(--color-paper);
    border: 1.6px solid var(--color-bordeaux);
  }

  .section-day__item :deep(.illu-moment) {
    grid-area: icon;
    width: 4.2rem;
    height: 4.2rem;
    margin: 0;
  }

  .section-day__time {
    grid-area: time;
    margin-top: 0.15rem;
  }

  .section-day__item-title {
    grid-area: title;
  }

  .section-day__item-desc {
    grid-area: desc;
  }
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
    text-align: center;
  }

  .section-day__item:nth-child(1) { padding-top: 0.35rem; }
  .section-day__item:nth-child(2) { padding-top: 0.9rem; }
  .section-day__item:nth-child(3) { padding-top: 0.2rem; }
  .section-day__item:nth-child(4) { padding-top: 0.7rem; }
}

html.js .section-day__path-wrap.is-pending .section-day__stroke {
  stroke-dasharray: 1400;
  stroke-dashoffset: 1400;
}

html.js .section-day__path-wrap.is-in .section-day__stroke {
  animation: day-draw 0.7s ease forwards;
}

html.js .section-day__path-wrap.is-pending .section-day__stop {
  opacity: 0;
}

html.js .section-day__path-wrap.is-in .section-day__stop {
  animation: day-stop 0.45s ease forwards;
  animation-delay: calc(0.18s + var(--i, 0) * 80ms);
}

html.js .section-day__path-wrap.is-pending .section-day__item {
  opacity: 0;
  transform: translateY(12px);
}

html.js .section-day__path-wrap.is-in .section-day__item {
  animation: invite-rise 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: calc(0.2s + var(--i, 0) * 85ms);
}

@keyframes day-draw {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes day-stop {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  html.js .section-day__path-wrap.is-pending .section-day__stroke,
  html.js .section-day__path-wrap.is-pending .section-day__stop,
  html.js .section-day__path-wrap.is-pending .section-day__item {
    opacity: 1;
    transform: none;
    stroke-dashoffset: 0;
    animation: none;
  }
}
</style>
