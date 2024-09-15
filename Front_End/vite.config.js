import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Frontend remains on port 3000
    proxy: {
      '/api': {
        target: 'http://localhost:4000', // Backend is running on port 4000
        changeOrigin: true,
      },
    },
  },
});
