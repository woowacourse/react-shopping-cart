import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Input from 'components/Input';

import { checkTotalCartProduct } from 'apis/cart';

function TotalCartProductCheckbox() {
  const dispatch = useDispatch();
  const isTotalCartProductCheck = useSelector((state) => state.cart.cartProducts).every(
    (product) => product.cart_check,
  );

  const handleTotalCheckbox = ({ target }) => {
    dispatch(checkTotalCartProduct(target.checked));
  };

  return (
    <Input
      onChange={handleTotalCheckbox}
      type="checkbox"
      width="28px"
      height="28px"
      border="1px solid #22A6A2"
      checked={isTotalCartProductCheck}
    />
  );
}

export default TotalCartProductCheckbox;
