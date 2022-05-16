import ReactDOM from 'react-dom/client';
import ShoppingCartApp from 'ShoppingCartApp';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from 'store';

import imagePreload from 'lib/imagePreload';
import * as preloadAssets from 'assets/preloadAssets';

import { Global } from '@emotion/react';
import GlobalStyles from 'styles/GlobalStyles';

imagePreload(Object.values(preloadAssets));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Global styles={GlobalStyles} />
    <BrowserRouter>
      <ShoppingCartApp />
    </BrowserRouter>
  </Provider>,
);
