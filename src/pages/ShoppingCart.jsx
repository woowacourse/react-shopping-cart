import React, { useState } from 'react';
import Button, { TYPE as BUTTON_TYPE } from '../components/button/Button';
import Checkbox from '../components/checkbox/Checkbox';
import PageTitle from '../components/pageTitle/PageTitle';
import PaymentAmount, { TYPE as PAYMENT_AMOUNT_TYPE } from '../components/paymentAmount/PaymentAmount';
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
      <PageTitle>장바구니</PageTitle>
      <Checkbox onChange={handleCheckbox} isChecked={isChecked}>
        선택해제
      </Checkbox>
      <Button type={BUTTON_TYPE.MEDIUM}>장바구니</Button>
      <ShoppingCartItem {...MOCK_UP_DATA} />
      <PaymentAmount type={PAYMENT_AMOUNT_TYPE.SHOPPING_CART} price={MOCK_UP_DATA.price} count={2} />
    </>
  );
};

export default ShoppingCart;
