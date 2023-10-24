import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
const __APP_VERSION__ = JSON.stringify(new Date(Date.now()).toISOString());

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    sourcemap: true,
  },
  define: {
    __APP_VERSION__: __APP_VERSION__,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "src/styles/variables.scss" as *;',
      },
    },
  },
})
