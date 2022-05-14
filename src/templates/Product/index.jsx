import React from 'react';

import BlackText from 'components/BlackText';
import Image from 'components/Image';
import FlexSpaceBetweenCenter from 'components/FlexWrapper/FlexSpaceBetweenCenter';
import MarginWrapper from 'components/MarginWrapper';

import CartButton from 'containers/CartButton';
import ProductTitle from 'containers/ProductTitle';

import ProductStyled from './style';

function Product({ imgSrc, title, price }) {
  const handleProductIamgeClick = () => {};

  return (
    <ProductStyled>
      <MarginWrapper marginBottom="18px">
        <Image onClick={handleProductIamgeClick} src={imgSrc} width="100%" height="14.24vmax" />
      </MarginWrapper>
      <FlexSpaceBetweenCenter>
        <div>
          <MarginWrapper marginBottom="6px">
            <ProductTitle>{title}</ProductTitle>
          </MarginWrapper>
          <BlackText fontSize="1.25rem" fontWeight="400">
            {price.toLocaleString()}원
          </BlackText>
        </div>
        <CartButton />
      </FlexSpaceBetweenCenter>
    </ProductStyled>
  );
}

export default Product;
