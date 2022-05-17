import { Routes, Route } from "react-router-dom";

import ProductListPage from "pages/ProductListPage/ProductListPage";
import ProductDetailPage from "pages/ProductDetailPage/ProductDetailPage";
import ShoppingCartPage from "pages/ShoppingCartPage/ShoppingCartPage";

import { ROUTE_PATH } from "constants/index";
import PageHeader from "component/PageHeader/PageHeader";

function App() {
  return (
    <>
      <PageHeader />
      <Routes>
        <Route element={<ProductListPage />} path={ROUTE_PATH.ROOT} />
        <Route element={<ProductListPage />} path={`${ROUTE_PATH.ROOT}:idx`} />
        <Route
          path={`${ROUTE_PATH.DETAIL}/:idx`}
          element={<ProductDetailPage />}
        />
        <Route path={ROUTE_PATH.SHOPPING_CART} element={<ShoppingCartPage />} />
      </Routes>
    </>
  );
}

export default App;
