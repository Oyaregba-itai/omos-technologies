import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react(),
    tsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
  ],
  build: {
    // Dictates the exact name of the static compilation folder
    outDir: 'dist',
  }
});
