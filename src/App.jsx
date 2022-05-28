import React from 'react';
import { Route, Routes } from 'react-router-dom';
import GlobalStyles from 'styles/globalStyles';

import { ROUTE } from 'constants';

import Layout from 'components/common/Layout';
import ProductList from 'components/Pages/ProductList';
import ProductDetail from 'components/Pages/ProductDetail';
import NotFound from 'components/Pages/NotFound';
import Cart from 'components/Pages/Cart';

const App = () => {
  return (
    <div>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path={ROUTE.HOME} element={<ProductList />} />
          <Route path={ROUTE.DETAIL_PRODUCT} element={<ProductDetail />} />
          <Route path={ROUTE.CART} element={<Cart />} />
          <Route path={ROUTE.EXCEPT} element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
