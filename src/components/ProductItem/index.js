import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../../utils';
import { FALLBACK } from '../../constants';
import { Cart } from '../../assets/svg';
import { Product, Image, Description, Name, Price } from './index.styles';
import { Link } from 'react-router-dom';

const ProductItem = ({
  product_id,
  image_url = FALLBACK.PRODUCT.IMG_URL,
  name = FALLBACK.PRODUCT.NAME,
  price = FALLBACK.PRODUCT.PRICE,
  onCartButtonClick = () => {},
  onImageError = () => {},
}) => {
  return (
    <Product>
      <Link to={`/product/${product_id}`}>
        <Image src={image_url} alt={name} onError={onImageError} />
      </Link>
      <Description>
        <div>
          <Name>{name}</Name>
          <Price>{formatPrice(price)} 원</Price>
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
