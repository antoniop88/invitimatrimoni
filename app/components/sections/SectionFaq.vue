<script setup lang="ts">
const invitation = useInvitation()
const faq = invitation.sections.faq
</script>

<template>
  <section
    id="faq"
    class="section-faq"
  >
    <div class="section-faq__inner">
      <h2 class="section-faq__title">
        {{ faq.title }}
      </h2>

      <div class="section-faq__list">
        <details
          v-for="item in faq.items"
          :key="item.question"
          class="section-faq__item"
        >
          <summary class="section-faq__summary">
            {{ item.question }}
          </summary>
          <p class="section-faq__body">
            {{ item.answer }}
          </p>
        </details>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-faq {
  padding: var(--space-section) var(--space-page-x);
  scroll-margin-top: var(--header-height);
}

.section-faq__inner {
  max-width: 42rem;
  margin-inline: auto;
}

.section-faq__title {
  font-size: var(--text-title);
  margin-bottom: var(--space-lg);
  text-align: center;
}

.section-faq__list {
  border-top: var(--stroke-rule) solid var(--color-separator);
}

.section-faq__item {
  border-bottom: var(--stroke-rule) solid var(--color-separator);
  padding-block: var(--space-md);
}

.section-faq__summary {
  font-family: var(--font-display);
  font-size: 1.2rem;
  cursor: pointer;
  list-style: none;
}

.section-faq__summary::-webkit-details-marker {
  display: none;
}

.section-faq__body {
  margin-top: var(--space-sm);
  color: var(--color-muted);
  line-height: var(--leading-body);
}
</style>
