import React from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStyle from './style/globalStyle';
import { ThemeProvider } from 'styled-components';
import { theme } from './style/theme';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { RecoilRoot } from 'recoil';
import mockData from './assets/mockData.json';

/**
 * 프로젝트 시작할 때 products mock data 준비하도록 설정
 */
localStorage.setItem('products', JSON.stringify(mockData));

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <RouterProvider router={router} />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>
);
