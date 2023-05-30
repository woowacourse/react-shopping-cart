import React from "react";
import styled from "styled-components";

import ProductList from "../../src/components/ProductListPage/ProductList";
import CartQuantity from "../components/CartQuantity";
import ErrorBoundary from "../components/common/ErrorBoundary";
import Header from "../components/common/Header";
import Loading from "../components/common/Loading";

export default function ProductListPage() {
  return (
    <>
      <ErrorBoundary>
        <React.Suspense fallback={<Loading />}>
          <Header>
            <CartQuantity />
          </Header>
          <ProductListWrapper>
            <ProductList />
          </ProductListWrapper>
        </React.Suspense>
      </ErrorBoundary>
    </>
  );
}

const ProductListWrapper = styled.div`
  display: flex;
  width: 100vw;
  justify-content: center;
`;
