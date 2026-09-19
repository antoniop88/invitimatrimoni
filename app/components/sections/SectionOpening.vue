<script setup lang="ts">
const invitation = useInvitation()
const opening = invitation.sections.opening
</script>

<template>
  <section
    id="top"
    class="opening"
  >
    <div class="opening__card">
      <div
        class="opening__frame"
        aria-hidden="true"
      >
        <IlluBotanicalFrame />
      </div>

      <div class="opening__inner">
        <IlluMonogram :mark="invitation.couple.monogram" />

        <p class="opening__kicker">
          {{ opening.kicker }}
        </p>

        <h1 class="opening__names">
          <span class="opening__name">{{ invitation.couple.partnerOne }}</span>
          <span
            class="opening__amp"
            aria-hidden="true"
          >&amp;</span>
          <span class="sr-only">e </span>
          <span class="opening__name">{{ invitation.couple.partnerTwo }}</span>
        </h1>

        <p class="opening__date">
          {{ invitation.datetime.dateLabel }}
        </p>
        <p class="opening__place">
          {{ invitation.location.name }}
          <span aria-hidden="true"> · </span>
          Valle d’Itria
        </p>
        <p class="opening__close">
          {{ opening.closingLine }}
        </p>
      </div>
    </div>

    <a
      class="opening__scroll"
      href="#momento"
    >
      {{ opening.scrollLabel }}
      <span aria-hidden="true"> ↓</span>
    </a>
  </section>
</template>

<style scoped>
.opening {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: clamp(1.5rem, 3vw, 2.75rem) var(--space-page-x) var(--space-md);
}

.opening__card {
  position: relative;
  width: min(var(--invite-width), 100%);
  margin-inline: auto;
  background: color-mix(in srgb, var(--color-paper) 92%, white);
}

.opening__frame {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.opening__inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: clamp(3.25rem, 9vw, 5.75rem) clamp(1.75rem, 8vw, 5rem) clamp(2.75rem, 7vw, 4.75rem);
}

.opening__kicker {
  margin-top: var(--space-md);
  max-width: 18rem;
  font-family: var(--font-body);
  font-size: var(--text-small);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  line-height: 1.55;
  color: var(--color-muted);
}

.opening__names {
  margin: var(--space-md) 0 var(--space-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.opening__name {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: var(--text-display);
  line-height: var(--leading-display);
  letter-spacing: var(--tracking-display);
}

.opening__amp {
  font-family: var(--font-script);
  font-size: clamp(2.4rem, 1.6rem + 3vw, 3.6rem);
  line-height: 0.7;
  color: var(--color-bordeaux);
  margin-block: 0.12em;
}

.opening__date {
  font-family: var(--font-display);
  font-size: clamp(1.35rem, 1.1rem + 0.9vw, 1.85rem);
  letter-spacing: 0.04em;
}

.opening__place {
  margin-top: 0.35rem;
  font-size: var(--text-small);
  letter-spacing: 0.06em;
  color: var(--color-muted);
}

.opening__close {
  margin-top: var(--space-lg);
  font-family: var(--font-display);
  font-style: italic;
  font-size: clamp(1.15rem, 1rem + 0.55vw, 1.45rem);
  line-height: 1.4;
  max-width: 16rem;
}

.opening__scroll {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  width: max-content;
  margin: var(--space-md) auto 0;
  min-height: 2.75rem;
  font-family: var(--font-body);
  font-size: var(--text-small);
  letter-spacing: 0.06em;
  color: var(--color-muted);
  text-decoration: none;
}

.opening__scroll:hover {
  color: var(--color-forest);
}

@media (max-width: 639px) {
  .opening {
    padding-top: 1.1rem;
  }

  .opening__inner {
    padding: 3rem 1.35rem 2.4rem;
  }

  .opening__kicker {
    max-width: 14rem;
  }
}
</style>
