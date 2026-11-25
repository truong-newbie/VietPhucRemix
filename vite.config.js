import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: './', // Sử dụng relative path để chạy hoàn hảo trên mọi nền tảng (Vercel, GitHub Pages, Netlify)
  plugins: [
    tailwindcss(),
    react()
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three') || id.includes('@react-three')) {
            return 'vendor-three';
          }
          if (id.includes('node_modules/qrcode') || id.includes('canvas-confetti')) {
            return 'vendor-media';
          }
        }
      }
    }
  },
  test: {
    environment: 'node'
  }
})
