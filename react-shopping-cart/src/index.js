import App from 'App';
import startMocking from 'mocks/startMocking';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import ErrorPage from 'pages/ErrorPage/ErrorPage';

import ErrorBoundary from 'components/@shared/ErrorBoundary/ErrorBoundary';

import { store } from 'redux/store';

import GlobalStyle from 'styles/GlobalStyle';
import theme from 'styles/theme';

// 현재는 백엔드와 협업을 하고 있지 않고 MSW를 사용하여 개발하고 있는 상황이라고 전제하려고 합니다.
// 그래서 데모 사이트도 MSW를 사용하여 배포해주었습니다.
// if (process.env.NODE_ENV === 'development') {
startMocking();
// }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Provider store={store}>
      <ErrorBoundary fallback={<ErrorPage />}>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </ErrorBoundary>
    </Provider>
  </BrowserRouter>
);
