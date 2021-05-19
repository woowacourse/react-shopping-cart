import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './error/ErrorBoundary';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Provider store={store}>
          <App />
        </Provider>
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
