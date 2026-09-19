<script setup lang="ts">
const invitation = useInvitation()
const closing = invitation.sections.closing
const qr = invitation.sections.qr
const showQr = invitation.features.qrCode
</script>

<template>
  <footer class="section-closing">
    <div class="section-closing__inner">
      <IlluRibbon :width="200" />
      <p class="section-closing__line">
        {{ closing.line }}
      </p>
      <p class="section-closing__names">
        {{ invitation.couple.partnerOne }}
        <span
          class="section-closing__amp"
          aria-hidden="true"
        >&amp;</span>
        <span class="sr-only">e </span>
        {{ invitation.couple.partnerTwo }}
      </p>
      <p class="section-closing__date">
        {{ invitation.datetime.dateLabel }}
      </p>

      <UiShareInvite />

      <div
        v-if="showQr && invitation.images.qrCode.src"
        class="section-closing__qr"
      >
        <p class="section-closing__qr-title">
          {{ qr.title }}
        </p>
        <img
          class="section-closing__qr-image"
          :src="invitation.images.qrCode.src"
          :alt="invitation.images.qrCode.alt"
          :width="invitation.images.qrCode.width"
          :height="invitation.images.qrCode.height"
          loading="lazy"
          decoding="async"
        >
        <p class="section-closing__qr-caption">
          {{ qr.caption }}
        </p>
      </div>

      <p
        v-if="closing.credit"
        class="section-closing__credit"
      >
        {{ closing.credit }}
      </p>
      <p class="section-closing__disclaimer">
        {{ closing.disclaimer }}
      </p>
    </div>
  </footer>
</template>

<style scoped>
.section-closing {
  padding: var(--space-section) var(--space-page-x) calc(var(--space-section) + 1.25rem);
  text-align: center;
}

.section-closing__inner {
  max-width: 26rem;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
}

.section-closing__line {
  margin-top: 0.35rem;
  font-family: var(--font-script);
  font-size: clamp(1.8rem, 1.4rem + 1.2vw, 2.4rem);
  line-height: 1.2;
  color: var(--color-bordeaux);
}

.section-closing__names {
  font-family: var(--font-display);
  font-size: clamp(1.7rem, 1.3rem + 1.1vw, 2.2rem);
}

.section-closing__amp {
  font-family: var(--font-script);
  font-size: 0.78em;
  color: var(--color-bordeaux);
  margin-inline: 0.12em;
}

.section-closing__date {
  font-size: var(--text-small);
  letter-spacing: 0.08em;
  color: var(--color-muted);
}

.section-closing__qr {
  margin-top: var(--space-lg);
  padding-top: var(--space-lg);
  border-top: 1px solid var(--color-separator);
  width: 100%;
}

.section-closing__qr-title {
  font-family: var(--font-display);
  font-size: 1.2rem;
  margin-bottom: var(--space-sm);
}

.section-closing__qr-image {
  width: 8rem;
  height: 8rem;
  margin-inline: auto;
  background: var(--color-bg);
}

.section-closing__qr-caption {
  margin-top: var(--space-sm);
  font-size: var(--text-small);
  color: var(--color-muted);
}

.section-closing__credit {
  margin-top: var(--space-lg);
  font-size: 0.75rem;
  letter-spacing: 0.04em;
  color: var(--color-muted);
}

.section-closing__disclaimer {
  font-size: 0.75rem;
  color: var(--color-muted);
  max-width: 22rem;
  line-height: 1.45;
}
</style>
