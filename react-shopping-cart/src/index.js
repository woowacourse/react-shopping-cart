import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'App';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'styles/GlobalStyle';
import theme from 'styles/theme';
import { Provider } from 'react-redux';
import { store } from 'redux/store';
import ErrorBoundary from 'components/@shared/ErrorBoundary/ErrorBoundary';
import { BrowserRouter } from 'react-router-dom';

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
