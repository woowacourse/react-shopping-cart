import React from "react";

import Logo from "./Logo";
import NavButton from "./NavButton";
import {
  StyledHeaderContainer,
  StyledNavButtonContainer,
} from "./index.styled";

import { PATH } from "./../../constants/index";

function Header() {
  return (
    <StyledHeaderContainer>
      <Logo />
      <StyledNavButtonContainer>
        <NavButton to={PATH.CART}>장바구니</NavButton>
        <NavButton to={PATH.ORDER_LIST}>주문목록</NavButton>
      </StyledNavButtonContainer>
    </StyledHeaderContainer>
  );
}

export default Header;
