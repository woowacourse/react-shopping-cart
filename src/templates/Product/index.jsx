import React from 'react';
import { Link } from 'react-router-dom';

import BlackText from 'components/BlackText';
import Image from 'components/Image';
import FlexWrapper from 'components/FlexWrapper';
import MarginBottomWrapper from 'components/MarginBottomWrapper';

import CartButton from 'containers/CartButton';
import ProductTitle from 'containers/ProductTitle';

import ProductStyled from './style';

function Product({ imgSrc, title, price }) {
  const handleProductClick = () => {
    console.log('hey');
  };

  return (
    <ProductStyled>
      <MarginBottomWrapper marginBottom="18px">
        <Link onClick={handleProductClick} to="">
          <Image src={imgSrc} width="100%" height="14.24vmax" alt="상품 이미지" />
        </Link>
      </MarginBottomWrapper>
      <FlexWrapper alignItems="center" justifyContent="center">
        <div>
          <MarginBottomWrapper marginBottom="6px">
            <Link className="link-text" onClick={handleProductClick} to="">
              <ProductTitle>{title}</ProductTitle>
            </Link>
          </MarginBottomWrapper>
          <BlackText fontSize="1.25rem" fontWeight="400">
            {price.toLocaleString()}원
          </BlackText>
        </div>
        <CartButton />
      </FlexWrapper>
    </ProductStyled>
  );
}

export default Product;
