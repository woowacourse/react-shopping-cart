import React, { useState } from 'react';
import styled from 'styled-components';
import Button, { TYPE as BUTTON_TYPE } from '../components/button/Button';
import Checkbox from '../components/checkbox/Checkbox';
import PageTitle from '../components/pageTitle/PageTitle';
import PaymentAmount, { TYPE as PAYMENT_AMOUNT_TYPE } from '../components/paymentAmount/PaymentAmount';
import ShoppingCartItem from '../components/shoppingCartItem/ShoppingCartItem';
import { COLOR } from '../constants/color';

const MOCK_UP_DATA = {
  src: 'https://user-images.githubusercontent.com/40762111/117096676-c9fd6200-ada4-11eb-9ccb-8bd52ec86210.png',
  alt: 'PET보틀-정사각(420ml)',
  price: 43400,
  name: 'PET보틀-정사각(420ml)',
};

const StyledShoppingCartSection = styled.section`
  position: relative;
  display: flex;
  margin-top: 51px;
  padding: 0 18px;
`;

const StyledShoppingCartTop = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 26px;
`;

const StyledShoppingCartItemCount = styled.div`
  padding-bottom: 24px;
  border-bottom: 4px solid ${COLOR.GRAY_400};
  font-size: 20px;
`;

const StyledShoppingCartItem = styled.li`
  &:not(:last-child) {
    border-bottom: 2px solid ${COLOR.GRAY_200};
    margin-top: 24px;
    padding-bottom: 12px;
  }
`;

const StyledPaymentAmountWrapper = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
`;

const ShoppingCart = ({ productListState }) => {
  const [isChecked, setCheck] = useState(false);

  const handleCheckbox = ({ target }) => {
    setCheck(target.checked);
  };

  return (
    <>
      <PageTitle>장바구니</PageTitle>
      <StyledShoppingCartSection>
        <div>
          <StyledShoppingCartTop>
            <Checkbox onChange={handleCheckbox} isChecked={isChecked}>
              선택해제
            </Checkbox>
            <Button type={BUTTON_TYPE.X_SMALL}>상품삭제</Button>
          </StyledShoppingCartTop>
          <StyledShoppingCartItemCount>든든배송 상품 (3개) </StyledShoppingCartItemCount>
          <ul>
            {productListState.map(({ src, alt, name, price }) => (
              <StyledShoppingCartItem>
                <ShoppingCartItem {...MOCK_UP_DATA} src={src} alt={alt} name={name} price={price} />
              </StyledShoppingCartItem>
            ))}
          </ul>
        </div>
        <StyledPaymentAmountWrapper>
          <PaymentAmount type={PAYMENT_AMOUNT_TYPE.SHOPPING_CART} price={MOCK_UP_DATA.price} count={2} />
        </StyledPaymentAmountWrapper>
      </StyledShoppingCartSection>
    </>
  );
};

export default ShoppingCart;
