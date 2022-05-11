import React from 'react';

import BlackText from 'components/BlackText';
import Image from 'components/Image';
import FlexCenter from 'components/FlexWrapper/FlexCenter';
import MarginBottomWrapper from 'components/MarginBottomWrapper';

import CartButton from 'containers/CartButton';
import ProductTitle from 'containers/ProductTitle';

import ProductStyled from './style';

function Product() {
  const handleProductIamgeClick = () => {};

  return (
    <ProductStyled>
      <MarginBottomWrapper marginBottom="18px">
        <Image
          onClick={handleProductIamgeClick}
          src={'http://www.sporbiz.co.kr/news/photo/202001/406213_301373_4810.jpg'}
          width="100%"
          height="14.24vmax"
        />
      </MarginBottomWrapper>
      <FlexCenter>
        <div>
          <MarginBottomWrapper marginBottom="6px">
            <ProductTitle fontSize="1rem" fontWeight="400">
              모모
            </ProductTitle>
          </MarginBottomWrapper>
          <BlackText fontSize="20px" fontWeight="400">
            0000000원
          </BlackText>
        </div>
        <CartButton />
      </FlexCenter>
    </ProductStyled>
  );
}

export default Product;
