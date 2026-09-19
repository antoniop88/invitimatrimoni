<script setup lang="ts">
const invitation = useInvitation()
const image = invitation.images.moment
const caption = invitation.sections.moment.caption
</script>

<template>
  <section
    id="momento"
    class="moment"
  >
    <figure class="moment__figure">
      <img
        class="moment__image"
        :src="image.src"
        :alt="image.alt"
        :width="image.width"
        :height="image.height"
        decoding="async"
      >
      <figcaption class="moment__caption">
        {{ caption }}
      </figcaption>
    </figure>
  </section>
</template>

<style scoped>
.moment {
  padding: var(--space-section) var(--space-page-x);
}

.moment__figure {
  width: min(58rem, 100%);
  margin: 0 auto;
}

.moment__image {
  width: 100%;
  height: auto;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center 40%;
  background: var(--color-sand);
}

.moment__caption {
  margin-top: 0.85rem;
  text-align: center;
  font-family: var(--font-display);
  font-style: italic;
  font-size: clamp(1.15rem, 1rem + 0.5vw, 1.4rem);
  color: var(--color-forest);
}
</style>
