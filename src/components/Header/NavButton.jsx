import React from "react";
import { Link } from "react-router-dom";

import { StyledNavButton } from "./NavButton.styled";

function NavButton({ children, to, ...rest }) {
  return (
    <Link to={to}>
      <StyledNavButton {...rest}>{children}</StyledNavButton>
    </Link>
  );
}

export default NavButton;
