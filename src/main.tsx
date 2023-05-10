import React from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStyle from './style/globalStyle';
import { ThemeProvider } from 'styled-components';
import { theme } from './style/theme';
import { RouterProvider } from 'react-router-dom';
import router from './router';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
