import React from 'react';

import Text from 'components/Text';
import Image from 'components/Image';
import MarginWrapper from 'components/MarginWrapper';
import FlexWrapper from 'components/FlexWrapper';

import AddCartIconButton from 'containers/AddCartIconButton';
import ProductTitle from 'containers/ProductTitle';

import ProductStyled from './style';

function Product({ product_id, product_img_src, product_title, product_price }) {
  const handleProductIamgeClick = (event) => {
    console.log('상품 상세페이지로', event.target.id);
  };

  return (
    <ProductStyled>
      <MarginWrapper marginBottom="18px">
        <Image
          onClick={handleProductIamgeClick}
          src={product_img_src}
          id={product_id}
          width="100%"
          height="14.24vmax"
          cursor="pointer"
        />
      </MarginWrapper>
      <FlexWrapper flexFlow="row nowrap" justifyContent="space-between" alignItems="center">
        <div>
          <MarginWrapper marginBottom="6px">
            <ProductTitle onClick={handleProductIamgeClick} id={product_id}>
              {product_title}
            </ProductTitle>
          </MarginWrapper>
          <Text
            onClick={handleProductIamgeClick}
            id={product_id}
            color="#333333"
            fontSize="1.25rem"
            fontWeight="400"
            cursor="pointer"
          >
            {product_price.toLocaleString()}원
          </Text>
        </div>
        <AddCartIconButton id={product_id} />
      </FlexWrapper>
    </ProductStyled>
  );
}

export default Product;
