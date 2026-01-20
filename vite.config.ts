// vite.config.ts - AUTHORITATIVE BASELINE
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    strictPort: true, // LOCK: Ensure OAuth origin consistency
    host: true,
  },
  build: {
    outDir: 'dist-kontrol', // PARTITION: Governance build target
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
