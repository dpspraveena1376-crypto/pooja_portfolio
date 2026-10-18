import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base so the build works from any path (GitHub Pages subfolder, Netlify, Vercel…).
export default defineConfig({
  base: './',
  plugins: [react()],
  server: { port: 5173, strictPort: true },
});
