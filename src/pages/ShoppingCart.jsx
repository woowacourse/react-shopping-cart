import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Button, { BUTTON_TYPE } from '../components/button/Button';
import Checkbox from '../components/checkbox/Checkbox';
import PageTitle from '../components/pageTitle/PageTitle';
import PaymentAmount, { PAYMENT_AMOUNT_TYPE } from '../components/paymentAmount/PaymentAmount';
import SelectedProductList, { SELECTED_PRODUCT_LIST_TYPE } from '../components/selectedProductList/SelectedProductList';
import ShoppingCartItem from '../components/shoppingCartItem/ShoppingCartItem';
import { deleteCheckedShoppingCartList, toggleAllShoppingCartItem } from '../modules/shoppingCart';

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
  const dispatch = useDispatch();
  const shoppingCartList = useSelector((state) => state.shoppingCart.shoppingCartList);
  const isChecked = useSelector((state) => state.shoppingCart.isAllShoppingCartItemChecked);
  const checkedShoppingCartList = shoppingCartList.filter((item) => item.isChecked);

  const handleAllShoppingCartItemToggle = () => {
    dispatch(toggleAllShoppingCartItem());
  };

  // TODO: custom confirm 다이얼로그 만들기
  const handleCheckedShoppingCartListDelete = () => {
    if (!window.confirm(`${checkedShoppingCartList.length}개의 상품을 삭제하시겠습니까?`)) return;

    checkedShoppingCartList.forEach(({ id }) =>
      fetch(`http://localhost:4000/shoppingCartList/${id}`, { method: 'DELETE' })
    );

    dispatch(deleteCheckedShoppingCartList());
  };

  return (
    <>
      <PageTitle>장바구니</PageTitle>
      <Content>
        <div>
          <ShoppingCartItemModification>
            <Checkbox isChecked={isChecked} onChange={handleAllShoppingCartItemToggle}>
              {isChecked ? '선택해제' : '전체선택'}
            </Checkbox>
            <Button
              onClick={handleCheckedShoppingCartListDelete}
              type={BUTTON_TYPE.X_SMALL}
              disabled={!checkedShoppingCartList.length}
            >
              상품삭제
            </Button>
          </ShoppingCartItemModification>
          <SelectedProductList
            listType={SELECTED_PRODUCT_LIST_TYPE.SHOPPING_CART}
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
