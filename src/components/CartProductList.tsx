import React from 'react';
import { styled } from 'styled-components';
import { CartProductItem } from './CartProductItem';
import { StyledText } from './common/Text';
import { CheckBox } from './common/CheckBox';
import { Button as SelectedDeleteButton } from './common/Button';

export const CartProductList = () => {
  return (
    <CartProductListContainer>
      <ProductCountTextWrapper>
        <ProductCountText size="20px">든든배송 상품 (5개)</ProductCountText>
      </ProductCountTextWrapper>
      <ProductItemContainer>
        <CartProductItem />
        <CartProductItem />
        <CartProductItem />
        <CartProductItem />
        <CartProductItem />
      </ProductItemContainer>
      <BottomSideWrapper>
        <CheckBox />
        <SelectedProductText>전체선택 (0/5)</SelectedProductText>
        <SelectedDeleteButton
          onClick={() => {
            return;
          }}
          $width="98px"
          $height="35px"
          backgroundColor="var(--white-color)"
          borderColor="var(--label-color)"
        >
          선택삭제
        </SelectedDeleteButton>
      </BottomSideWrapper>
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

const BottomSideWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
`;

const SelectedProductText = styled(StyledText)`
  margin: 0 20px;
`;
