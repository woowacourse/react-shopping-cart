import * as Styled from "./CartList.style";

import { PropsWithChildren } from "react";
import { CartItem } from "../../../type/CartItem";

interface CartListProps extends PropsWithChildren {
  cartItemsData: CartItem[];
  selectedCartIds: string[];
}

function CartList({ cartItemsData, selectedCartIds, children }: CartListProps) {
  const totalPrice = cartItemsData
    .filter((cartItem) => selectedCartIds.includes(cartItem.id.toString()))
    .reduce((total, item) => total + item.product.price * item.quantity, 0);

  const shippingFee = totalPrice >= 100000 ? 0 : 3000;
  const totalPriceWithShipping = totalPrice + shippingFee;

  return (
    <Styled.Container>
      <Styled.UlContainer>{children}</Styled.UlContainer>
      <Styled.TotalPriceContainer>
        <Styled.TotalPrice>
          <Styled.TitleText>주문 금액</Styled.TitleText>
          <Styled.PriceText>{totalPrice.toLocaleString()}원</Styled.PriceText>
        </Styled.TotalPrice>
        <Styled.ShippingFee>
          <Styled.TitleText>배송비</Styled.TitleText>
          <Styled.PriceText>{shippingFee.toLocaleString()}원</Styled.PriceText>
        </Styled.ShippingFee>
        <Styled.TotalPriceTitle>
          <Styled.TitleText>총 결제 금액</Styled.TitleText>
          <Styled.PriceText>
            {totalPriceWithShipping.toLocaleString()}원
          </Styled.PriceText>
        </Styled.TotalPriceTitle>
      </Styled.TotalPriceContainer>
    </Styled.Container>
  );
}

export default CartList;
