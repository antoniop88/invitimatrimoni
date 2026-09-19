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
        <div class="opening__well">
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
  overflow: hidden;
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
  padding: clamp(2.75rem, 8vw, 4.75rem) clamp(1.5rem, 7vw, 4.25rem) clamp(2.5rem, 7vw, 4.25rem);
}

.opening__well {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: min(28rem, 100%);
  padding: 1.35rem 1.6rem 1.7rem;
  background: radial-gradient(
    ellipse 135% 115% at 50% 46%,
    color-mix(in srgb, var(--color-paper) 82%, white) 0%,
    color-mix(in srgb, var(--color-paper) 52%, transparent) 32%,
    color-mix(in srgb, var(--color-paper) 22%, transparent) 58%,
    color-mix(in srgb, var(--color-paper) 8%, transparent) 78%,
    transparent 100%
  );
}

.opening__kicker {
  margin-top: var(--space-md);
  max-width: 18rem;
  font-family: var(--font-body);
  font-size: 0.8125rem;
  letter-spacing: 0.11em;
  text-transform: uppercase;
  line-height: 1.55;
  color: var(--color-muted);
}

.opening__names {
  margin: 1.15rem 0 1.35rem;
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
  margin-top: 0.7rem;
  font-size: 0.9375rem;
  letter-spacing: 0.05em;
  line-height: 1.45;
  color: var(--color-forest);
}

.opening__close {
  margin-top: 1.35rem;
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
  font-size: 0.875rem;
  letter-spacing: 0.06em;
  color: var(--color-muted);
  text-decoration: none;
}

.opening__scroll:hover,
.opening__scroll:focus-visible {
  color: var(--color-forest);
}

@media (prefers-reduced-motion: no-preference) {
  html.js .opening__card {
    animation: invite-rise 0.52s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  html.js .opening__names {
    animation: invite-rise 0.48s 0.14s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  html.js .opening__date {
    animation: invite-rise 0.46s 0.26s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  html.js .opening__close {
    animation: invite-rise 0.46s 0.38s cubic-bezier(0.22, 1, 0.36, 1) both;
  }
}

@media (max-width: 639px) {
  .opening {
    padding-top: 1.1rem;
  }

  .opening__inner {
    padding: 2.6rem 1.1rem 2.2rem;
  }

  .opening__well {
    width: min(21rem, 100%);
    padding: 0.85rem 1rem 1.1rem;
  }

  .opening__kicker {
    max-width: 14rem;
  }

  .opening__place {
    max-width: 16rem;
  }
}
</style>
