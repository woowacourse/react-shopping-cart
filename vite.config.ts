import path from 'path';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/react-shopping-cart/',
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
    }),
  ],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      {
        find: '@components',
        replacement: path.resolve(__dirname, 'src/components'),
      },
      { find: '@pages', replacement: path.resolve(__dirname, 'src/pages') },
      { find: '@hooks', replacement: path.resolve(__dirname, 'src/hooks') },
      { find: '@apis', replacement: path.resolve(__dirname, 'src/apis') },
      { find: '@recoil', replacement: path.resolve(__dirname, 'src/recoil') },
      { find: '@assets', replacement: path.resolve(__dirname, 'src/assets') },
    ],
  },
});
