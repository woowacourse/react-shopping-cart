import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import Input from 'components/Input';

import { openCartProductMaxCountModal } from 'modules/modal';

import { productCountEdit } from 'apis/cart';

function ProductCountInput({ id, productCount }) {
  const [count, setCount] = useState(productCount);
  const dispatch = useDispatch();
  const productCountInputRef = useRef(null);

  useEffect(() => {
    setCount(productCount);
  }, [productCount]);

  const handleProductCount = ({ target }) => {
    if (!Number.isInteger(target.value / 1)) {
      return;
    }

    if (Number(target.value) === 0) {
      return;
    }

    if (Number(target.value) > 1000) {
      dispatch(openCartProductMaxCountModal());
      dispatch(productCountEdit(target, 1000));
      setCount(1000);
      return;
    }

    setCount(target.value);
    dispatch(productCountEdit(target, target.value));
  };

  const handleProductCountClick = () => {
    productCountInputRef.current.select();
  };

  return (
    <Input
      onClick={handleProductCountClick}
      onChange={handleProductCount}
      id={id}
      value={count}
      type="text"
      width="74px"
      height="60px"
      border="1px solid black"
      fontSize="36px"
      ref={productCountInputRef}
    />
  );
}

export default ProductCountInput;
