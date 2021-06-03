import React from 'react';
import PropTypes from 'prop-types';
import { Product, Image, Description, Name, Price } from './index.styles';
import { Cart } from '../../assets/svg';

const ProductItem = ({ image_url, name, price, onProductClick }) => {
  return (
    <Product onClick={onProductClick}>
      <Image src={image_url} alt={name} />
      <Description>
        <div>
          <Name>{name}</Name>
          <Price>{price} 원</Price>
        </div>
        <button type="button">
          <Cart width="30" height="30" />
        </button>
      </Description>
    </Product>
  );
};

ProductItem.propTypes = {
  image_url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default ProductItem;
