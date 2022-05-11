import React from 'react';
import GlobalStyles from 'styles/globalStyles';
import ProductList from 'components/ProductList';
import Layout from 'components/common/Layout';
import NotFound from 'components/NotFound';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <GlobalStyles />
      <Layout>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </div>
  );
};

export default App;
