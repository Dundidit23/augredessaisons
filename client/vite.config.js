import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  envDir: './',
  envPrefix: 'VITE_',
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "./src/assets/styles/base/_variables.scss";
          @import "./src/assets/styles/utils/_mixins.scss";
          @import "./src/assets/styles/main.scss";
        `,
        includePaths: [path.resolve(__dirname, './src/assets/styles')]
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@styles': path.resolve(__dirname, './src/assets/styles'),
    }
  }
})