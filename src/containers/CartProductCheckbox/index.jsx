import React from 'react';
import { useDispatch } from 'react-redux';

import Input from 'components/Input';

import { checkCartProduct } from 'apis/cart';

function CartProductCheckbox({ id, checked }) {
  const dispatch = useDispatch();

  const handleCheckbox = ({ target }) => {
    dispatch(checkCartProduct(target.id, target.checked));
  };

  return (
    <Input
      onChange={handleCheckbox}
      id={id}
      type="checkbox"
      width="28px"
      height="28px"
      border="1px solid #22A6A2"
      checked={checked}
    />
  );
}

export default CartProductCheckbox;
