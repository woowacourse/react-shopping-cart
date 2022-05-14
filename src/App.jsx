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
      <Layout>
        <Routes>
          <Route path={ROUTE.HOME} element={<ProductList />} />
          <Route path={ROUTE.DETAIL_PRODUCT} element={<ProductDetail />} />
          <Route path={ROUTE.EXCEPT} element={<NotFound />} />
        </Routes>
      </Layout>
    </div>
  );
};

export default App;
