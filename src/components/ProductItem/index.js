import React from 'react';
import PropTypes from 'prop-types';
import { Product, Image, Description, Name, Price } from './index.styles';
import { FALLBACK } from '../../constants';
import { Cart } from '../../assets/svg';

const ProductItem = ({
  imgUrl = FALLBACK.PRODUCT.IMG_URL,
  imgAlt = FALLBACK.PRODUCT.IMG_ALT,
  name = FALLBACK.PRODUCT.NAME,
  price = FALLBACK.PRODUCT.PRICE,
  onClick = () => {},
}) => (
  <Product>
    <Image src={imgUrl} alt={imgAlt} />
    <Description>
      <div>
        <Name>{name}</Name>
        <Price>{price} 원</Price>
      </div>
      <button type="button" onClick={onClick}>
        <Cart width="30" height="30" />
      </button>
    </Description>
  </Product>
);

ProductItem.propTypes = {
  imgUrl: PropTypes.string,
  imgAlt: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  onClick: PropTypes.func,
};

export default ProductItem;
