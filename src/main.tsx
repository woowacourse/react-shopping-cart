import { ThemeProvider } from 'styled-components';
import GlobalStyle from './GlobalStyle.ts';
import theme from './theme.ts';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { RecoilRoot } from 'recoil';

import App from './App.tsx';

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
