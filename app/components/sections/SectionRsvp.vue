<script setup lang="ts">
import type { RsvpAttendance, RsvpPayload } from '~/utils/rsvpTransport'
import { createRsvpTransport } from '~/utils/rsvpTransport'

const invitation = useInvitation()
const content = invitation.sections.rsvp
const transport = createRsvpTransport()

const fullName = ref('')
const attendance = ref<RsvpAttendance | ''>('')
const guestCount = ref<number | null>(null)
const message = ref('')

const errors = reactive({
  fullName: '',
  attendance: '',
  guestCount: '',
})

const submitting = ref(false)
const submitted = ref(false)
const successMessage = ref('')
const formError = ref('')

const fullNameId = 'rsvp-full-name'
const attendanceId = 'rsvp-attendance'
const guestCountId = 'rsvp-guest-count'
const messageId = 'rsvp-message'
const formErrorId = 'rsvp-form-error'
const successId = 'rsvp-success'

const fullNameErrorId = 'rsvp-full-name-error'
const attendanceErrorId = 'rsvp-attendance-error'
const guestCountErrorId = 'rsvp-guest-count-error'

const isClosed = ref(false)

onMounted(() => {
  const deadline = new Date(`${invitation.rsvpDeadline}T23:59:59+02:00`)
  isClosed.value = Date.now() > deadline.getTime()
})

const showGuestCount = computed(() => attendance.value === 'yes')

watch(attendance, (value) => {
  if (value !== 'yes') {
    guestCount.value = null
    errors.guestCount = ''
  }
})

function splitName(value: string): { firstName: string, lastName: string } {
  const parts = value.trim().split(/\s+/).filter(Boolean)
  const firstName = parts[0] ?? ''
  const lastName = parts.slice(1).join(' ')
  return { firstName, lastName }
}

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
    if (count == null || Number.isNaN(count) || count < 1) {
      errors.guestCount = 'Indicate almeno una persona.'
    }
    else if (count > 20) {
      errors.guestCount = 'Per gruppi più ampi, scriveteci un messaggio.'
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
  document.getElementById(target.id)?.focus()
}

async function onSubmit() {
  formError.value = ''
  if (!validate()) {
    await nextTick()
    focusFirstError()
    return
  }

  submitting.value = true
  try {
    const { firstName, lastName } = splitName(fullName.value)
    const payload: RsvpPayload = {
      firstName,
      lastName,
      attendance: attendance.value as RsvpAttendance,
      guestCount: attendance.value === 'yes' ? Number(guestCount.value) : 0,
      companionNames: [],
      message: message.value.trim(),
    }

    const result = await transport.submit(payload)
    if (!result.ok) {
      formError.value = 'Non siamo riusciti a completare l’anteprima. Riprovate tra poco.'
      return
    }

    submitted.value = true
    successMessage.value = attendance.value === 'yes'
      ? content.successAttending
      : content.successDeclined

    fullName.value = ''
    attendance.value = ''
    guestCount.value = null
    message.value = ''

    await nextTick()
    document.getElementById(successId)?.focus()
  }
  catch {
    formError.value = 'Non siamo riusciti a completare l’anteprima. Riprovate tra poco.'
  }
  finally {
    submitting.value = false
  }
}
</script>

