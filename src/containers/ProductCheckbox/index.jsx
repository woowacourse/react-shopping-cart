import React from 'react';

import Checkbox from 'components/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { requestProductCheck } from 'modules/cart';

function ProductCheckbox({ productId }) {
  const carts = useSelector((state) => state.cart.carts);
  const cartsIdx = carts.map((product) => product.id);
  const productIdx = cartsIdx.indexOf(productId);

  const dispatch = useDispatch();

  const handleClickCheckbox = () => {
    dispatch(requestProductCheck(productIdx));
  };

  return <Checkbox isChecked={carts[productIdx].isChecked} onClick={handleClickCheckbox} />;
}

export default ProductCheckbox;
