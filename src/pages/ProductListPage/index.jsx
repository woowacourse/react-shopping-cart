import React from "react";
import styled from "styled-components";

import Spinner from "../../components/common/Spinner";
import ProductCard from "./ProductCard";
import { useProductList } from "../../hooks/useProductList";

function ProductListPage() {
  const { productList, isLoading, errorMessage } = useProductList();

  if (isLoading) return <Spinner />;
  if (errorMessage) return <div>😱 Error: {errorMessage} 😱</div>;

  if (productList?.length === 0) return <h2>😱 텅 비었어요~~ 😱</h2>;

  return (
    <GridList>
      {productList.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </GridList>
  );
}

const GridList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  align-items: center;

  height: 100%;
  gap: 28px 12px;
`;

export default ProductListPage;
