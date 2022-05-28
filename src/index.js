import ShoppingCartApp from 'ShoppingCartApp';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from 'store';

import { Global } from '@emotion/react';

import GlobalStyles from 'styles/GlobalStyles';

import * as preloadAssets from 'assets/preloadAssets';
import imagePreload from 'lib/imagePreload';

import ReactDOM from 'react-dom/client';

if (process.env.NODE_ENV === 'development') {
  const MSW_TARGET_PATH = `${process.env.PUBLIC_URL}/`;

  if (window.location.pathname === process.env.PUBLIC_URL) {
    location.pathname = MSW_TARGET_PATH;
  }

  if (window.location.pathname.includes(MSW_TARGET_PATH)) {
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