<template>
  <section
    id="rsvp"
    class="section-rsvp"
  >
    <div class="section-rsvp__stage">
      <header class="section-rsvp__header">
        <h2 class="section-rsvp__title">
          {{ content.title }}
        </h2>
        <p class="section-rsvp__body">
          {{ content.body }}
        </p>
      </header>

      <div class="section-rsvp__card">
        <IlluMonogram :mark="invitation.couple.monogram" />

        <p class="section-rsvp__demo">
          {{ content.demoNote }}
        </p>

        <noscript>
          <p class="section-rsvp__noscript">
            Per provare la conferma è necessario JavaScript.
          </p>
        </noscript>

        <p
          v-if="isClosed"
          class="section-rsvp__closed"
          role="status"
        >
          {{ content.closedMessage }}
        </p>

        <div
          v-else-if="submitted"
          :id="successId"
          class="section-rsvp__success"
          role="status"
          aria-live="polite"
          tabindex="-1"
        >
          <p class="section-rsvp__preview">
            {{ content.previewLabel }}
          </p>
          <p>{{ successMessage }}</p>
        </div>

        <form
          v-else
          class="section-rsvp__form"
          novalidate
          @submit.prevent="onSubmit"
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
              <label class="section-rsvp__choice">
                <input
                  :id="`${attendanceId}-yes`"
                  v-model="attendance"
                  type="radio"
                  name="attendance"
                  value="yes"
                  :aria-invalid="errors.attendance ? 'true' : 'false'"
                  :aria-describedby="errors.attendance ? attendanceErrorId : undefined"
                >
                <span>Ci sarò</span>
              </label>
              <label class="section-rsvp__choice">
                <input
                  :id="`${attendanceId}-no`"
                  v-model="attendance"
                  type="radio"
                  name="attendance"
                  value="no"
                  :aria-invalid="errors.attendance ? 'true' : 'false'"
                  :aria-describedby="errors.attendance ? attendanceErrorId : undefined"
                >
                <span>Non potrò esserci</span>
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

          <div
            v-if="showGuestCount"
            class="section-rsvp__field"
          >
            <label
              class="section-rsvp__label"
              :for="guestCountId"
            >Numero di partecipanti</label>
            <input
              :id="guestCountId"
              v-model.number="guestCount"
              class="section-rsvp__input section-rsvp__input--narrow"
              type="number"
              min="1"
              max="20"
              inputmode="numeric"
              :aria-invalid="errors.guestCount ? 'true' : 'false'"
              :aria-describedby="errors.guestCount ? guestCountErrorId : undefined"
            >
            <p
              v-if="errors.guestCount"
              :id="guestCountErrorId"
              class="section-rsvp__error"
            >
              {{ errors.guestCount }}
            </p>
          </div>

          <div class="section-rsvp__field">
            <label
              class="section-rsvp__label"
              :for="messageId"
            >Messaggio <span class="section-rsvp__optional">(facoltativo)</span></label>
            <textarea
              :id="messageId"
              v-model="message"
              class="section-rsvp__textarea"
              rows="4"
            />
          </div>

          <p
            v-if="formError"
            :id="formErrorId"
            class="section-rsvp__error"
            role="alert"
          >
            {{ formError }}
          </p>

          <UiButton
            type="submit"
            :disabled="submitting"
          >
            {{ submitting ? 'Un attimo…' : content.ctaLabel }}
          </UiButton>
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
  font-size: var(--text-small);
  color: var(--color-muted);
  max-width: 24rem;
}

.section-rsvp__closed,
.section-rsvp__success,
.section-rsvp__noscript {
  text-align: center;
  max-width: 26rem;
  font-family: var(--font-display);
  font-size: clamp(1.15rem, 1rem + 0.5vw, 1.4rem);
  line-height: 1.45;
}

.section-rsvp__preview {
  font-family: var(--font-body);
  font-size: var(--text-small);
  font-style: normal;
  letter-spacing: 0.04em;
  color: var(--color-muted);
  margin-bottom: 0.65rem;
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
  font-size: var(--text-small);
  color: var(--color-forest);
}

.section-rsvp__optional {
  color: var(--color-muted);
}

.section-rsvp__input,
.section-rsvp__textarea {
  width: 100%;
  min-height: 2.75rem;
  padding: 0.55rem 0.7rem;
  border: 0;
  border-bottom: 1px solid var(--color-sand);
  border-radius: 0;
  background: transparent;
  color: var(--color-text);
  font-family: var(--font-body);
  font-size: var(--text-body);
}

.section-rsvp__textarea {
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
.section-rsvp__choice input:focus-visible {
  outline: 2px solid var(--color-bordeaux);
  outline-offset: 2px;
}

.section-rsvp__input[aria-invalid='true'],
.section-rsvp__textarea[aria-invalid='true'] {
  border-color: var(--color-bordeaux);
}

.section-rsvp__choices {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.25rem;
}

.section-rsvp__choice {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 2.5rem;
  cursor: pointer;
}

.section-rsvp__choice input {
  width: 1.05rem;
  height: 1.05rem;
  accent-color: var(--color-bordeaux);
}

.section-rsvp__error {
  margin: 0;
  font-size: var(--text-small);
  color: var(--color-bordeaux);
}

.section-rsvp__form :deep(.ui-button) {
  align-self: center;
  min-width: 12.5rem;
  margin-top: 0.35rem;
}

@media (max-width: 480px) {
  .section-rsvp__card {
    padding-inline: 1.1rem;
  }

  .section-rsvp__form :deep(.ui-button) {
    width: 100%;
  }
}
</style>
