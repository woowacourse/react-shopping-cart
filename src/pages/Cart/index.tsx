import { useCartItemListSelector } from "hooks/useCartSelector";

import CartItemList from "components/CartItemList";
import CartItemListController from "components/CartItemListController";
import OrderBox from "components/OrderBox";

import * as S from "./styles";

function Cart() {
  const cartItemList = useCartItemListSelector();

  return (
    <S.PageWrapper direction="column">
      <S.PageTitle>장바구니</S.PageTitle>
      <S.Content>
        <S.LeftContent>
          <CartItemListController />
          <S.CartItemListTitle>든든배송 상품 ({cartItemList.length})</S.CartItemListTitle>
          <CartItemList />
        </S.LeftContent>
        <S.RightContent>
          <OrderBox />
        </S.RightContent>
      </S.Content>
    </S.PageWrapper>
  );
}

export default Cart;
