import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Frontend remains on port 3000
    proxy: {
      '/api': {
        target: 'https://cashflow-control-backend.onrender.com', // Backend is running on render
        changeOrigin: true,
      },
    },
  },
});
