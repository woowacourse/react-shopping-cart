import React from "react";
import styled from "styled-components";

import Logo from "./Logo";
import NavButton from "./NavButton";

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

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 3;

  width: 100vw;
  height: 80px;
  padding: 0 20px;
  background-color: ${({ theme }) => theme.color.primary};
  box-shadow: 0 4px 10px 2px #bbb;
`;

const NavButtonContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 220px;
`;

export default Header;
