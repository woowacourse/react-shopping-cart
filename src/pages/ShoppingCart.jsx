import React, { useState } from 'react';
import Checkbox from '../components/checkbox/Checkbox';

const ShoppingCart = () => {
  const [isChecked, setCheck] = useState(false);

  const handleCheckbox = ({ target }) => {
    setCheck(target.checked);
  };

  return (
    <Checkbox onChange={handleCheckbox} isChecked={isChecked}>
      선택해제
    </Checkbox>
  );
};

export default ShoppingCart;
