import React from 'react';
import styled from 'styled-components';

export const SIZE = Object.freeze({
  LARGE: 'LARGE',
  MEDIUM: 'MEDIUM',
  SMALL: 'SMALL',
});

const productImageSize = {
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
const StyledProductImg = styled.img`
  ${(props) => (Object.keys(SIZE).includes(props.size) ? productImageSize[props.size] : productImageSize['MEDIUM'])}
`;

// src가 들어오지 않았을 때 예외처리를 할지 고민
const ProductImage = ({ size, src, alt }) => <StyledProductImg size={size} src={src} alt={alt} />;

export default ProductImage;
