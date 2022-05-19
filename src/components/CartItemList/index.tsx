import React from "react";
import styled from "styled-components";

import CartItem from "../CartItem";

function CartItemList() {
  return (
    <CartItemListWrapper>
      <CartItem />
      <CartItem />
      <CartItem />
    </CartItemListWrapper>
  );
}

export default CartItemList;

const CartItemListWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
