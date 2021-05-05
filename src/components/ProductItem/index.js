import React from 'react';
import PropTypes from 'prop-types';
import { Product, Image, Description, Name, Price } from './index.styles';
import noImage from '../../assets/image/noImage.jpeg';

const ProductItem = ({
  imgUrl = noImage,
  imgAlt = '상품 이미지',
  name = '상품명 없음',
  price = 0,
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
        <i className="fas fa-shopping-cart" />
      </button>
    </Description>
  </Product>
);

ProductItem.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ProductItem;
