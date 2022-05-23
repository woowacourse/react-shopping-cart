import React from 'react';

import Checkbox from 'components/Checkbox';
import { useSelector } from 'react-redux';

function AllCheckbox() {
  let isChecked = false;
  const carts = useSelector((state) => state.cart.carts);

  if (carts.every((product) => product.isChecked)) {
    isChecked = true;
  }
  // const productIdx = cartsIdx.indexOf(productId);

  const handleClickCheckbox = () => {};

  return <Checkbox label="선택해제" onClick={handleClickCheckbox} isChecked={isChecked} />;
}

export default AllCheckbox;
