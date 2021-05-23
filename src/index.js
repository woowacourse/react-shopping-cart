import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './errorBoundary/ErrorBoundary';
import { Loading } from './components';
import { ThemeProvider } from 'styled-components';

const theme = {
  content: {
    default: {
      maxWidth: '1440px',
      margin: '0 auto',
      padding: '40px 60px 20px 60px',
    },
  },
};

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<Loading />}>
            <App />
          </Suspense>
        </ErrorBoundary>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
