import React from "react";
import shoppingCartIconWhite from "../../../asset/shopping-cart-icon-white.svg";
import { IconImg, LogoContainer, Title } from "./styled";

function Logo() {
  return (
    <LogoContainer>
      <IconImg src={shoppingCartIconWhite} alt="장바구니 아이콘" />
      <Title>TAEPHIA SHOP</Title>
    </LogoContainer>
  );
}

export default Logo;
