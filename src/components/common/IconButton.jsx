import React from "react";
import styled from "styled-components";

function IconButton({ title, onClick, iconImgSrc, iconImgAlt, width }) {
  return (
    <StyledButton title={title} onClick={onClick} width={width}>
      <img src={iconImgSrc} alt={iconImgAlt} />
    </StyledButton>
  );
}

const StyledButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;

  img {
    width: ${({ width }) => width};
    :hover {
      transform: scale(1.05);
    }
  }
`;

export default IconButton;
