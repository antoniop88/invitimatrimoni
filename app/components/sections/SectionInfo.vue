<script setup lang="ts">
const invitation = useInvitation()
const details = invitation.sections.details
</script>

<template>
  <section
    id="note"
    class="section-info"
  >
    <div class="section-info__inner">
      <h2 class="section-info__title">
        {{ details.title }}
      </h2>

      <ul class="section-info__list">
        <li
          v-for="item in details.items"
          :key="item.title"
          class="section-info__item"
        >
          <span
            class="section-info__mark"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 16 16"
              width="12"
              height="12"
              fill="none"
            >
              <ellipse
                cx="8"
                cy="8"
                rx="3"
                ry="6"
                transform="rotate(-28 8 8)"
                fill="var(--color-blush)"
                stroke="var(--color-bordeaux)"
                stroke-width="0.9"
              />
            </svg>
          </span>
          <p>{{ item.body }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.section-info {
  padding: var(--space-section) var(--space-page-x);
}

.section-info__inner {
  max-width: 32rem;
  margin-inline: auto;
  padding: 1.75rem 1.5rem 1.9rem;
  border: 1px solid color-mix(in srgb, var(--color-sand) 85%, transparent);
  background: color-mix(in srgb, var(--color-paper) 70%, white);
}

.section-info__title {
  font-size: clamp(1.5rem, 1.2rem + 1vw, 2rem);
  text-align: center;
  margin-bottom: var(--space-md);
}

.section-info__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.section-info__item {
  display: grid;
  grid-template-columns: 1.2rem 1fr;
  gap: 0.55rem;
  align-items: start;
  line-height: var(--leading-body);
}

.section-info__mark {
  display: inline-flex;
  margin-top: 0.45rem;
  color: var(--color-bordeaux);
}
</style>
