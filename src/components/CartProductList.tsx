import React from 'react';
import { styled } from 'styled-components';
import { CartProductItem } from './CartProductItem';
import { StyledText } from './common/Text';

export const CartProductList = () => {
  return (
    <CartProductListContainer>
      <ProductCountTextWrapper>
        <ProductCountText size="20px">든든배송 상품 (3개)</ProductCountText>
      </ProductCountTextWrapper>
      <ProductItemContainer>
        <CartProductItem />
        <CartProductItem />
        <CartProductItem />
      </ProductItemContainer>
    </CartProductListContainer>
  );
};

const CartProductListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductCountText = styled(StyledText)`
  margin: 20px 0;
`;

const ProductCountTextWrapper = styled.div`
  width: 736px;
`;

const ProductItemContainer = styled.div`
  & > :nth-child(1) {
    border-top: 4px solid #aaaaaa;
    border-bottom: 1.5px solid #cccccc;
  }

  & > :not(:first-child) {
    border-bottom: 1.5px solid #cccccc;
  }
`;
