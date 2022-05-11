import ReactDOM from 'react-dom/client';
import ShoppingCartApp from 'ShoppingCartApp';

import { Provider } from 'react-redux';
import store from 'store';

import { Global } from '@emotion/react';
import GlobalStyles from 'styles/GlobalStyles';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Global styles={GlobalStyles} />
    <ShoppingCartApp />
  </Provider>,
);
