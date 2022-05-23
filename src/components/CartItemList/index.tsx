import { useCartItemListSelector } from "hooks/useCartSelector";

import CartItem from "components/CartItem";

import * as S from "./styles";

function CartItemList() {
  const cartItemList = useCartItemListSelector();

  if (!cartItemList.length) {
    return <S.EmptyCart>장바구니가 비어있습니다.</S.EmptyCart>;
  }

  return (
    <S.CartItemListWrapper>
      {cartItemList.map((cartItem) => (
        <CartItem cartItem={cartItem} key={cartItem.detail.id} />
      ))}
    </S.CartItemListWrapper>
  );
}

export default CartItemList;
