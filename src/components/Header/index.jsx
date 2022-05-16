import React from "react";

import NavButton from "./NavButton";
import { HeaderContainer, NavButtonContainer } from "./styled";
import Title from "./Title";

function Header() {
  return (
    <HeaderContainer>
      <Title />
      <NavButtonContainer>
        <NavButton linkTo="/product-cart">장바구니</NavButton>
        <NavButton linkTo="/order-list">주문목록</NavButton>
      </NavButtonContainer>
    </HeaderContainer>
  );
}

export default Header;
