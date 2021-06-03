import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../../utils';
import { FALLBACK } from '../../constants';
import { Cart } from '../../assets/svg';
import { Product, Description, Name, Price, CartButton } from './index.styles';
import { Link } from 'react-router-dom';
import Image from '../@common/Image';

const ProductItem = ({
  product_id,
  image_url = FALLBACK.PRODUCT.IMG_URL,
  name = FALLBACK.PRODUCT.NAME,
  price = FALLBACK.PRODUCT.PRICE,
  onCartButtonClick = () => {},
}) => {
  return (
    <Product>
      <Link to={`/product/${product_id}`}>
        <Image src={image_url} alt={name} />
      </Link>
      <Description>
        <div>
          <Name>{name}</Name>
          <Price>{formatPrice(price)} 원</Price>
        </div>
        <CartButton type="button" onClick={onCartButtonClick}>
          <Cart width="30" height="30" />
        </CartButton>
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
