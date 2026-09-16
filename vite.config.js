import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://nexinc-chemistry.vercel.app',
        changeOrigin: true,
      },
    },
  },
});
