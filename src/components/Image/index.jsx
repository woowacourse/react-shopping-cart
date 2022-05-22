import React from 'react';

import ImageStyled from './style';

function Image({ onClick, src, id, width, height, cursor = 'inherit', productTitle }) {
  return (
    <ImageStyled
      onClick={onClick}
      src={src}
      id={id}
      width={width}
      height={height}
      cursor={cursor}
      alt={productTitle}
    />
  );
}

export default Image;
