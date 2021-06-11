import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalStyle from './Global.style';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './states/store';
import { ErrorBoundary } from 'react-error-boundary';
import CommonError from './components/ErrorFallback/AppErrorFallback';

ReactDOM.render(
  <React.StrictMode>
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Provider store={store}>
          <ErrorBoundary FallbackComponent={CommonError}>
            <App />
          </ErrorBoundary>
        </Provider>
      </BrowserRouter>
    </>
  </React.StrictMode>,
  document.getElementById('root')
);
