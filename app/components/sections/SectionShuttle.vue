<script setup lang="ts">
const invitation = useInvitation()
const content = invitation.sections.shuttle
</script>

<template>
  <section
    id="navetta"
    class="section-shuttle"
  >
    <div class="section-shuttle__inner">
      <header class="section-shuttle__header">
        <h2 class="section-shuttle__title">
          {{ content.title }}
        </h2>
        <p class="section-shuttle__intro">
          {{ content.intro }}
        </p>
      </header>

      <ul class="section-shuttle__list">
        <li
          v-for="leg in content.legs"
          :key="leg.label"
          class="section-shuttle__item"
        >
          <p class="section-shuttle__label">
            {{ leg.label }}
          </p>
          <p class="section-shuttle__time">
            {{ leg.time }}
          </p>
          <p class="section-shuttle__place">
            {{ leg.place }}
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.section-shuttle {
  padding: var(--space-section) var(--space-page-x);
  scroll-margin-top: var(--header-height);
}

.section-shuttle__inner {
  max-width: 40rem;
  margin-inline: auto;
}

.section-shuttle__header {
  text-align: center;
  margin-bottom: var(--space-xl);
}

.section-shuttle__title {
  font-size: var(--text-title);
  margin-bottom: var(--space-sm);
}

.section-shuttle__intro {
  color: var(--color-muted);
  line-height: var(--leading-body);
}

.section-shuttle__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: var(--space-lg);
}

.section-shuttle__item {
  padding: var(--space-md) 0;
  border-top: var(--stroke-rule) solid var(--color-separator);
}

.section-shuttle__label {
  font-size: var(--text-small);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-muted);
  margin-bottom: var(--space-xs);
}

.section-shuttle__time {
  font-family: var(--font-display);
  font-size: 1.6rem;
  margin-bottom: var(--space-xs);
}

.section-shuttle__place {
  color: var(--color-muted);
  line-height: var(--leading-body);
}

@media (min-width: 700px) {
  .section-shuttle__list {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-xl);
  }
}
</style>
