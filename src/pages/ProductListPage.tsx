import { ProductItem } from '../components/ProductItem';
import mockData from '../data/mockData.json';
import styled from 'styled-components';

export const getMockData = mockData;

export const ProductListPage = () => {
  return (
    <ProductListPageWrapper>
      {getMockData.map(({ id, name, price, imageUrl }) => (
        <ProductItem
          key={id}
          id={id}
          name={name}
          price={price}
          imageUrl={imageUrl}
        />
      ))}
    </ProductListPageWrapper>
  );
};

const ProductListPageWrapper = styled.div`
  width: 1200px;
  margin: 60px auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  align-items: center;
  gap: 12px;
`;
