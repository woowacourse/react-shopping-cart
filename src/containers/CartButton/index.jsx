import React from 'react';

import Image from 'components/Image';
import { useDispatch } from 'react-redux';

function CartButton() {
  const dispatch = useDispatch();
  const handleCartButtonClick = () => {};

  return (
    <Image
      src={process.env.PUBLIC_URL + '/img/shopping-cart-black.png'}
      width={'30px'}
      height={'26px'}
      alt="카트 이미지"
      onClick={handleCartButtonClick}
    />
  );
}

export default CartButton;
