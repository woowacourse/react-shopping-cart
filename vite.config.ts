/// <reference types="vitest/globals" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
