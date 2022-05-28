import React from 'react';

import ProductCheckbox from 'containers/ProductCheckbox';
import Image from 'components/Image';
import BlackText from 'components/BlackText';
import TrashcanButton from 'containers/TrashcanButton';
import { CartProductStyled, LeftWrapper, RightWrapper, ImageWrapper } from './style';
import QuantityInput from 'containers/QuantityInput';

function CartProduct({ id, imgSrc, title, total }) {
  return (
    <CartProductStyled>
      <div>
        <LeftWrapper>
          <ProductCheckbox productId={id} />
          <ImageWrapper marginRight="20px">
            <Image src={imgSrc} width="144px" height="147px" alt="상품 이미지" />
          </ImageWrapper>
          <BlackText fontSize="20px" fontWeight="400">
            {title}
          </BlackText>
        </LeftWrapper>
      </div>
      <RightWrapper flexDirection="column" alignItems="flex-end" justifyContent="space-between">
        <TrashcanButton productId={id} />
        <QuantityInput productId={id} />
        <BlackText fontSize="16px" fontWeight="400">
          {total.toLocaleString()}원
        </BlackText>
      </RightWrapper>
    </CartProductStyled>
  );
}

export default CartProduct;
