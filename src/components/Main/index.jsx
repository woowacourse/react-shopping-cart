import React from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";

import ProductListPage from "./ProductListPage";
import ProductDetailPage from "./ProductDetailPage";
import ProductCartPage from "./ShoppingCartPage";
import OrderListPage from "./OrderListPage";
import { ROUTES } from "../../constants";

const MainContainer = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  margin: 140px auto 60px;

  height: calc(100vh - 200px);
`;

function Main() {
  return (
    <MainContainer>
      <Routes>
        <Route exact path={ROUTES.ROOT} element={<ProductListPage />} />
        <Route exact path={ROUTES.PRODUCT_LIST} element={<ProductListPage />} />
        <Route
          exact
          path={ROUTES.PRODUCT_DETAIL}
          element={<ProductDetailPage />}
        />
        <Route exact path={ROUTES.PRODUCT_CART} element={<ProductCartPage />} />
        <Route
          exact
          path={ROUTES.PRODUCT_ORDER_LIST}
          element={<OrderListPage />}
        />
        <Route path="*" element={<div>잘못된 접근입니다.</div>} />
      </Routes>
    </MainContainer>
  );
}

export default Main;
