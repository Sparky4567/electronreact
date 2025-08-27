import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./", // 👈 important for Electron prod
  build: {
    outDir: "dist",
  },
});
