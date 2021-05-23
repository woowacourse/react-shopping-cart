import React from 'react';
import styled from 'styled-components';
import { API_PATH } from '../constants/api';
import useScrollPosition from '../hooks/useScrollPosition';
import { ProductListItem } from '../components';
import useGettingData from '../hooks/useGettingData';

const Container = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 282px);
  column-gap: 60px;
  row-gap: 28px;
  margin-bottom: 40px;
`;

const ProductList = () => {
  const { data: productItemList, isLoading } = useGettingData(API_PATH.PRODUCT_LIST);

  useScrollPosition(!isLoading);

  return (
    <Container>
      {productItemList.map(({ productId, name, imageUrl, price }) => (
        <li key={productId}>
          <ProductListItem id={productId} name={name} src={imageUrl} price={price} />
        </li>
      ))}
    </Container>
  );
};

export default ProductList;
