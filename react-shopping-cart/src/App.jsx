import { Routes, Route } from 'react-router-dom';

import Layout from 'pages/Layout';
import NotFoundPage from 'pages/NotFoundPage/NotFoundPage';
import ProductDetailPage from 'pages/ProductDetailPage/ProductDetailPage';
import ProductListPage from 'pages/ProductListPage/ProductListPage';
import ShoppingCartPage from 'pages/ShoppingCartPage/ShoppingCartPage';

import PATH from 'constants/path';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<ProductListPage />} path={PATH.HOME}>
          <Route element={<ProductListPage />} path={PATH.PAGING_HOME} />
        </Route>
        <Route path={PATH.PRODUCT_DETAIL} element={<ProductDetailPage />} />
        <Route path={PATH.SHOPPING_CART} element={<ShoppingCartPage />} />
        <Route path={PATH.ALL_PATH} element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
