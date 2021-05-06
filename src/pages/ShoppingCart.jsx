import React, { useState } from 'react';
import Button, { TYPE } from '../components/button/Button';
import Checkbox from '../components/checkbox/Checkbox';

const ShoppingCart = () => {
  const [isChecked, setCheck] = useState(false);

  const handleCheckbox = ({ target }) => {
    setCheck(target.checked);
  };

  return (
    <>
      <Checkbox onChange={handleCheckbox} isChecked={isChecked}>
        선택해제
      </Checkbox>
      <Button type={TYPE.MEDIUM}>장바구니</Button>
    </>
  );
};

export default ShoppingCart;
