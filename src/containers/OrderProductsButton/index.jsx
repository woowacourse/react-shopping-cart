import React from 'react';

import Button from 'components/Button';

function OrderProductsButton({ cartProducts }) {
  const orderProductCount = cartProducts.filter((product) => product.cart_check).length;

  const handleOrderProducts = () => {
    console.log('주문하기');
  };

  return (
    <Button
      onClick={handleOrderProducts}
      width="26vw"
      height="74px"
      color="whiteColor"
      border="none"
      background="#2AC1BC"
    >
      주문하기({orderProductCount})개
    </Button>
  );
}

export default OrderProductsButton;
