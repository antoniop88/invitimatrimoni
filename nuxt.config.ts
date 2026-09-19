// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  // Devtools off for lighter production-like local preview of the invite.
  devtools: { enabled: false },

  // SSR remains enabled; `nuxt generate` prerenders HTML for static hosting.
  css: ['~/assets/css/main.css'],

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  app: {
    head: {
      htmlAttrs: {
        lang: 'it',
      },
      // Marks JS availability early so CSS can hide the RSVP form without JS.
      script: [
        {
          key: 'js-flag',
          // Inline early flag for noscript RSVP CSS (html:not(.js)).
          innerHTML: 'document.documentElement.classList.add("js")',
          tagPosition: 'bodyOpen',
        },
      ],
    },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },

  typescript: {
    typeCheck: false,
  },
})
