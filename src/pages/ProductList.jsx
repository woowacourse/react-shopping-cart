import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { ProductListItem } from '../components';

const Container = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 282px);
  column-gap: 60px;
  row-gap: 28px;
`;

const ProductList = () => {
  const productList = useSelector((state) => state.product.productList.data);

  return (
    <Container>
      {productList.map((product) => (
        <li key={product.id}>
          <ProductListItem product={product} />
        </li>
      ))}
    </Container>
  );
};

export default ProductList;
