import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {}, // Fix process-related errors
  },
  resolve: {
    alias: {
      path: 'path-browserify',
    },
  },
  build: {
    rollupOptions: {
      plugins: [new NodePolyfillPlugin()],
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true, // Ensures correct request headers
        secure: false, // Allows HTTP connections in dev
        rewrite: (path) => path.replace(/^\/api/, ''), // Strips '/api' prefix before forwarding
      },
    },
  },
});

