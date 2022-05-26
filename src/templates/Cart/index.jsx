import React from 'react';
import { Link } from 'react-router-dom';

import Title from 'components/Title';
import Text from 'components/Text';
import Button from 'components/Button';
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
import TotalCartProductText from 'containers/TotalCartProductText';

import {
  CartProductInfoStyled,
  CartProductPriceStyled,
  CartStyled,
  CartProductContentStyled,
  CartProductStyled,
  CartProductCountWrapperStyled,
  CartProductPriceWrapperStyled,
} from './style';
import MarginWrapper from 'components/MarginWrapper';

function Cart({ cartProducts }) {
  if (cartProducts.length === 0) {
    return (
      <CartStyled>
        <Title>장바구니</Title>
        <MarginWrapper marginTop="50px" />
        <FlexWrapper flexFlow="column wrap" alignItems="center" alignContent="center">
          <Text fontSize="1.5rem">장바구니에 담은 상품이 없습니다.</Text>
          <MarginWrapper marginTop="30px" />
          <Link to="/">
            <Button width="34vw" height="70px" border="1px solid #000000">
              CONTINUE SHOPPING
            </Button>
          </Link>
        </FlexWrapper>
      </CartStyled>
    );
  }

  return (
    <CartStyled>
      <Title>장바구니</Title>
      <FlexWrapper>
        <CartProductInfoStyled>
          <CartProductContentStyled>
            <FlexWrapper justifyContent="space-between">
              <FlexWrapper>
                <TotalCartProductCheckbox />
                <TotalCartProductText />
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
                  productTitle={product.product_title}
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
            <SubTitle width="26vw" minWidth="300px">
              결제예상금액
            </SubTitle>
            <FlexWrapper justifyContent="space-between">
              <Text>결제예상금액</Text>
              <CartTotalPrice cartProducts={cartProducts} />
            </FlexWrapper>
            <OrderProductsButton cartProducts={cartProducts} />
          </CartProductPriceWrapperStyled>
        </CartProductPriceStyled>
      </FlexWrapper>
    </CartStyled>
  );
}

export default Cart;
