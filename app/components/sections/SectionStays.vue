<script setup lang="ts">
const invitation = useInvitation()
const content = invitation.sections.accommodations
</script>

<template>
  <section
    id="alloggi"
    class="section-stays"
  >
    <div class="section-stays__inner">
      <header class="section-stays__header">
        <h2 class="section-stays__title">
          {{ content.title }}
        </h2>
        <p class="section-stays__intro">
          {{ content.intro }}
        </p>
      </header>

      <ul class="section-stays__list">
        <li
          v-for="stay in content.stays"
          :key="stay.name"
          class="section-stays__item"
        >
          <h3 class="section-stays__name">
            {{ stay.name }}
          </h3>
          <p class="section-stays__distance">
            {{ stay.distance }}
          </p>
          <p class="section-stays__notes">
            {{ stay.notes }}
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.section-stays {
  padding: var(--space-section) var(--space-page-x);
  scroll-margin-top: var(--header-height);
}

.section-stays__inner {
  max-width: 52rem;
  margin-inline: auto;
}

.section-stays__header {
  text-align: center;
  margin-bottom: var(--space-xl);
}

.section-stays__title {
  font-size: var(--text-title);
  margin-bottom: var(--space-sm);
}

.section-stays__intro {
  color: var(--color-muted);
  line-height: var(--leading-body);
  max-width: 34rem;
  margin-inline: auto;
}

.section-stays__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: var(--space-lg);
}

.section-stays__item {
  padding-top: var(--space-md);
  border-top: var(--stroke-rule) solid var(--color-separator);
}

.section-stays__name {
  font-family: var(--font-display);
  font-size: 1.35rem;
  margin-bottom: 0.25rem;
}

.section-stays__distance {
  font-size: var(--text-small);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: var(--space-xs);
}

.section-stays__notes {
  color: var(--color-muted);
  line-height: var(--leading-body);
}

@media (min-width: 800px) {
  .section-stays__list {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--space-xl);
  }

  .section-stays__item {
    border-top: 0;
    padding-top: 0;
    border-left: var(--stroke-rule) solid var(--color-separator);
    padding-left: var(--space-lg);
  }

  .section-stays__item:first-child {
    border-left: 0;
    padding-left: 0;
  }
}
</style>
