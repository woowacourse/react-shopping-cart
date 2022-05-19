import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Title from 'components/common/Title';
import CartProductItem from './CartProductItem';
import CheckBox from 'components/common/Styled/CheckBox';
import PaymentModal from 'components/common/Modal/PaymentModal';
import { DeleteButton } from 'components/common/Styled';
import { useDispatch, useSelector } from 'react-redux';
import cartReducer from 'modules/cart';
import { getProduct } from 'modules/product';

const Styled = {
  Container: styled.section`
    display: flex;
    flex-direction: column;
    width: 90%;
    margin: 0 auto;
  `,
  Wrapper: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 50px;
  `,
  CartContentBox: styled.div`
    display: flex;
    flex-direction: column;
    width: fit-content;
    margin-top: 50px;
  `,
  CartDeleteBox: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 30px;
  `,
  CartDeleteSelector: styled.div`
    position: relative;
    display: flex;
    width: 500px;
    height: 40px;
    flex-direction: row;

    & > div {
      top: -20px;
      position: absolute;
    }
    & > span {
      margin-left: 50px;
      margin-top: 5px;
    }
  `,
  CartProductList: styled.div`
    display: flex;
    flex-direction: column;
  `,
  CartProductListContent: styled.div`
    margin-top: 40px;
  `,
  CartProductTotalAmount: styled.p`
    position: relative;
    padding: 10px 0;

    :after {
      content: '';
      position: absolute;
      left: 0px;
      bottom: -10px;
      height: 3px;
      width: 100%;
      background: #aaaaaa;
    }
  `,
  PaymentModalBox: styled.div`
    margin-top: 100px;
  `,
};

const Cart = ({ onAddCartButtonClick }) => {
  const cartList = useSelector(({ cartReducer }) => cartReducer.cartList);
  console.log(cartList);

  return (
    <Styled.Container>
      <Title>장바구니</Title>
      <Styled.Wrapper>
        <Styled.CartContentBox>
          <Styled.CartDeleteBox>
            <Styled.CartDeleteSelector>
              <CheckBox id="total" />
              <span>선택해제</span>
            </Styled.CartDeleteSelector>
            <DeleteButton>상품삭제 </DeleteButton>
          </Styled.CartDeleteBox>
          <Styled.CartProductList>
            <Styled.CartProductTotalAmount>라인프렌즈 상품 (개)</Styled.CartProductTotalAmount>
            <Styled.CartProductListContent>
              {cartList.length !== 0 ? (
                cartList.map((item) => (
                  <CartProductItem
                    key={`${item.name}${item.id}`}
                    productInfo={item}
                    onAddCartButtonClick={onAddCartButtonClick}
                  />
                ))
              ) : (
                <div>상품비어있음</div>
              )}
            </Styled.CartProductListContent>
          </Styled.CartProductList>
        </Styled.CartContentBox>
        <Styled.PaymentModalBox>
          <PaymentModal type="cart" amount={1000} />
        </Styled.PaymentModalBox>
      </Styled.Wrapper>
    </Styled.Container>
  );
};

Cart.propTypes = {
  onAddCartButtonClick: PropTypes.func,
};

export default Cart;
