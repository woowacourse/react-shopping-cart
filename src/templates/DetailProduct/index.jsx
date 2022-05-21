import React from 'react';

import Text from 'components/Text';
import Image from 'components/Image';
import SubTitle from 'components/SubTitle';
import MarginWrapper from 'components/MarginWrapper';

import AddCartButton from 'containers/AddCartButton';

import { DetailProductStyled, DetailProductPriceStyled } from './style';
import FlexWrapper from 'components/FlexWrapper';

function DetailProduct(product) {
  return (
    <DetailProductStyled>
      <FlexWrapper flexFlow="column wrap" alignItems="center">
        <Image src={product.product_img_src} width="570px" height="570px" />
        <MarginWrapper marginBottom="20px" />
        <SubTitle width="640px" fontSize="2rem" paddingLeft="36px">
          {product.product_title}
        </SubTitle>
        <MarginWrapper marginBottom="34px" />
        <DetailProductPriceStyled>
          <Text fontSize="24px" fontWeight="400">
            금액
          </Text>
          <Text fontSize="32px" fontWeight="400">
            {product.product_price.toLocaleString()}
          </Text>
        </DetailProductPriceStyled>
        <MarginWrapper marginBottom="58px" />
        <AddCartButton />
      </FlexWrapper>
    </DetailProductStyled>
  );
}

export default DetailProduct;
