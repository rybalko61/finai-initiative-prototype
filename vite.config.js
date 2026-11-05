import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1];

export default defineConfig({
  base: process.env.GITHUB_ACTIONS && repositoryName ? `/${repositoryName}/` : '/',
  resolve: {
    dedupe: ['react', 'react-dom', 'styled-components'],
  },
  build: {
    rollupOptions: {
      input: {
        index: fileURLToPath(new URL('./outputs/index.html', import.meta.url)),
        presentation: fileURLToPath(new URL('./outputs/presentation.html', import.meta.url)),
      },
    },
  },
});
