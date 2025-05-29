import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/react-shopping-cart/' : '/',
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
    }),
  ],
  server: {
    port: 5173,
  },
}));
