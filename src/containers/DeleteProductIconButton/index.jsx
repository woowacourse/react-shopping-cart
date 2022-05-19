import React from 'react';

import Image from 'components/Image';
import Button from 'components/Button';

function ProductDeleteButton() {
  const handleProductDelete = () => {};

  return (
    <Button onClick={handleProductDelete} width="24px" height="24px" border="none">
      <Image src="img/trash.png" id="" width="24px" height="24px" cursor="pointer" />
    </Button>
  );
}

export default ProductDeleteButton;
