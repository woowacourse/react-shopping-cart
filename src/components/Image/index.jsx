import React from 'react';

import ImageStyled from './style';

function Image({ src, width, height, alt }) {
  return <ImageStyled src={src} width={width} height={height} alt={alt} />;
}

export default Image;
