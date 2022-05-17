import React from "react";

import { ROUTES } from "../../constants";

import NavButton from "./NavButton";
import Title from "./Title";
import { HeaderContainer, NavButtonContainer } from "./styled";

function Header() {
  return (
    <HeaderContainer>
      <Title />
      <NavButtonContainer>
        <NavButton linkTo={ROUTES.PRODUCT_CART}>장바구니</NavButton>
        <NavButton linkTo={ROUTES.PRODUCT_ORDER_LIST}>주문목록</NavButton>
      </NavButtonContainer>
    </HeaderContainer>
  );
}

export default Header;
