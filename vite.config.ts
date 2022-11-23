import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import Sitemap from 'vite-plugin-sitemap'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig(() => ({
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        {
          'naive-ui': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar'
          ]
        }
      ],
    }),
    Components({
      resolvers: [NaiveUiResolver()]
    }),
    Sitemap({
      hostname: "https://gaspreis.no-panic.org",
      dynamicRoutes: [
        '/calculator',
        '/imprint',
        '/data-protection',
      ] //TODO map from router - .vue loading needs to be fixed
    })
  ],
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
  },
  test: {
    setupFiles: ['./test/setup.ts']
  }
}))
