<script setup lang="ts">
const invitation = useInvitation()
const place = invitation.sections.place
const location = invitation.location

const directionsHref = computed(() => {
  if (location.directionsUrl.trim()) return location.directionsUrl.trim()
  const address = [location.address, location.city].filter(part => part.trim()).join(', ')
  if (!address) return ''
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`
})
</script>

<template>
  <section
    id="luogo"
    class="section-place"
  >
    <div class="section-place__inner">
      <div
        class="section-place__drawing"
        data-reveal
      >
        <IlluMasseria />
      </div>

      <h2
        class="section-place__title"
        data-reveal
        style="--reveal-delay: 80ms"
      >
        {{ place.title }}
      </h2>
      <p class="section-place__name">
        {{ location.name }}
      </p>
      <p class="section-place__territory">
        {{ location.territory }}
      </p>

      <p
        v-for="(line, index) in place.atmosphere"
        :key="index"
        class="section-place__atmosphere"
      >
        {{ line }}
      </p>

      <p
        v-if="location.address"
        class="section-place__address"
      >
        {{ location.address }}
      </p>

      <p class="section-place__times">
        <span>{{ place.ceremonyNote }}</span>
        <span aria-hidden="true"> · </span>
        <span>{{ place.celebrationNote }}</span>
      </p>

      <p class="section-place__map">
        <a
          class="section-place__map-link"
          :href="location.mapUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ location.mapLabel }}
        </a>
      </p>
      <p
        v-if="directionsHref"
        class="section-place__map"
      >
        <a
          class="section-place__map-link"
          :href="directionsHref"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ location.directionsLabel }}
        </a>
      </p>
    </div>
  </section>
</template>

<style scoped>
.section-place {
  padding: var(--space-section) var(--space-page-x);
  background: color-mix(in srgb, var(--color-blush) 42%, var(--color-paper));
}

.section-place__inner {
  max-width: 32rem;
  margin-inline: auto;
  text-align: center;
}

.section-place__drawing {
  margin-bottom: var(--space-lg);
}

.section-place__title {
  font-size: var(--text-title);
  margin-bottom: 0.4rem;
}

.section-place__name {
  font-family: var(--font-display);
  font-size: clamp(1.35rem, 1.1rem + 0.7vw, 1.7rem);
}

.section-place__territory {
  margin-top: 0.2rem;
  font-size: var(--text-small);
  letter-spacing: 0.06em;
  color: var(--color-muted);
}

.section-place__atmosphere {
  margin-top: 0.85rem;
  line-height: var(--leading-body);
  max-width: 30rem;
  margin-inline: auto;
}

.section-place__address {
  margin-top: var(--space-sm);
  font-size: var(--text-small);
  color: var(--color-muted);
}

.section-place__times {
  margin-top: var(--space-md);
  font-family: var(--font-display);
  font-size: 1.15rem;
}

.section-place__map {
  margin-top: 0.35rem;
}

.section-place__map-link {
  display: inline-flex;
  align-items: center;
  min-height: 2.75rem;
  font-size: var(--text-small);
  color: var(--color-bordeaux);
  text-underline-offset: 0.22em;
}
</style>
