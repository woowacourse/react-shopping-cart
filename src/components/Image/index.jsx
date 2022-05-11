import React from 'react';
import ImageStyled from './style';

function Image({ src, width, height }) {
  return <ImageStyled src={src} width={width} height={height} />;
}

export default Image;
