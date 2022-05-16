import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import Header from "./Header";
import {
  OrderListPage,
  ProductCartPage,
  ProductDetailPage,
  ProductListPage,
} from "./pages";

import { theme } from "../style";
import { productInfoListStore } from "../stores/productInfoListStore";
import { ROUTES } from "../constants";
import { Main } from "./styled";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={productInfoListStore}>
        <Header />
        <Main>
          <Routes>
            <Route exact path={ROUTES.ROOT} element={<ProductListPage />} />
            <Route
              exact
              path={ROUTES.PRODUCT_LIST}
              element={<ProductListPage />}
            />
            <Route
              exact
              path={ROUTES.PRODUCT_DETAIL}
              element={<ProductDetailPage />}
            />
            <Route
              exact
              path={ROUTES.PRODUCT_CART}
              element={<ProductCartPage />}
            />
            <Route
              exact
              path={ROUTES.PRODUCT_ORDER_LIST}
              element={<OrderListPage />}
            />
            <Route path="*" element={<div>잘못된 접근입니다.</div>} />
          </Routes>
        </Main>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
