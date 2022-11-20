import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import Sitemap from 'vite-plugin-sitemap'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), Sitemap({
    hostname: "https://gaspreis.no-panic.org",
    dynamicRoutes: [
      '/calculator',
      '/imprint',
      '/data-protection',
    ] //TODO map from router - .vue loading needs to be fixed
  })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        "404": resolve(__dirname, "404.html"),
      },
    },
  }
})
