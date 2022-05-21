import React from 'react';
import { useDispatch } from 'react-redux';

import Button from 'components/Button';

import { addProductCart } from 'apis/cart';

function AddCartButton({ id }) {
  const dispatch = useDispatch();

  const handleCartButtonClick = ({ target }) => {
    dispatch(addProductCart(target));
  };

  return (
    <Button
      onClick={handleCartButtonClick}
      id={id}
      width="638px"
      height="98px"
      fontSize="32px"
      fontWeight="700"
      color="whiteColor"
      background="#73675C"
    >
      장바구니
    </Button>
  );
}

export default AddCartButton;
