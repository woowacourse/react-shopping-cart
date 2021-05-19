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
  const {
    isLoading,
    data: productItemList,
    error,
  } = useFetch({
    fetchFunc: () => requestGetItemList(API_PATH.PRODUCT_LIST),
    isInitSetting: true,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    throw new Error(error);
  }

  return (
    <Container>
      {productItemList.map(({ product_id, name, image_url, price }) => (
        <li key={product_id}>
          <ProductListItem id={product_id} name={name} src={image_url} price={price} />
        </li>
      ))}
    </Container>
  );
};

export default ProductList;
