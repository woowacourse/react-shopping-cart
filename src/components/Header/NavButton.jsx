import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function NavButton({ children, to, ...rest }) {
  return (
    <Link to={to}>
      <StyledButton {...rest}>{children}</StyledButton>
    </Link>
  );
}

const StyledButton = styled.button`
  padding: 0 4px 4px;

  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.color.white};
  font-size: 1.5rem;
  text-align: center;
  cursor: pointer;

  :hover {
    border-bottom: 2px solid ${({ theme }) => theme.color.white};
  }
`;

export default NavButton;
