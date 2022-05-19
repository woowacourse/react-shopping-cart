import React from 'react';

import errorImage from 'components/common/Image/error.svg';

import * as Styled from 'components/common/Image/Image.style';

function Image({ src, alt, width = '100%', height = '100%' }) {
  const handleError = (e) => {
    e.target.src = errorImage;
  };

  return (
    <Styled.ImageContainer width={width} height={height}>
      <Styled.Image src={src} alt={alt} onError={handleError} />
    </Styled.ImageContainer>
  );
}

export default Image;
