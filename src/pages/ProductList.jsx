import React from 'react';
import styled from 'styled-components';
import { API_PATH } from '../constants/api';
import useFetch from '../hooks/useFetch';
import { requestGetItemList } from '../request/request';
import { ProductListItem, Loading } from '../components';

const Container = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 282px);
  column-gap: 60px;
  row-gap: 28px;
  margin-bottom: 40px;
`;

const ProductList = () => {
  const { isLoading, data: productItemList } = useFetch({
    fetchFunc: () => requestGetItemList(API_PATH.PRODUCT_LIST),
    isInitSetting: true,
  });

  if (isLoading) {
    return <Loading />;
  }

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
