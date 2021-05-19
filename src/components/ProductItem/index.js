import React from 'react';
import PropTypes from 'prop-types';
import { Product, Image, Description, Name, Price } from './index.styles';
import { FALLBACK } from '../../constants';
import { Cart } from '../../assets/svg';

const ProductItem = ({
  image_url = FALLBACK.PRODUCT.IMG_URL,
  name = FALLBACK.PRODUCT.NAME,
  price = FALLBACK.PRODUCT.PRICE,
  onCartButtonClick = () => {},
}) => {
  return (
    <Product>
      <Image src={image_url} alt={name} />
      <Description>
        <div>
          <Name>{name}</Name>
          <Price>{price} 원</Price>
        </div>
        <button type="button" onClick={onCartButtonClick}>
          <Cart width="30" height="30" />
        </button>
      </Description>
    </Product>
  );
};

ProductItem.propTypes = {
  image_url: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  onCartButtonClick: PropTypes.func,
};

export default ProductItem;
