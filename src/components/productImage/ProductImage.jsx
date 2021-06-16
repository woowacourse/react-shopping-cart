import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import noProductImg from '../../assets/empty-product.png';

export const PRODUCT_IMAGE_TYPE = Object.freeze({
  LARGE: 'LARGE',
  MEDIUM: 'MEDIUM',
  SMALL: 'SMALL',
});

const productImageStyle = {
  LARGE: {
    width: '570px',
    height: '570px',
  },
  MEDIUM: {
    width: '282px',
    height: '282px',
  },
  SMALL: {
    width: '144px',
    height: '144px',
  },
};

const Image = styled.img`
  ${({ type }) => productImageStyle[type] || productImageStyle[PRODUCT_IMAGE_TYPE.MEDIUM]}
`;

const ProductImage = ({ type, src, alt, onClick }) => {
  return (
    <Image
      onClick={onClick}
      type={type}
      src={src}
      alt={alt}
      onError={({ target }) => {
        target.src = noProductImg;
        target.alt = '이미지를 불러올 수 없습니다.';
      }}
    />
  );
};

ProductImage.propTypes = {
  type: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
};

export default ProductImage;
