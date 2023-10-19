// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt", // https://pinia.vuejs.org/ssr/nuxt.html
    "@nuxtjs/eslint-module", // https://nuxt.com/modules/eslint
    "@nuxtjs/tailwindcss", // https://nuxt.com/modules/tailwindcss
    "@nuxtjs/google-fonts", // https://google-fonts.nuxtjs.org
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
