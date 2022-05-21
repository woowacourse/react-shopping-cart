import React from 'react';

import Title from 'components/Title';
import Text from 'components/Text';
import FlexWrapper from 'components/FlexWrapper';
import Image from 'components/Image';
import SubTitle from 'components/SubTitle';

import CartProductCheckbox from 'containers/CartProductCheckbox';
import DeleteProductButton from 'containers/DeleteProductButton';
import DeleteProductIconButton from 'containers/DeleteProductIconButton';
import ProductCountInput from 'containers/ProductCountInput';
import ProductCountUpButton from 'containers/ProductCountUpButton';
import ProductCountDownButton from 'containers/ProductCountDownButton';
import OrderProductsButton from 'containers/OrderProductsButton';
import CartTotalPrice from 'containers/CartTotalPrice';
import TotalCartProductCheckbox from 'containers/TotalCartProductCheckbox';

import {
  CartProductInfoStyled,
  CartProductPriceStyled,
  CartStyled,
  CartProductContentStyled,
  CartProductStyled,
  CartProductCountWrapperStyled,
  CartProductPriceWrapperStyled,
} from './style';

function Cart({ cartProducts }) {
  return (
    <CartStyled>
      <Title>장바구니</Title>
      <FlexWrapper>
        <CartProductInfoStyled>
          <CartProductContentStyled>
            <FlexWrapper justifyContent="space-between">
              <FlexWrapper>
                <TotalCartProductCheckbox />
                <Text>선택해제</Text>
              </FlexWrapper>
              <DeleteProductButton />
            </FlexWrapper>
          </CartProductContentStyled>

          <FlexWrapper>
            <SubTitle>{`든든배송 상품 (${cartProducts.length}개)`}</SubTitle>
            {cartProducts.map((product) => (
              <CartProductStyled key={product.product_id}>
                <CartProductCheckbox id={product.product_id} checked={product.cart_check} />
                <Image
                  src={product.product_img_src}
                  id={product.product_id}
                  width="144px"
                  height="144px"
                  cursor="pointer"
                />
                <Text>{product.product_title}</Text>
                <FlexWrapper flexFlow="column wrap" justifyContent="space-between" alignItems="end">
                  <DeleteProductIconButton id={product.product_id} />
                  <CartProductCountWrapperStyled>
                    <ProductCountInput
                      id={product.product_id}
                      productCount={product.cart_product_count}
                    />
                    <FlexWrapper flexFlow="column wrap">
                      <ProductCountUpButton id={product.product_id} />
                      <ProductCountDownButton id={product.product_id} />
                    </FlexWrapper>
                  </CartProductCountWrapperStyled>
                  <Text>
                    {(product.cart_product_count * product.product_price).toLocaleString()}원
                  </Text>
                </FlexWrapper>
              </CartProductStyled>
            ))}
          </FlexWrapper>
        </CartProductInfoStyled>

        <CartProductPriceStyled>
          <CartProductPriceWrapperStyled>
            <SubTitle width="26vw">결제예상금액</SubTitle>
            <FlexWrapper justifyContent="space-between">
              <Text>결제예상금액</Text>
              <CartTotalPrice cartProducts={cartProducts} />
            </FlexWrapper>
            <OrderProductsButton />
          </CartProductPriceWrapperStyled>
        </CartProductPriceStyled>
      </FlexWrapper>
    </CartStyled>
  );
}

export default Cart;
