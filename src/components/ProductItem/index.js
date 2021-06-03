import React from 'react';
import PropTypes from 'prop-types';
import { Product, Image, Description, Name, Price } from './index.styles';
import { Cart } from '../../assets/svg';

const ProductItem = ({
  imgUrl,
  imgAlt,
  name,
  price,
  onProductClick,
  onCartButtonClick,
}) => {
  return (
    <Product onClick={onProductClick}>
      <Image src={imgUrl} alt={imgAlt} />
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
  id: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onCartButtonClick: PropTypes.func.isRequired,
};

export default ProductItem;
