import React from 'react';
import { Route, Routes } from 'react-router-dom';
import GlobalStyles from 'styles/globalStyles';

import Layout from 'components/common/Layout';
import ProductList from 'components/ProductList';
import ProductDetail from 'components/ProductDetail';
import NotFound from 'components/NotFound';
import { ROUTE } from 'constants';

const App = () => {
  return (
    <div>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path={ROUTE.HOME} element={<ProductList />} />
          <Route path={ROUTE.DETAIL_PRODUCT} element={<ProductDetail />} />
          <Route path={ROUTE.EXCEPT} element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
