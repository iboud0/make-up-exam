// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: [
    "@/assets/css/main.css",
    "@fortawesome/fontawesome-free/css/all.css" // Add Font Awesome CSS
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  plugins: ["@/plugins/firebase.js"],
})
