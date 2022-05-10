import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import * as Styled from './ProductList.style';

function ProductList() {
  return (
    <Styled.Container>
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </Styled.Container>
  );
}

export default ProductList;
