import React from 'react';

import Text from 'components/Text';
import Image from 'components/Image';
import SubTitle from 'components/SubTitle';
import MarginWrapper from 'components/MarginWrapper';
import FlexWrapper from 'components/FlexWrapper';

import AddCartButton from 'containers/AddCartButton';

import { DetailProductStyled, DetailProductPriceStyled } from './style';

function DetailProduct({ product }) {
  return (
    <DetailProductStyled>
      <FlexWrapper flexFlow="column wrap" alignItems="center" alignContent="center">
        <Image
          src={product.product_img_src}
          width="570px"
          height="570px"
          productTitle={product.product_title}
        />
        <MarginWrapper marginBottom="20px" />
        <SubTitle width="640px" minWidth="400px" fontSize="2rem" paddingLeft="36px">
          {product.product_title}
        </SubTitle>
        <MarginWrapper marginBottom="34px" />
        <DetailProductPriceStyled>
          <Text fontSize="24px" fontWeight="400">
            금액
          </Text>
          <Text fontSize="32px" fontWeight="400">
            {product.product_price && product.product_price.toLocaleString()}원
          </Text>
        </DetailProductPriceStyled>
        <MarginWrapper marginBottom="58px" />
        <AddCartButton id={product.product_id} />
      </FlexWrapper>
    </DetailProductStyled>
  );
}

export default DetailProduct;
