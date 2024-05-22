import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './GlobalStyle.ts';
import theme from './theme.ts';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <GlobalStyle />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </RecoilRoot>
    </ThemeProvider>
  </React.StrictMode>,
);
