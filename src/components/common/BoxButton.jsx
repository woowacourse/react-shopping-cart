import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  width: 100%;
  padding: 16px 8px;

  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.main};
  border: none;
  background-color: ${({ theme, bgColor }) => bgColor || theme.point};
  cursor: pointer;

  :hover {
    opacity: 0.95;
  }
`;

function BoxButton({ children, ...rest }) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}

export default BoxButton;
