import React from "react";
import { StyledNavButton } from "./styled";

function NavButton({ children, ...rest }) {
  return <StyledNavButton {...rest}>{children}</StyledNavButton>;
}

export default NavButton;
