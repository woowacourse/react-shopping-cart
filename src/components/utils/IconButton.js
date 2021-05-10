import React from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled.button`
  border: none;
  background-color: inherit;
  cursor: pointer;
  width: ${(props) => props.width};
  height: ${(props) => props.height};

  &:focus {
    outline: none;
  }

  && {
    ${(props) => props.css}
  }
`;

function IconButton(props) {
  const { type = 'button', src, alt, width, height, css } = props;

  return (
    <ButtonWrapper type={type} width={width} height={height} css={css}>
      <img src={src} alt={alt} />
    </ButtonWrapper>
  );
}

export default IconButton;
