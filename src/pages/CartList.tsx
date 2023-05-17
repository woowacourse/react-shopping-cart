import React from 'react';
import { Typography as Title } from '../ui/Typography';
import * as Styled from './styles/CartList.styles';
import { CartItem } from '../components/CartItem';
import { useRecoilValue } from 'recoil';
import { cartState } from '../atoms/CartState';

export const CartList = () => {
  const cartLists = useRecoilValue(cartState);

  return (
    <Styled.Wrapper>
      <Styled.TitleWrapper>
        <Title size="28px" weight="600">
          장바구니
        </Title>
      </Styled.TitleWrapper>
      {cartLists.map((product) => (
        <CartItem
          key={product.id}
          id={product.id}
          imageUrl={product.product.imageUrl}
          name={product.product.name}
          price={product.product.price}
          quantity={product.quantity}
        />
      ))}
    </Styled.Wrapper>
  );
};
