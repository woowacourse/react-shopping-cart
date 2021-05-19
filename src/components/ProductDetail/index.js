import React from 'react';
import PropTypes from 'prop-types';
import Button from '../common/Button';
import { Detail, Image, Name, PriceWrapper, Product } from './index.styles';

const BUTTON_COLOR = 'var(--color-brown)';

const ProductDetail = ({ product, onImageError, handleCartButtonClick }) => {
  // const handleSave = () => match.history.push('/products');
  // TODO: 새로고침시 오류

  const { name, price, image_url } = product;

  return (
    <Product>
      <Detail>
        <Image src={image_url} alt={name} onError={onImageError} />
        <Name>{name}</Name>
        <PriceWrapper>
          <span>금액</span>
          <span>{price}원</span>
        </PriceWrapper>
      </Detail>
      <Button
        backgroundColor={BUTTON_COLOR}
        onClick={() => handleCartButtonClick({ ...product })}
      >
        장바구니
      </Button>
    </Product>
  );
};

ProductDetail.propTypes = {
  image_url: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  // onClick: PropTypes.func,
};

export default ProductDetail;
