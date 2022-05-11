import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Logo from "./Logo";
import NavButton from "./NavButton";

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
  background-color: ${({ theme }) => theme.point};
  box-shadow: 0 4px 10px 2px #bbb;
`;

const NavButtonWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 220px;
`;

function Header() {
  return (
    <HeaderContainer>
      <Link to="/">
        <Logo />
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
