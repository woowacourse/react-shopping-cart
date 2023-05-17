import React from 'react';
import { Image } from '../ui/Image';
import { Typography as ProductPrice } from '../ui/Typography';
import { CartCount } from './CartCount';
import { DeleteCartButton } from '../types/image';
import * as Styled from './styles/CartItem.styles';

export const CartItem = () => {
  return (
    <Styled.Wrapper>
      <Styled.CheckboxInput type="checkbox" />
      <Image width="148px" height="180px" />
      <Styled.ProductName size="18px">
        든든 야채바삭 김말이 튀김 얄루
      </Styled.ProductName>
      <Styled.CountInteractionWrapper>
        <DeleteCartButton />
        <CartCount
          quantity={0}
          handleDeleteCart={() => {
            return;
          }}
          increaseProductCount={() => {
            return;
          }}
          decreaseProductCount={() => {
            return;
          }}
        />
        <ProductPrice>상품가격</ProductPrice>
      </Styled.CountInteractionWrapper>
    </Styled.Wrapper>
  );
};
