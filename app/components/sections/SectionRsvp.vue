<script setup lang="ts">
import type { RsvpAttendance, RsvpDraft } from '~/utils/rsvpMessage'
import { buildRsvpMessage } from '~/utils/rsvpMessage'
import { resolveRsvpChannel } from '~/utils/rsvpChannel'
import { buildWhatsappUrl } from '~/utils/whatsapp'
import { getNavigator, getWindow } from '~/composables/useBrowser'
import { prefersReducedMotion } from '~/composables/usePrefersReducedMotion'

const invitation = useInvitation()
const content = invitation.sections.rsvp
const channel = resolveRsvpChannel(invitation)
const isWhatsapp = channel.mode === 'whatsapp'

const fullName = ref('')
const attendance = ref<RsvpAttendance | ''>('')
const guestCountRaw = ref('')
const companionNames = ref('')
const message = ref('')

const errors = reactive({
  fullName: '',
  attendance: '',
  guestCount: '',
})

const formError = ref('')
const copyStatus = ref('')
const copyFailed = ref(false)
const handedOff = ref(false)
const lastWhatsappUrl = ref('')
const burstConfetti = ref(false)
const confettiUsed = ref(false)

const fullNameId = 'rsvp-full-name'
const attendanceId = 'rsvp-attendance'
const guestCountId = 'rsvp-guest-count'
const companionsId = 'rsvp-companions'
const messageId = 'rsvp-message'
const formErrorId = 'rsvp-form-error'
const previewId = 'rsvp-preview'
const statusId = 'rsvp-status'
const fallbackId = 'rsvp-copy-fallback'

const fullNameErrorId = 'rsvp-full-name-error'
const attendanceErrorId = 'rsvp-attendance-error'
const guestCountErrorId = 'rsvp-guest-count-error'

const isClosed = ref(false)
let copyTimer: ReturnType<typeof setTimeout> | null = null

onMounted(() => {
  const deadline = new Date(`${invitation.rsvpDeadline}T23:59:59+02:00`)
  isClosed.value = Date.now() > deadline.getTime()
})

onUnmounted(() => {
  if (copyTimer) clearTimeout(copyTimer)
})

const showGuestCount = computed(() => attendance.value === 'yes')
const guestCount = computed(() => {
  if (guestCountRaw.value === '') return null
  const parsed = Number.parseInt(guestCountRaw.value, 10)
  return Number.isInteger(parsed) ? parsed : null
})
const showCompanions = computed(() => (
  attendance.value === 'yes'
  && typeof guestCount.value === 'number'
  && guestCount.value > 1
))

const messageContext = {
  partnerOne: invitation.couple.partnerOne,
  partnerTwo: invitation.couple.partnerTwo,
  dateLabel: invitation.datetime.dateLabel,
}

const draft = computed<RsvpDraft>(() => ({
  fullName: fullName.value,
  attendance: attendance.value,
  guestCount: attendance.value === 'yes' ? guestCount.value : null,
  companionNames: showCompanions.value ? companionNames.value : '',
  personalMessage: message.value,
}))

const previewMessage = computed(() => buildRsvpMessage(draft.value, messageContext))

watch(attendance, (value, previous) => {
  if (value !== 'yes') {
    errors.guestCount = ''
  }
  if (value === 'yes' && previous !== 'yes' && !confettiUsed.value && !prefersReducedMotion()) {
    burstConfetti.value = false
    nextTick(() => {
      burstConfetti.value = true
      confettiUsed.value = true
    })
  }
})

function validate(): boolean {
  const name = fullName.value.trim()
  if (!name) {
    errors.fullName = 'Indicate nome e cognome.'
  }
  else if (!name.includes(' ')) {
    errors.fullName = 'Indicate anche il cognome.'
  }
  else {
    errors.fullName = ''
  }

  errors.attendance = attendance.value ? '' : 'Selezionate una risposta.'

  if (attendance.value === 'yes') {
    const count = guestCount.value
    if (count == null || !Number.isInteger(count) || count < 1) {
      errors.guestCount = 'Indicate un numero intero positivo.'
    }
    else if (count > channel.maxGuests) {
      errors.guestCount = `Il massimo indicato è ${channel.maxGuests}. Per gruppi più ampi, scriveteci.`
    }
    else {
      errors.guestCount = ''
    }
  }
  else {
    errors.guestCount = ''
  }

  return !errors.fullName && !errors.attendance && !errors.guestCount
}

function focusFirstError() {
  const order: Array<{ err: string, id: string }> = [
    { err: errors.fullName, id: fullNameId },
    { err: errors.attendance, id: `${attendanceId}-yes` },
    { err: errors.guestCount, id: guestCountId },
  ]
  const target = order.find(item => item.err)
  if (!target) return
  getWindow()?.document.getElementById(target.id)?.focus()
}

