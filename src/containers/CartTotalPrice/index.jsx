import React from 'react';

import Text from 'components/Text';

function CartTotalPrice({ cartProducts }) {
  let totalPrice = 0;
  cartProducts.map((product) =>
    product.cart_check ? (totalPrice += product.cart_product_count * product.product_price) : '',
  );

  return <Text>{totalPrice.toLocaleString()}원</Text>;
}

export default CartTotalPrice;
