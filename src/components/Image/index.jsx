import React, { useState } from 'react';

import ImageStyled from './style';
function Image({ src, width, height, alt }) {
  const fallback =
    'https://www.peregrine-bryant.co.uk/img/uploadsfiles/2018/05/placeholder-test.png';
  const [imgSrc, setImgSrc] = useState(src);
  const onError = () => setImgSrc(fallback);

  return (
    <ImageStyled
      src={imgSrc ? imgSrc : fallback}
      onError={onError}
      width={width}
      height={height}
      alt={alt}
    />
  );
}

export default Image;
