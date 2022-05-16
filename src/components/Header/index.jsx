import React from "react";
import { Link } from "react-router-dom";

import NavButton from "./NavButton";
import { HeaderContainer, NavButtonWrapper } from "./styled";
import Title from "./Title";

function Header() {
  return (
    <HeaderContainer>
      <Link to="/">
        <Title />
      </Link>
      <NavButtonWrapper>
        <Link to="/product-cart">
          <NavButton>장바구니</NavButton>
        </Link>
        <Link to="/order-list">
          <NavButton>주문목록</NavButton>
        </Link>
      </NavButtonWrapper>
    </HeaderContainer>
  );
}

export default Header;
