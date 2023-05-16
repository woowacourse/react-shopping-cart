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
  margin: 50px 12%;
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(auto-fill, minmax(200px, auto));
  grid-column-gap: 20px;
  grid-row-gap: 50px;
`;

export default ProductList;
