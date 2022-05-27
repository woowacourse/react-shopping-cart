import React from "react";
import styled from "styled-components";

const Button = styled.button`
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

function IconButton({ src, alt, onClick, width }) {
  return (
    <Button onClick={onClick} width={width}>
      <img src={src} alt={alt} />
    </Button>
  );
}

export default IconButton;
