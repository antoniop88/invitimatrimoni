<script setup lang="ts">
import { getNavigator, isClient } from '~/composables/useBrowser'

const invitation = useInvitation()
const share = invitation.sections.share
const status = ref('')
let statusTimer: ReturnType<typeof setTimeout> | null = null

const shareUrl = computed(() => invitation.siteUrl)
const shareText = computed(() => `${share.text} ${shareUrl.value}`)

function setStatus(message: string) {
  status.value = message
  if (statusTimer) clearTimeout(statusTimer)
  statusTimer = setTimeout(() => {
    status.value = ''
  }, 2400)
}

async function onShare() {
  if (!isClient()) return
  const nav = getNavigator()

  if (nav && 'share' in nav && typeof nav.share === 'function') {
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

  const wa = `https://wa.me/?text=${encodeURIComponent(shareText.value)}`
  const opened = window.open(wa, '_blank', 'noopener,noreferrer')
  if (opened) return

  try {
    await nav?.clipboard?.writeText(shareUrl.value)
    setStatus(share.copiedLabel)
  }
  catch {
    setStatus(shareUrl.value)
  }
}

onUnmounted(() => {
  if (statusTimer) clearTimeout(statusTimer)
})
</script>

<template>
  <div class="share-invite no-print">
    <button
      class="share-invite__btn"
      type="button"
      @click="onShare"
    >
      {{ share.buttonLabel }}
    </button>
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

.share-invite__btn {
  min-height: 2.75rem;
  padding: 0 0.4rem;
  border: 0;
  background: transparent;
  color: var(--color-muted);
  font-family: var(--font-body);
  font-size: var(--text-small);
  text-decoration: underline;
  text-underline-offset: 0.22em;
  cursor: pointer;
}

.share-invite__status {
  min-height: 1.25rem;
  font-size: var(--text-small);
  color: var(--color-muted);
}
</style>
