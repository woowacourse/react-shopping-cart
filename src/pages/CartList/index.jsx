import React from 'react';

import BlackText from 'components/BlackText';
import Line from 'components/Line';
function CartList() {
  return (
    <>
      <BlackText fontSize="32px" fontWeight="700">
        장바구니
      </BlackText>
      <Line width="1320px" height="2px" color="#333" />
    </>
  );
}

export default CartList;
