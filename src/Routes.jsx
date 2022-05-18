import { Routes, Route } from 'react-router-dom';

import Layout from 'components/Layout';

import ProductList from 'pages/ProductList';
import NotFound from 'pages/NotFound';

function PageRoute() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<ProductList />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default PageRoute;
