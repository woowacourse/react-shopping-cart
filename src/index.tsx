import React from 'react';
import ReactDOM from 'react-dom/client';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import { ThemeProvider } from 'styled-components';

import App from './App';
import './index.css';

import rootReducer from 'store/index';
import theme from 'styles/theme';

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('mocks/browser');
  worker.start();
}

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(reduxThunk, logger)));

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
);
