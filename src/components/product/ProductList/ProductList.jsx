import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import * as Styled from './ProductList.style';

function ProductList({ productList }) {
  return (
    <Styled.Container>
      {productList.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Styled.Container>
  );
}

export default ProductList;
