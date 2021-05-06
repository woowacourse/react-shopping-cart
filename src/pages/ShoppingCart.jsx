import React, { useState } from 'react';
import Button, { TYPE } from '../components/button/Button';
import Checkbox from '../components/checkbox/Checkbox';
import ShoppingCartItem from '../components/shoppingCartItem/ShoppingCartItem';

const MOCK_UP_DATA = {
  src: 'https://user-images.githubusercontent.com/40762111/117096676-c9fd6200-ada4-11eb-9ccb-8bd52ec86210.png',
  alt: 'PET보틀-정사각(420ml)',
  price: 43400,
  name: 'PET보틀-정사각(420ml)',
};

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
      <ShoppingCartItem {...MOCK_UP_DATA} />
    </>
  );
};

export default ShoppingCart;
