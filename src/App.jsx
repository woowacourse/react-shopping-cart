import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { Route, Routes } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./store";

import Header from "./components/Header";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductCartPage from "./pages/ShoppingCartPage";
import OrderListPage from "./pages/OrderListPage";

import { theme } from "./theme";

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Header />
          <Main>
            <Routes>
              <Route path="/" element={<ProductListPage />} />
              <Route path="/product-list" element={<ProductListPage />} />
              <Route
                path="/product-detail/:id"
                element={<ProductDetailPage />}
              />
              <Route path="/product-cart" element={<ProductCartPage />} />
              <Route path="/order-list" element={<OrderListPage />} />
              <Route path="*" element={<div>잘못된 접근입니다.</div>} />
            </Routes>
          </Main>
        </Provider>
      </ThemeProvider>
    </div>
  );
}

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;

  max-width: 1320px;
  margin: 140px auto 60px;

  height: calc(100vh - 200px);
`;

export default App;
