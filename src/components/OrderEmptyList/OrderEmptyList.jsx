import React from "react";
import Button from "../@shared/Button/Button";
import PATH from "../../constants/path";
import * as S from "./OrderEmptyList.styled";

import orderNow from "../../assets/order_now.jpg";

const OrderEmptyList = () => (
  <S.OrderEmptyList>
    <S.Image src={orderNow} alt="presentation" />
    <S.Text>주문하러 가볼까요?</S.Text>
    <S.Link to={PATH.CART} alt="장바구니로 가기">
      <Button>장바구니로 가기</Button>
    </S.Link>
  </S.OrderEmptyList>
);

export default OrderEmptyList;
