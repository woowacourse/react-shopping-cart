import React from 'react';

import BlackText from 'components/BlackText';
import Line from 'components/Line';
import AllCheckbox from 'containers/AllCheckbox';
import DeleteProductButton from 'containers/DeleteProductButton';
import CartProduct from 'templates/CartProduct';
import ExpectedPriceBox from 'containers/ExpectedPriceBox';
import FlexWrapper from 'components/FlexWrapper';
import CartStyled from './style';
import MarginWrapper from 'components/MarginWrapper';

function Cart() {
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
        <div>
          <MarginWrapper marginBottom="50px">
            <FlexWrapper justifyContent="space-between">
              <AllCheckbox />
              <DeleteProductButton />
            </FlexWrapper>
          </MarginWrapper>
          <MarginWrapper marginBottom="15px">
            <BlackText>든든배송 상품(3개)</BlackText>
          </MarginWrapper>
          <CartProduct
            imgSrc="https://t1.kakaocdn.net/friends/prod/product/20220303141620326_8809814923602_AW_00.jpg"
            title="노티드X라이언 풍선든 브라운슈가라이언"
            price="35000"
          />
          <CartProduct
            imgSrc="https://t1.kakaocdn.net/friends/prod/product/20220303141620326_8809814923602_AW_00.jpg"
            title="노티드X라이언 풍선든 브라운슈가라이언"
            price="35000"
          />
          <CartProduct
            imgSrc="https://t1.kakaocdn.net/friends/prod/product/20220303141620326_8809814923602_AW_00.jpg"
            title="노티드X라이언 풍선든 브라운슈가라이언"
            price="35000"
          />
        </div>
        <ExpectedPriceBox />
      </FlexWrapper>
    </CartStyled>
  );
}

export default Cart;
