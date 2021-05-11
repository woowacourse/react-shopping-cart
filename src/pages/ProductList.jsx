import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ProductListItem from '../components/productListItem/ProductListItem';

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
