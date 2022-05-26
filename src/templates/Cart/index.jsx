import React from 'react';

import BlackText from 'components/BlackText';
import Line from 'components/Line';
import AllCheckbox from 'containers/AllCheckbox';
import DeleteProductButton from 'containers/DeleteProductButton';
import CartProduct from 'templates/CartProduct';
import ExpectedPriceBox from 'containers/ExpectedPriceBox';
import {
  CartLayoutStyled,
  MainTitleWrapper,
  LineWrapper,
  BodyWrapper,
  MenuWrapper,
  MenuTitleWrapper,
  LeftWrapper,
} from './style';
import { useSelector } from 'react-redux';

function Cart() {
  const carts = useSelector((state) => state.cart.carts);

  return (
    <CartLayoutStyled>
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

          {carts.map((product) => (
            <CartProduct
              key={product.id}
              id={product.id}
              imgSrc={product.imgSrc}
              title={product.title}
              total={product.total}
            />
          ))}
        </LeftWrapper>
        <ExpectedPriceBox />
      </BodyWrapper>
    </CartLayoutStyled>
  );
}

export default Cart;
