import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PageTitle from '../../components/PageTitle';
import FloatingBox from '../../components/FloatingBox';
import CheckBox from '../../components/utils/CheckBox';
import Button from '../../components/utils/Button';
import CartItem from './CartItem';

import { toggleCheckbox } from '../../modules/cart';

import styled from 'styled-components';

const CartItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1320px;
`;

const CartItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CartItemSection = styled.section`
  width: 753px;
  margin: 42px 0;
  padding: 0 25px;
`;

const CartItemSectionTitle = styled.h3`
  font-size: 20px;
  font-weight: 400;
  line-height: 33px;
  color: #333333;
  margin: 27px 8px 8px;
`;

const CartItemList = styled.ul`
  margin-top: 10px;
  border-top: 4px solid #aaaaaa;
`;

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const checkedItemIds = cartItems.filter((item) => item.checked).map((item) => item.id);

  const onCheckboxClick = (cartItemId) => {
    dispatch(toggleCheckbox(cartItemId));
  };

  const getTotalPrice = () =>
    cartItems.reduce((totalPrice, item) => (totalPrice += item.checked ? item.price * item.quantity : 0), 0);

  return (
    <>
      <PageTitle pageTitle="장바구니" />
      {cartItems.length ? (
        <CartItemWrapper>
          <CartItemSection>
            <CartItemHeader>
              <CheckBox labelName="선택해제" id="cartItemCheckBox" />
              <Button
                width="117px"
                height="50px"
                backgroundColor="inherit"
                border="1px solid #bbbbbb"
                color="#333333"
                fontSize="16px"
              >
                상품삭제
              </Button>
            </CartItemHeader>
            <CartItemSectionTitle>든든배송 상품 ({cartItems.length}개)</CartItemSectionTitle>

            <CartItemList>
              {cartItems &&
                cartItems.map((cartItem) => (
                  <CartItem
                    key={cartItem.id}
                    cartItem={cartItem}
                    checked={checkedItemIds.includes(cartItem.id)}
                    onCheckboxClick={onCheckboxClick}
                  />
                ))}
            </CartItemList>
          </CartItemSection>
          <FloatingBox price={getTotalPrice()} selectedItems={checkedItemIds.length} />
        </CartItemWrapper>
      ) : (
        '장바구니에 담은 상품이 없습니다.'
      )}
    </>
  );
};

export default CartPage;
