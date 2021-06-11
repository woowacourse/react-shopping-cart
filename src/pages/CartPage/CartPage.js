import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

import PageTitle from '../../components/PageTitle';
import FloatingBox from '../../components/FloatingBox';
import CheckBox from '../../components/utils/CheckBox';
import Button from '../../components/utils/Button';
import Flex from '../../components/utils/Flex';
import LoadingPage from '../LoadingPage';
import CartItem from './CartItem';

import { allCheck, allUnCheck, deleteItemFromCartRequest, getCartItemsRequest } from '../../modules/cartSlice';
import { addItemsToOrderList } from '../../modules/paymentSlice';

import tung from '../../asset/tung.png';
import { getTotalPrice } from '../../utils';
import { COLOR, STATUS, PAGE_TITLE, LOADING_MESSAGE } from '../../constant';

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
  color: ${COLOR.GRAY[900]};
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

  const { status, cartItemsInServer, errorMessage } = useSelector((state) => state.cartSlice);
  const [checkedItemIds, setCheckedItemIds] = useState([]);

  useEffect(() => {
    dispatch(getCartItemsRequest());
  }, [dispatch]);

  useEffect(() => {
    setCheckedItemIds(cartItemsInServer.filter((item) => item.checked));
  }, [cartItemsInServer]);

  useEffect(() => {
    if (errorMessage) {
      window.alert(errorMessage);
    }
  }, [errorMessage]);

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
    checkedItemIds.forEach((itemId) => {
      dispatch(deleteItemFromCartRequest(itemId.cart_id));
    });
  };

  const onDeleteItemButtonClick = (cart_id) => {
    dispatch(deleteItemFromCartRequest(cart_id));
  };

  const onOrderButtonClick = () => {
    dispatch(addItemsToOrderList(cartItemsInServer));
  };

  return (
    <>
      {status === STATUS.LOADING && <LoadingPage>{LOADING_MESSAGE.GET_CART_ITEMS}</LoadingPage>}
      <PageTitle pageTitle={PAGE_TITLE.CART} />
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
                color={COLOR.GRAY[900]}
                fontSize="16px"
                hoverColor={COLOR.WHITE[400]}
                hoverBackgroundColor={COLOR.CYAN[400]}
                hoverBorder={`1px solid ${COLOR.CYAN[400]}`}
                disabledBackgroundColor="inherit"
                disabledColor={COLOR.GRAY[900]}
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
                      singleItemInServer={singleItemInServer}
                      checked={singleItemInServer.checked}
                      onClick={() => onDeleteItemButtonClick(singleItemInServer.cart_id)}
                    />
                  ))
                  .reverse()}
            </CartItemList>
          </CartItemSection>

          <FloatingBox
            price={getTotalPrice(cartItemsInServer)}
            selectedItemIds={checkedItemIds}
            linkPath="/payment"
            onClick={onOrderButtonClick}
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