function setCopyStatus(text: string) {
  copyStatus.value = text
  if (copyTimer) clearTimeout(copyTimer)
  copyTimer = setTimeout(() => {
    copyStatus.value = ''
  }, 2800)
}

async function copyText(text: string): Promise<boolean> {
  const nav = getNavigator()
  try {
    if (nav?.clipboard?.writeText) {
      await nav.clipboard.writeText(text)
      return true
    }
  }
  catch {
    // Fall through to execCommand / selectable fallback.
  }

  const doc = getWindow()?.document
  if (!doc) return false

  const holder = doc.createElement('textarea')
  holder.value = text
  holder.setAttribute('readonly', '')
  holder.style.position = 'fixed'
  holder.style.left = '-9999px'
  doc.body.appendChild(holder)
  holder.select()
  let ok = false
  try {
    ok = doc.execCommand('copy')
  }
  catch {
    ok = false
  }
  holder.remove()
  return ok
}

async function copyMessage() {
  formError.value = ''
  copyFailed.value = false
  if (!validate()) {
    await nextTick()
    focusFirstError()
    return false
  }

  const text = previewMessage.value
  if (!text) return false

  const ok = await copyText(text)
  if (ok) {
    copyFailed.value = false
    setCopyStatus(content.copiedLabel)
    return true
  }

  copyFailed.value = true
  setCopyStatus(content.copyFallback)
  await nextTick()
  const fallback = getWindow()?.document.getElementById(fallbackId) as HTMLTextAreaElement | null
  fallback?.focus()
  fallback?.select()
  return false
}

async function onDemoSubmit() {
  await copyMessage()
}

async function onWhatsappSubmit() {
  formError.value = ''
  if (!validate()) {
    await nextTick()
    focusFirstError()
    return
  }

  const text = previewMessage.value
  const url = buildWhatsappUrl(channel.whatsappNumber, text)
  if (!url) {
    formError.value = 'Il collegamento WhatsApp non è disponibile. Copiate il messaggio.'
    return
  }

  lastWhatsappUrl.value = url
  handedOff.value = true
  const win = getWindow()
  win?.open(url, '_blank', 'noopener,noreferrer')
  await nextTick()
  win?.document.getElementById(statusId)?.focus()
}

function retryWhatsapp() {
  if (!lastWhatsappUrl.value) return
  getWindow()?.open(lastWhatsappUrl.value, '_blank', 'noopener,noreferrer')
}
</script>

