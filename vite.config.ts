import * as path from "path";
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import routify  from '@roxi/routify/vite-plugin'

const __APP_VERSION__ = JSON.stringify(new Date(Date.now()).toISOString());

export default defineConfig({
  plugins: [ routify(), svelte()],
  optimizeDeps: {
    entries: [],
  },
  build: { sourcemap: true },
  define: { __APP_VERSION__: __APP_VERSION__ },
  css: {
    preprocessorOptions: {
      scss: {
        // absolute path to variables.scss, so Sass can always find it
        additionalData: `@use "${path.resolve(
          "src/styles/variables.scss"
        )}" as *;`,
      },
    },
  },
});
