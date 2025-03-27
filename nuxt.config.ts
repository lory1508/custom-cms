import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/content', '@nuxt/eslint', 'nuxtjs-naive-ui', 'nuxt-auth-utils'],
  runtimeConfig: {
    session: {
      maxAge: 60 * 60 * 24 * 7, // 1 week
    },
    public: {
      git_username: process.env.GIT_USERNAME || '',
      git_repo: process.env.GIT_REPO || '',
      git_token: process.env.GIT_TOKEN || '',
    },
  },
  content: {
    // Optional: disable live editing
    liveEdit: false,
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  vite: {
    plugins: [
      AutoImport({
        imports: [
          {
            'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'],
          },
        ],
      }),
      Components({
        resolvers: [NaiveUiResolver()],
      }),
    ],
  },
})
