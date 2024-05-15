import React from "react";
import { useRecoilValue } from "recoil";
import { cartPriceState } from "../../recoil/selectors/selectors";
import { Wrapper, PriceKind, PriceNumber, Price } from "./style";

const CartPrice = () => {
  const { orderPrice, deliveryFee, totalPrice } =
    useRecoilValue(cartPriceState);

  return (
    <Wrapper>
      <Price>
        <PriceKind>주문 금액</PriceKind>
        <PriceNumber>{orderPrice.toLocaleString("ko-KR")}원</PriceNumber>
      </Price>
      <Price>
        <PriceKind>배송비</PriceKind>
        <PriceNumber>{deliveryFee.toLocaleString("ko-KR")}원</PriceNumber>
      </Price>
      <Price>
        <PriceKind>총 결제 금액</PriceKind>
        <PriceNumber>{totalPrice.toLocaleString("ko-KR")}원</PriceNumber>
      </Price>
    </Wrapper>
  );
};

export default CartPrice;
