import React from "react";

import Logo from "./Logo";
import NavButton from "./NavButton";
import { HeaderContainer, NavButtonContainer } from "./styled";

import { PATH } from "./../../constants/index";

function Header() {
  return (
    <HeaderContainer>
      <Logo />
      <NavButtonContainer>
        <NavButton to={PATH.PRODUCT_CART}>장바구니</NavButton>
        <NavButton to={PATH.ORDER_LIST}>주문목록</NavButton>
      </NavButtonContainer>
    </HeaderContainer>
  );
}

export default Header;
