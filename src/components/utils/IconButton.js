import React from 'react';
import styled from 'styled-components';

const StyledCartButton = styled.button`
  max-width: 43px;
  height: 43px;
  border: none;
  background-color: inherit;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

function IconButton(props) {
  const { src, alt } = props;

  return (
    <StyledCartButton>
      <img src={src} alt={alt} />
    </StyledCartButton>
  );
}

export default IconButton;
