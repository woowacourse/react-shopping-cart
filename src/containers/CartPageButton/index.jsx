import React from 'react';

import MarginWrapper from 'components/MarginWrapper';
import WhiteButton from 'components/WhiteButton';

function CartPageButton() {
  return (
    <MarginWrapper marginRight="4px">
      <WhiteButton fontSize="1.5rem">장바구니</WhiteButton>
    </MarginWrapper>
  );
}

export default CartPageButton;
