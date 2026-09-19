<script setup lang="ts">
import { getNavigator, getWindow, isClient } from '~/composables/useBrowser'

const invitation = useInvitation()
const share = invitation.sections.share
const status = ref('')
const canShare = ref(false)
let statusTimer: ReturnType<typeof setTimeout> | null = null

const shareUrl = computed(() => {
  if (!isClient()) return invitation.siteUrl.replace(/\/$/, '')
  const win = getWindow()
  if (!win) return invitation.siteUrl.replace(/\/$/, '')
  return `${win.location.origin}${win.location.pathname}`
})

function setStatus(message: string) {
  status.value = message
  if (statusTimer) clearTimeout(statusTimer)
  statusTimer = setTimeout(() => {
    status.value = ''
  }, 2400)
}

async function copyLink() {
  const nav = getNavigator()
  try {
    await nav?.clipboard?.writeText(shareUrl.value)
    setStatus(share.copiedLabel)
    return
  }
  catch {
    setStatus(shareUrl.value)
  }
}

async function onShare() {
  if (!isClient()) return
  const nav = getNavigator()

  if (canShare.value && nav && typeof nav.share === 'function') {
    try {
      await nav.share({
        title: invitation.couple.displayName,
        text: share.text,
        url: shareUrl.value,
      })
      return
    }
    catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return
    }
  }

  await copyLink()
}

onMounted(() => {
  const nav = getNavigator()
  canShare.value = !!nav && typeof nav.share === 'function'
})

onUnmounted(() => {
  if (statusTimer) clearTimeout(statusTimer)
})
</script>

<template>
  <div class="share-invite no-print">
    <div class="share-invite__row">
      <button
        v-if="canShare"
        class="share-invite__btn"
        type="button"
        @click="onShare"
      >
        {{ share.buttonLabel }}
      </button>
      <button
        class="share-invite__btn"
        type="button"
        @click="copyLink"
      >
        {{ share.copyLabel }}
      </button>
    </div>
    <p
      class="share-invite__status"
      role="status"
      aria-live="polite"
    >
      {{ status }}
    </p>
  </div>
</template>

<style scoped>
.share-invite {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  margin-top: var(--space-sm);
}

.share-invite__row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.25rem 1rem;
}

.share-invite__btn {
  min-height: 2.75rem;
  min-width: 2.75rem;
  padding: 0 0.4rem;
  border: 0;
  background: transparent;
  color: var(--color-muted);
  font-family: var(--font-body);
  font-size: 0.875rem;
  text-decoration: underline;
  text-underline-offset: 0.22em;
  cursor: pointer;
}

.share-invite__btn:hover,
.share-invite__btn:focus-visible {
  color: var(--color-forest);
}

.share-invite__status {
  min-height: 1.25rem;
  font-size: 0.875rem;
  color: var(--color-muted);
  word-break: break-all;
  text-align: center;
  max-width: 22rem;
}
</style>
