import React from 'react';
import PropTypes from 'prop-types';
import Button from '../common/Button';
import { Detail, Image, Name, PriceWrapper, Product } from './index.styles';
import { FALLBACK } from '../../constants';

const BUTTON_COLOR = 'var(--color-brown)';

const ProductDetail = ({
  image_url = FALLBACK.PRODUCT.IMG_URL,
  name = FALLBACK.PRODUCT.NAME,
  price = FALLBACK.PRODUCT.PRICE,
  // onClick = () => {},
}) => (
  <Product>
    <Detail>
      <Image src={image_url} alt={name} />
      <Name>{name}</Name>
      <PriceWrapper>
        <span>금액</span>
        <span>{price}원</span>
      </PriceWrapper>
    </Detail>
    <Button backgroundColor={BUTTON_COLOR} onClick={() => {}}>
      장바구니
    </Button>
  </Product>
);

ProductDetail.propTypes = {
  image_url: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  // onClick: PropTypes.func,
};

export default ProductDetail;
