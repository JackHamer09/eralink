// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      title: "EraLink - shorten and immortalize your links, text, and files with zkSync",
      meta: [
        {
          name: "description",
          content: "Shorten and immortalize your links, text, and files anonymously on-chain with zkSync Era",
        },
        { name: "og:title", content: "EraLink - shorten and immortalize your links, text, and files with zkSync" },
        {
          name: "og:description",
          content: "Shorten and immortalize your links, text, and files anonymously on-chain with zkSync Era",
        },
        {
          property: "og:image",
          content: "https://eralink.netlify.app/preview.jpg",
        },
        {
          property: "og:image:alt",
          content: "EraLink - shorten and immortalize your links, text, and files with zkSync",
        },
        {
          property: "og:image:type",
          content: "image/jpeg",
        },
        {
          property: "og:image:width",
          content: "1200",
        },
        {
          property: "og:image:height",
          content: "630",
        },
      ],
    },
  },

  ssr: false,
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt", // https://pinia.vuejs.org/ssr/nuxt.html
    "@nuxtjs/eslint-module", // https://nuxt.com/modules/eslint
    "@nuxtjs/tailwindcss", // https://nuxt.com/modules/tailwindcss
    "@nuxtjs/google-fonts", // https://google-fonts.nuxtjs.org
    "nuxt-gtag", // https://nuxt.com/modules/gtag
    "@kevinmarrec/nuxt-pwa",
  ],

  css: ["web3-avatar-vue/dist/style.css"],
  googleFonts: {
    families: {
      Inter: [400, 500],
    },
  },
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      "defineStore",
      "storeToRefs",
    ],
  },
  imports: {
    dirs: ["store"],
  },

  runtimeConfig: {
    public: {
      walletConnectProjectID: process.env.WALLET_CONNECT_PROJECT_ID,
      web3StorageToken: process.env.WEB3_STORAGE_KEY,
    },
  },
});
