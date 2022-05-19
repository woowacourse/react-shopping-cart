import React from 'react';

import Button from 'components/Button';

function OrderProductsButton() {
  const handleOrderProducts = () => {};

  return (
    <Button
      onClick={handleOrderProducts}
      width="26vw"
      height="74px"
      color="whiteColor"
      border="none"
      background="#2AC1BC"
    >
      주문하기
    </Button>
  );
}

export default OrderProductsButton;
