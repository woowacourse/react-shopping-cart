import React from "react";
import styled from "styled-components";
import ProductList from "../../src/components/ProductListPage/ProductList";
export default function ProductListPage() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <ProductListWrapper>
        <ProductList />
      </ProductListWrapper>
    </React.Suspense>
  );
}

const ProductListWrapper = styled.div`
  display: flex;
  width: 100vw;
  justify-content: center;
`;
