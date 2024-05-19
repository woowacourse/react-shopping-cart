/** @jsxImportSource @emotion/react */
import { Suspense } from "react";
import { CartItemContainerStyle, CartItemEmptyStyle } from "./CartItemContainer.style";
import CartItemControls from "./CartItemsToolBar/CartItemsToolBar";
import CartItemList from "./CartItemList/CartItemList";

import { useRecoilValue } from "recoil";
import { cartState } from "@/store/atom/atoms";

const CartItemContainer = () => {
  const cartCount = useRecoilValue(cartState).length;

  return (
    <div css={CartItemContainerStyle}>
      {cartCount !== 0 ? (
        <>
          <CartItemControls />
          <Suspense fallback={<div>Loading</div>}>
            <CartItemList />
          </Suspense>
        </>
      ) : (
        <div css={CartItemEmptyStyle}>장바구니에 상품이 없습니다.</div>
      )}
    </div>
  );
};

export default CartItemContainer;
