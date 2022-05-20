import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import OrderListPage from "./pages/OrderListPage";
import ErrorPage from "./pages/ErrorPage";

import { theme } from "./theme";
import { PATH } from "./constants";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Main>
        <Routes>
          <Route path={PATH.ROOT} element={<ProductListPage />} />
          <Route path={PATH.PRODUCT_LIST} element={<ProductListPage />} />
          <Route
            path={PATH.PRODUCT_DETAIL_WITH_ID(":id")}
            element={<ProductDetailPage />}
          />
          <Route path={PATH.CART} element={<ShoppingCartPage />} />
          <Route path={PATH.ORDER_LIST} element={<OrderListPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Main>
    </ThemeProvider>
  );
}

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;

  max-width: 1320px;
  margin: 140px auto 60px;
`;

export default App;
