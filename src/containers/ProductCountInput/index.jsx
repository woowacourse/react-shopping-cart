import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import Input from 'components/Input';

import { openCartProductMaxCountModal } from 'modules/modal';

import { productCountEdit } from 'apis/cart';

function ProductCountInput({ id, productCount }) {
  const dispatch = useDispatch();

  const handleProductCount = ({ target }) => {
    if (!Number.isInteger(target.value / 1)) {
      return;
    }

    if (Number(target.value) === 0) {
      return;
    }

    if (Number(target.value) > 1000) {
      dispatch(openCartProductMaxCountModal());
      return;
    }

    dispatch(productCountEdit(target.id, target.value));
  };

  const handleProductCountClick = ({ target }) => {
    target.select();
  };

  return (
    <Input
      onClick={handleProductCountClick}
      onChange={handleProductCount}
      id={id}
      value={productCount}
      type="text"
      width="74px"
      height="60px"
      border="1px solid black"
      fontSize="36px"
    />
  );
}

export default ProductCountInput;
