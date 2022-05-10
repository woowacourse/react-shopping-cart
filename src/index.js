import React from 'react';
import ReactDOM from 'react-dom/client';
import ShoppingCartApp from 'ShoppingCartApp';

import { Global } from '@emotion/react';
import GlobalStyles from 'styles/GlobalStyles';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Global styles={GlobalStyles} />
    <ShoppingCartApp />
  </React.StrictMode>,
);
