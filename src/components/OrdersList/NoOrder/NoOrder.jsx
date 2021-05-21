import React from "react";
import Button from "../../@shared/Button/Button";
import * as S from "./NoOrder.styled";

import orderNow from "./order_now.jpg";

const NoOrder = () => (
  <S.NoOrder>
    <S.Image src={orderNow} alt="presentation" />
    <S.Text>주문하러 가볼까요?</S.Text>
    <S.Link to="/cart" alt="장바구니로 가기">
      <Button>장바구니로 가기</Button>
    </S.Link>
  </S.NoOrder>
);

export default NoOrder;
