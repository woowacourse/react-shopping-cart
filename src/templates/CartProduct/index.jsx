import React from 'react';

import Checkbox from 'components/Checkbox';
import Image from 'components/Image';
import BlackText from 'components/BlackText';
import TrashcanButton from 'containers/TrashcanButton';
import NumberInput from 'components/NumberInput';
import CartProductStyled from './style';
import MarginWrapper from 'components/MarginWrapper';
import FlexWrapper from 'components/FlexWrapper';

function CartProduct({ imgSrc, title, price }) {
  return (
    <CartProductStyled>
      <FlexWrapper justifyContent="space-between">
        <div>
          <FlexWrapper>
            <MarginWrapper marginRight="15px">
              <Checkbox />
            </MarginWrapper>
            <MarginWrapper marginRight="20px">
              <Image src={imgSrc} width="144px" height="147px" alt="상품 이미지" />
            </MarginWrapper>
            <BlackText fontSize="20px" fontWeight="400">
              {title}
            </BlackText>
          </FlexWrapper>
        </div>
        <FlexWrapper flexDirection="column" alignItems="flex-end" justifyContent="space-between">
          <TrashcanButton />
          <NumberInput />
          <BlackText fontSize="16px" fontWeight="400">
            {price.toLocaleString()}원
          </BlackText>
        </FlexWrapper>
      </FlexWrapper>
    </CartProductStyled>
  );
}

export default CartProduct;
