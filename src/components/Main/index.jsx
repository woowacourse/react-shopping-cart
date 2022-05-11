import React from "react";
import styled from "styled-components";

import ProductListPage from "./ProductListPage";
import ProductDetailPage from "./ProductDetailPage";
import ShoppingCartPage from "./ShoppingCartPage";

const Container = styled.main`
  max-width: 1320px;
  margin: 140px auto 60px;

  height: calc(100vh - 200px);
`;

function Main() {
  return (
    <Container>
      <ProductListPage />
      <ProductDetailPage />
      <ShoppingCartPage />
    </Container>
  );
}

export default Main;
