import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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

// TODO: util로 나중에 뺄지 고민  - Object.keys(SIZE).includes(props.size)
// TODO: Object.keys()로 할 필요가 있나? productImageStyle[type] ? productImageStyle[type] : productImageStyle['MEDIUM']하면 될 듯
const Image = styled.img`
  ${({ type }) =>
    Object.keys(PRODUCT_IMAGE_TYPE).includes(type)
      ? productImageStyle[type]
      : productImageStyle[PRODUCT_IMAGE_TYPE.MEDIUM]}
`;

// src가 들어오지 않았을 때 예외처리를 할지 고민
// defaultProps로 src가 들어오지 않았을 때 해당 상품이 없다는 이미지를 띄워주기
const ProductImage = ({ type, src, alt }) => <Image type={type} src={src} alt={alt} />;

ProductImage.propTypes = {
  type: PropTypes.string,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default ProductImage;
