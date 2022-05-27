import React from "react";
import styled from "styled-components";

const BoxButton = styled.button`
  width: 100%;
  padding: 16px 8px;

  ${({ theme: { color, fontSize }, bgColor }) => `
    font-size: ${fontSize.medium};
    font-weight: 700;
    color: ${color.main};
    border: none;
    background-color: ${bgColor || color.point};
  `}

  cursor: pointer;

  :hover {
    opacity: 0.95;
  }
`;

function DefaultButton({ children, ...rest }) {
  return <BoxButton {...rest}>{children}</BoxButton>;
}

export default DefaultButton;
