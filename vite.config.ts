import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import EnvironmentPlugin from 'vite-plugin-environment';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), EnvironmentPlugin('all')],
  resolve: {
    alias: [
      { find: '@api', replacement: path.resolve(__dirname, 'src/api') },
      { find: '@asset', replacement: path.resolve(__dirname, 'src/asset') },
      {
        find: '@components',
        replacement: path.resolve(__dirname, 'src/components'),
      },
      { find: '@constants', replacement: path.resolve(__dirname, 'src/constants') },
      { find: '@hooks', replacement: path.resolve(__dirname, 'src/hooks') },
      { find: '@pages', replacement: path.resolve(__dirname, 'src/pages') },
      { find: '@store', replacement: path.resolve(__dirname, 'src/store') },
      { find: '@utils', replacement: path.resolve(__dirname, 'src/utils') },
    ],
  },
});
