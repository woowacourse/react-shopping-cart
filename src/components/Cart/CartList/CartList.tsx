import * as Styled from "./CartList.style";

import { PropsWithChildren } from "react";
import { CartItem } from "../../../type/CartItem";

interface CartListProps extends PropsWithChildren {
  cartItemsData: CartItem[];
}

function CartList({ cartItemsData, children }: CartListProps) {
  const totalPrice = cartItemsData.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <Styled.Container>
      <Styled.UlContainer>{children}</Styled.UlContainer>
      <Styled.TotalPriceContainer>
        <Styled.TotalPriceTitle>총 결제 금액</Styled.TotalPriceTitle>
        <Styled.TotalPrice>{totalPrice.toLocaleString()}원</Styled.TotalPrice>
      </Styled.TotalPriceContainer>
    </Styled.Container>
  );
}

export default CartList;
