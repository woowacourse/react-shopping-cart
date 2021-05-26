import React from 'react';
import { FALLBACK } from '../../../constants';

const Image = ({ src, alt }) => {
  const onImageError = e => (e.target.src = FALLBACK.PRODUCT.IMG_URL);
  return <image src={src} alt={alt} onError={onImageError} />;
};

export default Image;
