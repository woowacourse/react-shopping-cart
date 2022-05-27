import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import ReduxThunk from 'redux-thunk';

import App from './App';
import rootReducer from './redux/reducers';
import worker from './mocks/browser';

const root = ReactDOM.createRoot(document.getElementById('root')!);
const store = createStore(
  rootReducer,
  applyMiddleware(promiseMiddleware, ReduxThunk)
);

if (process.env.NODE_ENV === 'development') {
  worker.start().catch((err) => console.error(err));
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
