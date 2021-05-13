import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalStyle from './Global.style';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './states/store';
import ErrorBoundary from './components/ErrorBoundary';
import { APP_BASE_URL } from './constants/app';

ReactDOM.render(
  <React.StrictMode>
    <>
      <GlobalStyle />
      <BrowserRouter basename={APP_BASE_URL}>
        <Provider store={store}>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </Provider>
      </BrowserRouter>
    </>
  </React.StrictMode>,
  document.getElementById('root')
);
