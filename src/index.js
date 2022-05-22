import ReactDOM from 'react-dom/client';
import ShoppingCartApp from 'ShoppingCartApp';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from 'store';

import imagePreload from 'lib/imagePreload';
import * as preloadAssets from 'assets/preloadAssets';

import { Global } from '@emotion/react';
import GlobalStyles from 'styles/GlobalStyles';

if (process.env.NODE_ENV === 'development') {
  const MSW_TARGET_PATH = `${process.env.PUBLIC_URL}/`;

  if (window.location.pathname === process.env.PUBLIC_URL) {
    location.pathname = MSW_TARGET_PATH;
  }

  if (window.location.pathname === MSW_TARGET_PATH) {
    // eslint-disable-next-line global-require
    const { worker } = require('mocks/browser');
    worker.start({
      serviceWorker: {
        url: `${MSW_TARGET_PATH}mockServiceWorker.js`,
      },
    });
  }
}

imagePreload(Object.values(preloadAssets));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Global styles={GlobalStyles} />
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <ShoppingCartApp />
    </BrowserRouter>
  </Provider>,
);
