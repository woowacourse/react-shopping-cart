import React from "react";
import { Link } from "react-router-dom";

import * as S from "./Logo.styled";

import shoppingCartIconWhite from "../../asset/shopping-cart-icon-white.svg";
import { PATH } from "./../../constants/index";

function Logo() {
  return (
    <Link to={PATH.ROOT}>
      <S.LogoContainer>
        <S.IconImg src={shoppingCartIconWhite} alt="장바구니 아이콘" />
        <S.Title>TAEPHIA SHOP</S.Title>
      </S.LogoContainer>
    </Link>
  );
}

export default Logo;
