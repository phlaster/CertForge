import { defineConfig } from 'vite';

export default defineConfig({
  base: '/CertForge',
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  server: {
    host: '127.0.0.1',
    port: 5173
  }
});