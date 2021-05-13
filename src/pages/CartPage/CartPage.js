import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PageTitle from '../../components/PageTitle';
import FloatingBox from '../../components/FloatingBox';
import CheckBox from '../../components/utils/CheckBox';
import Button from '../../components/utils/Button';
import CartItem from './CartItem';

import { toggleCheckbox, allCheck, allUnCheck, deleteItem } from '../../modules/cart';
import { addPaymentItems } from '../../modules/payment';

import { getTotalPrice } from '../../utils';

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

  const getCheckboxMessage = () => {
    switch (checkedItemIds.length) {
      case cartItems.length:
        return '선택해제';
      case 0:
        return '전체선택';
      default:
        return `${checkedItemIds.length}개 선택`;
    }
  };

  const onAllCheckboxClick = () => {
    if (checkedItemIds.length === cartItems.length) {
      dispatch(allUnCheck());
    } else {
      dispatch(allCheck());
    }
  };

  const getDeleteCheckedItems = () => {
    checkedItemIds.forEach((id) => {
      dispatch(deleteItem(id));
    });
  };

  const onDeleteCheckedItemsButtonClick = () => {
    getDeleteCheckedItems();
  };

  const onPaymentButtonClick = () => {
    dispatch(addPaymentItems(cartItems.filter((item) => item.checked)));
    getDeleteCheckedItems();
  };

  return (
    <>
      <PageTitle pageTitle="장바구니" />
      {cartItems.length ? (
        <CartItemWrapper>
          <CartItemSection>
            <CartItemHeader>
              <CheckBox
                labelName={getCheckboxMessage()}
                id="cartItemCheckBox"
                checked={checkedItemIds.length === cartItems.length}
                onChange={onAllCheckboxClick}
              />
              <Button
                width="117px"
                height="50px"
                backgroundColor="inherit"
                border="1px solid #bbbbbb"
                color="#333333"
                fontSize="16px"
                onClick={onDeleteCheckedItemsButtonClick}
                disabled={checkedItemIds.length === 0}
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
          <FloatingBox
            price={getTotalPrice(cartItems)}
            selectedItemIds={checkedItemIds}
            linkPath="/payment"
            onClick={onPaymentButtonClick}
            disabled={checkedItemIds.length === 0}
          />
        </CartItemWrapper>
      ) : (
        '장바구니에 담은 상품이 없습니다.'
      )}
    </>
  );
};

export default CartPage;
