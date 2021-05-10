import React from 'react';

import GridColumnList from '../components/utils/GridColumnList';
import Image from '../components/utils/Image';
import IconButton from '../components/utils/IconButton';
import PriceText from '../components/utils/PriceText';

import { products } from '../data/mock';
import cartImage from '../asset/cart.png';

import styled from 'styled-components';

const StyledProductListWrapper = styled.div`
  display: flex;
  justify-content: center;
  max-width: 1440px;
  height: 100%;
  margin: 0 auto;
  padding: 60px;
`;

const StyledProduct = styled.li`
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  height: 360px;
  cursor: pointer;

  &:hover .product-image {
    transition: all 0.3s ease-out 0s;
    transform: scale(1.1);
  }
`;

const StyledProductDescDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 282px;
  padding: 18px 12px 0;
`;

const StyledProductInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 215px;
`;

const StyledProductName = styled.span`
  font-size: 16px;
  width: 100%;
  line-height: 22px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

function ProductListPage() {
  const getProductItem = () => {
    return products.map((product) => (
      <StyledProduct key={product.id}>
        <Image src={product.image} alt={product.name} className="product-image" isBackgroundImageNeeded={true} />

        <StyledProductDescDiv>
          <StyledProductInfoDiv>
            <StyledProductName>{product.name}</StyledProductName>
            <PriceText fontSize="20px" lineHeight="26.7px">
              {product.price}
            </PriceText>
          </StyledProductInfoDiv>

          <IconButton src={cartImage} alt="장바구니 아이콘" />
        </StyledProductDescDiv>
      </StyledProduct>
    ));
  };

  return (
    <StyledProductListWrapper>
      <GridColumnList gridColumnGap="48px" gridRowGap="28px" gridColumnRepeatCount="4" gridColumnWidth="282px">
        {getProductItem()}
      </GridColumnList>
    </StyledProductListWrapper>
  );
}

export default ProductListPage;
