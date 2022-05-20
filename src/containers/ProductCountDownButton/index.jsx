import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Image from 'components/Image';
import Button from 'components/Button';

import { productCountEdit } from 'apis/cart';

function ProductCountDownButton({ id }) {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.cartProducts);

  const handleProductCountDown = ({ target }) => {
    const cartProduct = cartProducts.find((product) => product.product_id === id);

    if (Number(cartProduct.cart_product_count) <= 1) return;

    let count = Number(cartProduct.cart_product_count);

    dispatch(productCountEdit(target.id, (count -= 1)));
  };

  return (
    <Button id={id} width="42px" height="30px" border="1px solid black">
      <Image
        onClick={handleProductCountDown}
        src="img/arrow-down.png"
        id={id}
        width="12px"
        height="12px"
        cursor="pointer"
      />
    </Button>
  );
}

export default ProductCountDownButton;
