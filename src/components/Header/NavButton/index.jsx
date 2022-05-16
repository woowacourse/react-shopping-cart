import React from "react";
import { Link } from "react-router-dom";

import { UnderlinedButton } from "./styled";

function NavButton({ children, linkTo, ...rest }) {
  return (
    <Link to={linkTo}>
      <UnderlinedButton {...rest}>{children}</UnderlinedButton>
    </Link>
  );
}

export default NavButton;
