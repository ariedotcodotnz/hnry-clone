import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@hui': path.resolve(__dirname, './src/components'),
      '@api': path.resolve(__dirname, './src/API'),
      '@types': path.resolve(__dirname, './src/types'),
      '@utilities': path.resolve(__dirname, './src/utilities'),
      '@admin': path.resolve(__dirname, './src/admin'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
