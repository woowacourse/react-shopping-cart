import React from 'react';

import Image from 'components/Image';
import Button from 'components/Button';

function ProductCountDownButton() {
  const handleProductCountDown = () => {};

  return (
    <Button onClick={handleProductCountDown} width="42px" height="30px" border="1px solid black">
      <Image src="img/arrow-down.png" id="" width="12px" height="12px" cursor="pointer" />
    </Button>
  );
}

export default ProductCountDownButton;
