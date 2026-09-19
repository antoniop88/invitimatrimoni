<script setup lang="ts">
import { getDocument, isClient } from '~/composables/useBrowser'
import type { InvitationImage } from '~/types/invitation'

const invitation = useInvitation()
const content = invitation.sections.gallery
const images = invitation.images.gallery

const dialogRef = ref<HTMLDialogElement | null>(null)
const active = ref<InvitationImage | null>(null)
const lastTrigger = ref<HTMLElement | null>(null)

function openLightbox(image: InvitationImage, event: Event) {
  active.value = image
  lastTrigger.value = event.currentTarget as HTMLElement
  nextTick(() => {
    dialogRef.value?.showModal()
  })
}

function closeLightbox() {
  dialogRef.value?.close()
}

function onDialogClose() {
  active.value = null
  if (isClient()) {
    lastTrigger.value?.focus()
  }
}

onMounted(() => {
  const doc = getDocument()
  const dialog = dialogRef.value
  if (!dialog || !doc) return
  dialog.addEventListener('close', onDialogClose)
})

onUnmounted(() => {
  dialogRef.value?.removeEventListener('close', onDialogClose)
})
</script>

<template>
  <section
    id="galleria"
    class="section-gallery"
  >
    <div class="section-gallery__inner">
      <header class="section-gallery__header">
        <h2 class="section-gallery__title">
          {{ content.title }}
        </h2>
        <p class="section-gallery__caption">
          {{ content.caption }}
        </p>
      </header>

      <ul class="section-gallery__grid">
        <li
          v-for="(image, index) in images"
          :key="image.src"
        >
          <button
            class="section-gallery__thumb"
            type="button"
            :aria-label="`Apri immagine ${index + 1}: ${image.alt}`"
            @click="openLightbox(image, $event)"
          >
            <img
              :src="image.src"
              :alt="image.alt"
              :width="image.width"
              :height="image.height"
              loading="lazy"
              decoding="async"
            >
          </button>
        </li>
      </ul>
    </div>

    <dialog
      ref="dialogRef"
      class="section-gallery__dialog"
      aria-label="Anteprima immagine"
    >
      <form method="dialog">
        <button
          class="section-gallery__close"
          type="submit"
          aria-label="Chiudi"
        >
          Chiudi
        </button>
      </form>
      <img
        v-if="active"
        class="section-gallery__full"
        :src="active.src"
        :alt="active.alt"
        :width="active.width"
        :height="active.height"
      >
    </dialog>
  </section>
</template>

<style scoped>
.section-gallery {
  padding: var(--space-section) var(--space-page-x);
  scroll-margin-top: var(--header-height);
}

.section-gallery__inner {
  max-width: 60rem;
  margin-inline: auto;
}

.section-gallery__header {
  text-align: center;
  margin-bottom: var(--space-xl);
}

.section-gallery__title {
  font-size: var(--text-title);
  margin-bottom: var(--space-sm);
}

.section-gallery__caption {
  color: var(--color-muted);
  line-height: var(--leading-body);
}

.section-gallery__grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-md);
}

.section-gallery__thumb {
  display: block;
  width: 100%;
  padding: 0;
  border: 0;
  background: var(--color-surface);
  border-radius: var(--radius-soft);
  overflow: hidden;
  cursor: pointer;
  aspect-ratio: 4 / 3;
}

.section-gallery__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.section-gallery__dialog {
  border: var(--stroke-thin) solid var(--color-separator);
  border-radius: var(--radius-soft);
  padding: var(--space-md);
  max-width: min(92vw, 52rem);
  background: var(--color-bg);
  color: var(--color-text);
}

.section-gallery__dialog::backdrop {
  background: color-mix(in srgb, var(--color-text) 45%, transparent);
}

.section-gallery__close {
  margin-bottom: var(--space-sm);
  border: 0;
  background: transparent;
  color: var(--color-text);
  font-family: var(--font-body);
  font-size: var(--text-small);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
}

.section-gallery__full {
  width: 100%;
  height: auto;
  display: block;
}

@media (min-width: 700px) {
  .section-gallery__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
