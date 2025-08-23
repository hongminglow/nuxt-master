// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  pages: true,
  srcDir: ".",

  // Enable Vue auto-imports for computed, readonly, etc.
  imports: {
    autoImport: true,
  },

  app: {
    head: {
      title: "Nuxt Master",
      htmlAttrs: {
        lang: "en",
      },
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  modules: ["@nuxt/eslint", "@nuxtjs/tailwindcss"],

  tailwindcss: {
    cssPath: "~/assets/css/main.css",
    configPath: "tailwind.config.ts",
  },

  runtimeConfig: {
    serverSecretKey: "#1231231#sample-password-salt",
    public: {
      apiBase: "/api",
      appName: "Nuxt Master Dashboard",
    },
  },
});
