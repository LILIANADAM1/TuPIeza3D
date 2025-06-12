import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/TuPIeza3D/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    assetsInlineLimit: 4096
  }
})