<template>
  <section
    id="rsvp"
    class="section-rsvp"
  >
    <div class="section-rsvp__stage">
      <header class="section-rsvp__header">
        <h2
          class="section-rsvp__title"
          data-reveal
        >
          {{ content.title }}
        </h2>
        <p
          class="section-rsvp__body"
          data-reveal
          style="--reveal-delay: 80ms"
        >
          {{ content.body }}
        </p>
      </header>

      <div class="section-rsvp__card">
        <IlluMonogram :mark="invitation.couple.monogram" />

        <p
          v-if="!isWhatsapp"
          class="section-rsvp__demo"
        >
          {{ content.demoNote }}
        </p>

        <noscript>
          <p class="section-rsvp__noscript">
            Per confermare è necessario JavaScript.
          </p>
        </noscript>

        <p
          v-if="isClosed"
          class="section-rsvp__closed"
          role="status"
        >
          {{ content.closedMessage }}
        </p>

        <form
          v-else
          class="section-rsvp__form"
          novalidate
          @submit.prevent="isWhatsapp ? onWhatsappSubmit() : onDemoSubmit()"
        >
          <div class="section-rsvp__field">
            <label
              class="section-rsvp__label"
              :for="fullNameId"
            >Nome e cognome</label>
            <input
              :id="fullNameId"
              v-model="fullName"
              class="section-rsvp__input"
              type="text"
              autocomplete="name"
              autocapitalize="words"
              :aria-invalid="errors.fullName ? 'true' : 'false'"
              :aria-describedby="errors.fullName ? fullNameErrorId : undefined"
            >
            <p
              v-if="errors.fullName"
              :id="fullNameErrorId"
              class="section-rsvp__error"
            >
              {{ errors.fullName }}
            </p>
          </div>

          <fieldset class="section-rsvp__fieldset">
            <legend class="section-rsvp__label">
              Sarai con noi?
            </legend>
            <div class="section-rsvp__choices">
              <label
                class="section-rsvp__choice"
                :class="{ 'section-rsvp__choice--on': attendance === 'yes' }"
              >
                <input
                  :id="`${attendanceId}-yes`"
                  v-model="attendance"
                  class="sr-only"
                  type="radio"
                  name="attendance"
                  value="yes"
                  :aria-invalid="errors.attendance ? 'true' : 'false'"
                  :aria-describedby="errors.attendance ? attendanceErrorId : undefined"
                >
                <span
                  class="section-rsvp__tick"
                  aria-hidden="true"
                />
                <span class="section-rsvp__choice-copy">
                  <span class="section-rsvp__choice-title">{{ content.attendingTitle }}</span>
                  <span class="section-rsvp__choice-sub">{{ content.attendingSubtitle }}</span>
                </span>
                <UiConfettiBurst :active="burstConfetti" />
              </label>
              <label
                class="section-rsvp__choice"
                :class="{ 'section-rsvp__choice--on': attendance === 'no' }"
              >
                <input
                  :id="`${attendanceId}-no`"
                  v-model="attendance"
                  class="sr-only"
                  type="radio"
                  name="attendance"
                  value="no"
                  :aria-invalid="errors.attendance ? 'true' : 'false'"
                  :aria-describedby="errors.attendance ? attendanceErrorId : undefined"
                >
                <span
                  class="section-rsvp__tick"
                  aria-hidden="true"
                />
                <span class="section-rsvp__choice-copy">
                  <span class="section-rsvp__choice-title">{{ content.declinedTitle }}</span>
                  <span class="section-rsvp__choice-sub">{{ content.declinedSubtitle }}</span>
                </span>
              </label>
            </div>
            <p
              v-if="errors.attendance"
              :id="attendanceErrorId"
              class="section-rsvp__error"
            >
              {{ errors.attendance }}
            </p>
          </fieldset>

          <Transition name="rsvp-expand">
            <div
              v-if="showGuestCount"
              class="section-rsvp__field"
            >
              <label
                class="section-rsvp__label"
                :for="guestCountId"
              >{{ content.guestCountLabel }}</label>
              <p
                :id="`${guestCountId}-hint`"
                class="section-rsvp__hint"
              >
                {{ content.guestCountHint }}
              </p>
              <input
                :id="guestCountId"
                v-model="guestCountRaw"
                class="section-rsvp__input section-rsvp__input--narrow"
                type="number"
                min="1"
                :max="channel.maxGuests"
                step="1"
                inputmode="numeric"
                :aria-invalid="errors.guestCount ? 'true' : 'false'"
                :aria-describedby="errors.guestCount ? `${guestCountId}-hint ${guestCountErrorId}` : `${guestCountId}-hint`"
              >
              <p
                v-if="errors.guestCount"
                :id="guestCountErrorId"
                class="section-rsvp__error"
              >
                {{ errors.guestCount }}
              </p>
            </div>
          </Transition>

          <Transition name="rsvp-expand">
            <div
              v-if="showCompanions"
              class="section-rsvp__field"
            >
              <label
                class="section-rsvp__label"
                :for="companionsId"
              >
                {{ content.companionsLabel }}
                <span class="section-rsvp__optional">({{ content.companionsHint }})</span>
              </label>
              <input
                :id="companionsId"
                v-model="companionNames"
                class="section-rsvp__input"
                type="text"
                autocomplete="off"
              >
            </div>
          </Transition>

          <div class="section-rsvp__field">
            <label
              class="section-rsvp__label"
              :for="messageId"
            >
              {{ content.messageLabel }}
              <span class="section-rsvp__optional">(facoltativo)</span>
            </label>
            <textarea
              :id="messageId"
              v-model="message"
              class="section-rsvp__textarea"
              rows="4"
            />
          </div>

          <div
            :id="previewId"
            class="section-rsvp__preview"
          >
            <p class="section-rsvp__preview-label">
              {{ content.previewHeading }}
            </p>
            <pre
              class="section-rsvp__preview-body"
              aria-hidden="true"
            >{{ previewMessage || content.previewEmpty }}</pre>
          </div>

          <p
            v-if="formError"
            :id="formErrorId"
            class="section-rsvp__error"
            role="alert"
          >
            {{ formError }}
          </p>

          <p
            v-if="isWhatsapp"
            class="section-rsvp__note"
          >
            {{ content.whatsappNote }}
          </p>

          <UiButton
            v-if="isWhatsapp"
            type="submit"
          >
            <svg
              class="section-rsvp__wa-icon"
              viewBox="0 0 24 24"
              width="18"
              height="18"
              aria-hidden="true"
              focusable="false"
            >
              <path
                fill="currentColor"
                d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm.01 1.8c2.17 0 4.2.85 5.73 2.38a8.1 8.1 0 0 1 2.38 5.73c0 4.47-3.64 8.11-8.11 8.11-1.42 0-2.81-.37-4.03-1.08l-.29-.17-3.11.82.83-3.04-.18-.31a8.07 8.07 0 0 1-1.11-4.33c0-4.47 3.64-8.11 8.11-8.11zM8.54 7.5c-.17-.37-.35-.38-.51-.38h-.43c-.15 0-.39.06-.59.3-.2.24-.77.75-.77 1.84s.79 2.14.9 2.29c.11.15 1.54 2.46 3.79 3.35 1.87.75 2.25.6 2.66.56.4-.04 1.31-.54 1.49-1.05.18-.52.18-.96.12-1.05-.06-.1-.23-.15-.48-.26-.25-.12-1.48-.73-1.71-.81-.23-.08-.4-.12-.56.12-.16.24-.64.81-.79.98-.14.16-.29.18-.54.06-.25-.12-1.05-.39-2-1.24-.74-.66-1.24-1.47-1.38-1.72-.15-.24-.02-.37.11-.5.11-.11.25-.29.37-.43.12-.14.16-.24.25-.4.08-.16.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85z"
              />
            </svg>
            {{ content.whatsappCta }}
          </UiButton>

          <UiButton
            v-else
            type="submit"
          >
            {{ content.copyCta }}
          </UiButton>

          <p
            v-if="handedOff"
            :id="statusId"
            class="section-rsvp__handoff"
            tabindex="-1"
          >
            {{ content.afterWhatsapp }}
          </p>

          <div
            v-if="handedOff"
            class="section-rsvp__after"
          >
            <a
              class="section-rsvp__retry"
              :href="lastWhatsappUrl"
              target="_blank"
              rel="noopener noreferrer"
              @click.prevent="retryWhatsapp"
            >{{ content.retryLabel }}</a>
            <button
              class="section-rsvp__copy"
              type="button"
              @click="copyMessage"
            >
              {{ content.copyCta }}
            </button>
          </div>

          <p
            class="section-rsvp__copy-status"
            role="status"
            aria-live="polite"
          >
            {{ copyStatus }}
          </p>

          <textarea
            v-if="copyFailed && previewMessage"
            :id="fallbackId"
            class="section-rsvp__fallback"
            readonly
            rows="8"
            :value="previewMessage"
          />
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-rsvp {
  padding: var(--space-section) var(--space-page-x);
  background: color-mix(in srgb, var(--color-blush) 70%, var(--color-paper));
}

