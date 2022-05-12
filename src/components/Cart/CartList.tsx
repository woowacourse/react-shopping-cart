import { useAppSelector } from 'hooks/useAppSelector';
import React from 'react';
import { CartItem } from 'types/domain';

const CartList = () => {
  const { data: cartList, error, loading } = useAppSelector(state => state.cartListReducer);

  return (
    <div>
      {cartList.map((item: CartItem) => (
        <React.Fragment key={item.id}>
          <div>id는 {item.id}</div>
          <div>quantity는 {item.quantity}</div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default CartList;
