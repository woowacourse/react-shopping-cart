import React from 'react';
import styled from 'styled-components';

const StyledProductImageWrapper = styled.div`
  width: 282px;
  height: 282px;
  overflow: hidden;
`;

const StyledProductImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
`;

const StyledImageBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 282px;
  height: 282px;
  opacity: 40%;
  background-color: rgba(0, 0, 0, 0.1);
`;

function ImageWrapper(props) {
  const { src, alt, isBackgroundImageNeeded, className } = props;

  return (
    <StyledProductImageWrapper>
      <StyledProductImage src={src} alt={alt} className={className} />
      {isBackgroundImageNeeded && <StyledImageBackground />}
    </StyledProductImageWrapper>
  );
}

export default ImageWrapper;
