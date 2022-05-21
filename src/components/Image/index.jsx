import React, { useState } from 'react';

import ImageStyled from './style';
function Image({ src, width, height, alt, onClick }) {
  const fallback = process.env.PUBLIC_URL + '/img/fallback.png';
  const [imgSrc, setImgSrc] = useState(src);
  const onError = () => setImgSrc(fallback);

  return (
    <ImageStyled
      src={imgSrc ? imgSrc : fallback}
      onError={onError}
      width={width}
      height={height}
      alt={alt}
      onClick={onClick}
    />
  );
}

export default Image;
