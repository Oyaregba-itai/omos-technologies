import { defineConfig } from 'vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    tanstackStart({
      // Forces the framework to generate plain static files for hosts like GitHub Pages
      deploymentPreset: 'github-pages',
    }),
    tsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
  ],
});
