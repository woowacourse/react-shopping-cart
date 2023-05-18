import React from 'react';
import { useRecoilValue } from 'recoil';
import { cartState } from '../../../recoil/cart';
import CartItem from '../CartItem';

const CartList = () => {
  const cartItems = useRecoilValue(cartState);

  return (
    <ul>
      {cartItems.map((item) => (
        <li key={item.id}>
          <CartItem {...item} />
        </li>
      ))}
    </ul>
  );
};

export default CartList;
