import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  // Tells Vite to build relative paths so GitHub Pages can find your assets
  base: './',
  plugins: [
    react(),
    tsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
  ],
  build: {
    outDir: 'dist',
    // Bypasses entry errors by building the project files dynamically
    emptyOutDir: true,
  }
});

