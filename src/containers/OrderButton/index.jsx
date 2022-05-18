import Button from 'components/Button';
import React from 'react';

function OrderProductsButton() {
  const handleOrderProducts = () => {};

  return (
    <Button
      onClick={handleOrderProducts}
      width="388px"
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
