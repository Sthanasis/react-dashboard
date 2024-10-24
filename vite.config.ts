/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['**/*.spec.ts'],
    alias: {
      '@test-utilities': fileURLToPath(
        new URL('./src/utilities/test-utilities.tsx', import.meta.url)
      ),
    },
  },
  build: {
    assetsDir: 'assets',
  },
});
