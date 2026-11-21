/// <reference types="vite/client" />

// Runtime configuration loaded by public/config.js (see src/lib/utils/runtimeConfig.ts)
interface Window {
  APP_CONFIG?: import("./lib/utils/runtimeConfig").AppConfig;
}

declare module 'vite/client' {
    interface ImportMetaEnv {
      readonly VITE_APP_TITLE: string;
      // Aggiungi altre variabili d'ambiente secondo necessità
    }
  }