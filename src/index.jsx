import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from 'App';
import { worker } from 'mocks/browser';
import { store } from 'store/store';

worker.start({
  serviceWorker: {
    url: '/react-shopping-cart/mockServiceWorker.js',
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
