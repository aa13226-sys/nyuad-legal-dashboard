import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/nyuad-legal-dashboard/', // Change if your repo name is different
})
