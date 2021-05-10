import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Button, { BUTTON_TYPE } from '../components/button/Button';
import Checkbox from '../components/checkbox/Checkbox';
import PageTitle from '../components/pageTitle/PageTitle';
import PaymentAmount, { PAYMENT_AMOUNT_TYPE } from '../components/paymentAmount/PaymentAmount';
import SelectedProductList, { SELECTED_PRODUCT_LIST_TYPE } from '../components/selectedProductList/SelectedProductList';
import ShoppingCartItem from '../components/shoppingCartItem/ShoppingCartItem';

const Content = styled.section`
  position: relative;
  display: flex;
  padding: 0 18px;
`;

const ShoppingCartItemModification = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 26px;
`;

const PaymentAmountWrapper = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
`;
const getExpectedPaymentAmount = (checkedShoppingCartList) =>
  checkedShoppingCartList.reduce((acc, cur) => acc + cur.price * cur.count, 0);

const ShoppingCart = () => {
  const shoppingCartList = useSelector((state) => state.shoppingCart.shoppingCartList);
  const checkedShoppingCartList = shoppingCartList.filter((item) => item.isChecked);

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
          <SelectedProductList
            listType={SELECTED_PRODUCT_LIST_TYPE.SHOPPING_CART}
            count={3}
            productList={shoppingCartList}
            ListItem={ShoppingCartItem}
          />
        </div>
        <PaymentAmountWrapper>
          <PaymentAmount
            type={PAYMENT_AMOUNT_TYPE.SHOPPING_CART}
            price={getExpectedPaymentAmount(checkedShoppingCartList)}
            count={checkedShoppingCartList.length}
          />
        </PaymentAmountWrapper>
      </Content>
    </>
  );
};

export default ShoppingCart;
