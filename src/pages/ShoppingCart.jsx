import React, { useState } from 'react';
import styled from 'styled-components';
import Button, { TYPE as BUTTON_TYPE } from '../components/button/Button';
import Checkbox from '../components/checkbox/Checkbox';
import PageTitle from '../components/pageTitle/PageTitle';
import PaymentAmount, { TYPE as PAYMENT_AMOUNT_TYPE } from '../components/paymentAmount/PaymentAmount';
import ShoppingCartItem from '../components/shoppingCartItem/ShoppingCartItem';
import { COLOR } from '../constants/color';

const Content = styled.section`
  position: relative;
  display: flex;
  margin-top: 51px;
  padding: 0 18px;
`;

const ShoppingCartItemModification = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 26px;
`;

const ShoppingCartCount = styled.div`
  padding-bottom: 24px;
  border-bottom: 4px solid ${COLOR.GRAY_400};
  font-size: 20px;
`;

const ShoppingCartItemWrapper = styled.li`
  &:not(:last-child) {
    border-bottom: 2px solid ${COLOR.GRAY_200};
    margin-top: 24px;
    padding-bottom: 12px;
  }
`;

const PaymentAmountWrapper = styled.div`
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
      <Content>
        <div>
          <ShoppingCartItemModification>
            <Checkbox onChange={handleCheckbox} isChecked={isChecked}>
              선택해제
            </Checkbox>
            <Button type={BUTTON_TYPE.X_SMALL}>상품삭제</Button>
          </ShoppingCartItemModification>
          <ShoppingCartCount>든든배송 상품 (3개) </ShoppingCartCount>
          <ul>
            {productListState.map(({ src, id, alt, name, price }) => (
              <ShoppingCartItemWrapper key={id}>
                <ShoppingCartItem src={src} alt={alt} name={name} price={price} />
              </ShoppingCartItemWrapper>
            ))}
          </ul>
        </div>
        <PaymentAmountWrapper>
          <PaymentAmount type={PAYMENT_AMOUNT_TYPE.SHOPPING_CART} price={40000} count={2} />
        </PaymentAmountWrapper>
      </Content>
    </>
  );
};

export default ShoppingCart;
