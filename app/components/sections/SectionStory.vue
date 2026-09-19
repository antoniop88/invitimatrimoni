<script setup lang="ts">
const invitation = useInvitation()
const story = invitation.sections.story
const images = invitation.images.story
</script>

<template>
  <section
    id="noi-due"
    class="section-story"
  >
    <div class="section-story__inner">
      <header class="section-story__header">
        <h2
          class="section-story__title"
          data-reveal
        >
          {{ story.title }}
        </h2>
        <p
          class="section-story__body"
          data-reveal
          style="--reveal-delay: 80ms"
        >
          {{ story.body }}
        </p>
      </header>

      <div class="section-story__album">
        <figure
          v-if="images[0]"
          class="section-story__figure section-story__figure--one"
          data-reveal="fade"
          style="--reveal-delay: 90ms"
        >
          <img
            :src="images[0].src"
            :alt="images[0].alt"
            :width="images[0].width"
            :height="images[0].height"
            loading="lazy"
            decoding="async"
          >
          <figcaption>{{ images[0].caption }}</figcaption>
        </figure>
        <figure
          v-if="images[1]"
          class="section-story__figure section-story__figure--two"
          data-reveal="fade"
          style="--reveal-delay: 170ms"
        >
          <img
            :src="images[1].src"
            :alt="images[1].alt"
            :width="images[1].width"
            :height="images[1].height"
            loading="lazy"
            decoding="async"
          >
          <figcaption>{{ images[1].caption }}</figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-story {
  padding: var(--space-section) var(--space-page-x);
}

.section-story__inner {
  max-width: 46rem;
  margin-inline: auto;
}

.section-story__header {
  text-align: center;
  margin-bottom: var(--space-xl);
}

.section-story__title {
  font-size: var(--text-title);
  margin-bottom: var(--space-md);
}

.section-story__body {
  max-width: 34rem;
  margin-inline: auto;
  font-size: var(--text-body);
  line-height: var(--leading-body);
}

.section-story__album {
  display: grid;
  gap: var(--space-lg);
  justify-items: center;
}

.section-story__figure {
  margin: 0;
  width: min(100%, 22rem);
  padding: 0.7rem 0.7rem 1.1rem;
  background: color-mix(in srgb, var(--color-paper) 80%, white);
  border: 1px solid color-mix(in srgb, var(--color-sand) 80%, transparent);
}

.section-story__figure img {
  width: 100%;
  height: auto;
  aspect-ratio: 3 / 2;
  object-fit: cover;
}

.section-story__figure figcaption {
  margin-top: 0.7rem;
  text-align: center;
  font-family: var(--font-display);
  font-style: italic;
  font-size: 1.05rem;
}

@media (min-width: 760px) {
  .section-story__album {
    grid-template-columns: 1fr 1fr;
    align-items: start;
    gap: 1.5rem;
  }

  .section-story__figure--one {
    transform: rotate(-1.6deg);
    margin-top: 0.6rem;
  }

  .section-story__figure--two {
    transform: rotate(1.8deg);
    margin-top: 2.4rem;
  }
}
</style>
