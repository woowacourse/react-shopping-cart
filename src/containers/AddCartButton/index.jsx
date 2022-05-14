import React from 'react';

import Image from 'components/Image';

function AddCartButton() {
  const handleCartButtonClick = () => {};

  return (
    <Image
      onClick={handleCartButtonClick}
      src={'/img/shopping-cart-black.png'}
      width={'30px'}
      height={'26px'}
    />
  );
}

export default AddCartButton;
