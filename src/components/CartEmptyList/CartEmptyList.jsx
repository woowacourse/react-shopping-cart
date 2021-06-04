import React from "react";
import Button from "../@shared/Button/Button";
import * as S from "./CartEmptyList.styled";

import noCartItem from "../../assets/no_cart_item.png";
import PATH from "../../constants/path";

const CartEmptyList = () => (
  <S.CartEmptyList>
    <S.ImageWrapper>
      <S.Image src={noCartItem} alt="presentation" />
    </S.ImageWrapper>
    <S.Text>상품을 담으러 가볼까요?</S.Text>
    <S.Link to={PATH.HOME} alt="상품목록으로 가기">
      <Button>상품목록으로 가기</Button>
    </S.Link>
  </S.CartEmptyList>
);

export default CartEmptyList;
