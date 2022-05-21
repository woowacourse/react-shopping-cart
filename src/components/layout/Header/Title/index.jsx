import React from "react";
import { Link } from "react-router-dom";

import shoppingCartIconWhite from "asset/shopping-cart-icon-white.svg";

import { IconImg, TitleContainer, PageTitle } from "./styled";

function Title() {
  return (
    <Link to="/">
      <TitleContainer>
        <IconImg src={shoppingCartIconWhite} alt="장바구니 아이콘" />
        <PageTitle>TAEPHIA SHOP</PageTitle>
      </TitleContainer>
    </Link>
  );
}

export default Title;
