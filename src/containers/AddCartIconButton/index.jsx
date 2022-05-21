import React from 'react';
import { useDispatch } from 'react-redux';

import Image from 'components/Image';

import { addProductCart } from 'apis/cart';

function AddCartIconButton({ id }) {
  const dispatch = useDispatch();

  const handleCartButtonClick = ({ target }) => {
    dispatch(addProductCart(target));
  };

  return (
    <Image
      onClick={handleCartButtonClick}
      src={'/img/shopping-cart-black.png'}
      id={id}
      width="30px"
      height="26px"
      cursor="pointer"
    />
  );
}

export default AddCartIconButton;
