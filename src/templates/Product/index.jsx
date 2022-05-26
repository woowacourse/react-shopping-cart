import React from 'react';
import { Link } from 'react-router-dom';

import Text from 'components/Text';
import Image from 'components/Image';
import MarginWrapper from 'components/MarginWrapper';
import FlexWrapper from 'components/FlexWrapper';

import AddCartIconButton from 'containers/AddCartIconButton';
import ProductTitle from 'containers/ProductTitle';

import ProductStyled from './style';

function Product({ product_id, product_img_src, product_title, product_price }) {
  return (
    <ProductStyled>
      <Link to={`/product/${product_id}`}>
        <MarginWrapper marginBottom="18px">
          <Image
            src={product_img_src}
            id={product_id}
            width="100%"
            height="14.24vmax"
            cursor="pointer"
            productTitle={product_title}
          />
        </MarginWrapper>
      </Link>
      <FlexWrapper flexFlow="row nowrap" justifyContent="space-between" alignItems="center">
        <Link to={`/product/${product_id}`}>
          <div>
            <MarginWrapper marginBottom="6px">
              <ProductTitle id={product_id}>{product_title}</ProductTitle>
            </MarginWrapper>
            <Text
              id={product_id}
              color="#333333"
              fontSize="1.25rem"
              fontWeight="400"
              cursor="pointer"
            >
              {product_price.toLocaleString()}원
            </Text>
          </div>
        </Link>
        <AddCartIconButton id={product_id} />
      </FlexWrapper>
    </ProductStyled>
  );
}

export default Product;
