import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PageTitle from '../../components/PageTitle';
import FloatingBox from '../../components/FloatingBox';
import CheckBox from '../../components/utils/CheckBox';
import Button from '../../components/utils/Button';
import Flex from '../../components/utils/Flex';

import CartItem from './CartItem';

import { toggleCheckbox, allCheck, allUnCheck } from '../../modules/cart';
import { addPaymentItems } from '../../modules/payment';

import { deleteCheckedItems, getTotalPrice } from '../../utils';

import { COLOR } from '../../constant';

import styled, { css } from 'styled-components';

const CartItemWrapperStyle = css`
  width: 1320px;
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
  color: ${COLOR.GRAY[800]};
  margin: 27px 8px 8px;
`;

const CartItemList = styled.ul`
  margin-top: 10px;
  border-top: 4px solid ${COLOR.GRAY[600]};
`;

const CartPage = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart);
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

  const onDeleteCheckedItemsButtonClick = () => {
    deleteCheckedItems(dispatch, checkedItemIds);
  };

  const onPaymentButtonClick = () => {
    dispatch(addPaymentItems(cartItems));
  };

  return (
    <>
      <PageTitle pageTitle="장바구니" />
      {cartItems.length ? (
        <Flex justifyContent="space-between" css={CartItemWrapperStyle}>
          <CartItemSection>
            <Flex justifyContent="space-between">
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
                border={`1px solid ${COLOR.GRAY[500]}`}
                color={COLOR.GRAY[800]}
                fontSize="16px"
                hoverColor={COLOR.WHITE[400]}
                hoverBackgroundColor={COLOR.CYAN[400]}
                hoverBorder={`1px solid ${COLOR.CYAN[400]}`}
                disabledBackgroundColor="inherit"
                disabledColor={COLOR.GRAY[800]}
                disabledBorder={`1px solid ${COLOR.GRAY[500]}`}
                onClick={onDeleteCheckedItemsButtonClick}
                disabled={checkedItemIds.length === 0}
              >
                상품삭제
              </Button>
            </Flex>

            <CartItemSectionTitle>든든배송 상품 ({cartItems.length}개)</CartItemSectionTitle>
            <CartItemList>
              {cartItems &&
                cartItems
                  .map((cartItem) => (
                    <CartItem
                      key={cartItem.id}
                      cartItem={cartItem}
                      checked={checkedItemIds.includes(cartItem.id)}
                      onCheckboxClick={onCheckboxClick}
                    />
                  ))
                  .reverse()}
            </CartItemList>
          </CartItemSection>

          <FloatingBox
            price={getTotalPrice(cartItems)}
            selectedItemIds={checkedItemIds}
            linkPath="/payment"
            onClick={onPaymentButtonClick}
            disabled={checkedItemIds.length === 0}
          />
        </Flex>
      ) : (
        '장바구니에 담은 상품이 없습니다.'
      )}
    </>
  );
};

export default CartPage;
