import styled from "styled-components";

import { useCartItemListSelector } from "../../hooks/useCartSelector";

import CartItem from "../CartItem";

function CartItemList() {
  const cartItemList = useCartItemListSelector();

  if (!cartItemList.length) {
    return <EmptyCart>장바구니가 비어있습니다.</EmptyCart>;
  }

  return (
    <CartItemListWrapper>
      {cartItemList.map((cartItem) => (
        <CartItem cartItem={cartItem} key={cartItem.id} />
      ))}
    </CartItemListWrapper>
  );
}

export default CartItemList;

const EmptyCart = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 28px;
`;

const CartItemListWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
