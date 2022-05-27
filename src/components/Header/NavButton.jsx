import React from "react";
import { Link } from "react-router-dom";

import * as S from "./NavButton.styled";

function NavButton({ children, to, ...rest }) {
  return (
    <Link to={to}>
      <S.NavButton {...rest}>{children}</S.NavButton>
    </Link>
  );
}

export default NavButton;
