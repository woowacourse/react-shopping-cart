import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Styled from 'page/CartPage/index.style';
import CartProductItem from 'components/CartProductItem';

const CartPage = () => {
  const { shoppingCart } = useSelector(state => state.reducer);

  useEffect(() => {
    console.log(shoppingCart);
  }, [shoppingCart]);

  return (
    <Styled.CartPage>
      {shoppingCart.map(({ id, quantity }) => (
        <CartProductItem key={id} id={id} quantity={quantity} />
      ))}
    </Styled.CartPage>
  );
};

export default CartPage;
