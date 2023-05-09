import React from 'react';
import { ProductItem } from '../components/ProductItem';
import mockData from '../data/mockData.json';
import styled from 'styled-components';

export const getMockData = mockData;

export const ProductList = () => {
  return (
    <ProductListWrapper>
      {getMockData.map(({ id, name, price, imageUrl }) => (
        <ProductItem id={id} name={name} price={price} imageUrl={imageUrl} />
      ))}
    </ProductListWrapper>
  );
};

const ProductListWrapper = styled.div`
  width: 1200px;
  margin: 60px auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  align-items: center;
  gap: 12px;
`;
