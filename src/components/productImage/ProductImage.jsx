import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export const PRODUCT_IMAGE_TYPE = Object.freeze({
  LARGE: 'LARGE',
  MEDIUM: 'MEDIUM',
  SMALL: 'SMALL',
});

const productImageStyle = {
  [PRODUCT_IMAGE_TYPE.LARGE]: {
    width: '570px',
    height: '570px',
  },
  [PRODUCT_IMAGE_TYPE.MEDIUM]: {
    width: '282px',
    height: '282px',
  },
  [PRODUCT_IMAGE_TYPE.SMALL]: {
    width: '144px',
    height: '144px',
  },
};

const Image = styled.img`
  ${({ type }) => productImageStyle[type] || productImageStyle[PRODUCT_IMAGE_TYPE.MEDIUM]}
`;

const ProductImage = ({ type, src, alt }) => <Image type={type} src={src} alt={alt} />;

ProductImage.propTypes = {
  type: PropTypes.string,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default ProductImage;
