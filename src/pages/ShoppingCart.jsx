import React, { useState } from 'react';
import styled from 'styled-components';
import Button, { TYPE as BUTTON_TYPE } from '../components/button/Button';
import Checkbox from '../components/checkbox/Checkbox';
import PageTitle from '../components/pageTitle/PageTitle';
import PaymentAmount, { TYPE as PAYMENT_AMOUNT_TYPE } from '../components/paymentAmount/PaymentAmount';
import SelectedProductList, {
  TYPE as SELECTED_PRODUCT_LIST_TYPE,
} from '../components/selectedProductList/SelectedProductList';
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
          <SelectedProductList
            listType={SELECTED_PRODUCT_LIST_TYPE.SHOPPING_CART}
            count={3}
            productList={productListState}
            ListItem={ShoppingCartItem}
          />
        </div>
        <PaymentAmountWrapper>
          <PaymentAmount type={PAYMENT_AMOUNT_TYPE.SHOPPING_CART} price={40000} count={2} />
        </PaymentAmountWrapper>
      </Content>
    </>
  );
};

export default ShoppingCart;
