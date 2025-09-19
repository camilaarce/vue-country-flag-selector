import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'VueCountryFlagSelector',
      fileName: (format) => `vue-country-flag-selector.${format}.js`,
    },
    rollupOptions: {
      // Asegúrate de externalizar las dependencias que no deben ser empaquetadas
      external: ['vue'],
      output: {
        // Provee variables globales para usar en la construcción UMD
        globals: {
          vue: 'Vue',
        },
        // Esta línea fuerza a que el archivo CSS de salida se llame style.css
        assetFileNames: 'style.css',
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
});