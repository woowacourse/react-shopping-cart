import React from 'react';

import ImageStyled from './style';

function Image({ onClick, src, width, height }) {
  return <ImageStyled onClick={onClick} src={src} width={width} height={height} />;
}

export default Image;
