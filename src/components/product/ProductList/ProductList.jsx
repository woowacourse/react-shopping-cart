import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../ProductCard/ProductCard';
import * as Styled from './ProductList.style';

function ProductList({ openModal }) {
  const productList = useSelector(state => state.productList);

  return (
    <Styled.Container>
      {productList.map(product => (
        <ProductCard key={product.id} product={product} openModal={openModal} />
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
