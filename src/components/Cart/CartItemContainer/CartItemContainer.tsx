/** @jsxImportSource @emotion/react */
import { cartItemIdListState } from "../../../store/atom/atoms";
import { CartItemContainerStyle, CartItemEmptyStyle } from "./CartItemContainer.style";
import CartItemController from "./CartItemController/CartItemController";
import CartItemList from "./CartItemList/CartItemList";

import { useRecoilValue } from "recoil";

const CartItemContainer = () => {
  const ids = useRecoilValue(cartItemIdListState);

  const isEmpty = ids.length === 0;

  return (
    <div css={CartItemContainerStyle}>
      {!isEmpty ? (
        <>
          <CartItemController />
          <CartItemList />
        </>
      ) : (
        <div css={CartItemEmptyStyle}>장바구니에 상품이 없습니다.</div>
      )}
    </div>
  );
};

export default CartItemContainer;
