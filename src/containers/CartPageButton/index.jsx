import React from 'react';
import { Link } from 'react-router-dom';

import MarginWrapper from 'components/MarginWrapper';
import WhiteButton from 'components/WhiteButton';

function CartPageButton() {
  return (
    <MarginWrapper marginRight="4px">
      <Link to="/cart-list">
        <WhiteButton fontSize="1.5rem">장바구니</WhiteButton>
      </Link>
    </MarginWrapper>
  );
}

export default CartPageButton;
