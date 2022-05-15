import ReactDOM from 'react-dom/client';
import ShoppingCartApp from 'ShoppingCartApp';
import Snackbar from 'components/Snackbar';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'store';

import { Global } from '@emotion/react';
import GlobalStyles from 'styles/GlobalStyles';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Global styles={GlobalStyles} />
    <Snackbar />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShoppingCartApp />} />
        <Route path="*" element={<ShoppingCartApp />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
);
