import React from "react";
import styled from "styled-components";

const BoxButton = styled.button`
  width: 100%;
  padding: 16px 8px;

  font-size: ${({ theme: { fontSize } }) => fontSize.default};
  font-weight: 700;
  color: ${({ theme: { color } }) => color.main};
  border: none;
  background-color: ${({ theme: { color }, bgColor }) =>
    bgColor || color.point};
  cursor: pointer;

  :hover {
    opacity: 0.95;
  }
`;

function DefaultButton({ children, ...rest }) {
  return <BoxButton {...rest}>{children}</BoxButton>;
}

export default DefaultButton;
