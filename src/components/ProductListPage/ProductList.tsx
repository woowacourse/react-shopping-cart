import { useRecoilValue } from "recoil";
import styled from "styled-components";
import ProductItem from "./ProductItem";
import { products as productList } from "../../atoms/productState";
import React from "react";

export default function ProductList() {
  const products = useRecoilValue(productList);

  return (
    <ProductListContainer>
      {products.map((product: any) => (
        <ProductItem {...product} />
      ))}
    </ProductListContainer>
  );
}

const ProductListContainer = styled.ul`
  display: grid;
  padding: 6rem;
  grid-template-columns: repeat(4, 28.2rem);

  gap: 4rem;

  @media only screen and (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media only screen and (max-width: 840px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
