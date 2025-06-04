import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/react-shopping-cart/',
  plugins: [
    react({
      jsxImportSource: '@emotion/react'
    })
  ]
});
