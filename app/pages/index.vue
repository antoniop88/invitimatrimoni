<script setup lang="ts">
const invitation = useInvitation()
const { isDemoMode, hydrateThemeFromStorage } = useTheme()
const pageRef = ref<HTMLElement | null>(null)

useReveal(pageRef)

const ogImage = computed(() => `${invitation.siteUrl.replace(/\/$/, '')}/og-image.png`)
const description = 'Giulia e Andrea vi invitano a festeggiare il 19 giugno 2027 in Valle d\'Itria.'

useHead(() => ({
  title: 'Giulia & Andrea · Anteprima invito — upstudio',
  htmlAttrs: {
    lang: 'it',
  },
  meta: [
    { name: 'description', content: description },
    { name: 'robots', content: 'noindex, nofollow' },
    { name: 'theme-color', content: '#FAF6EF' },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'it_IT' },
    { property: 'og:title', content: 'Giulia & Andrea — 19 giugno 2027' },
    { property: 'og:description', content: description },
    { property: 'og:image', content: ogImage.value },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:url', content: invitation.siteUrl },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Giulia & Andrea — 19 giugno 2027' },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: ogImage.value },
  ],
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' },
    { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
  ],
}))

onMounted(() => {
  hydrateThemeFromStorage()
})
</script>

<template>
  <div
    ref="pageRef"
    class="page"
  >
    <SectionOpening />
    <SiteHeader />

    <main>
      <SectionMoment />
      <SectionInvitation />
      <SectionStory />
      <SectionPlace />
      <SectionDay />
      <SectionInfo />

      <SectionFaq v-if="invitation.features.faq" />
      <SectionStays v-if="invitation.features.accommodations" />
      <SectionShuttle v-if="invitation.features.shuttle" />
      <SectionGallery v-if="invitation.features.gallery" />

      <SectionRsvp />
      <SectionRegistry v-if="invitation.features.listaNozze" />
      <SectionClosing />
    </main>

    <aside
      v-if="isDemoMode"
      class="page__theme no-print"
      aria-label="Atmosfera visiva"
    >
      <UiThemeDots />
    </aside>
  </div>
</template>

<style scoped>
.page {
  min-height: 100svh;
  background: var(--color-bg);
  color: var(--color-text);
  overflow-x: clip;
}

.page__theme {
  position: fixed;
  right: max(0.75rem, var(--space-page-x));
  bottom: var(--space-md);
  z-index: 30;
}
</style>
