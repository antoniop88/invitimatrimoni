<script setup lang="ts">
import { getNavigator } from '~/composables/useBrowser'

const invitation = useInvitation()
const content = invitation.sections.registry
const copied = ref(false)
let copyTimer: ReturnType<typeof setTimeout> | null = null

async function copyIban() {
  const nav = getNavigator()
  try {
    await nav?.clipboard?.writeText(content.iban)
    copied.value = true
    if (copyTimer) clearTimeout(copyTimer)
    copyTimer = setTimeout(() => {
      copied.value = false
    }, 2200)
  }
  catch {
    copied.value = false
  }
}

onUnmounted(() => {
  if (copyTimer) clearTimeout(copyTimer)
})
</script>

<template>
  <section
    id="lista-nozze"
    class="section-registry"
  >
    <div class="section-registry__inner">
      <h2 class="section-registry__title">
        {{ content.title }}
      </h2>
      <p class="section-registry__body">
        {{ content.body }}
      </p>

      <div class="section-registry__iban-block">
        <p class="section-registry__holder">
          {{ content.ibanHolder }}
        </p>
        <p class="section-registry__iban">
          <span class="sr-only">IBAN</span>
          {{ content.iban }}
        </p>
        <UiButton
          type="button"
          variant="secondary"
          @click="copyIban"
        >
          Copia IBAN
        </UiButton>
        <p
          class="section-registry__feedback"
          role="status"
          aria-live="polite"
        >
          <span v-if="copied">IBAN copiato.</span>
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-registry {
  padding: var(--space-section) var(--space-page-x);
  scroll-margin-top: var(--header-height);
}

.section-registry__inner {
  max-width: 34rem;
  margin-inline: auto;
  text-align: center;
}

.section-registry__title {
  font-size: var(--text-title);
  margin-bottom: var(--space-md);
}

.section-registry__body {
  color: var(--color-muted);
  line-height: var(--leading-body);
  margin-bottom: var(--space-lg);
}

.section-registry__iban-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
  padding-top: var(--space-md);
  border-top: var(--stroke-rule) solid var(--color-separator);
}

.section-registry__holder {
  font-size: var(--text-small);
  color: var(--color-muted);
}

.section-registry__iban {
  font-family: var(--font-body);
  font-size: clamp(0.95rem, 0.85rem + 0.4vw, 1.05rem);
  letter-spacing: 0.04em;
  word-break: break-all;
}

.section-registry__feedback {
  min-height: 1.25rem;
  font-size: var(--text-small);
  color: var(--color-muted);
}
</style>
