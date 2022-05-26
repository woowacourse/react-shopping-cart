import React from "react";

import Logo from "./Logo";
import NavButton from "./NavButton";
import * as S from "./index.styled";

import { PATH } from "./../../constants/index";

function Header() {
  return (
    <S.HeaderContainer>
      <Logo />
      <S.NavButtonContainer>
        <NavButton to={PATH.CART}>장바구니</NavButton>
        <NavButton to={PATH.ORDER_LIST}>주문목록</NavButton>
      </S.NavButtonContainer>
    </S.HeaderContainer>
  );
}

export default Header;
