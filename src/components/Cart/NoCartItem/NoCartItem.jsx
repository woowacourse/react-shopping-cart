import React from "react";
import Button from "../../@shared/Button/Button";
import * as S from "./NoCartItem.styled";

import noCartItem from "./no_cart_item.png";

const NoCartItem = () => (
  <S.NoCartItem>
    <S.Image src={noCartItem} alt="presentation" />
    <S.Text>상품을 담으러 가볼까요?</S.Text>
    <S.Link to="/" alt="상품목록으로 가기">
      <Button>상품목록으로 가기</Button>
    </S.Link>
  </S.NoCartItem>
);

export default NoCartItem;
