import React from "react";

import Logo from "./Logo";
import NavButton from "./NavButton";
import { HeaderContainer, NavButtonContainer } from "./styled";

function Header() {
  return (
    <HeaderContainer>
      <Logo />
      <NavButtonContainer>
        <NavButton to="/product-cart">장바구니</NavButton>
        <NavButton to="/order-list">주문목록</NavButton>
      </NavButtonContainer>
    </HeaderContainer>
  );
}

export default Header;
