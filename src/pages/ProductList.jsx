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
      {productItemList.map(({ id, name, src, alt, price }) => (
        <li key={id}>
          <ProductListItem id={id} name={name} src={src} alt={alt} price={price} />
        </li>
      ))}
    </Container>
  );
};

export default ProductList;
