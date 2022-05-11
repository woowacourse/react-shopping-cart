import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';
import * as Styled from './ProductList.style';

function ProductList({ productList }) {
  return (
    <Styled.Container>
      {productList.map(product => (
        <Link key={product.id} to={`/products/${product.id}`}>
          <ProductCard product={product} />
        </Link>
      ))}
    </Styled.Container>
  );
}

ProductList.skeleton = () => {
  return (
    <Styled.Container>
      {Array.from({ length: 12 }).map((_, index) => (
        <ProductCard.skeleton key={index} />
      ))}
    </Styled.Container>
  );
};

export default ProductList;
