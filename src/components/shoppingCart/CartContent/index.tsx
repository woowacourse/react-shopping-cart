import { useRecoilValue } from "recoil";
import { cartItemsState } from "@/stores/cartItems";

import CartDescription from "../CartDescription";
import CartItemList from "../CartItemList";
import CartPrice from "../CartPrice";

import * as S from "./styled";

const CartContent = () => {
  const cartItemCount = useRecoilValue(cartItemsState).length;

  return (
    <S.Container>
      <CartDescription />
      {cartItemCount > 0 && (
        <>
          <CartItemList />
          <CartPrice />
        </>
      )}
    </S.Container>
  );
};

export default CartContent;