.section-rsvp__stage {
  max-width: 40rem;
  margin-inline: auto;
}

.section-rsvp__header {
  text-align: center;
  margin-bottom: var(--space-lg);
}

.section-rsvp__title {
  font-size: var(--text-title);
  margin-bottom: 0.35rem;
}

.section-rsvp__body {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 1.2rem;
}

.section-rsvp__card {
  max-width: 35rem;
  margin-inline: auto;
  padding: 1.75rem 1.4rem 2rem;
  background: var(--color-paper);
  border: 1px solid color-mix(in srgb, var(--color-sand) 90%, transparent);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.section-rsvp__demo {
  margin: 0.85rem 0 1.1rem;
  text-align: center;
  font-size: 0.9375rem;
  color: var(--color-forest);
  max-width: 26rem;
}

.section-rsvp__closed,
.section-rsvp__noscript {
  text-align: center;
  max-width: 26rem;
  font-family: var(--font-display);
  font-size: clamp(1.15rem, 1rem + 0.5vw, 1.4rem);
  line-height: 1.45;
}

.section-rsvp__noscript {
  margin-bottom: var(--space-md);
  font-family: var(--font-body);
  font-size: var(--text-body);
  color: var(--color-muted);
}

.section-rsvp__form {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  width: 100%;
}

.section-rsvp__field,
.section-rsvp__fieldset {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  border: 0;
  margin: 0;
  padding: 0;
  min-width: 0;
}

.section-rsvp__label {
  font-family: var(--font-body);
  font-size: 0.9375rem;
  color: var(--color-forest);
}

.section-rsvp__optional,
.section-rsvp__hint {
  color: var(--color-muted);
  font-size: 0.875rem;
}

.section-rsvp__input,
.section-rsvp__textarea,
.section-rsvp__fallback {
  width: 100%;
  min-height: 2.75rem;
  padding: 0.55rem 0.7rem;
  border: 0;
  border-bottom: 1px solid var(--color-sand);
  border-radius: 0;
  background: transparent;
  color: var(--color-text);
  font-family: var(--font-body);
  font-size: 1rem;
}

.section-rsvp__textarea,
.section-rsvp__fallback {
  min-height: 6.5rem;
  resize: vertical;
  border: 1px solid var(--color-sand);
  padding: 0.65rem 0.7rem;
}

.section-rsvp__input--narrow {
  max-width: 6.5rem;
}

.section-rsvp__input:focus-visible,
.section-rsvp__textarea:focus-visible,
.section-rsvp__choice:focus-within {
  outline: 2px solid var(--color-bordeaux);
  outline-offset: 3px;
}

.section-rsvp__input[aria-invalid='true'],
.section-rsvp__textarea[aria-invalid='true'] {
  border-color: var(--color-bordeaux);
}

.section-rsvp__choices {
  display: grid;
  gap: 0.7rem;
}

.section-rsvp__choice {
  position: relative;
  display: grid;
  grid-template-columns: 1.35rem 1fr;
  gap: 0.75rem;
  align-items: start;
  min-height: 4.5rem;
  padding: 0.9rem 1rem;
  border: 1px solid var(--color-sand);
  background: color-mix(in srgb, var(--color-paper) 88%, white);
  cursor: pointer;
  overflow: hidden;
}

.section-rsvp__choice--on {
  border-color: var(--color-bordeaux);
  background: color-mix(in srgb, var(--color-blush) 45%, var(--color-paper));
}

.section-rsvp__tick {
  width: 1.15rem;
  height: 1.15rem;
  margin-top: 0.2rem;
  border: 1.5px solid var(--color-sand);
  border-radius: 50%;
  background: var(--color-paper);
}

.section-rsvp__choice--on .section-rsvp__tick {
  border-color: var(--color-bordeaux);
  background: var(--color-bordeaux);
  box-shadow: inset 0 0 0 2px var(--color-paper);
}

.section-rsvp__choice--on .section-rsvp__tick::after {
  content: '';
  display: block;
  width: 0.28rem;
  height: 0.5rem;
  margin: 0.12rem auto 0;
  border-right: 1.6px solid var(--color-paper);
  border-bottom: 1.6px solid var(--color-paper);
  transform: rotate(45deg);
}

.section-rsvp__choice-copy {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.section-rsvp__choice-title {
  font-family: var(--font-display);
  font-size: 1.25rem;
  color: var(--color-forest);
}

.section-rsvp__choice-sub {
  font-size: 0.9375rem;
  color: var(--color-muted);
}

.section-rsvp__preview {
  padding: 0.85rem 0.95rem;
  border: 1px solid color-mix(in srgb, var(--color-sand) 90%, transparent);
  background: color-mix(in srgb, var(--color-blush) 28%, var(--color-paper));
}

.section-rsvp__preview-label {
  font-size: 0.8125rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-muted);
  margin-bottom: 0.45rem;
}

.section-rsvp__preview-body {
  margin: 0;
  white-space: pre-wrap;
  font-family: var(--font-body);
  font-size: 0.9375rem;
  line-height: 1.55;
  color: var(--color-forest);
}

.section-rsvp__note,
.section-rsvp__handoff {
  text-align: center;
  font-size: 0.9375rem;
  color: var(--color-forest);
  max-width: 28rem;
  margin-inline: auto;
}

.section-rsvp__after {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem 1rem;
}

.section-rsvp__retry,
.section-rsvp__copy {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.75rem;
  min-width: 2.75rem;
  padding: 0 0.4rem;
  border: 0;
  background: transparent;
  color: var(--color-bordeaux);
  font-family: var(--font-body);
  font-size: 0.9375rem;
  text-decoration: underline;
  text-underline-offset: 0.22em;
  cursor: pointer;
}

.section-rsvp__copy-status {
  min-height: 1.25rem;
  text-align: center;
  font-size: 0.875rem;
  color: var(--color-forest);
}

.section-rsvp__error {
  margin: 0;
  font-size: 0.875rem;
  color: var(--color-bordeaux);
}

.section-rsvp__form :deep(.ui-button) {
  align-self: center;
  min-width: 14rem;
  margin-top: 0.15rem;
}

.section-rsvp__wa-icon {
  flex-shrink: 0;
}

.rsvp-expand-enter-active,
.rsvp-expand-leave-active {
  transition: opacity 220ms ease, transform 220ms ease;
}

.rsvp-expand-enter-from,
.rsvp-expand-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: 480px) {
  .section-rsvp__card {
    padding-inline: 1.1rem;
  }

  .section-rsvp__form :deep(.ui-button) {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .rsvp-expand-enter-active,
  .rsvp-expand-leave-active {
    transition: none;
  }
}
</style>
