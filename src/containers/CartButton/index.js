import React from 'react';
import { Link } from 'react-router-dom';

import Image from 'components/Image';

function CartButton() {
  const handleCartButtonClick = () => {};

  return (
    <Link onClick={handleCartButtonClick} to="">
      <Image src={'img/shopping-cart-black.png'} width={'30px'} height={'26px'} alt="카드 이미지" />
    </Link>
  );
}

export default CartButton;
