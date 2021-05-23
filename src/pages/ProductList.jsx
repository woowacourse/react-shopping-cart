import React from 'react';
import styled from 'styled-components';
import { API_PATH } from '../constants/api';
import { ProductListItem } from '../components';
import useGettingData from '../hooks/useGettingData';

const Container = styled.div`
  ${({ theme }) => theme.content.default}
`;

const Content = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 282px);
  column-gap: 60px;
  row-gap: 28px;
  margin-bottom: 40px;
`;

const ProductList = () => {
  const { data: productItemList } = useGettingData(API_PATH.PRODUCT_LIST);

  return (
    <Container>
      <Content>
        {productItemList.map(({ productId, name, imageUrl, price }) => (
          <li key={productId}>
            <ProductListItem id={productId} name={name} src={imageUrl} price={price} />
          </li>
        ))}
      </Content>
    </Container>
  );
};

export default ProductList;
