import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import PageTitle from '../../components/PageTitle';
import FloatingBox from '../../components/FloatingBox';
import CheckBox from '../../components/utils/CheckBox';
import Button from '../../components/utils/Button';
import Flex from '../../components/utils/Flex';
import LoadingPage from '../LoadingPage';

import CartItem from './CartItem';
import tung from '../../asset/tung.png';

import { toggleCheckbox, allCheck, allUnCheck } from '../../modules/cartSlice';
import { addPaymentItems } from '../../modules/paymentSlice';

import { deleteCheckedItems, getTotalPrice } from '../../utils';

import { COLOR } from '../../constant';

import styled, { css } from 'styled-components';
import { getCartItemsRequest } from '../../modules/cartSlice';

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

const LinkStyle = styled(NavLink)`
  text-decoration: none;

  &:visited {
    color: ${COLOR.WHITE[400]};
    font-weight: 700;
  }
`;

const ButtonStyle = css`
  border-radius: 10px;
  margin: 10px;
`;

const CartPage = () => {
  const dispatch = useDispatch();

  const { cartItemsInServer, loading, errorMessage } = useSelector((state) => state.cartSlice);
  const [checkedItemIds, setCheckedItemIds] = useState([]);

  useEffect(() => {
    dispatch(getCartItemsRequest());
    setCheckedItemIds(cartItemsInServer.filter((item) => item.checked));
  }, [dispatch]);

  useEffect(() => {
    if (errorMessage) {
      window.alert(errorMessage);
    }
  }, [errorMessage]);

  const onCheckboxClick = (cartItemId) => {
    dispatch(toggleCheckbox(cartItemId));
  };

  const getCheckboxMessage = () => {
    switch (checkedItemIds.length) {
      case cartItemsInServer.length:
        return '선택해제';
      case 0:
        return '전체선택';
      default:
        return `${checkedItemIds.length}개 선택`;
    }
  };

  const onAllCheckboxClick = () => {
    if (checkedItemIds.length === cartItemsInServer.length) {
      dispatch(allUnCheck());
    } else {
      dispatch(allCheck());
    }
  };

  const onDeleteCheckedItemsButtonClick = () => {
    deleteCheckedItems(dispatch, checkedItemIds);
  };

  const onPaymentButtonClick = () => {
    dispatch(addPaymentItems(cartItemsInServer));
  };

  return (
    <>
      {loading && <LoadingPage>장바구니 아이템들을 불러오는 중입니다</LoadingPage>}
      <PageTitle pageTitle="장바구니" />
      {cartItemsInServer && cartItemsInServer.length ? (
        <Flex justifyContent="space-between" css={CartItemWrapperStyle}>
          <CartItemSection>
            <Flex justifyContent="space-between">
              <CheckBox
                labelName={getCheckboxMessage()}
                id="cartItemCheckBox"
                checked={checkedItemIds.length === cartItemsInServer.length}
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

            <CartItemSectionTitle>든든배송 상품 ({cartItemsInServer.length}개)</CartItemSectionTitle>
            <CartItemList>
              {cartItemsInServer &&
                cartItemsInServer
                  .map((singleItemInServer) => (
                    <CartItem
                      key={singleItemInServer.product_id}
                      cartItemInServer={singleItemInServer}
                      checked={checkedItemIds.includes(singleItemInServer.product_id)}
                      onCheckboxClick={onCheckboxClick}
                    />
                  ))
                  .reverse()}
            </CartItemList>
          </CartItemSection>

          <FloatingBox
            price={getTotalPrice(cartItemsInServer)}
            selectedItemIds={checkedItemIds}
            linkPath="/payment"
            onClick={onPaymentButtonClick}
            disabled={checkedItemIds.length === 0}
          />
        </Flex>
      ) : (
        <Flex justifyContent="center" alignItems="center" flexDirection="column">
          <img src={tung} alt="장바구니에 상품없음 이미지" />
          <Button
            width="117px"
            height="50px"
            color={COLOR.WHITE[400]}
            border="none"
            backgroundColor={COLOR.CYAN[400]}
            fontSize="18px"
            css={ButtonStyle}
          >
            <LinkStyle to="/">쇼핑하러 가기</LinkStyle>
          </Button>
        </Flex>
      )}
    </>
  );
};

export default CartPage;
