import React from "react";
import shoppingCartIconWhite from "../../../asset/shopping-cart-icon-white.svg";
import { IconImg, TitleContainer, PageTitle } from "./styled";

function Title() {
  return (
    <TitleContainer>
      <IconImg src={shoppingCartIconWhite} alt="장바구니 아이콘" />
      <PageTitle>TAEPHIA SHOP</PageTitle>
    </TitleContainer>
  );
}

export default Title;
