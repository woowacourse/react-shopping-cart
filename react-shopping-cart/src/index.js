import App from 'App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import ErrorBoundary from 'components/@shared/ErrorBoundary/ErrorBoundary';

import { store } from 'redux/store';

import GlobalStyle from 'styles/GlobalStyle';
import theme from 'styles/theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Provider store={store}>
      <ErrorBoundary fallback={<div>에러입니다.</div>}>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </ErrorBoundary>
    </Provider>
  </BrowserRouter>
);
