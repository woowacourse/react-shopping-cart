import React from 'react';
import PropTypes from 'prop-types';
import BoxButton from '../common/BoxButton';
import { Detail, Image, Name, PriceWrapper, Product } from './index.styles';
import { FALLBACK, STYLE } from '../../constants';

const ProductDetail = ({
  imgUrl = FALLBACK.PRODUCT.IMG_URL,
  imgAlt = FALLBACK.PRODUCT.IMG_ALT,
  name = FALLBACK.PRODUCT.NAME,
  price = FALLBACK.PRODUCT.PRICE,
  // onClick = () => {},
}) => (
  <Product>
    <Detail>
      <Image src={imgUrl} alt={imgAlt} />
      <Name>{name}</Name>
      <PriceWrapper>
        <span>금액</span>
        <span>{price}원</span>
      </PriceWrapper>
    </Detail>
    <BoxButton buttonStyle={STYLE.BUTTON.BROWN} onClick={() => {}}>
      장바구니
    </BoxButton>
  </Product>
);

ProductDetail.propTypes = {
  imgUrl: PropTypes.string,
  imgAlt: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  // onClick: PropTypes.func,
};

export default ProductDetail;
