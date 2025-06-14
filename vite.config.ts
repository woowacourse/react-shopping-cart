/// <reference types="vitest/globals" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['@emotion'],
      },
      jsxImportSource: '@emotion/react',
    }),
  ],
  base: '/react-shopping-cart/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    environment: 'jsdom', // 브라우저 DOM 환경
    globals: true, // describe/test/expect 등을 전역에서 사용
    setupFiles: './src/__test__/setup.ts', // 테스트 전에 실행할 파일 (matcher 설정 등)
  },
});
