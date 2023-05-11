import React from 'react';
import App from 'App';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '@styles/globalStyle';
import { theme } from '@styles/theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <RecoilRoot>
        <GlobalStyle />
        <App />
      </RecoilRoot>
    </React.StrictMode>
  </ThemeProvider>
);
