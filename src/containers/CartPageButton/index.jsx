import React from 'react';
import { Link } from 'react-router-dom';

import MarginWrapper from 'components/MarginWrapper';
import WhiteButton from 'components/WhiteButton';
import { useSelector } from 'react-redux';
import Circle from 'components/Circle';
import CartPageButtonStyled from './style';
import FlexWrapper from 'components/FlexWrapper';

function CartPageButton() {
  const carts = useSelector((state) => state.cart.carts);

  return (
    <CartPageButtonStyled>
      <FlexWrapper>
        <MarginWrapper marginRight="4px">
          <Link to="/cart-list">
            <WhiteButton fontSize="1.5rem">장바구니</WhiteButton>
          </Link>
        </MarginWrapper>
        <Circle>{carts.length}</Circle>
      </FlexWrapper>
    </CartPageButtonStyled>
  );
}

export default CartPageButton;
