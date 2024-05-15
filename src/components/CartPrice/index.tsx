import React from "react";
import { Wrapper, PriceKind, PriceNumber, Price } from "./style";

const CartPrice = () => {
  return (
    <Wrapper>
      <Price>
        <PriceKind>주문 금액</PriceKind>
        <PriceNumber>120,000원</PriceNumber>
      </Price>
      <Price>
        <PriceKind>주문 금액</PriceKind>
        <PriceNumber>120,000원</PriceNumber>
      </Price>
      <Price>
        <PriceKind>주문 금액</PriceKind>
        <PriceNumber>120,000원</PriceNumber>
      </Price>
    </Wrapper>
  );
};

export default CartPrice;
