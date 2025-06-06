import path from 'path';

import { defineConfig } from 'vitest/config';
// eslint-disable-next-line no-restricted-exports
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx', 'test/**/*.test.ts', 'test/**/*.test.tsx'],
  },
});
