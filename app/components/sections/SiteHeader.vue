<script setup lang="ts">
const invitation = useInvitation()
</script>

<template>
  <nav
    class="site-header"
    :aria-label="`Sezioni dell'invito`"
  >
    <ul class="site-header__list">
      <li
        v-for="item in invitation.nav"
        :key="item.id"
      >
        <a
          class="site-header__link"
          :href="item.href"
        >{{ item.label }}</a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 40;
  background: color-mix(in srgb, var(--color-paper) 88%, transparent);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid color-mix(in srgb, var(--color-sand) 70%, transparent);
}

.site-header__list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.15rem 0.2rem;
  list-style: none;
  margin: 0 auto;
  padding: 0.2rem var(--space-page-x);
  max-width: 46rem;
}

.site-header__list li {
  display: flex;
  align-items: center;
}

.site-header__list li:not(:last-child)::after {
  content: '·';
  margin-inline: 0.55rem;
  color: var(--color-sand);
  pointer-events: none;
}

.site-header__link {
  display: inline-flex;
  align-items: center;
  min-height: 2.75rem;
  font-family: var(--font-body);
  font-size: 0.8125rem;
  letter-spacing: 0.04em;
  text-decoration: none;
  color: var(--color-muted);
}

.site-header__link:hover,
.site-header__link:focus-visible {
  color: var(--color-forest);
}

@media (max-width: 639px) {
  .site-header__list {
    gap: 0;
    padding-inline: 0.75rem;
  }

  .site-header__list li:not(:last-child)::after {
    margin-inline: 0.35rem;
  }

  .site-header__link {
    font-size: 0.75rem;
    min-height: 2.5rem;
  }
}
</style>
