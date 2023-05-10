import React from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStyle from './style/globalStyle';
import { ThemeProvider } from 'styled-components';
import { theme } from './style/theme';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { RecoilRoot } from 'recoil';

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
