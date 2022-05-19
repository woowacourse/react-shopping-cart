import React from 'react';

import Title from 'components/Title';
import Text from 'components/Text';
import FlexWrapper from 'components/FlexWrapper';
import Image from 'components/Image';
import SubTitle from 'components/SubTitle';

import Checkbox from 'containers/Checkbox';
import DeleteProductButton from 'containers/DeleteProductButton';
import DeleteProductIconButton from 'containers/DeleteProductIconButton';
import ProductCountInput from 'containers/ProductCountInput';
import ProductCountUpButton from 'containers/ProductCountUpButton';
import ProductCountDownButton from 'containers/ProductCountDownButton';
import OrderProductsButton from 'containers/OrderProductsButton';

import {
  CartProductInfoStyled,
  CartProductPriceStyled,
  CartStyled,
  CartProductContentStyled,
  CartProductStyled,
  CartProductCountWrapperStyled,
  CartProductPriceWrapperStyled,
} from './style';

function Cart() {
  return (
    <CartStyled>
      <Title>장바구니</Title>
      <FlexWrapper>
        <CartProductInfoStyled>
          <CartProductContentStyled>
            <FlexWrapper justifyContent="space-between">
              <FlexWrapper>
                <Checkbox></Checkbox>
                <Text>선택해제</Text>
              </FlexWrapper>
              <DeleteProductButton></DeleteProductButton>
            </FlexWrapper>
          </CartProductContentStyled>

          <FlexWrapper>
            <SubTitle>든든배송 상품 (3개)</SubTitle>
            <CartProductStyled>
              <Checkbox />
              <Image />
              <Text>상품명</Text>
              <FlexWrapper flexFlow="column wrap" justifyContent="space-between" alignItems="end">
                <DeleteProductIconButton />
                <CartProductCountWrapperStyled>
                  <ProductCountInput />
                  <FlexWrapper flexFlow="column wrap">
                    <ProductCountUpButton />
                    <ProductCountDownButton />
                  </FlexWrapper>
                </CartProductCountWrapperStyled>
                <Text>가격</Text>
              </FlexWrapper>
            </CartProductStyled>
          </FlexWrapper>
        </CartProductInfoStyled>

        <CartProductPriceStyled>
          <CartProductPriceWrapperStyled>
            <SubTitle width="26vw">결제예상금액</SubTitle>
            <FlexWrapper justifyContent="space-between">
              <Text>결제예상금액</Text>
              <Text>20000원</Text>
            </FlexWrapper>
            <OrderProductsButton />
          </CartProductPriceWrapperStyled>
        </CartProductPriceStyled>
      </FlexWrapper>
    </CartStyled>
  );
}

export default Cart;
