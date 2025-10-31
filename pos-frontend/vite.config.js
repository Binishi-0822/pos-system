import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allows external access (needed for mobile)
    port: 5173, // Your frontend port
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // ⭐ Your backend port
        changeOrigin: true,
        secure: false,
      }
    }
  }
})