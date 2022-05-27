import React from 'react';
import { useSelector } from 'react-redux';

import BlackText from 'components/BlackText';
import Line from 'components/Line';
import AllCheckbox from 'containers/AllCheckbox';
import DeleteProductButton from 'containers/DeleteProductButton';
import ExpectedPriceBox from 'containers/ExpectedPriceBox';
import {
  CartListStyled,
  MainTitleWrapper,
  LineWrapper,
  BodyWrapper,
  MenuWrapper,
  MenuTitleWrapper,
  LeftWrapper,
} from './style';
import CartProductList from 'containers/CartProductList';

function Cart() {
  const carts = useSelector((state) => state.cart.carts);

  return (
    <CartListStyled>
      <MainTitleWrapper>장바구니</MainTitleWrapper>
      <LineWrapper>
        <Line width="1320px" height="3px" color="#333" />
      </LineWrapper>
      <BodyWrapper>
        <LeftWrapper>
          <div>
            <MenuWrapper>
              <AllCheckbox />
              <DeleteProductButton />
            </MenuWrapper>
            <MenuTitleWrapper>
              <BlackText>든든배송 상품({carts.length})</BlackText>
            </MenuTitleWrapper>
          </div>
          <CartProductList />
        </LeftWrapper>
        <ExpectedPriceBox />
      </BodyWrapper>
    </CartListStyled>
  );
}

export default Cart;
