import React from 'react';

import ImageStyled from './style';

function Image({ onClick, src, id, width, height, cursor = 'inherit' }) {
  return (
    <ImageStyled
      onClick={onClick}
      src={src}
      id={id}
      width={width}
      height={height}
      cursor={cursor}
    />
  );
}

export default Image;
