import React from 'react';
import styled from 'styled-components';
import ProductListItem from '../components/productListItem/ProductListItem';

const StyledUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 282px);
  column-gap: 60px;
  row-gap: 28px;
`;

const ProductList = ({ productListState }) => {
  // TODO: ~State 뺄지

  return (
    <StyledUl>
      {productListState?.map((product) => (
        <li key={product.id}>
          <ProductListItem src={product.src} name={product.name} price={product.price} alt={product.alt} />
        </li>
      ))}
    </StyledUl>
  );
};

export default ProductList;
