import React from "react";
import { Link } from "react-router-dom";

import { StyledIconImg, StyledLogoContainer, StyledTitle } from "./Logo.styled";

import shoppingCartIconWhite from "../../asset/shopping-cart-icon-white.svg";
import { PATH } from "./../../constants/index";

function Logo() {
  return (
    <Link to={PATH.ROOT}>
      <StyledLogoContainer>
        <StyledIconImg src={shoppingCartIconWhite} alt="장바구니 아이콘" />
        <StyledTitle>TAEPHIA SHOP</StyledTitle>
      </StyledLogoContainer>
    </Link>
  );
}

export default Logo;
