import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [
      react(),
      // 개발 모드에서만 ESLint를 적용하도록 설정
      command === 'serve' && eslintPlugin({ include: 'src/**/*.{js,jsx,ts,tsx}' }),
    ].filter(Boolean), // 필터를 사용하여 'false'를 제거
    base: '/react-shopping-cart/',
  };
});
