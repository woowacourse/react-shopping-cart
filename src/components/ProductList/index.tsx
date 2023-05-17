import React from 'react';
import styled from 'styled-components';
import ProductItem from '../ProductItem';
import { useRecoilValue } from 'recoil';
import { fetchProductSelector } from '../../atoms/product';

const ProductList: React.FC = () => {
  const products = useRecoilValue(fetchProductSelector);

  return (
    <StyledProductListWrapper>
      {products.map((product) => {
        return <ProductItem key={product.id} product={product} />;
      })}
    </StyledProductListWrapper>
  );
};

const StyledProductListWrapper = styled.div`
  padding: 100px;
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(auto-fill, minmax(282px, auto));
  grid-column-gap: 47px;
  grid-row-gap: 85px;
`;

export default ProductList;
