import React from 'react';
import { FALLBACK } from '../../../constants';
import { StyledImage } from './index.styles';

const Image = ({ src, alt }) => {
  const onImageError = e => (e.target.src = FALLBACK.PRODUCT.IMG_URL);

  return <StyledImage src={src} alt={alt} onError={onImageError} />;
};

export default Image;
