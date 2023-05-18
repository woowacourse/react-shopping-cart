import React from 'react';
import { useRecoilValue } from 'recoil';
import { cartState } from '../../../recoil/cart';
import CartItem from '../CartItem';
import * as S from './CartList.styles';

const CartList = () => {
  const cartItems = useRecoilValue(cartState);

  return (
    <S.Container>
      <S.CartList>
        {cartItems.map((item) => (
          <li key={item.id}>
            <CartItem {...item} />
          </li>
        ))}
      </S.CartList>
    </S.Container>
  );
};

export default CartList;
