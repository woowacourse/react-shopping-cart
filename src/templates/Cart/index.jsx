import React from 'react';

import BlackText from 'components/BlackText';
import Line from 'components/Line';
import AllCheckbox from 'containers/AllCheckbox';
import DeleteProductButton from 'containers/DeleteProductButton';
import CartProduct from 'templates/CartProduct';
import ExpectedPriceBox from 'containers/ExpectedPriceBox';
import FlexWrapper from 'components/FlexWrapper';
import { CartStyled, CartProductStyled } from './style';
import MarginWrapper from 'components/MarginWrapper';
import { useSelector } from 'react-redux';

function Cart() {
  const carts = useSelector((state) => state.cart.carts);

  return (
    <CartStyled>
      <BlackText fontSize="32px" fontWeight="700" textAlign="center">
        <MarginWrapper marginTop="60px" marginBottom="30px">
          장바구니
        </MarginWrapper>
      </BlackText>
      <MarginWrapper marginBottom="50px">
        <Line width="1320px" height="3px" color="#333" />
      </MarginWrapper>
      <FlexWrapper justifyContent="space-between">
        <CartProductStyled>
          <MarginWrapper marginBottom="50px">
            <FlexWrapper justifyContent="space-between">
              <AllCheckbox />
              <DeleteProductButton />
            </FlexWrapper>
          </MarginWrapper>
          <MarginWrapper marginBottom="15px">
            <BlackText>든든배송 상품({carts.length})</BlackText>
          </MarginWrapper>
          {carts.map((product) => (
            <CartProduct
              key={product.id}
              imgSrc={product.imgSrc}
              title={product.title}
              price={product.price}
            />
          ))}
        </CartProductStyled>
        <ExpectedPriceBox />
      </FlexWrapper>
    </CartStyled>
  );
}

export default Cart;
