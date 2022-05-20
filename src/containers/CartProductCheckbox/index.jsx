import React from 'react';

import Input from 'components/Input';

function CartProductCheckbox() {
  const handleChecbox = () => {};

  return (
    <Input
      onClick={handleChecbox}
      type="checkbox"
      width="28px"
      height="28px"
      border="1px solid #22A6A2"
    />
  );
}

export default CartProductCheckbox;
