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
  const productList = useSelector((state) => state.product.productList);

  // TODO: ~State 뺄지

  return (
    <Container>
      {productList.map((product) => (
        <li key={product.id}>
          <ProductListItem src={product.src} name={product.name} price={product.price} alt={product.alt} />
        </li>
      ))}
    </Container>
  );
};

export default ProductList;
